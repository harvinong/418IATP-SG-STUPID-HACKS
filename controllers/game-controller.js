const postScraper = require("../scrape/post-scraper")
const postModel = require("../models/post-model")

exports.gameGet = async (req,res) => {
    let post = await postModel.getRandomPost()
    console.log(post)

    const playerStats = req.session.playerStats || {
        points: 0
    };

    const options = {
        post : post[0],
        playerStats,
        outcome: 'pass'
    };
    res.render("game", options);
};

exports.gamePost = (req,res) => {
    if (req.body.pass) {return res.redirect("/game/");}

    if (req.session.playerStats) {
        req.session.playerStats.points += 1;
    } else {
        req.session.playerStats = {points: 1};
    }

    
    const placeholderPost = {
        text: "I just had Wingstop today. So good! 🤤",
        author: "Will B. Goodenough",
        isReal: true,
        link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        success: 420,
        fail: 69
    }
    
    let outcome = 'fail';
    if (req.body.real && placeholderPost.isReal) {
        outcome = 'success';
    }

    const options = {
        post: placeholderPost,
        playerStats: req.session.playerStats,
        outcome
    };

    res.render("game", options);
};

// Fake ===
exports.addFakeGet = async (req,res) => {
    res.render("add-fake");
};

exports.addFakePost = async (req,res) => {
    let text = req.body.text;
    
    await postModel.addFakePost(text);
    
    res.render("add-fake");
};

// Real === 
exports.addRealGet = async (req,res) => {
    res.render("add-real");
};

exports.addRealPost = async (req,res) => {
    let link = req.body.link;

    let scrapedPost = await postScraper.scrapePost(link);
    console.log(scrapedPost);
    
    await postModel.addRealPost(scrapedPost);
    
    res.render("add-real");
};


const postScraper = require("../scrape/postScraper")
const postModel = require("../models/postModel")

exports.gameGet = (req,res) => {

    const placeholderPost = {
        text: "I just had Wingstop today. So good! 🤤",
        author: "Will B. Goodenough",
        isReal: true,
        link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        success: 420,
        fail: 69
    }

    const playerStats = req.session.playerStats || {
        points: 0
    };

    const options = {
        post: placeholderPost,
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

exports.addFakeGet = (req,res) => {res.send("addFakeGET not implemented");};

exports.addFakePost = (req,res) => {res.send("addFakePOST not implemented");};

exports.addRealGet = async (req,res) => {
    res.render("addReal");
};

exports.addRealPost = async (req,res) => {
   let link = req.body.link;

   let scrapedPost = await postScraper.scrapePost(link)
   console.log(scrapedPost)

   await postModel.addRealPost(scrapedPost)

   res.render("addReal")
};


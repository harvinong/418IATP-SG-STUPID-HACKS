const postScraper = require("../scrape/post-scraper");
const postModel = require("../models/post-model");

exports.gameGet = async (req,res) => {
    let post = await postModel.getRandomPost();
    console.log(post);

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

exports.gamePost = async (req,res) => {
    console.log("Posted");
    if (req.body.pass) {return res.redirect("/game/");};
    const post = await postModel.getPostByID(req.body.postID);

    // Initialize player statistics session
    if (!req.session.playerStats) {
        req.session.playerStats = {points: 0};
    }
    
    let outcome = 'fail';
    const succOut = req.body.real && post.isReal;
    const failOut = req.body.fake && !post.isReal;
    if (succOut || failOut) {
        outcome = 'success';
        req.session.playerStats.points += 1;
    };

    const options = {
        post,
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

// Saw real ===
exports.addSawRealGet = async (req,res) => {
    res.render("saw-real");
};

exports.addSawRealPost = async (req,res) => {
    let link = req.body.link;
    let text = req.body.text;

    await postModel.addRealSightPost(text, link);
    
    res.render("saw-real");
};
const postScraper = require("../scrape/postScraper")
const postModel = require("../models/postModel")

exports.gameGet = (req,res) => {res.send("gameGET not implemented");};

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
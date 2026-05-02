const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  text: { type: String, required: true,},
  link: { type: String, required: true },
  isReal: { type: Boolean, required: true },
  success: {type: Number, default:0 },
  fail: {type: Number, default:0},
}, { timestamps: true });

const postModel = mongoose.model('post', postSchema, 'post');

exports.addPost = function(newPost) {
    return postModel.create(newPost);
};

exports.addRealPost = function(scrapedPost) {
    let newPost = {
        text: scrapedPost.text,
        link: scrapedPost.link,
        isReal: true
    };
    return postModel.create(newPost);
}

exports.addFakePost = function(text) {
    let newPost = {
        text: text,
        link: "fake",
        isReal: false
    };
    return postModel.create(newPost);
}

exports.addRealSightPost = function(text, link) {
    let newPost = {
        text: text,
        link: link,
        isReal: true
    }
    return postModel.create(newPost)
}

exports.getRandomPost = function() {
    return postModel.aggregate([{ $sample: { size: 1 } }]);
};

exports.getPostByID = function(postID) {
    return postModel.findById(postID);
}
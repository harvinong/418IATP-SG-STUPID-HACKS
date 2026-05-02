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

exports.getRandomPost = function() {
  return postModel.aggregate([{ $sample: { size: 1 } }]);
};
const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");

//@desc Create new Post
//route POST /api/posts
//@access Private

const createPost = asyncHandler(async (req, res) => {
  const { title, category } = req.body;
  console.log(req.user._id);

  const newPost = await Post.create({
    title,
    category,
    postedBy: req.user._id,
  });
  res.status(201).json(newPost);
  if (!newPost) {
    throw new Error("Can't create the post");
  }
});

const getAllPosts = asyncHandler(async (req, res) => {
  const allPosts = await Post.find().populate("postedBy");
  res.status(200).json(allPosts);
});

module.exports = { createPost, getAllPosts };

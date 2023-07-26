const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: { virtuals: true },
    toString: { virtuals: true },
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

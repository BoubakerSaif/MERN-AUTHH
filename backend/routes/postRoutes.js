const express = require("express");
const { createPost, getAllPosts } = require("../controllers/postControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, createPost);
router.get("/", protect, getAllPosts);

module.exports = router;

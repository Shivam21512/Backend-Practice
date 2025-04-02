const express = require("express");
const router = express.Router();

// Imort Controller
//const {dummyLink} = require("../controllers/CommentController");
const {createComment} = require("../controllers/CommentController");
const {createPost ,getAllPosts } = require("../controllers/PostController");
const {likePost, unlikePost} = require("../controllers/LikeController");



// Mapping Create
//router.get("/dummyroute", dummyLink);
router.post("/comments/create", createComment);
router.post("/posts/create", createPost);
router.get("/posts", getAllPosts);
router.post("/likes/like",likePost)
router.post("/likes/unlike",unlikePost);


// Export
module.exports = router;
const express = require("express");
const posts = require("./postDb");

// const router = express.Router({
//   mergeParams: true
// });

// Get all posts?
router.get("/", (req, res) => {
  // do your magic!
});

// Get specific post?
router.get("/:id", (req, res) => {
  // do your magic!
});

// delete post
router.delete("/:id", (req, res) => {
  // do your magic!
});

// update post
router.put("/:id", (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;

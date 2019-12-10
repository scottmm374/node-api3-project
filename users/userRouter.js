const express = require("express");
const user = require("./userDb");
// const postRouter = require("../posts/postRouter");

const router = express.Router();
// router.use("/:id", postRouter);

// New user create

router.post("/", (req, res) => {
  // do your magic!
});

// create new post ?

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

//  *Get all users
router.get("/", (req, res) => {
  user
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json("Error, info not retrieved");
    });
});

// * Get user by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  // console.log("user id", id);
  user
    .getById(id)
    .then(data => {
      if (!data) {
        return res.status(400).json("No user found");
      } else {
        return res.status(200).send(data);
      }
    })
    .catch(err => {
      res.status(500).json("something went wrong");
    });
});

// Get all user posts by userId
router.get("/:id/posts", (req, res) => {
  // do your magic!
});

// delete user?
router.delete("/:id", (req, res) => {
  // do your magic!
});

// Update User?
router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;

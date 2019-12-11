const express = require("express");
const user = require("./userDb");
const posts = require("../posts/postDb");
// const postRouter = require("../posts/postRouter");

const router = express.Router();

// * New user create
router.post("/", validateUser(), (req, res) => {
  newUser = req.body;
  user
    .insert(newUser)
    .then(data => {
      res.status(201).send(newUser);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "There was an error while saving the post to the database"
      });
    });
});

// *create new post

router.post("/:id/posts", validateUserId(), validatePost(), (req, res) => {
  const newPost = {
    text: req.body.text,
    user_id: req.params.id
  };

  posts
    .insert(newPost)
    .then(() => {
      res.status(201).json(newPost);
    })
    .catch(error => {
      console.log(error, "Post error");
      res.status(500).json({
        errorMessage: "There was an error while saving the post to the database"
      });
    });
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
router.get("/:id", validateUserId(), (req, res) => {
  res.status(200).json(req.user);
});

// * Get all user posts by userId
router.get("/:id/posts", validateUserId(), (req, res) => {
  user.getUserPosts(req.user.id).then(userPosts => {
    return res.status(200).json(userPosts);
  });
});

//  * delete user

router.delete("/:id", validateUserId(), (req, res) => {
  user.remove(req.user.id).then(() => {
    res.status(200).json({ message: "user deleted" });
  });
});

// * Update User
router.put("/:id", validateUserId(), validateUser(), (req, res) => {
  updateUser = req.body;
  user.update(req.user.id, updateUser).then(() => {
    res.status(200).json(updateUser);
  });
});

// custom middleware

function validateUserId() {
  return (req, res, next) => {
    user
      .getById(req.params.id)
      .then(data => {
        if (data) {
          req.user = data;
          next();
        } else {
          res.status(400).json({ message: "invalid user id" });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "There was an error performing the required operation"
        });
      });
  };
}

function validateUser() {
  return (req, res, next) => {
    if (!req.body.name) {
      return res.status(400).json({
        message: "missing required name field"
      });
    }
    if (!req.body) {
      return res.status(400).json({
        message: "missing user data"
      });
    }

    next();
  };
}

function validatePost() {
  return (req, res, next) => {
    if (!req.body.text) {
      return res.status(400).json({
        message: "missing required text field"
      });
    }
    if (!req.body) {
      return res.status(400).json({
        message: "missing post data"
      });
    }
    next();
  };
}

module.exports = router;

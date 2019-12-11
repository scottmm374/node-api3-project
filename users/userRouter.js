const express = require("express");
const user = require("./userDb");
const posts = require("../posts/postDb");
// const postRouter = require("../posts/postRouter");

const router = express.Router();

// * New user create
router.post("/", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      errorMessage: "Please provide name."
    });
  }
  const newUser = {
    name: req.body.name
  };
  user
    .insert(newUser)
    .then(data => {
      return res.status(201).send(newUser);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "There was an error while saving the post to the database"
      });
    });
});

// *create new post

router.post("/:id/posts", (req, res) => {
  const newPost = {
    text: req.body.text,
    user_id: req.params.id
  };
  // if (!req.body.text) {
  //   return res.status(400).json({
  //     errorMessage: "Please provide text for post"
  //   });
  // }
  posts
    .insert(newPost)
    .then(data => {
      console.log(data, "data");
      if (req.body.text) {
        return res.status(201).send(newPost);
      }
    })
    .catch(error => {
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
  res.status(200).json(req.data);
});

// * Get all user posts by userId
router.get("/:id/posts", (req, res) => {
  const id = req.params.id;
  user
    .getUserPosts(id)
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

//  * delete user

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  user.getById(id).then(data => {
    if (!data) {
      return res.status(404).json({ message: "The User Id does not exist" });
    }
  });
  user
    .remove(id)
    .then(data => {
      if (data) {
        res.status(200).json({ message: "user deleted" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});

// * Update User
router.put("/:id", (req, res) => {
  const updateUser = {
    name: req.body.name
  };
  const id = req.params.id;

  user.getById(id).then(data => {
    if (!data) {
      return res
        .status(404)
        .json({ message: "TheUser with the specified ID does not exist." });
    }

    if (!req.body.name) {
      return res.status(400).json({
        errorMessage: "Please provide Name."
      });
    }

    user
      .update(id, updateUser)
      .then(data => {
        res.status(200).send(updateUser);
      })
      .catch(error => {
        res.status(500).json({
          error: "The user could not be updated."
        });
      });
  });
});

// custom middleware

function validateUserId() {
  return (req, res, next) => {
    user
      .getById(req.params.id)
      .then(data => {
        if (data) {
          req.data = data;
          next();
        } else {
          res.status(400).json("No user found");
        }
      })
      .catch(err => {
        res.status(500).json("something went wrong");
      });
  };
}

function validateUser(req, res, next) {
  // do your magic!
}

// function validatePost(){
//   return (req, res, next) => {

//   if (!req.body.text) {
//     return res.status(400).json({
//       errorMessage: "Please provide text for post"
//     });
//   }
//   next();
// }

module.exports = router;

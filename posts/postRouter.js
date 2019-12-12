const express = require("express");
const posts = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  posts
    .get()
    .then(data => {
      return res.status(200).json(data);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  posts
    .getById(id)
    .then(data => {
      console.log("get by id", data);
      if (!data) {
        return res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        return res.status(200).send(data);
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  posts.getById(id).then(data => {
    console.log(data);
    if (!data) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  });
  posts
    .remove(id)
    .then(data => {
      if (data) {
        res.status(200).json("Post Deleted");
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

router.put("/:id", (req, res) => {
  const updatePost = {
    text: req.body.text,
    user_id: req.params.id
  };
  const id = req.params.id;

  posts.getById(id).then(data => {
    if (!data) {
      return res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }

    if (!req.body.text) {
      return res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    }

    posts
      .update(id, updatePost)
      .then(data => {
        res.status(200).send(updatePost);
      })
      .catch(error => {
        res.status(500).json({
          error: "The post information could not be modified."
        });
      });
  });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;

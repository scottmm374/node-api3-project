const express = require("express");
const posts = require("./postDb");
const router = express.Router();
// const { validatePost } = require("../users/userRouter");

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

// router.put("/:id", validatePostId(), validatePost(), (req, res) => {
//   const updatePost = req.body;
//   // {
//   //   text: req.body.text,
//   //   user_id: req.params.id
//   // };
//   // const id = req.params.id;

//   posts.getById(req.post.id).then(data => {
//     // if (!data) {
//     //   return res
//     res.status(404).json(req.post);
//     // }

//     // if (!req.body.text) {
//     //   return res.status(400).json({
//     //     errorMessage: "Please provide text for the post."
//     //   });
//     // }

//     posts
//       .update(req.post.id, updatePost)
//       .then(data => {
//         res.status(200).send(updatePost);
//       })
//       .catch(error => {
//         res.status(500).json({
//           error: "The post information could not be modified."
//         });
//       });
//   });
// });

// // custom middleware

// function validatePostId() {
//   return (req, res, next) => {
//     posts
//       .getById(req.params.id)
//       .then(data => {
//         if (data) {
//           req.post = data;
//           next();
//         } else {
//           res.status(400).json({ message: "invalid post id" });
//         }
//       })
//       .catch(err => {
//         res.status(500).json({
//           message: "There was an error performing the required operation"
//         });
//       });
//   };
// }

module.exports = router;

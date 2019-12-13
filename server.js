const express = require("express");
const { router: userRouter } = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();
server.use(express.json());
server.use(logger);
server.use("/api/user", userRouter);
server.use("/api/posts", postRouter);

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "User-Agent"
    )}`
  );
  next();
}

server.get("/", (req, res) => {
  res.json({
    message: "Welcome to my API",
    cohort: process.env.LAMBDA_COHORT
  });
});

module.exports = server;

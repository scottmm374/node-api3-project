const server = require("./server");
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 8080;

server.listen(port, host, () => {
  console.log("Sever running on http://localhost:4000");
});

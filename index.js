process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require("cluster");

// is the file is being executed in master mode ?
if (cluster.isMaster) {
  // Cause index.js to be executed *again* but child mode
  cluster.fork();
  cluster.fork();
} else {
  // I am a child, I am going to act like a server
  const express = require("express");
  const crypto = require('crypto');
  const app = express();
  const port = 3000;

  app.get("/", (req, res) => {
    crypto.pbkdf2("a", "b", 1000000, 512, "sha512", () => {
    //   console.log("1:", Date.now() - start);
      res.send("Hi There");
    });

  });

  app.get("/fast", (req, res) => {
    res.send("Fast!!");
  });

  app.listen(port, () => {
    console.log("Running on port " + port);
  });
}

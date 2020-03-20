const express = require("express");

const app = express();

app.get("/", function(req, res) {
  res.send({hi: "there you"});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log('server funning on port 3000');
});

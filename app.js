const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.port || 5000;
const mongoose = require("mongoose");
const data = require("./data.js");
const route = require("./router/auth.js");
const route2 = require("./router/createPost.js");
const route3 = require("./router/user.js");
const path = require("path");
require("./models/model.js");
require("./models/posts.js");
app.use(cors());
app.use(express.json());
app.use(route);
app.use(route2);
app.use(route3);
mongoose.connect(
  "mongodb+srv://bannujaanu78:bannujaanu78@cluster0.tvgdvt1.mongodb.net/?retryWrites=true&w=majority"
);
mongoose.connection.on("connected", () => {
  console.log("Successfully connected");
});
mongoose.connection.on("error", () => {
  console.log("not connected");
});

app.use(express.static(path.join(__dirname, "./myapp/build")));
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./myapp/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

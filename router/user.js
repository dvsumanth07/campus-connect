const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const POST = mongoose.model("POST");
const USER = mongoose.model("USER");
router.get("/user/:id", (req, res) => {
  USER.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      POST.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name Photo")
        .populate("comments.postedBy", "_id name")
        .exec()
        .then((post) => {
          res.status(200).json({ user, post });
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: "User not found" });
    });
});

router.put("/follow", requireLogin, async (req, res) => {
  try {
    // Update the user being followed to add the follower
    const userBeingFollowed = await USER.findByIdAndUpdate(
      req.body.followId,
      { $push: { followers: req.user._id } },
      { new: true }
    );

    if (!userBeingFollowed) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the current user to add the followed user to their following list
    const currentUser = await USER.findByIdAndUpdate(
      req.user._id,
      { $push: { following: req.body.followId } },
      { new: true }
    );

    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(currentUser); // Respond with the updated user information
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/unfollow", requireLogin, async (req, res) => {
  try {
    // Update the user being followed to add the follower
    const userBeingFollowed = await USER.findByIdAndUpdate(
      req.body.followId,
      { $pull: { followers: req.user._id } },
      { new: true }
    );

    if (!userBeingFollowed) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the current user to add the followed user to their following list
    const currentUser = await USER.findByIdAndUpdate(
      req.user._id,
      { $pull: { following: req.body.followId } },
      { new: true }
    );

    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(currentUser); // Respond with the updated user information
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.put("/uploadDp", requireLogin, (req, res) => {
//   USER.findByIdAndUpdate(
//     req.user._id,
//     requireLogin,
//     (req, res) => {
//       $set: {
//         Photo: req.body.pic;
//       }
//     },
//     {
//       new: true,
//     }
//   )
//     .exec()
//     .then((result) => {
//       res.json({ result });
//     })
//     .catch((err) => {
//       return res.status(422).json({ error: err });
//     });
// });

router.put("/uploadDp", requireLogin, (req, res) => {
  USER.findByIdAndUpdate(
    req.user._id,
    { $set: { Photo: req.body.pic } },
    { new: true }
  )
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ result });
    })
    .catch((err) => {
      return res.status(422).json({ error: err.message });
    });
});
module.exports = router;

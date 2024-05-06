const router = require("express").Router();
const jwt = require("jsonwebtoken");

const {
  registerUser,
  loginUser,
  getAllUsers,
  getReviewsByUser,
  updateReview,
  deleteReview,
  getCommentsByUser,
  editComment,
} = require("../db/user");

router.post("/register", async (req, res) => {
  try {
    const newUser = await registerUser(
      req.body.email,
      req.body.username,
      req.body.password,
      req.body.firstName,
      req.body.lastName
    );
    const token = jwt.sign({ id: newUser.id }, process.env.JWT);
    res.status(201).send({ newUser, token });
  } catch (error) {
    console.error("error on POST /auth/register route", error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const loggedUser = await loginUser(req.body.username, req.body.password);
    if (loggedUser) {
      const token = jwt.sign({ id: loggedUser.id }, process.env.JWT);
      res.status(200).send({ loggedUser, token });
    } else {
      res.send({ msg: "could not find that user" });
    }
  } catch (error) {
    console.error("error on POST /auth/register route", error);
  }
});

router.get("/users", async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    res.status(200).send(allUsers);
  } catch (error) {
    console.error("error on GET auth/users route", error);
  }
});

router.get("/reviews", async (req, res) => {
  if (req.user) {
    try {
      const userReviews = await getReviewsByUser(req.user.id);
      res.status(200).send(userReviews);
    } catch (error) {
      console.error("error on GET auth/reviews route");
    }
  } else {
    res.status(401).send({ msg: "you must be signed in to get your reviews" });
  }
});

router.put("/reviews/:id", async (req, res) => {
  if (req.user) {
    try {
      let updateData = {};
      for (key in req.body) {
        if (key === "title" || key === "content" || key === "stars") {
          updateData[key] = req.body[key];
        }
      }
      const updatedReview = await updateReview(
        req.user.id,
        parseInt(req.params.id),
        req.body.id,
        updateData
      );
      res.status(200).send(updatedReview);
    } catch (error) {
      console.error("error on PUT /reviews/:id route", error);
    }
  }
});

router.delete("/reviews/:id", async (req, res) => {
  try {
    const deletedReview = await deleteReview(parseInt(req.params.id));
    res.status(200).send(deletedReview);
  } catch (error) {
    console.error("error on DELETE /reviews/:id route", error);
  }
});

router.get("/comments", async (req, res) => {
  if (req.user) {
    try {
      const userComments = await getCommentsByUser(req.user.id);
      if (userComments) {
        res.status(200).send(userComments);
      } else {
        res.status(404).send({ msg: "You haven't written any comments yet" });
      }
    } catch (error) {
      console.error("error on GET auth/comments/:id route", error);
    }
  } else {
    res.status(404).send({ msg: "you must be logged in to see your comments" });
  }
});

router.put("/comments/:id", async (req, res) => {
  console.log("made it to put route")
  if (req.user) {
    try {
      const editedComment = await editComment(parseInt(req.params.id), req.body.content);
      res.status(200).send(editedComment);
    } catch (error) {
      console.error("error on PUT comments/:id route", error);
    }
  } else {
    res
      .status(404)
      .send({ msg: "you must be logged in to edit your comments" });
  }
});

module.exports = router;

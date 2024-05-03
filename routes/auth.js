const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { registerUser, loginUser, getReviewsByUser } = require("../db/user");

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

router.get("/reviews", async (req, res) => {
  if (req.user) {
    try {
      const userReviews = await getReviewsByUser(req.user.id);
      console.log(userReviews);
      res.status(200).send(userReviews);
    } catch (error) {
      console.error("error on GET auth/reviews route");
    }
  } else {
    res.status(401).send({ msg: "you must be signed in to get your reviews" });
  }
});

module.exports = router;

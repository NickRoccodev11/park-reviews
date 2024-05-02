const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { registerUser } = require("../db/user");

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

module.exports = router;

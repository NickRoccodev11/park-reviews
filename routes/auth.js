const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { registerUser } = require("../db/user");
router.get("/register", async (req, res) => {
  try {
    const newUser = await registerUser(
      email,
      username,
      password,
      first_name,
      last_name
    );
    const token = jwt.sign({ id: newUser.id }, process.env.JWT);
    res.status(201).send({ newUser, token });
  } catch (error) {
    console.error("error on POST /auth/register route", error);
  }
});

module.exports = router;

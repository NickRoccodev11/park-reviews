const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { registerUser, loginUser, getAllUsers } = require("../db/user");

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

router.get('/users', async(req,res)=>{
  try {
    const allUsers = await getAllUsers()
    res.status(200).send(allUsers)
  } catch (error) {
    console.error("error on GET auth/users route", error)
  }
})

module.exports = router;

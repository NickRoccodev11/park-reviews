const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  console.log("delete me after adding a route");
});


module.exports = router;
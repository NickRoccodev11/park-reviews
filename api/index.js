const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  if (token) {
    req.user = jwt.verify(token, process.env.JWT);
  } else {
    req.user = null;
  }
  next();
});

router.use("/user", require("./user"));
router.use("/park", require("./park"));

module.exports = router;
const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.get("/parks", async (req, res) => {
  try {
    const allParks = await getAllParks();
    res.status(200).send(allParks);
  } catch (error) {
    console.error("error on GET /parks route", error);
  }
});

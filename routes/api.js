const router = require("express").Router();
const { getAllParks, getParkDetails } = require("../db/park.js");

router.get("/parks", async (_req, res) => {
  
  try {
    const allParks = await getAllParks();
    res.status(200).send(allParks);
  } catch (error) {
    console.error("error on GET /parks route", error);
  }
});


router.get("/parks/:id", async (req, res) => {
  console.log("api");
  try {
    const { id } = req.params;
    const parkDetails = await getParkDetails(id);
    if (parkDetails) {
      res.status(200).send(parkDetails);
    } else {
      res.status(404).send("Park not found");
    }
  } catch (error) {
    console.error(`error on GET /parks/:id route: ${error}`);
    res.status(500).send("Error retrieving park details");
  }
});

module.exports = router;

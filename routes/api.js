const router = require("express").Router();
const { getAllParks, getParkDetails, createPark, createReview } = require("../db/park.js");


router.get("/parks", async (_req, res) => {
  
  try {
    const allParks = await getAllParks();
    res.status(200).send(allParks);
  } catch (error) {
    console.error("error on GET /parks route", error);
  }
});


router.get("/parks/:id", async (req, res) => {
  
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

router.post ("/parks", async (req, res) => {
  try {
    const newPark= await createPark(
      req.body.name, 
      req.body.description, 
      req.body.contact, 
      req.body.state, 
      req.body.image, 
      req.body.hours
    )
    res.status(201).send(newPark); 
  } catch (error) {
    console.log(error);
  }
});

router.post ("/reviews", async (req, res) =>{
  console.log("end point")
  if (req.user) {
    try {
      const newReview = await createReview(
        req.body.title, 
        req.body.content, 
        req.body.stars, 
        req.body.park_id,
        req.user.id
  
      )
      res.status(201).send(newReview);
    } catch (error) {
      console.log(error);
    }
  }
  
});

module.exports = router;

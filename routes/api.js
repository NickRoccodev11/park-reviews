const router = require("express").Router();
const {
  getAllParks,
  getParkDetails,
  createPark,
  updatePark,
  createReview,
  createComment,
} = require("../db/park.js");

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

router.post("/parks", async (req, res) => {
  try {
    const newPark = await createPark(
      req.body.name,
      req.body.description,
      req.body.contact,
      req.body.state,
      req.body.image,
      req.body.hours
    );
    res.status(201).send(newPark);
  } catch (error) {
    console.log(error);
  }
});

router.put("/parks/:id", async (req, res) => {
  try {
    const editedPark = await updatePark(
      req.body.name,
      req.body.description,
      req.body.contact,
      req.body.state,
      req.body.image,
      req.body.hours,
      req.body.tags,
      parseInt(req.params.id)
    );
    res.status(200).send(editedPark);
  } catch (error) {
    console.error("error on PUT /parks/:id route", error);
  }
});

router.post("/reviews", async (req, res) => {
  if (req.user) {
    try {
      const newReview = await createReview(
        req.body.title,
        req.body.content,
        req.body.stars,
        req.user.id,
        req.body.park_id
      );
      res.status(201).send(newReview);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(404).send({ msg: "you must be logged in to leave a review" });
  }
});

router.post("/comments", async (req, res) => {
  if (req.user) {
    try {
      const newComment = await createComment(
        req.body.content,
        req.body.review_id,
        req.user.id
      );
      res.status(200).send(newComment);
    } catch (error) {
      console.error("error on POST /comments route", error);
    }
  } else {
    res.status(404).send({ msg: "you must be signed in to leave a comment" });
  }
});

module.exports = router;

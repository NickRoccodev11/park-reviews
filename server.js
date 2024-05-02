require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const PORT = process.env.PORT || 3000;

//middleware
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./dist")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/index.js"));

app.listen(PORT, () => {
  console.log("listening on " + PORT);
});

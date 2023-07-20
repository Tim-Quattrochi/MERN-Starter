const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { PORT } = require("./config/constants");

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); //logging

//routes

//server static files in production
if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.all("*", (req, res, next) => {
    res.sendFile(
      path.resolve(__dirname, "../client/dist/index.html")
    );
  });
}

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is listening on port: ${PORT}`);
});

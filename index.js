const express = require("express");
const configureDB = require("./src/config/db");
const app = express();

require("dotenv").config();
const port = process.env.PORT || 5000;

configureDB();


app.get("/", async){
  console.log("get method")
};

//start the server
app.listen(() => {
  console.log(`Server is running on ${port}`);
});

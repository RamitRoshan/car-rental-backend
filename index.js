const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT || 5000;

//start the server
app.listen(() => {
  console.log(`Server is running on ${port}`);
});

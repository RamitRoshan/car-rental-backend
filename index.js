const express = require("express");
const configureDB = require("./src/config/db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

configureDB();

//middlewares
app.use(express.json());

//routes
const authRoutes = require("./src/routes/auth-routes");
const bookingRoutes = require("./src/routes/booking-routes");

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

//test routes(just for testing, evrythg working or not)
app.get("/", (req, res) => {
  //console.log("get method hit");
  res.send("Just checking API is running");
});

//start the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

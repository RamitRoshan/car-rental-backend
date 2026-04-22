const express = require("express");
const bookingRouter = express.Router();

const {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
} = require("../controllers/booking-controller");
const authMiddleware = require("../middlewares/auth");

bookingRouter.post("/", authMiddleware, createBooking);
bookingRouter.get("/", authMiddleware, getBookings);
bookingRouter.put("/:id", authMiddleware, updateBooking);
bookingRouter.delete("/:id", authMiddleware, deleteBooking);

module.exports = bookingRouter;

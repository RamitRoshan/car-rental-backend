const bookingService = require("../services/booking-service");

//create booking
const createBooking = async (req, res) => {
  try {
    const result = await bookingService.createBooking(req.user, req.body);

    return res.status(201).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Something went wrong" });
  }
};

//get bookings
const getBookings = async (req, res) => {
  try {
    const result = await bookingService.getBookings(req.user, req.query);
    return res.status(201).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Something went wrong" });
  }
};

//update booking
const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await bookingService.updateBooking(req.user, id, req.body);

    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Something went wrong" });
  }
};

// Delete Booking
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await bookingService.deleteBooking(req.user, id);

    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Something went wrong" });
  }
};

module.exports = {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
};

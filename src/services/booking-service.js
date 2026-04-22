const Booking = require("../models/booking-model");

//creating booking
const createBooking = async (user, data) => {
  const { carName, days, rentPerDay } = data;

  //validating the business rule
  if (days >= 365 || rentPerDay > 2000) {
    throw { status: 400, message: "Invalid inputs" };
  }

  //calculate total cost
  const totalCost = days * rentPerDay;

  //create booking
  const booking = await Booking.create({
    user_id: user.user_id,
    car_name: carName,
    days,
    rent_per_day: rentPerDay,
    status: "booked",
  });

  return {
    message: "Booking created successfully",
    bookingId: booking._id,
    totalCost,
  };
};

//get bookings
const getBookings = async (user, query) => {
  const { bookingId, summary } = query;

  //fetch single booking
  if (bookingId) {
    const booking = await Booking.findOne({
      _id: bookingId,
      user_id: user.user_id,
    });
    if (!booking) {
      throw { status: 404, message: "Booking not found" };
    }

    return [
      {
        id: booking._id,
        car_name: booking.car_name,
        days: booking.days,
        rent_per_day: booking.rent_per_day,
        status: booking.status,
        totalCost: booking.days * booking.rent_per_day,
      },
    ];
  }

  //summary
  if (summary === "true") {
    const bookings = await Booking.find({
      user_id: user.userId,
      status: { $in: ["booked", "completed"] },
    });

    const totalBookings = bookings.length;
    const totalAmountSpent = bookings.reduce((sum, b) => {
      return sum + b.days * b.rent_per_day;
    }, 0);

    return {
      userId: user.userId,
      username: user.username,
      totalBookings,
      totalAmountSpent,
    };
  }

  // all bookings
  const bookings = await Booking.find({ user_id: user.userId });

  return bookings.map((b) => ({
    id: b._id,
    car_name: b.car_name,
    days: b.days,
    rent_per_day: b.rent_per_day,
    status: b.status,
    totalCost: b.days * b.rent_per_day,
  }));
};

//update booking
const updateBooking = async (user, bookingId, data) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw { status: 404, message: "Booking not found" };
  }

  //ownership check
  if (booking.user_id.toString() !== user.userId.toString()) {
    throw { status: 403, message: "Booking does not belong to user" };
  }

  //update fields
  if (data.carName) {
    booking.car_name = data.carName;
  }
  if (data.days) booking.days = data.days;
  if (data.rentPerDay) booking.rent_per_day = data.rentPerDay;
  if (data.status) booking.status = data.status;

  //Business validation
  if (booking.days >= 365 || booking.rent_per_day > 2000) {
    throw { status: 400, message: "Invalid inputs" };
  }
  await booking.save();

  return {
    message: "Booking updated successfully",
    booking: {
      id: booking._id,
      car_name: booking.car_name,
      days: booking.days,
      rent_per_day: booking.rent_per_day,
      status: booking.status,
      totalCost: booking.days * booking.rent_per_day,
    },
  };
};

//delete booking
const deleteBooking = async (user, bookingId) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw { status: 404, message: "Booking not found" };
  }

  //ownership checking
  if (booking.user_id.toString() !== user.userId.toString()) {
    throw { status: 403, message: "Booking does not belong to user" };
  }

  await Booking.findByIdAndDelete(bookingId);

  return {
    message: "Booking deleted successfully",
  };
};

module.exports = {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
};

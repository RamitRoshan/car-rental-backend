const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    //This field stores an ObjectId, That ObjectId points to User collection
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //It tells Mongoose:This ObjectId belongs to the User model
      required: true,
    },
    car_name: {
      type: String,
      required: true,
    },
    days: {
      type: Number,
      required: true,
      max: 364
    },
    rent_per_day: {
      type: Number,
      required: true,
      max: 2000
    },
    status: {
      type: String,
      enum: ["booked", "completed", "cancelled"],
      default: "booked",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);

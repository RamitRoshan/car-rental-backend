const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    car_name: {
      type: String,
      required: true,
    },
    days: {
      type: Number,
      required: true,
    },
    rent_per_day: {
      type: Number,
      required: true,
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

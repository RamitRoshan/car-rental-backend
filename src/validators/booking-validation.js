const Joi = require("joi");

//Create Booking Validation
const bookingValidationSchema = Joi.object({
  car_name: Joi.string().trim().min(3).required(),
  days: Joi.number().integer().min(1).max(364).required(),
  rent_per_day: Joi.number().min(1).max(2000).required(),
});

//update Booking Validation (only Partial update allowed in Update, so set at least one field required. cannot make required() for every field )
const updateBookingSchema = Joi.object({
  car_name: Joi.string().trim().min(3),
  days: Joi.number().integer().min(1).max(364),
  rent_per_day: Joi.number().min(1).max(2000),
  status: Joi.string().valid("booked", "completed", "cancelled"),
}).min(1); //at least 1 field required..

// Booking ID validation(params)
const bookingIdValidationSchema = Joi.object({
  bookingId: Joi.string().required(),
});

module.exports = {
  bookingValidationSchema,
  updateBookingSchema,
  bookingIdValidationSchema,
};

/*
In update APIs, we don’t use required() because updates are partial. Instead, we use .min(1) to ensure at least one field is provided.

=> Create API:
All fields required → use .required()

=> Update API:
Partial update allowed → use .min(1)


Q)when do u use validation ?
Validation is applied at API level -  mainly for request body, params, and query to ensure only valid data reaches business logic.
*/

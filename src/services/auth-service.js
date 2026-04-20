const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user-model");

//signup service
const signup = async ({ username, password }) => {
  //if user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw { status: 409, message: "Username already exists" };
  }

  //hashing password
  const hashedPassword = await bcrypt.hash(password, 10);

  //creating user
  const user = await User.create({ username, password: hashedPassword });

  return {
    message: "User created successfully",
    userId: user._id,
  };
};

//login services
const login = async ({ username, password }) => {
  //if user exists
  const user = await User.findOne({ username });
  if (!user) {
    throw { status: 401, message: "User does not exist" };
  }
  //compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw { status: 401, message: "Incorrect password" };
  }

  //generate JWT
  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  return {
    message: "Login successful",
    token,
  };
};

module.exports = { signup, login };

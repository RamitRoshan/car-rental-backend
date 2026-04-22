const authService = require("../services/auth-service");

//signup controller
const signup = async (req, res) => {
  try {
    const result = await authService.signup(req.body);

    return res.status(201).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "something went wrong" });
  }
};

//login controller
const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);

    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Something went wrong" });
  }
};

module.exports = {
  signup,
  login,
};

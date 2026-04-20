const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const userAuth = async (req, res, next) => {
  try {
    //Get Authorization header (Authorization: Bearer <TOKEN>)
    const authHeader = req.headers.authorization;

    //Check if header exists
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: "Authorization header missing",
      });
    }

    //Check Bearer token format
    const parts = authHeader.split(" "); //"Bearer abc123" => ["Bearer", "abc123"] , breaking string into pieces

    //We expect EXACTLY 2 parts: 1. Bearer 2.Token
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({success: false, error: "Token missing after Bearer"});
    }

    //parts[0] = "Bearer" (not useful), parts[1] = actual token 
    const token = parts[1];

    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded = { userId: 1, username: "rahul" }

    //Find user in DB
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ success: false, error: "User not found" });
    }

    //Attach user to request
    req.user = {
      userId: user._id,
      username: user.username,
    };

    //Move to next middleware/controller
    next();
    
  } catch (err) {
    return res.status(401).json({ success: false, error: "Token invalid" });
  }
};

module.exports = userAuth;


/*
Why use success flag?
It provides a consistent response structure, making it 
easier for frontend to handle success and error cases.

Q). What is Bearer?
In HTTP headers, token is sent like this:
    Authorization: Bearer abc123xyz

Here:
Bearer = type of authentication
abc123xyz = actual token (JWT)

Meaning:

I am bearing (carrying) this token to prove my identity
*/

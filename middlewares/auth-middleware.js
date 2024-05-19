const jwt = require('jsonwebtoken');
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized HTTP, Token not provided' });
  }

  // Ensure the token format is correct
  if (!token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  console.log('Token from auth middleware:', jwtToken);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    const userData = await User.findOne({ email: isVerified.email }).select({ password: 0 });
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach user data and token to request object for further use
    req.user = {
      userId: userData._id,
      email: userData.email,
      isAdmin: userData.isAdmin
    };
    req.token = token;

    next();
  } catch (error) {
    console.error('Error in auth middleware:', error);
    return res.status(401).json({ message: 'Unauthorized HTTP, Token is invalid or expired' });
  }
}

module.exports = authMiddleware;

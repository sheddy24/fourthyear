// authMiddleware.js

const jwt = require("jsonwebtoken");

// Middleware function to authenticate user's JWT token
const authenticateMiddleware = (req, res, next) => {
  // Extract the JWT token from the request headers
  const token = req.headers.authorization;

  console.log({token});

  // Check if token is present
  if (!token) {
    return res.status(401).json({ error: "Authorization token missing" });
  }

  try {
    // Verify the JWT token
    const decodedToken = jwt.verify(token, "web_master");
    console.log(decodedToken)

    // Set the user ID in the request object
    req.userId = decodedToken.userId;
    console.log(req.userId);

    // Call next middleware
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authenticateMiddleware;


import jwt from "jsonwebtoken";

// Verify customer authentication token
const customerAuthMiddleware = (req, res, next) => {
  try {
    // Get authorization header
    const authHeader = req.headers.authorization;

    // Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required."
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Allow customer accounts only
    if (decoded.role !== "customer" || !decoded.customer_id) {
      return res.status(403).json({
        success: false,
        message: "Customer access only."
      });
    }

    // Store authenticated customer information
    req.customer = {
      customer_id: decoded.customer_id,
      role: decoded.role
    };

    // Continue to the next middleware or controller
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token."
    });
  }
};

export default customerAuthMiddleware;

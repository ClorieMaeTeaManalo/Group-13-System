
import loginCustomer from "../services/customerLoginService.js";

// Handle customer login request
export const login = async (req, res) => {
  try {
    // Get email and password from request
    const { email, password } = req.body;

    // Verify customer credentials
    const customer = await loginCustomer(email, password);

    // Return successful login response
    return res.status(200).json({
      success: true,
      message: "Login successful.",
      customer
    });

  } catch (error) {
    // Handle incorrect login details
    if (
      error.message === "Invalid email or password." ||
      error.message === "Email and password are required."
    ) {
      return res.status(401).json({
        success: false,
        message: error.message
      });
    }

    // Handle server errors
    return res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
};

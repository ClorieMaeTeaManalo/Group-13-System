import registerCustomer from "../services/customerService.js";
import verifyOTP from "../services/otpVerificationService.js";

export const register = async (req, res) => {
  try {
    const customer = await registerCustomer(req.body);

    return res.status(201).json({
      success: true,
      message: "Customer registered successfully!",
      data: customer
    });

  } catch (error) {
    console.error("Customer Registration Error:", error.message);
console.error("Full Error:", error);

    const validationErrors = [
      "All fields are required.",
      "Name must contain at least 2 characters.",
      "Please enter a valid email address.",
      "Please enter a valid contact number.",
      "Password must be at least 8 characters.",
      "Password must contain at least one special character.",
      "Email is already registered."
    ];

    const statusCode = validationErrors.includes(error.message)
      ? error.message === "Email is already registered." ? 409 : 400
      : 500;

    return res.status(statusCode).json({
      success: false,
      message: statusCode === 500
        ? "Something went wrong during registration."
        : error.message
    });
  }
};

// Verify customer email using OTP
export const verifyCustomerOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate required fields
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required."
      });
    }

    // Verify OTP
    await verifyOTP(email.trim().toLowerCase(), otp);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully."
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
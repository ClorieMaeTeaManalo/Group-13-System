import registerCustomer from "../services/customerService.js";

export const register = async (req, res) => {
  try {
    const customer = await registerCustomer(req.body);

    return res.status(201).json({
      success: true,
      message: "Customer registered successfully!",
      data: customer
    });

  } catch (error) {
    console.error("Customer Registration Error:", error);

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


import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Customer from "../models/Customer.js";

// Verify customer login credentials
const loginCustomer = async (email, password) => {

  // Check required fields
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  // Check JWT secret
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret is not configured.");
  }

  // Find customer using email
  const customer = await Customer.findByEmail(
    email.trim().toLowerCase()
  );

  // Check if customer exists
  if (!customer) {
    throw new Error("Invalid email or password.");
  }

  // Compare submitted password with hashed password
  const passwordMatch = await bcrypt.compare(
    password,
    customer.password
  );

  // Check password validity
  if (!passwordMatch) {
    throw new Error("Invalid email or password.");
  }

  // Create JWT authentication token
  const token = jwt.sign(
    {
      customer_id: customer.customer_id,
      role: "customer"
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );

  // Return customer information and token
  return {
    customer_id: customer.customer_id,
    name: customer.name,
    email: customer.email,
    contact_number: customer.contact_number,
    role: "customer",
    token
  };
};

export default loginCustomer;

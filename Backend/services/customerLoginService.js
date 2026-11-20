
import bcrypt from "bcrypt";
import Customer from "../models/Customer.js";

// Verify customer login credentials
const loginCustomer = async (email, password) => {

  // Check required fields
  if (!email || !password) {
    throw new Error("Email and password are required.");
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

  // Return customer information and role
  return {
    customer_id: customer.customer_id,
    name: customer.name,
    email: customer.email,
    contact_number: customer.contact_number,
    role: "customer"
  };
};

export default loginCustomer;

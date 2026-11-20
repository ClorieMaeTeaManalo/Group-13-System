import bcrypt from "bcrypt";
import Customer from "../models/Customer.js";

const registerCustomer = async (customerData) => {
  const { name, email, contact_number, password } = customerData;

  // Validate required fields
  if (!name || !email || !contact_number || !password) {
    throw new Error("All fields are required.");
  }

  // Validate name
  if (typeof name !== "string" || name.trim().length < 2) {
    throw new Error("Name must contain at least 2 characters.");
  }

  // Normalize email
  const normalizedEmail = email.trim().toLowerCase();

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(normalizedEmail)) {
    throw new Error("Please enter a valid email address.");
  }

  // Validate contact number
  const normalizedContact = String(contact_number).trim();
  const contactRegex = /^\+?[0-9]{10,15}$/;

  if (!contactRegex.test(normalizedContact)) {
    throw new Error("Please enter a valid contact number.");
  }

  // Validate password
  if (typeof password !== "string" || password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  // Require at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    throw new Error("Password must contain at least one special character.");
  }

  // Check duplicate email
  const existingCustomer = await Customer.findByEmail(normalizedEmail);

  if (existingCustomer) {
    throw new Error("Email is already registered.");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save customer
  const customerId = await Customer.create({
    name: name.trim(),
    email: normalizedEmail,
    contact_number: normalizedContact,
    password: hashedPassword
  });

  return {
    customer_id: customerId,
    name: name.trim(),
    email: normalizedEmail,
    contact_number: normalizedContact
  };
};

export default registerCustomer;

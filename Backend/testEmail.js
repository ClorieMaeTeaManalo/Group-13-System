// Load environment variables
import 'dotenv/config';

// Check if Gmail credentials are loaded
console.log("EMAIL_USER:", process.env.EMAIL_USER ? "Loaded" : "Missing");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");

// Import email transporter
import transporter from './config/emailConfig.js';

// Test Gmail connection
try {
  await transporter.verify();
  console.log("Gmail connection successful!");
} catch (error) {
  console.error("Error code:", error.code);
  console.error("Error message:", error.message);
}
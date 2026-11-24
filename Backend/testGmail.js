// Load environment variables
import "dotenv/config";

// Import Gmail API configuration
import gmail from "./config/gmailConfig.js";

// Test Gmail API connection
const testGmail = async () => {
  try {
    // Check Gmail account connection
    const response = await gmail.users.getProfile({
      userId: "me"
    });

    console.log("Gmail API connection successful!");
    console.log("Connected Gmail:", response.data.emailAddress);

  } catch (error) {
    console.error("Gmail API connection failed!");
    console.error("Error:", error.message);
  }
};

// Run test
testGmail();
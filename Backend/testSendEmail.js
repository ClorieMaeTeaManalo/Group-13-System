// Load environment variables
import "dotenv/config";

// Import Gmail email service
import sendEmail from "./services/gmailService.js";

// Test email sending
const testSendEmail = async () => {
  try {
    await sendEmail(
      process.env.EMAIL_USER,
      "Bella Beach Gmail API Test",
      "Congratulations! Gmail API is working."
    );

    console.log("Test email sent successfully!");

  } catch (error) {
    console.error("Email sending failed:", error.message);
  }
};

// Run test
testSendEmail();
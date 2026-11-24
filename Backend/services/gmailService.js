import gmail from "../config/gmailConfig.js";

// Function for sending email using Gmail API
const sendEmail = async (to, subject, message) => {
  try {

    // Create email content
    const emailContent = [
      `To: ${to}`,
      `Subject: ${subject}`,
      "Content-Type: text/plain; charset=utf-8",
      "",
      message
    ].join("\n");

    // Convert email content to Base64URL
    const encodedMessage = Buffer
      .from(emailContent)
      .toString("base64url");

    // Send email using Gmail API
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage
      }
    });

    return true;

 } catch (error) {
  console.error("Gmail API Error:", error.message);
  console.error(
    "Gmail API Details:",
    error.response?.data || error
  );

  throw new Error("Unable to send verification email.");
}
};

export default sendEmail;
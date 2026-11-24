import { google } from "googleapis";

// Create OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

// Set refresh token
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

// Create Gmail API client
const gmail = google.gmail({
  version: "v1",
  auth: oauth2Client
});

// Export Gmail client
export default gmail;
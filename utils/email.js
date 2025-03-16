const nodemailer = require("nodemailer");
const moment = require("moment-timezone");
const config = require("../config/config");
const logger = require("../config/logger");

const transport = nodemailer.createTransport(config.email.SMTP);

transport
  .verify()
  .then(() => logger.info("Connected to Email Server"))
  .catch((error) => logger.error("Error connecting to email server", error));

const sendEmail = async (to, subject, html) => {
  try {
    const message = {
      from: config.email.FROM,
      to,
      subject,
      html,
    };

    let resp = await transport.sendMail(message);
    return resp.messageId;
  } catch (error) {
    logger.error("Error sending email:", error);
  }
};

const getVerificationEmailTemplate = (name, verificationLink) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
                text-align: center;
            }
            .container {
                max-width: 500px;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                margin: 0 auto;
            }
            .button {
                display: inline-block;
                padding: 12px 20px;
                font-size: 16px;
                font-weight: bold;
                color: #ffffff;
                background-color: #007bff;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
            }
            .footer {
                font-size: 12px;
                color: #777;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Welcome, ${name}!</h2>
            <p>Thank you for signing up. Please verify your email address to activate your account.</p>
            <a class="button" href="${verificationLink}">Verify Account</a>
            <p>If you did not request this, please ignore this email.</p>
            <p class="footer">&copy; ${new Date().getFullYear()} QuizMaster. All Rights Reserved.</p>
        </div>
    </body>
    </html>
    `;
};

const sendVerificationEmail = (email, name, token) => {
  const verificationLink = `${config.BASE_URL}/verify-email/${token}`;
  const html = getVerificationEmailTemplate(name, verificationLink);
  sendEmail(email, "Verify Your Email Address", html);
};

module.exports = {
  transport,
  sendEmail,
  sendVerificationEmail
};

const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});

const emailSender = async (email, username, link) => {
  const emailInfo = transport.sendMail({
    from: process.env.user,
    subject: "Password reset link",
    to: email,
    html: `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
        
          .logo {
            text-align: center;
            margin-bottom: 20px;
          }
        
          .logo img {
            width: 100px;
          }
        
          h2 {
            text-align: center;
            color: #333;
          }
        
          p {
            color: #555;
          }
        
          .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
          }
        
          .btn:hover {
            background-color: #0056b3;
          }
        </style>
        </head>
        <body>
          <div class="container">
            <h2>Password Reset</h2>
            <p>Hello ${username},</p>
            <p>We received a request to reset your password. Click the link below to reset your password:</p>
            ${link}
            <p>If you didn't request to reset your password, you can ignore this email.</p>
            <p>Thank you,</p>
          </div>
        </body>
        </html>`,
  });
};

module.exports = emailSender;

require("dotenv").config();

const username = "Mares";
const email = "popa.mares@gmail.com";

sendEmailTo(username, email);

function sendEmailTo(username, email) {
  const nodemailer = require("nodemailer");
  const nodemailerConfig = {
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.OUTLOOK_EMAIL,
      pass: process.env.OUTLOOK_PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(nodemailerConfig);

  let mailOptions = {
    from: "a.popa.goit@outlook.com", // adresa de unde trimit email
    to: email, // adresa unde trimit email
    subject: "Test Email", // Titlul emailului
    text: `Welcome ${username} to myApp!`, // Continutul emailul
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

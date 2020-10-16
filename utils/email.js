const nodemailer = require("../node_modules/nodemailer/lib/nodemailer");

const sendEmail = async (options) => {
  //1) create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // Activate in gmail 'less secure app" option
  });
  //2) define email options
  const mailOptions = {
    from: "test3 <test3@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html
  };
  //3) send email
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;

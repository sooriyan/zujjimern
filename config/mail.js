const nodemailer = require('nodemailer');
const sendMail = (tomail, subject, html) => {
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'sooriyan10898@gmail.com', // generated ethereal user
      pass: 'Haulehaule1*', // generated ethereal password
    },
  });
  var mailOptions = {
    from: 'Zujji',
    to: tomail,
    subject: subject,
    html: html,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info.response);
    }
  });
};

module.exports = sendMail;

const nodemailer = require('nodemailer');

let sendMailer = (data, cb) => {

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mssgsrvc@gmail.com',
      pass: '1234golu'
    }
  });

  transporter.sendMail(data, function (err, info) {
    if (err)
      cb(err, null)
    else
      cb(null, info)
  });
}

module.exports = {
  sendMailer: sendMailer
}





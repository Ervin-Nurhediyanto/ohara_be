const nodemailer = require('nodemailer')
// const fs = require('fs');

// Test HTML to nodemailer
// const readHTMLFile = function(path, callback) {
//   fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
//       if (err) {
//           throw err;
//           callback(err);
//       }
//       else {
//           callback(null, html);
//       }
//   });
// };

// smtpTransport = nodemailer.createTransport(smtpTransport({
//     host: mailConfig.host,
//     secure: mailConfig.secure,
//     port: mailConfig.port,
//     auth: {
//         user: mailConfig.auth.user,
//         pass: mailConfig.auth.pass
//     }
// }));

// readHTMLFile(__dirname + 'app/public/pages/emailWithPDF.html', function(err, html) {
//   var template = handlebars.compile(html);
//   var replacements = {
//        username: "John Doe"
//   };
//   var htmlToSend = template(replacements);
//   var mailOptions = {
//       from: 'my@email.com',
//       to : 'some@email.com',
//       subject : 'test subject',
//       html : htmlToSend
//    };
//   smtpTransport.sendMail(mailOptions, function (error, response) {
//       if (error) {
//           console.log(error);
//           callback(error);
//       }
//   });
// });
//

module.exports = {
  send: (email) => {
    const transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.MAIL_FROM_ADDRESS,
        pass: process.env.MAIL_PASSWORD
      }
    })

    const mailOptions = {
      from: process.env.MAIL_FROM_ADDRESS,
      to: email,
      subject: 'Reset your password',
      html: '<p>You requested for a password reset, kindly use this <a href=' + process.env.RESET_URL + '>link</a> to reset your password</p><br><p>Cheers!</p>'
      // html: ''
    }

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) throw err
      console.log('Email sent: ' + mailOptions.to + ' ' + info.response)
    })
  }
}
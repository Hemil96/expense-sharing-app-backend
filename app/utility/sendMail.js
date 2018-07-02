var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hemilpatel1996@gmail.com',
    pass: ''
  }
});

var mailOptions = {
  from: 'hemilpatel1996@gmail.com',
  to: 'hemilpatel41196@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
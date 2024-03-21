const transporter = require('#SERVICES/nodemailer');
const { SENDER_MAIL: senderMail } = process.env;
const { MISSING_PARAMS_ERROR } = require('#ERRORS');

const sendOrderEmailController = ({ email, message }) => {
  if (!email || !message) throw new MISSING_PARAMS_ERROR('Missing params');

  const subject = 'Resumen de tu orden';

  return new Promise((resolve, reject) => {
    const mailConfig = {
      from: senderMail,
      to: email,
      subject,
      html: message
    };

    transporter.sendMail(mailConfig, function (error) {
      if (error) {
        console.error(`Error sending email: \n${error}`);
        throw new Error(error);
      }
      return resolve({ message: 'Email sent succesfuly' });
    });
  });
};

module.exports = sendOrderEmailController;

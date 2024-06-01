const transporter = require('#SERVICES/nodemailer');
const { SENDER_MAIL: senderMail, DESTINATION_EMAIL: destinationEmail } = process.env;
const { MISSING_PARAMS_ERROR } = require('#ERRORS');

const sendContactEmailController = ({ name, message, replyTo }) => {
  if (!name || !message || !replyTo) {
    throw new MISSING_PARAMS_ERROR('Missing params');
  }

  const subject = `Contacto de ${name}`;

  return new Promise((resolve, reject) => {
    const mailConfig = {
      from: senderMail,
      to: destinationEmail,
      subject,
      html: message,
      replyTo
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

module.exports = sendContactEmailController;

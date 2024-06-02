const transporter = require('#SERVICES/nodemailer');
const { SENDER_MAIL: senderMail } = process.env;
const { Users } = require('#DB_CONNECTION');
const { MISSING_PARAMS_ERROR, USER_NOT_FOUND_ERROR } = require('#ERRORS');

const sendRegisterEmailController = async ({ message, id }) => {
  if (!message || !id) throw new MISSING_PARAMS_ERROR('Missing params');

  const subject = 'Bienvenido a la familia de IDE Pinturería';
  const user = await Users.findOne({ where: { id } });
  if (!user) throw new USER_NOT_FOUND_ERROR(`User with id ${id} not found`);
  const email = user.email;

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

module.exports = sendRegisterEmailController;

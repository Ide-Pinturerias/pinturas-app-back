const transporter = require('../../services/nodemailer');
const { SENDER_MAIL: email } = process.env;

const sendContactEmailController = ({ name, message, replyTo }) => {

    const subject = `Contacto de ${name}`;

    return new Promise((resolve, reject) => {

        const mail_configs = {
            from: email,
            to: email,
            subject,
            html: message,
            replyTo,
        };

        transporter.sendMail(mail_configs, function (error,) {
            if (error) {
                console.log(error);
                return reject({ message: `An error has occured` });
            }
            return resolve({ message: "Email sent succesfuly" });
        });

    });

};

module.exports = sendContactEmailController;

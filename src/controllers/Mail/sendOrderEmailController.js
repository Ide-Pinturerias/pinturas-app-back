const transporter = require('#SERVICES/nodemailer');
const { SENDER_MAIL: sender_email } = process.env;
const { MISSING_PARAMS_ERROR } = require('#ERRORS');

const sendOrderEmailController = ({ email, message }) => {

    if (!email || !message) throw new MISSING_PARAMS_ERROR("Missing params");

    const subject = `Resumen de tu orden`;

    return new Promise((resolve, reject) => {

        const mail_configs = {
            from: sender_email,
            to: email,
            subject,
            html: message,
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

module.exports = sendOrderEmailController;

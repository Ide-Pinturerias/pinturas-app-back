const transporter = require('#SERVICES/nodemailer');
const { SENDER_MAIL: sender_email } = process.env;
const { Users } = require('#DB_CONNECTION');
const { MISSING_PARAMS_ERROR, USER_NOT_FOUND_ERROR } = require('#ERRORS');

const sendRegisterEmailController = async ({ message, id }) => {

    if (!message || !id) throw new MISSING_PARAMS_ERROR("Faltan parametros");

    const subject = `Bienvenido a la familia de IDE Pinturería`;
    const user = await Users.findOne({ where: { id } });
    if (!user) throw new USER_NOT_FOUND_ERROR(`Usuario con id ${id} no encontrado`);
    const email = user.email;

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

module.exports = sendRegisterEmailController;

const { MailControllers } = require('#CONTROLLERS');
const { sendOrderEmail } = MailControllers;

const sendOrderEmailHandler = async (req, res) => {

    const { email, message } = req.body;

    try {

        const { message: messageSent } = await
            sendOrderEmail({ email, message });
        return res.status(200).json({ message: messageSent });

    }
    catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message,
        });
    }

};

module.exports = sendOrderEmailHandler;

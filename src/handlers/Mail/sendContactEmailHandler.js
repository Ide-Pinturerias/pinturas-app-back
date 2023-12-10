const { MailControllers } = require("#CONTROLLERS");
const { sendContactEmail } = MailControllers;

const sendContactEmailHandler = async (req, res) => {

    const { name, message, replyTo } = req.body;

    try {

        const { message: messageSent } = await
            sendContactEmail({ name, message, replyTo });
        return res.status(200).json({ message: messageSent });

    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message,
        });
    }

};

module.exports = sendContactEmailHandler;

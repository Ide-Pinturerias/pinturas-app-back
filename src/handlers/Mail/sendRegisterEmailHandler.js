const { MailControllers } = require("#CONTROLLERS");
const { sendRegisterEmail } = MailControllers;

const sendRegisterEmailHandler = async (req, res) => {

    try {

        const { id } = req.params;

        const { message } = req.body;
        const { message: messageSent } = await
            sendRegisterEmail({ id, message });
        return res.status(200).json({ message: messageSent });

    }
    catch (error) {
        console.error(`Error sending register email: ${error.message}`);

        return res.status(error.status || 500).json({
            name: error.name,
            message: error.message,
        });
    }

};

module.exports = sendRegisterEmailHandler;

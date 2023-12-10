const { MailControllers } = require("#CONTROLLERS");
const { sendRegisterEmail } = MailControllers;

const sendRegisterEmailHandler = async (req, res) => {

    const { id } = req.params;

    const { message } = req.body;

    try {

        const { message: messageSent } = await
            sendRegisterEmail({ id, message });
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

module.exports = sendRegisterEmailHandler;

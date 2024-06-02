const { MailControllers } = require('#CONTROLLERS');
const { sendOrderEmail } = MailControllers;

const sendOrderEmailHandler = async (req, res) => {
  try {
    const { email, message } = req.body;
    const { message: messageSent } = await
    sendOrderEmail({ email, message });
    return res.status(200).json({ message: messageSent });
  } catch (error) {
    console.error(`Error sending order email: ${error.message}`);

    return res.status(error.status || 500).json({
      name: error.name,
      message: error.message
    });
  }
};

module.exports = sendOrderEmailHandler;

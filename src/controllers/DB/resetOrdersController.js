const { Orders } = require('#DB_CONNECTION');


const resetOrdersController = async () => {

    try {
        await Orders.sync({ force: true });
        console.log("Ordenes reseteadas correctamente :D");
    } catch (error) {
        console.error("Error reseteando las ordenes :(");
        console.error(error);
    }
};

module.exports = resetOrdersController;

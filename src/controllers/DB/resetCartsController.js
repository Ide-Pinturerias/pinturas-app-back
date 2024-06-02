const { Carts } = require('../../db');

const resetCartsController = () => {
  Carts.sync({ force: true }).then(
    () => console.log('Carros de compra reseteados correctamente!')
  ).catch(error => {
    console.log('Error al resetear los carros de compra!');
    console.error(error);
  });
};

module.exports = resetCartsController;

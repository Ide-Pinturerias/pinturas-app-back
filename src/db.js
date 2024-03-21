const { Sequelize } = require('sequelize');
require('dotenv').config();
const {
  DATABASE_URL,
  DATABASE_URL_TEST,
  DATABASE_URL_LOCAL,
  NODE_ENV
} = process.env;
const fs = require('fs');
const path = require('path');

let sequelizeInstance = null;
if (NODE_ENV === 'main') {
  sequelizeInstance = createDBInstance(DATABASE_URL);
  console.info('[DB] MAIN ENVIRONMENT');
} else if (NODE_ENV === 'test') {
  sequelizeInstance = createDBInstance(DATABASE_URL_TEST);
  console.info('[DB] TESTING ENVIRONMENT');
} else {
  sequelizeInstance = createDBInstance(DATABASE_URL_LOCAL);
  console.info('[DB] LOCAL ENVIRONMENT');
}

function createDBInstance (dataBaseUrl) {
  try {
    // Creamos la instancia de Sequelize
    const sequelizeInstance = new Sequelize(dataBaseUrl, {
      // set to console.log to see the raw SQL queries
      logging: false,
      // lets Sequelize know we can use pg-native for ~30% more speed
      native: false,
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    });
    // Injectamos los modelos a la instancia de sequelize
    injectModels(sequelizeInstance);

    // Injectamos las relaciones
    const { createRelations } = require('./dbRelations');
    createRelations(sequelizeInstance);

    return sequelizeInstance;
  } catch (error) {
    console.log('Error al cargar la base de datos :(');
    console.error(error);
  }
}

function injectModels (sequelizeInstance) {
  const basename = path.basename(__filename);
  const modelDefiners = [];
  // Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al
  // arreglo modelDefiners
  fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) =>
      (file.indexOf('.') !== 0) &&
      (file !== basename) &&
      (file.slice(-3) === '.js')
    ).forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });

  // Injectamos la conexion (sequelize) a todos los modelos
  modelDefiners.forEach(model => model(sequelizeInstance));
  // Capitalizamos los nombres de los modelos ie: product => Product
  const entries = Object.entries(sequelizeInstance.models);
  const capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() +
    entry[0].slice(1), entry[1]]);
  sequelizeInstance.models = Object.fromEntries(capsEntries);
}

module.exports = {
  // De esta manera podemos acceder a los modelos por el nombre
  // de la entidad e.g. User, Product, etc.
  ...sequelizeInstance.models,
  // Para tener acceso a la conexión desde cualquier parte
  conn: sequelizeInstance,
  // Para poder testear las diferentes conexiones
  createDBInstance
};

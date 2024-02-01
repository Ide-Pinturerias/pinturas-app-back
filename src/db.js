const { Sequelize } = require('sequelize');
const { parsed: ENV } = require('dotenv').config();
const { DB_USER, DB_PASS, DB_HOST, DB_NAME, NODE_ENV } = process.env;
const fs = require('fs');
const path = require('path');

let sequelizeInstance = null;
if (NODE_ENV === 'test') {
  const {
    DB_TEST_USER, DB_TEST_PASS,
    DB_TEST_HOST, DB_TEST_NAME
  } = process.env;
  sequelizeInstance = createDBInstance(DB_TEST_USER, DB_TEST_PASS,
    DB_TEST_HOST, DB_TEST_NAME);
  console.info('[DB] TESTING ENVIRONMENT');
} else if (NODE_ENV === 'local' || NODE_ENV === 'tunnel') {
  const {
    DB_LOCAL_USER, DB_LOCAL_PASS,
    DB_LOCAL_HOST, DB_LOCAL_NAME
  } = ENV;
  sequelizeInstance = createDBInstance(DB_LOCAL_USER, DB_LOCAL_PASS,
    DB_LOCAL_HOST, DB_LOCAL_NAME);
  console.info(`[DB] LOCAL ${NODE_ENV === 'tunnel' ? '(TUNNEL)' : ''} ENVIRONMENT`);
  if (NODE_ENV === 'tunnel') {
    console.info(`[DB] TUNNEL URL: ${ENV.TUNNEL_URL}`);
  }
} else {
  sequelizeInstance = createDBInstance();
  console.info('[DB] MAIN ENVIRONMENT');
}

function createDBInstance (user = DB_USER, pass = DB_PASS,
  host = DB_HOST, name = DB_NAME) {
  const dataBaseUrl = `postgres://${user}:${pass}@${host}/${name}`;
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

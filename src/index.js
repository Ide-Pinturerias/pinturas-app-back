const server = require('#SERVER');
const { conn } = require('#DB_CONNECTION');
require('dotenv').config();
const { NODE_PORT = 3000 } = process.env;

// Syncing all the models at once.
conn.sync({ alter: false }).then(() => {
  server.listen(NODE_PORT, '0.0.0.0', async () => {
    console.log(`Server listening on port ${NODE_PORT}`);
  });
});

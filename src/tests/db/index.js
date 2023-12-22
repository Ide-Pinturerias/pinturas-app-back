const { createDBInstance } = require('#DB_CONNECTION');
const CHAI = require('chai');
const should = CHAI.should();
const expect = CHAI.expect;

let dbInstance = null;
if (process.env.NODE_ENV === 'local') {
  const {
    DB_LOCAL_USER, DB_LOCAL_PASS,
    DB_LOCAL_HOST, DB_LOCAL_NAME
  } = process.env;
  dbInstance = createDBInstance(DB_LOCAL_USER, DB_LOCAL_PASS,
    DB_LOCAL_HOST, DB_LOCAL_NAME);
}

const DB_TESTS = () => {
  it('should create an instance of Sequelize', () => {
    should.exist(dbInstance);
  });

  it('should connect to the database', async () => {
    const connectionPromise = dbInstance.authenticate().then(() => true).catch(() => false);
    const connection = await connectionPromise;
    expect(connection).to.equal(true);
  });

  it('should disconnect from the database', async () => {
    // await dbInstance.authenticate();
    const disconnectionPromise = dbInstance.close().then(() => true).catch(() => false);
    const disconnection = await disconnectionPromise;
    expect(disconnection).to.equal(true);
  });
};

module.exports = DB_TESTS;

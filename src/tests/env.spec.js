const CHAI = require('chai');
const should = CHAI.should();
require('dotenv').config();

describe('Environment variables', () => {
  describe('DB variables', () => {
    it('should have a DB_NAME variable', () => {
      should.exist(process.env.DB_NAME);
    });
    it('should have a DB_HOST variable', () => {
      should.exist(process.env.DB_HOST);
    });
    it('should have a DB_USER variable', () => {
      should.exist(process.env.DB_USER);
    });
    it('should have a DB_PASS variable', () => {
      should.exist(process.env.DB_PASS);
    });
  });

  describe('Cloudinary variables', () => {
    it('should have a CLOUD_NAME variable', () => {
      should.exist(process.env.CLOUD_NAME);
    });
    it('should have a CLOUD_KEY variable', () => {
      should.exist(process.env.CLOUD_KEY);
    });
    it('should have a CLOUD_SECRET variable', () => {
      should.exist(process.env.CLOUD_SECRET);
    });
  });

  describe('Mail variables', () => {
    it('should have a SENDER_MAIL variable', () => {
      should.exist(process.env.SENDER_MAIL);
    });
    it('should have a SENDER_PASS variable', () => {
      should.exist(process.env.SENDER_PASS);
    });
  });

  describe('MercadoLibre variables', () => {
    it('should have a MELI_ACCESS_TOKEN variable', () => {
      should.exist(process.env.MELI_ACCESS_TOKEN);
    });
  });

  describe('Auth0 variables', () => {
    it('should have a JWT_SECRET variable', () => {
      should.exist(process.env.JWT_SECRET);
    });
    it('should have a SECRET_AUTH_ZERO variable', () => {
      should.exist(process.env.SECRET_AUTH_ZERO);
    });
    it('should have a CLIENT_ID_AUTH_ZERO variable', () => {
      should.exist(process.env.CLIENT_ID_AUTH_ZERO);
    });
    it('should have a ISSUER_BASE_URL variable', () => {
      should.exist(process.env.ISSUER_BASE_URL);
    });
    it('should have a BASE_URL_LOCAL_AUTH_ZERO variable', () => {
      should.exist(process.env.BASE_URL_LOCAL_AUTH_ZERO);
    });
  });
});

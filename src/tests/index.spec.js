const DB_TESTS = require('#TESTS/db');
const CONTROLLERS_TESTS = require('#TESTS/controllers');

describe('Local Test Suite', async () => {
    describe('Database Tests', DB_TESTS);
    describe('Controllers Tests', CONTROLLERS_TESTS);
});

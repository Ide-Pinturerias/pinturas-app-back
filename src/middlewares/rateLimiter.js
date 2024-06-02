const RateLimiter = require('express-rate-limit');

const createRateLimiter = (mins = 0, hours = 1, maxPets = 5) => RateLimiter({
  windowMs: mins * 60 * 1000 + hours * 60 * 60 * 1000,
  max: maxPets, // limit each IP petitions per windowMs
  message: 'Error: Too many requests. Try again later.'
});

module.exports = createRateLimiter;

const { Reviews } = require("#DB_CONNECTION");

const getReviewByIdController = async (id) => {
  const review = await Reviews.findByPk(id);
  return review;
};

module.exports = getReviewByIdController;

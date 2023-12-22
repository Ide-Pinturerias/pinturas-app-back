const { ReviewsControllers } = require('#CONTROLLERS');
const { createReview } = ReviewsControllers;

const createReviewsHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, rating, productsReviews } = req.body;
    const postReview = await createReview({
      description, rating, orderId: id, productsReviews
    });

    return res.status(201).json({
      status: 'success',
      message: 'Review creado exitosamente',
      review: postReview
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = createReviewsHandler;

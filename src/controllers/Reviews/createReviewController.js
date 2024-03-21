const { Reviews, Orders, Products } = require('#DB_CONNECTION');

const createReviewController = async ({
  orderId,
  description, rating, productsReviews
}) => {
  const order = await Orders.findByPk(orderId);

  if (!order) throw Error('ORDEN NO ENCONTRADA');

  // const review = await order.getReview();
  // if (review) {
  //     throw new Error('ESTA ORDEN YA TIENE UNA REVIEW');
  // }

  const newReview = await Reviews.create({ description, rating });

  // Actualizamos el rating de los productos
  await Promise.all(productsReviews.map(async (productReview) => {
    const parsedProductReview = JSON.parse(productReview);
    const { id, rating } = parsedProductReview;
    const product = await Products.findByPk(id);
    const productRating = product.rating || 0;
    const productRatingCount = product.nroReviews;
    const num = (parseInt(productRating) * parseInt(productRatingCount) + parseInt(rating));
    const den = (productRatingCount + 1);
    const newProductRating = num / den;
    const roundRating = Math.floor(newProductRating);
    await product.update({
      rating: roundRating,
      nroReviews: productRatingCount + 1
    });
  }));

  await order.setReview(newReview);

  return await Reviews.findByPk(newReview.id);
};

module.exports = createReviewController;

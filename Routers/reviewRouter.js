const express = require('express');
const {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} = require('./../controllers/reviewController');
const { authenticate } = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.route('/').get(getAllReviews).post(authenticate, createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(authenticate, updateReview)
  .delete(authenticate, deleteReview);

module.exports = router;

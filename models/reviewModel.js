const mongoose = require('mongoose');
const Meal = require('./mealModel');

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!'],
      trim: true,
    },
    rating: {
      type: Number,
      min: [1, 'Rating can not be below 1.0'],
      max: [5, 'Rating can not be above 5'],
    },
    meal: {
      type: Schema.Types.ObjectId,
      required: [true, 'Review must belog to a meal!'],
      ref: 'Meal',
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'Review must belog to a user!'],
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

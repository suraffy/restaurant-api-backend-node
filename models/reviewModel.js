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

reviewSchema.pre('save', async function (next) {
  if (this.isNew) {
    const meal = await Meal.findById(this.meal);

    meal.ratingsTotal += this.rating;
    meal.ratingsQuantity++;

    await meal.save();
  } else if (this.isModified('rating')) {
    const meal = await Meal.findById(this.meal);

    meal.ratingsTotal = meal.ratingsTotal - this.oldRating + this.rating;
    await meal.save();
  }

  next();
});

reviewSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    const meal = await Meal.findById(this.meal);

    meal.ratingsTotal -= this.rating;
    meal.ratingsQuantity--;

    await meal.save();

    next();
  }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

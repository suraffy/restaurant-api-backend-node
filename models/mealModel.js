const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Name is required!'],
      minLength: [2, 'Name is too short!'],
      maxLength: [32, 'Name is too long!'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    ratingsTotal: {
      type: Number,
      default: 0,
      select: false,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
    },
    price: {
      type: Number,
      required: [true, 'Price is required!'],
    },
    coverImage: Buffer,
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

mealSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'meal',
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;

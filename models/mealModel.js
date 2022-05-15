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
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Price is required!'],
    },
    coverImage: Buffer,
  },
  { timestamps: true }
);

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;

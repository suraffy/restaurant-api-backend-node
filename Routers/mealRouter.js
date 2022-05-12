const express = require('express');
const {
  getAllMeals,
  getMeal,
  createMeal,
  updateMeal,
  deleteMeal,
} = require('./../controllers/mealController');

const router = express.Router();

router.route('/').get(getAllMeals).post(createMeal);

router.route('/:id').get(getMeal).patch(updateMeal).delete(deleteMeal);

module.exports = router;

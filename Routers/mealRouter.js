const express = require('express');
const {
  getAllMeals,
  getMeal,
  createMeal,
  updateMeal,
  deleteMeal,
} = require('./../controllers/mealController');
const { authenticate, restrictTo } = require('./../controllers/authController');

const router = express.Router();

router.get('/', getAllMeals).get('/:id', getMeal);

router.use(authenticate, restrictTo('admin'));
router.post('/', createMeal);
router.route('/:id').patch(updateMeal).delete(deleteMeal);

module.exports = router;

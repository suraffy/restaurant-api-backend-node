const Meal = require('./../models/mealModel');

const filterObj = (obj, allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((prop) =>
    allowedFields.includes(prop) ? (newObj[prop] = obj[prop]) : undefined
  );

  return newObj;
};

exports.getAllMeals = async (req, res) => {
  try {
    const filter = {};
    let select = '';
    const options = {};

    if (req.query.name) filter.name = req.query.name;
    if (req.query.rating) filter.rating = req.query.rating;
    if (req.query.price) filter.price = req.query.price;
    if (req.query.createdAt) filter.createdAt = req.query.createdAt;

    if (req.query.fields) select = req.query.fields.split(',').join(' ');

    if (req.query.sort) options.sort = req.query.sort.split(',').join(' ');

    if (req.query.limit) options.limit = parseInt(req.query.limit);
    if (req.query.skip) options.skip = parseInt(req.query.skip);

    console.log({ options });

    const meals = await Meal.find(filter, select, options);

    res.status(200).json({ results: meals.length, meals });
  } catch (err) {
    res.status(500).json({ error: 'Can not get Meals!' });
  }
};

exports.getMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id).populate({
      path: 'reviews',
      select: 'review rating user createdAt',
    });
    if (!meal) return res.status(404).json({ error: 'Meal not found!' });

    res.status(200).json({ meal });
  } catch (err) {
    res.status(500).json({ error: 'Can not get Meal!' });
  }
};

exports.createMeal = async (req, res) => {
  try {
    const allowedFields = ['name', 'description', 'price'];
    const filteredBody = filterObj(req.body, allowedFields);

    const meal = new Meal(filteredBody);
    await meal.save();

    res.status(201).json({ meal });
  } catch (err) {
    res.status(400).json({ error: 'Invalid data!' });
  }
};

exports.updateMeal = async (req, res) => {
  try {
    const allowedFields = ['name', 'description', 'price'];
    const filteredBody = filterObj(req.body, allowedFields);

    const meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ error: 'Meal not found!' });

    Object.keys(filteredBody).forEach((el) => (meal[el] = filteredBody[el]));
    await meal.save();

    res.status(200).json({ meal });
  } catch (err) {
    res.status(400).json({ error: 'Invalid data!' });
  }
};

exports.deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ error: 'Meal not found!' });

    await meal.deleteOne();
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ error: 'Can not delete Meal!' });
  }
};

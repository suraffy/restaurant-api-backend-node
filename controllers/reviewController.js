const Review = require('./../models/reviewModel');

const filterObj = (obj, allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) =>
    allowedFields.includes(el) ? (newObj[el] = obj[el]) : undefined
  );

  return newObj;
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ meal: req.params.mealId }).populate({
      path: 'user',
      select: 'name email',
    });

    res.status(200).json({ results: reviews.length, reviews });
  } catch (err) {
    res.status(500).json({ error: 'Can not get reviews!' });
  }
};

exports.getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate({
      path: 'user',
      select: 'name email',
    });
    if (!review) return res.status(404).json({ error: 'Review not found!' });

    res.status(200).json({ review });
  } catch (err) {
    res.status(500).json({ error: 'Can not get review!' });
  }
};

exports.createReview = async (req, res) => {
  try {
    const allowedFields = ['review', 'rating'];
    const filteredBody = filterObj(req.body, allowedFields);

    filteredBody.meal = req.params.mealId;
    filteredBody.user = req.user.id;

    const review = new Review(filteredBody);
    await review.save();

    res.status(200).json({ review });
  } catch (err) {
    res.status(400).json({ error: 'Invalid data!' });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const allowedFields = ['review', 'rating'];
    const filteredBody = filterObj(req.body, allowedFields);

    const review = await Review.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!review) return res.status(404).json({ error: 'Review not found!' });

    Object.keys(filteredBody).forEach((el) => (review[el] = filteredBody[el]));
    await review.save();

    res.status(200).json({ review });
  } catch (err) {
    res.status(400).json({ error: 'Invalid data!' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!review) return res.status(404).json({ error: 'Review not found!' });

    await review.deleteOne();
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ error: 'Can not delete review!' });
  }
};

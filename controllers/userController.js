const User = require('./../models/userModel');

const filterObj = (obj, allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((prop) =>
    allowedFields.includes(prop) ? (newObj[prop] = obj[prop]) : undefined
  );

  return newObj;
};

exports.getMe = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (err) {
    res.status(500).json({ error: 'Can not get profile!' });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const allowedFields = ['name', 'email', 'password'];
    const filteredBody = filterObj(req.body, allowedFields);

    Object.keys(filteredBody).forEach(
      (el) => (req.user[el] = filteredBody[el])
    );
    await req.user.save();

    res.status(200).json({ user: req.user });
  } catch (err) {
    res.status(400).json({ error: 'Invalid data!' });
  }
};

exports.deleteMe = async (req, res) => {
  try {
    await req.user.deleteOne();
    res.status(200).json();
  } catch (err) {
    res.status(500).json({ error: 'Can not delete profile!' });
  }
};

// Only for Admins
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ results: users.length, users });
  } catch (err) {
    res.status(500).json({ error: 'Can not get users!' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not foudn!' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Can not get user!' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const allowedFields = ['name', 'email', 'password'];
    const filteredBody = filterObj(req.body, allowedFields);

    const user = new User(filteredBody);
    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: 'Invalid data!' });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found!' });

    user.role = req.body.role;
    await user.save();

    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ error: 'Invalid data!' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found!' });

    await user.deleteOne();
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ error: 'Can not delete user!' });
  }
};

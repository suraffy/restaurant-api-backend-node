const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');

exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    if (!user) res.status(404).json({ error: 'email or password incorrect!' });

    const token = await user.generateAuthToken();

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    if (!req.header('Authorization').startsWith('Bearer ')) throw new Error();

    const token = req.header('Authorization').split(' ')[1];
    const decoded = jwt.verify(token, 'privatekey');

    const user = await User.findOne({ _id: decoded.id, tokens: token });
    if (!user) throw new Error();

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Please login first!' });
  }
};

exports.restrictTo = (...roles) => {
  return async (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) throw new Error();

      next();
    } catch (err) {
      res
        .status(401)
        .json({ error: 'You are not authorized for this action!' });
    }
  };
};

exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token !== req.token);
    await req.user.save();

    res.status(200).json();
  } catch (err) {
    res.status(500).json({ error: 'Can not logout!' });
  }
};

exports.logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.status(200).json();
  } catch (err) {
    res.status(500).json({ error: 'Can not logout of All!' });
  }
};

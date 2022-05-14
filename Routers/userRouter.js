const express = require('express');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('./../controllers/userController');
const {
  login,
  authenticate,
  restrictTo,
  logout,
  logoutAll,
} = require('./../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/logout', authenticate, logout);
router.post('/logoutall', authenticate, logoutAll);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;

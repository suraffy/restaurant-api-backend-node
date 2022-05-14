const express = require('express');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUserRole,
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

router.post('/', createUser);

router.use(authenticate, restrictTo('admin'));
router.get('/', getAllUsers);
router.route('/:id').get(getUser).patch(updateUserRole).delete(deleteUser);

module.exports = router;

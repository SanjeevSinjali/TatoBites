const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/user');

const router = express.Router();

const { protect, authorize } = require("../middleware/auth.js")
// router.post('/login', loginUser);

router.route('/')
  .get(protect, getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUser)
  .patch(protect, updateUser)
  .delete(protect, authorize('ADMIN'), deleteUser);

module.exports = router;


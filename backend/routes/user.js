const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  accountStatistic
} = require('../controllers/user');

const router = express.Router();

const { protect, authorize } = require("../middleware/auth.js")

router.route('/')
  .get(protect, getUsers)
  .post(createUser);

router.route("/accStat").get(protect, accountStatistic)

router.route('/:id')
  .get(getUser)
  .patch(protect, updateUser)
  .delete(protect, authorize('ADMIN'), deleteUser);

module.exports = router;


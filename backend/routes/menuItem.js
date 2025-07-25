const express = require('express');
const {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require('../controllers/menuItem');

const { protect, authorize } = require("../middleware/auth.js")
const router = express.Router();

router.route('/')
  .get(getMenuItems)
  .post(protect, authorize('ADMIN'), createMenuItem);

router.route('/:id')
  .get(getMenuItem)
  .put(protect, authorize('ADMIN'), updateMenuItem)
  .delete(protect, authorize('ADMIN'), deleteMenuItem);

module.exports = router;


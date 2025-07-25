const express = require('express');
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/order');

const { protect, authorize } = require('../middleware/auth.js')

const router = express.Router();

router.route('/')
  .get(protect, getOrders)
  .post(protect, createOrder);

router.route('/:id')
  .get(protect, getOrder)
  .put(protect, updateOrder)
  .delete(protect, deleteOrder);

module.exports = router;


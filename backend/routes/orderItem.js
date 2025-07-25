const express = require('express');
const {
  getOrderItems,
  getOrderItem,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
} = require('../controllers/orderItem');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getOrderItems)
  .post(protect, createOrderItem);

router.route('/:id')
  .get(getOrderItem)
  .put(protect, updateOrderItem)
  .delete(protect, deleteOrderItem);

module.exports = router;


const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const { OrderItem } = require('../models');

// @desc      Get all order items
// @route     GET /api/v1/order-items
// @access    Private
exports.getOrderItems = asyncHandler(async (req, res, next) => {
  const items = await OrderItem.findAll();
  res.status(200).json({ success: true, data: items });
});

// @desc      Get single order item
// @route     GET /api/v1/order-items/:isd
// @access    Private
exports.getOrderItem = asyncHandler(async (req, res, next) => {
  const item = await OrderItem.findByPk(req.params.id);
  if (!item) {
    return next(new ErrorResponse('Order item not found', 404));
  }
  res.status(200).json({ success: true, data: item });
});

// @desc      Create new order item
// @route     POST /api/v1/order-items
// @access    Private
exports.createOrderItem = asyncHandler(async (req, res, next) => {
  const item = await OrderItem.create(req.body);
  res.status(201).json({ success: true, data: item });
});

// @desc      Update order item
// @route     PUT /api/v1/order-items/:id
// @access    Private
exports.updateOrderItem = asyncHandler(async (req, res, next) => {
  let item = await OrderItem.findByPk(req.params.id);
  if (!item) {
    return next(new ErrorResponse('Order item not found', 404));
  }

  await item.update(req.body);

  const notification = await Notification.findOne({ where: { offerCode: item.code } });
  if (notification) {
    await notification.update({
      title: `Updated Offer: ${offer.title}`,
      type: "ORDER",
      message: offer.description,
      amount: parseFloat(offer.discount_percentage)
    });
  }
  res.status(200).json({ success: true, data: item });
});

// @desc      Delete order item
// @route     DELETE /api/v1/order-items/:id
// @access    Private
exports.deleteOrderItem = asyncHandler(async (req, res, next) => {
  const item = await OrderItem.findByPk(req.params.id);
  if (!item) {
    return next(new ErrorResponse('Order item not found', 404));
  }

  await Notification.destroy({ where: { offerCode: item.code } });

  await item.destroy();
  res.status(200).json({ success: true, data: {} });
});


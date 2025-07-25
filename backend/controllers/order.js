const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const { Order, OrderItem } = require('../models');

exports.getOrderAdmin = asyncHandler(async (req, res, next) => {
  const orders = await Order.findAll()

  res.status(200).json({ success: true, data: orders });
})

// @desc      Get all orders
// @route     GET /api/v1/orders
// @access    Private/Admin
exports.getOrders = asyncHandler(async (req, res, next) => {
  const { id } = req.user;

  const orders = await Order.findAll({
    where: {
      user_id: id
    },
    include: [
      {
        model: OrderItem,
        as: 'OrderItems'
      }
    ]

  });

  res.status(200).json({ success: true, data: orders });
});

// @desc      Get single order
// @route     GET /api/v1/orders/:id
// @access    Private
exports.getOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.user

  const order = await Order.findOne({
    where: {
      id: req.params.id,
      user_id: id
    },
    include: [
      {
        model: OrderItem,
        as: 'OrderItems'
      }
    ]
  });

  if (!order) {
    return next(new ErrorResponse('Order not found', 404));
  }
  res.status(200).json({ success: true, data: order });
});

// @desc      Create new order
// @route     POST /api/v1/orders
// @access    Private
exports.createOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.user
  const { order_type, total_price, items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return next(new ErrorResponse('Order must include at least one item', 400));
  }
  const order = await Order.create(
    {
      user_id: id,
      order_type,
      total_price,
      items
    },
    {
      include: [{ model: OrderItem, as: 'OrderItems' }]
    });
  res.status(201).json({ success: true, data: order });
});

// @desc      Update order
// @route     PUT /api/v1/orders/:id
// @access    Private/Admin
exports.updateOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.user;

  let order = await Order.findOne({
    where: {
      user_id: id,
      id: req.params.id
    },
    include: [{
      model: OrderItem, as: 'OrderItems'
    }]
  });

  if (!order) {
    return next(new ErrorResponse('Order not found', 404));
  }

  // Update order fields (except user_id)
  await order.update(req.body);

  if (req.body.items && Array.isArray(req.body.items)) {
    await OrderItem.destroy({ where: { order_id: orderId } });

    const newItems = req.body.items.map(item => ({
      ...item,
      order_id: req.params.id
    }));
    await OrderItem.bulkCreate(newItems);
  }

  order = await Order.findByPk(req.params.id, {
    include: [{ model: OrderItem, as: 'OrderItems' }]
  });

  res.status(200).json({ success: true, data: order });
});

// @desc      Delete order
// @route     DELETE /api/v1/orders/:id
// @access    Private/Admin
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const order = await Order.findOne({
    where: {
      user_id: id,
      id: req.params.id
    }
  });
  if (!order) {
    return next(new ErrorResponse('Order not found', 404));
  }

  await order.destroy({
    where: {
      order_id: req.params.id
    }
  });
  res.status(200).json({ success: true, data: {} });
});


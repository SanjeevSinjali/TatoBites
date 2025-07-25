const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const { Offer, Notification, User, UserNotification } = require('../models');

// @desc      Get all menu items
// @route     GET /api/v1/offers
// @access    Public
exports.getOffers = asyncHandler(async (req, res, next) => {
  const items = await Offer.findAll();
  res.status(200).json({ success: true, data: items })
})


// @desc      Get all menu items
// @route     GET /api/v1/offers/:id
// @access    Public
exports.getOffer = asyncHandler(async (req, res, next) => {
  const item = await Offer.findByPk(req.params.id);
  if (!item) {
    return next(new ErrorResponse('Offer not found', 404));
  }
  res.status(200).json({ success: true, data: item });
})


// @desc      Create new menu item
// @route     POST /api/v1/offers
// @access    Private/Admin
exports.createOffers = asyncHandler(async (req, res, next) => {
  const item = await Offer.create(req.body);

  const notification = await Notification.create({
    title: `OFFER - ${item.title}`,
    type: "OFFER",
    message: item.title
  })

  const users = await User.findAll({ attributes: ['id'] });

  const userNotifications = users.map((user) => ({
    userId: user.id,
    notificationId: notification.id
  }));

  await UserNotification.bulkCreate(userNotifications, { ignoreDuplicates: true });
  res.status(201).json({ success: true, data: item });
});


// @desc      Update menu item
// @route     PUT /api/v1/offers/:id
// @access    Private/Admin
exports.updateOffer = asyncHandler(async (req, res, next) => {
  let item = await Offer.findByPk(req.params.id);
  if (!item) {
    return next(new ErrorResponse('Offer not found', 404));
  }

  if (req.body.offerCode && req.body.code !== item.offerCode) {
    const exists = await Offer.findOne({ where: { code: req.body.code } });
    if (exists) {
      return next(new ErrorResponse('Offer code already exists', 400));
    }
  }

  // const notification = await Notification.findOne({ where: { offerCode: offer.code } });
  // if (notification) {
  //   await notification.update({
  //     title: `Updated Offer: ${item.title}`,
  //     message: item.description,
  //     amount: parseFloat(item.discount_percentage)
  //   });
  // }

  const updated = await item.update(req.body);

  res.status(200).json({ success: true, data: updated });
});

// @desc      Delete menu item
// @route     DELETE /api/v1/offers/:id
// @access    Private/Admin
exports.deleteOffer = asyncHandler(async (req, res, next) => {
  const item = await Offer.findByPk(req.params.id);
  if (!item) {
    return next(new ErrorResponse('Offer not found', 404));
  }
  await Notification.destroy({ where: { offerCode: item.code } });
  await item.destroy();
  res.status(200).json({ success: true, data: {} });
});


exports.validatePromoCode = asyncHandler(async (req, res, next) => {
  const { code, orderAmount } = req.body;

  if (!code) {
    return next(new ErrorResponse('Promo code is required', 400));
  }

  if (typeof orderAmount !== 'number' || orderAmount <= 0) {
    return next(new ErrorResponse('Valid order amount is required', 400));
  }

  const offer = await Offer.findOne({ where: { code } });

  if (!offer) {
    return next(new ErrorResponse('Invalid promo code', 404));
  }

  if (offer.validTill && new Date() > new Date(offer.validTill)) {
    return next(new ErrorResponse('Promo code has expired', 400));
  }

  if (offer.maxUsage && offer.usageCount >= offer.maxUsage) {
    return next(new ErrorResponse('Promo code usage limit exceeded', 400));
  }

  if (offer.minOrder && orderAmount < offer.minOrder) {
    return next(new ErrorResponse(`Minimum order amount to use this promo code is ${offer.minOrder}`, 400));
  }

  // Calculate discount amount
  let discountAmount = (orderAmount * parseFloat(offer.discount_percentage)) / 100;

  if (offer.maxDiscount && discountAmount > offer.maxDiscount) {
    discountAmount = offer.maxDiscount;
  }

  res.status(200).json({
    success: true,
    data: {
      discountAmount: discountAmount.toFixed(2), // as string with 2 decimals
      finalAmount: (orderAmount - discountAmount).toFixed(2),
      code: offer.code,
      title: offer.title,
      description: offer.description,
    }
  });
});


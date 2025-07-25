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

  const notification = await Notification.findOne({ where: { offerCode: offer.code } });
  if (notification) {
    await notification.update({
      title: `Updated Offer: ${item.title}`,
      message: item.description,
      amount: parseFloat(item.discount_percentage)
    });
  }

  await item.update(req.body);
  res.status(200).json({ success: true, data: item });
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



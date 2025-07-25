const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const { UserNotification, Notification } = require('../models');

// @desc      Get all notification
// @route     GET /api/v1/notification
// @access    Public
exports.getNotificationItems = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  console.log(id)
  // const items = await UserNotification.findAll()
  const items = await UserNotification.findAll({
    where: {
      userId: id
    },
    include: [{
      model: Notification,
      attributes: ['id', 'type', 'title', 'message', 'time']
    }],
    order: [['createdAt', 'DESC']]
  });
  res.status(200).json({ success: true, data: items });
});

// @desc      Get single notification// @route     GET /api/v1/notification/:id
// @access    Public
exports.getNotificationItem = asyncHandler(async (req, res, next) => {
  const item = await Notification.findByPk(req.params.id);
  if (!item) {
    return next(new ErrorResponse('Notification item not found', 404));
  }
  res.status(200).json({ success: true, data: item });
});

// @desc      Get single notification
// @route     PUT /api/v1/notification/:id
// @access    Public
exports.updateNotificationItemStatus = asyncHandler(async (req, res, next) => {
  const item = await UserNotification.findByPk(req.params.id);
  if (!item) {
    return next(new ErrorResponse('Notification item not found', 404));
  }

  await UserNotification.update(req.body)

  res.status(200).json({ success: true, data: item });
});

// @desc      Delete notification
// @route     DELETE /api/v1/notification/:id
// @access    Private/Admin
exports.deleteNotificationItem = asyncHandler(async (req, res, next) => {
  const item = await Notification.findByPk(req.params.id);
  if (!item) {
    return next(new ErrorResponse('Notification item not found', 404));
  }

  await item.destroy();
  res.status(200).json({ success: true, data: {} });
});



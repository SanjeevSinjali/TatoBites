const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const { MenuItem } = require('../models');

// @desc      Get all menu items
// @route     GET /api/v1/menu-items
// @access    Public
exports.getMenuItems = asyncHandler(async (req, res, next) => {
  const items = await MenuItem.findAll();
  res.status(200).json({ success: true, data: items });
});

// @desc      Get single menu item
// @route     GET /api/v1/menu-items/:id
// @access    Public
exports.getMenuItem = asyncHandler(async (req, res, next) => {
  const item = await MenuItem.findByPk(req.params.id);
  if (!item) {
    return next(new ErrorResponse('Menu item not found', 404));
  }
  res.status(200).json({ success: true, data: item });
});

// @desc      Create new menu item
// @route     POST /api/v1/menu-items
// @access    Private/Admin
exports.createMenuItem = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  const item = await MenuItem.create(req.body);
  res.status(201).json({ success: true, data: item });
});

// @desc      Update menu item
// @route     PUT /api/v1/menu-items/:id
// @access    Private/Admin
exports.updateMenuItem = asyncHandler(async (req, res, next) => {
  let item = await MenuItem.findByPk(req.params.id);
  if (!item) {
    return next(new ErrorResponse('Menu item not found', 404));
  }

  await item.update(req.body);
  res.status(200).json({ success: true, data: item });
});

// @desc      Delete menu item
// @route     DELETE /api/v1/menu-items/:id
// @access    Private/Admin
exports.deleteMenuItem = asyncHandler(async (req, res, next) => {
  const item = await MenuItem.findByPk(req.params.id);
  if (!item) {
    return next(new ErrorResponse('Menu item not found', 404));
  }

  await item.destroy();
  res.status(200).json({ success: true, data: {} });
});


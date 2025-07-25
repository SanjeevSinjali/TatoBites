const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

// @desc      Get all users
// @route     GET /api/v1/auth/users
// @access    Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.findAll({
    where: {
      role: {
        [Op.ne]: 'ADMIN'
      }
    }
  });

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc      Get single user
// @route     GET /api/v1/auth/users/:id
// @access    Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Create user
// @route     POST /api/v1/auth/users
// @access    Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  const user_data = user.toJSON()
  delete user_data.password

  res.status(201).json({
    success: true,
    data: user_data,
  });
});

// @desc      Update user
// @route     PUT /api/v1/auth/users/:id
// @access    Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const userId = parseInt(req.params.id);
  const isAdmin = req.user.role === "ADMIN";

  // Only allow if the user is the same user or an admin
  if (req.user.id !== userId && !isAdmin) {
    return next(new ErrorResponse('User not authorized to perform update', 403));
  }

  if (!isAdmin && req.body.role) {
    return next(new ErrorResponse('Only admin can change roles', 403));
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const [updatedCount, updatedUsers] = await User.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  });

  // delete password
  const update_user = updatedUsers[0].toJSON()
  delete update_user.password

  if (updatedCount === 0) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id} `, 404));
  }

  res.status(200).json({
    success: true,
    data: update_user,
  });
});

// @desc      Delete user
// @route     DELETE /api/v1/auth/users/:id
// @access    Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const deleted = await User.destroy({
    where: { id: req.params.id },
  });

  if (!deleted) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id} `, 404));
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});

// exports.accountStats = asyncHandler(async (req, res, next) => {
//   const { id } = req.user
//
//
//
// })

const express = require('express');
const {
  getAdminOverView,
  recentTenOrders
} = require('../controllers/admin.js');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.get('/overview', protect, authorize("ADMIN"), getAdminOverView);
router.get('/recentOrder', protect, authorize("ADMIN"), recentTenOrders);


module.exports = router;


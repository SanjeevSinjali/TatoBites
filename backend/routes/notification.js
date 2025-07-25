const express = require('express');
const {
  getNotificationItem,
  getNotificationItems,
  deleteNotificationItem,
  updateNotificationItemStatus

} = require('../controllers/notification.js');

const { protect } = require('../middleware/auth.js')

const router = express.Router();

router.route('/')
  .get(protect, getNotificationItems)

router.route('/:id')
  .get(protect, getNotificationItem)
  .put(protect, updateNotificationItemStatus)
  .delete(protect, deleteNotificationItem);

module.exports = router;




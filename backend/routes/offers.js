const express = require('express');
const {
  getOffer,
  getOffers,
  createOffers,
  updateOffer,
  deleteOffer
} = require('../controllers/offer.js');

const { protect, authorize } = require('../middleware/auth.js')

const router = express.Router();

router.route('/')
  .get(protect, getOffers)
  .post(protect, createOffers);

router.route('/:id')
  .get(protect, getOffer)
  .put(protect, updateOffer)
  .delete(protect, deleteOffer);

module.exports = router;



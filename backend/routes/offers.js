const express = require('express');
const {
  getOffer,
  getOffers,
  createOffers,
  updateOffer,
  deleteOffer,
  validatePromoCode
} = require('../controllers/offer.js');

const { protect, authorize } = require('../middleware/auth.js')

const router = express.Router();

router.route('/')
  .get(getOffers)
  .post(protect, createOffers);

router.route("/validate").post(protect, validatePromoCode)

router.route('/:id')
  .get(protect, getOffer)
  .put(protect, updateOffer)
  .delete(protect, deleteOffer);

module.exports = router;



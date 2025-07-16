const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  placeOrder,
  getMyOrders
} = require('../controllers/orderController');

router.use(protect); 

router.post('/', placeOrder);
router.get('/', getMyOrders);

module.exports = router;

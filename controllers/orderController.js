const Cart = require('../models/Cart');
const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 0
  );

  const order = await Order.create({
    user: req.user._id,
    items: cart.items.map(i => ({
      product: i.product._id,
      quantity: i.quantity
    })),
    total
  });

  cart.items = [];
  await cart.save();

  res.status(201).json(order);
};

exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('items.product');
  res.json(orders);
};

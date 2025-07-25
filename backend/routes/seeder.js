const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

const { User, MenuItem, Order, OrderItem } = require('../models');

async function loadJSON(fileName) {
  const filePath = path.join(__dirname, '..', '_data', fileName);
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

router.post('/run', async (req, res, next) => {
  try {
    await User.destroy({ where: {}, truncate: true, cascade: true });
    await MenuItem.destroy({ where: {}, truncate: true, cascade: true });
    await Order.destroy({ where: {}, truncate: true, cascade: true });
    await OrderItem.destroy({ where: {}, truncate: true, cascade: true });

    const users = await loadJSON('users.json');
    const menuItems = await loadJSON('menu_items.json');
    const orders = await loadJSON('orders.json');
    const orderItems = await loadJSON('order_items.json');

    await User.bulkCreate(users);
    await MenuItem.bulkCreate(menuItems);
    await Order.bulkCreate(orders);
    await OrderItem.bulkCreate(orderItems);

    res.status(200).json({ success: true, message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Error seeding DB:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});


module.exports = router;


const { fn, col, Op } = require('sequelize');
const asyncHandler = require('../middleware/async');
const { Order, User, OrderItem, MenuItem } = require('../models');

exports.getAdminOverView = asyncHandler(async (req, res) => {
  const now = new Date();

  // This month start & end
  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  // Last month start & end
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const startOfThisMonthCopy = new Date(startOfThisMonth);

  // ===== Current month stats =====
  const thisMonthRevenueObj = await Order.findOne({
    attributes: [[fn('SUM', col('total_price')), 'total_revenue']],
    where: { created_at: { [Op.gte]: startOfThisMonth, [Op.lt]: startOfNextMonth } },
    raw: true
  });

  const thisMonthOrdersCount = await Order.count({
    where: { created_at: { [Op.gte]: startOfThisMonth, [Op.lt]: startOfNextMonth } }
  });

  // ===== Last month stats =====
  const lastMonthRevenueObj = await Order.findOne({
    attributes: [[fn('SUM', col('total_price')), 'total_revenue']],
    where: { created_at: { [Op.gte]: startOfLastMonth, [Op.lt]: startOfThisMonthCopy } },
    raw: true
  });
  const lastMonthOrdersCount = await Order.count({
    where: { created_at: { [Op.gte]: startOfLastMonth, [Op.lt]: startOfThisMonthCopy } }
  });

  // ===== Totals =====
  const totalRevenue = parseFloat(thisMonthRevenueObj.total_revenue || 0);
  const totalOrders = thisMonthOrdersCount;
  const totalUsers = await User.count({
    where: {
      role: {
        [Op.ne]: 'ADMIN'
      }
    }
  });

  const revenueChange = lastMonthRevenueObj.total_revenue
    ? (((totalRevenue - parseFloat(lastMonthRevenueObj.total_revenue || 0)) / parseFloat(lastMonthRevenueObj.total_revenue)) * 100).toFixed(1) + '%'
    : '0%';

  const ordersChange = lastMonthOrdersCount
    ? (((totalOrders - lastMonthOrdersCount) / lastMonthOrdersCount) * 100).toFixed(1) + '%'
    : '0%';

  const stats = [
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue}`,
      change: revenueChange,
      icon: 'DollarSign',
      color: 'bg-green-500'
    },
    {
      title: 'Total Orders',
      value: `${totalOrders}`,
      change: ordersChange,
      icon: 'ShoppingBag',
      color: 'bg-blue-500'
    },
    {
      title: 'Users',
      value: `${totalUsers}`,
      change: null,
      icon: 'Users',
      color: 'bg-purple-500'
    }
  ];

  res.status(200).json({
    success: true,
    data: stats
  });
});


exports.recentTenOrders = asyncHandler(async (req, res) => {
  const orders = await Order.findAll({
    limit: 10,
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email']
      },
      {
        model: OrderItem,
        attributes: ['id', 'quantity', 'price_each', 'total_price'],
        include: [
          {
            model: MenuItem,
            attributes: ['id', 'name', 'price', 'category']
          }
        ]
      }
    ]
  });

  res.status(200).json({
    success: true,
    data: orders
  });
});


const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    order_type: {
      type: DataTypes.ENUM('DINE_IN', 'TAKEAWAY'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'PREPARING', 'COMPLETED', 'CANCELLED'),
      defaultValue: 'PENDING'
    },
    payment_status: {
      type: DataTypes.ENUM('PAID', 'UNPAID'),
      defaultValue: 'UNPAID'
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    tableName: 'orders',
    timestamps: true,
    underscored: true
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: 'user_id' });
    Order.hasMany(models.OrderItem, { foreignKey: 'order_id', as: 'OrderItems' });
  };
  return Order;
};


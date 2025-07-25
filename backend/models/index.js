const sequelize = require('../config/db');

const User = require('./User')(sequelize, require('sequelize').DataTypes);
const MenuItem = require('./MenuItem')(sequelize, require('sequelize').DataTypes);
const Order = require('./Order')(sequelize, require('sequelize').DataTypes);
const OrderItem = require('./OrderItem')(sequelize, require('sequelize').DataTypes);
const Offer = require('./Offers.js')(sequelize, require('sequelize').DataTypes);
const OfferMenuItem = require('./OfferItem.js')(sequelize, require('sequelize').DataTypes);
const Notification = require('./Notification.js')(sequelize, require('sequelize').DataTypes);
const UserNotification = require('./UserNotification.js')(sequelize, require('sequelize').DataTypes);

// relationships mapping 
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

MenuItem.hasMany(OrderItem, { foreignKey: 'menu_item_id' });
OrderItem.belongsTo(MenuItem, { foreignKey: 'menu_item_id' });

MenuItem.belongsToMany(Offer, { through: OfferMenuItem, foreignKey: 'menuItemId' });
Offer.belongsToMany(MenuItem, { through: OfferMenuItem, foreignKey: 'offerId' });

Order.belongsToMany(MenuItem, { through: 'OrderItem' })
MenuItem.belongsToMany(Order, { through: 'OrderItem' })

Notification.belongsTo(Offer, { foreignKey: 'offerId' });
Offer.hasMany(Notification, { foreignKey: 'offerId' });

Notification.belongsToMany(User, {
  through: UserNotification,
  foreignKey: 'notificationId'
});

User.belongsToMany(Notification, {
  through: UserNotification,
  foreignKey: 'userId'
});

module.exports = {
  sequelize,
  User,
  MenuItem,
  Order,
  OrderItem,
  Notification,
  UserNotification,
  Offer
};


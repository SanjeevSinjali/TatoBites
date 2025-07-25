module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.ENUM('ORDER', 'OFFER', 'SYSTEM'),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    icon: DataTypes.STRING,
    color: DataTypes.STRING,
    bgColor: DataTypes.STRING,
    orderId: DataTypes.STRING,
    offerCode: DataTypes.STRING,
    amount: DataTypes.FLOAT
  }, {
    tableName: 'notifications',
    timestamps: true
  });

  Notification.associate = (models) => {
    Notification.belongsToMany(models.User, {
      through: models.UserNotification,
      foreignKey: 'notificationId',
      otherKey: 'userId'
    });
  };

  return Notification;
};


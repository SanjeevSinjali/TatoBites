module.exports = (sequelize, DataTypes) => {
  const UserNotification = sequelize.define('UserNotification', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    notificationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    readAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'user_notifications',
    timestamps: true,
    indexes: [
      {
        fields: ['userId', 'notificationId'],
        unique: true
      }
    ]
  });

  UserNotification.associate = (models) => {
    UserNotification.belongsTo(models.User, { foreignKey: 'userId' });
    UserNotification.belongsTo(models.Notification, { foreignKey: 'notificationId' });
  };


  return UserNotification;
};


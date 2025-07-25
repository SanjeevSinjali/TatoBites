module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define('Offer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    discount_percentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    maxDiscount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    minOrder: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    validTill: {
      type: DataTypes.DATE,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM(
        'NEW_USER',
        'DELIVERY',
        'BOGO',
        'LOYALTY',
        'TIME_BASED',
        'GROUP'
      ),
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM(
        'DISCOUNT',
        'FREE_DELIVERY',
        'SPECIAL'
      ),
      allowNull: false
    },
    usageCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    maxUsage: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'offers',
    timestamps: true
  });

  Offer.associate = (models) => {
    // Optional: If each offer can be linked to notifications
    Offer.hasMany(models.Notification, { foreignKey: 'offerCode', sourceKey: 'code' });
  };

  return Offer;
};


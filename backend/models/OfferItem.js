module.exports = (sequelize, DataTypes) => {
  const OfferMenuItem = sequelize.define('OfferMenuItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    offerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'offers',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    menuItemId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'menu_items',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    tableName: 'offer_menu_items',
    timestamps: true
  });

  return OfferMenuItem;
};


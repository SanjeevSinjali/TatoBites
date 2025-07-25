const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const MenuItem = sequelize.define('MenuItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    category: {
      type: DataTypes.STRING
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1), // e.g., 4.6
      defaultValue: 0.0
    },
    isVeg: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    bestseller: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    image_url: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'menu_items',
    timestamps: true
  });

  return MenuItem;
};


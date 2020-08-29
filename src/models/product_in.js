'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_in extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Products, {
        foreignKey: 'ProductId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  };
  Product_in.init({
    total: DataTypes.INTEGER,
    date: DataTypes.DATE,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product_in',
  });
  return Product_in;
};
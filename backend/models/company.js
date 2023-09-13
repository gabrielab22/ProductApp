"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Company.hasMany(models.Product, {
        foreignKey: "companyId", // The foreign key in the Product model
        as: "products", // Alias to access the products
      });
    }
  }
  Company.init(
    {
      name: DataTypes.STRING,
      country: DataTypes.STRING,
      birth: DataTypes.STRING,
      employee: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Company",
      freezeTableName: true,
    }
  );
  return Company;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class collections extends Model {
    static associate(models) {
      collections.belongsTo(models.literatures, {
        as: "literature",
        foreignKey: {
          name: "literatureId",
        },
      });

      collections.belongsTo(models.users, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  collections.init(
    {
      userId: DataTypes.INTEGER,
      literatureId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "collections",
    }
  );
  return collections;
};

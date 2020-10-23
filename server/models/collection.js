"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    static associate(models) {
      Collection.belongsTo(models.Literature, {
        as: "literature",
        foreignKey: {
          name: "literatureId",
        },
      });

      Collection.belongsTo(models.User, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  Collection.init(
    {
      userId: DataTypes.INTEGER,
      literatureId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Collection",
    }
  );
  return Collection;
};

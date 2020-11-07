"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class literatures extends Model {
  
    static associate(models) {
      literatures.belongsTo(models.users, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });
      literatures.hasMany(models.collections, {
        as: "collection",
      });
    }
  }
  literatures.init(
    {
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      publication: DataTypes.STRING,
      page: DataTypes.INTEGER,
      isbn: DataTypes.STRING,
      author: DataTypes.STRING,
      file: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "literatures",
    }
  );
  return literatures;
};

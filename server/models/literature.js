"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class literature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      literature.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });
      literature.hasMany(models.collection, {
        as: "collection",
      });
    }
  }
  literature.init(
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
      modelName: "literature",
    }
  );
  return literature;
};

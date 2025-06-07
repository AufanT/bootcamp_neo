'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      Game.belongsTo(models.Developer, {
        foreignKey: 'developer_id',
      });
    }
  }
  Game.init({
    title: DataTypes.STRING,
    release_date: DataTypes.DATE,
    genre: DataTypes.STRING,
    description: DataTypes.STRING,
    developer_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};
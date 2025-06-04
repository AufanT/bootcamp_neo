'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
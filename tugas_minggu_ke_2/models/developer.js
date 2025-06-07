'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Developer extends Model {

    static associate(models) {
      Developer.hasMany(models.Game, {
        foreignKey: 'developer_id',
      });
    }
  }
  Developer.init({
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    founded_year: DataTypes.INTEGER,
    website: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user',
    }
  }, {
    sequelize,
    modelName: 'Developer',
  });
  return Developer;
};
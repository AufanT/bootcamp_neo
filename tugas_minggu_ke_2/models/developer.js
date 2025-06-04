'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Developer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
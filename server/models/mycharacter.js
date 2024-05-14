'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyCharacter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyCharacter.belongsTo(models.User)
    }
  }
  MyCharacter.init({
    name: DataTypes.STRING,
    level: DataTypes.INTEGER,
    constalation: DataTypes.INTEGER,
    normalAttack: DataTypes.INTEGER,
    elementalSkill: DataTypes.INTEGER,
    elementalBurst: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MyCharacter',
  });
  return MyCharacter;
};
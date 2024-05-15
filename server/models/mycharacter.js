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
    level: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          args: 90,
          msg: "Max level 90"
        }
      }
    },
    constalation: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          args: 6,
          msg: "Max constalation 6"
        }
      }
    },
    normalAttack: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          args: 10,
          msg: "Max normal attack 10"
        }
      }
    },
    elementalSkill: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          args: 10,
          msg: "Max elemental skill 10"
        }
      }
    },
    elementalBurst: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          args: 10,
          msg: "Max elemental burst 10"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MyCharacter',
  });
  return MyCharacter;
};
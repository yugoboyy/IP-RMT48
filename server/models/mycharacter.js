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
          msg: "Level max 90"
        },
        min: {
          args: 1,
          msg: "Level min 1"
        },
        notEmpty: {
          msg: "Level is require"
        }
      }
    },
    constalation: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          args: 6,
          msg: "Constalation max 6"
        },
        notEmpty: {
          msg: "Constalation is require"
        }
      }
    },
    normalAttack: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          args: 10,
          msg: "Normal Attack max 10"
        },
        min: {
          args: 1,
          msg: "Normal Attack min 1"
        },
        notEmpty: {
          msg: "Normal Attack is require"
        }
      }
    },
    elementalSkill: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          args: 10,
          msg: "Elemental Skill max 10"
        },
        min: {
          args: 1,
          msg: "Elemental Skill min 1"
        },
        notEmpty: {
          msg: "Elemental Skill is require"
        }
      }
    },
    elementalBurst: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          args: 10,
          msg: "Elemental Burst max 10"
        },
        min: {
          args: 1,
          msg: "Elemental Burst min 1"
        },
        notEmpty: {
          msg: "Elemental Burst is require"
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
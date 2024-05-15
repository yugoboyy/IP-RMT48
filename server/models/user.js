'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.MyCharacter)
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name is required"
        },
        notNull: {
          msg: "Name is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email already register"
      },
      validate: {
        notEmpty: {
          msg: "Email is required"
        },
        notNull: {
          msg: "Email is required"
        },
        isEmail: {
          msg: "Required email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required"
        },
        notNull: {
          msg: "Password is required"
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Gender is required"
        },
        notNull: {
          msg: "Gender is required"
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      defaultValue: "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "UID is required"
        },
        notNull: {
          msg: "UID is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
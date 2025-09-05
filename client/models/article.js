'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Article.belongsTo(models.User, { foreignKey: "authorId"})
      Article.belongsTo(models.Category, { foreignKey: "categoryId"})
    }
  }

  Article.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title is required!"
        },
        notNull: {
          msg: "Title is required!"
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Content is required!"
        },
        notNull: {
          msg: "Content is required!"
        }
      }
    },
    imgUrl: DataTypes.STRING,
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "categoryId is required!"
        },
        notNull: {
          msg: "categoryId is required!"
        }
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "authorId is required!"
        },
        notNull: {
          msg: "authorId is required!"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};

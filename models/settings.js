'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Settings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Settings.belongsTo(models.Settings, {
        foreignKey: "account_id",
        as: "accounts"
      })
    }
  }
  Settings.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: DataTypes.STRING,
    data_type: DataTypes.STRING,
    account_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Accounts,
        key: "id"
      }
    },
    value: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Settings',
  });
  return Settings;
};
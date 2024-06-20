const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('item', {
    item_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    kind: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    subject: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    love: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    wdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    pathname: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'item',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "item_id" },
        ]
      },
      {
        name: "uni_1",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "kind" },
          { name: "pathname" },
        ]
      },
    ]
  });
};

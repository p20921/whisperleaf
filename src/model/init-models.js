var DataTypes = require("sequelize").DataTypes;
var _item = require("./item");

function initModels(sequelize) {
  var item = _item(sequelize, DataTypes);


  return {
    item,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

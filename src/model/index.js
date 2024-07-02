import fs from 'fs'
import Sequelize from 'sequelize'
import * as Config from 'config/db.json'
// import * as Config from 'config/db-production.json'

const env = process.env.NODE_ENV || 'development'
const config = Config.default[env]

const db = {}
const dbSlave = {}

// master, slave (only select)
const sequelize = new Sequelize(config.database, config.username, config.password, config)
const sequelizeSlave = new Sequelize(config.database, config.username, config.password, {
    ...config,
    host: config.hostSlave,
    port: config.portSlave || 3306
})

const dirname = `${process.cwd()}/src/model`

// 모델파일 적재
fs.readdirSync(dirname).filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
}).forEach(function(file) {
    const model = require(`model/${file}`)(
        sequelize,
        Sequelize.DataTypes
    )
      
    db[model.name] = model;
    dbSlave[model.name] = model;
    //console.log('model.name:' + model.name);  // 테스트로그 model명..
});

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db)
    }
});

db.sequelize = sequelize
db.Sequelize = Sequelize

dbSlave.sequelize = sequelizeSlave
dbSlave.Sequelize = Sequelize

//db.User = user(sequelize, Sequelize)

//모델간의 관계를 정의한다.

dbSlave['item'].belongsTo(dbSlave['comment'], {foreignKey: 'item_id', targetKey: 'item_id'})

export  { sequelize, sequelizeSlave, dbSlave }
export default db
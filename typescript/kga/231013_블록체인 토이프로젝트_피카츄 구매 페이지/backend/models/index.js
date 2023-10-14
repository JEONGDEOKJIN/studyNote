const Sequelize = require("sequelize");
const config = require("../config");


const User = require("./users");


const sequelize = new Sequelize(config.dev)


const db = {}
db.sequelize = sequelize;
db.User = User;


User.init(sequelize);


// User.associate(db);


module.exports = db;
const Sequelize = require("sequelize");
const config = require("../config");


const User = require("./users");
const Item = require("./item")

const sequelize = new Sequelize(config.dev)


const db = {}
db.sequelize = sequelize;
db.User = User;
db.Item = Item;


User.init(sequelize);
Item.init(sequelize);

// User.associate(db);


module.exports = db;
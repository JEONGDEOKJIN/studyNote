const { usersInit, userInsert, userSelect } = require('./usersModel');

usersInit();

module.exports = {userInsert, userSelect};
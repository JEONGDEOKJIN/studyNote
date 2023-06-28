const {initBoard , show, write, idShow, idUpdate, idDelete, initUser, tempUserMake, refConnect , refGetData} = require("./board")
initBoard();
initUser();

tempUserMake();

refConnect()
refGetData();


module.exports = { show, write, idShow, idUpdate, idDelete , refGetData }



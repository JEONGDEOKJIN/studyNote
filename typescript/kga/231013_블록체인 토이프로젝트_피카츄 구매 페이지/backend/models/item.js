const { Model, DataTypes } = require("sequelize");

class Item extends Model {
    static init(sequelize) {
        return super.init(
    {
            // 판매 등록 이름 
            item_name : {
                type : DataTypes.STRING,
                allowNull : false,
            }, 
            // 판매 등록 이미지 
            item_image : {
                type : DataTypes.STRING,
            },
            }, {
                sequelize, 
                underscored : false, // 자동변환되는 컬럼인 createAt, updatedAt 이, 스네이크 표기법으로 되게 할지 여부, 
                timestamps : true, 
                modelName : "Products", 
                tableName : "products", 
                charset : "utf8", 
                collate : "utf8_general_ci",
            }
        )
    }

    // static associate(db) {
    //     db.Likes.belongsTo(db.User, { foreignKey : "user_id", targetKey : "id"});
    // }

}

module.exports = Item
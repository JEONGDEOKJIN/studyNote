
const mysql = require("./config")



// 초기화 
    exports.initBoard = async () => {
        try {
            // 있는지 보고 
                await mysql.query("SELECT * FROM board");

        } catch (error) {
            // 없으면 만들어
                await mysql.query("CREATE TABLE board (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(20), content VARCHAR(20) ) ")
        }
    }


// 있는거 보기 
    exports.show = async() => {
        try {
            // 봐야해 
            const [result] = await mysql.query("SELECT * FROM board");
            return result

        } catch (error) {
            
        }
    }


// 글 쓰기 
    exports.write = async(req, res) => {
        const {title, content} = req.body;

        try {
            await mysql.query("INSERT INTO board (title, content) VALUES(?, ?)", [title, content])

        } catch (error) {
            
        }
    }


// 글 가져오기 
    exports.idShow = async(req,res) => {
        const {id} = req.params;
        
        // console.log(id)

        try {
        const [result] = await mysql.query("SELECT * FROM board WHERE id = ?" , [id]);
        // console.log(result)

        return result[0]

        } catch (error) {
            
        }
    }


// 글 수정한거 수정 시키기 
    exports.idUpdate = async(req,res) => {

        const {title, content} = req.body;
        const id = req.params.id;
    
        try {
            await mysql.query("UPDATE board SET title = ?, content = ? WHERE id = ?" ,  [title, content, id]);
        
        } catch (error) {
            
        }

    }
    

// 글 삭제 하기 
    exports.idDelete = async(req, res) => {

        const id = req.params.id;

        try {
            await mysql.query("DELETE FROM board WHERE id=? ; SET @CNT=0; UPDATE board SET id = @CNT:=@CNT + 1; ALTER TABLE board AUTO_INCREMENT = 0;" , [id]);
            
        } catch (error) {
            
        }

    }





// 보내는 법 
    // 1) exports. 
    // 2) 객체 통째로 내보내는 거 : 처음 배울 때 한번 📛📛📛📛📛 


    // const test = {
    //     initBoard : async () => {
    //         try {
    //             // 있는지 보고 
    //                 await mysql.query("SELECT * FROM board");
    
    //         } catch (error) {
    //             // 없으면 만들어
    //                 await mysql.query("CREATE TABLE board (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(20), content VARCHAR(20) ) ")
    //         }
    //     },
    //     show : async() => {
    //         try {
    //             // 봐야해 
    //             const [result] = await mysql.query("SELECT * FROM board");
    //             return result[0]
    
    //         } catch (error) {
                
    //         }
    // }}
    // module.exports =test;
const { show , write, idShow, idUpdate, idDelete , refGetData } = require("../models");
const mysql = require("../models/config");




// 라우터에서 온 데이터를 모델로 전달 
exports.Show = async (req,res) => {

    try {
        const result = await show();
        res.render("board" , {result} );
        // console.log(result)
        
    } catch (error) {
        
    }
}



// 모델에서 온 데이터를 이용해서 view 출력 
exports.Write = async (req, res) => {
    try {
        await write(req, res);

    } catch (error) {
        
    }
}

// 특정 id 가져와서 보여주기
exports.IdShow = async (req, res) => {
    try {
        const data = await idShow(req, res);
        
        // console.log(req.params)
        // const {id} = req.body
        // console.log(id)

        // console.log(data)

        res.render("content" , {data});

    } catch (error) {
        
    }
}


exports.IdUpdate = async(req, res) => {
    try {
        
        await idUpdate (req, res);
        res.redirect("/board");
        
    } catch (error) {
    
    }
}


exports.IdDelete = async(req,res) => {
    try {
        await idDelete (req, res);
        res.redirect("/board")
            // url 에 localhost:8020/board 입력한 것
        // res.render("board")

    } catch (error) {
        
    }
}


// 가져온 결과물 보여주기 
    exports.RefGetData = async (req, res) => {
        const {userID} = req.body;
        // console.log(userID);
        // console.log("✍✍✍✍✍✍ ")
            // [userID], {userID} ❓❓❓❓❓ 

        try {
            const result = await refGetData(userID);
            console.log("🙇‍♂️🙇‍♂️🙇‍♂️");
            // for each 를 돌 수 있게 result 를 만들어서 넣어주면 되잖아 
            
            
            console.log(result);

            
            res.render( "board" , {result} )
            

            {result : result} 




        } catch (error) {
            
        }

    }

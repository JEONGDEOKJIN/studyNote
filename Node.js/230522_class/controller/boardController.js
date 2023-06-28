// 글 등록, 수정 기능은 여기에 



const { User, Post } = require("../models")


// 해당 유저가 작성한 글을 모두 보여주는 것
    // 해당 유저의 마이 페이지
    exports.boardMain = async(req, res) => {
        
        console.log("req⚡⚡" , req)

        const { acc_decoded } = req;
        
        // console.log( "acc_decoded👉👉" , acc_decoded )


        const user = await User.findOne( { where : {name : acc_decoded.name} } )
            // 해당 유저가 있는지 조회!!! 

            console.log(user)

        res.render("main" , {data : user})
            // 메인페이지에 넘길 정보는 user 의 정보!!!   
    
    }

exports.createBoard = async(req, res) => {
    // 글 추가 하는 부분

    const { acc_decoded } = req;
    const { user_post } = req.body;

    console.log("user_post" , user_post)
    console.log("acc_decoded" , acc_decoded)

    // Post 테이블에 글을 추가
    await Post.create({
        msg : user_post,
        user_id : acc_decoded.id    // 관계키를 foreing 키로 넣어줘야 하는데, acc_decode 에서 가져온다. // 왜❓❓❓❓❓❓❓ 

    });

    // 해당 유저가 작성한 글들을 볼 수 있는 페이지로 이동
    res.redirect(`/board/view/${acc_decoded.id}`);        // 등록한 페이지 바로 볼 수 있게
        // 해당 유저가 작성한 글을 params 로 전달 

}

exports.boardView = (req, res) => {
    User.findOne({ 
        where : {id : req.params.id} , 
        include : [ 
            // 찾을 모델 ⭐⭐⭐⭐⭐⭐ 
            {model : Post} 
        ] 
    }).then((e) => {
        console.log( "e👉👉👉" , e )
        e.dataValues.Posts = e.dataValues.Posts.map( (i) => i.dataValues )
            // 화살표 함수에서 { } 빠지면, 바로 반환 시킨다. 
            // RETURN 값을 내보내는 것! ⭐⭐⭐⭐⭐⭐⭐⭐ 
            // RETURN 문 생략 가능 
        
        const Posts = e.dataValues;
        res.render("board" , {data : Posts});
        
    })
}



exports.updateBoard = async(req, res) => {
    const {acc_decoded} = req;
    const {msg} = req.body;
    const {id} = req.params;

    // 수정 메소드 사용 
        // update 메소드 
        // 쿼리문에서 update set 사용하던 것 처럼, 값을 수정할 때 사용하는 메소드
        // 첫 번째 매개변수는 '객체로, 수정할 값' 
        // 두 번째 매개변수는 '객체로, 수정할 내용을 찾아서"
        await Post.update( {msg} , {where : {id}} );
            // 수정할 id 는 params 에서 찾은거야 

        res.redirect(`/board/view/${acc_decoded.id}`)
            // 현재 보고 있는 페이지로 그대로 이동 
}


exports.boardDel = async (req, res) => {
    // 삭제 메소드 사용 

    await Post.destroy({
        where : { id : req.params.id }
            // 삭제할 id 입력 
    });
    res.redirect("/board")

}

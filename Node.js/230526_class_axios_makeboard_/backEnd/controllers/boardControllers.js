


const { Post, User } = require("../models")
    // [해석]
        //  ../models 하면 == 해당 폴더에서 index.js 를 가리킨다.
        // const {User, Post} = require('../models/index'); 이거랑 동일한 말 



// 게시글 생성 기능 
    exports.boardCreate = async (req, res) => {

        // 1. msg, id 어디에 담겨 있나 찾기
            // 1-1) msg
            console.log("✍✍✍",req.body.msg)
            msg = req.body.msg

            // 1-2) id 찾기 
            console.log("🔮🔮🔮" , req.acc_decoded.id)
            user_id = req.acc_decoded.id
            // [알게된 것]
                // [acc_decoded 탐험] ⭐⭐⭐⭐⭐ 
                    // 1. jwt 미들웨어 때문이라는 걸 알게 됨 
                    // 2. isLogin 을 통과해야 한다는 걸 알게 됨. 
                    // 3. isLogin 을 '제대로 통과' 하면, '콜백 함수' 가 실행 
                        // 	3.1 해당 콜백함수의 두 번째 인자로, '디코딩된 페이로드 값(acc_decoded 에 복호화된 값)' 이 전달된다. 
                    // 4. '제대로 통과해서 얻게된 디코딩된 페이로드값' 은 req 객체에 할당 한다. 
                    // 5. 그래서, 요청 - 처리 에서 써내쓸 수 있게 된다. 
                    // 6. (그래서, req.acc_decoded 로 꺼내쓸 수 있으려면, 우선, payload 에 들어가야 한다.)

        // 2. msg sql 에 저장 
            await Post.create({
                msg : msg,
                user_id : user_id 
            })
            

        // 3. 해당 유저가 작성한 글을 볼 수 있는 페이지로 이동  
            res.redirect(`http://127.0.0.1:5500/frontEnd/mypage.html`)
            // res.redirect(`/frontEnd/board.html`)
                // [알게된 것 | 흐름 따라가기]
                    // 1. 우선, 여기에서, '/board/view/1' 여기로 가달라고 요청한거야 
                    // 2. 그러면, 대체 어디에서 보이는거야? 를 생각해보면, 그 다음엔 '라우터' 로 간다. 
                    // 3. 그래서, '해당 경로' 는 '어떤 controller' 로 가야하는지 확인한다. 
                    // 4. 다만, 바로 가는게 아니라, isLogin 으로 계속 토큰을 확인한다. ⭐⭐⭐⭐⭐ 
                    // 5. routers 에서, '경로' 를 적는데, 'url 경로에서 변수 역할을 하는게 place holer?' 
                        // 5.1 그래서, '/view/:id' 이렇게 경로를 적음 
                
                // [생각해볼 것]
                    // 이렇게 redirect 를 요청하면, 해당 경로에 대해서, get 요청, 이 들어가는 건가? 
                    // 그러면, 'router' 에서 이걸 보여줄 수 있는 처리를 해야겠네? 

    }



// 특정 유저가 작성한 게시글을 보여주는 기능 
    exports.boardView = (req, res) => {

        // 1. 조회할 id 가 제대로 넘어오는지 확인 
            console.log("req.params.id🥙🥙" , req.params.id);        
            // req.params.id 를 하는 이유 : routing url 에서 placeholder 에 담겨서 id 가 넘어왔기 때문에 

        // 2. 해당 id 에 해당하는 user row 와 post row 가져와서 > 렌더 기능에 토스 하기
            User.findOne(
            {
                where : {id : req.params.id},
                    // [해석] 
                        // User record(row, 가로) 중에서, req.params.id 와 일치하는 애들을 가져와!
                include : [
                    {model : Post}
                ]
                    // [해석]
                        // ⭐⭐⭐ '현재 조회하는 id' 로 작성한 모든 'Post 테이블의 record' 를 가져와 ⭐⭐⭐⭐⭐
                        // 그러면, Post 테이블의 오른쪽 열에서, 해당하는 id 로 조회하고, > 그걸 '배열' 에 담고 > User 객체 안에 속해지겠지.

                    // [해석]
                        // 1) 이건, Post 테이블에서, id 가 1 에 해당하는 데이터 (foreignKey 를 id 와 연결했음) 를 모두 가져와서 
                        // 2) 배열에 담고, 넘겨라, 라는 거지? 
            }
            ).then( (e) => {
                // 화살표 함수는 { } 괄호가 빠지면, 바로 반환 시킨다. 
                // return 문 생략 가능 
                
                // 1) 담아온 post 가 어디있는지 확인
                    console.log("😺😺😺" , e.dataValues.Posts[0].dataValues)
                        // 결과물
                            //     id: 1,
                            //     msg: '123123',
                            //     createdAt: 2023-05-26T08:11:35.000Z,
                            //     updatedAt: 2023-05-26T08:11:35.000Z,
                            //     user_id: 1
                            //   }
                        // 각각의 post 는 '배열' 에 담겨져 온다는 점 ⭐ -> so, 하나씩 접근해보기 
                        // 그 배열은 '객체들이 담겨' 있음. > so, key 값을 넣어서, 빼낸다.  
                    console.log("🥙🥙🥙🥙🥙🥙🥙🥙🥙🥙🥙🥙🥙🥙")
                    e.dataValues.Posts = e.dataValues.Posts.map( (i) => i.dataValues);
                        // [궁금증 및 해석😥😥😥]
                            // e.dataValues.Posts.map( (i) => i.dataValues); 이 결과, Post[0].dataValues 결과물이 배열로 담기는 건 알겠음. 
                            // 그런데, 굳이 e.dataValues.Posts 를 안 써줘도 되지 않나? 

                    const Posts = e.dataValues;

                    // console.log(Posts)
                    
                    res.json(Posts)
                    
                    console.log("boardController 끝 까지 정상 작동🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀")

                    // 밑에건 esj 방식
                        // res.render("board" , {data : Posts});
                            // [해석] 
                                // Posts 는 '배열' 인데, Posts[0] 은 객체 라는 점!
                            
            })
        }
            // [이 작업의 결과물]
            // 1) User 객체와 그 안에 있는 Posts 객체가 나옴 
                // 즉, User 객체 안에는 Posts라는 속성이 있고, 
                // 이 Posts 속성은 해당 사용자가 작성한 모든 게시물(Post 객체들)을 배열 형태로 포함함. 
                // 


// 모든 유저가 작성한 모든 게시글 보기
    exports.allBoardView = (req, res) => {
        let nameArr = [];

        // 모든 user 를 찾아서 가져오기 
        User.findAll({
            include : [
                {model : Post}
            ]
        }).then((e) => {
        
            // name 을 가져오려면 어떻게 타고들어가야 하나
                // console.log( "name ✍:" , e[0].dataValues.name);
                // console.log( "name ✍:" , e[1].dataValues.name); 
                // [결과물]
                    // name ✍: 123
                    // name ✍: 12
                // '배열' 에 넣기 (각각 다른 배열에 넣을거지만, index 를 맞춰서, 그 사람의 데이터가 오게 해야 함)
                    let user_nameArr = []
                
                    e.forEach( (el) => {
                        user_nameArr.push(el.dataValues.name)
                    });

            // msg 를 뽑으려면, 어떻게 접근해야 하나
                // console.log("msg 🌻 :" , e[0].dataValues.Posts[0].dataValues.msg)
                // console.log("msg 🌻 :" , e[0].dataValues.Posts[1].dataValues.msg)
                // [결과물] 
                    // msg 🌻 : 123123
                    // msg 🌻 : dhdhdhdhdh
                
                // 배열에 넣기 
                    let user_postsArr = [];

                    e.forEach( (el) => {
                        el.dataValues.Posts.forEach((el) => {
                            user_postsArr.push(el.dataValues.msg)
                        })
                    });
            
            // 객체에 합쳐보기                
                // 내가 최대한 짜보고, 안 되면 > gpt 에게 물어봐서, 짬 ⭐⭐⭐⭐⭐ 
                const user_info = e.map( (el, index) => {
                    return {
                        name : el.dataValues.name, 
                        msg :   el.dataValues.Posts.map((post) => {
                            return post.dataValues.msg;
                        })
                    }
                });
                                

            // 잘 나가나 디버깅 : 2차에 완성 | 내가 최대한 짜고 - gpt 한테 수정해달라
                // 1차 
                    // console.log("🐶🐶🐶🐶🐶" , user_info)
                    // [결과물]
                    // 음... 뽑혀 나오긴 하는데, 이 msg 가 user1 껀지 모르게 나옴 
                    // name: [ '123', '12', '111', '1', 'bestname', '321', '222' ],
                    // msg: [
                    //     '123123',
                    //     'dhdhdhdhdh',
                    //     '123123',
                    //     'hihihi',
                    //     'hihihi',
                    //     'slakdfj',

                // 2차 
                // console.log("🐶🐶🐶🐶🐶" , user_info)

            // 내보내기 
                res.json(user_info)
                    // 이제 이걸 axios 로 받게 된다. 
            
        })
    }



// 마이페이지

    // 유저 아이디 제공 -> 이렇게 할거면, 굳이, id 찾는 기능을 따로 만들 필요가 없겠네 
    exports.myPageView = async (req, res) => {
    // console.log("🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️" , req)
    
    const {acc_decoded} = req;
    console.log("🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️" , acc_decoded)
    
    const user_id = acc_decoded.id

    User.findOne(
        {
            where : {id : user_id},
            include : [
                {model : Post}
            ] 
        }
        ).then( (e) => {  
                e.dataValues.Posts = e.dataValues.Posts.map( (i) => i.dataValues);
                const Posts = e.dataValues;
                // console.log("🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️" , Posts)   
                // 결과물 
                    // id: 7,
                    // name: '222',
                    // age: 222,
                    // user_id: '222',
                    // user_pw: '$2b$10$rSp7C55ssL.LHkBqI2QAIujJ4my3r76EcuYQbxXrAKAFmdW8Joauy',
                    // createdAt: 2023-05-27T13:02:40.000Z,
                    // updatedAt: 2023-05-27T13:02:40.000Z,
                    // Posts: [
                    //   {
                    //     id: 29,
                    //     msg: 'salkdfj',
                    //     createdAt: 2023-05-27T13:02:46.000Z,
                    //     updatedAt: 2023-05-27T13:02:46.000Z,
                    //     user_id: 7
                    //   }, 등등등 
                    
                res.json(Posts)
        })
    

    }



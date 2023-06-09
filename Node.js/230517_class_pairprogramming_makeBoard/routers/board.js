
const router = require("express").Router();

const {Show, Write, IdShow, IdUpdate, IdDelete, RefGetData } = require("../controllers/controllers");


router.get('/' , Show );

router.get('/create', (req, res) => {
    res.render("create");
});


router.post('/create', Write);


// router.get('/content/:id', (req, res) => {
//     res.render("content") 
// })

router.get('/content/:id', IdShow);


router.post('/content/:id', IdUpdate);


router.get('/:id' , IdDelete);


router.post('/search' , RefGetData )


module.exports = router;
    // 📛📛📛📛📛📛📛📛📛📛📛📛📛📛  약함 
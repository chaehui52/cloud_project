const express = require('express');
const router = express.Router();
const authMiddleware = require('../authMiddleware');
const { 
    myPageController,
    loginController,
    signupController,
    test
 } = require('../controllers/userController');


router.get('/mypage', authMiddleware, myPageController);
router.post('/login', loginController); //지피티 도움
router.post('/signup', signupController); //지피티 도움
router.get('/test',test);



module.exports = router;
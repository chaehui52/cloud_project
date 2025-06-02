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
router.post('/login', loginController);
router.post('/signup', signupController);
router.get('/test',test);



module.exports = router;
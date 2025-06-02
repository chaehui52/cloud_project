const express = require('express');
const router = express.Router();
const authMiddleware = require('../authMiddleware');
const { 
    myRecipesController,
    myFoldersController,
    myFolderDetailController
 } = require('../controllers/myController');


router.get('/recipes', myRecipesController);
router.get('/folders',myFoldersController);
router.get('/folders/detail',myFolderDetailController);




module.exports = router;
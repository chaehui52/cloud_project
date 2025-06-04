const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { 
  allRecipesController,
  latestRecipesController,
  searchRecipesController,
  addRecipeController,
  detailRecipeController,
  levelRecipeController,
  increaseViewCountController,
  uploadImageController,
  saveFolderController,
  deleteFolderItemController
} = require('../controllers/recipesController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get('/', allRecipesController);
router.get('/latest', latestRecipesController);
router.get('/search', searchRecipesController); 
router.get('/detail', detailRecipeController); 
router.get('/level', levelRecipeController);
router.post('/add', addRecipeController); 
router.post('/:id/view', increaseViewCountController);
router.post('/upload-image', upload.single('image'), uploadImageController);

router.post('/save', saveFolderController);
router.post('/folder/deleteItem', deleteFolderItemController);




module.exports = router;

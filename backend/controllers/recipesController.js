const recipesModel  = require('../models/recipesModel');
const bcrypt = require('bcrypt');


const allRecipesController = async(req, res) => {
  try{
    const recipes = await recipesModel.getAllRecipes();
    res.json(recipes);
  }catch (error) {
    console.error('err recipes', error);
    res.status(500).json({errer: "server err"});
  }
};

const latestRecipesController = async(req, res) => {
  try{
    const recipes = await recipesModel.getLatestRecipes();
    res.json(recipes);
  }catch (error) {
    console.error('err recipes', error);
    res.status(500).json({errer: "server err"});
  }
};

const addRecipeController = async (req, res) => {
const {user_id, title, description, level, image_url, material, content } = req.body;
    try {
        await recipesModel.addRecipe(user_id, title, description, level, image_url, material, content);

        res.status(201).json({ message: '레시피 업로드드 성공' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'addRecipeController 서버 오류' });
    }
};
const detailRecipeController = async (req, res) => {
   const id = parseInt(req.query.id, 10); 

  if (isNaN(id)) {
    return res.status(400).json({ message: '올바르지 않은 ID 형식입니다.' });
}
  try {
    const recipes = await recipesModel.detailRecipe(id);
    res.json(recipes);
  }catch (error) {
    console.error('err recipes', error);
    res.status(500).json({ message: "detailRecipeController - server error" });
  }
};



const searchRecipesController = async (req, res) => {
  const query = req.query.query;
  console.log('API 검색어:', query);

  if (!query) {
    return res.status(400).json({ error: "검색어가 없습니다." });
  }
  try {
    const recipes = await recipesModel.searchRecipesByTitle(query);
    console.log('검색된 레시피 수:', recipes.length);
    res.json(recipes);
  } catch (error) {
    console.error('err recipes', error);
    res.status(500).json({ error: "server error" });
  }
};

const levelRecipeController = async (req, res) => {
  const level = req.query.level;
  console.log("요청된 레벨:", level);

  if (!level) {
    return res.status(400).json({ error: "해당 레벨이 존재하지않습니다." });
  }
  try {
    const recipes = await recipesModel.levelRecipe(level);
    res.json(recipes);
  } catch (error) {
    console.error('err recipes', error);
    res.status(500).json({ message: "levelRecipeController - server error" });
  }
};


const increaseViewCountController = async (req, res) => {
  try {
    const recipeId = req.params.id;
    console.log('increaseViewCountController 호출, recipeId:', recipeId);

    await recipesModel.increaseViewCount(recipeId);
    res.status(200).json({ message: '조회수가 증가되었습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '서버 오류' });
  }
};

const uploadImageController = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "이미지 파일이 필요합니다." });
  }

  try {
    const normalizedPath = req.file.path.replace(/\\/g, '/');

    const imageUrl = `http://localhost:5000/${normalizedPath}`;
    console.log("업로드된 이미지 URL:", imageUrl);

    res.status(200).json({ message: "업로드 성공", url: imageUrl });
  } catch (error) {
    console.error("업로드 실패:", error);
    res.status(500).json({ message: "uploadImage - server error" });
  }
};

const saveFolderController = async (req, res) => {
  const { userId, folder_name, recipeId } = req.body;
  console.log('사람,폴더,레시피피:', req.body);

  if (!userId || !folder_name || !recipeId) {
    return res.status(400).json({ error: "검색어가 없습니다." });
  }
  try {
    const recipes = await recipesModel.saveFolder(userId, folder_name, recipeId );
    console.log('검색된 레시피 수:', recipes.length);
    res.json(recipes);
  } catch (error) {
    console.error('err recipes', error);
    res.status(500).json({ error: "server error" });
  }
};

const deleteFolderItemController = async (req, res) => {
  const { userId, folder_name, recipeId } = req.body;
  console.log('사람,폴더,레시피피:', req.body);

  if (!userId || !folder_name || !recipeId) {
    return res.status(400).json({ error: "검색어가 없습니다." });
  }
  try {
    const recipes = await recipesModel.deleteFolderItem(userId, folder_name, recipeId );
    console.log('폴더 내 아이템 삭제 성공');
    res.json(recipes);
  } catch (error) {
    console.error('err recipes', error);
    res.status(500).json({ error: "server error" });
  }
};





module.exports = { 
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
 };


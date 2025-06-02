const myModel  = require('../models/myModel');
const bcrypt = require('bcrypt');



const myRecipesController = async (req, res) => {
  const writer = req.query.id; // 쿼리에서 작성자 ID 받아옴
  console.log("요청된 작성자 ID:", writer);

  if (!writer) {
    return res.status(400).json({ error: "작성자 ID가 필요합니다." });
  }

  try {
    const recipes = await myModel.myRecipes(writer);
    console.log('검색된 레시피 수:', recipes.length);
    res.json(recipes);
  } catch (error) {
    console.error('err recipes', error);
    res.status(500).json({ message: "myRecipes - server error" });
  }
};

const myFoldersController = async (req, res) => {
  const host = req.query.host; 
  console.log("요청된 host ID:", host);

  if (!host) {
    return res.status(400).json({ error: " ID가 필요합니다." });
  }

  try {
    const recipes = await myModel.myFolder(host);
    console.log('검색된 레시피 수:', recipes.length);
    res.json(recipes);
  } catch (error) {
    console.error('err recipes', error);
    res.status(500).json({ message: "myRecipes - server error" });
  }
};

const myFolderDetailController = async (req, res) => {
  const { userId, folderName } = req.query;  
  console.log("요청된 userId,folderName:", userId,folderName);

  if (!userId || !folderName) {
    return res.status(400).json({ error: " ID가 필요합니다." });
  }

  try {
    const recipes = await myModel.myFolderDetail(userId, folderName);
    console.log('검색된 레시피 수:', recipes.length);
    res.json(recipes);
  } catch (error) {
    console.error('err recipes', error);
    res.status(500).json({ message: "myRecipes - server error" });
  }
};




module.exports = { 
  myRecipesController,
  myFoldersController,
  myFolderDetailController

 };


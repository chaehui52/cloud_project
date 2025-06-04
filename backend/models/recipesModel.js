const pool = require('../config/db');

const getAllRecipes = async () => {
  const result = await pool.query("SELECT * FROM recipes");
  return result.rows;
};

const getLatestRecipes = async () => {
  const result = await pool.query("SELECT * FROM recipes ORDER BY id DESC LIMIT 3");
  return result.rows;
};

const searchRecipesByTitle = async (keyword) => {
  const result = await pool.query(
    "SELECT * FROM recipes WHERE LOWER(title) LIKE LOWER($1)", [`%${keyword}%`]
  );
  return result.rows;
};

const detailRecipe = async (id) => {
  const result = await pool.query(
    "SELECT * FROM recipes WHERE id = $1", [id]
  );
  return result.rows[0];
}; 

const levelRecipe = async (level) => {
  const result = await pool.query(
    "SELECT * FROM recipes WHERE level = $1", [level]
  );
  return result.rows;
}; 

const addRecipe = async (user_id, title, description, level, image_url, material, content) => {
  const result = await pool.query(
    "INSERT INTO recipes (writer, title, description, level, image_url, material, content) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [user_id, title, description, level,image_url, material, content]
  );
  return result.rows;
};




const getLikeCount = async (recipeId) => {
  const result = await pool.query(
    'SELECT likes FROM recipes WHERE recipe_id = $1',
    [recipeId]
  );
  if (result.rows.length > 0) {
    return result.rows[0].likes;
  }
  return 0;
};


const increaseViewCount = async (id) => {
  const result = await pool.query(
    'UPDATE recipes SET "viewCount" = "viewCount" + 1 WHERE id = $1', [id]
  );
  return result;
};

const saveFolder = async (userId, folder_name, recipeId) => {
  const result = await pool.query(
    'INSERT INTO folder (host, folder_name, recipe_id)VALUES ($1, $2, $3) RETURNING *', [userId, folder_name, recipeId]
  );
  return result.row[0];
};

const deleteFolderItem = async (userId, folder_name, recipeId) => {
  const result = await pool.query(
    'DELETE FROM folder WHERE host = $1 AND folder_name = $2 AND recipe_id = $3 RETURNING *', [userId, folder_name, recipeId]
  );
  return result.row;
};



module.exports = { 
  getAllRecipes,
  getLatestRecipes,
  searchRecipesByTitle,
  detailRecipe,
  addRecipe,
  levelRecipe,
  increaseViewCount,
  saveFolder,
  deleteFolderItem
};

const pool = require('../config/db');


const myRecipes = async (writer) => {
  const result = await pool.query(
    "SELECT * FROM recipes WHERE writer = $1", [writer]
  );
  return result.rows;
}; 

const myFolder = async (host) => {
  const result = await pool.query(
    "SELECT DISTINCT folder_name FROM folder WHERE host = $1", [host]
  );
  return result.rows;
}; 

const myFolderDetail = async (host, folder_name) => {
  const query = `
    SELECT r.*
    FROM folder f
    JOIN recipes r ON f.recipe_id = r.id
    WHERE f.host = $1 AND f.folder_name = $2
  `;
  const result = await pool.query(query, [host, folder_name]);
  return result.rows;
};



module.exports = { 
  myRecipes,
  myFolder,
  myFolderDetail

};

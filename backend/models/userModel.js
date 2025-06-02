const pool = require('../config/db');

const myPage = async (keyword) => {

    const result = await pool.query(
        'SELECT * FROM "user" WHERE user_id = $1',[keyword]
    );
    return result.rows[0];
};

const findUserById = async (userId) => {
  const result = await pool.query(
    'SELECT * FROM "user" WHERE user_id = $1',
    [userId]
  );
  return result.rows[0];
};

const signup = async (userId, hashedPassword, name) => {
    await pool.query(
       'INSERT INTO public."user" (user_id, user_pw, user_name) VALUES ($1, $2, $3)',
        [userId, hashedPassword, name]
    );
};


module.exports = { 
  myPage,
  findUserById,
  signup
};
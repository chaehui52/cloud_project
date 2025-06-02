 const userModel  = require('../models/userModel');
 const bcrypt = require('bcrypt'); // 비밀번호 비교용
const jwt = require('jsonwebtoken'); // 토큰 발급용

 
 const myPageController = async (req, res) => {
    try {
        const userId = req.user.id;  // 미들웨어에서 세팅한 user id
        const userInfo = await userModel.myPage(userId);

        console.log("con");

        if (!userInfo) {

        return res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
        }

        res.json({
        id: userInfo.id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
 };

const loginController = async (req, res) => {
  const { userId, password } = req.body;
  console.log('controller');

  try {
    const user = await userModel.findUserById(userId);

    if (!user) {
      return res.status(404).json({ message: '존재하지 않는 사용자입니다.' });
    }

    const isMatch = await bcrypt.compare(password, user.user_pw);

    if (!isMatch) {
      return res.status(401).json({ message: '비밀번호가 틀렸습니다.' });
    }

    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    const userData = {
      userId: user.user_id,
      name: user.user_name, 
    };

    res.json({ token, user: userData, message: '로그인 성공' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
};



const signupController = async (req, res) => {
  const { userId, password, name } = req.body;

  try {
    const existingUser = await userModel.findUserById(userId);

    if (existingUser) {
      return res.status(400).json({ message: '이미 존재하는 아이디입니다.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.signup(userId, hashedPassword, name);

    res.status(201).json({ message: '회원가입 성공' });
  } catch (error) {
    console.error('[회원가입 실패]', error);
    res.status(500).json({ message: '서버 오류로 회원가입에 실패했습니다.' });
  }
};


const test = async (req, res) => {
    console.log("con");

   
};
 module.exports = { 
   myPageController,
   loginController,
   signupController,
   test
  };
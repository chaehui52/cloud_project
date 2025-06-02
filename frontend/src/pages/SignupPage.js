import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupPage() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/user/signup', {
        userId: id,
        password: pw,
        name: name,
      });

      alert(response.data.message);
      navigate('/login'); // 회원가입 성공 후 로그인 페이지로 이동
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || '회원가입 실패');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <div>
        <h2>회원가입</h2>
        <h4>이름</h4>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
        />
        <h4>ID</h4>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디를 입력하세요"
        />
        <h4>Password</h4>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="비밀번호를 입력하세요"
        />
        <br /><br />
        <button onClick={handleSignup}>회원가입</button>
      </div>
    </div>
  );
}

export default SignupPage;

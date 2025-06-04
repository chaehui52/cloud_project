import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://118.216.49.98:5000/user/login', {
        userId: id,
        password: pw,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      alert(response.data.message);
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || '로그인 실패');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div>
        <h2>로그인</h2>
        <h4>ID</h4>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디 입력"
        />
        <h4>Password</h4>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="비밀번호 입력"
        />
        <br />
        <br />
        <button
          onClick={handleLogin}
          style={{
            background: '#34C56E',
            borderRadius: '30px',
            padding: '20px',
            border: 'none',
            color: 'white',
            fontSize: '40px',
            cursor: 'pointer',
            fontWeight: 'bold',
            textDecoration: 'none',
            marginRight: '20px',
          }}
        >
          로그인
        </button>
        <Link
          to="/signup"
          style={{
            background: '#34C56E',
            borderRadius: '30px',
            padding: '20px',
            border: 'none',
            color: 'white',
            fontSize: '40px',
            cursor: 'pointer',
            fontWeight: 'bold',
            textDecoration: 'none',
          }}
        >
          회원가입
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;

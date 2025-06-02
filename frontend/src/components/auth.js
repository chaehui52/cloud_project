// auth.js

// 로그인 상태 체크: 토큰이 있으면 true, 없으면 false
export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};

// 로그아웃: 저장된 토큰과 사용자 정보 모두 삭제
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// src/components/auth.js (또는 auth.js)
export const getCurrentUser = () => {
  const userString = localStorage.getItem('user');
  if (!userString) return null;
  try {
    return JSON.parse(userString);
  } catch {
    return null;
  }
};


// 로그인 성공 시 토큰과 사용자 정보 저장하기
export const saveAuthData = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { getCurrentUser } from '../components/auth';

function Home() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  console.log(user?.name);  

  const [recipes, setRecipes] = useState([]);
  const [searchRecipes, setSearchRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebar, setIsSidebar] = useState(false);

  useEffect(() => {
    fetch('http://118.216.49.98:5000/recipes/latest')
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
        console.log(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error recipes:', error);
        setLoading(false);
      });
  }, []); 

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      alert('검색어를 입력하세요!');
      return;
    }
    setLoading(true);
    fetch(`http://118.216.49.98:5000/recipes/search?query=${encodeURIComponent(searchQuery)}`)
      .then(res => res.json())
      .then(data => {
        setSearchRecipes(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('검색 중 오류:', error);
        setLoading(false);
      });
  };

  const toggleSidebar = () => {
    setIsSidebar(prev => !prev);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 40px',
        }}
      >
        <Link
          to="/home"
          style={{
            background: 'none',
            border: 'none',
            color: '#34C56E',
            fontSize: '40px',
            cursor: 'pointer',
            fontWeight: 'bold',
            textDecoration: 'none',
          }}
        >
          쉐프노트
        </Link>

        <button
          onClick={toggleSidebar}
          style={{
            marginLeft: '20px',
            background: 'none',
            border: 'none',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '50px',
          }}
          aria-label="Toggle sidebar"
        >
          <FaBars size="30" color="#34C56E" />
        </button>

        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '250px',
            height: '100%',
            backgroundColor: '#379D60',
            color: 'white',
            padding: '20px',
            boxSizing: 'border-box',
            transform: isSidebar ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s ease-in-out',
            zIndex: 1000,
          }}
        >
          <button
            onClick={toggleSidebar}
            style={{
              marginLeft: '90%',
              background: 'none',
              border: 'none',
              fontSize: '16px',
              fontWeight: 'bold',
              color: 'white',
            }}
            aria-label="Close sidebar"
          >
            <FaBars size="30" color="white" />
          </button>

          <h3>{user ? `${user.name}쉐프님, 환영합니다!` : '로그인 해주세요'}</h3>

          <h2>요리 난이도 선택</h2>

          {['초급', '중급', '고급'].map((level) => (
            <button
              key={level}
              onClick={() => navigate(`/level/${level}`)}
              style={{
                borderColor: 'white',
                backgroundColor: 'white',
                color: '#379D60',
                fontSize: '20px',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '20px',
                padding: '10px',
                width: '200px',
                marginBottom: '20px',
                boxShadow: 'none',
              }}
            >
              {level}
            </button>
          ))}

          <h2>레시피</h2>

          {['upload', 'myRecipe', 'myFolder'].map((path, idx) => (
            <button
              key={path}
              onClick={() => navigate(`/${path}`)}
              style={{
                borderColor: 'white',
                backgroundColor: 'white',
                color: '#379D60',
                fontSize: '20px',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '20px',
                padding: '10px',
                width: '200px',
                marginBottom: idx === 2 ? '50px' : '20px',
                boxShadow: 'none',
              }}
            >
              {path === 'upload'
                ? '레시피 등록'
                : path === 'myRecipe'
                ? '내 레시피'
                : '찜한 레시피'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'block' }}>
        <div style={{ display: 'flex' }}>
          <h1 style={{ marginLeft: '20px', color: '#DE5353' }}>
            <span style={{ color: '#696161', marginRight: '5px', fontSize: '15px' }}>방금 완성!</span>
            오늘의 요리 신상
          </h1>

          <div
            style={{
              marginTop: '40px',
              flexGrow: 1,
              height: '2px',
              backgroundColor: '#ccc',
              marginLeft: '10px',
              marginRight: '5%',
            }}
          />
        </div>

        <ul style={{ padding: 0, margin: 0, display: 'flex', marginLeft: '20px' }}>
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              onClick={() => navigate(`/detail/${recipe.id}`)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                margin: '20px',
                padding: '15px',
                borderRadius: '80px',
                border: '4px solid #DC8989',
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                width: '27%',
                height: '130px',
                transition: 'transform 0.2s',
                listStyle: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '60px',
                  marginRight: '15px',
                  color: '#686868',
                  fontSize: '14px',
                  userSelect: 'none',
                }}
              >
                <div style={{ marginBottom: '8px', textAlign: 'center', fontWeight: 'bold' }}>
                  <span style={{ marginRight: '5px', width: '30px' }}>조회수</span>
                  {recipe.viewCount || 0}
                </div>
                <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  <span style={{ marginRight: '5px', color: 'red', width: '30px' }}>❤️</span>
                  {recipe.likes || 0}
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 8px 0' }}>{recipe.title}</h3>
                <p style={{ margin: 0 }}>{recipe.description}</p>
              </div>

              {recipe.image_url && (
                <img
                  src={recipe.image_url.trim()}
                  alt={recipe.title}
                  style={{
                    width: '200px',
                    height: '140px',
                    marginLeft: '20px',
                    borderRadius: '80px',
                    objectFit: 'cover',
                  }}
                />
              )}
            </li>
          ))}
        </ul>

        <div
          style={{
            flexGrow: 1,
            height: '2px',
            backgroundColor: '#ccc',
            marginLeft: '10px',
            marginRight: '5%',
          }}
        />
      </div>

      <input
        type="text"
        placeholder="내가 원하는 요리를 마음껏 검색해보세요"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: '500px',
          height: '40px',
          borderRadius: '50px',
          border: '3px solid #379D60',
          paddingLeft: '15px',
          marginLeft: '20px',
          marginBottom: '20px',
          fontSize: '15px',
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
      />

      <button
        onClick={handleSearch}
        style={{
          backgroundColor: '#379D60',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '50px',
          border: 'none',
          fontSize: '15px',
          fontWeight: 'bold',
          marginLeft: '15px',
          cursor: 'pointer',
        }}
      >
        검색
      </button>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          marginTop: '20px',
          marginLeft: '20px',
          marginRight: '20px',
        }}
      >
        {loading && <p>로딩중...</p>}

        {!loading && searchRecipes.length === 0 && searchQuery && (
          <p>검색 결과가 없습니다.</p>
        )}

        {!loading &&
          searchRecipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => navigate(`/detail/${recipe.id}`)}
              style={{
                border: '3px solid #379D60',
                borderRadius: '10px',
                padding: '10px',
                width: 'calc(25% - 20px)',
                cursor: 'pointer',
                boxSizing: 'border-box',
              }}
            >
              <h3>{recipe.title}</h3>
              {recipe.image_url && (
                <img
                  src={recipe.image_url.trim()}
                  alt={recipe.title}
                  style={{ width: '100%', borderRadius: '10px' }}
                />
              )}
              <p>{recipe.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;

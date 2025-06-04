import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function LevelPage() {
  const navigate = useNavigate();
  const { level } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('현재 level:', level);
    fetch(`http://118.216.49.98:5000/recipes/level?level=${encodeURIComponent(level)}`)
      .then(res => res.json())
      .then(data => {
        console.log('받은 데이터:', data);
        setRecipes(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error recipes:', error);
        setLoading(false);
      });
  }, [level]);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Link
          to="/home"
          style={{
            paddingLeft: '20px',
            paddingTop: '20px',
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
        <h2 style={{ padding: 20 }}>{level} 페이지</h2>
      </div>

      {loading ? (
        <p style={{ paddingLeft: 20 }}>로딩중...</p>
      ) : recipes.length === 0 ? (
        <p style={{ paddingLeft: 20 }}>작성한 레시피가 없습니다.</p>
      ) : (
        <ul
          style={{
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {recipes.map(recipe => (
            <li
              key={recipe.id}
              onClick={() => navigate(`/detail/${recipe.id}`)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                padding: '15px',
                borderRadius: '10px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                width: '60%',
                transition: 'transform 0.2s',
                listStyle: 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <div
                style={{
                  width: '5px',
                  alignSelf: 'stretch',
                  backgroundColor: '#34C56E',
                  marginRight: '10px',
                  borderRadius: '2px',
                }}
              ></div>

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
                    height: '100px',
                    marginLeft: '20px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      )}

      {/* 
      webpack-dev-server 경고 관련:
      react-scripts 업그레이드로 해결 권장
      */}
    </div>
  );
}

export default LevelPage;

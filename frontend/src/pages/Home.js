import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GiChefToque } from "react-icons/gi"; 
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { getCurrentUser } from '../components/auth';




function Home() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  console.log(user.name);      


  const [recipes, setRecipes] = useState([]);
  const [searchRecipes, setSearchRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebar, setIsSidebar] = useState(false);

  

  useEffect(() => {
    fetch('http://localhost:5000/recipes/latest')
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
    fetch(`http://localhost:5000/recipes/search?query=${encodeURIComponent(searchQuery)}`)
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

  const effectSidebar = () => {
      setIsSidebar(!isSidebar)
  }


  return (
    <div>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '20px 40px'
      }}>
        
        <Link 
          to="/home" 
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#34C56E', 
            fontSize: '40px', 
            cursor: 'pointer', 
            fontWeight: 'bold', 
            textDecoration: 'none' 
          }}
        >
          쉐프노트
        </Link>
        <button onClick={effectSidebar}
        style={{
          marginLeft: "20px",
          background: 'none',
          border: 'none',
          fontSize: '16px',
          fontWeight: 'bold',
          borderRadius: '50px',
        }}>
          <FaBars size='30' color="#34C56E"/>
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
                <button onClick={effectSidebar}
            style={{
              marginLeft: "90%",
              background: 'none',
              border: 'none',
              fontSize: '16px',
              fontWeight: 'bold',
              color: 'white'
            }}>
             
          <FaBars size='30' color='white'/>
           </button>
           <h3>{user ? `${user.name}쉐프님, 환영합니다!` : '로그인 해주세요'}</h3>
            <h2>요리 난이도 선택</h2>

          <button 
          onClick={() => {
              navigate(`/level/초급`);
            }}
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
            boxShadow: 'none'
          }}
          >초급</button>

          <button 
          onClick={() => {
                navigate(`/level/중급`);
              }}
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
            boxShadow: 'none'
          }}
          >중급</button>

          <button 
          onClick={() => {
                navigate(`/level/고급`);
              }}
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
            boxShadow: 'none'
          }}
          >고급</button>
        <h2>레시피</h2>

        <button 
          onClick={() => {
                navigate(`/upload`);
              }}
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
            boxShadow: 'none'
          }}
          >레시피 등록</button>
          
        <button 
          onClick={() => {
                navigate(`/myRecipe`);
              }}
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
            boxShadow: 'none'
          }}
          >내 레시피</button>

          <button 
          onClick={() => {
                navigate(`/myFolder`);
              }}
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
            marginBottom: '50px',
            boxShadow: 'none'
          }}
          >찜한 레시피</button>
        </div>
      </div>

    <div style={{ display: 'block' }}>
        <div
            style={{
                display: 'flex'
            }}>
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
            ></div>
        </div>
       
        <ul style={{ padding: 0, margin: 0, display: 'flex', marginLeft: '20px' }}>
             
           
          {recipes.map((recipe, index) => (
            <li
              key={index}
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
            ></div>
      </div>

      <input
        type="text"
        placeholder="내가 원하는 요리를 마음껏 검색해보세요!"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
        marginLeft: '301px',
          margin: '30px',
          padding: '20px',
          paddingLeft: '30px',
          fontSize: '16px',
          borderRadius: '50px',
          border: '3px solid #8CDCAC',
          width: '50%',
          fontSize: '20px',
          fontWeight: 'bold'

        }}
      />
      <button
        onClick={handleSearch}
        style={{
          background: '#34C56E',
          border: 'none',
          borderRadius: '50px',
          padding: '5px',
          width: '90px',
          height: '60px',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '22px',
          cursor: 'pointer',
        }}
      >
        검색
      </button>

      <ul style={{ padding: 0, margin: 0, display: 'block', marginLeft: '20px' }}>
             
           
          {searchRecipes.map((searchRecipes, index) => (
            <li
              key={index}
              onClick={() => navigate(`/detail/${searchRecipes.id}`)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                marginLeft: '350px',
                marginBottom: '30px',
                padding: '15px',
                borderRadius: '10px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                width: '45%',
                height: '130px',
                transition: 'transform 0.2s',
                listStyle: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
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
                  {searchRecipes.viewCount || 0}
                </div>
                <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  <span style={{ marginRight: '5px', color: 'red', width: '30px' }}>❤️</span>
                  {searchRecipes.likes || 0}
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 8px 0' }}>{searchRecipes.title}</h3>
                <p style={{ margin: 0 }}>{searchRecipes.description}</p>
              </div>

              {searchRecipes.image_url && (
                <img
                  src={searchRecipes.image_url.trim()}
                  alt={searchRecipes.title}
                  style={{
                    width: '200px',
                    height: '140px',
                    marginLeft: '20px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                  }}
                />
              )}
            </li>
          ))}
        </ul>

      
    </div>
  );
}

export default Home;

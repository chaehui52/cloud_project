import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../components/auth'; 
import { GiFileCabinet } from "react-icons/gi";


function MyFolderPage() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const [folder, setFolder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !user.userId) {
      setError('로그인이 필요합니다.');
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/my/folders?host=${user.userId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('서버 응답 오류');
        }
        return res.json();
      })
      .then(data => {
        console.log('받은 폴더 데이터:', data);
        if (data.message) {
          setError(data.message);
        } else {
          setFolder(data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching folders:', error);
        setError('폴더를 불러오는 데 실패했습니다.');
        setLoading(false);
      });
  }, [user.userId]);

  if (loading) {
    return <div style={{ padding: 20 }}>로딩 중...</div>;
  }

  return (
    <div>
      {/* 상단 네비게이션 */}
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
        <h3 style={{ padding: 20, paddingTop: 25 }}>
          {user.name}쉐프님 보유한 레시피 폴더
        </h3>
      </div>

      {}
      {error && (
        <p style={{ color: 'red', paddingLeft: 20 }}>{error}</p>
      )}

      {}
      {folder.length === 0 ? (
        <p style={{ paddingLeft: 20 }}>생성된 폴더가 없습니다.</p>
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
          {folder.map((folderItem, index) => (
             console.log("folderItem:", folderItem),
            <li
              key={index}
               onClick={() =>
                    navigate(`/folder/${user.userId}/${encodeURIComponent(folderItem.folder_name)}`)
                    }
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                padding: '15px',
                borderRadius: '30px',
                backgroundColor: '#fff',
                 border: '2px solid #34C56E',
                // boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                width: '60%',
                transition: 'transform 0.2s',
                listStyle: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {}
               <i style={{ fontSize: "32px", color: "#34C56E", marginRight: '10px' }}/>

              {}
              <div
                style={{
                  flex: 1,
                }}
              >
                <h3 style={{ margin: '0 0 8px 0' }}>{folderItem.folder_name}</h3>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyFolderPage;

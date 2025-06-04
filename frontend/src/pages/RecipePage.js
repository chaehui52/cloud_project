import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../components/auth';

function RecipePage() {
    const navigate = useNavigate();
    const user = getCurrentUser();
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [folders, setFolders] = useState([]);
    const [showFolderList, setShowFolderList] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');

    const fetchFolders = async () => {
        try {
            const res = await fetch(`http://118.216.49.98:5000/my/folders?host=${user.userId}`);
            const data = await res.json();
            setFolders(data);
            setShowFolderList(true);
        } catch (err) {
            console.error('폴더 목록 로딩 실패:', err);
        }
    };

    const handleFolderSelect = async (folderName) => {
        try {
            const res = await fetch(`http://118.216.49.98:5000/recipes/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: user.userId, folder_name: folderName, recipeId: id })
            });

            const data = await res.json();
            console.log('레시피 폴더 저장 완료:', data);
            alert(`${folderName}에 저장 완료!`);
            setShowFolderList(false);
        } catch (err) {
            console.error('레시피 저장 실패:', err);
        }
    };

    useEffect(() => {
        fetch(`http://118.216.49.98:5000/recipes/${id}/view`, { method: 'POST' })
            .then(res => res.json())
            .then(data => console.log('조회수 증가 성공:', data))
            .catch(err => console.error('조회수 증가 실패:', err));
    }, [id]);

    useEffect(() => {
        fetch(`http://118.216.49.98:5000/recipes/detail?id=${id}`)
            .then(res => res.json())
            .then(data => {
                setRecipe(data || null);
            })
            .catch(error => {
                console.error('Error recipes:', error);
            });
    }, [id]);

    if (!recipe) {
        return <div>로딩 중...</div>;
    }

    return (
        <div>
            <div>
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
                        position: 'absolute',
                        left: 20,
                        top: 20
                    }}
                >
                    쉐프노트
                </Link>

                <h1
                    style={{
                        fontSize: '50px',
                        textAlign: 'center',
                        margin: 0,
                        paddingTop: '20px'
                    }}
                >
                    {recipe.title}
                </h1>
            </div>

            <p
                style={{
                    marginLeft: '80%',
                    marginTop: '50px'
                }}
            >
                조회수 {recipe.viewCount}
            </p>

            <ul
                style={{
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <li
                    style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                        padding: '15px',
                        borderRadius: '30px',
                        backgroundColor: '#fff',
                        boxShadow: '0 2px 8px black',
                        width: '70%',
                        height: 'auto',
                        transition: 'transform 0.2s',
                        listStyle: 'none',
                        border: '5px solid #34C56E'
                    }}
                >
                    {recipe.image_url && (
                        <img
                            src={recipe.image_url.trim()}
                            alt={recipe.title}
                            style={{
                                width: 'auto',
                                height: '300px',
                                borderRadius: '8px'
                            }}
                        />
                    )}

                    <div style={{ display: 'block' }}>
                        <div style={{ display: 'flex', marginBottom: '20px' }}>
                            <div
                                style={{
                                    marginLeft: '10px',
                                    marginRight: '20px',
                                    width: '6px',
                                    height: '40px',
                                    background: '#D53434'
                                }}
                            />
                            <h2 style={{ margin: '0 0px 8px 20px', color: '#4D4D4D' }}>
                                설명 | {recipe.description}
                            </h2>
                        </div>
                        <div style={{ display: 'flex', marginBottom: '20px' }}>
                            <div
                                style={{
                                    marginLeft: '10px',
                                    marginRight: '20px',
                                    width: '6px',
                                    height: '40px',
                                    background: '#34C56E'
                                }}
                            />
                            <h2 style={{ margin: '0 0 8px 0', color: '#4D4D4D' }}>
                                난이도 | {recipe.level}
                            </h2>
                        </div>
                        <div style={{ display: 'flex', marginBottom: '20px' }}>
                            <div
                                style={{
                                    marginLeft: '10px',
                                    marginRight: '20px',
                                    width: '6px',
                                    height: '40px',
                                    background: '#34C56E'
                                }}
                            />
                            <h2 style={{ margin: '0 0 8px 20px', color: '#4D4D4D' }}>
                                재료 | {recipe.material}
                            </h2>
                        </div>
                    </div>
                </li>

                <div
                   onClick={fetchFolders}
  style={{
    marginLeft: '1300px',
    width: '70px',   
    height: '40px',
    borderRadius: '20px',
    backgroundColor: 'white',
    border: '3px solid #34C56E',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: '0.2s',
    fontSize: '20px',
    color: '#34C56E',
    fontWeight: 'bold',
    userSelect: 'none',
  }}
  저장
                >
                    <i
                    
                        style={{
                            fontSize: '20px',
                            color: '#34C56E'
                        }}
                    />
                </div>

                <h2
                    style={{
                        margin: '50px 0 8px 0',
                        textAlign: 'center'
                    }}
                >
                    설명 -{' '}
                    {recipe.content.split('\n').map((line, idx) => (
                        <span key={idx}>
                            {idx !== 0 && <br />}
                            {line}
                        </span>
                    ))}
                </h2>

                {showFolderList && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'black',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: 'white',
                                padding: '20px',
                                borderRadius: '15px',
                                boxShadow: '0 4px 12px black',
                                width: '300px',
                                maxHeight: '600px',
                                overflowY: 'auto'
                            }}
                        >
                            <h4 style={{ marginBottom: '15px', textAlign: 'center' }}>
                                저장할 폴더를 선택해주세요!
                            </h4>
                            {folders.length === 0 ? (
                                <p style={{ paddingLeft: 20 }}>생성된 폴더가 없습니다.</p>
                            ) : (
                                <ul
                                    style={{
                                        padding: 0,
                                        margin: 0,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}
                                >
                                    {folders.map((folderItem) => (
                                        <li
                                            key={folderItem.folder_name}
                                            onClick={() => handleFolderSelect(folderItem.folder_name)}
                                            style={{
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '20px',
                                                padding: '15px',
                                                borderRadius: '30px',
                                                backgroundColor: '#fff',
                                                border: '3px solid #34C56E',
                                                width: '60%',
                                                transition: 'transform 0.2s',
                                                listStyle: 'none'
                                            }}
                                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                        >
                                            <i
                                                style={{
                                                    fontSize: '32px',
                                                    color: '#34C56E',
                                                    marginRight: '10px'
                                                }}
                                            />
                                            <div style={{ flex: 1 }}>
                                                <h3 style={{ margin: '0 0 8px 0' }}>{folderItem.folder_name}</h3>
                                            </div>
                                        </li>
                                    ))}

                                    <div>
                                        <input
                                            type="text"
                                            placeholder="새 파일명"
                                            value={newFolderName}
                                            onChange={(e) => setNewFolderName(e.target.value)}
                                            style={{
                                                marginLeft: '301px',
                                                margin: '42px',
                                                padding: '20px',
                                                paddingLeft: '30px',
                                                fontSize: '20px',
                                                borderRadius: '30px',
                                                border: '3px solid #8CDCAC',
                                                width: '50%',
                                                fontWeight: 'bold'
                                            }}
                                        />
                                        <button
                                            onClick={() => {
                                                if (newFolderName.trim() !== '') {
                                                    handleFolderSelect(newFolderName.trim());
                                                    setNewFolderName('');
                                                } else {
                                                    alert('폴더 이름을 입력해주세요.');
                                                }
                                            }}
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
                                                marginBottom: '30px',
                                                marginLeft: '50px'
                                            }}
                                        >
                                            저장
                                        </button>
                                    </div>
                                </ul>
                            )}
                        </div>
                    </div>
                )}
            </ul>
        </div>
    );
}

export default RecipePage;

import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {getCurrentUser} from '../components/auth'; // 실제 경로에 맞게 수정하세요

function MyRecipePage() {
    const user = getCurrentUser();
    console.log("user: ", user);
    const navigate = useNavigate();

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user || !user.userId) {
            setError('로그인이 필요합니다.');
            setLoading(false);
            return;
        }

        fetch(`http://localhost:5000/my/recipes?id=${user.userId}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('서버 응답 오류');
                }
                return res.json();
            })
            .then(data => {
                if (data.message) {
                    setError(data.message);
                } else {
                    setRecipes(data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
                setError('레시피를 불러오는 데 실패했습니다.');
                setLoading(false);
            });
    }, [user.userId]);

    if (loading) {
        return <div style={{
                padding: 20
            }}>로딩 중...</div>;
    }

    return (
        <div>

            <div style={{
                    display: 'flex'
                }}>
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
                        textDecoration: 'none'
                    }}>
                    쉐프노트
                </Link>
                <h3
                    style={{
                        padding: 20,
                        paddingTop: 25
                    }}>
                    {user.name}
                    쉐프님이 작성한 레시피
                </h3>

            </div>

            {
                error && (<p
                    style={{
                        color: 'red',
                        paddingLeft: 20
                    }}>{error}</p>)
            }

            {
                recipes.length === 0
                    ? (<p
                        style={{
                            paddingLeft: 20
                        }}>작성한 레시피가 없습니다.</p>)
                    : (
                        <ul
                            style={{
                                padding: 0,
                                margin: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                            {
                                recipes.map((recipe, index) => (
                                    <li
                                        key={index}
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
                                            listStyle: 'none'
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
                                        {}<div
                                            style={{
                                                width: '5px',
                                                alignSelf: 'stretch',
                                                backgroundColor: '#34C56E',
                                                marginRight: '10px',
                                                borderRadius: '2px'
                                            }}
                                        ></div>

                                    {}<div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '60px',
                                            marginRight: '15px',
                                            color: '#686868',
                                            fontSize: '14px',
                                            userSelect: 'none'
                                        }}
                                    >
                                    <div
                                        style={{
                                            marginBottom: '8px',
                                            textAlign: 'center',
                                            fontWeight: 'bold'
                                        }}>
                                        <span
                                            style={{
                                                marginRight: '5px'
                                            }}>조회수</span>
                                        {recipe.viewCount || 0}
                                    </div>
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            fontWeight: 'bold'
                                        }}>
                                        <span
                                            style={{
                                                marginRight: '5px',
                                                color: 'red'
                                            }}>❤️</span>
                                        {recipe.likes || 0}
                                    </div>
                                </div>

                                {}<div
                                    style={{
                                        flex: 1
                                    }}>
                                <h3
                                    style={{
                                        margin: '0 0 8px 0'
                                    }}>{recipe.title}</h3>
                                <p
                                    style={{
                                        margin: 0
                                    }}>{recipe.description}</p>
                            </div>

                            {} {
                                recipe.image_url && (
                                    <img
                                        src={recipe.image_url}
                                        alt={recipe.title}
                                        style={{
                                            width: '200px',
                                            height: '100px',
                                            marginLeft: '20px',
                                            borderRadius: '8px',
                                            objectFit: 'cover'
                                        }}/>
                                )
                            }
                        </li>
                                ))
                            }
                        </ul>

                    )
            }
        </div>
    );
}

export default MyRecipePage;

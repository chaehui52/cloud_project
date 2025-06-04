import React, { useRef, useState } from 'react';
import axios from 'axios';
import { getCurrentUser } from '../components/auth'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

const UploadRecipePage = () => {
  const user = getCurrentUser();
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_id: user.userId,
    title: '',
    description: '',
    level: '',
    material: '',
    content: '',
    image_url: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
      await uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append('image', file);

    try {
      const response = await fetch('http://118.216.49.98:5000/recipes/upload-image', {
        method: 'POST',
        body: data,
      });
      const result = await response.json();
      console.log('서버 업로드 성공, 이미지 URL:', result.url);
      alert('이미지 업로드 성공')
      

      setFormData((prev) => ({
        ...prev,
        image_url: result.url,
      }));
      
    } catch (error) {
      console.error('업로드 실패:', error);
      alert('이미지 업로드 실패');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image_url) {
      alert('이미지를 먼저 업로드해주세요!');
      return;
    }

    try {
      const res = await axios.post('http://118.216.49.98:5000/recipes/add', formData);
      alert('레시피 업로드 성공');
      navigate('/home')
    } catch (err) {
      console.error(err);
      alert('레시피 업로드 실패');
    }
  };

  const inputStyle = {
    margin: '10px',
    padding: '20px 20px',
    fontSize: '20px',
    borderRadius: '50px',
    height: '10px',
    border: '3px solid #8CDCAC',
    width: '400px',
    fontWeight: 'bold',
  };

  return (
    
    <div
      style={{marginLeft: '150px'}}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link
          to="/home"
          style={{
            paddingLeft: '20px',
            paddingTop: '20px',
            color: '#34C56E',
            fontSize: '40px',
            fontWeight: 'bold',
            textDecoration: 'none',
            marginLeft: '-130px'
          }}
        >
          쉐프노트
        </Link>
        <h3 style={{ padding: 20 , marginTop: '50px', color: '#707673'}}>{user.name}쉐프님, 어떤 멋진 레시피를 작성해주실건가요?</h3>
      </div>

      
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', gap: '20px', maxWidth: 1000, marginLeft: '3%' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 style={{ width: '130px' }}>레시피명</h2>
            <input name="title" value={formData.title} onChange={handleChange} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 style={{ width: '130px' }}>설명</h2>
            <input name="description" value={formData.description} onChange={handleChange} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 style={{ width: '130px' }}>난이도</h2>
            <input name="level" value={formData.level} onChange={handleChange} style={inputStyle} required />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 style={{ width: '130px' }}>재료</h2>
            <input name="material" value={formData.material} onChange={handleChange} style={inputStyle} required />
          </div>

          <div style={{ display: 'flex', marginTop: '20px' }}>
            <div
              onClick={() => fileInputRef.current.click()}
              style={{
                width: '300px',
                border: '3px dashed #8CDCAC',
                borderRadius: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '250px',
                cursor: 'pointer',
                flexDirection: 'column',
                fontWeight: 'bold',
                fontSize: '18px',
                color: '#8CDCAC',
              }}
            >
              {selectedImage ? (
                <img src={selectedImage} alt="선택된 이미지" style={{ maxWidth: '100%', maxHeight: '100%' }} />
              ) : (
                <>
                  사진 등록
                  <br />
                  클릭 또는 드래그해서 업로드
                </>
              )}
              <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
            </div>
            <div style={{ marginLeft: '10px', textAlign: 'center', marginTop: '30px' }}>
              <h3 style={{ color: '#34C56E' }}>음식 사진을 올려주세요!</h3>
              <p style={{ color: '#BABABA' }}>
                정사각형 모양의 사진을 추천해요!
                <br /> 길이가 다르면 사진이 늘어날 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        <div>
          <textarea
            name="content"
            placeholder="레시피를 마음껏 작성해주세요!"
            value={formData.content}
            onChange={handleChange}
            style={{
              width: '500px',
              height: '550px',
              padding: '15px',
              fontSize: '16px',
              borderRadius: '15px',
              border: '3px solid #8CDCAC',
              fontWeight: 'bold',
              textAlign: 'center',
              fontFamily: 'inherit',
              marginTop: '10px',
            }}
            required
          />
        </div>
      </form>

      {}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          type="submit"
          onClick={handleSubmit}
          style={{
            padding: '15px',
            backgroundColor: '#34C56E',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '200px',
            margin: '50px'
          }}
        >
          레시피 등록
        </button>
      </div>
    </div>
  );
};

export default UploadRecipePage;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RecipePage from './pages/RecipePage';
import LevelPage from './pages/LevelPage';
import UploadRecipePage from './pages/UploadRecipePage';
import SignupPage from './pages/SignupPage';
import MyFolderPage from './pages/MyFolderPage';
import MyFolderDetailPage from './pages/MyFolderDetailPage';
import MyRecipePage from './pages/MyRecipePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
         <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<LoginPage />} /> 
        <Route path="/detail/:id" element={<RecipePage />} />  
        <Route path="/level/:level" element={<LevelPage />} />   
        <Route path="/upload" element={<UploadRecipePage />} />    
        <Route path="/myRecipe" element={<MyRecipePage />} />      
        <Route path="/myFolder" element={<MyFolderPage />} />      
        <Route path="/folder/:userId/:folderName" element={<MyFolderDetailPage />} />

      </Routes>
    </Router>
  );
}

export default App;

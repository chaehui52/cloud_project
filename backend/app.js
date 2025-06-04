require('dotenv').config();

const express = require('express');
const cors = require('cors');

const recipesRoutes = require('./routes/recipesRoutes'); 
const userRoutes = require('./routes/userRoutes'); 
const myRoutes = require('./routes/myRoutes'); 

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/recipes', recipesRoutes);
app.use('/user', userRoutes);
app.use('/my', myRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});


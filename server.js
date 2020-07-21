// 1. create an express server for backend
const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connectDB
connectDB();

//Initialze Middleware
app.use(express.json({ extend: false }));

app.get('/', (req, res) => res.send('API Running'));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

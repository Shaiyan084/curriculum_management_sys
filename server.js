// 1. create an express server for backend
const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connectDB
connectDB();

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

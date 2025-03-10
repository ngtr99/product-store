//const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import router from './routes/products.route.js';
import path from 'path';

dotenv.config();
const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5001;
//allows us to accept json data in the body
app.use(express.json());
app.use('/api/products', router);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    }
    );
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port http://localhost:${PORT}`)
});



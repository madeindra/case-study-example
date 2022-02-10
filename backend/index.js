// inisiasi dotenv supaya bisa baca dari process.env.*
require('dotenv').config(); 

// import library
const express = require('express');
const cors = require('cors');

// import database & router
// jika file yg ingin diimport memiliki nama file index.js, alamat import tidak perlu ditulis lengkap
const database = require('./db');
const routes = require('./routes'); 

// menyambungkan ke database
database.connect();

// inisiasi express
const app = express();

// atur port
const port = process.env.APP_PORT || '3001';

// terapkan pembaca request body json
app.use(express.json());

// terapkan cors, hati-hati menggunakna cors di production
app.use(cors());

// terapkan router
app.use(routes);

// jalankan aplikasi
app.listen(port, () => {console.log(`app berjalan di port ${port}`)});
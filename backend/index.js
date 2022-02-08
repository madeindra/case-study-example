// import library
const dotenv = require('dotenv');
const express = require('express');

// import database & router
// jika file yg ingin diimport memiliki nama file index.js, alamat import tidak perlu ditulis lengkap
const database = require('./db');
const routes = require('./routes'); 

// inisiasi library
dotenv.config(); // inisiasi dotenv supaya bisa baca dari process.env.*
database.connect(); // menyambungkan ke database
const app = express();

// atur port
const port = process.env.APP_PORT || '3001';

// terapkan router
app.use(routes);

// jalankan aplikasi
app.listen(port, () => {console.log(`app berjalan di port ${port}`)});
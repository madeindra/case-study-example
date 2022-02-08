// import library
const dotenv = require('dotenv');
const express = require('express');

// import router
const routes = require('./routes'); // jika menggunakan nama file index.js, import tidak perlu ditulis lengkap './routes/index.js'

// inisiasi library
dotenv.config();
const app = express();

// atur port
const port = process.env.APP_PORT || '3001';

// terapkan router
app.use(routes);

// jalankan aplikasi
app.listen(port, () => {console.log(`app berjalan di port ${port}`)});
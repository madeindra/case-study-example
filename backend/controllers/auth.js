// import library
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// import database connection
const db = require('../db').getConnection();

// ambil dari konfigurasi env
const saltRount = process.env.APP_HASH_ROUND || 10;
const secret = process.env.APP_JWT_SECRET || 'secret';

// gunakan nama fungsi yang menjelaskan kegunaannya
const register = async (req, res) => {
  // ambil email & password dari body
  const { email, password } = req.body;

  // jika email atau password kosong
  if (!email || !password) {
    // berikan pesan error
    return res.status(400).json({
      message: 'Bad Request',
    })
  }

  // ambil data user dari table users yang memiliki email sama dengan input
  let dataResult 
  
  // gunakan try catch saat memanggil fungsi async
  try {
    dataResult = await db.query('SELECT email FROM users WHERE email = $1', [email]);
  } catch (err) {
    // jika gagal, berikan response gagal
    return res.status(500).json({
      message: 'Registration failed',
    });
  }
  
  // jika ada hasilnya, berarti email sudah terdaftar
  if (dataResult.rows.length > 0) {
    // berikan response gagal
    return res.status(409).json({
      message: 'Email already registered',
    });
  }

  // daftarkan user baru
  try {
    // buat hash password
    const encryptedPassword = await bcrypt.hash(password, saltRount);

    // tulis ke database
    await db.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, encryptedPassword]);
  } catch (err) {
    // jika gagal, berikan response gagal
    return res.status(500).json({
      message: 'Registration failed',
    });
  }

  // berikan response berhasil
  return res.status(201).json({
    message: 'Registration success',
  });
};

const login = async (req, res) => {
  // ambil email & password dari body
  const { email, password } = req.body;

  // jika email atau password kosong
  if (!email || !password) {
    // berikan pesan error
    return res.status(400).json({
      message: 'Bad Request',
    })
  }

  // ambil data user dari table users yang memiliki email sama dengan input
  let dataResult 
  
  // gunakan try catch saat memanggil fungsi async
  try {
    dataResult = await db.query('SELECT email, password FROM users WHERE email = $1', [email]);
  } catch (err) {
    // jika gagal, berikan response gagal
    return res.status(500).json({
      message: 'Login failed',
    });
  }

  // jika tidak ada hasilnya, berarti email belum terdaftar
  if (dataResult.rows.length === 0) {
    // berikan response gagal
    return res.status(409).json({
      message: 'Email not registered',
    });
  }

  // ambil data di index ke-0, karena hanya ada 1 data yg match (email bersifat unik)
  const userData = dataResult.rows[0];

  let isPasswordMatch;
  try {
    // cocokkan password
    isPasswordMatch = await bcrypt.compare(password, userData.password);
  } catch(err) {
    // jika gagal, berikan response gagal
    return res.status(500).json({
      message: 'Login failed',
    });
  }

  // jika password tidak sesuai
  if (!isPasswordMatch) {
    // berikan response gagal
    return res.status(401).json({
      message: 'Incorrect password',
    });
  }

  // bikin token untuk akses api lain
  let token;

  try {
    token = jwt.sign({ email }, secret);
  } catch (err) {
    // jika gagal, berikan response gagal
    return res.status(500).json({
      message: 'Login failed',
    });
  }

  // berikan response sukses
  return res.status(200).json({
    accessToken: token,
    message: 'Login Success',
  });

};

module.exports = {
  register,
  login,
};

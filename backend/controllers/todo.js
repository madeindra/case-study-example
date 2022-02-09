// import database connection
const db = require('../db').getConnection();

const getAllTodo = async (req, res) => {
  // ambil data dari database
  let dataResult;
  try {
    dataResult = await db.query('SELECT id, title, detail FROM todos');
  } catch (err) {
    // jika gagal, berikan response gagal
    return res.status(500).json({
      message: 'Operation failed',
    });
  }

  // get all tidak perlu pengecekan jika rows berisi atau tidak
  // hal ini mempermudah handling response di sisi frontend karena hasil data selalu berupa array
 
  // tampilkan hasil
  return res.status(200).json({
    data: dataResult.rows,
    message: 'OK',
  });
};

const createTodo = async (req, res) => {
  // ambil title dan detail dari body
  const { title, detail } = req.body;

  // tambahkan todo ke database, tidak perlu ada pengecekan jika tidak ada field yg bersifat unik di tabel
  let insertResult;
  try {
    insertResult = await db.query('INSERT INTO todos(title, detail) VALUES ($1, $2) RETURNING id', [title, detail]);
  } catch (err) {
    // jika gagal, berikan response gagal
    return res.status(500).json({
      message: 'Operation failed',
    });
  }

  // tampilkan hasil
  return res.status(201).json({
    data: {
      id: insertResult.rows[0].id,
      title,
      detail,
    },
    message: 'Created',
  });
};

const getSingleTodo = async (req, res) => {
  // ambil id dari parameter, bisa dilakukan karena ada :id di route
  const { id } = req.params;

  // ambil data dari database
  let dataResult;
  try {
    dataResult = await db.query('SELECT id, title, detail FROM todos WHERE id=$1', [id]);
  } catch (err) {
    // jika gagal, berikan response gagal
    return res.status(500).json({
      message: 'Operation failed',
    });
  }
 
  // get single harus mengecek jika data ada atau tidak
  // hal ini memungkinkan bentuk response yang konsisten dan mempermudah handling di sisi frontend

  // jika hasil kosong, berarti data tidak ada
  if (dataResult.rows.length === 0) {
    // berikan response tidak ditemukan
    return res.status(404).json({
      message: 'Todo does not exist',
    });
  }

  // tampilkan hasil
  return res.status(200).json({
    data: dataResult.rows[0],
    message: 'OK',
  });
};

const updateTodo = async (req, res) => {
  // ambil id dari parameter, bisa dilakukan karena ada :id di route
  const { id } = req.params;

  // ambil title dan detail dari body
  const { title, detail } = req.body;

  // ambil data dari database
  let dataResult;
  try {
    dataResult = await db.query('SELECT id, title, detail FROM todos WHERE id=$1', [id]);
  } catch (err) {
    // jika gagal, berikan response gagal
    return res.status(500).json({
      message: 'Operation failed',
    });
  }
 
  // jika hasil kosong, berarti data tidak ada
  if (dataResult.rows.length === 0) {
    // berikan response tidak ditemukan
    return res.status(404).json({
      message: 'Todo does not exist',
    });
  }

  try {
    // lakukan update pada data tersebut
    await db.query('UPDATE todos SET title=$1, detail=$2 WHERE id=$3', [title, detail, id]);
  } catch (err) {
    // jika gagal, berikan response gagal
    return res.status(500).json({
      message: 'Operation failed',
    });
  }

  // jika tidak ada data/pesan yang perlu dikirim ke frontend, cukup gunakan kode 204 tanpa response body
  return res.status(204).json();
};

const deleteTodo = async (req, res) => {
   // ambil id dari parameter, bisa dilakukan karena ada :id di route
   const { id } = req.params;

   // hapus data dari database
   try {
     await db.query('DELETE FROM todos WHERE id=$1', [id]);
   } catch (err) {
     // jika gagal, berikan response gagal
     return res.status(500).json({
       message: 'Operation failed',
     });
   }

  // jika tidak ada data/pesan yang perlu dikirim ke frontend, cukup gunakan kode 204 tanpa response body
  return res.status(204).json();
};

module.exports = {
  getAllTodo,
  getSingleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};

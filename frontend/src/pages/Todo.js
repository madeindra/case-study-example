// import library
import React, { useState, useEffect } from 'react';

// import fungsi buatan untuk kirim request
import { sendRequest } from '../utils/fetch';

// ambil alamat api dari environment variable
const baseUrl = process.env.REACT_APP_API_URL;
const token = sessionStorage.getItem('token');

// halaman todo
function Todo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');

  // kirim form todo
  async function handleAddTodo(e) {
    // jangan refresh halaman ketika form disubmit
    e.preventDefault();
  
    // bikin request body
    const data = {
      title,
      detail,
    }
  
    // kirim request
    try {
      await sendRequest(`${baseUrl}/api/todos`, 'post', data, token);
    } catch (err) {
      // jika gagal, tampilkan alert
      window.alert(err.toString());
    }
  }

  // panggil api ketika halaman dimuat
  useEffect(() => {
    // karena useEffect tidak bisa async, gunakan bentuk then/catch untuk kirim request
    sendRequest(`${baseUrl}/api/todos`, 'get', {}, token)
      .then((res) => setTodos(res.data.data)) // bukan typo, jika field response bernama data, cara aksesnya memang res.data.data
      .catch((err) => window.alert(err.toString()));
  }, [])

  return (
    <div>
      <p>Todo</p>


      <header>Tambah Todo</header>
      <form onSubmit={handleAddTodo}>
        <input type='text' name='title' onChange={(e) => setTitle(e.target.value)} />
        <input type='textarea' name='detail' onChange={(e) => setDetail(e.target.value)} />

        <button type='submit'>
          Tambah
        </button>
      </form>

      { todos  ? todos.toString() : '' }
    </div>
  );
}

export default Todo;
// import library
import React, { useState } from 'react';

// import fungsi buatan untuk kirim request
import { sendRequest } from '../utils/fetch';

// ambil alamat api dari environment variable
const baseUrl = process.env.REACT_APP_API_URL;
const token = sessionStorage.getItem('token');

// halaman todo
function View() {
  // buat state untuk menyimpan isi dari input
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
      const result = await sendRequest(`${baseUrl}/api/todos`, 'post', data, token);
      
      // jika tambah berhasil
      if (result.data) {
        window.alert(result.data.message);
      }
    } catch (err) {
      // jika gagal, tampilkan pesan error dari response api
      window.alert(err.response.data.message);
    }
  }

  return (
    <div>
      <header>Tambah Todo</header>
      <form onSubmit={handleAddTodo}>
        <input type='text' name='title' onChange={(e) => setTitle(e.target.value)} />
        <br />
        <input type='text' name='detail' onChange={(e) => setDetail(e.target.value)} />
        <br />
        <button type='submit'>
          Tambah
        </button>
      </form>
    </div>
  );
}

export default View;
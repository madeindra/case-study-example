// import library
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

  // gunakan useParams bawaan react-router untuk membaca parameter dari url
  const params = useParams();

  // panggil api ketika halaman dimuat
  useEffect(() => {
    // karena useEffect tidak bisa async, gunakan bentuk then/catch untuk kirim request
    sendRequest(`${baseUrl}/api/todos/${params.id}`, 'get', {}, token)
      .then((res) => {
        setTitle(res.data.title);
        setDetail(res.data.detail);
      })
      .catch((err) => window.alert(err.toString()));
  }, [params.id]); // isi array ini berarti useEffect akan berjalan setiap kali nilai params.id berubah

  // kirim form todo
  async function handleUpdateTodo(e) {
    // jangan refresh halaman ketika form disubmit
    e.preventDefault();
  
    // bikin request body
    const data = {
      title,
      detail,
    }
  
    // kirim request
    try {
      const result = await sendRequest(`${baseUrl}/api/todos/${params.id}`, 'put', data, token);
      
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
      <header>Update Todo</header>
      <form onSubmit={handleUpdateTodo}>
        <input type='text' name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />
        <input type='text' name='detail' value={detail} onChange={(e) => setDetail(e.target.value)} />
        <br />
        <button type='submit'>
          Update
        </button>
      </form>
    </div>
  );
}

export default View;
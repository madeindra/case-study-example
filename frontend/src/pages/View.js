// import library
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import fungsi buatan untuk kirim request
import { sendRequest } from '../utils/fetch';

// ambil alamat api dari environment variable
const baseUrl = process.env.REACT_APP_API_URL;
const token = sessionStorage.getItem('token');

// halaman todo
function View() {
  // buat state untuk menyimpan daftar todo
  const [todos, setTodos] = useState([{}]);

  // gunakan useNavigate bawaan react-router untuk menavigasikan user
  const navigate = useNavigate();

  // panggil api ketika halaman dimuat
  useEffect(() => {
    // karena useEffect tidak bisa async, gunakan bentuk then/catch untuk kirim request
    sendRequest(`${baseUrl}/api/todos`, 'get', {}, token)
      .then((res) => {setTodos(res.data.data)}) // bukan typo, jika field response bernama data, cara aksesnya memang res.data.data
      .catch((err) => window.alert(err.toString()));
  }, []); // array kosong ini berarti useEffect hanya akan dijalankan 1 kali

  async function handleUpdate(id) {
    // alihkan user ke halaman update
    // karena alamat saat ini berada di 'todo' (cek index.js), cukup tulis 'update' tanpa diawali 'todo', maka akan otomatis dialihkan ke 'todo/update' (gabungan alamat sekarang + alamat navigasi)
    return navigate(`update/${id}`);
  }

  async function handleDelete(id) {
    // kirim request
    try {
      const result = await sendRequest(`${baseUrl}/api/todos/${id}`, 'delete', {}, token);
      
      // jika hapus berhasil
      if (result) {
        // jika API tidak memberikan response, kita bisa memberikan message sendiri
        window.alert('Todo berhasil dihapus');
      }
    } catch (err) {
      // jika gagal, tampilkan pesan error dari response api
      window.alert(err.response.data.message);
    }
  }

  return (
    <div>
      <p>Semua Todo</p>

      <table>
      <thead>
        <tr>
          <th>
            ID
          </th>
          
          <th>
            Title
          </th>

          <th>
            Description
          </th>

          <th>
            Update
          </th>

          <th>
            Delete
          </th>
        </tr>
      </thead>
      
      <tbody>
        { todos.map((element, index) => {
          return (
            <tr key={index}>
              <td>
                { element.id }
              </td>
              <td>
                { element.title }
              </td>
              <td>
                { element.detail }
              </td>
              <td>
                { element.id ? <p onClick={() => handleUpdate(element.id)}>Update</p> : '' }
              </td>
              <td>
              { element.id ? <p onClick={() => handleDelete(element.id)}>Delete</p> : '' }
              </td>
            </tr>
          );
        }) }
      </tbody>

    </table>
    </div>
  );
}

export default View;
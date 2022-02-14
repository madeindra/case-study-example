// import library
import React, { useState } from 'react';

// import fungsi buatan untuk kirim request
import { sendRequest } from '../utils/fetch';

// ambil alamat api dari environment variable
const baseUrl = process.env.REACT_APP_API_URL;

// halaman login
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // kirim form login
  async function handleLogin(e) {
    // jangan refresh halaman ketika form disubmit
    e.preventDefault();
  
    // bikin request body
    const data = {
      email,
      password,
    }
  
    // kirim request
    try {
      const result = await sendRequest(`${baseUrl}/api/login`, 'post', data);
      
      // jika login berhasil
      if (result.data) {
        sessionStorage.setItem('token', result.data.accessToken)
        window.alert(result.data.message);
      }
    } catch (err) {
      // jika gagal, tampilkan pesan error dari response api
      window.alert(err.response.data.message);
    }
  }

  return (
    <div>
      <p>Login</p>


      <form onSubmit={handleLogin}>
        <input type='text' name='email' onChange={(e) => setEmail(e.target.value)} />
        <br />
        <input type='password' name='password' onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type='submit'>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
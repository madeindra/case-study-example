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
      await sendRequest(`${baseUrl}/api/login`, 'post', data);
    } catch (err) {
      // jika gagal, tampilkan alert
      window.alert(err.toString());
    }
  }

  return (
    <div>
      <p>Login</p>


      <form onSubmit={handleLogin}>
        <input type='text' name='email' onChange={(e) => setEmail(e.target.value)} />
        <input type='password' name='password' onChange={(e) => setPassword(e.target.value)} />

        <button type='submit'>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
        <p>
          Silahkan kunjungi link berikut:
          <ul>
            <li>
              <Link to='register'>Register</Link>
            </li>
            <li>
              <Link to='login'>Login</Link>
            </li>
            <li>
              <Link to='todo'>Lihat Todo</Link>
            </li>
            <li>
              <Link to='todo/create'>Tambah Todo</Link>
            </li>
          </ul>
        </p>
    </div>
  );
}

export default App;

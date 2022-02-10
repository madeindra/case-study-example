import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
 } from "react-router-dom";

import App from './App';

import Register from './pages/Register';
import Login from './pages/Login';
import Todo from './pages/Todo';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='register' element={<Register />} />
      <Route path='login' element={<Login />} />
      <Route path='todo' element={<Todo />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

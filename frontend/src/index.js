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
import View from './pages/View';
import Create from './pages/Create';
import Update from './pages/Update';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='register' element={<Register />} />
      <Route path='login' element={<Login />} />
      
      <Route path='todo' element={<View />} />
      <Route path='todo/create' element={<Create />} />
      <Route path='todo/update/:id' element={<Update />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

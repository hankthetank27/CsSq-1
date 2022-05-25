import React from "react";
import { render } from "react-dom";
import { HashRouter, BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App.jsx';
import Login from './components/pages/login.jsx'
import Register from "./components/pages/register.jsx";

render(
  <HashRouter>
    <Routes>
      <Route exact path='/' element={<App/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/register' element={<Register/>}/>
    </Routes>
  </HashRouter>,
  document.getElementById('root'),
);
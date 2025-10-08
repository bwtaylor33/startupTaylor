import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';
import { Browse } from './browse/browse';
import { Register } from './register/register';
import { AddBook } from './addbook/addbook';

export default function App() {
    return (
        <BrowserRouter>
            <div className="body bg-dark text-light">
                <header className="container-fluid">
                <nav className="navbar fixed-top navbar-dark">
                    <div className="navbar-brand">
                        <a href="index.html"> <img src="logoName.png" height= "70px"/> </a>
                    </div>
                    <menu className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/'>
                        Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to='register'>
                        Register
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to='browse'>
                        Browse
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to='addbook'>
                        Add Book
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/'>
                        Login
                        </NavLink>
                    </li>
                    </menu>
                </nav>
                </header>
        
                <Routes>
                    <Route path='/' element={<Login />} exact />
                    <Route path='/register' element={<Register />} />
                    <Route path='/scores' element={<Scores />} />
                    <Route path='/about' element={<About />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer className="bg-dark text-white-50">
                <div className="container-fluid">
                    <span className="text-reset">Author Name(s)</span>
                    <a className="text-reset" href="https://github.com/webprogramming260/simon-react">
                    Source
                    </a>
                </div>
                </footer>
            </div>
        </BrowserRouter>
    );

    function NotFound() {
        return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
      }
  }
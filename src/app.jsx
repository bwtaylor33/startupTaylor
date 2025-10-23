import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';
import { Browse } from './browse/browse';
import { Register } from './register/register';
import { AddBook } from './addbook/addbook';
import { Logout } from './logout/logout';
import { AuthState } from './login/authState';

export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    return (
        <BrowserRouter>
            <div className="body bg-dark text-dark">
                <header className="container-fluid">
                    <nav className="navbar navbar-dark">
                        <div className="navbar-brand">
                            {authState === AuthState.Authenticated && (
                                <NavLink to="home"> <img src="logoName.png" height= "70px"/> </NavLink>
                            )}
                            {authState === AuthState.Unauthenticated && (
                                <NavLink to="login"> <img src="logoName.png" height= "70px"/> </NavLink>
                            )}
                        </div>
                        <menu className="navbar-nav">
                            {authState === AuthState.Authenticated && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='home'>
                                    Home
                                    </NavLink>
                                </li>
                            )}
                            {authState === AuthState.Unauthenticated && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='login'>
                                    Login
                                    </NavLink>
                                </li>
                            )}
                            {authState === AuthState.Unauthenticated && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='register'>
                                    Register
                                    </NavLink>
                                </li>
                            )}
                            <li className="nav-item">
                                <NavLink className="nav-link" to='browse'>
                                Browse
                                </NavLink>
                            </li>
                            {authState === AuthState.Authenticated && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='addbook'>
                                    Add Book
                                    </NavLink>
                                </li>
                            )}
                            {authState === AuthState.Authenticated && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='logout'>
                                    Logout
                                    </NavLink>
                                </li>
                            )}
                        </menu>
                    </nav>
                </header>
        
                <Routes>
                    {/* <Route path='/' element={<Login />} exact /> */}
                    <Route
                        path='/'
                        element={
                        <Login
                            userName={userName}
                            authState={authState}
                            onAuthChange={(userName, authState) => {
                            setAuthState(authState);
                            setUserName(userName);
                            }}
                        />
                        }
                        exact
                    />
                    <Route path='/home' element={<Home userName={userName} />} exact />
                    {/* <Route path='/login' element={<Login />} exact /> */}
                    <Route
                        path='/login'
                        element={
                        <Login
                            userName={userName}
                            authState={authState}
                            onAuthChange={(userName, authState) => {
                            setAuthState(authState);
                            setUserName(userName);
                            }}
                        />
                        }
                        exact
                    />
                    <Route path='/register' element={<Register />} />
                    <Route path='/browse' element={<Browse />} />
                    <Route path='/addbook' element={<AddBook />} />
                    <Route
                        path="/logout"
                        element={
                            <Logout
                                onLogout={() => {
                                    setAuthState(AuthState.Unauthenticated);
                                    setUserName("");
                                }}
                            />
                        }
                        />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer className="footer bg-dark text-white-50 fixed-bottom">
                    <div className="container-fluid">
                        <span className="text-reset">Bryce Taylor: </span>
                        <a className="text-reset" href="https://github.com/bwtaylor33/startupTaylor">GitHub</a>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    );

    function NotFound() {
        return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
      }
  }
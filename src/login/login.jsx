import React from 'react';
import './login.css'

export function Login() {
  return (
    <main className="bg-light">
      <h1>Login</h1>
      <form method="get">
        <div className="login form-group">
          <label>Email</label>
          <input className="form-control" type="text" placeholder="your@email.com" />
        </div>
        <div className="login form-group">
          <label>Password</label>
          <input className="form-control" type="password" placeholder="password" />
        </div>
        <div className="loginbutton">
            <button className="btn btn-primary" type="button">Login</button>
            <button className="btn btn-secondary" type="button">Create</button>
        </div>
      </form>
    </main>
  );
}
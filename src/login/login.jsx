import React from 'react';
// import './login.css'

export function Login() {
  return (
    <main className="container-fluid bg-light vh-100">
      <h1>Login</h1>
      <form method="get">
        <div className="form-group">
          <label>Email</label>
          <input className="form-control" type="text" placeholder="your@email.com" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input className="form-control" type="password" placeholder="password" />
        </div>
        <button className="btn btn-primary" type="submit">Login</button>
        <button className="btn btn-secondary" type="submit">Create</button>
      </form>
    </main>
  );
}
import React from 'react';
// import './register.css'

export function Register() {
  return (
    <main className="container-fluid bg-light vh-100">
      <h1>Register</h1>
      <form method="get" action="login.html">
        <div className="form-group">
          <label>First Name: </label>
          <input className="form-control" type="text" placeholder="insert first name" />
        </div>
        <div className="form-group">
            <span>Last Name: </span>
            <input className="form-control" type="text" placeholder="insert last name" />
        </div>
        <div className="form-group">
          <span>Email Address: </span>
          <input className="form-control" type="text" placeholder="your@email.com" />
        </div>
        <div className="form-group">
          <span>Create Password: </span>
          <input className="form-control" type="password" placeholder="password" />
        </div>
        <div className="form-group">
            <span>Confirm Password: </span>
            <input className="form-control" type="password" placeholder="password" />
        </div>
        <div>
          <button className="btn btn-primary" type="submit">Register</button>
        </div>
      </form>
    </main>
  );
}
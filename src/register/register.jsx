import React from 'react';
import './register.css'

export function Register() {
  return (
    <main className="bg-light">
      <h1>Register</h1>
      <form method="get" action="login.html">
        <div className="register form-group">
            <label>First Name: </label>
            <input className="form-control" type="text" placeholder="insert first name" />
        </div>
        <div className="register form-group">
            <span>Last Name: </span>
            <input className="form-control" type="text" placeholder="insert last name" />
        </div>
        <div className="register form-group">
            <span>Email Address: </span>
            <input className="form-control" type="text" placeholder="your@email.com" />
        </div>
        <div className="register form-group">
            <span>Create Password: </span>
            <input className="form-control" type="password" placeholder="password" />
        </div>
        <div className="register form-group">
            <span>Confirm Password: </span>
            <input className="form-control" type="password" placeholder="password" />
        </div>
        <div className="registerbutton">
            <button className="btn btn-primary" type="button">Register</button>
        </div>
      </form>
    </main>
  );
}
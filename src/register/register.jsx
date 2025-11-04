import React from 'react';
import {useNavigate} from 'react-router-dom';
import './register.css';
import {AuthState} from '../login/authState.js';
import { MessageDialog } from './messageDialog';

export function Register({ onAuthChange }) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordMatch, setPasswordMatch] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function handleRegister() {
    const response = await fetch(`/api/auth/create`, {
      method: 'post',
      body: JSON.stringify({ email: userName, firstName: firstName, lastName: lastName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', email);
      onAuthChange(email, AuthState.Authenticated);

      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setPasswordMatch('');
      navigate('/home');
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <main className="bg-light">
      <h1>Register</h1>
      <form className="form-container">
        <div className="register form-group">
            <label>First Name: </label>
            <input className="form-control" type="text" placeholder="insert first name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        </div>
        <div className="register form-group">
            <span>Last Name: </span>
            <input className="form-control" type="text" placeholder="insert last name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        </div>
        <div className="register form-group">
            <span>Email Address: </span>
            <input className="form-control" type="text" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="register form-group">
            <span>Create Password: </span>
            <input className="form-control" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="register form-group">
            <span>Confirm Password: </span>
            <input className="form-control" type="password" placeholder="password" value={passwordMatch} onChange={(e) => setPasswordMatch(e.target.value)}/>
        </div>
        <div className="error-message">
          <p>{password !== passwordMatch ? "Passwords do not match." : ''}</p>
        </div>
        <div className="registerbutton">
            <button className="btn btn-primary" type="button" onClick={handleRegister} 
            disabled={password !== passwordMatch ||
                      firstName === '' ||
                      lastName === '' ||
                      email === '' ||
                      password === ''}>Register</button>
        </div>
      </form>
      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </main>
  );
}
import React from 'react';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

function logout() {
  localStorage.removeItem('userName');
  props.onLogout();
}

export function Login({ userName, authState, onAuthChange }) {
  return (
    <main className='container-fluid bg-light text-center'>
      <div>
        {authState !== AuthState.Unknown && <h1>Login</h1>}
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    </main>
  );
}

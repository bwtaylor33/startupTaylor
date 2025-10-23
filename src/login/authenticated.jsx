import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

export function Authenticated(props) {
  const navigate = useNavigate();

  return (
    <div>
      <div>Currently logged in as {props.userName}</div>
      <Button variant='primary' onClick={() => navigate('/home')}>
        Home
      </Button>
    </div>
  );
}
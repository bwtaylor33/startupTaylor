import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

export function Logout(props) {
    const navigate = useNavigate();
  
    useEffect(() => {
        localStorage.removeItem('userName');
        props.onLogout();
        navigate("/login", { replace: true });
    }, [navigate]);
  
    return null;
}
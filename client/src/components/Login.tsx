// Login.tsx

// This module defines the Login component which handles user authentication.
// It uses the useState hook to manage local state and the useNavigate hook
// for redirecting the user after successful login.

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

/**
 * Login is a functional component that renders the login form and handles
 * the login process using an HTTP POST request. If the login is successful,
 * it stores the received auth token in sessionStorage and redirects the user
 * to the homepage.
 *
 * @returns The rendered Login component.
 */
const Login: React.FC = () => {
    // Local state for managing the form input and error message
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Get navigate function from useNavigate hook
    const navigate = useNavigate();

    /**
     * This async function handles the login process. It sends a POST request
     * with the password as the payload. If successful, it stores the received
     * auth token in sessionStorage and navigates to the homepage. Otherwise,
     * it sets an error message.
     */
    const login = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_AJAX_HOST}/login`, { password });
            if (res.data.token) {
                sessionStorage.setItem('token', res.data.token);
                navigate('/');
            } else {
                setError('Invalid password');
            }
        } catch (err) {
            console.error(err);
            setError('Invalid password');
        }
    };

    return (
        <div>
            <h1 id="login-title">Login</h1>
            <div className="login">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button onClick={login}>Login</button>
                {error && <span className="error">{error}</span>}
            </div>
        </div>
    );
};

export default Login;

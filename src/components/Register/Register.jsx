import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import {useNavigate} from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Отправка данных на бэкенд
            const response = await axios.post('http://localhost:8080/api/v1/register', {
                username: login,
                password: password,
            });

            // Обработка успешного ответа
            setSuccess('Registration successful! You can now log in.');
            setError(''); // Очистка сообщения об ошибке
            navigate('/checker');
        } catch (error) {
            console.error('Registration failed:', error);
            setError('Registration failed. Please try again.');
            setSuccess(''); // Очистка сообщения об успехе
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="login">Login:</label>
                    <input
                        type="text"
                        id="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <button type="submit">Register</button>
                <button onClick={() => navigate('/login')} type="submit" className="go_to_login">Go to Login</button>
            </form>
        </div>
    );
}

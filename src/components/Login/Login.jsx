import React, {useState} from 'react';
import axios from 'axios';
import './Login.css';
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Отправка данных на бэкенд
            const response = await axios.post('http://localhost:8080/api/v1/login', {
                username: login,
                password: password,
            });

            // Извлечение токенов из ответа
            const {accessToken, refreshToken} = response.data;

            // Сохранение токенов в localStorage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            //отправка токенов в микросервис эндпоинтов
             await axios.post('http://localhost:8082/api/endpoints/setJwt',
                 {
                     token: accessToken
                 });

            navigate('/checker');
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
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
                <button type="submit">Login</button>
                <button onClick={() => navigate('/register')} type="submit" className="go_to_register">Go to Register
                </button>
            </form>
        </div>
    );
}

export default Login;

import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const isTokenExpired = (token) => {
    if (!token) return true;
    try {
        const decodedToken = jwtDecode(token);
        return decodedToken.exp * 1000 < Date.now(); // Проверка на истекший срок
    } catch (e) {
        console.error('Invalid token:', e);
        return true;
    }
};

export const checkAndRefreshTokens = async (navigate) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (isTokenExpired(accessToken)) {
        if (refreshToken) {
            try {
                // Запрос на обновление токенов
                const response = await axios.post('http://localhost:8080/api/v1/refreshToken', {token: refreshToken});
                const {accessToken: newAccessToken, refreshToken: newRefreshToken} = response.data;

                // Сохранение токенов в localStorage
                localStorage.setItem('accessToken', newAccessToken);
                localStorage.setItem('refreshToken', newRefreshToken);

                //отправка токенов в микросервис эндпоинтов
                await axios.post('http://localhost:8082/api/endpoints/setJwt',
                    {
                        token: newAccessToken
                    });

                // Перенаправление на Checker
                navigate('/checker');
            } catch (error) {
                console.error('Failed to refresh tokens:', error);
                // При ошибке перенаправьте пользователя на страницу входа или другую страницу
                navigate('/login');
            }
        } else {
            // Если refreshToken отсутствует, перенаправляем на страницу входа
            navigate('/login');
        }
    } else {
        // Если токен еще действителен
        navigate('/checker');
    }
};

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checker.css';

// Импортируем функцию проверки и обновления токенов
import { checkAndRefreshTokens } from '../Auth/Auth';
import axios from 'axios';

// Компонент для отображения статуса здоровья сервисов
const ServiceHealthStatus = ({ endpoints }) => {
    return (
        <div className="block">
            <h2>Список эндпоинтов</h2>
            <div className="row">
                {endpoints.map((el, index) => (
                    <a href={`http://localhost:8080/api/endpoints/checkByUrl?url=${el.url}`} key={index}>
                        <div className="card">
                            <div className="url"><span>{el.url}</span></div>
                            <div className="time"><span className="head_time">Время: </span><span>{el.time}</span></div>
                            <div className="list_services">
                                {el.services.map((service, idx) => (
                                    <div className="info" key={idx}>
                                        {service.status === "active" && <div className="green"></div>}
                                        {service.status === "inactive" && <div className="red"></div>}
                                        {service.status === "no connection" && <div className="black"></div>}
                                        <div className="endpoint_info"><span>{service.name}</span></div>
                                        <div className="status"><span>{service.status}</span></div>
                                    </div>
                                ))}
                                {el.services.map((service, idx) => (
                                    service.crud_status && (
                                        <div className="user_may" key={idx}>
                                            {service.crud_status.create && (
                                                <div className="crud_status">
                                                    <span className="crud_status_left">CREATE: доступно </span>
                                                </div>
                                            )}
                                            {service.crud_status.read && (
                                                <div className="crud_status">
                                                    <span className="crud_status_left">READ: доступно </span>
                                                </div>
                                            )}
                                            {service.crud_status.update && (
                                                <div className="crud_status">
                                                    <span className="crud_status_left">UPDATE: доступно </span>
                                                </div>
                                            )}
                                            {service.crud_status.delete && (
                                                <div className="crud_status">
                                                    <span className="crud_status_left">DELETE: доступно </span>
                                                </div>
                                            )}
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

// Главный компонент Checker
export default function Checker() {
    const navigate = useNavigate();
    const [endpoints, setEndpoints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check and refresh tokens on component mount
        checkAndRefreshTokens(navigate);

        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8082/api/endpoints/check');
                console.log("RESPONSE data: " + response.data);
                setEndpoints(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <ServiceHealthStatus endpoints={endpoints} />
        </div>
    );
}

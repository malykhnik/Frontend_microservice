import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './Checker.css';

// Импортируем функцию проверки и обновления токенов
import {checkAndRefreshTokens} from '../Auth/Auth';
import axios from 'axios';
import Modal from "../Modal/Modal.jsx";

// Компонент для отображения статуса здоровья сервисов
const ServiceHealthStatus = ({ endpoints, onClickCard }) => {
    return (
        <div className="block">
            <h2>Мониторинг сервисов</h2>
            <div className="row">
                {endpoints.map((el, index) => (
                    <div className="card" key={index} onClick={() => onClickCard(el.url)}>
                        <div className="url"><span>{el.url}</span></div>
                        <div className="time"><span className="head_time">Время: </span><span>{el.time}</span></div>
                        <div className="list_services">
                            {
                                el.services.map((service, idx) => (
                                        <div className="info" key={idx}>
                                            {service.status === "active" && <div className="green"></div>}
                                            {service.status === "inactive" && <div className="red"></div>}
                                            {service.status === "no connection" && <div className="black"></div>}
                                            <div className="endpoint_info"><span>{service.name}</span></div>
                                            <div className="status"><span>{service.status}</span></div>
                                        </div>
                                    )
                                )
                            }
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
    const [modalData, setModalData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUrl, setSelectedUrl] = useState("");

    useEffect(() => {
        checkAndRefreshTokens(navigate);
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8082/api/endpoints/check');
                setEndpoints(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleCardClick = async (url) => {
        try {
            const res = await axios.get(`http://localhost:8082/api/endpoints/getEndpointInfo?url=${url}`);
            console.log(res.data);
            setModalData(res.data);
            setSelectedUrl(url);
            setIsModalOpen(true);
        } catch (e) {
            console.error("Ошибка при получении информации:", e);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalData(null);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <ServiceHealthStatus endpoints={endpoints} onClickCard={handleCardClick} />
            <Modal isOpen={isModalOpen} onClose={closeModal} data={modalData || {}} url={selectedUrl} />
        </div>
    );
}
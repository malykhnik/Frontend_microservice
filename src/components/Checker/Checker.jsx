import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checker.css';

// Импортируем функцию проверки и обновления токенов
import { checkAndRefreshTokens } from '../Auth/Auth';

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

    useEffect(() => {
        checkAndRefreshTokens(navigate);
    }, [navigate]);

// Данные эндпоинтов для отображения
    const endpointsData = [
        {
            url: 'http://example.com',
            time: '12:34:56',
            services: [
                { name: 'Сервис A', status: 'active', crud_status: { create: true, read: true, update: true, delete: false } },
                { name: 'Сервис B', status: 'inactive', crud_status: null },
            ]
        },
        {
            url: 'http://api.service1.com',
            time: '08:22:14',
            services: [
                { name: 'Сервис C', status: 'active', crud_status: { create: true, read: false, update: true, delete: true } },
                { name: 'Сервис D', status: 'no connection', crud_status: null },
            ]
        },
        {
            url: 'http://healthcheck.service2.net',
            time: '14:10:32',
            services: [
                { name: 'Сервис E', status: 'inactive', crud_status: { create: false, read: false, update: false, delete: false } },
                { name: 'Сервис F', status: 'active', crud_status: { create: true, read: true, update: false, delete: false } },
            ]
        },
        {
            url: 'http://monitor.service3.org',
            time: '16:45:00',
            services: [
                { name: 'Сервис G', status: 'active', crud_status: { create: true, read: true, update: true, delete: true } },
                { name: 'Сервис H', status: 'inactive', crud_status: null },
            ]
        },
        {
            url: 'http://status.service4.io',
            time: '19:22:11',
            services: [
                { name: 'Сервис I', status: 'no connection', crud_status: null },
                { name: 'Сервис J', status: 'active', crud_status: { create: false, read: true, update: true, delete: true } },
            ]
        },
        {
            url: 'http://check.service5.com',
            time: '06:12:34',
            services: [
                { name: 'Сервис K', status: 'active', crud_status: { create: true, read: false, update: true, delete: false } },
                { name: 'Сервис L', status: 'inactive', crud_status: null },
            ]
        },
        {
            url: 'http://api.service6.com',
            time: '09:30:12',
            services: [
                { name: 'Сервис M', status: 'active', crud_status: { create: false, read: true, update: true, delete: false } },
                { name: 'Сервис N', status: 'inactive', crud_status: { create: false, read: true, update: false, delete: true } },
            ]
        },
        {
            url: 'http://status.service7.com',
            time: '11:45:21',
            services: [
                { name: 'Сервис O', status: 'no connection', crud_status: null },
                { name: 'Сервис P', status: 'active', crud_status: { create: true, read: true, update: false, delete: false } },
            ]
        },
        {
            url: 'http://check.service8.com',
            time: '13:55:43',
            services: [
                { name: 'Сервис Q', status: 'active', crud_status: { create: true, read: false, update: true, delete: false } },
                { name: 'Сервис R', status: 'inactive', crud_status: null },
            ]
        },
        {
            url: 'http://monitor.service9.net',
            time: '17:05:16',
            services: [
                { name: 'Сервис S', status: 'active', crud_status: { create: false, read: true, update: false, delete: true } },
                { name: 'Сервис T', status: 'no connection', crud_status: null },
            ]
        }
    ];

    return (
        <div>
            <ServiceHealthStatus endpoints={endpointsData} />
        </div>
    );
}

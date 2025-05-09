import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IncidentModal.css';

export default function IncidentsModal({ isOpen, onClose }) {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({
        name: '',
        status: '',
        dateFrom: '',
        dateTo: ''
    });

    const fetchIncidents = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8082/api/endpoints/getIncidents', {
                params: {
                    page,
                    size: 5,
                    ...filters
                }
            });
            setIncidents(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Ошибка при загрузке инцидентов:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchIncidents();
        }
    }, [isOpen, page]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearch = () => {
        setPage(0);
        fetchIncidents();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="close-button"></button>
                <h2>Инциденты</h2>

                <div className="filters">
                    <input name="name" placeholder="Имя" value={filters.name} onChange={handleChange} />
                    <select name="status" value={filters.status} onChange={handleChange}>
                        <option value="">Статус</option>
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                    </select>
                    <input name="dateFrom" type="datetime-local" value={filters.dateFrom} onChange={handleChange} />
                    <input name="dateTo" type="datetime-local" value={filters.dateTo} onChange={handleChange} />
                    <button onClick={handleSearch}>Поиск</button>
                </div>

                {loading ? (
                    <div>Загрузка...</div>
                ) : (
                    <>
                        <table>
                            <thead>
                            <tr>
                                <th>Имя</th>
                                <th>Начало</th>
                                <th>Конец</th>
                                <th>Минут</th>
                            </tr>
                            </thead>
                            <tbody>
                            {incidents.map((incident, idx) => (
                                <tr key={idx}>
                                    <td>{incident.name}</td>
                                    <td>{incident.downTime}</td>
                                    <td>{incident.upTime}</td>
                                    <td>{incident.summaryDownTime}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <div className="pagination">
                            <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>
                                Назад
                            </button>
                            <span>Страница {page + 1} из {totalPages}</span>
                            <button onClick={() => setPage((p) => p + 1)} disabled={page + 1 >= totalPages}>
                                Вперёд
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
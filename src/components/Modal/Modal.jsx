import { useState } from "react";
import { Settings } from "lucide-react"; // иконка-шестерёнка
import axios from "axios";
import "./Modal.css";

const Modal = ({ isOpen, onClose, data, url }) => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        url: null,
        period: null,
        name: null,
        description: null,
        grafanaLink: null
    });

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            await axios.post(`http://localhost:8082/api/endpoints/updateEndpointInfo?url=${url}`, {
                ...formData
            });
            alert("Данные успешно отправлены");
            setShowForm(false);
        } catch (error) {
            console.error("Ошибка при отправке:", error);
            alert("Ошибка при отправке данных");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="header">
                    <h3>{data.name}</h3>
                    <button className="close-button" onClick={onClose}></button>
                </div>

                {!showForm ? (
                    <>
                        <p>{data.description}</p>
                        <a href={data.grafanaLink} target="_blank" rel="noopener noreferrer">
                            Перейти в Grafana
                        </a>
                    </>
                ) : (
                    <div>
                        <h4>Обновить данные сервиса</h4>
                        <input
                            name="url"
                            value={formData.url}
                            onChange={handleInputChange}
                            placeholder="URL. Заполните, если необходимо"
                        />
                        <input
                            name="period"
                            value={formData.period}
                            onChange={handleInputChange}
                            placeholder="Период опроса. Заполните, если необходимо"
                        />
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Название сервиса. Заполните, если необходимо"
                        />
                        <input
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Описание сервиса. Заполните, если необходимо"
                        />
                        <input
                            name="grafanaLink"
                            value={formData.grafanaLink}
                            onChange={handleInputChange}
                            placeholder="Ссылка на Grafana. Заполните, если необходимо"
                        />
                        <button onClick={handleSubmit} className="update-button">Обновить данные сервиса</button>
                        <button onClick={() => setShowForm(false)}>Назад</button>
                    </div>
                )}

                {!showForm && (
                    <button className="settings-button" onClick={() => setShowForm(true)} title="Настройки">
                        <Settings size={20} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Modal;

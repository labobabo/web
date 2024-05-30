import React, { useState, useEffect } from "react";
import { $authHost } from "../http/index";
import moment from "moment";
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import "../styles/userReceptions.css";

const DoctorReceptions = () => {
    const [receptions, setReceptions] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedReception, setSelectedReception] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: '', variant: '' });

    useEffect(() => {
        const fetchReceptions = async () => {
            try {
                const response = await $authHost.get("user/receptions");
                setReceptions(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке записей:", error);
            }
        };

        fetchReceptions();
    }, []);

    const isPastDateTime = (dateTimeString) => {
        const currentDateTime = moment();
        const receptionDateTime = moment(dateTimeString, "DD.MM.YYYY HH:mm:ss");
        return receptionDateTime.isBefore(currentDateTime);
    };

    const handleViewDetails = async (receptionId) => {
        try {
            const response = await $authHost.get(`user/viewInspectionForm?receptionId=${receptionId}`);
            setSelectedReception(response.data);
            setShowDetails(true);
        } catch (error) {
            console.error("Ошибка при загрузке информации о приеме:", error);
        }
    };

    const handleCloseDetails = () => {
        setShowDetails(false);
        setSelectedReception(null);
    };

    const handleGenerateConclusion = () => {
        console.log("Формируем заключение...");
        if (!selectedReception) return;

        // Скрываем ненужные элементы перед печатью
        const body = document.body;
        const elementsToHide = body.querySelectorAll("header, .main-content > *:not(.modal)");
        elementsToHide.forEach(element => {
            element.style.display = "none";
        });

        // Печатаем содержимое страницы
        window.print();

        // Восстанавливаем отображение скрытых элементов после печати
        elementsToHide.forEach(element => {
            element.style.display = "";
        });
    };

    return (
        <Container className="main-content">
            <Container>
                <h1 className="mt-5 mb-4">Записи к врачу</h1>
                {notification.show && (
                    <Alert variant={notification.variant} onClose={() => setNotification({ ...notification, show: false })} dismissible>
                        {notification.message}
                    </Alert>
                )}
                <ListGroup>
                    {receptions.map(reception => (
                        <ListGroup.Item
                            key={reception.receptionId}
                            className="border mb-3"
                            style={{ borderRadius: "10px" }}
                        >
                            <Row>
                                <Col>
                                    <p>Имя: {reception.firstName}</p>
                                    <p>Фамилия: {reception.lastName}</p>
                                    <p>Дата: {reception.date}</p>
                                    <p>Время: {reception.time}</p>
                                </Col>
                                <Col className="d-flex justify-content-end align-items-center">
                                    {isPastDateTime(`${reception.date} ${reception.time}`) ? (
                                        <>
                                            <Button variant="primary" className="me-2 btn-purple btn-size" onClick={() => handleViewDetails(reception.receptionId)}>Подробнее</Button>
                                            <Button variant="secondary" className="btn-purple btn-size" onClick={handleGenerateConclusion}>Сформировать заключение</Button>
                                        </>
                                    ) : (
                                        <Button variant="danger" className="btn-purple btn-size" onClick={() => (reception.receptionId)}>Отменить запись</Button>
                                    )}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                <Modal show={showDetails} onHide={handleCloseDetails} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Информация о приеме</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="mb-2">Дата осмотра: {selectedReception && selectedReception.date}</p>
                        <p>Результаты осмотра: {selectedReception && selectedReception.content}</p>
                        {/* Добавьте другие поля при необходимости */}
                    </Modal.Body>
                </Modal>
            </Container>
        </Container>
    );
};

export default DoctorReceptions;

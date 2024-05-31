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
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import "../styles/userReceptions.css";

const DoctorReceptions = () => {
    const [receptions, setReceptions] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedReception, setSelectedReception] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: '', variant: '' });

    const [showRating, setShowRating] = useState(false);
    const [ratingValue, setRatingValue] = useState(0);
    const [ratingComment, setRatingComment] = useState("");
    const [selectedReceptionForRating, setSelectedReceptionForRating] = useState(null);
    const [ratedReceptions, setRatedReceptions] = useState([]);

    useEffect(() => {
        const fetchReceptions = async () => {
            try {
                const response = await $authHost.get("user/receptions");
                setReceptions(response.data);
                const ratedIds = response.data.filter(reception => reception.rating).map(reception => reception.receptionId);
                setRatedReceptions(ratedIds);
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

    const handleCancelReception = async (receptionId) => {
        try {
            await $authHost.put(`user/cancelReception?receptionId=${receptionId}`);
            setNotification({ show: true, message: 'Запись успешно отменена', variant: 'success' });
            setReceptions(receptions.filter(reception => reception.receptionId !== receptionId));
        } catch (error) {
            setNotification({ show: true, message: 'Ошибка при отмене записи', variant: 'danger' });
            console.error("Ошибка при отмене записи:", error);
        }
    };

    const handleRateDoctor = (reception) => {
        if (ratedReceptions.includes(reception.receptionId)) {
            setNotification({ show: true, message: 'Вы уже оценили этого врача', variant: 'warning' });
            return;
        }
        setSelectedReceptionForRating(reception);
        setShowRating(true);
    };

    const handleCloseRating = () => {
        setShowRating(false);
        setRatingValue(0);
        setRatingComment("");
        setSelectedReceptionForRating(null);
    };

    const handleSubmitRating = async () => {
        if (!selectedReceptionForRating) return;

        const ratingData = {
            value: ratingValue,
            date: new Date().toISOString(),
            comment: ratingComment,
            doctorId: selectedReceptionForRating.doctorId,
            userId: selectedReceptionForRating.userId,
            receptionId: selectedReceptionForRating.receptionId,
        };

        try {
            await $authHost.post("user/addRating", ratingData);
            setNotification({ show: true, message: 'Рейтинг успешно добавлен', variant: 'success' });
            setRatedReceptions([...ratedReceptions, selectedReceptionForRating.receptionId]);
            handleCloseRating();
        } catch (error) {
            setNotification({ show: true, message: 'Ошибка при добавлении рейтинга', variant: 'danger' });
            console.error("Ошибка при добавлении рейтинга:", error);
        }
    };

    const handleDownloadConclusion = () => {
        // Ваша логика для скачивания заключения
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
                                <Col xs={12} md={8}>
                                    <p>Имя: {reception.firstName}</p>
                                    <p>Фамилия: {reception.lastName}</p>
                                    <p>Дата: {reception.date}</p>
                                    <p>Время: {reception.time}</p>
                                </Col>
                                <Col xs={12} md={4} className="d-flex justify-content-end align-items-center flex-wrap">
                                    {isPastDateTime(`${reception.date} ${reception.time}`) ? (
                                        <>
                                            <Button variant="primary" className="me-2 mb-2 btn-purple btn-size" onClick={() => handleViewDetails(reception.receptionId)}>Подробнее</Button>
                                            {!reception.evaluated && (
                                                <Button variant="success" className="mb-2 btn-purple btn-size" onClick={() => handleRateDoctor(reception)}>Оценить врача</Button>
                                            )}
                                            {reception.rating ? (
                                                <Button variant="info" className="me-2 mb-2 btn-size" disabled>Врач оценен</Button>
                                            ) : null}
                                        </>
                                    ) : (
                                        <Button variant="danger" className="mb-2 btn-purple btn-size" onClick={() => handleCancelReception(reception.receptionId)}>Отменить запись</Button>
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
                        {selectedReception && (
                            <>
                                <p className="mb-2"><strong>Дата осмотра:</strong> {selectedReception.receptionDate}</p>
                                <p><strong>Результаты осмотра:</strong> {selectedReception.content}</p>
                                <Button variant="secondary" className="mt-3 btn-purple btn-size" onClick={handleDownloadConclusion}>Скачать заключение</Button>
                            </>
                        )}
                    </Modal.Body>
                </Modal>

                <Modal show={showRating} onHide={handleCloseRating} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Оценка врача</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="ratingValue">
                                <Form.Label>Оценка</Form.Label>
                                <div className="d-flex">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <div key={value} onClick={() => setRatingValue(value)} className="me-1" style={{ cursor: 'pointer', fontSize: '2rem', color: value <= ratingValue ? 'red' : 'gray' }}>
                                            {value <= ratingValue ? <FaHeart /> : <FaRegHeart />}
                                        </div>
                                    ))}
                                </div>
                            </Form.Group>
                            <Form.Group controlId="ratingComment" className="mt-3">
                                <Form.Label>Комментарий</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={ratingComment}
                                    onChange={(e) => setRatingComment(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" className="mt-3 btn-purple btn-size" onClick={handleSubmitRating}>
                                Отправить оценку
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container>
        </Container>
    );
};

export default DoctorReceptions;

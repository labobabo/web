import React, { useState, useEffect } from "react";
import { $authHost } from "../http/index";
import { Card, Container, ListGroup, Modal, Button, Form, Alert } from "react-bootstrap";
import moment from "moment";
import "../styles/DocRec.css";

const DoctorReceptions = () => {
    const [receptions, setReceptions] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        content: "",
        doctorId: 0,
        userId: 0,
        receptionId: 0,
    });
    const [notification, setNotification] = useState({ show: false, message: '', variant: '' });
    const [submittedReceptions, setSubmittedReceptions] = useState(new Set());

    useEffect(() => {
        const fetchReceptions = async () => {
            try {
                const response = await $authHost.get("doctor/receptions");
                console.log("Fetched receptions:", response.data);
                setReceptions(response.data);

                const savedSubmittedReceptions = localStorage.getItem("submittedReceptions");
                if (savedSubmittedReceptions) {
                    setSubmittedReceptions(new Set(JSON.parse(savedSubmittedReceptions)));
                }
            } catch (error) {
                console.error("Ошибка при загрузке записей:", error);
                if (error.response) {
                    console.log("Error response data:", error.response.data);
                    console.log("Error response status:", error.response.status);
                    console.log("Error response headers:", error.response.headers);
                }
            }
        };

        fetchReceptions();
    }, []);

    const isPastDateTime = (dateString, timeString) => {
        const currentDateTime = moment();
        const receptionDateTime = moment(`${dateString} ${timeString}`, "DD.MM.YYYY HH:mm:ss");
        return receptionDateTime.isBefore(currentDateTime);
    };

    const handleShowForm = (reception) => {
        setFormData({
            content: "",
            doctorId: reception.doctorId,
            userId: reception.userId,
            receptionId: reception.receptionId,
        });
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setFormData({
            content: "",
            doctorId: 0,
            userId: 0,
            receptionId: 0,
        });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        console.log("Submitting form with data:", formData);
        try {
            await $authHost.post("doctor/makeInspectionForm", formData);
            setNotification({ show: true, message: 'Форма осмотра успешно отправлена', variant: 'success' });

            const newSubmittedReceptions = new Set(submittedReceptions).add(formData.receptionId);
            setSubmittedReceptions(newSubmittedReceptions);
            localStorage.setItem("submittedReceptions", JSON.stringify(Array.from(newSubmittedReceptions)));

            handleCloseForm();
        } catch (error) {
            setNotification({ show: true, message: 'Ошибка при отправке формы осмотра', variant: 'danger' });
            console.error("Ошибка при отправке формы осмотра:", error);
            if (error.response) {
                console.log("Error response data:", error.response.data);
                console.log("Error response status:", error.response.status);
                console.log("Error response headers:", error.response.headers);
            }
        }
    };

    const handleCancelReception = async (receptionId) => {
        try {
            await $authHost.put(`user/cancelReception?receptionId=${receptionId}`);
            setNotification({ show: true, message: 'Запись успешно отменена', variant: 'success' });
            setReceptions(receptions.filter(reception => reception.receptionId !== receptionId));
        } catch (error) {
            setNotification({ show: true, message: 'Ошибка при отмене записи', variant: 'danger' });
            console.error("Ошибка при отмене записи:", error);
            if (error.response) {
                console.log("Error response data:", error.response.data);
                console.log("Error response status:", error.response.status);
                console.log("Error response headers:", error.response.headers);
            }
        }
    };

    return (
        <Container className="doc-rec-container">
            <h1 className="form-title">Записи</h1>
            {notification.show && (
                <Alert variant={notification.variant} onClose={() => setNotification({ ...notification, show: false })} dismissible>
                    {notification.message}
                </Alert>
            )}
            <Card className="doc-rec-card">
                <ListGroup variant="flush">
                    {receptions.map(reception => (
                        <ListGroup.Item key={reception.receptionId} className="doc-rec-item">
                            <p><strong>Имя:</strong> {reception.firstName}</p>
                            <p><strong>Фамилия:</strong> {reception.lastName}</p>
                            <p><strong>Дата:</strong> {reception.date}</p>
                            <p><strong>Время:</strong> {reception.time}</p>
                            <div className="action-btns">
                                {isPastDateTime(reception.date, reception.time) ? (
                                    <>
                                        {!submittedReceptions.has(reception.receptionId) ? (
                                            <Button 
                                                variant="secondary"
                                                onClick={() => handleShowForm(reception)}
                                            >
                                                Заполнить бланк осмотра
                                            </Button>
                                        ) : (
                                            <Button 
                                                variant="primary"
                                                disabled
                                            >
                                                Бланк осмотра отправлен
                                            </Button>
                                        )}
                                    </>
                                ) : (
                                    <Button 
                                        variant="danger"
                                        onClick={() => handleCancelReception(reception.receptionId)}
                                    >
                                        Отменить запись
                                    </Button>
                                )}
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
            <Modal show={showForm} onHide={handleCloseForm} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Заполнение бланка осмотра</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitForm}>
                        <Form.Group controlId="formContent">
                            <Form.Label>Результаты осмотра</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="content"
                                value={formData.content}
                                onChange={handleFormChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Отправить
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default DoctorReceptions;

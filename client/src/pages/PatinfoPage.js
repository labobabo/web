import React, { useState, useEffect } from "react";
import { $authHost } from "../http/index";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "../styles/PathInfo.css"; // Подключаем кастомные стили

const DocMain = () => {
    const [specialities, setSpecialities] = useState([]);
    const [selectedSpeciality, setSelectedSpeciality] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [times, setTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState("");

    useEffect(() => {
        fetchSpecialities();
    }, []);

    const fetchSpecialities = async () => {
        try {
            const response = await $authHost.get("user/specialities");
            setSpecialities(response.data);
        } catch (error) {
            console.error("Ошибка при загрузке специальностей:", error);
        }
    };

    const fetchDoctors = async (speciality) => {
        try {
            const response = await $authHost.get(`user/ticketDoctor?specialityName=${speciality}`);
            setDoctors(response.data);
        } catch (error) {
            console.error("Ошибка при загрузке врачей:", error);
        }
    };

    const fetchDates = async (doctorId) => {
        try {
            const response = await $authHost.get(`user/ticketDate?doctorId=${doctorId}`);
            setDates(response.data);
        } catch (error) {
            console.error("Ошибка при загрузке дат:", error);
        }
    };

    const fetchTimes = async (doctorId, date) => {
        try {
            const response = await $authHost.get(`user/ticketTime?doctorId=${doctorId}&date=${date}`);
            setTimes(response.data);
        } catch (error) {
            console.error("Ошибка при загрузке времен:", error);
        }
    };

    const handleMakeReception = async () => {
        const requestData = {
            doctorId: selectedDoctor,
            date: selectedDate,
            time: selectedTime,
        };

        try {
            await $authHost.post("user/makeReception", requestData);
            console.log("Запись на прием создана успешно!");
        } catch (error) {
            console.error("Ошибка при создании записи на прием:", error);
        }
    };

    const handleDoctorChange = async (doctorId) => {
        setSelectedDoctor(doctorId);
        fetchDates(doctorId);
    };

    return (
        <Container className="main-content">
        <Container className="doc-main-container">
            <h1 className="doc-main-title">Запись к врачу</h1>
            <Form className="rounded-form">
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formSpeciality">
                            <Form.Label>Специальность</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedSpeciality}
                                onChange={e => {
                                    setSelectedSpeciality(e.target.value);
                                    fetchDoctors(e.target.value);
                                }}
                            >
                                <option value="">Выберите специальность</option>
                                {specialities.map(speciality => (
                                    <option key={speciality.id} value={speciality.name}>{speciality.specialityName}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formDoctor">
                            <Form.Label>Врач</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedDoctor}
                                onChange={e => handleDoctorChange(e.target.value)}
                            >
                                <option value="">Выберите врача</option>
                                {doctors.map(doctor => (
                                    <option key={doctor.doctorId} value={doctor.doctorId}>{doctor.doctorName}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formDate">
                            <Form.Label>Дата</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedDate}
                                onChange={e => {
                                    setSelectedDate(e.target.value);
                                    fetchTimes(selectedDoctor, e.target.value);
                                }}
                            >
                                <option value="">Выберите дату</option>
                                {dates.map(date => (
                                    <option key={date.date} value={date.date}>{date.date}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formTime">
                            <Form.Label>Время</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedTime}
                                onChange={e => setSelectedTime(e.target.value)}
                            >
                                <option value="">Выберите время</option>
                                {times.map((time, index) => (
                                    <option key={index} value={time.time}>{time.time}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" onClick={handleMakeReception}>
                    Записаться на прием
                </Button>
            </Form>
        </Container>
        </Container>
    );
};

export default DocMain;

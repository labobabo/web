import React, { useState, useEffect } from "react";
import { $authHost } from "../http/index";
import { Card, Container, ListGroup } from "react-bootstrap";
import "../styles/DocRec.css";

const DoctorReceptions = () => {
    const [receptions, setReceptions] = useState([]);

    useEffect(() => {
        const fetchReceptions = async () => {
            try {
                const response = await $authHost.get("doctor/receptions");
                setReceptions(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке записей:", error);
            }
        };

        fetchReceptions();
    }, []);

    return (
        <Container className="container-custom">
            <Card className="card-custom">
                <Card.Header className="form-title">Записи к врачу</Card.Header>
                <ListGroup variant="flush">
                    {receptions.map(reception => (
                        <ListGroup.Item key={reception.id}>
                            {reception.details}
                            {/* Предполагается, что объект reception имеет свойства 'id' и 'details' */}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
        </Container>
    );
};

export default DoctorReceptions;

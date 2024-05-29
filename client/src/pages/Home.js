import React from "react";
import { Container, Row, Col, Carousel, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVk, faTelegram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css'; // Убедитесь, что CSS файл создан и импортирован

const Home = () => {
    return (
        <div className="bg-light" style={{ minHeight: "100vh" }}>
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col xs={12}>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="/photos/1d.jpg"
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="/photos/2d.jpg"
                                    alt="Second slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <h2 className="text-center">Наши предложения</h2>
                    </Col>
                </Row>
                <Row className="mt-4 justify-content-center">
                    <Col xs={12} md={6} lg={3} className="mb-4">
                        <Card className="h-100 border-primary">
                            <Card.Body>
                                <Card.Title className="text-primary">Рабочее время</Card.Title>
                                <Card.Text>
                                    Будние: 8:00 - 18:00 <br />
                                    Выходные: 10:00 - 16:00
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={6} lg={3} className="mb-4">
                        <Card className="h-100 border-success">
                            <Card.Body>
                                <Card.Title className="text-success">Расписание врачей</Card.Title>
                                <Card.Text>
                                    Понедельник: Доктор Иванова, 9:00 - 15:00 <br />
                                    Вторник: Доктор Петров, 10:00 - 16:00 <br />
                                    Среда: Доктор Сидорова, 8:00 - 14:00 <br />
                                    Четверг: Доктор Козлов, 11:00 - 17:00 <br />
                                    Пятница: Доктор Михайлова, 12:00 - 18:00
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={6} lg={3} className="mb-4">
                        <Card className="h-100 border-warning">
                            <Card.Body>
                                <Card.Title className="text-warning">Контактный номер</Card.Title>
                                <Card.Text>
                                    +7 (123) 456-7890
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={6} lg={3} className="mb-4">
                        <Card className="h-100 border-info">
                            <Card.Body>
                                <Card.Title className="text-info">Описание</Card.Title>
                                <Card.Text>
                                    Мы, за ваше здоровье стоим, кто у нас был тот в курсе.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <div className="circular-menu d-flex justify-content-center mt-4">
                <div className="circle-icon mx-2">
                    <a href="https://vk.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faVk} size="2x" className="text-white" />
                    </a>
                </div>
                <div className="circle-icon mx-2">
                    <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTelegram} size="2x" className="text-white" />
                    </a>
                </div>
                <div className="circle-icon mx-2">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} size="2x" className="text-white" />
                    </a>
                </div>
                <div className="circle-icon mx-2">
                    <a href="/path/to/app/download" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faDownload} size="2x" className="text-white" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Home;

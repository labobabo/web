import React from "react";
import { Container, Row, Col, Button, Card, Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css'; // Убедитесь, что CSS файл создан и импортирован

const Home = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Container fluid className="p-0 mt-5"> {/* Добавляем отступ сверху */}
                <Row className="justify-content-center">
                    <Col xs={12} md={10} className="mb-5"> {/* Ограничиваем ширину до 10 колонок на больших экранах */}
                        <Carousel className="mb-5">
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="/photos/1d.jpg"
                                    alt="Первый слайд"
                                    style={{ objectFit: 'cover', height: '900px' }} // Настройка стиля для предотвращения обрезки
                                />
                                <Carousel.Caption>
                                    <h3>Первый слайд</h3>
                                    <p>Описание первого слайда.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="/photos/docmem.jpg"
                                    alt="Второй слайд"
                                    style={{ objectFit: 'cover', height: '900px' }} // Настройка стиля для предотвращения обрезки
                                />
                                <Carousel.Caption>
                                    <h3>Второй слайд</h3>
                                    <p>Описание второго слайда.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>
            </Container>
            <Container className="flex-grow-1 py-5">
                <Row className="justify-content-center mb-4">
                    <Col xs={12} md={8} className="text-center">
                        <h1>Новоялександровская районная больница</h1>
                        <p>Взрослая регистратура: 8 86564 617-68, Детская регистратура: 8 86564 613-75</p>
                        <p>Горячая линия МЗ СК: 8-800-200-26-03</p>
                        <Button variant="primary" className="m-2">График работы</Button>
                        <Button variant="primary" className="m-2">Обращение</Button>
                    </Col>
                </Row>
                <Row className="justify-content-center mb-5">
                    <Col xs={6} md={3} className="text-center">
                        <h2>1988</h2>
                        <p>Новорожденных за год</p>
                    </Col>
                    <Col xs={6} md={3} className="text-center">
                        <h2>51953</h2>
                        <p>Посещений врачей за год</p>
                    </Col>
                    <Col xs={6} md={3} className="text-center">
                        <h2>4752</h2>
                        <p>Поступило в стационар за год</p>
                    </Col>
                    <Col xs={6} md={3} className="text-center">
                        <h2>53</h2>
                        <p>Года опыта работы</p>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={12} md={4} className="mb-4">
                        <Card className="h-100 text-center">
                            <Card.Body>
                                <Card.Title>Гинекология</Card.Title>
                                <Card.Text>
                                    Профилактика, диагностика и лечение заболеваний женской половой системы.
                                </Card.Text>
                                <Button variant="primary">Подробнее</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4} className="mb-4">
                        <Card className="h-100 text-center">
                            <Card.Body>
                                <Card.Title>Урология</Card.Title>
                                <Card.Text>
                                    Диагностика, лечение и профилактика заболеваний мочевыделительной системы мужчин и женщин.
                                </Card.Text>
                                <Button variant="primary">Подробнее</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4} className="mb-4">
                        <Card className="h-100 text-center">
                            <Card.Body>
                                <Card.Title>Гастроэнтерология</Card.Title>
                                <Card.Text>
                                    Диагностика, лечение и профилактика заболеваний пищеварительных органов.
                                </Card.Text>
                                <Button variant="primary">Подробнее</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <footer className="bg-dark text-white text-center py-3 mt-auto">
                <Container>
                    <p className="mb-0">Добро пожаловать в Новоялександровскую районную больницу</p>
                    <p className="mb-0">Наши медицинские специалисты заботятся о вашем здоровье и здоровье вашей семьи</p>
                </Container>
            </footer>
        </div>
    );
};

export default Home;

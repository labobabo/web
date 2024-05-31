import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { $authHost } from "../http/index";
import Card from 'react-bootstrap/Card';
import '../styles/reviews.css'; // Убедитесь, что CSS файл создан и импортирован

const UserO = () => {
    const [allReviews, setAllReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [doctorId, setDoctorId] = useState(1);

    useEffect(() => {
        const fetchReviews = async (id) => {
            try {
                const response = await $authHost.get(`http://185.250.46.135:8080/api/v1/user/getRating?doctorId=${id}`);
                const reviews = response.data;
                setAllReviews((prevReviews) => [...prevReviews, { doctorId: id, reviews }]);
                setLoading(false);
            } catch (error) {
                setError(`Ошибка при загрузке отзывов для врача с ID: ${id}`);
                setLoading(false);
            }
        };

        const interval = setInterval(() => {
            if (doctorId <= 10) {
                fetchReviews(doctorId);
                setDoctorId((prevId) => prevId + 1);
            } else {
                clearInterval(interval);
            }
        }, 3000); // Вызов функции fetchReviews() каждые 3 секунды

        return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
    }, [doctorId]);

    if (loading && allReviews.length === 0) {
        return (
            <Container className="main-content">
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="main-content">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </Container>
        );
    }

    const renderHearts = (rating) => {
        const hearts = [];
        for (let i = 0; i < rating; i++) {
            hearts.push(<span key={i} className="text-danger">&hearts;</span>);
        }
        return hearts;
    };

    return (
        <Container className="main-content mt-5">
            <h1 className="mb-4">Отзывы о врачах</h1>
            {allReviews.length === 0 ? (
                <p>Отзывов нет.</p>
            ) : (
                allReviews.flatMap((entry) => (
                    entry.reviews.map((review) => (
                        <Card className="mb-3" key={review.ratingId}>
                            <Card.Body>
                                <Card.Title>Рейтинг: {renderHearts(review.value)}</Card.Title>
                                <Card.Text>{review.comment}</Card.Text>
                                <div className="review-date">Дата: {new Date(review.date).toLocaleDateString('ru-RU', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}</div>
                            </Card.Body>
                        </Card>
                    ))
                ))
            )}
        </Container>
    );
};

export default UserO;

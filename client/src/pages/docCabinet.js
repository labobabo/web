import React, { useState, useEffect } from "react";
import { $authHost } from "../http/index";
import 'bootstrap/dist/css/bootstrap.min.css';

const DocCabinet = () => {
    const [doctor, setDoctor] = useState({
        firstName: "",
        secondName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        passport: "",
        address: "",
        birthdate: "",
        age: "",
        specialityId: "",
        cabinetId: "",
        averageRating: 0,
    });

    const [photo, setPhoto] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDoctorInfo = async () => {
            try {
                const response = await $authHost.get('doctor/getInfo');
                const doctorInfo = response.data;
                setDoctor({
                    firstName: doctorInfo.firstName,
                    secondName: doctorInfo.secondName,
                    lastName: doctorInfo.lastName,
                    email: doctorInfo.email,
                    phoneNumber: doctorInfo.phoneNumber,
                    passport: doctorInfo.passport,
                    address: doctorInfo.address,
                    birthdate: doctorInfo.birthdate,
                    age: doctorInfo.age,
                    specialityId: doctorInfo.specialityId,
                    cabinetId: doctorInfo.cabinetId,
                    averageRating: parseFloat(doctorInfo.averageRating).toFixed(1),
                });
                if (doctorInfo.photo) {
                    setPhoto(`http://185.250.46.135/images/${doctorInfo.photo}`);
                }
            } catch (error) {
                console.error('Ошибка при загрузке информации врача:', error);
            }
        };

        fetchDoctorInfo();
    }, []);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handlePhotoUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            setLoading(true);

            try {
                const response = await $authHost.post('doctor/uploadPhoto', formData);
                setPhoto(`http://185.250.46.135/images/${response.data.photo}`);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка при загрузке фото:', error);
                setLoading(false);
            }
        }
    };

    const renderRatingHearts = (rating) => {
        const hearts = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                hearts.push(<i key={i} className="bi bi-heart-fill text-danger" style={{ fontSize: "1.2em" }}></i>);
            } else if (i - rating < 1) {
                hearts.push(<i key={i} className="bi bi-heart-half text-danger" style={{ fontSize: "1.2em" }}></i>);
            } else {
                hearts.push(<i key={i} className="bi bi-heart text-danger" style={{ fontSize: "1.2em" }}></i>);
            }
        }
        return hearts;
    };

    return (
        <div className="container mt-5">
            <div className="row mb-4">
                <div className="col-md-4 text-center">
                    {loading ? (
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <img
                            src={photo || "default_photo_path"}  // Provide a default photo path if none is provided
                            alt="Doctor"
                            className="img-thumbnail"
                            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                        />
                    )}
                    <input type="file" accept="image/*" onChange={handleFileSelect} className="form-control mt-2" />
                    <button onClick={handlePhotoUpload} className="btn btn-primary mt-2">Загрузить фото</button>
                </div>
                <div className="col-md-8">
                    <h2>{`${doctor.firstName} ${doctor.secondName} ${doctor.lastName}`}</h2>
                    <p>Дата рождения: {doctor.birthdate}</p>
                    <p>Возраст: {doctor.age}</p>
                    <div className="d-flex align-items-center">
                        <span className="me-2">Средний рейтинг:</span>
                        <div className="d-flex align-items-center">
                            {renderRatingHearts(doctor.averageRating)}
                        </div>
                        <span className="ms-2">({doctor.averageRating})</span>
                    </div>
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-header">
                    Контактные данные
                </div>
                <div className="card-body">
                    <p>Номер телефона: {doctor.phoneNumber}</p>
                    <p>Почта: {doctor.email}</p>
                    <p>Адрес: {doctor.address}</p>
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-header">
                    Документы
                </div>
                <div className="card-body">
                    <p>Паспорт: {doctor.passport}</p>
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-header">
                    Профессиональные данные
                </div>
                <div className="card-body">
                    <p>Специальность ID: {doctor.specialityId}</p>
                    <p>Кабинет ID: {doctor.cabinetId}</p>
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-header">
                    Безопасность
                </div>
                <div className="card-body">
                    <button className="btn btn-primary me-2">Изменить пароль</button>
                    <button className="btn btn-secondary">Двухфакторная аутентификация</button>
                </div>
            </div>
        </div>
    );
};

export default DocCabinet;

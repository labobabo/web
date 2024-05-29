import React, { useState, useEffect } from "react";
import { $authHost } from "../http/index";
import 'bootstrap/dist/css/bootstrap.min.css';

const Cabinet = () => {
    const [user, setUser] = useState({
        name: "",
        birthdate: "",
        phoneNumber: "",
        email: "",
        address: "",
        passport: "",
        polis: "",
        snils: "",
    });

    const [photo, setPhoto] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await $authHost.get('user/getInfo');
                const userInfo = response.data;
                setUser({
                    name: userInfo.name,
                    birthdate: userInfo.birthdate,
                    phoneNumber: userInfo.phoneNumber,
                    email: userInfo.email,
                    address: userInfo.address,
                    passport: userInfo.passport,
                    polis: userInfo.polis,
                    snils: userInfo.snils,
                });
                setPhoto(`http://185.250.46.135/images/${userInfo.photo}`);
            } catch (error) {
                console.error('Ошибка при загрузке информации пользователя:', error);
            }
        };

        fetchUserInfo();
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
            formData.append('file', selectedFile); // Change 'photo' to 'file'
    
            setLoading(true);
    
            try {
                const response = await $authHost.post('user/uploadPhoto', formData);
                setPhoto(`http://185.250.46.135/images/${response.data.photo}`);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка при загрузке фото:', error);
                setLoading(false);
            }
        }
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
                            src={photo}
                            alt="User"
                            className="img-thumbnail"
                            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                        />
                    )}
                    <input type="file" accept="image/*" onChange={handleFileSelect} className="form-control mt-2" />
                    <button onClick={handlePhotoUpload} className="btn btn-primary mt-2">Загрузить фото</button>
                </div>
                <div className="col-md-8">
                    <h2>{user.name}</h2>
                    <p>Дата рождения: {user.birthdate}</p>
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-header">
                    Мои данные
                </div>
                <div className="card-body">
                    <p>Номер телефона: {user.phoneNumber}</p>
                    <p>Почта: {user.email}</p>
                    <p>Адрес: {user.address}</p>
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-header">
                    Документы
                </div>
                <div className="card-body">
                    <p>Паспорт: {user.passport}</p>
                    <p>Полис: {user.polis}</p>
                    <p>СНИЛС: {user.snils}</p>
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

export default Cabinet;

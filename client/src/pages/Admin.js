import React, { useState, useEffect } from "react";
import { $authHost, $host } from "../http/index";
import axios from "axios";
import "../styles/admin.css"; // Импортируем файл со стилями

const Admin = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchDoctors();
        }, 2000); // Обновляем данные каждые 5 секунд

        return () => clearInterval(intervalId); // Очищаем интервал при размонтировании компонента
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await $authHost.get("admin/doctorsList");
            setDoctors(response.data);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    const sendRequest = async (doctorId) => {
        try {
            const requestData = { doctorId };
            const response = await $authHost.put(`admin/confirmTheDoctor?doctorId=${doctorId}`);
            console.log("Request sent successfully:", response.data);
            fetchDoctors(); // Обновляем список врачей после подтверждения
        } catch (error) {
            console.error("Error sending request:", error);
        }
    };

    const handleConfirm = async (id) => {
        await sendRequest(id);
    };

    const handleReject = (id) => {
        console.log("Rejected doctor with id:", id);
    };

    const toggleDetails = (doctor) => {
        setSelectedDoctor(doctor === selectedDoctor ? null : doctor);
    };

    return (
        <div>
            <h1>Подтверждение</h1>
            {doctors.map((doctor) => (
                <div key={doctor.id} className="doctor-card">
                    <h2 className="doctor-name">{doctor.lastName} {doctor.firstName} {doctor.secondName}</h2>
                    <p className="doctor-contact"><strong>Phone:</strong> {doctor.phoneNumber}</p>
                    <p className="doctor-contact"><strong>Cabinet:</strong> {doctor.cabinetId}</p>
                    {!doctor.confirmed && (
                        <div>
                            <button className="confirm-button" onClick={() => handleConfirm(doctor.id)}>Подтвердить</button>
                            <button className="reject-button" onClick={() => handleReject(doctor.id)}>Отклонить</button>
                        </div>
                    )}
                    {doctor.confirmed && (
                        <button className="details-button" onClick={() => toggleDetails(doctor)}>
                            Подробнее
                        </button>
                    )}
                    {selectedDoctor && selectedDoctor.id === doctor.id && (
                        <div>
                            <p><strong>Имя:</strong> {selectedDoctor.firstName}</p>
                            <p><strong>Фамилия:</strong> {selectedDoctor.lastName}</p>
                            <p><strong>Отчество:</strong> {selectedDoctor.secondName}</p>
                            {/* Добавьте остальную информацию о враче */}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Admin;

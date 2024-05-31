import React, { useState, useEffect } from "react";
import { $authHost } from "../http/index";
import "../styles/admin.css"; // Import the CSS file
import { Container } from "react-bootstrap";

const Admin = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchDoctors();
        }, 2000); // Refresh data every 2 seconds

        return () => clearInterval(intervalId); // Clear interval on component unmount
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
            const response = await $authHost.put(`admin/confirmTheDoctor?doctorId=${doctorId}`);
            console.log("Request sent successfully:", response.data);
            fetchDoctors(); // Refresh the doctors list after confirmation
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
        <Container className="main-content"> 
        <div className="admin-container">
            <h1>Подтверждение</h1>
            <div className="doctor-list">
                {doctors.map((doctor) => (
                    <div key={doctor.id} className="doctor-card">
                        <h2 className="doctor-name">{doctor.lastName} {doctor.firstName} {doctor.secondName}</h2>
                        <p className="doctor-contact"><strong>Телефон:</strong> {doctor.phoneNumber}</p>
                        <p className="doctor-contact"><strong>Кабинет:</strong> {doctor.cabinetId}</p>
                        {!doctor.confirmed && (
                            <div className="button-group">
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
                            <div className="doctor-details">
                                <p><strong>Имя:</strong> {selectedDoctor.firstName}</p>
                                <p><strong>Фамилия:</strong> {selectedDoctor.lastName}</p>
                                <p><strong>Отчество:</strong> {selectedDoctor.secondName}</p>
                                {/* Add more doctor information here */}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
        </Container>
    );
};

export default Admin;

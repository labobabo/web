import React, { useState, useEffect } from "react";
import { $authHost, $host } from "../http/index";
import axios from "axios";

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
        <div>
            <h1>Записи к врачу</h1>
            <ul>
                {receptions.map(reception => (
                    <li key={reception.receptionId}>
                        <p>Имя: {reception.firstName}</p>
                        <p>Фамилия: {reception.lastName}</p>
                        <p>Дата: {reception.date}</p>
                        <p>Время: {reception.time}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorReceptions;

import React, { useState, useEffect } from "react";
import { $authHost, $host } from "../http/index";


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
                    <li key={reception.id}>{reception.details}</li>
                    // Предполагается, что объект reception имеет свойства 'id' и 'details'
                ))}
            </ul>
        </div>
    );
};

export default DoctorReceptions;

import React, { useContext, useState, useEffect } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { AddressSuggestions } from 'react-dadata';
import "react-dadata/dist/react-dadata.css";
import "../styles/Auth.css"; // Import the custom CSS

import { Context } from "../index";
import { registration, login, doctorregistration } from "../http/UserAPI";
import { observer } from "mobx-react-lite";
import { HOME_ROUTE, REGISTRATION_ROUTE, LOGIN_ROUTE } from "../utils/consts";

const Auth = observer(() => {
    const { user, admin, doctor } = useContext(Context);
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [userType, setUserType] = useState(null); // null, 'user', 'doctor'
    const [step, setStep] = useState(1);
    const [specialities, setSpecialities] = useState([]);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const [loginIdentifier, setLoginIdentifier] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [lastName, setLastName] = useState("");
    const [regLogin, setRegLogin] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [address, setAddress] = useState("");
    const [snils, setSnils] = useState("");
    const [polis, setPolis] = useState("");
    const [age, setAge] = useState("");
    const [passport, setPassport] = useState("");
    const [specialityId, setSpecialityId] = useState("");

    useEffect(() => {
        if (userType === 'doctor') {
            fetch("http://185.250.46.135:8080/api/v1/auth/getSpecialities")
                .then(response => response.json())
                .then(data => setSpecialities(data))
                .catch(error => console.error('Error fetching specialities:', error));
        }
    }, [userType]);

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleRegistration = async () => {
        try {
            let data;
            if (userType === 'doctor') {
                data = await doctorregistration(
                    firstName, secondName, lastName, regLogin, regPassword, email,
                    phoneNumber, birthdate, address, passport, age, specialityId
                );
            } else {
                data = await registration(
                    firstName, secondName, lastName, regLogin, regPassword, email,
                    phoneNumber, birthdate, address, snils, polis, passport, age
                );
            }
            setRegistrationSuccess(true);  // Устанавливаем состояние успешной регистрации
            setTimeout(() => {
                navigate(LOGIN_ROUTE);  // Перенаправление на страницу входа через 2 секунды
                window.location.reload();  // Обновление страницы после перенаправления
            }, 2000);
        } catch (error) {
            alert(error);
        }
    };

    const handleLogin = async () => {
        try {
            await login(loginIdentifier, loginPassword);
            navigate(HOME_ROUTE);
            window.location.reload();
        } catch (error) {
            alert(error);
        }
    };

    const renderLogin = () => (
        <Form className="d-flex flex-column">
            <Form.Control
                className="form-control-custom"
                placeholder="Введите login..."
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
            />
            <Form.Control
                className="form-control-custom"
                type="password"
                placeholder="Введите ваш пароль..."
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
            />
            <Button className="mt-3 button-custom" variant="outline-success" onClick={handleLogin}>
                Войти
            </Button>
            <NavLink className="mt-3 registration-link" to={REGISTRATION_ROUTE} onClick={() => setIsLogin(false)}>
                Зарегистрируйтесь!
            </NavLink>
        </Form>
    );

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <Form.Control
                            className="form-control-custom"
                            placeholder="Фамилия"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <Form.Control
                            className="form-control-custom"
                            placeholder="Имя"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <Form.Control
                            className="form-control-custom"
                            placeholder="Отчество"
                            value={secondName}
                            onChange={(e) => setSecondName(e.target.value)}
                        />
                        <Form.Control
                            className="form-control-custom"
                            placeholder="Login"
                            value={regLogin}
                            onChange={(e) => setRegLogin(e.target.value)}
                        />
                        <Form.Control
                            className="form-control-custom"
                            type="password"
                            placeholder="Password"
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                        />
                        <Button className="mt-3 button-custom" variant="outline-primary" onClick={handleNext}>
                            Далее
                        </Button>
                        <Button className="mt-3 button-custom" variant="outline-secondary" onClick={() => setIsLogin(true)}>
                            Войти
                        </Button>
                    </>
                );
            case 2:
                return (
                    <>
                        <Form.Control
                            className="form-control-custom"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputMask
                            mask="+7-999-999-99-99"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        >
                            {() => <Form.Control className="form-control-custom" placeholder="Номер телефона" />}
                        </InputMask>
                        <InputMask
                            mask="99.99.9999"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                        >
                            {() => <Form.Control className="form-control-custom" placeholder="Дата рождения" />}
                        </InputMask>
                        <AddressSuggestions
                            token="a1df019af69de6609bfeb129298ce86b0293bebe"
                            value={address}
                            onChange={(e) => setAddress(e.value)}
                            inputProps={{ placeholder: "Address", className: "form-control-custom" }}
                        />
                        {userType === 'user' && (
                            <>
                                <InputMask
                                    mask="999-999-999 99"
                                    value={snils}
                                    onChange={(e) => setSnils(e.target.value)}
                                >
                                    {() => <Form.Control className="form-control-custom" placeholder="SNILS" />}
                                </InputMask>
                                <Form.Control
                                    className="form-control-custom"
                                    placeholder="Polis"
                                    value={polis}
                                    onChange={(e) => setPolis(e.target.value)}
                                />
                            </>
                        )}
                        <Button className="mt-3 button-custom" variant="outline-primary" onClick={handleBack}>
                            Назад
                        </Button>
                        <Button className="mt-3 button-custom" variant="outline-primary" onClick={handleNext}>
                            Далее
                        </Button>
                        <Button className="mt-3 button-custom" variant="outline-secondary" onClick={() => setIsLogin(true)}>
                            Войти
                        </Button>
                    </>
                );
            case 3:
                return (
                    <>
                        <InputMask
                            mask="9999 999999"
                            value={passport}
                            onChange={(e) => setPassport(e.target.value)}
                        >
                            {() => <Form.Control className="form-control-custom" placeholder="Паспорт" />}
                        </InputMask>
                        <Form.Control
                            className="form-control-custom"
                            placeholder="Возраст"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                        {userType === 'doctor' && (
                            <Form.Control
                                as="select"
                                className="form-control-custom"
                                value={specialityId}
                                onChange={(e) => setSpecialityId(e.target.value)}
                            >
                                <option value="">Выберите специальность</option>
                                {specialities.map(speciality => (
                                    <option key={speciality.specialityId} value={speciality.specialityId}>
                                        {speciality.specialityName}
                                    </option>
                                ))}
                            </Form.Control>
                        )}
                        <Button className="mt-3 button-custom" variant="outline-primary" onClick={handleBack}>
                            Назад
                        </Button>
                        <Button className="mt-3 button-custom" variant="outline-success" onClick={handleRegistration}>
                            Зарегистрироваться
                        </Button>
                        <Button className="mt-3 button-custom" variant="outline-secondary" onClick={() => setIsLogin(true)}>
                            Войти
                        </Button>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                {registrationSuccess ? (
                    <div className="text-center">
                        <h2>Регистрация успешна! Перенаправление на страницу входа...</h2>
                    </div>
                ) : (
                    <>
                        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
                        <Form className="d-flex flex-column">
                            {isLogin ? renderLogin() : (
                                <>
                                    <div className="d-flex justify-content-around mb-3">
                                        <Button
                                            variant={userType === 'user' ? "outline-primary" : "outline-secondary"}
                                            onClick={() => setUserType('user')}
                                        >
                                            Я пациент
                                        </Button>
                                        <Button
                                            variant={userType === 'doctor' ? "outline-primary" : "outline-secondary"}
                                            onClick={() => setUserType('doctor')}
                                        >
                                            Я врач
                                        </Button>
                                    </div>
                                    {userType && renderStepContent()}
                                </>
                            )}
                        </Form>
                    </>
                )}
            </Card>
        </Container>
    );
});

export default Auth;

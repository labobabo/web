import React, { useContext, useState } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { REGISTRATION_ROUTE, LOGIN_ROUTE, HOME_ROUTE, DOCTORREGISTRATION_ROUTE } from "../utils/consts";
import { registration, login, Role, doctorregistration } from "../http/UserAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
    const { user } = useContext(Context);
    const { admin } = useContext(Context);
    const { doctor } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const [loginIdentifier, setLoginIdentifier] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [registrationIdentifier, setRegistrationIdentifier] = useState("");
    const [registrationPassword, setRegistrationPassword] = useState("");
    const [email, setEmail] = useState("");



    const [docfirstName, setDocFirstname] = useState("");

    const [docsecondName, setDocsecondName] = useState("");

    const [doclastName, setDoclastName] = useState("");

    const [docLogin, setDocLogin] = useState("");

    const [docPassword, setDocPassword] = useState("");

    const [docEmail, setDocEmail] = useState("");

    const [docphoneNumber, setDocphoneNumber] = useState("");

    const [docBirthdate, setDocBirthdate] = useState("");

    const [docAddress, setDocAddress] = useState("");

    const [docSnils, setDocSnils] = useState("");

    const [docPolis, setDocPolis] = useState("");

    const [docAge, setDocAge] = useState("");

    const [docPassport, setDocPassport] = useState("");

    const [docSpecialityId, setDocSpecialityId] = useState("");




    const isLogin = location.pathname === LOGIN_ROUTE;
    const [isDoctorRegistration, setIsDoctorRegistration] = useState(false);

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(loginIdentifier, loginPassword);
                navigate(HOME_ROUTE);
                 window.location.reload();//не трогать иначе все сломается 
            } else {
                if (isDoctorRegistration) {
                    // Регистрация врача
                    data = await doctorregistration(docfirstName, docsecondName, doclastName,docLogin, docPassword, docEmail, docphoneNumber, docBirthdate, docAddress, docSnils, docPolis, docPassport,  docAge, docSpecialityId);
                } else {
                    // Обычная регистрация
                    data = await registration(registrationIdentifier, registrationPassword, email);
                }
            }

          

            if (Role === "ADMIN") {
                admin.setAdmin(admin);
                admin.setIsAuth(true);
                console.log("eto admin")
            } else if (Role === "USER") {
                user.setUser(user);
                user.setIsAuth(true);
                console.log("eto user")
            } else if (Role === "DOCTOR") {
                doctor.setDoctor(doctor);
                doctor.setIsAuth(true);
                console.log("eto doc")
            }

        } catch (error) {
            alert(error);
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center mt-4"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>

                <Form className="d-flex flex-column">
                    {isLogin && (
                        <>
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите login..."
                                value={loginIdentifier}
                                onChange={(e) => setLoginIdentifier(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                type="password"
                                placeholder="Введите ваш пароль..."
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </>
                    )}

                    {!isLogin && !isDoctorRegistration && (
                        <>
                            <Form.Control
                                className="mt-3"
                                placeholder="Имя"
                                value={registrationIdentifier}
                                onChange={(e) => setRegistrationIdentifier(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                type="password"
                                placeholder="Фамилия"
                                value={registrationPassword}
                                onChange={(e) => setRegistrationPassword(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="?"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </>
                    )}

                    {/* Добавленная форма для регистрации врача */}
                    {!isLogin && isDoctorRegistration && (
                        <>
                            <Form.Control
                                className="mt-3"
                                placeholder="Имя"
                                value={docfirstName}
                                onChange={(e) => setDocFirstname(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Фамилия"
                                value={docsecondName}
                                onChange={(e) => setDocsecondName( e.target.value )}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Отчество"
                                value={doclastName}
                                onChange={(e) => setDoclastName(e.target.value )}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Login"
                                value={docLogin}
                                onChange={(e) => setDocLogin(e.target.value )}
                            />
                            <Form.Control
                                className="mt-3"
                                type="password"
                                placeholder="Password"
                                value={docPassword}
                                onChange={(e) => setDocPassword(e.target.value )}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Email"
                                value={docEmail}
                                onChange={(e) => setDocEmail(e.target.value )}
                            />

                            <Form.Control
                                className="mt-3"
                                // type="date"
                                placeholder="Birthdate"
                                value={docBirthdate}
                                onChange={(e) => setDocBirthdate(e.target.value )}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Address"
                                value={docAddress}
                                onChange={(e) => setDocAddress(e.target.value )}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="SNILS"
                                value={docSnils}
                                onChange={(e) => setDocSnils(e.target.value )}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Polis"
                                value={docPolis}
                                onChange={(e) => setDocPolis(e.target.value )}
                            />


                            <Form.Control
                                className="mt-3"
                                placeholder="Phone number"
                                value={docphoneNumber}
                                onChange={(e) => setDocphoneNumber(e.target.value )}
                            />

                            <Form.Control
                                className="mt-3"
                                placeholder="Возраст"
                                value={docAge}
                                onChange={(e) => setDocAge(e.target.value )}
                            />
                                                        <Form.Control
                                className="mt-3"
                                placeholder="паспорт"
                                value={docPassport}
                                onChange={(e) => setDocPassport(e.target.value )}
                            />

                            <Form.Control
                                className="mt-3"
                                placeholder="специальность"
                                value={docSpecialityId}
                                onChange={(e) => setDocSpecialityId(e.target.value )}
                            />



                        </>
                    )}

                    <Row className="d-flex mt-3 justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ? (
                            <div>
                                Нет аккаунта?{" "}
                                <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
                            </div>
                        ) : (
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        )}

                        {/* Ссылка на регистрацию врача */}
                        <div>
                            Регистрация врача <NavLink to={DOCTORREGISTRATION_ROUTE} onClick={() => setIsDoctorRegistration(true)}>Здесь</NavLink>
                        </div>

                        <Button className="mt-3" variant={"outline-success"} onClick={click}>
                            {isLogin ? "Войти" : "Регистрация"}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;

import React, { useContext } from "react";
import { Context } from "../index";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSignInAlt, faSignOutAlt, faUserCog, faUser, faClipboardList, faClinicMedical } from "@fortawesome/free-solid-svg-icons";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  HOME_ROUTE,
  PINFO_ROUTE,
  DOC_ROUTE,
  RECEPTIONS_USER,
  CABINET_USER,
  CABINET_DOC,
} from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const NavBar = observer(() => {
  const { user, admin, doctor } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    admin.setAdmin({});
    doctor.setDoctor({});
    user.setIsAuth(false);
    admin.setIsAuth(false);
    doctor.setIsAuth(false);

    localStorage.removeItem("token");
    console.log("Токен удален");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to={HOME_ROUTE} className="me-auto">
          <FontAwesomeIcon icon={faClinicMedical} /> MedBonch
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {admin.isAuth && (
              <>
                <Button
                  as={NavLink}
                  to={ADMIN_ROUTE}
                  variant="outline-light"
                  className="me-2"
                >
                  <FontAwesomeIcon icon={faUserCog} /> Админ
                </Button>
                <Button
                  variant="outline-light"
                  onClick={logOut}
                  className="me-2"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} /> Выйти
                </Button>
              </>
            )}
            {user.isAuth && (
              <>
                <Button
                  as={NavLink}
                  to={PINFO_ROUTE}
                  variant="outline-light"
                  className="me-2"
                >
                  <FontAwesomeIcon icon={faClipboardList} /> Записаться
                </Button>
                <Button
                  as={NavLink}
                  to={RECEPTIONS_USER}
                  variant="outline-light"
                  className="me-2"
                >
                  <FontAwesomeIcon icon={faClipboardList} /> Мои записи
                </Button>
                <Button
                  as={NavLink}
                  to={CABINET_USER}
                  variant="outline-light"
                  className="me-2"
                >
                  <FontAwesomeIcon icon={faUser} /> Кабинет
                </Button>
                <Button
                  variant="outline-light"
                  onClick={logOut}
                  className="me-2"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} /> Выйти
                </Button>
              </>
            )}
            {doctor.isAuth && (
              <>
                <Button
                  as={NavLink}
                  to={DOC_ROUTE}
                  variant="outline-light"
                  className="me-2"
                >
                  <FontAwesomeIcon icon={faUserCog} /> Док
                </Button>

                <Button
                  as={NavLink}
                  to={CABINET_DOC}
                  variant="outline-light"
                  className="me-2"
                >
                  <FontAwesomeIcon icon={faUserCog} /> Кабинет
                </Button>

                <Button
                  variant="outline-light"
                  onClick={logOut}
                  className="me-2"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} /> Выйти
                </Button>
              </>
            )}
            {!admin.isAuth && !user.isAuth && !doctor.isAuth && (
              <Button
                as={NavLink}
                to={LOGIN_ROUTE}
                variant="outline-light"
                className="me-2"
              >
                <FontAwesomeIcon icon={faSignInAlt} /> Авторизация
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default NavBar;

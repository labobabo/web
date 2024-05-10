import React, { useContext } from "react";
import { Context } from "../index";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  HOME_ROUTE,
  PINFO_ROUTE,
  DOC_ROUTE,
} from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Role } from "../http/UserAPI";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const { admin } = useContext(Context);
  const { doctor } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    admin.setAdmin({});
    doctor.setDoctor({});
    user.setIsAuth(false);
    admin.setIsAuth(false);
    doctor.setIsAuth(false);

    localStorage.removeItem("token", () => {
      console.log("Токен удален");
      // Код, который нужно выполнить после удаления токена
    });
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink style={{ color: "white" }} to={HOME_ROUTE}>
          Пожуй пилюлю
        </NavLink>

        {admin.isAuth || user.isAuth || doctor.isAuth  ? (
          <Nav className="ml-auto" style={{ color: "white" }}>
            {admin.isAuth && (
              <>
                <Button
                  variant={"outline-light"}
                  onClick={() => navigate(ADMIN_ROUTE)}
                >
                  Админ
                </Button>
                <Button
                  variant={"outline-light"}
                  onClick={() => logOut()}
                  className="ml-2"
                >
                  Выйти
                </Button>
              </>
            )}
            {user.isAuth && (
              <>
                <Button
                  variant={"outline-light"}
                  onClick={() => navigate(PINFO_ROUTE)} // Здесь должен быть путь для пользователя
                  className="ml-2"
                >
                  Пользователь
                </Button>

                <Button
                  variant={"outline-light"}
                  onClick={() => logOut()}
                  className="ml-2"
                >
                  Выйти
                </Button>


              </>
            )}
            {doctor.isAuth && (
              <>
                <Button
                  variant={"outline-light"}
                  onClick={() => navigate(DOC_ROUTE)} // Здесь должен быть путь для пользователя
                  className="ml-2"
                >
                  док
                </Button>

                <Button
                  variant={"outline-light"}
                  onClick={() => logOut()}
                  className="ml-2"
                >
                  Выйти
                </Button>


              </>
            )}
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );

});

export default NavBar;

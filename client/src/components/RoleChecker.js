// RoleChecker.js
import React, { useContext, useEffect } from "react";
import { Context } from "../index";


const RoleChecker = ({ onRoleChecked }) => {
  const { user, admin } = useContext(Context);

  useEffect(() => {
    const role = localStorage.getItem("role");
    console.log("Роль пользователя:", role); // Добавляем лог для отладки

    if (role === "ADMIN") {
      admin.setAdmin(true);
      admin.setIsAuth(true);
      console.log("Это админ");
    } else if (role === "USER") {
      user.setUser(true);
      user.setIsAuth(true);
      console.log("Это пользователь");
    }

    onRoleChecked(); // Вызываем функцию обратного вызова после завершения проверки ролей
  }, [user, admin, onRoleChecked]);

  return null; // Компонент не рендерит ничего
};

export default RoleChecker;

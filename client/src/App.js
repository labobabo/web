import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check, Role } from "./http/UserAPI";
import { Spinner } from "react-bootstrap";


const App = observer(() => {
  const { user } = useContext(Context);
  const { admin } = useContext(Context);
  const { doctor } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then((data) => {
        const role = localStorage.getItem("role");
        console.log(role);

        if (role === 'USER'){
    
          user.setUser(true);
          user.setIsAuth(true);
          
        }else if(role === 'ADMIN'){
            
          admin.setAdmin(true);
          admin.setIsAuth(true);
        }
        else if(role === 'DOCTOR'){
            
          doctor.setDoctor(true);
          doctor.setIsAuth(true);
        }
        

   
          // admin.setAdmin(true);
          // admin.setIsAuth(true);
          
        
          // user.setUser(true);
          // user.setIsAuth(true);
          
        
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner animation={"grow"} />;
  }
  // Проверка наличия токена при загрузке приложения
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
console.log(role);
console.log(token);

const isAuthenticated = !!token; // Преобразование токена в булево значение
const isAdmin = null;
const isUser = null;


if (role === 'USER'){
  if (isAuthenticated) {
    // Если токен есть, пользователь аутентифицирован
    user.setIsAuth(true);
    
  } else {
    // Если токена нет, пользователь неаутентифицирован
    user.setIsAuth(false);
    
  }
}else if(role === 'ADMIN'){
  if (isAuthenticated) {
    // Если токен есть, пользователь аутентифицирован
    
    admin.setIsAuth(true);
  } else {
    // Если токена нет, пользователь неаутентифицирован
  
    admin.setIsAuth(false);
  }
}
else if(role === 'DOCTOR'){
  if (isAuthenticated) {
    // Если токен есть, пользователь аутентифицирован
    
    doctor.setIsAuth(true);
  } else {
    // Если токена нет, пользователь неаутентифицирован
  
    doctor.setIsAuth(false);
  }
}



// if (isAuthenticated) {
//   // Если токен есть, пользователь аутентифицирован
//   user.setIsAuth(true);
//   admin.setIsAuth(true);
// } else {
//   // Если токена нет, пользователь неаутентифицирован
//   user.setIsAuth(false);
//   admin.setIsAuth(false);
// }


  



  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter />
    </BrowserRouter>
  );
});
export default App;
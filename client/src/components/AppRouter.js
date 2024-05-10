import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { authRoutes, publishRoutes, adminRoutes, docRoutes } from "../routes";
import Home from "../pages/Home";
import { Context } from "../index";


const AppRouter = () => {
    const { user } = useContext(Context);
    const { admin } = useContext(Context);
    const { doctor } = useContext(Context);
    console.log(user)
    console.log(admin)
    console.log(doctor)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} exact />
            ))}

            {admin.isAuth && adminRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} exact />
            ))}

            {doctor.isAuth && docRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} exact />
            ))}


            {publishRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} exact />
            ))}
            <Route path="*" element={<Home />} replace={true} />

        </Routes>
    );
};
export default AppRouter;
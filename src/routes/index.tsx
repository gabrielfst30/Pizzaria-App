import React from "react";

import { View } from "react-native/types";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

function Routes(){
    const isAuth = false;
    const loading = false;


    //Se tiver logado <AppRoutes/> se não <AuthRoutes/>
    return(
        isAuth ? <AppRoutes/> : <AuthRoutes/>
    )
}

export default Routes;
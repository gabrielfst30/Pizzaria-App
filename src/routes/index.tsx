import React, { useContext } from "react";

import { View, ActivityIndicator} from "react-native";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

import { AuthContext } from "../contexts/AuthContext";

function Routes(){
    const { isAuthenticated } = useContext(AuthContext) //PEGANDO O CONTEXTO PARA LIBERAR AS ROTAS CASO O USER ESTEJA LOGADO
    const loading = false;

    if(loading){
        return(
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#1D1D2E',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >    

                <ActivityIndicator size={60} color="#FFF" />
            </View>
        )
    }



    //Se tiver logado/autenticado <AppRoutes/> se não <AuthRoutes/>
    return(
        isAuthenticated ? <AppRoutes/> : <AuthRoutes/>
    )
}

export default Routes;
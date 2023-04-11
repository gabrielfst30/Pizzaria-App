import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../pages/SignIn';

//Criando Stack Navigator
const Stack = createNativeStackNavigator();

//Rotas que qualquer um pode acessar
function AuthRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default AuthRoutes;
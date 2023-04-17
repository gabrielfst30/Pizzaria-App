import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../pages/Dashboard';
import Order from '../pages/Order';

//Tipando as rotas para o typescript
export type StackParamsList = {
    Dashboard: undefined,
    Order: {//detalhando a order
        number: number | string;
        order_id: string;
    };
}


const Stack = createNativeStackNavigator<StackParamsList>();

//Rotas privadas para users logados
function AppRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="Dashboard" 
            component={Dashboard} 
            options={{ headerShown: false }}
            />

            <Stack.Screen
             name="Order" 
             component={Order} 
             options={{ headerShown: false }}
            />
        </Stack.Navigator>
        
    )
}

export default AppRoutes;
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../pages/Dashboard';
import Order from '../pages/Order';
import FinishOrder from '../pages/FinishOrder';

//Tipando as rotas para o typescript
export type StackParamsList = {
    Dashboard: undefined,
    Order: {//detalhando a order
        number: number | string;
        order_id: string;
    };
    FinishOrder: {
        number: number | string;
        order_id: string;
    }
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

            <Stack.Screen
              name="FinishOrder" 
              component={FinishOrder} 
              options={{ 
                title: 'Finalizando',
                headerStyle:{
                    backgroundColor: '#1d1d2e'
                },
                headerTintColor: '#fff'
              }}
            />
        </Stack.Navigator>
        
    )
}

export default AppRoutes;
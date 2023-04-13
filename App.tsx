import { StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";

import { AuthProvider } from "./src/contexts/AuthContext";

//importando o navigation container porque o navigation pede
//Routes chama as rotas para ser mostrada na página
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
          <StatusBar backgroundColor="#1d1d2e" barStyle="light-content" translucent={false}/>
          <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

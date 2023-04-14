import React, { useState, useEffect, createContext, ReactNode } from "react";

//SALVAR OS DADOS OFFLINE
import AsyncStorage from "@react-native-async-storage/async-storage";

//importando API
import { api } from "../services/api"

//Tipagem do Context
type AuthContextData = { 
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (loginInfo: SignInProps) => Promise<void> //tipando a função de login
    loadingAuth: boolean;
    loading: boolean;
    signOut: () => Promise<void>
}

//Tipando dados do user
type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

//Children vai ajudar na renderização da página
type AuthProviderProps = {
    children: ReactNode;
}

//Tipando dados do login
type SignInProps = {
    email: string;
    password: string;
}

//Criando context
export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps){
    //o user seguirá o tipo UserProps
    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    })

    //Loading de login
    const [loadingAuth, setLoadingAuth] = useState(false) //falso - loading desligado
    const [loading, setLoading] = useState(true)

    //convertendo o user para booleano com '!!', se o user estiver preenchido indica que o usuario esta logado
    const isAuthenticated =  !!user.name;


    useEffect(() => {

        async function getUser(){
        //Pegar os dados salvos do user     
        const userInfo = await AsyncStorage.getItem('@sujeitopizzaria');
        let hasUser: UserProps = JSON.parse(userInfo || '{}');

            //Verificar se recebemos a informações dele
            if(Object.keys(hasUser).length > 0){
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`

                setUser({
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token
                })

            }

            setLoading(false)
        }

         getUser();

    },[])

    //Logando user
    async function signIn({ email, password }: SignInProps){
        setLoadingAuth(true); //quando clicar no login o loading fica true

        //Mandando login do usuário para API  !***********!
        try{
            const response = await api.post('/session',{
                email,
                password
            });

            //console.log(response.data)

            //PEGANDO OS DADOS DO USUÁRIO
            const {id, name, token} = response.data

            //TRAZENDO O RESPONSE E TRANSFORMANDO EM UM OBJETO
            const data = {
               ...response.data
            }

            //SALVANDO NO ASYNC STORAGE ID, NAME E TOKEN PARA LOGIN
            await AsyncStorage.setItem('@sujeitopizzaria', JSON.stringify(data))

            //DEPOIS QUE LOGAR E TIVER O TOKEN, AUTORIZE TODOS OS OUTROS REQUESTS QUE NECESSITE DE LOGIN COM AUTENTICAÇÃO
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            //PREENCHE A USE STATE USER COM OS DADOS DO USUÁRIO
            setUser({
                id,
                name,
                email,
                token

            })

            setLoadingAuth(false)

        //Caso der errado:
        }catch(error){
            console.log('Erro ao acessar', error)
            setLoadingAuth(false); //se o login der erro o loading para de rodar
        }

    }

    //Limpando o AsyncStorage para quando o usuário deslogar do sistema
    async function signOut(){
        await AsyncStorage.clear()
        .then (() => {
            setUser({
                id: '',
                name: '',
                email: '',
                token: ''
            })
        })
    }


    //todas nossa páginas serão renderizadas no provider e enviadas para routes
    return(
        <AuthContext.Provider value = {{ user, isAuthenticated, signIn, loading, loadingAuth, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}
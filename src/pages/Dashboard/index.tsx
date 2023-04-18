import React, { useState } from "react";
import { View, Text, Button, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native"; 

//importando tipagem das rotas
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

//api
import { api } from "../../services/api";

export default function Dashboard(){
    //criando navigation
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    //recebe o numero da mesa
    const [table, setTable] = useState('');

    async function openOrder(){
        if(table == ''){
            return alert('Preencha o número da mesa!')
        }

        //enviando para api o numero da table
        const response = await api.post('/order',{
            table: Number(table) //convert to number
        })

        //console.log(response.data)

        //faz a requisição de abrir mesa e navega para a proxima tela!.
        navigation.navigate('Order', { number: table, order_id: response.data.id })

        setTable('')
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Novo pedido</Text>
            
            <TextInput
                placeholder="Numero da mesa"
                placeholderTextColor='#bdb7b7'
                style={styles.input}
                keyboardType="numeric"
                value={table}
                onChangeText={setTable}
            />

            <TouchableOpacity style={styles.button} onPress={openOrder}>
                <Text style={styles.buttonText}>Abrir mesa</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#1d1d2e',
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 24,
    },
    input:{
        width: '90%',
        height: 60,
        backgroundColor: '#101026',
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        fontSize: 22,
        color: '#FFF',
    },
    button:{
        width: '90%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        fontSize: 18,
        color: '#101026',
        fontWeight: 'bold'
    }
})
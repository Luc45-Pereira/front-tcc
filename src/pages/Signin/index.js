import React from "react";
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";

import { useNavigation } from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';

import { toLogin } from '../../client/client';


export default function Signin() {
    const [email, login] = useState("") //Armazenando os valores
    const [senha, password] = useState("") //Armazenando os valores
    const navigation = useNavigation();
    const handleLogin = async () => {
        console.log("cheguei");
        let response = await toLogin(email, senha);
        console.log(response);
        if (response == true) {
            navigation.navigate("pasta");
        }
    }
    return (
        <View style={styles.container}>
            <Animatable.View delay={1000} animation="fadeInLeft" style={styles.containerHeader} >
                <Text style={styles.message}>Signin</Text>
            </Animatable.View>

            <Animatable.View delay={1000} animation="fadeInUp" style={styles.containerForm} >
                <Text style={styles.title}>login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu email ..."
                    autoCorrect={false}
                    value={email}
                    onChangeText={login}/>
                <Text style={styles.title}>Senha</Text>
                <TextInput
                style={styles.input}
                placeholder="Digite sua senha ..."
                autoCorrect={false}
                value={senha}
                onChangeText={password}
                secureTextEntry={true} // Isso mascara a entrada da senha
            />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
                </TouchableOpacity>
            </Animatable.View>
           
        </View>
    );
    
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#65D8DA",
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    message: {
        fontSize: 32,
        color: "#FFF",
        fontWeight: "bold",
    },
    containerForm: {
        flex: 1,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    title: {
        fontSize: 20,
        color: "#65D8DA",
        fontWeight: "bold",
        marginTop: 28,
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
        borderColor: "#65D8DA",
    },
    button: {
        backgroundColor: "#65D8DA",
        width: '100%',
        marginTop: 14,
        borderRadius: 8,
        paddingVertical: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    buttonRegister: {
        marginTop: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    registerText: {
        color: "#a1a1a1",
    },
});
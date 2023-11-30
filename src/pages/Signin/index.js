import React from "react";
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";

import { useNavigation } from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';

import { toLogin } from '../../client/client';

import {styles} from '../styles';


export default function Signin() {
    const [errorMessage, setErrorMessage] = useState(null);

    const [email, login] = useState("") //Armazenando os valores
    const [senha, password] = useState("") //Armazenando os valores
    const navigation = useNavigation();
    const handleLogin = async () => {

        let response = await toLogin(email, senha);

        if (response == true) {
            navigation.navigate("dashboard");
        }
        else {
            setErrorMessage("Credenciais inválidas. Por favor, tente novamente.");
        }
    }
    return (
        <View style={styles.container}>
            {errorMessage && (
                <View style={styles.errorMessage}>
                    <Text style={styles.errorMessageText}>{errorMessage}</Text>
                </View>
            )}
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



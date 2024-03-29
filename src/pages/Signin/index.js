import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather'; // Importe o ícone
import { toLogin, getUser } from '../../client/client';
import { styles } from '../styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Signin() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [email, setEmail] = useState(""); // Armazenando o email
    const [senha, setSenha] = useState(""); // Armazenando a senha
    const [showPassword, setShowPassword] = useState(false);

    const navigation = useNavigation();

    const handleLogin = async () => {
        let response = await toLogin(email, senha);

        if (response == true) {
            navigation.navigate("dashboard");
        } else {
            setErrorMessage("Credenciais inválidas. Por favor, tente novamente.");
        }
    }

    const login = async () => {
        const userData = await AsyncStorage.getItem('userData');

        if (userData) {
            try {
                let response = await getUser();
                if (response) {
                    navigation.navigate("configProfile");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    login();
    return (
        <View style={styles.containerFormSignin}>
             <View >
                <Animatable.Image 
                    animation="flipInY"
                    duration={1500}
                    source={require("../../../assets/logo.png")} 
                    style={{width: '100%'}}
                    resizeMode="contain"
                    />
            </View>

            <Animatable.View delay={1000} animation="fadeInUp" >
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu email ..."
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.title}>Senha</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua senha ..."
                        autoCorrect={false}
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                        <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} color="#65D8DA" />
                    </TouchableOpacity>
                </View>

                {errorMessage && (
                    <View style={styles.errorMessage}>
                        <Text style={styles.errorMessageText}>{errorMessage}</Text>
                    </View>
                )}

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

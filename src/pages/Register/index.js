import React from "react";
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";

import { useNavigation } from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';

import MaskInput, {Masks} from 'react-native-mask-input';

import { toRegister } from '../../client/client';


export default function Register() {
    const [email, login] = useState("") //Armazenando os valores
    const [senha, password] = useState("") //Armazenando os valores
    const [nome, name] = useState("") //Armazenando os valores
    const [dataNascimento, birthDate] = useState("") //Armazenando os valores
    const [cpf, setCpf] = useState("") //Armazenando os valores


    const navigation = useNavigation();
    const handleRegister = async () => {
        console.log("cheguei");
        let response = await toRegister(email, senha, nome, dataNascimento, cpf);
        console.log(response);
        if (response) {
            navigation.navigate("SignIn");
        }
    }
    return (
        <View style={styles.container}>
            <Animatable.View delay={1000} animation="fadeInLeft" style={styles.containerHeader} >
                <Text style={styles.message}>Register</Text>
            </Animatable.View>

            <Animatable.View delay={1000} animation="fadeInUp" style={styles.containerForm} >
                <Text style={styles.title}>Nome</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu nome ..."
                    autoCorrect={false}
                    value={nome}
                    onChangeText={name}/>
                <Text style={styles.title}>Email</Text>
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
                    onChangeText={password}/>
                <Text style={styles.title}>Confirmar Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua senha novamente ..."
                    autoCorrect={false}
                    value={senha}
                    onChangeText={password}/>
                <Text style={styles.title}>Data de Nascimento</Text>
                <MaskInput
                    style={styles.input}
                    placeholder="Digite sua data de nascimento ..."
                    autoCorrect={false}
                    value={dataNascimento}
                    onChangeText={birthDate}
                    mask={Masks.DATE_YYYYMMDD}/>
                <Text style={styles.title}>CPF</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu CPF ..."
                    autoCorrect={false}
                    value={cpf}
                    onChangeText={setCpf}/>

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister}>
                    <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#38A69D",
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
        color: "#38A69D",
        fontWeight: "bold",
        marginTop: 28,
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
        borderColor: "#38A69D",
    },
    button: {
        backgroundColor: "#38A69D",
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
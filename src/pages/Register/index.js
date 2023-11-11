import React from "react";
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";

import { useNavigation } from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';
import {styles} from '../styles';

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
        // scroll true
        <ScrollView style={styles.container}>
        
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

                
            </Animatable.View>
        </ScrollView>
    );
}


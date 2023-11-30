import React from "react";
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";

import { useNavigation } from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';

import MaskInput, {Masks} from 'react-native-mask-input';
import {styles} from '../styles';

import { setEntrada } from '../../client/client';
import Header from "../../../components/Header";



export default function Register() {
    const [descricao, Descricao] = useState("") //Armazenando os valores
    const [valor, Valor] = useState("") //Armazenando os valores
    const [tag, Tag] = useState("") //Armazenando os valores
    const [detalhes, Detalhes] = useState("") //Armazenando os valores
    
    const navigation = useNavigation();
    const handleRegister = async () => {
        let response = await setEntrada(valor, descricao, tag, detalhes);
        if (response) {
            navigation.navigate("dashboard");
        }
    }
    return (
        <ScrollView  style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <Header />
            <Animatable.View delay={1000} animation="fadeInLeft" style={styles.containerHeader} >
                <Text style={styles.message}>Entrada</Text>
            </Animatable.View>

            <Animatable.View delay={1000} animation="fadeInUp" style={styles.containerForm} >
                <Text style={styles.title}>Valor</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite um valor..."
                    autoCorrect={false}
                    keyboardType="decimal-pad"
                    value={valor}
                    onChangeText={Valor}/>
                <Text style={styles.title}>Descrição</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite uma descrição..."
                    autoCorrect={false}
                    value={descricao}
                    onChangeText={Descricao}/>
                <Text style={styles.title}>Tag</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite uma Tag..."
                    autoCorrect={false}
                    value={tag}
                    onChangeText={Tag}/>
                <Text style={styles.title}>Detalhes</Text>
                <MaskInput
                    style={styles.input}
                    placeholder="Digite os detalhes..."
                    autoCorrect={false}
                    value={detalhes}
                    onChangeText={Detalhes}
                    />
                
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>

            </Animatable.View>
        </ScrollView>
    );
}


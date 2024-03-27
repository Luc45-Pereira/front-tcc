import React from "react";
import { useState, useEffect } from 'react';
import { View, Text, Picker, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";

import { useNavigation } from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';

import MaskInput, {Masks} from 'react-native-mask-input';
import {styles} from '../styles';


import { setEntrada, setSaida } from '../../client/client';
import Header from "../../../components/Header";
import BottomMenu from "../menu";



export default function Register() {
    const [descricao, Descricao] = useState("") //Armazenando os valores
    const [valor, Valor] = useState("") //Armazenando os valores
    const [tag, Tag] = useState("") //Armazenando os valores
    const [detalhes, Detalhes] = useState("") //Armazenando os valores
    const [selectedOption, setSelectedOption] = useState(''); // Estado para armazenar a opção selecionada

    // Função para definir a opção como 'entrada'
    const selectEntrada = () => {
        setSelectedOption('entrada');
    };

    // Função para definir a opção como 'saída'
    const selectSaida = () => {
        setSelectedOption('saída');
    };
    
    const navigation = useNavigation();
    const handleRegister = async () => {
        let response;
        if (selectedOption === "saída") {
            response = await setSaida(valor, descricao, tag, detalhes);
        } else {
            response = await setEntrada(valor, descricao, tag, detalhes);
        }
        if (response) {
            navigation.navigate("dashboard");
        }
    }

    const stylesOptions = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          },
          optionButton: {
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#65D8DA',
            marginRight: 10,
            marginTop: 10,
          },
          optionText: {
            fontSize: 16,
          },
          selectedOption: {
            backgroundColor: '#65D8DA',
          },
    });


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                <Animatable.View delay={1000} animation="fadeInUp" style={styles.containerForm} >
                    <Text style={styles.title}>Valor</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite um valor..."
                        autoCorrect={false}
                        keyboardType="decimal-pad"
                        value={valor}
                        onChangeText={Valor}/>
                    <Text style={styles.title}>Tipo</Text>
                    <TouchableOpacity onPress={selectEntrada} style={[stylesOptions.optionButton, selectedOption === 'entrada' && stylesOptions.selectedOption]}>
                        <Text style={stylesOptions.optionText}>Entrada</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={selectSaida} style={[stylesOptions.optionButton, selectedOption === 'saída' && stylesOptions.selectedOption]}>
                        <Text style={stylesOptions.optionText}>Saída</Text>
                    </TouchableOpacity>

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
            <BottomMenu />
        </View>
    );
}


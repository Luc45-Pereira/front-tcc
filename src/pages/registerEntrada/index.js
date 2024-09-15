import ModalSelector from 'react-native-modal-selector';
import React from "react";
import { useState, useEffect } from 'react';
import { View, Text, Picker, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";

import { useNavigation } from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';

import MaskInput, {Masks} from 'react-native-mask-input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import RNPickerSelect from 'react-native-picker-select';
import {styles} from '../styles';


import { setEntrada, setSaida } from '../../client/client';
import Header from "../../../components/Header";
import BottomMenu from "../menu";

export default function Register() {
    const [descricao, Descricao] = useState("");
    const [valor, Valor] = useState("");
    const [tag, Tag] = useState("");
    const [detalhes, Detalhes] = useState("");
    const [selectedOption, setSelectedOption] = useState('entrada');
    const [selectedIcon, setSelectedIcon] = useState();

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
            let valorTranslate = valor.replace("R$", "").replace(",", ".");
            valorTranslate = parseFloat(valorTranslate);
            console.log(valorTranslate);
            response = await setSaida(valorTranslate, descricao, selectedIcon, detalhes);
        } else {
            console.log(valor);
            // tranformar valor para float
            let valorTranslate = valor.replace("R$", "").replace(",", ".");
            valorTranslate = parseFloat(valorTranslate);
            console.log(valorTranslate);
            response = await setEntrada(valorTranslate, descricao, selectedIcon, detalhes);
        }
        if (response) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'dashboard' }],
            });
        }
    }

    const iconOptions = [
        { label: 'Compra', key: 'shopping-outline' },
        { label: 'Cofre', key: 'piggy-bank-outline' },
        { label: 'Transferência', key: 'bank-transfer' },
        // Adicione mais ícones conforme necessário
    ];

    const stylesOptions = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          },
          optionButton: {
            padding: 10,
            width: "45%",
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
                    <Text style={styles.title}>Valor*</Text>
                    <MaskInput
                        style={styles.input}
                        placeholder="Digite um valor..."
                        autoCorrect={false}
                        keyboardType="decimal-pad"
                        value={valor}
                        onChangeText={Valor}
                        mask={Masks.BRL_CURRENCY}/>
                    <Text style={styles.title}>Tipo*</Text>
                    <View style={stylesOptions.container}>
                        <TouchableOpacity onPress={selectEntrada} style={[stylesOptions.optionButton, selectedOption === 'entrada' && stylesOptions.selectedOption]}>
                            <Text style={stylesOptions.optionText}>Entrada</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={selectSaida} style={[stylesOptions.optionButton, selectedOption === 'saída' && stylesOptions.selectedOption]}>
                            <Text style={stylesOptions.optionText}>Saída</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.title}>Descrição*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite uma descrição..."
                        autoCorrect={false}
                        value={descricao}
                        onChangeText={Descricao}/>
                    <Text style={styles.title}>Tag</Text>
                    {/* <TextInput
                        style={styles.input}
                        placeholder="Digite uma Tag..."
                        autoCorrect={false}
                        value={tag}
                        onChangeText={Tag}/> */}
                    {selectedIcon && <Icon name={selectedIcon} size={30} />}
                    <ModalSelector
                        data={iconOptions}
                        initValue="Selecione um ícone"
                        onChange={(option) => setSelectedIcon(option.key)}
                        cancelText="Cancelar"
                    />
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


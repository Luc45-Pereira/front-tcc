import ModalSelector from 'react-native-modal-selector';
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute
import * as Animatable from 'react-native-animatable';
import MaskInput, { Masks } from 'react-native-mask-input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { setEntrada, setSaida, updateTransaction } from '../../client/client'; // Assume que você tem uma função de update
import Header from "../../../components/Header";
import {styles} from '../styles';
import BottomMenu from "../menu";

export default function Register() {
    const route = useRoute(); // Pegue os parâmetros da rota
    const navigation = useNavigation();
    
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [tag, setTag] = useState("");
    const [detalhes, setDetalhes] = useState("");
    const [selectedOption, setSelectedOption] = useState('entrada');
    const [selectedIcon, setSelectedIcon] = useState();
    
    // Verifica se está no modo de edição (se existe transação)
    useEffect(() => {
        if (route.params?.transaction) {
            const { descricao, valor, tag, detalhes, type, icon } = route.params.transaction;

            let tipo = type === 'entrada' ? 'entrada' : 'saida';

            setDescricao(descricao);
            setValor(Number(valor).toFixed(2));
            setTag(tag);
            setDetalhes(detalhes);
            setSelectedOption(tipo); // 'entrada' ou 'saída'
            setSelectedIcon(icon);
        }
    }, [route.params]);

    // Função para definir a opção como 'entrada'
    const selectEntrada = () => setSelectedOption('entrada');

    // Função para definir a opção como 'saída'
    const selectSaida = () => setSelectedOption('saída');

    const handleRegister = async () => {
        let valorTranslate = valor.replace("R$", "").replace(",", ".");
        valorTranslate = parseFloat(valorTranslate);

        let response;
        if (route.params?.transaction) {
            // Modo de edição
            const updatedTransaction = {
                ...route.params.transaction,
                descricao,
                valor: valorTranslate,
                detalhes,
                icon: selectedIcon,
                tipo: selectedOption,
            };

            let type = (route.params.transaction.type === 'entrada') ? true : false;

            response = await updateTransaction(updatedTransaction, type);
        } else {
            // Modo de cadastro
            if (selectedOption === "saída") {
                response = await setSaida(valorTranslate, descricao, selectedIcon, detalhes);
            } else {
                response = await setEntrada(valorTranslate, descricao, selectedIcon, detalhes);
            }
        }

        if (response) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'dashboard' }],
            });
        }
    };

    const iconOptions = [
        { label: 'Compra', key: 'shopping-outline' },
        { label: 'Cofre', key: 'piggy-bank-outline' },
        { label: 'Transferência', key: 'bank-transfer' },
        // Adicione mais ícones conforme necessário
    ];

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
                        onChangeText={setValor}
                        mask={Masks.BRL_CURRENCY}
                    />
                    
                    <Text style={styles.title}>Tipo*</Text>
                    <View style={stylesOptions.container}>
                        <TouchableOpacity onPress={(route.params?.transaction) ? '' : selectEntrada } style={[stylesOptions.optionButton, selectedOption === 'entrada' && stylesOptions.selectedOption]}>
                            <Text style={stylesOptions.optionText}>Entrada</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={(route.params?.transaction) ? '' : selectSaida} style={[stylesOptions.optionButton, selectedOption === 'saída' && stylesOptions.selectedOption]}>
                            <Text style={stylesOptions.optionText}>Saída</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.title}>Descrição*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite uma descrição..."
                        autoCorrect={false}
                        value={descricao}
                        onChangeText={setDescricao}
                    />

                    <Text style={styles.title}>Tag</Text>
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
                        onChangeText={setDetalhes}
                    />
                    
                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>
                            {route.params?.transaction ? 'Atualizar' : 'Salvar'}
                        </Text>
                    </TouchableOpacity>
                </Animatable.View>
            </ScrollView>
            <BottomMenu />
        </View>
    );
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

import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather'; // Importe o ícone
import { styles } from '../styles';
import MaskInput, { Masks } from 'react-native-mask-input';
import { toRegister } from '../../client/client';

export default function Register() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [nome, setNome] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [cpf, setCpf] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigation = useNavigation();

    const handleRegister = async () => {
        let response = await toRegister(email, senha, nome, dataNascimento, cpf);
        if (response) {
            navigation.navigate("SignIn");
        }
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <Animatable.View delay={1000} animation="fadeInLeft" style={styles.containerHeader} >
                <Text style={styles.message}>Register</Text>
            </Animatable.View>

            <Animatable.View delay={1000} animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Nome</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu nome ..."
                    autoCorrect={false}
                    value={nome}
                    onChangeText={setNome} />
                <Text style={styles.title}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu email ..."
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail} />
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
                <Text style={styles.title}>Confirmar Senha</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua senha novamente ..."
                        autoCorrect={false}
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha}
                        secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <Icon name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="#65D8DA" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>Data de Nascimento</Text>
                <MaskInput
                    style={styles.input}
                    placeholder="Digite sua data de nascimento ..."
                    autoCorrect={false}
                    value={dataNascimento}
                    onChangeText={setDataNascimento}
                    mask={Masks.DATE_YYYYMMDD} />
                <Text style={styles.title}>CPF</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu CPF ..."
                    autoCorrect={false}
                    value={cpf}
                    onChangeText={setCpf} />

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </Animatable.View>
        </ScrollView>
    );
}

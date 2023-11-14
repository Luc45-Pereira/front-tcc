import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {styles} from '../styles';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Header from '../../../components/Header';



const UserProfileScreen = () => {
  // Dados do usuário (substitua com seus próprios dados)
  const navigation = useNavigation();
  const user = {
    name: 'Nome do Usuário',
    email: 'usuario@email.com',
  };

  return (
    <View style={styles.container}>
      <Header />
        <Animatable.View delay={1000} animation="fadeInUp" style={styles.containerForm} >
            <Text style={stylesProfile.userName}>{user.name}</Text>
            <Text style={stylesProfile.userEmail}>{user.email}</Text>
            {/* Adicione mais informações do usuário conforme necessário */}
            <TouchableOpacity style={stylesProfile.button} onPress={() => navigation.navigate('entrada')}>
                    <Text style={stylesProfile.buttonText}>Cadastrar Entrada</Text>
                </TouchableOpacity>
        </Animatable.View>
    </View>
    
  );
};

const stylesProfile = StyleSheet.create({
    containerProfile: {
    flex: 1,
    paddingStart: '5%',
    paddingEnd: '5%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    },
    userName: {
    fontSize: 24,
    fontWeight: 'bold',
    // alinha topo
    textAlignVertical: 'top',
    },
    // centralize all
    center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    },
    buttonText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
        backgroundColor: "#65D8DA",
        padding: 2,
    },
    button: {
        backgroundColor: "#65D8DA",
        width: '100%',
        marginTop: 14,
        borderRadius: 8,
        paddingVertical: 8,
        justifyContent: "center",
        alignItems: "center",
    
    }

})

export default UserProfileScreen;

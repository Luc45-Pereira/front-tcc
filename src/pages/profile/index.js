import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Header from '../../../components/Header';
import { styles } from '../styles'; // Importe seus estilos aqui
import { getUser } from '../../client/client';



const stylesProfile = StyleSheet.create({
    containerProfile: {
        flex: 1,
        paddingStart: '0%',
        paddingEnd: '0%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: "#FFF",
        justifyContent: "flex-start",
    
        
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        // alinha topo
        textAlignVertical: 'top',
        height:30,
        marginTop: 50,
    },
    userEmail: {
      fontSize: 17,
        textAlignVertical: 'top',
        height:50,
        marginTop: 0,
    },
    // centralize all
    center: {
        flex: 6,
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
        marginTop: 4,
        borderRadius: 8,
        paddingVertical: 8,
        justifyContent: "center",
        alignItems: "center",

    }
});

const UserProfileScreen = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);

    // Busca os dados do usuário ao carregar o componente
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const User = await getUser();
          setUserData(User);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchUser();
  }, []);

    return (
        <View style={styles.container } contentContainerStyle={{ flexGrow: 1 }}>
            <Header />
            <Animatable.View delay={1000} animation="fadeInUp" style={styles.containerForm} >
                <Text style={stylesProfile.userName}>{userData ? userData.nome : 'Carregando...'}</Text>
                <Text style={stylesProfile.userEmail}>{userData ? userData.email : 'Carregando...'}</Text>
                {/* Adicione mais informações do usuário conforme necessário */}
                <TouchableOpacity style={stylesProfile.button} onPress={() => navigation.navigate('entrada')}>
                    <Text style={stylesProfile.buttonText}>Cadastrar Entrada</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
};

export default UserProfileScreen;


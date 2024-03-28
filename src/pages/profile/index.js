import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Header from '../../../components/Header';
import { styles } from '../styles'; // Importe seus estilos aqui
import { getUser } from '../../client/client';
import BottomMenu from '../menu';
import MaskInput, { Masks } from 'react-native-mask-input';



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
        verticalAlign: 'top',
        height:30,
        marginTop: 50,
    },
    userEmail: {
      fontSize: 17,
        verticalAlign: 'top',
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
          console.log(User);
          console.log(User.endereco.numero);
          setUserData(User);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchUser();
  }, []);

    return (
        <View style={styles.container } contentContainerStyle={{ flexGrow: 1 }}>
            <ScrollView style={styles.containerForm} >
                <Animatable.View delay={1000} animation="fadeInUp" >
                    <Text style={stylesProfile.userName}>{userData ? userData.nome : 'Carregando...'}</Text>
                    <Text style={stylesProfile.userEmail}>{userData ? userData.email : 'Carregando...'}</Text>
                    
                    <Text style={styles.title}>CPF</Text>
                    <TextInput
                        style={styles.input}
                        autoCorrect={false}
                        editable={false}
                        value={userData ? userData.cpf : 'Carregando...'}
                        />
                    <Text style={styles.title}>Data de Nascimento</Text>
                    <MaskInput
                        style={styles.input}
                        placeholder="Digite sua data de nascimento ..."
                        autoCorrect={false}
                        value={userData ? userData.data_nascimento : 'Carregando...'}
                        editable={false}
                        mask={Masks.DATE_YYYYMMDD} />
                    <Text style={styles.title}>Endereço</Text>
                    <TextInput
                        style={styles.input}
                        autoCorrect={false}
                        keyboardType="decimal-pad"
                        editable={false}
                        value={userData ? userData.endereco.rua : 'Carregando...'}
                        />
                    <Text style={styles.subTitle}>Numero</Text>
                    <TextInput
                        style={styles.input}
                        editable={false}
                        value={userData ? userData.endereco.numero.toString() : 'Carregando...'}
                        />
                    <Text style={styles.subTitle}>Estado</Text>
                    <TextInput
                        style={styles.input}
                        autoCorrect={false}
                        editable={false}
                        value={userData ? userData.endereco.estado : 'Carregando...'}
                        />
                    <Text style={styles.subTitle}>Referencia</Text>
                    <TextInput
                        style={styles.input}
                        autoCorrect={false}
                        editable={false}
                        value={userData ? userData.endereco.referencia : 'Carregando...'}
                        />
                </Animatable.View>
            </ScrollView>
            
            <BottomMenu />
        </View>
    );
};

export default UserProfileScreen;


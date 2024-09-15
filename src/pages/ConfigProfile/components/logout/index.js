import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { styles } from '../../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';


const stylesLogout = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        height: 50,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    menuItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: "#e0584f",
        width: '100%',
        // marginTop: 14,
        borderRadius: 8,
        paddingVertical: 8,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    menuItemSelected: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height:'100%',
        borderRadius: 10,
        borderBottomWidth: 0,
        borderWidth: 2,
    },
    });
const Logout = () => {

    const navigation = useNavigation();

    const resetLogin = async () => {
        const userData = await AsyncStorage.getItem('userData');

        if (userData) {
            await AsyncStorage.removeItem('userData');
            await AsyncStorage.clear();
        }

         // Reseta a navegação para a tela de login
            navigation.reset({
                index: 0,
                routes: [{ name: 'SignIn' }],
            });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={stylesLogout.button} onPress={resetLogin}>
                    <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Logout;

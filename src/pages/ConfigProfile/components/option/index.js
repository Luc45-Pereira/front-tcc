import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';


import { styles } from '../../../styles';

// componete de opcao de configuracao do perfil
const Option = (params) => {

    const navigation = useNavigation();
    
    const stylesOption = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#FFF',
            position: 'relative',
            marginTop: 10,
            borderBottomColor: '#f2f2f2',
            borderBottomWidth: 1,
            marginBottom: 10,
            height: 50,
            paddingHorizontal: 10, // Adicione padding horizontal para espaçamento entre o ícone e o texto
        },
        optionText: {
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 10, // Adicione um espaço entre o ícone e o texto
        }
    });
    
    return (
        <TouchableOpacity onPress={() => navigation.navigate(params.page)}>
            <View style={stylesOption.container}>
                <EntypoIcon name={params.icon} size={25} color="#000" />
                <Text style={stylesOption.optionText}>{params.description}</Text>
            </View>
        </TouchableOpacity>
    );
    
};

export default Option;

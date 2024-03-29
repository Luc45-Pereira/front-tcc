import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';


import BottomMenu from '../menu';
import Logout from './components/logout';
import { styles } from '../styles';
import Option from './components/option';


const ConfigProfile = () => {
    return (
        <View style={styles.container} >


            <ScrollView style={styles.containerForm} contentContainerStyle={{ flexGrow: 1 }}>
                <Option icon="user" description="Perfil" page="profile" />
                <Option icon="plus" description="Adicionar cartao de crédito" page="newCreditCard" />
                <Option icon="cog" description="Configurações" page="config" />
                <Option icon="info" description="Informações" page="info" />
            </ScrollView>
            <Logout/>

            <BottomMenu/>
        </View>
    );
};

export default ConfigProfile;

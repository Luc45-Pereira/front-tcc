import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CreditCardList from './Components/CreditCardList';
import AddCardForm from './Components/AddCardForm';
import PayPalOption from './Components/PayPalOption';
import InstitutionItem from './Components/InstitutionItem';
import BottomMenu from '../menu';
import { getCartoesUsuario, getAccountExist } from '../../client/client';
import { useNavigation } from '@react-navigation/native';

const Accounts = () => {

  const [cartoes, setCartoes] = useState([]);
  const navigation = useNavigation();

  const institutions = [
    { id: '200', name: 'Pluggy', path: '../../../assets/testeAccount.png', logo: require('../../../assets/testeAccount.png')},
    { id: '1', name: 'Banco do Brasil', path: '../../../assets/bb.png', logo: require('../../../assets/bb.png') },
    { id: '3', name: 'Caixa', path: '../../../assets/bb.png', logo: require('../../../assets/caixa.png') },
    { id: '4', name: 'Santander', path: '../../../assets/bb.png', logo: require('../../../assets/santander.png') },
    { id: '5', name: 'Itaú', path: '../../../assets/bb.png', logo: require('../../../assets/itau.png') },
    { id: '6', name: 'Nubank', path: '../../../assets/bb.png', logo: require('../../../assets/nu.png') },
  ];


  const checkAccountExists = async () => {
    const response = await getAccountExist();
    if (response) {
      console.log('Conta existe');
      navigation.navigate('AccountExist');
    }
  };

  checkAccountExists();

  useEffect(() => {
    const fetchCartoes = async () => {
      try {
        const total = await getCartoesUsuario();
        setCartoes(total);
        console.log(total);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCartoes();
  }, []);

  return (
    <View style={styles.container}>
      {cartoes.length > 0 ? (
        <View>
          <Text>Ja possui cartoes</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.instructions}>Escolha uma instituição bancária:</Text>
          <FlatList
                data={institutions}
                renderItem={({ item }) => <InstitutionItem institution={item} />}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.institutionsList}
            />
        </View>
      )}
      
      <BottomMenu />
    </View>
  );
};

const styles = StyleSheet.create({
    instructions: {
        fontSize: 16,
        marginTop: '50%',
        fontWeight: 'bold',
        color: '#2E86C1', // Azul claro
        textAlign: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      padding: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 16,
      textAlign: 'center',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 8,
      marginBottom: 16,
    },
    searchInput: {
      flex: 1,
      paddingRight: 8,
    },
    institutionsList: {
      marginLeft: 40,
      marginTop: '20%'
    },
    institutionItem: {
      backgroundColor: '#fff',
      padding: 16,
      margin: 8,
      borderRadius: 8,
      alignItems: 'center',
      width: '40%',
    },
    institutionLogo: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
    },
    footer: {
      marginTop: 16,
      textAlign: 'center',
      color: '#aaa',
    },
  });

export default Accounts;

import React from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const InstitutionItem = ({ institution }) => {
  const navigation = useNavigation();

  const RegisterAccount = async () => {
    await AsyncStorage.setItem('institutionToRegister', institution.id);
    await AsyncStorage.setItem('institutionToRegisterLogo', institution.path);

    navigation.navigate('RegisterAccount');
    
  }
  

  return (
    <TouchableOpacity style={styles.institutionItem} onPress={RegisterAccount} >
      <Image source={institution.logo} style={styles.institutionLogo} />
    </TouchableOpacity>
  );

}

const InstitutionaItem = ({ institution }) => (
    <TouchableOpacity style={styles.institutionItem} >
      <Image source={institution.logo} style={styles.institutionLogo} />
    </TouchableOpacity>
  );


const styles = StyleSheet.create({
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
    alignItems: 'center',
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


export default InstitutionItem;
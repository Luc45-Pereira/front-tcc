import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LineChart } from 'react-native-chart-kit';
import { getUser } from '../../../../client/client';

const HeaderDash = () => {
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
  
    const styles = StyleSheet.create({
      containerHeader: {
        flexDirection: 'row', // Muda a direção do layout para horizontal
        backgroundColor: '#FFF',
        padding: 10,
        justifyContent: 'space-between', // Espaço entre os itens
        borderBottomWidth: 1,
        borderBottomColor: '#FFF',
        marginBottom: 20,
        marginTop: 30,
      },
      text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 10, // Adiciona um espaço à direita entre o texto e a imagem
      },
      profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25, // Metade do valor de largura e altura para tornar a imagem circular
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
      },
      ola: {
        color: 'lightgray'
      }
    });
  
    return (
      <View style={styles.containerHeader}>
        <Text style={styles.text}>
          <Text style={styles.ola}>Olá,</Text>{'\n'}
          <Text><Text>{userData ? userData.nome : 'Carregando...'}</Text></Text>
        </Text>
        <View style={styles.profileImage}>
          <Icon name="user" size={40} color="black" />
        </View>
      </View>
    );
  };
  
  export default HeaderDash;

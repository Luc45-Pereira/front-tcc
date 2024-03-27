import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { getHistoricoDeEntradas } from '../../../../client/client';
import { styles } from '../../../styles';
import { useNavigation } from '@react-navigation/native';

const History = () => {
  const navigation = useNavigation();
  const [history, setHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const historico = await getHistoricoDeEntradas();
        setHistory(historico);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchHistory();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const historico = await getHistoricoDeEntradas();
      setHistory(historico);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setRefreshing(false);
  };

  return (
    <ScrollView style={styles.container} refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }>
      <ScrollView style={stylesTable.table}>
        <View style={stylesTable.containerButton}>
          <Text style={stylesTable.title}>Transações</Text>
          <TouchableOpacity style={stylesTable.button} onPress={() => navigation.navigate('dashboard')}>
            <Text style={stylesTable.buttonText}>Ver tudo</Text>
          </TouchableOpacity>
        </View>

        {history && Object.keys(history).map((key, index) => (
          <View key={index} style={stylesTable.row}>
            <View style={stylesTable.transactionInfo}>
              <View style={stylesTable.iconCircle}>
                <Icon name="shopping-bag" size={30} color="#b5b3b3" />
              </View>
              <Text style={stylesTable.transactionDescription}>{history[key].descricao}</Text>
            </View>
            <View style={stylesTable.transactionDetails}>
              <Text style={stylesTable.transactionValue}>{history[key].valor},00</Text>
              <Text style={stylesTable.transactionDate}>{history[key].criado_em}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const stylesTable = StyleSheet.create({
  iconCircle: {
    width: 50,
    height: 50,
    marginBottom: 10,
    borderRadius: 25,
    backgroundColor: '#FFF',
    borderWidth: 3,
    borderColor:"lightgray",
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerButton: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 10,
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 30,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#6f59f0",
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#FFF",
    padding: 2,
  },
  button: {
    backgroundColor: "#FFF",
    marginTop: 10,
    borderRadius: 8,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    marginTop: 28,
  },
  table: {
    borderWidth: 1,
    borderRadius: 40,
    borderColor: "lightgray",
    marginBottom: 10,
    marginTop: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
  },
  transactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionDescription: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  transactionDetails: {
    alignItems: 'flex-end',
  },
  transactionValue: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  transactionDate: {
    fontSize: 16,
    color: 'lightgray',
  },
});

export default History;

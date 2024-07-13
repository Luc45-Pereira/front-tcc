import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { Appbar, Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import BottomMenu from '../menu';
import { useNavigation } from '@react-navigation/native';
import { getAccountExist, getTransactionsFromAccount } from '../../client/client';

const AccountExist = () => {
  const [accountInfo, setAccountInfo] = useState({});
  const [transactions, setTransactions] = useState([]);

  console.log("Iniciando a página de informações da conta...");
  useEffect(() => {
    console.log('Buscando informações da conta...');
    // Substitua com suas próprias URLs da API Pluggy
    const fetchAccountInfo = async () => {
      try {
        const response = await getAccountExist();
        const data = JSON.parse(response);
        if (data.length > 0) {
            console.log('Conta existe');

            setAccountInfo(data[0]);
        }
      } catch (error) {
        console.error('Erro ao buscar informações da conta:', error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await getTransactionsFromAccount();
        const data = JSON.parse(response);
        if (data.length > 0) {
            console.log('Transações encontradas');

            setTransactions(data);
        }
        
      } catch (error) {
        console.error('Erro ao buscar transações:', error);
      }
    };

    fetchAccountInfo();
    fetchTransactions();
  }, []);

  const renderTransaction = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.description}</Title>
        <Paragraph>{item.date}</Paragraph>
        <Paragraph>{item.type}</Paragraph>
        <Paragraph>{item.amount}</Paragraph>
        <Paragraph>{item.status}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <Appbar.Header>
            <Appbar.Content title="Informações da Conta" />
        </Appbar.Header>
        <View style={styles.accountInfo}>
            <Text style={styles.accountText}>Tipo: {accountInfo.name}</Text>
            <Text style={styles.accountText}>Titular: {accountInfo.owner}</Text>
            <Text style={styles.accountText}>Saldo: {accountInfo.balance}</Text>
        </View>
        <FlatList
            data={transactions}
            renderItem={renderTransaction}
            keyExtractor={item => item.id.toString()}
        />

      </ScrollView>
      <BottomMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  accountInfo: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  accountText: {
    fontSize: 18,
    marginBottom: 10,
  },
  card: {
    margin: 10,
  },
});

export default AccountExist;

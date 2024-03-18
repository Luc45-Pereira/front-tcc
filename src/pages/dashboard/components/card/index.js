import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { getEntradas } from '../../../../client/client';

const Card = () => {

    const [saldoTotal, setSaldoTotal] = useState(0);
  const [receitaMensal, setReceitaMensal] = useState(10000);
  const [despesasMensais, setDespesasMensais] = useState(3500);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchSaldoTotal = async () => {
      try {
        const total = await getEntradas();
        setSaldoTotal(total);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchSaldoTotal();
  }, []);

  useEffect(() => {
    // Atualiza o saldo mensal ao alterar o saldo total, receita mensal ou despesas mensais
    const saldoMensal = receitaMensal - despesasMensais;
    setSaldoTotal(saldoMensal);
  }, [receitaMensal, despesasMensais]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const total = await getEntradas();
      setSaldoTotal(total);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setRefreshing(false);
  };



  return (
    <View style={styles.card}>
      <Image  style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>Saldo</Text>
        <Text style={styles.description}>R$ {parseFloat(saldoTotal).toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#6f59f0',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  cardContent: {
    padding: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: '#FFF',
    fontSize: 24,
  },
  image: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default Card;

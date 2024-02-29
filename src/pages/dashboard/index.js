import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { styles } from '../styles';

import Header from '../../../components/Header';
import { getEntradas } from '../../client/client';
import History from './components/history';
import Graph from './components/graph';

const Dashboard = () => {
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <Header />
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBlock}>
          <Text style={styles.summaryLabel}>Receita Mensal</Text>
          <Text style={styles.summaryValue}>R$ {receitaMensal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryBlock}>
          <Text style={styles.summaryLabel}>Despesas Mensais</Text>
          <Text style={styles.summaryValue}>R$ {despesasMensais.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryBlock}>
          <Text style={styles.summaryLabel}>Saldo Mensal</Text>
          <Text style={styles.summaryValue}>R$ {parseFloat(saldoTotal).toFixed(2)}</Text>
        </View>
      </View>
      <Graph />
      <History />
    </ScrollView>
  );
};

export default Dashboard;

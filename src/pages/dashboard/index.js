import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { styles } from '../styles';

import Header from '../../../components/Header';
import { getEntradas } from '../../client/client';
import History from './components/history';
import Graph from './components/graph';

import HeaderDash from './components/Header';
import Card from './components/card';
import Values from './components/values';
import BottomMenu from '../menu';

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
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <HeaderDash />
        <Card />
        <Values />
        <History />
        
      </ScrollView>
      <BottomMenu />
    </View>
    
  );
};

export default Dashboard;

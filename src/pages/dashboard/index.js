import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

import Header from '../../../components/Header';
import { getEntradas } from '../../client/client';
import History from './components/history';
import Graph from './components/graph';

const Dashboard = () => {
  const [saldoTotal, setSaldoTotal] = useState(0);

  useEffect(() => {
    const fetchSaldoTotal = async () => {
      try {
        const total = await getEntradas();
        setSaldoTotal(total);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    // transforma saldoTotal em float 2 casas decimais
    

    fetchSaldoTotal();
  }, []);
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBlock}>
          <Text style={styles.summaryLabel}>Receita Mensal</Text>
          <Text style={styles.summaryValue}>R$ 10,000</Text>
        </View>
        <View style={styles.summaryBlock}>
          <Text style={styles.summaryLabel}>Despesas Mensais</Text>
          <Text style={styles.summaryValue}>R$ 3,500</Text>
        </View>
        <View style={styles.summaryBlock}>
          <Text style={styles.summaryLabel}>Saldo Mensal</Text>
          <Text style={styles.summaryValue}>R$ {parseFloat(saldoTotal).toFixed(2)}</Text>
        </View>
      </View>
      <Graph />
      <History />
    </View>
  );
};


export default Dashboard;

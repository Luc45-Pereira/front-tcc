import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import {styles} from '../styles';

import Header from '../../../components/Header';


const primaryColor = '#65D8DA';

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Desempenho Mensal</Text>
        <LineChart
          data={{
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [
              {
                data: [50, 85, 70, 65, 90, 75],
              },
            ],
          }}
          width={350}
          height={220}
          yAxisSuffix="k"
          fromZero
          chartConfig={{
            backgroundColor: 'white',
            backgroundGradientFrom: '#65D8DA',
            backgroundGradientTo: '#65D8DA',
            decimalPlaces: 0,
            color: (opacity = 1) => 'white',
            labelColor: (opacity = 1) => 'white',
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: primaryColor,
            },
          }}
        />
      </View>
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
          <Text style={styles.summaryValue}>R$ 1,500</Text>
        </View>
      </View>
    </View>
  );
};


export default Dashboard;

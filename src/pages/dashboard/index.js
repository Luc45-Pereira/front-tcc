import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import {styles} from '../styles';

import { useNavigation } from '@react-navigation/native';

const primaryColor = '#65D8DA';

const Dashboard = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={stylesMenu.button} onPress={() => navigation.navigate('profile')}>
                    <Text style={stylesMenu.buttonText}>-</Text>
                </TouchableOpacity>
      <Text style={styles.title}>Dashboard Financeiro</Text>
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

const stylesMenu = StyleSheet.create({
    button: {
        backgroundColor: "#65D8DA",
        width: '100%',
        marginTop: 14,
        borderRadius: 8,
        paddingVertical: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    },

})


export default Dashboard;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const primaryColor = '#38A69D';

const Dashboard = () => {
  return (
    <View style={styles.container}>
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
            backgroundGradientFrom: 'white',
            backgroundGradientTo: 'white',
            decimalPlaces: 0,
            color: (opacity = 1) => primaryColor,
            labelColor: (opacity = 1) => primaryColor,
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
          <Text style={styles.summaryValue}>R$ 5,000</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: 20,
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: 10,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  summaryBlock: {
    width: '30%',
    backgroundColor: primaryColor,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Dashboard;

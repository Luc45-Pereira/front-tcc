import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getEntradasChart } from '../../../../client/client';

const Graph = () => {
  const [graphData, setGraphData] = useState(null); // Inicialize com null

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const data = await getEntradasChart();
        console.log(data);
        setGraphData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchGraphData();
    console.log(graphData);
  }, []);

  if (!graphData) {
    // Adicione um caso de renderização enquanto os dados estão sendo buscados
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Mês a mês</Text>
      <LineChart
        data={graphData}
        width={300}
        height={200}
        yAxisSuffix="R$"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726'
          }
        }}
      />
    </View>
  );
};

export default Graph;
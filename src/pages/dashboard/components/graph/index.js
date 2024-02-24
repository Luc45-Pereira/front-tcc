import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
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
      
      <LineChart
        data={graphData}
        width={Dimensions.get("window").width - 50}
        height={250}
        yAxisSuffix="R$"
        verticalRotation={30}
        segments={4}
        chartConfig={{
          backgroundColor: '#65D8DA',
          backgroundGradientFrom: '#398f88',
          backgroundGradientTo: '#398f88',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
            marginHorizontal: 20,
            paddingRight:0
          },
          strokeWidth: 2,
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#65D8DD'
          }
        }}
        bezier
        style={{
            marginVertical: 8,
            borderRadius: 16,
            marginTop: 20,
            marginHorizontal: 20,
            padding: 10,
            paddingRight:80
          }}
      />
    </View>
  );
};

export default Graph;
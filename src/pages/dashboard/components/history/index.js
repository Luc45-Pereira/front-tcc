import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from '../../../styles';

import { getHistoricoDeEntradas } from '../../../../client/client';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const historico = await getHistoricoDeEntradas();
        setHistory(historico);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Histórico de Entradas</Text>
      <View style={stylesTable.table}>
        <View style={stylesTable.row}>
          <Text style={stylesTable.cell}>Data</Text>
          <Text style={stylesTable.cell}>Valor</Text>
          <Text style={stylesTable.cell}>Descricao</Text>
        </View>

        {history && Object.keys(history).map((key, index) => (
          <View key={index} style={stylesTable.row}>
            <Text style={stylesTable.cell}>{history[key].criado_em}</Text>
            <Text style={stylesTable.cell}>{history[key].valor},00</Text>
            <Text style={stylesTable.cell}>{history[key].descricao}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const stylesTable = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    marginTop: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    color: "black",
  },
});

export default History;

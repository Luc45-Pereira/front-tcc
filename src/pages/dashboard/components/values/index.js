import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getEntradas, getSaidasMensal, getEntradasMensal } from '../../../../client/client';

const Values = () => {

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

  useEffect(() => {
    const fetchEntradasMensais = async () => {
      try {
        const total = await getEntradasMensal();
        setReceitaMensal(total);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchEntradasMensais();
  }, []);


  useEffect(() => {
    const fetchDespesasMensais = async () => {
      try {
        const total = await getSaidasMensal();

        setDespesasMensais(total);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchDespesasMensais();
  }, []);


  return (
    <View>
        <View style={styles.container}>
            <View style={styles.square}>
                <Icon name="arrow-up" size={30} color="green" />
            </View>
            <Text style={styles.value}>R$ {parseFloat(receitaMensal).toFixed(2)}</Text>
            <View style={styles.square}>
                <Icon name="arrow-down" size={30} color="red" />
            </View>
            <Text style={styles.value}>R$ {parseFloat(despesasMensais).toFixed(2)}</Text>
        </View>
        
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Muda a direção do layout para horizontal
        backgroundColor: '#FFF',
        padding: 10,
        justifyContent: 'space-between', // Espaço entre os itens
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    square: {
        width: 50,
        height: 50,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    value: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginRight: 10, // Adiciona um espaço à direita entre o texto e a imagem
    }
  
});

export default Values;
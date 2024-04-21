import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import MaskInput, { Masks } from 'react-native-mask-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'date-fns';


const Card = () => {
  const [date, setDate] = useState('');
  const [number, setNumber] = useState('');
  const [activeField, setActiveField] = useState('number');
  const [limit, setLimit] = useState('');
  const [Height, setHeight] = useState(225);
  const [numberCard, setNumberCard] = useState(false);

  const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
    },
    button: {
        backgroundColor: '#65D8DA',
        padding: 10,
        borderRadius: 5,
        fontFamily: 'bold',
    },
  cardContent: {
    padding: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#FFF',
    fontSize: 20,
    marginBottom: 5,
  },
  input: {
    color: '#FFF',
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
    paddingBottom: 5,
  },

  card: {
    backgroundColor: '#708090',
    width: '90%',
    height: 260,
    borderRadius: 10,
    boxShadowColor: '#000',
    boxShadowOffset: { width: 0, height: 2 },
    boxShadowOpacity: 0.25,
    boxShadowRadius: 3.84,
    alignSelf: 'center',
    marginTop: '30%',
    
  },
  cardContent: {
    padding: 20,
    
  },
  title: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold'
  },
  description: {
    color: '#FFF',
    fontSize: 24,
    marginTop: 80
  },
  image: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

  const saveInfos = () => {
    AsyncStorage.setItem('cardNumber', number);
    AsyncStorage.setItem('cardDate', date);
    let limitTranslate = limit.replace("R$", "").replace(",", ".");
    limitTranslate = parseFloat(limitTranslate);
    AsyncStorage.setItem('cardLimit', limitTranslate.toString());
  };

  const handleNumberChange = (text) => {
    const formattedText = text.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
    setNumber(formattedText);
    if (formattedText.length === 19) {
      setHeight(260);
    }
    setActiveField(formattedText.length === 19 ? 'date' : 'number');
  };

  const handleTextChange = (text) => {
    const formattedText = text.replace(/\D/g, '').replace(/(\d{2})(\d{4})/, '$1/$2');
    setDate(formattedText);
    if (formattedText.length === 7) {
      setHeight(260);
    }
    setActiveField(formattedText.length === 7 ? 'limit' : 'date');
  };

  return (
    <View style={styles.card} height={Height}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>Cartão de Crédito</Text>
        <View style={styles.inputContainer}>
          {activeField === 'number' && (
            <View>
              <Text style={styles.description}>Número:</Text>
              <TextInput
                style={styles.input}
                placeholder="**** **** **** ****"
                value={number}
                maxLength={19}
                onChangeText={handleNumberChange}
              />
            </View>
          )}
          {activeField === 'date' && (
            <View>
              <Text style={styles.description}>Validade:</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YYYY"
                keyboardType="numeric"
                maxLength={7}
                value={date}
                onChangeText={handleTextChange}
              />
            </View>
          )}
          {activeField === 'limit' && (
            <View>
              <Text style={styles.description}>Limite Total:</Text>
              <MaskInput
                style={styles.input}
                placeholder="R$ 0,00"
                autoCorrect={false}
                keyboardType="decimal-pad"
                value={limit}
                onChangeText={setLimit}
                mask={Masks.BRL_CURRENCY}
              />
            </View>
          )}
        </View>
        {activeField === 'date' && numberCard === false && (
          <View style={styles.buttons}>
            <Button title="Voltar" onPress={() => {
              setHeight(260);
              setActiveField('number');
              setNumberCard(true);
            }} />
          </View>
        )}
        {numberCard === true && activeField === 'number' && (
          <View style={styles.buttons}>
            <Button title="Avançar" onPress={() => {
              setHeight(260);
              setActiveField('date');
              setNumberCard(true);
            }} />
          </View>
        )}
        {numberCard === true && activeField === 'date' && (
          <View style={styles.buttons}>
            <Button title="Voltar" onPress={() => {
              setHeight(260);
              setActiveField('number');
              setNumberCard(true);
            }} />
            <Button title="Avançar" onPress={() => {
              setHeight(260);
              setActiveField('limit');
              setNumberCard(false);
            }} />
          </View>
        )}
        {activeField === 'limit' && numberCard === false && (
          <View style={styles.buttons}>
            <Button title="Voltar" onPress={() => {
              setHeight(260);
              setActiveField('date');
              setNumberCard(true);
            }} />
            <Button title="Salvar" onPress={saveInfos} />
          </View>
        )}
      </View>
    </View>
  );
};



export default Card;

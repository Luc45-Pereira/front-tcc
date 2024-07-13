import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CreditCardList = ({ cards, onAddNewCard }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your best way...</Text>
      {cards.map((card, index) => (
        <View key={index} style={styles.card}>
          <Text>**** **** **** {card.last4}</Text>
          <Text>{card.brand}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={onAddNewCard}>
        <Text style={styles.addButtonText}>ADD OTHER</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>OR</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  card: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#00cc99',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  orText: {
    marginVertical: 20,
    textAlign: 'center',
  },
});

export default CreditCardList;

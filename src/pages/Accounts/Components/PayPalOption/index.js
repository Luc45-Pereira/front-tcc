import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PayPalOption = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.paypalButton}>
        <Text style={styles.paypalText}>PayPal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  paypalButton: {
    padding: 15,
    borderRadius: 5,
    borderColor: '#0070ba',
    borderWidth: 1,
    alignItems: 'center',
  },
  paypalText: {
    color: '#0070ba',
    fontWeight: 'bold',
  },
});

export default PayPalOption;

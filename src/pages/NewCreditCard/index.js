import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { styles } from '../styles';

import BottomMenu from '../menu';
import Card from './Components/Card';
import Option from '../ConfigProfile/components/option'

const newCreditCard = () => {
    console.log(Card.limit);
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Card />
        <View style={{marginLeft:'70%'}}>
            <Option icon="controller-next" description="Revisar" page="newCreditCard" />
        </View>
      </ScrollView>
      <BottomMenu />
    </View>
    
  );
};

export default newCreditCard;

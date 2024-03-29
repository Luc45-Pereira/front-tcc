import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';


const BottomMenu = () => {

    const navigation = useNavigation();
    const navigationState = useRoute();
    // const current = navigation.getCurrentRoute();
    const currentScreen = navigationState.name;
    console.log(currentScreen);
    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('dashboard')} style={styles.menuItem}>
            <EntypoIcon name="bar-graph" size={30} color={ currentScreen === 'dashboard' ? '#65D8DA': '#b5b3b3' } />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('configProfile')} style={styles.menuItem}>
            <OcticonsIcon name="person" size={30} color={ currentScreen === 'configProfile' ? '#65D8DA': '#b5b3b3' } />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('entrada')} style={styles.menuItem}>
            <FontAwesomeIcon name="money-check-alt" size={30} color={ currentScreen === 'entrada' ? '#65D8DA': '#b5b3b3' } />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Screen2')} style={styles.menuItem}>
            <EntypoIcon name="credit-card" size={30} color={ currentScreen === 'Screen2' ? '#65D8DA': '#b5b3b3' } />
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    height: 50,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemSelected: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height:'100%',
    borderRadius: 10,
    borderBottomWidth: 0,
    borderWidth: 2,
  },
});

export default BottomMenu;

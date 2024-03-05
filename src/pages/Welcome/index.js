import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Animatable.Image 
                    animation="flipInY"
                    duration={1500}
                    source={require("../../../assets/logo.png")} 
                    style={{width: '100%'}}
                    resizeMode="contain"
                    />
            </View>
            <Animatable.View delay={1000} animation="fadeInUp" style={styles.containerForm} >
                <Text style={styles.title}>Monitore, organize seus gastos em qualquer lugar!</Text>
                <Text style={styles.text}>Faça o login para começar</Text>

                <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('SignIn')}
                >
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#65D8DA",
    },
    containerLogo: {
        flex: 2,
        justifyContent: "center",
        backgroundColor: "#65D8DA",
        alignItems: "center",
    },
    containerForm: {
        flex: 1,
        backgroundColor: "#65D8DA",
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    title: {
        fontSize: 32,
        color: "#FFF",
        fontWeight: "bold",
    },
    text: {
        color: "#FFF",
        fontSize: 18,
        marginTop: 20,
        

    },
    button: {
        backgroundColor: "#FFF",
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 8,
    },
   
});
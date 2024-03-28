import {StyleSheet } from "react-native";
const primaryColor = '#FFF';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // zIndex: 99999,
        backgroundColor: "#FFF",
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    message: {
        fontSize: 32,
        color: "#FFF",
        fontWeight: "bold",
        marginTop: '20%',
    },
    containerForm: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingStart: '5%',
        paddingEnd: '5%',
        marginTop: '20%',
    },
    containerFormSignin: {
      flex: 1,
      backgroundColor: "#FFF",
      paddingStart: '5%',
      paddingEnd: '5%',
      // marginTop: '20%',
    },
    title: {
        fontSize: 20,
        color: "#65D8DA",
        fontWeight: "bold",
        marginTop: 28,
    },
    subTitle: {
      fontSize: 14,
      color: "#65D8DA",
      fontWeight: "bold",
      marginTop: 5,
  },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
        borderColor: "#65D8DA",
    },
    button: {
        backgroundColor: "#65D8DA",
        width: '100%',
        // marginTop: 14,
        borderRadius: 8,
        paddingVertical: 8,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
        
    },
    buttonRegister: {
        marginTop: 30,
        justifyContent: "center",
        // zIndex: 99999,
    },
    registerText: {
        color: "#000",
        // zIndex: 99999,
    },
    chartContainer: {
        marginTop: "25%",
        width: '100%',
        alignItems: 'center',
      },
      chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: primaryColor,
        marginBottom: 10,
      },
      summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
      },
      summaryBlock: {
        width: '30%',
        backgroundColor: primaryColor,
        padding: 10,
        borderRadius: 10,
        elevation: 3,
      },
      summaryLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#65D8DA',
      },
      summaryValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#65D8DA',
      },
      errorMessage: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 30,
        marginVertical: 10,

    },
    errorMessageText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
      },
      userName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      userEmail: {
        fontSize: 16,
        color: 'gray',
      },
      passwordContainer: {
        position: 'relative',
        marginBottom: "20%",
      },
      eyeIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
        
      },
      showPasswordButton: {
        visibility: 'hidden'
      }
    

    
    });

export {styles};
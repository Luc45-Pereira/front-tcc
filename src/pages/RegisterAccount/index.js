import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCamposToRegister } from '../../client/client';
import BottomMenu from '../menu';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button, HelperText, Provider as PaperProvider } from 'react-native-paper';

const RegisterAccount = () => {
  const [fields, setFields] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [logoUri, setLogoUri] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const storedLogoUri = await AsyncStorage.getItem('institutionToRegisterLogo');
        setLogoUri(storedLogoUri);
        const institution = await AsyncStorage.getItem('institutionToRegister');
        const campos = await getCamposToRegister(institution);
        // Certifique-se de que `campos[0]` é um array antes de setar em `fields`
        setFields(Array.isArray(campos[0]) ? campos[0] : []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFields();
  }, []);

  const handleChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleValidation = () => {
    let valid = true;
    let newErrors = {};

    fields.forEach((field) => {
      const { name, validation, validationMessage, optional } = field;
      if (!optional && !formValues[name]) {
        valid = false;
        newErrors[name] = 'Este campo é obrigatório';
      } else if (validation && !new RegExp(validation).test(formValues[name])) {
        valid = false;
        newErrors[name] = validationMessage;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      // Processar dados do formulário
      console.log('Formulário válido:', formValues);
      navigation.navigate('dashboard');
    } else {
      console.log('Formulário inválido:', errors);
    }
  };

  const renderField = (field) => {
    const { label, name, placeholder, type } = field;
    return (
      <View key={name} style={styles.fieldContainer}>
        <TextInput
          label={label}
          mode="outlined"
          placeholder={placeholder}
          secureTextEntry={type === 'password'}
          onChangeText={(text) => handleChange(name, text)}
          value={formValues[name] || ''}
          error={!!errors[name]}
          style={styles.input}
        />
        {errors[name] && <HelperText type="error">{errors[name]}</HelperText>}
      </View>
    );
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        {logoUri ? (
          <Image source={{ uri: logoUri }} style={styles.institutionLogo} />
        ) : (
          <Text>Carregando logo...</Text>
        )}
        {fields.map((field) => renderField(field))}
        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Salvar
        </Button>
      </View>
      <BottomMenu />
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  institutionLogo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: '60%',
  },
  fieldContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#65D8DA',
  },
});

export default RegisterAccount;

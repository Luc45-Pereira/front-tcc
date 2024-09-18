import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, parseISO } from 'date-fns';

const endpoint = 'http://127.0.0.1:8000';

// Utility functions for AsyncStorage
const saveUserData = async (data) => {
    try {
        await AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {
        console.error('Error saving user data', error);
    }
};

const getUserData = async () => {
    try {
        const userData = await AsyncStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error('Error retrieving user data', error);
        return null;
    }
};

// Authentication API functions
const toLogin = async (login, password) => {
    try {
        const response = await axios.post(`${endpoint}/user/login?login=${login}&password=${password}`);

        if (response.data.status === 'success') {
            await saveUserData(response.data);
            return true;
        }

        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const updateTransaction = async (Transaction, entrada = true) => {
    try {
        const user = await getUserData();
        if (!user) {
            console.error('User data not found');
            return false;
        }

        let endpointPut = '';
        if (entrada) {
            endpointPut = '/entrada/update/';
        } else {
            endpointPut = '/saida/update/';
        }

        let payload = {
            descricao: Transaction.descricao,
            id_usuario: user.id,
            valor: Transaction.valor,
            criado_em: Transaction.criado_em,
            tag: Transaction.tag,
            detalhes: Transaction.detalhes,
            id_cartao: null,
        };

        console.log('Transaction:', Transaction);
        console.log('Sending payload:', payload);


        const response = await axios.put(`${endpoint}${endpointPut}${Transaction.id}?access_token=${user.token}`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Response:', response.data);

        return true;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request data:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
        return false;
    }
}

const toRegister = async (email, password, name, birthDate, cpf) => {
    try {
        const formattedBirthDate = birthDate.split('/').reverse().join('-');
        await axios.post(`${endpoint}/user`, {
            nome: name,
            email,
            senha: password,
            cpf: cpf,
            data_nascimento: formattedBirthDate,
            id_endereco: null,
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const setEntrada = async (valor, descricao, tag = "", detalhes = "") => {
    try {
        const user = await getUserData();
        if (!user) {
            console.error('User data not found');
            return false;
        }

        const dataAtual = new Date();
        const formattedDate = `${dataAtual.getFullYear()}-${String(dataAtual.getMonth() + 1).padStart(2, '0')}-${String(dataAtual.getDate()).padStart(2, '0')}`;

        const payload = {
            descricao,
            id_usuario: user.id,
            valor,
            criado_em: formattedDate,
            tag,
            detalhes,
            id_cartao: null,
        };

        console.log('Sending payload:', payload);

        const response = await axios.post(`${endpoint}/entrada/?access_token=${user.token}`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Response:', response.data);

        return true;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request data:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
        return false;
    }
};


const getEntradas = async () => {
    try {
        const user = await getUserData();
        const { data: entradas } = await axios.get(`${endpoint}/entrada/entradas/${user.id}?access_token=${user.token}`);
        const { data: saidas } = await axios.get(`${endpoint}/saida/saidas/${user.id}?access_token=${user.token}`);

        const totalEntrada = entradas.reduce((total, entrada) => total + entrada.valor, 0);
        const totalSaida = saidas.reduce((total, saida) => total + saida.valor, 0);

        return totalEntrada - totalSaida;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request data:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
        return false;
    }
};

const getEntradasChart = async () => {
    try {
        const user = await getUserData();
        const { data: entrada } = await axios.get(`${endpoint}/entrada/entradas/${user.id}?access_token=${user.token}`);

        if (!entrada || !Array.isArray(entrada)) {
            throw new Error('Invalid data received');
        }

        const monthlyDataEntrada = entrada.reduce((acc, entry) => {
            const month = format(parseISO(entry.criado_em), 'yyyy-MM');
            if (!acc[month]) {
                acc[month] = 0;
            }
            acc[month] += entry.valor;
            return acc;
        }, {});

        const chartData = {
            labels: Object.keys(monthlyDataEntrada),
            datasets: [
                {
                    data: Object.values(monthlyDataEntrada),
                },
            ],
        };

        return chartData;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Exits API functions
const setSaida = async (valor, descricao, tag = "", detalhes = "") => {
    try {
        const user = await getUserData();
        const dataAtual = new Date();
        const formattedDate = `${dataAtual.getFullYear()}-${String(dataAtual.getMonth() + 1).padStart(2, '0')}-${String(dataAtual.getDate()).padStart(2, '0')}`;

        await axios.post(`${endpoint}/saida/?access_token=${user.token}`, {
            descricao,
            id_usuario: user.id,
            valor,
            criado_em: formattedDate,
            tag,
            detalhes,
            id_cartao: null,
        });

        return true;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request data:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
        return false;
    }
};

const getHistoricoDeEntradas = async () => {
    try {
        const user = await getUserData();
        const { data: entradas } = await axios.get(`${endpoint}/entrada/entradas/${user.id}?access_token=${user.token}`);
        const { data: saidas } = await axios.get(`${endpoint}/saida/saidas/${user.id}?access_token=${user.token}`);

        const entradasDoMes = entradas.filter(entrada => {
            const data = new Date(entrada.criado_em);
            const dataAtual = new Date();
            return data.getMonth() === dataAtual.getMonth() && data.getFullYear() === dataAtual.getFullYear();
        });

        const saidasDoMes = saidas.filter(saida => {
            const data = new Date(saida.criado_em);
            const dataAtual = new Date();
            return data.getMonth() === dataAtual.getMonth() && data.getFullYear() === dataAtual.getFullYear();
        });

        const saidasDoMesFormatadas = saidasDoMes.map(saida => ({
            ...saida,
            valor: -saida.valor,
            type: 'saida',
        }));

        const entradasDoMesFormatada = entradasDoMes.map(entrada => ({
            ...entrada,
            type: 'entrada',
        }));

        const valoresMensal = entradasDoMesFormatada.concat(saidasDoMesFormatadas);

        valoresMensal.sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em));

        console.log(valoresMensal);
        return valoresMensal;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// User API functions
const getUser = async () => {
    try {
        const user = await getUserData();
        if (!user) {
            return false;
        }
        const response = await axios.get(`${endpoint}/user/${user.id}?access_token=${user.token}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Monthly Exits and Entries API functions
const getSaidasMensal = async () => {
    try {
        const user = await getUserData();
        const { data: saidas } = await axios.get(`${endpoint}/saida/saidas/${user.id}?access_token=${user.token}`);

        const saidasDoMes = saidas.filter(saida => {
            const data = new Date(saida.criado_em);
            const dataAtual = new Date();
            return data.getMonth() === dataAtual.getMonth() && data.getFullYear() === dataAtual.getFullYear();
        });

        const totalDespesas = saidasDoMes.reduce((acc, saida) => acc + saida.valor, 0);

        return totalDespesas;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const getEntradasMensal = async () => {
    try {
        const user = await getUserData();
        const { data: entradas } = await axios.get(`${endpoint}/entrada/entradas/${user.id}?access_token=${user.token}`);

        const entradasDoMes = entradas.filter(entrada => {
            const data = new Date(entrada.criado_em);
            const dataAtual = new Date();
            return data.getMonth() === dataAtual.getMonth() && data.getFullYear() === dataAtual.getFullYear();
        });

        const totalEntradas = entradasDoMes.reduce((acc, entrada) => acc + entrada.valor, 0);

        return totalEntradas;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const getCartoesUsuario = async () => {
    try {
        const user = await getUserData();
        const cartoes = await axios.get(`${endpoint}/cartao/?access_token=${user.token}`);

        console.log(cartoes);

        return cartoes.data;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const getTransactionsFromAccount = async () => {
    try {
        const TransactionsAccountsUser = await AsyncStorage.getItem('TransactionsAccountsUser');
        if (TransactionsAccountsUser) {
            return TransactionsAccountsUser;
        }

        const userData = await getUserData();
        const response = await axios.get(`${endpoint}/transactions/?access_token=${userData.token}`);
        console.log('Response:', response.data);

        await AsyncStorage.setItem('TransactionsAccountsUser', JSON.stringify(response.data));

        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const getAccountExist = async (userData) => {
    try {
        const AccountsUser = await AsyncStorage.getItem('AccountsUser');
        if (AccountsUser) {
            return AccountsUser;
        }

        const userData = await getUserData();
        const response = await axios.get(`${endpoint}/transactions/accounts?access_token=${userData.token}`);
        console.log('Response:', response.data);

        await AsyncStorage.setItem('AccountsUser', JSON.stringify(response.data));

        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
};


const createAccountPluggy = async (userData) => {
    try {
        const body = {};
        const response = await axios.get(`${endpoint}/pluggy/connectors/200?access_token=${userData.token}`, body);
        console.log('Response:', response.data);

        await AsyncStorage.setItem('connectorCreatedData', JSON.stringify(response.data));

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};


const getCamposToRegister = async (connectorId) => {
    try {
        const userData = await getUserData();

        if (connectorId == 200)
        {
            createAccountPluggy(userData);
            return [];
        }

        const response = await axios.get(`${endpoint}/pluggy/connectors?access_token=${userData.token}`);

        
        const results = response.data.results;
        const campos = [];

        results.forEach(async (connector) => {
            console.log('Connector:', connector.id, 'ConnectorId:', connectorId);

            if (connector.id == connectorId) {
                
                console.log('Connector:', connector);
                campos.push(connector.credentials);
            }
        });
        console.log('Campos:', campos);
        return campos;
        
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request data:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
        return false;
    }


};

export { toLogin, updateTransaction, getAccountExist, getTransactionsFromAccount, getCamposToRegister, toRegister, getCartoesUsuario, getEntradas, setEntrada, getHistoricoDeEntradas, getEntradasChart, getUser, getSaidasMensal, getEntradasMensal, setSaida };
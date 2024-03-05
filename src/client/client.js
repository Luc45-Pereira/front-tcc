import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, parseISO } from 'date-fns';

const endpoint = 'http://34.85.214.156';

async function toLogin(login, password) {
    try {
        const url = `${endpoint}/user/login?login=${encodeURIComponent(login)}&password=${encodeURIComponent(password)}`;
        const response = await fetch(url, {
            method: 'POST', // Pode ser 'GET' se o servidor esperar um GET
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            // Não é necessário o corpo do JSON nesta configuração
        });
        

        if (!response.ok) {
            throw new Error('Network response not OK');
        }

        const json = await response.json();
        
        
        if (json.status === "success") {
            // Save the response data to AsyncStorage for later use
            await AsyncStorage.setItem('userData', JSON.stringify(json));
            return true;
        }

        return false;
        
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function toRegister(email, password, name, birthDate, cpf) {
    try {
        let birthDateArray = birthDate.split('/');
        birthDate = `${birthDateArray[0]}-${birthDateArray[1]}-${birthDateArray[2]}`;
        const url = `${endpoint}/user`;
        const response = await fetch(url, {
            method: 'POST', // Pode ser 'GET' se o servidor esperar um GET
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                "nome": name,
                "email": email,
                "senha": password,
                "cpf": cpf,
                "data_nascimento": birthDate,
                "id_endereco": null
            })
        });
        

        if (!response.ok) {
            throw new Error('Network response not OK');
        }

        const json = await response.json();
        

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function setEntrada(valor, descricao, tag="", detalhes="") {
    try {
        const userData = await AsyncStorage.getItem('userData');
        const user = JSON.parse(userData);
        const url = `http://34.85.214.156/entrada/?access_token=${user.token}`;
        const dataAtual = new Date();

        // Obtenha o ano, mês e dia da data atual
        const ano = dataAtual.getFullYear();
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Adiciona um zero à esquerda se o mês for menor que 10
        const dia = String(dataAtual.getDate()).padStart(2, '0'); 
        const response = await fetch(url, {
            method: 'POST', // Pode ser 'GET' se o servidor esperar um GET
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            redirect: 'manual',
            body: JSON.stringify({
                "descricao": descricao,
                "id_usuario": user.id,
                "valor": valor,
                "criado_em": `${ano}-${mes}-${dia}`,
                "tag": tag,
                "detalhes": detalhes
            })
        });
        

        if (!response.ok) {
            throw new Error('Network response not OK');
        }

        const json = await response.json();
        

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function getEntradas() {
    try {
        const userData = await AsyncStorage.getItem('userData');
        const user = JSON.parse(userData);
        const url = `${endpoint}/entrada/entradas/${user.id}?access_token=${user.token}`;
        const response = await fetch(url, {
            method: 'GET', // Pode ser 'GET' se o servidor esperar um GET
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response not OK');
        }

        const entrada = await response.json();
        
        const url1 = `${endpoint}/saida/saidas/${user.id}?access_token=${user.token}`;
        const response1 = await fetch(url1, {
            method: 'GET', // Pode ser 'GET' se o servidor esperar um GET
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        });

        if (!response1.ok) {
            throw new Error('Network response not OK');
        }

        const saida = await response1.json();

        let total_entrada = 0;
        entrada.forEach(element => {
            total_entrada = total_entrada + element.valor;
        });


        let total_saida = 0;
        saida.forEach(element => {
            total_saida = total_saida + element.valor;
        });

        let total = total_entrada - total_saida;

        return total;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function getEntradasChart() {
    try {
        const userData = await AsyncStorage.getItem('userData');
        const user = JSON.parse(userData);
        const url = `${endpoint}/entrada/entradas/${user.id}?access_token=${user.token}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response not OK');
        }

        const entrada = await response.json();

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
}

async function getHistoricoDeEntradas() {
    try {
        const userData = await AsyncStorage.getItem('userData');
        const user = JSON.parse(userData);
        const url = `${endpoint}/entrada/entradas/${user.id}?access_token=${user.token}`;
        const response = await fetch(url, {
            method: 'GET', // Pode ser 'GET' se o servidor esperar um GET
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response not OK');
        }

        const entrada = await response.json();
        console.log(entrada);
        return entrada;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function getUser() {
    try {
        const userData = await AsyncStorage.getItem('userData');
        const user = JSON.parse(userData);
        const url = `${endpoint}/user/${user.id}?access_token=${user.token}`;
        const response = await fetch(url, {
            method: 'GET', // Pode ser 'GET' se o servidor esperar um GET
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response not OK');
        }
        return await response.json();



       
    } catch (error) {
        console.error(error);
        return false;
    }
}


export { toLogin, toRegister, getEntradas, setEntrada, getHistoricoDeEntradas, getEntradasChart, getUser};
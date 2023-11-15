import AsyncStorage from '@react-native-async-storage/async-storage';

const endpoint = 'https://api-tcc-g3gr.onrender.com';

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
        console.log(birthDate);
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
        const url = `${endpoint}/entrada?access_token=${user.token}`;
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
        const user = await AsyncStorage.getItem('userData');
        const url = `${endpoint}/entrada/${user.id}?access_token=${user.token}`;
        const response = await fetch(url, {
            method: 'POST', // Pode ser 'GET' se o servidor esperar um GET
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        });
        

        if (!response.ok) {
            throw new Error('Network response not OK');
        }

        const entrada = await response.json();
        
        const url = `${endpoint}/saida/${user.id}?access_token=${user.token}`;
        const response = await fetch(url, {
            method: 'POST', // Pode ser 'GET' se o servidor esperar um GET
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        });


        if (!response.ok) {
            throw new Error('Network response not OK');
        }

        const saida = await response.json();

        let total_saida = saida.valor;
        let total_entrada = entrada.valor;

        let total = total_entrada - total_saida;

        return total;
    } catch (error) {
        console.error(error);
        return false;
    }
}




export { toLogin, toRegister, getEntradas, setEntrada };
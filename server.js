const express = require('express');
const axio = require('axios');
const { default: axios } = require('axios');

const app = express();
const port = 3000;

app.get('/', (req, res) =>{
    res.send('Olá mundo');
});

app.get('/consulta-cep/:cep', async (req, res) =>{
    const cep = req.params.cep; //Obtendo o CEP da URL
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;

    try{
        // Fazendo a requisição para ver a API do ViaCEP
        if (!cepRegex.test(cep)) {
            res.status(400).send('CEP inválido')
            return 
        }
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        res.json(response.data);// Retorna os dados da resposta
    }catch (error) {
        console.log(`Erro ao fazer requisição:`, error);
        res.status(500).send(`Erro ao consultar o CEP`);
    }  
});

app.listen(port, () =>{
    console.log(`Servidor rodando em http://localhost:${port}`);
});

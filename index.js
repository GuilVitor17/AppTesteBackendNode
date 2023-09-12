const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const ListarCarros = require('./veiculos.json')

const app = express();
const port = 3001;

app.use(bodyParser.json());

const veiculosFilePath = 'veiculos.json';

app.post('/cadastrar-veiculo', (req, res) => {
  const veiculo = req.body;

  let veiculos = [];
  try {
    const data = fs.readFileSync(veiculosFilePath, 'utf-8');
    veiculos = JSON.parse(data);
  } catch (error) {}

  veiculos.push(veiculo);

  fs.writeFileSync(veiculosFilePath, JSON.stringify(veiculos, null, 2));

  res.json({ message: 'Veículo cadastrado com sucesso!' });
});

app.get('/veiculos', (req, res) => {

  try {
    
    res.json({ ListarCarros });


  } catch (error) {

    res.json({ message: error });

  }

});

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});

const rescue = require('express-rescue');
const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const productsValidation = require('./middlewares/productsMiddleware');
const salesValidation = require('./middlewares/salesMiddleware');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/', rescue(productsController.getAll));

app.post('/products/', productsValidation, rescue(productsController.create));

app.get('/sales/', rescue(salesController.getAll));

app.post('/sales/', salesValidation, rescue(salesController.create));

app.get('/products/:id', rescue(productsController.find));

app.put('/products/:id', productsValidation, rescue(productsController.edit));

app.delete('/products/:id', rescue(productsController.erase));

app.get('/sales/:id', rescue(salesController.find));

app.put('/sales/:id', salesValidation, rescue(salesController.update));

app.delete('/sales/:id', rescue(salesController.erase));

app.use((err, req, res, _next) => {
  res.status(500).json(err.message);
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;

const { Router } = require('express');

const pokemonsController = require('../controllers/pokemons.controller');

const routes = Router();

routes.get('/pokemons', pokemonsController.list);
routes.get('/pokemons/:id', pokemonsController.getById);
routes.post('/pokemons', pokemonsController.create);

module.exports = routes;
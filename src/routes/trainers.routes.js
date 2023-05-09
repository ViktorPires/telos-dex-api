const { Router } = require('express');

const trainersController = require('../controllers/trainers.controller');

const routes = Router();

routes.get('/trainers', trainersController.list);
routes.get('/trainers/:id', trainersController.getById);

module.exports = routes;
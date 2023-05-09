const TrainersModel = require('../model/trainer.model');

const { operatorFilter } = require('../utils/operatorFilter');

const { NotFoundException } = require('../exceptions/NotFoundException');

const list = async (request, response) => {
    const { 
        name, 
        age, 
        location, 
        is_leader, 
        badges, 
        speciality, 
        pokemons } = request.query;

    const filters = {};

    if(name) { name.includes('+') ? filters.name = name.replace('+', ' ') : filters.name = name };
    if(age) { Object.assign(filters, operatorFilter("age", age)) };
    if(location) { filters.location = location.includes('+') ? location.replace('+', ' ') : location };
    if(is_leader) {filters.is_leader = is_leader};
    if(badges) { filters.badges = badges.includes('+') ? badges.replace('+', ' ') : badges };
    if(speciality) {filters.speciality = speciality};
    if(pokemons) { filters.pokemons = { $in: pokemons } };
      
    try {
        if(Object.keys(filters).length === 0) {
            const trainers = await TrainersModel.find()

            return response.json(trainers);
        };

        const trainers = await TrainersModel.find(filters);

        if(!trainers || trainers.length === 0) {
            throw new NotFoundException('No trainers were found');
        };

        return response.json(trainers);
    } catch(err) {
        if(err instanceof NotFoundException) {
            return response.status(404).json({
                error: '@trainers/list',
                message: err.message,
            });
        };
        return response.status(400).json({
            error: '@trainers/list',
            message: err.message || "Failed to list trainers",
        });
    }
};

const getById = async (request, response) => {
    const { id } = request.params;

    try {
        const trainer = await TrainersModel.findById(id);

        if(!trainer) {
           throw new NotFoundException(`Trainer not found ${id}`);
        };

        return response.json(trainer);
    } catch(err) {
        if(err instanceof NotFoundException) {
            return response.status(404).json({
                error: '@trainers/getById',
                message: err.message,
            });
        };
        return response.status(400).json({
                error: '@trainers/getById',
                message: err.message || "Failed to get the trainer",
            });
    }
};

module.exports = {
    list,
    getById,
};
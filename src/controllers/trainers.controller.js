const TrainersModel = require('../model/trainer.model');
const PokemonsModel = require('../model/pokemon.model');

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

const create = async (request, response) => {
    const { 
        name,  
        age, 
        location, 
        is_leader, 
        badges, 
        speciality, 
        pokemons } = request.body;

    try {
        // Retrieve all pokemons with IDs in the pokemons list
         const pokemonDocs = await PokemonsModel.find({ _id: { $in: pokemons } });

        // Creates a new list of pokemons that contains all the data of the found pokemons
         const pokemonsList = pokemonDocs.map((pokemonDoc) => {
             const { _id, attack, defense, hp, name, pokedex_number, speed, type1, is_legendary } = pokemonDoc;
             return { _id, attack, defense, hp, name, pokedex_number, speed, type1, is_legendary };
         });

        const trainer = await TrainersModel.create({
            name,
            age,
            location,
            is_leader,
            badges,
            speciality,
            pokemons: pokemonsList
        });

        return response.status(201).json(trainer);
    } catch(err) {
        return response.status(400).json({
            error: '@trainers/create',
            message: err.message || "Failed to create a new trainer",
        });
    };
};

const remove = async (request, response) => {
    const { id } = request.params;

    try {
        const trainerRemoved = await TrainersModel.findByIdAndDelete(id);

        if(!trainerRemoved) {
           throw new NotFoundException(`Trainer not found ${id}`);
        };

    return response.status(204).send();
    } catch(err) {
        if(err instanceof NotFoundException) {
            return response.status(404).json({
                error: '@trainers/remove',
                message: err.message,
            });
        };
        return response.status(400).json({
            error: '@trainers/remove',
            message: err.message || "Failed to remove a trainer",
        });
    }
};


module.exports = {
    list,
    getById,
    create,
    remove
};
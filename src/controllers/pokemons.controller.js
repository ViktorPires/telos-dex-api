const PokemonsModel = require('../model/pokemon.model');
const CountersModel = require('../model/counter.model');

const { NotFoundException } = require('../exceptions/NotFoundException');
const { LegendaryException } = require('../exceptions/LegendaryException');

const list = async (request, response) => {
    const { 
        name, 
        pokedex_number, 
        attack, 
        defense, 
        speed, 
        hp, 
        type1, 
        type2, 
        is_legendary } = request.query;

    const filters = {};

    if(name) {filters.name = name} ;
    if(pokedex_number) {filters.pokedex_number = pokedex_number};
    if(attack) {filters.attack = attack};
    if(defense) {filters.defense = defense};
    if(speed) {filters.speed = speed};
    if(hp) {filters.hp = hp};
    if(type1) {filters.type1 = type1};
    if(type2) {filters.type2 = type2};
    if(is_legendary) {
        if(is_legendary == 1 || is_legendary === true) {
            filters.is_legendary = "1";
        } else {
            filters.is_legendary = "0";
        }
    };

    try {
        if(Object.keys(filters).length === 0) {
            throw new Error('Please, provide at least one search option');
        };

        const pokemons = await PokemonsModel.find(filters);

        if(!pokemons || pokemons.length === 0) {
            throw new NotFoundException('No pokemons were found');
        };

        return response.json(pokemons);
    } catch(err) {
        if(err instanceof NotFoundException) {
            return response.status(404).json({
                error: '@pokemons/list',
                message: err.message,
            });
        };
        return response.status(400).json({
            error: '@pokemons/list',
            message: err.message || "Failed to list pokemons",
        });
    }
};

const getById = async (request, response) => {
    const { id } = request.params;

    try {
        const pokemon = await PokemonsModel.findById(id);

        if(!pokemon) {
           throw new NotFoundException(`Pokemon not found ${id}`);
        };

        return response.json(pokemon);
    } catch(err) {
        if(err instanceof NotFoundException) {
            return response.status(404).json({
                error: '@pokemons/getById',
                message: err.message,
            });
        };
        return response.status(400).json({
                error: '@pokemons/getById',
                message: err.message || "Failed to get the pokemon",
            });
    }
};

const create = async (request, response) => {
    const { 
        name,  
        attack, 
        defense, 
        speed, 
        hp, 
        type1, 
        type2, 
        is_legendary } = request.body;

    try {
        if(is_legendary !== "0" & is_legendary !== "1") {
            throw new LegendaryException("It's necessary to input one of the following options as a string for legendary data: 0 or 1.");
        };

        const counters = await CountersModel.findOneAndUpdate(
            { name: 'pokedex_counter' },
            { $inc: { value: 1 } },
            { new: true }
          );

        const pokemon = await PokemonsModel.create({
            name,
            pokedex_number: counters.value,
            attack,
            defense,
            speed,
            hp,
            type1,
            type2,
            is_legendary
        });

        return response.status(201).json(pokemon);
    } catch(err) {
        if(err instanceof LegendaryException) {
            return response.status(400).json({
                error: '@pokemons/create',
                message: err.message,
            });
        };
        return response.status(400).json({
            error: '@pokemons/create',
            message: err.message || "Failed to create a new pokemon",
        });
    };
};

const remove = async (request, response) => {
    const { id } = request.params;

    try {
        const pokemonRemoved = await PokemonsModel.findByIdAndDelete(id);

        if(!pokemonRemoved) {
           throw new NotFoundException(`Pokemon not found ${id}`);
        };

    return response.status(204).send();
    } catch(err) {
        if(err instanceof NotFoundException) {
            return response.status(404).json({
                error: '@pokemons/remove',
                message: err.message,
            });
        };
        return response.status(400).json({
            error: '@pokemons/remove',
            message: err.message || "Failed to remove a pokemon",
        });
    }
};




module.exports = {
    list,
    getById,
    create,
    remove,
};
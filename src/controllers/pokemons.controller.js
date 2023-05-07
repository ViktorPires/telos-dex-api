const PokemonsModel = require('../model/pokemon.model');

const { NotFoundException } = require('../exceptions/NotFoundException');

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

module.exports = {
    list,
    getById,
};
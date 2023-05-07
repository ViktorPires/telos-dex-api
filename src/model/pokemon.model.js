const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        pokedex_number: {
            type: Number,
            required: true,
            unique: true,
        },
        attack: {
            type: Number,
            required: true,
        },
        defense: {
            type: Number,
            required: true,
        },
        speed: {
            type: Number,
            required: true,
        },
        hp: {
            type: Number,
            required: true,
        },
        type1: {
            type: String,
            required: true,
            lowercase: true,
        },
        type2: {
            type: String,
            lowercase: true,
        },
        is_legendary: {
            type: String,
            required: true,
        },
    } 
);

module.exports = mongoose.model("pokemons", PokemonSchema);
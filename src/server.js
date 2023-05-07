const express = require("express");

require("./config/database");

const { PORT } = require('./config/env');

const pokemonsRoutes = require('./routes/pokemons.routes');

// Import the middleware for initializing the Pokedex counter.
const { initializeCounter } = require('./middlewares/initializeCounter'); 

const app = express();

// Add the middleware for initializing the Pokedex counter.
app.use(initializeCounter);

app.use(express.json());
app.use(pokemonsRoutes);

app.use("/", (request, response) => {
    console.log(`Method: ${request.method}`);
    console.log(request.headers);
    console.log(`URL Accessed: ${request.url}`);
    response.end("Telos - DEX API");
});

app.listen(PORT, () => {
    console.log(`API Running on port ${PORT}`);
});
const express = require("express");

require("./config/database");

const { PORT } = require('./config/env');

const pokemonsRoutes = require('./routes/pokemons.routes');

const app = express();

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
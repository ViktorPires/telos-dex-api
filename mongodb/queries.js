// Listagem de todos pokemons exibindo apenas o campo nome
db.pokemons.find({}, { name: 1, _id: 0 })

/* Listagem de todos pokemons exibindo apenas os campos de nome e ataque, 
ordenado de forma decrescente com base no ataque mais forte */
db.pokemons.find({}, { name: 1, attack: 1, _id: 0 }).sort({ attack: -1 })

/* Fará a mesma listagem dos dados acima com o mesmo critério de ordenação, 
entetanto retornará a lista aparecendo em primeiro o nome e em segundo o ataque */
db.pokemons.find({}, { name: "$name", attack: "$attack", _id: 0 }).sort({ attack: -1 })

/* Listagem de todos os pokemons do tipo água como o seu tipo dominante (type1), exibindo os campos 
de nome e velocidade, ordenado de forma decrescente com base na velocidade mais rápida. */
db.pokemons.find({ type1: "water" }, { name: 1, speed: 1, _id: 0 }).sort({ speed: -1 })

/* Listagem de todos os pokemons do tipo água como o seu tipo dominante (type1) ou secundário (type2), exibindo os campos 
de nome e velocidade, ordenado de forma decrescente com base na velocidade mais rápida. */
db.pokemons.find({$or: [{type1: "water"}, {type2: "water"}]}, {name: 1, speed: 1, _id: 0}).sort({speed: -1})

/* Listagem de todos os pokemons lendário exibindo apenas o nome, número da pokédex e
o seu tipo dominante (type1) */
db.pokemons.find({is_legendary: "1"}, {name: 1, pokedex_number: 1, type1: 1, _id: 0})

/* Listagem de todos os pokemons que possuam ataque maior que "70" e velocidade maior que "60", 
exibindo os seguintes campos: id, nome, ataque, velocidade e vida */
db.pokemons.find({attack: {$gt: 70}, speed: {$gt: 60}}, {_id: 1, name: 1, attack: 1, speed: 1, hp: 1})

/* Listagem de todos os pokemons que possuam a vida menor que "60" ou a defesa menor que "60", 
exibindo os seguintes campos: id, nome, vida e defesa */
db.pokemons.find({$or: [{hp: {$lt: 60}}, {defense: {$lt: 60}}]}, {_id: 1, name: 1, hp: 1, defense: 1})

/* Listagem de todos os pokemons que possuam como o seu tipo dominante (type1) o psíquico, lutador ou fogo, 
exibindo os seguintes campos: nome, se é lendário e o seu tipo dominante (type1) */
db.pokemons.find({type1: {$in: ["psychic", "fighting", "fire"]}}, {name: 1, is_legendary: 1, type1: 1, _id: 0})

/* Listagem de todos os pokemons que possuam como o seu tipo dominante (type1) fogo e o secundário (type2) voador, exibindo os 
seguintes campos: nome, tipo dominante (type1) e o tipo secundário (type2), sendo ordenado pelo nome de forma ascendente */
db.pokemons.find({type1: "fire", type2: "flying"}, {name: 1, type1: 1, type2: 1, _id: 0}).sort({name: 1})

/* Listagem de todos os pokemons exceto os lendários, exibindo os seguintes campos: nome e número da pokédex  */
db.pokemons.find({is_legendary: "0"}, {name: 1, pokedex_number: 1, _id: 0})



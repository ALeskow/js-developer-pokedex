const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonByNumber = function(number) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
        .then(response => response.json())
        .then(pokeDetail => ({
            number: pokeDetail.id,
            name: pokeDetail.name,
            types: pokeDetail.types.map(typeSlot => typeSlot.type.name),
            type: pokeDetail.types[0].type.name,
            photo: pokeDetail.sprites.other['official-artwork'].front_default,
            height: pokeDetail.height,
            weight: pokeDetail.weight,
            abilities: pokeDetail.abilities.map(a => a.ability.name),
            base_experience: pokeDetail.base_experience,
            stats: pokeDetail.stats.map(s => ({
                name: s.stat.name,
                value: s.base_stat
            })),
            moves: pokeDetail.moves.map(m => m.move.name)
        }));
};
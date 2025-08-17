const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 8;
let offset = 0;

let allPokemons = [];

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-number="${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function renderPokemonList(pokemons) {
    pokemonList.innerHTML = pokemons.map(convertPokemonToLi).join('');
}

function loadAllPokemons() {
    pokeApi.getPokemons(0, maxRecords).then((pokemons = []) => {
        allPokemons = pokemons;
        renderPokemonList(allPokemons.slice(0, limit));
    });
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    });
}

loadAllPokemons();

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        renderPokemonList(allPokemons.slice(0, maxRecords));
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        renderPokemonList(allPokemons.slice(0, offset + limit));
    }
});

function addPokemonClickEvents() {
    document.querySelectorAll('.pokemon').forEach(card => {
        card.addEventListener('click', function() {
            const number = card.getAttribute('data-number');
            window.location.href = `details.html?number=${number}`;
        });
    });
}

function renderPokemonList(pokemons) {
    pokemonList.innerHTML = pokemons.map(convertPokemonToLi).join('');
    addPokemonClickEvents();
}

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    function filterPokemons() {
        const query = searchInput.value.toLowerCase();
        const filtered = allPokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(query)
        );
        renderPokemonList(filtered);
    }

    searchButton.addEventListener('click', filterPokemons);
    searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            filterPokemons();
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const number = params.get('number');
    const detailsDiv = document.getElementById('pokemonDetails');

    if (!number) {
        detailsDiv.innerHTML = '<p>Pokémon not found.</p>';
        return;
    }

    detailsDiv.innerHTML = '<p>Loading...</p>';

    pokeApi.getPokemonByNumber(number).then(pokemon => {
        if (!pokemon) {
            detailsDiv.innerHTML = '<p>Pokémon not found.</p>';
            return;
        }

        document.body.className = pokemon.type;

        const abilities = pokemon.abilities ? pokemon.abilities.join(', ') : 'N/A';
        const stats = pokemon.stats
            ? pokemon.stats.map(s => `<div><strong>${s.name}:</strong> ${s.value}</div>`).join('')
            : '';
        const moves = pokemon.moves
            ? pokemon.moves.slice(0, 10).map(m => m).join(', ') + (pokemon.moves.length > 10 ? '...' : '')
            : 'N/A';

        detailsDiv.innerHTML = `
            <div class="pokemon-card">
                <div class="pokemon-top">
                    <span class="number">#${pokemon.number}</span>
                    <img src="${pokemon.photo}" alt="${pokemon.name}" class="pokemon-img">
                    <span class="name">${pokemon.name}</span>
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
                <div class="card-bottom">
                    <div class="category">
                        <strong>Height:</strong> ${pokemon.height} <br>
                        <strong>Weight:</strong> ${pokemon.weight} <br>
                        <strong>Base Experience:</strong> ${pokemon.base_experience || 'N/A'} <br>
                        <strong>Abilities:</strong> ${abilities}
                    </div>
                    <div class="category">
                        <strong>Stats:</strong><br>
                        ${stats}
                    </div>
                    <div class="category">
                        <strong>Moves:</strong> ${moves}
                    </div>
                </div>
            </div>
        `;
    });
});
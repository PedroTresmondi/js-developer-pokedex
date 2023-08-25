const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            
            <div class="pokemonDetails">
                <ol class="height">Height: ${pokemon.heightInches}" (${pokemon.heightCentimeters}cm) </ol>
                <ol class="weight">Weight: ${pokemon.weightLbs} lbs (${pokemon.weightKgs})kg</ol>
                <ol class="abilities"> Abilities: ${pokemon.abilities.map((ability) => `<li class="ability"> ${ability} </li>`).join('')}</ol>
            </div>
        </li>
    `
}

pokemonList.addEventListener('click', (event) => {
    const button = event.target.closest('.pokemonCardButton');
    if (button) {
        const card = button.parentElement;
        const details = card.querySelector('.pokemonDetails');
        details.classList.toggle('expanded'); // Adicione ou remova a classe CSS "expanded" no card associado
    }
});

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
const pokemonApi = 'https://pokeapi.co/api/v2/type/';
const params = new URLSearchParams(window.location.search);
console.log('params: ', params);

const typesOfParams = new URLSearchParams(window.location.search);
const typesOfSearch = typesOfParams.get('type');

const pokemonn = document.getElementById('pokemon');
const pokemonSearch = document.querySelector('#pokemon-search');
const pokemonTypeFilter = document.querySelector('.typeFilter');

let pokeArr = [];
let differentTypes = new Set();

const fetchPokemonData = () => {
    const pokemons = []; // promises
    for (let index = 1; index <= 151; index++) {
        const pokeapiURL = `https://pokeapi.co/api/v2/pokemon/${index}`;
        console.log('pokeapiURL: ', pokeapiURL);
        pokemons?.push(fetch(pokeapiURL).then(res => res.json()))
    }
    Promise?.all(pokemons)
        .then(data => {
            const pokemonGenerations = data?.map(item => ({
                frontImage: item.sprites['front_default'],
                pokemon_id: item.id,
                name: item.name,
                type: item.types[0].type.name,
                abilities: item.abilities.map(item => item.ability.name).join(', '),
                description: item.species.url,
            }))
            pokeArr = pokemonGenerations
            console.log('pokemonGenerations: ', pokemonGenerations);
            createPokemonCards(pokemonGenerations);
        })
        .then(generateTypes);
}
fetchPokemonData()

pokemonSearch.addEventListener('input', (event) => {
    const filter = pokeArr.filter(item => pokemon.name.includes(event.target.value.toLowerCase()));
    clearPokemon()
    createPokemonCards(filter);
})

function clearPokemon() {
    let section = document.querySelector('#Pokemon');
    section.innerHTML = ''
}

function createPokemonCards(data) {
    let currentPokemon = data;
    if (typesOfSearch) {
        currentPokemon = data.filter(item => item.type.includes(typesOfSearch.toLowerCase()))
    }
    currentPokemon.forEach(pokemon => {
        createPokemonCard(pokemon)
    })
}

function createPokemonCard(pokemon) {
    console.log('pokemon:++++++++++++++++ ', pokemon);
    const flipCard = document.createElement("div")
    flipCard.classList.add("flip-card")
    flipCard.id = `${pokemon.name}`
    pokemonn.append(flipCard)

    const flipCardInner = document.createElement("div")
    flipCardInner.classList.add("flip-card-inner")
    flipCardInner.id = `${pokemon.type}`
    flipCard.append(flipCardInner)

    const frontCard = document.createElement("div")
    frontCard.classList.add('front-pokemon-card')

    const frontImage = document.createElement('img')
    frontImage.src = `${pokemon.frontImage}`
    frontImage.classList.add("front-pokemon-image")

    const frontPokeName = document.createElement('h2')
    // frontPokeName.innerHTML = `<a href="/pokemon.html?pokemon_id=${pokemon.pokemon_id}">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</a>`
    frontPokeName.innerHTML = `<a href="pokemon.html?pokemon_id=${pokemon.pokemon_id}">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</a>`
    console.log('pokemon.pokemon_id: ', pokemon.pokemon_id);




    const frontPokeID = document.createElement('p')
    frontPokeID.textContent = `#${pokemon.pokemon_id}`
    frontPokeID.classList.add("front-poke-id")

    const frontDescription = document.createElement("p")


    const frontPokeType = document.createElement('p')
    frontPokeType.textContent = `${pokemon.type.toUpperCase()}`
    frontPokeType.classList.add("front-pokemon-type")

    frontCard.append(frontImage, frontPokeID, frontPokeName, frontDescription, frontPokeType)

    const backCard = document.createElement("div")
    backCard.classList.add('back-pokemon-card')

    const backImage = document.createElement('img')
    backImage.src = `${pokemon.frontImage}`
    console.log('pokemon.backImage: ', pokemon);
    frontImage.classList.add("back-pokemon-image")

    const backPokeID = document.createElement('p')
    backPokeID.textContent = `#${pokemon.pokemon_id}`
    backPokeID.classList.add("back-poke-id")

    const backPokeName = document.createElement('h2')
    backPokeName.innerHTML = `<a href="/pokemon.html?pokemon_id=${pokemon.pokemon_id}">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</a>`
    backPokeName.classList.add("back-pokemon-name")

    const backPokeAbilities = document.createElement("p")
    backPokeAbilities.innerHTML = `<p>Abilities:<br>${pokemon.abilities}<p>`
    backPokeAbilities.classList.add("back-pokemon-abilities")

    backCard.append(backImage, backPokeID, backPokeName, backPokeAbilities)
    flipCardInner.append(frontCard, backCard);
    differentTypes.add(pokemon.type);
}

function generateTypes() {
    differentTypes.forEach(type => {
        const typeOption = document.createElement('option');
        typeOption.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        typeOption.value = type;

        pokemonTypeFilter.append(typeOption)
    })
}
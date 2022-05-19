const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) => axios(getPokemonUrl(index + 1)))

const generatePokemonLi = ({id, name, types, sprites: {front_default: pokemonImage}}) => {
  const pokemonTypes = types.map(typeInfo => typeInfo.type.name)

  const pokemonLi = document.createElement('li')
  pokemonLi.classList.add('card', pokemonTypes[0])
  pokemonLi.innerHTML = 
    `<img class="card-image" src="${pokemonImage}" alt="${name}"/> 
    <h2 class="card-title">${id}. ${name}<h2>
    <p class="card-subtitle">${pokemonTypes.join(' | ')}</p>`

  return pokemonLi
}

const fetchPokemon = async() => {
  const pokemonPromises = generatePokemonPromises()
  const pokemonResponses = await Promise.all(pokemonPromises)
  const pokemons = pokemonResponses.map(response => response.data)
  
  pokemons.forEach(pokemon => renderPokemon(pokemon))
}

const renderPokemon = pokemon => {
  const pokedex = document.querySelector('.pokedex')
  const pokemonLi = generatePokemonLi(pokemon)
  pokedex.appendChild(pokemonLi)
}

fetchPokemon()
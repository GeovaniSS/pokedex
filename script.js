const fetchPokemon = async() => {
  const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
  const pokemonPromises = []

  for (let i = 1; i <= 150; i++) {
    pokemonPromises.push(axios(getPokemonUrl(i)))
  }

  const pokemonResponses = await Promise.all(pokemonPromises)
  const pokemons = pokemonResponses.map(response => response.data)
  
  pokemons.forEach(pokemon => renderPokemon(pokemon))
}

const renderPokemon = pokemon => {
  const { id, name, types, sprites: {front_default: pokemonImage} } = pokemon

  const pokemonTypes = types.map(typeInfo => typeInfo.type.name)
  const pokedex = document.querySelector('.pokedex')
  
  const pokemonLi = document.createElement('li')
  pokemonLi.classList.add('card', pokemonTypes[0])
  pokemonLi.innerHTML = 
   `<img class="card-image" src="${pokemonImage}" alt="${name}"/> 
    <h2 class="card-title">${id}. ${name}<h2>
    <p class="card-subtitle">${pokemonTypes.join(' | ')}</p>`

  pokedex.appendChild(pokemonLi)
}

fetchPokemon()
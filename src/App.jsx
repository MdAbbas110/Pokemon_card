import { useEffect, useState } from "react"
import PokemonThumbnail from "./components/PokemonThumbnail"

function App() {

const [allPokemons , setAllPokemon] = useState([])

const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
  
const getAllPokemon = async () => {
  const res = await fetch(loadMore)
  const data = await res.json()
  
  setLoadMore(data.next)

  function createPokemonObject (result) {
    result.forEach(async (pokemon) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      const data = await res.json()

      setAllPokemon(currentList => [...currentList, data])
    })
  }
  createPokemonObject(data.results)
  await console.log(allPokemons);
}

useEffect(() => {
  getAllPokemon()
},[]) 

return (
  <div className="app-contaner">
    <h1>Pokemon Evolution</h1>
    <div className="pokemon-container">
      <div className="all-container">
        {allPokemons.map( (pokemonStats, index) => 
          <PokemonThumbnail
            key={index}
            id={pokemonStats.id}
            image={pokemonStats.sprites.other.dream_world.front_default}
            name={pokemonStats.name}
            type={pokemonStats.types[0].type.name}
          />)}
        
      </div>
        <button className="load-more" onClick={() => getAllPokemon()}>Load more</button>
    </div>
  </div>
);
}

export default App

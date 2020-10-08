// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React from 'react'
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (pokemonName) {
      setError(null)
      setPokemon(null)
      fetchPokemon(pokemonName).then(setPokemon).catch(setError)
    }
  }, [pokemonName])

  let pokeInfo = 'Submit a Pokemon'

  if (pokemonName) {
    pokeInfo = pokemon ? (
      <PokemonDataView pokemon={pokemon} />
    ) : (
      <PokemonInfoFallback name={pokemonName} />
    )
  }

  if (error) {
    pokeInfo = (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }

  return pokeInfo
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App

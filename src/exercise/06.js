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
  const [status, setStatus] = React.useState({status: 'idle'})

  React.useEffect(() => {
    if (pokemonName) {
      setStatus({status: 'pending'})
      fetchPokemon(pokemonName)
        .then(data => {
          setStatus({status: 'resolved', pokemon: data})
        })
        .catch(error => {
          setStatus({status: 'rejected', error})
        })
    }
  }, [pokemonName])

  switch (status.status) {
    default:
      return 'Submit a Pokemon'
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'resolved':
      return <PokemonDataView pokemon={status.pokemon} />
    case 'rejected':
      return (
        <div role="alert">
          There was an error:{' '}
          <pre style={{whiteSpace: 'normal'}}>{status.error.message}</pre>
        </div>
      )
  }
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

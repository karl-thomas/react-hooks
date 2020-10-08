// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React from 'react'
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'
import {ErrorBoundary} from 'react-error-boundary'

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
      throw status.error
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }
  const pokemonSearchError = ({error, resetErrorBoundary}) => (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          resetKeys={[pokemonName]}
          fallbackRender={pokemonSearchError}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App

// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React from 'react'
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {hasError: false, error: null}
  }

  static getDerivedStateFromError(error) {
    return {hasError: true, error}
  }

  componentDidCatch(error, errorInfo) {}

  render() {
    return this.state.hasError
      ? this.props.onError(this.state.error)
      : this.props.children
  }
}

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
      // return (
      //   <div role="alert">
      //     There was an error:{' '}
      //     <pre style={{whiteSpace: 'normal'}}>{status.error.message}</pre>
      //   </div>
      // )
      throw status.error
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }
  const pokemonSearchError = error => (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary key={pokemonName} onError={pokemonSearchError}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App

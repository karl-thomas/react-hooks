// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React from 'react'

const canBeParsed = parser => str => {
  try {
    return parser(str) && !!str
  } catch (e) {
    return false
  }
}

const useLocalStorage = (
  title,
  initialValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) => {
  const canBeDeserialized = canBeParsed(deserialize)
  const [stateItem, setState] = React.useState(() => {
    const unparsedValue = window.localStorage.getItem(title)

    if (unparsedValue) {
      return canBeDeserialized(unparsedValue)
        ? deserialize(unparsedValue)
        : unparsedValue
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue
  })

  // hold on to the title to see if it changes later in the following `useEffect`
  const prevTitleContainer = React.useRef(title)

  React.useEffect(() => {
    const prevTitle = prevTitleContainer.current
    if (prevTitle !== title) {
      window.localStorage.removeItem(prevTitle)
    }
    prevTitleContainer.current = title
    window.localStorage.setItem(title, serialize(stateItem))
  }, [stateItem, title, serialize])

  return [stateItem, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorage('name', initialName)
  console.log('name', name)
  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App

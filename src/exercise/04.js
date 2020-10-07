// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React from 'react'
import {useLocalStorageState} from '../utils'

function Board() {
  const [squares, setSquares] = useLocalStorageState(
    'squares',
    Array(9).fill(null),
  )
  const [nextValue, setNextValue] = useLocalStorageState(
    'nextValue',
    calculateNextValue(squares),
  )
  const [winner, setWinner] = useLocalStorageState(
    'winner',
    calculateWinner(squares),
  )
  const [status, setStatus] = useLocalStorageState(
    'status',
    calculateStatus(winner, squares, nextValue),
  )
  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  function selectSquare(square) {
    if (winner || squares[square]) return

    let newSquares = [...squares]
    newSquares[square] = nextValue
    const newNextValue = calculateNextValue(newSquares)
    const newWinner = calculateWinner(newSquares)
    const newStatus = calculateStatus(newWinner, newSquares, newNextValue)
    setSquares(newSquares)
    setNextValue(newNextValue)
    setWinner(newWinner)
    setStatus(newStatus)
  }

  function restart() {
    const newSquares = Array(9).fill(null)
    const newNextValue = calculateNextValue(newSquares)
    const newWinner = calculateWinner(newSquares)
    const newStatus = calculateStatus(newWinner, newSquares, newNextValue)
    setSquares(newSquares)
    setNextValue(newNextValue)
    setWinner(newWinner)
    setStatus(newStatus)
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      {/* 🐨 put the status here */}
      <div className="status">STATUS</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      {status ? <p>{status}</p> : ''}
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App

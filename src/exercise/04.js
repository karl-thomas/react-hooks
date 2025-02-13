// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React from 'react'
import {useLocalStorageState} from '../utils'

function Board({squares, onClick}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
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
    </div>
  )
}

function Game() {
  const [history, setHistory] = useLocalStorageState('history', [
    Array(9).fill(null),
  ])
  const [bookmark, setBookmark] = useLocalStorageState('bookmark', 0)

  const squares = history[bookmark]
  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  const status = calculateStatus(winner, squares, nextValue)

  function selectSquare(square) {
    if (winner || squares[square]) return

    const newSquares = [...squares]
    newSquares[square] = nextValue

    let newHistory = [...history]
    newHistory[history.length] = newSquares

    setHistory(newHistory)
    setBookmark(history.length)
  }

  function restart() {
    setHistory([Array(9).fill(null)])
    setBookmark(0)
  }

  const moves = (
    <ol>
      {history.map((squares, step) => {
        const isCurrent = step === bookmark

        return (
          <li style={{marginBottom: '1rem'}} key={step}>
            <button
              style={{
                padding: '0.5rem 0.3rem',
                borderRadius: '8px',
                marginRight: '1rem',
              }}
              onClick={() => setBookmark(step)}
              disabled={isCurrent}
            >
              Go to {step === 0 ? 'game start' : `move #${step}`}{' '}
            </button>
            <span>{isCurrent ? '(current)' : ''}</span>
          </li>
        )
      })}
    </ol>
  )

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={selectSquare} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <strong role="status" aria-live="polite">
          {status}
        </strong>
        {moves}
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

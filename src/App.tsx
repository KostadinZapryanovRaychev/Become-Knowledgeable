import { useState } from 'react'
import './App.css'
import QuizGame from './components/QuizGame'
import StartScreen from './components/StartScreen'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [playerName, setPlayerName] = useState('')

  return (
    <div className="app">
      {!gameStarted ? (
        <StartScreen onStart={(name: string) => {
          setPlayerName(name)
          setGameStarted(true)
        }} />
      ) : (
        <QuizGame onEnd={() => setGameStarted(false)} playerName={playerName} />
      )}
    </div>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import QuizGame from './components/QuizGame'
import StartScreen from './components/StartScreen'

function App() {
  const [gameStarted, setGameStarted] = useState(false)

  return (
    <div className="app">
      {!gameStarted ? (
        <StartScreen onStart={() => setGameStarted(true)} />
      ) : (
        <QuizGame onEnd={() => setGameStarted(false)} />
      )}
    </div>
  )
}

export default App
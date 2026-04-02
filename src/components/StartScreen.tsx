import { useState } from 'react'
import '../styles/StartScreen.css'

interface StartScreenProps {
  onStart: (name: string) => void
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const [playerName, setPlayerName] = useState('')

  const handleStart = () => {
    if (playerName.trim()) {
      onStart(playerName)
    }
  }

  return (
    <div className="start-screen">
      <div className="start-container">
        <h1 className="title">Станете Знаеща Личност</h1>
        
        <div className="player-input-section">
          <label htmlFor="player-name" className="player-label">Вашето Име:</label>
          <input
            id="player-name"
            type="text"
            className="player-input"
            placeholder="Въведете вашето име..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleStart()}
          />
        </div>
        

        <button className="start-btn" onClick={handleStart} disabled={!playerName.trim()}>
          Начало
        </button>
      </div>
    </div>
  )
}

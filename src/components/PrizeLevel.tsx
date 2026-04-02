import '../styles/PrizeLevel.css'

interface PrizeLevelProps {
  levels: number[]
  currentLevel: number
  score: number
}

export default function PrizeLevel({ levels, currentLevel, score }: PrizeLevelProps) {
  return (
    <div className="prize-level">
      <h3>Лестница на Наградите</h3>
      <div className="prize-list">
        {levels.map((level, index) => (
          <div
            key={index}
            className={`prize-item ${index === currentLevel ? 'current' : ''} ${index < currentLevel ? 'passed' : ''}`}
          >
            <span className="level-number">{index + 1}</span>
            <span className="prize-amount">{level.toLocaleString('bg-BG')} лв.</span>
          </div>
        ))}
      </div>
    </div>
  )
}

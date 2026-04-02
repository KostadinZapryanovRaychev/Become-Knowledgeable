import '../styles/StartScreen.css'

interface StartScreenProps {
  onStart: () => void
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="start-screen">
      <div className="start-container">
        <h1 className="title">Станете Знаеща Личност</h1>

        <button className="start-btn" onClick={onStart}>
          Начало
        </button>
      </div>
    </div>
  )
}

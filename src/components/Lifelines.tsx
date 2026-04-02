import '../styles/Lifelines.css'

interface LifelinesProps {
  lifelines: {
    fifty: boolean
    coworker: boolean
    phone: boolean
  }
  usedLifelines: {
    fifty: boolean
    coworker: boolean
    phone: boolean
  }
  onFiftyFifty: () => void
  onAskCoworker: () => void
  onPhoneFriend: () => void
}

export default function Lifelines({
  lifelines,
  usedLifelines,
  onFiftyFifty,
  onAskCoworker,
  onPhoneFriend
}: LifelinesProps) {
  return (
    <div className="lifelines">
      <h3>Спомагатели</h3>
      <div className="lifelines-grid">
        <button
          className={`lifeline-btn fifty ${usedLifelines.fifty ? 'used' : ''}`}
          onClick={onFiftyFifty}
          disabled={usedLifelines.fifty || !lifelines.fifty}
          title="50/50"
        >
          <span className="lifeline-icon">50/50</span>
          <span className="lifeline-label">Елиминирай две</span>
        </button>

        <button
          className={`lifeline-btn coworker ${usedLifelines.coworker ? 'used' : ''}`}
          onClick={onAskCoworker}
          disabled={usedLifelines.coworker || !lifelines.coworker}
          title="Попитай Колегата"
        >
          <span className="lifeline-icon">Колега</span>
          <span className="lifeline-label">Попитай</span>
        </button>

        <button
          className={`lifeline-btn phone ${usedLifelines.phone ? 'used' : ''}`}
          onClick={onPhoneFriend}
          disabled={usedLifelines.phone || !lifelines.phone}
          title="Телефонен Звонок"
        >
          <span className="lifeline-icon">Телефон</span>
          <span className="lifeline-label">Звонок</span>
        </button>
      </div>
    </div>
  )
}

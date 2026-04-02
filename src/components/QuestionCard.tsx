import '../styles/QuestionCard.css'

interface QuestionCardProps {
  question: string
  answers: string[]
  visibleAnswers: number[]
  onAnswer: (index: number) => void
  difficulty: number
}

export default function QuestionCard({
  question,
  answers,
  visibleAnswers,
  onAnswer,
  difficulty
}: QuestionCardProps) {
  const getDifficultyColor = (level: number) => {
    if (level < 5) return '#4CAF50'
    if (level < 10) return '#FF9800'
    return '#F44336'
  }

  return (
    <div className="question-card">
      <div className="difficulty-indicator" style={{ backgroundColor: getDifficultyColor(difficulty) }}>
        Трудност: {difficulty < 5 ? 'Лесна' : difficulty < 10 ? 'Средна' : 'Трудна'}
      </div>

      <h2 className="question">{question}</h2>

      <div className="answers-grid">
        {answers.map((answer, index) => (
          <button
            key={index}
            className={`answer-btn ${visibleAnswers.includes(index) ? '' : 'hidden'}`}
            onClick={() => onAnswer(index)}
            disabled={!visibleAnswers.includes(index)}
          >
            <span className="answer-letter">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="answer-text">{answer}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

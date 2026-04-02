import { useState, useEffect } from 'react'
import '../styles/QuestionCard.css'

interface QuestionCardProps {
  question: string
  answers: string[]
  visibleAnswers: number[]
  onAnswer: (index: number) => void
  difficulty: number
  correct: number
}

export default function QuestionCard({
  question,
  answers,
  visibleAnswers,
  onAnswer,
  difficulty,
  correct
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answerState, setAnswerState] = useState<'pending' | 'correct' | 'wrong' | null>(null)

  const getDifficultyColor = (level: number) => {
    if (level < 5) return '#4CAF50'
    if (level < 10) return '#FF9800'
    return '#F44336'
  }

  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null) return
    
    setSelectedAnswer(index)
    setAnswerState('pending')

    setTimeout(() => {
      const isCorrect = index === correct
      console.log(`Answer clicked: index=${index}, correct=${correct}, isCorrect=${isCorrect}`)
      setAnswerState(isCorrect ? 'correct' : 'wrong')
      
      setTimeout(() => {
        onAnswer(index)
        setSelectedAnswer(null)
        setAnswerState(null)
      }, 800)
    }, 1500)
  }

  const getButtonClass = (index: number) => {
    let classes = `answer-btn ${visibleAnswers.includes(index) ? '' : 'hidden'}`
    
    if (selectedAnswer === index) {
      if (answerState === 'pending') {
        classes += ' selected-pending'
      } else if (answerState === 'correct') {
        classes += ' selected-correct'
      } else if (answerState === 'wrong') {
        classes += ' selected-wrong'
      }
    }
    
    return classes
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
            className={getButtonClass(index)}
            onClick={() => handleAnswerClick(index)}
            disabled={!visibleAnswers.includes(index) || selectedAnswer !== null}
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

import { useState } from 'react'
import '../styles/QuizGame.css'
import quizData from '../data/questions.json'
import QuestionCard from './QuestionCard'
import Lifelines from './Lifelines'
import PrizeLevel from './PrizeLevel'

interface Question {
  id: number
  question: string
  answers: string[]
  correct: number
  difficulty: number
}

interface QuizGameProps {
  onEnd: () => void
  playerName: string
}

const PRIZE_LEVELS = [2.0, 2.1, 2.3, 2.4, 2.6, 2.7, 2.9, 3.0, 3.4, 3.9, 4.3, 4.7, 5.1, 5.6, 6.0]

export default function QuizGame({ onEnd, playerName }: QuizGameProps) {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [message, setMessage] = useState('')
  const [lifelines, setLifelines] = useState({
    fifty: true,
    coworker: true,
    phone: true
  })
  const [usedLifelines, setUsedLifelines] = useState({
    fifty: false,
    coworker: false,
    phone: false
  })
  const [visibleAnswers, setVisibleAnswers] = useState([0, 1, 2, 3])
  const [coworkerSuggestion, setCoworkerSuggestion] = useState<number | null>(null)
  const [showCoworkerResult, setShowCoworkerResult] = useState(false)
  const [phoneFriendResult, setPhoneFriendResult] = useState<string | null>(null)
  const [showPhoneResult, setShowPhoneResult] = useState(false)

  const currentQuestion: Question = quizData.questions[currentLevel]

  const handleFiftyFifty = () => {
    if (!lifelines.fifty) return

    const correct = currentQuestion.correct
    const incorrect = [0, 1, 2, 3].filter(i => i !== correct)
    const toRemove = incorrect.slice(0, 2)
    const remaining = [0, 1, 2, 3].filter(i => !toRemove.includes(i))

    setVisibleAnswers(remaining)
    setLifelines(prev => ({ ...prev, fifty: false }))
    setUsedLifelines(prev => ({ ...prev, fifty: true }))
  }

  const handleAskCoworker = () => {
    if (!lifelines.coworker) return

    const correct = currentQuestion.correct
    const probability = Math.random()
    const suggestion = probability > 0.3 ? correct : Math.floor(Math.random() * 4)

    setCoworkerSuggestion(suggestion)
    setShowCoworkerResult(true)
    setLifelines(prev => ({ ...prev, coworker: false }))
    setUsedLifelines(prev => ({ ...prev, coworker: true }))

    setTimeout(() => setShowCoworkerResult(false), 3000)
  }

  const handlePhoneFriend = () => {
    if (!lifelines.phone) return

    const correct = currentQuestion.correct
    const answers = currentQuestion.answers
    const suggestion = answers[correct]
    const response = `Мислим че отговорът е: ${suggestion}`

    setPhoneFriendResult(response)
    setShowPhoneResult(true)
    setLifelines(prev => ({ ...prev, phone: false }))
    setUsedLifelines(prev => ({ ...prev, phone: true }))

    setTimeout(() => setShowPhoneResult(false), 4000)
  }

  const handleAnswer = (index: number) => {
    if (gameOver || !visibleAnswers.includes(index)) return

    const isCorrect = index === currentQuestion.correct

    if (isCorrect) {
      const newScore = PRIZE_LEVELS[currentLevel]
      setScore(newScore)
      setMessage('Правилно!')

      if (currentLevel === 14) {
        setMessage('Поздравления! Станахте Отличник!')
        setGameOver(true)
        return
      }

      setTimeout(() => {
        setCurrentLevel(prev => prev + 1)
        setMessage('')
        setVisibleAnswers([0, 1, 2, 3])
        setCoworkerSuggestion(null)
        setPhoneFriendResult(null)
      }, 1500)
    } else {
      setMessage('Неправилно!')
      const finalScore = currentLevel < 5 ? 2.0 : score
      setScore(finalScore)
      setGameOver(true)
    }
  }

  return (
    <div className="quiz-game">
      <div className="game-container">
        <div className="game-header">
          <h1>Станете Знаеща Личност</h1>
          <div className="player-info">Играч: <span>{playerName}</span></div>
          <div className="score-info">
            <div className="current-prize">
              Текуща Оценка: <span>{score.toFixed(1)}</span>
            </div>
            <div className="level-info">
              Ниво {currentLevel + 1} / 15
            </div>
          </div>
        </div>

        <div className="game-content">
          <div className="left-section">
            <PrizeLevel levels={PRIZE_LEVELS} currentLevel={currentLevel} score={score} />
          </div>

          <div className="center-section">
            {!gameOver ? (
              <>
                <QuestionCard
                  question={currentQuestion.question}
                  answers={currentQuestion.answers}
                  visibleAnswers={visibleAnswers}
                  onAnswer={handleAnswer}
                  difficulty={currentLevel}
                />

                {showCoworkerResult && coworkerSuggestion !== null && (
                  <div className="lifeline-result coworker">
                    Колегата мисли: {currentQuestion.answers[coworkerSuggestion]}
                  </div>
                )}

                {showPhoneResult && (
                  <div className="lifeline-result phone">
                    Приятел: {phoneFriendResult}
                  </div>
                )}

                <Lifelines
                  lifelines={lifelines}
                  usedLifelines={usedLifelines}
                  onFiftyFifty={handleFiftyFifty}
                  onAskCoworker={handleAskCoworker}
                  onPhoneFriend={handlePhoneFriend}
                />
              </>
            ) : (
              <div className="game-over">
                <p className="game-over-message">{message}</p>
                <div className="final-certificate">
                  <div className="certificate-header">Сертификат</div>
                  <div className="certificate-body">
                    <p className="certificate-text">Този сертификат се издава на</p>
                    <p className="player-name-cert">{playerName}</p>
                    <p className="certificate-text">за успешното завършване на курса</p>
                    <p className="course-name">Станете Знаеща Личност</p>
                    <div className="final-score">
                      <p>Финална Оценка:</p>
                      <h2>{score.toFixed(1)}</h2>
                    </div>
                    <p className="certificate-date">{new Date().toLocaleDateString('bg-BG')}</p>
                  </div>
                </div>
                <button className="restart-btn" onClick={onEnd}>
                  Главно Меню
                </button>
              </div>
            )}
          </div>

          <div className="right-section">
            <div className="info-box">
              <h3>Информация</h3>
              <p><strong>Ниво:</strong> {currentLevel + 1}</p>
              <p><strong>Оценка:</strong> {PRIZE_LEVELS[currentLevel].toFixed(1)}</p>
              <p><strong>Спомагатели:</strong></p>
              <p>50/50: {usedLifelines.fifty ? '✓' : '✗'}</p>
              <p>Колега: {usedLifelines.coworker ? '✓' : '✗'}</p>
              <p>Телефон: {usedLifelines.phone ? '✓' : '✗'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

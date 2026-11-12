import { useCallback, useEffect, useRef, useState } from 'react'
import QuestionField from './QuestionField'
import WriteOnText from './WriteOnText'

const answerFeedbackDelay = 900
const firstQuestionDelay = 450
const recommendationDelay = 350
const pageExitDuration = 360

function ScenarioPage({ scenario, index, answers, onAnswerChange, onNext }) {
  const [phase, setPhase] = useState('description')
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const initialQuestionRef = useRef(null)
  const recommendationRef = useRef(null)
  const finalQuestionRef = useRef(null)

  const finishDescription = useCallback(() => setPhase('question-pending'), [])
  const finishRecommendation = useCallback(() => setPhase('final-question'), [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    media.addEventListener('change', update)
    update()
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (phase === 'question-pending') {
      const timer = setTimeout(() => setPhase('question'), firstQuestionDelay)
      return () => clearTimeout(timer)
    }
    if (phase === 'question') {
      const timer = setTimeout(() => setPhase('initial-answer'), reducedMotion ? 0 : 480)
      return () => clearTimeout(timer)
    }
    if (phase === 'recommendation-pending') {
      const timer = setTimeout(() => setPhase('recommendation'), recommendationDelay)
      return () => clearTimeout(timer)
    }
    if (phase === 'final-locked') {
      const timer = setTimeout(
        () => {
          if (reducedMotion) onNext()
          else setPhase('transitioning')
        },
        answerFeedbackDelay,
      )
      return () => clearTimeout(timer)
    }
    if (phase === 'transitioning') {
      const timer = setTimeout(onNext, pageExitDuration)
      return () => clearTimeout(timer)
    }
  }, [phase, reducedMotion, onNext])

  useEffect(() => {
    if (phase === 'question') initialQuestionRef.current.focus()
    if (phase === 'recommendation') recommendationRef.current.focus()
    if (phase === 'final-question' || phase === 'final-locked') finalQuestionRef.current.focus()
  }, [phase])

  function chooseInitial(value) {
    onAnswerChange('initial', value)
    setPhase('recommendation-pending')
  }

  function chooseFinal(value) {
    onAnswerChange('final', value)
    setPhase('final-locked')
  }

  const showRecommendation = ['recommendation', 'final-question', 'final-locked', 'transitioning'].includes(phase)

  return (
    <section
      className={`survey-content${phase === 'transitioning' ? ' survey-content--exiting' : ''}`}
      aria-labelledby="scenario-title"
    >
      <h1 id="scenario-title" tabIndex="-1">Scenario {index + 1}</h1>
      <p className="scenario-description">
        <WriteOnText
          text={scenario.description}
          onComplete={finishDescription}
          reducedMotion={reducedMotion}
          startDelay={480}
        />
      </p>

      {!['description', 'question-pending'].includes(phase) && (
        <QuestionField
          question={scenario.question}
          value={answers.initial}
          locked={phase !== 'initial-answer'}
          showLockedState={phase !== 'question' && phase !== 'initial-answer'}
          showOptions={phase !== 'question'}
          onChange={chooseInitial}
          legendRef={initialQuestionRef}
        />
      )}

      {showRecommendation && (
        <section className="recommendation reveal" aria-labelledby="recommendation-title">
          <h2 id="recommendation-title" ref={recommendationRef} tabIndex="-1">Artificial Moral Assistant</h2>
          <p aria-live="polite">
            <WriteOnText
              text={`Recommends: ${scenario.recommendation.answer}. ${scenario.recommendation.reasoning}`}
              boldPrefix={`Recommends: ${scenario.recommendation.answer}.`}
              onComplete={finishRecommendation}
              reducedMotion={reducedMotion}
            />
          </p>
        </section>
      )}

      {(phase === 'final-question' || phase === 'final-locked') && (
        <QuestionField
          question={scenario.question}
          value={answers.final}
          locked={phase === 'final-locked'}
          showLockedState={phase === 'final-locked'}
          onChange={chooseFinal}
          legendRef={finalQuestionRef}
        />
      )}
    </section>
  )
}

export default ScenarioPage

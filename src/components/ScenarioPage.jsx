import { useCallback, useEffect, useRef, useState } from 'react'
import QuestionField from './QuestionField'
import WriteOnText from './WriteOnText'

function ScenarioPage({ scenario, index, answers, onAnswerChange, onNext }) {
  const [phase, setPhase] = useState('description')
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const initialQuestionRef = useRef(null)
  const recommendationRef = useRef(null)
  const finalQuestionRef = useRef(null)

  const finishDescription = useCallback(() => setPhase('question'), [])
  const finishRecommendation = useCallback(() => setPhase('final-question'), [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    media.addEventListener('change', update)
    update()
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (phase === 'question') {
      const timer = setTimeout(() => setPhase('initial-answer'), reducedMotion ? 0 : 480)
      return () => clearTimeout(timer)
    }
  }, [phase, reducedMotion])

  useEffect(() => {
    if (phase === 'question') initialQuestionRef.current.focus()
    if (phase === 'recommendation') recommendationRef.current.focus()
    if (phase === 'final-question') finalQuestionRef.current.focus()
  }, [phase])

  function chooseInitial(value) {
    onAnswerChange('initial', value)
    setPhase('recommendation')
  }

  function chooseFinal(value) {
    onAnswerChange('final', value)
    onNext()
  }

  const showRecommendation = ['recommendation', 'final-question'].includes(phase)

  return (
    <section className="survey-content" aria-labelledby="scenario-title">
      <h1 id="scenario-title" tabIndex="-1">Scenario {index + 1}</h1>
      <p className="scenario-description">
        <WriteOnText
          text={scenario.description}
          onComplete={finishDescription}
          reducedMotion={reducedMotion}
          startDelay={480}
        />
      </p>

      {phase !== 'description' && (
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
            <strong>Recommends: {scenario.recommendation.answer}.</strong>{' '}
            <WriteOnText
              text={scenario.recommendation.reasoning}
              onComplete={finishRecommendation}
              reducedMotion={reducedMotion}
            />
          </p>
        </section>
      )}

      {phase === 'final-question' && (
        <QuestionField
          question={scenario.question}
          value={answers.final}
          onChange={chooseFinal}
          legendRef={finalQuestionRef}
        />
      )}
    </section>
  )
}

export default ScenarioPage

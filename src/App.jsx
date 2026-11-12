import { useCallback, useEffect, useRef, useState } from 'react'
import ScenarioPage from './components/ScenarioPage'
import SurveyButton from './components/SurveyButton'
import { scenarios } from './scenarios'
import './App.css'

function App() {
  const [step, setStep] = useState('welcome')
  const [answers, setAnswers] = useState({})
  const mainRef = useRef(null)
  const previousStep = useRef(step)
  const nextStep = useCallback(
    () => setStep((current) => current === scenarios.length - 1 ? 'end' : current + 1),
    [],
  )

  useEffect(() => {
    if (previousStep.current !== step) {
      mainRef.current.querySelector('h1').focus()
      previousStep.current = step
    }
  }, [step])

  function updateAnswer(scenarioId, questionId, value) {
    setAnswers((current) => ({
      ...current,
      [scenarioId]: {
        ...current[scenarioId],
        [questionId]: value,
      },
    }))
  }

  function restart() {
    setAnswers({})
    setStep('welcome')
  }

  const isScenario = typeof step === 'number'
  const showProgress = isScenario || step === 'end'
  const completedScenarios = scenarios.reduce(
    (count, scenario) => count + Number(Boolean(answers[scenario.id]?.final)),
    0,
  )
  const progressValue = step === 'end' ? scenarios.length : completedScenarios

  return (
    <div className="app-shell">
      <header className={`app-header${showProgress ? ' app-header--survey' : ''}`}>
        {step === 'welcome' ? (
          <a className="brand" href={import.meta.env.BASE_URL} aria-label="Artificial Moral Assistant home">
            Artificial Moral Assistant
          </a>
        ) : (
          <span className="brand">{isScenario ? `Scenario ${step + 1} of ${scenarios.length}` : 'Artificial Moral Assistant'}</span>
        )}
        <span className="header-note">Study preview</span>
        {showProgress && (
          <div
            className="survey-progress"
            role="progressbar"
            aria-label="Scenario progress"
            aria-valuemin="0"
            aria-valuemax={scenarios.length}
            aria-valuenow={progressValue}
            aria-valuetext={`${progressValue} of ${scenarios.length} scenarios completed`}
          >
            <span style={{ transform: `scaleX(${progressValue / scenarios.length})` }} />
          </div>
        )}
      </header>

      <main className={isScenario ? 'survey-main' : 'welcome-main'} ref={mainRef}>
        {step === 'welcome' && (
          <section className="welcome-content" aria-labelledby="welcome-title">
            <h1 id="welcome-title" tabIndex="-1">Artificial Moral Assistant</h1>
            <SurveyButton onClick={() => setStep(0)}>
              Start
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M4.5 10h10m-4-4 4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </SurveyButton>
            <p className="welcome-note">Study preview with example scenarios. Answers are not saved or submitted.</p>
          </section>
        )}

        {isScenario && (
          <ScenarioPage
            key={scenarios[step].id}
            scenario={scenarios[step]}
            index={step}
            answers={answers[scenarios[step].id] ?? {}}
            onAnswerChange={(questionId, value) => updateAnswer(scenarios[step].id, questionId, value)}
            onNext={nextStep}
          />
        )}

        {step === 'end' && (
          <section className="welcome-content" aria-labelledby="end-title">
            <p className="eyebrow">Preview complete</p>
            <h1 id="end-title" tabIndex="-1">Thank you</h1>
            <p className="end-note">You have reached the end of the example scenarios. Your answers have not been saved or submitted.</p>
            <SurveyButton onClick={restart}>Start over</SurveyButton>
          </section>
        )}
      </main>
    </div>
  )
}

export default App

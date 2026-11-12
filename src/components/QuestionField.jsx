function QuestionField({ question, value, locked = false, showLockedState = false, showOptions = true, onChange, legendRef }) {
  return (
    <fieldset className="question reveal">
      <legend ref={legendRef} tabIndex="-1">{question}</legend>
      {showOptions && (
        <div className="answer-options reveal">
          {['Yes', 'No'].map((option) => (
            <button
              className={[
                'answer-button',
                value === option.toLowerCase() && 'answer-button--selected',
                locked && 'answer-button--locked',
                showLockedState && value === option.toLowerCase() && 'answer-button--locked-selected',
              ].filter(Boolean).join(' ')}
              key={option}
              type="button"
              aria-pressed={value === option.toLowerCase()}
              disabled={locked}
              onClick={() => onChange(option.toLowerCase())}
            >
              <span className="answer-label">{option}</span>
              <span
                className="locked-label"
                aria-hidden={!showLockedState || value !== option.toLowerCase()}
              >
                {showLockedState && value === option.toLowerCase() && (
                  <>
                  <svg className="locked-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <rect x="5.5" y="10" width="13" height="10" rx="2" />
                    <path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10" />
                  </svg>
                  Locked in
                  </>
                )}
              </span>
            </button>
          ))}
        </div>
      )}
    </fieldset>
  )
}

export default QuestionField

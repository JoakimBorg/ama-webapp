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
              {option}
              {showLockedState && value === option.toLowerCase() && (
                <span className="locked-label">Locked in</span>
              )}
            </button>
          ))}
        </div>
      )}
    </fieldset>
  )
}

export default QuestionField

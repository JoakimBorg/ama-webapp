function SurveyButton({ children, type = 'button', onClick }) {
  return (
    <button className="survey-button" type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default SurveyButton

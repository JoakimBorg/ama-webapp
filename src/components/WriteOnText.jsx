import { useEffect, useRef, useState } from 'react'

function WriteOnText({ text, onComplete, reducedMotion, startDelay = 0 }) {
  const [visibleCount, setVisibleCount] = useState(0)
  const completed = useRef(false)

  useEffect(() => {
    if (reducedMotion && visibleCount < text.length) {
      const timer = setTimeout(() => setVisibleCount(text.length), 0)
      return () => clearTimeout(timer)
    }

    if (visibleCount === text.length) {
      if (!completed.current) {
        completed.current = true
        onComplete()
      }
      return
    }

    const timer = setTimeout(
      () => setVisibleCount((count) => count + 1),
      visibleCount === 0 ? startDelay : 18,
    )
    return () => clearTimeout(timer)
  }, [text, visibleCount, onComplete, reducedMotion, startDelay])

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{reducedMotion ? text : text.slice(0, visibleCount)}</span>
    </>
  )
}

export default WriteOnText

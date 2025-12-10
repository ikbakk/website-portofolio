"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface TypewriterProps {
  text: string
  delay?: number
  speed?: number
  className?: string
  onComplete?: () => void
}

export function Typewriter({ text, delay = 0, speed = 50, className, onComplete }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!started) return

    let index = 0
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
        onComplete?.()
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed, started, onComplete])

  return (
    <span className={className}>
      {displayedText}
      {displayedText.length < text.length && started && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="text-[var(--accent)]"
        >
          ▮
        </motion.span>
      )}
    </span>
  )
}


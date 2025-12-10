"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface GlitchTextProps {
  children: string
  className?: string
  glitchInterval?: number
}

export function GlitchText({ children, className, glitchInterval = 5000 }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const triggerGlitch = () => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 150)
    }

    const initialDelay = setTimeout(triggerGlitch, 2000)
    const interval = setInterval(() => {
      if (Math.random() > 0.7) triggerGlitch()
    }, glitchInterval)

    return () => {
      clearTimeout(initialDelay)
      clearInterval(interval)
    }
  }, [glitchInterval])

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      {isGlitching && (
        <>
          <motion.span
            className="absolute inset-0 text-[var(--accent)] z-20"
            initial={{ x: -2, opacity: 0.8 }}
            animate={{ x: [-2, 2, -1, 0], opacity: [0.8, 0.6, 0.8, 0] }}
            transition={{ duration: 0.15 }}
            style={{ clipPath: "inset(20% 0 30% 0)" }}
          >
            {children}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-cyan-400 z-20"
            initial={{ x: 2, opacity: 0.8 }}
            animate={{ x: [2, -2, 1, 0], opacity: [0.8, 0.6, 0.8, 0] }}
            transition={{ duration: 0.15 }}
            style={{ clipPath: "inset(60% 0 10% 0)" }}
          >
            {children}
          </motion.span>
        </>
      )}
    </span>
  )
}


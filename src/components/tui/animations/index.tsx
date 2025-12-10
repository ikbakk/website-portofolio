/**
 * Animation Components for TUI Portfolio
 * Using Framer Motion
 */

"use client"

import { motion, AnimatePresence, type Variants } from "framer-motion"
import { useState, useEffect, useRef } from "react"

// ============================================
// FADE IN UP - Basic entrance animation
// ============================================
interface FadeInUpProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function FadeInUp({ children, delay = 0, duration = 0.4, className }: FadeInUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// STAGGER CONTAINER - For staggered children
// ============================================
interface StaggerContainerProps {
  children: React.ReactNode
  staggerDelay?: number
  className?: string
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

export function StaggerContainer({ children, className }: StaggerContainerProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}

// ============================================
// PANE TRANSITION - For switching content panes
// ============================================
interface PaneTransitionProps {
  children: React.ReactNode
  paneKey: string
}

export function PaneTransition({ children, paneKey }: PaneTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={paneKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// ============================================
// TYPEWRITER - Character by character reveal
// ============================================
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

// ============================================
// COUNTER - Animated number count up
// ============================================
interface CounterProps {
  value: string
  duration?: number
  className?: string
}

export function Counter({ value, duration = 1.5, className }: CounterProps) {
  const [displayValue, setDisplayValue] = useState("0")
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current) return

    // Extract number from value (handles "5+", "20+", "1,024", etc.)
    const numericMatch = value.match(/[\d,]+/)
    if (!numericMatch) {
      setDisplayValue(value)
      return
    }

    const numericPart = numericMatch[0].replace(/,/g, "")
    const targetNum = parseInt(numericPart, 10)
    const suffix = value.replace(numericMatch[0], "")
    const hasComma = numericMatch[0].includes(",")

    if (isNaN(targetNum)) {
      setDisplayValue(value)
      return
    }

    hasAnimated.current = true
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * targetNum)
      
      const formatted = hasComma ? current.toLocaleString() : current.toString()
      setDisplayValue(formatted + suffix)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    // Start animation when element is in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          requestAnimationFrame(animate)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value, duration])

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  )
}

// ============================================
// SLIDE IN - For command history lines
// ============================================
interface SlideInProps {
  children: React.ReactNode
  direction?: "left" | "right" | "up" | "down"
  className?: string
}

export function SlideIn({ children, direction = "up", className }: SlideInProps) {
  const directionOffset = {
    left: { x: -20, y: 0 },
    right: { x: 20, y: 0 },
    up: { x: 0, y: 20 },
    down: { x: 0, y: -20 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// GLITCH TEXT - Subtle glitch effect
// ============================================
interface GlitchTextProps {
  children: string
  className?: string
  glitchInterval?: number // ms between glitches
}

export function GlitchText({ children, className, glitchInterval = 5000 }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const triggerGlitch = () => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 150)
    }

    // Initial delay before first glitch
    const initialDelay = setTimeout(() => {
      triggerGlitch()
    }, 2000)

    // Random interval for subsequent glitches
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        triggerGlitch()
      }
    }, glitchInterval)

    return () => {
      clearTimeout(initialDelay)
      clearInterval(interval)
    }
  }, [glitchInterval])

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Base text */}
      <span className="relative z-10">{children}</span>
      
      {/* Glitch layers */}
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

// ============================================
// HOVER SCALE - For interactive elements
// ============================================
interface HoverScaleProps {
  children: React.ReactNode
  scale?: number
  className?: string
}

export function HoverScale({ children, scale = 1.02, className }: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// FLASH - Brief highlight animation
// ============================================
interface FlashProps {
  children: React.ReactNode
  color?: string
  className?: string
}

export function Flash({ children, color = "var(--accent)", className }: FlashProps) {
  return (
    <motion.div
      initial={{ backgroundColor: color, opacity: 0.3 }}
      animate={{ backgroundColor: "transparent", opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Re-export AnimatePresence for convenience
export { AnimatePresence, motion }


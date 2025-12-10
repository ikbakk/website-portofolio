"use client"

import { motion, AnimatePresence } from "framer-motion"

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


"use client"

import { useState, useEffect, useRef } from "react"

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
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * targetNum)
      const formatted = hasComma ? current.toLocaleString() : current.toString()
      setDisplayValue(formatted + suffix)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

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


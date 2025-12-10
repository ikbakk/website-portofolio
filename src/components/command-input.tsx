import { useState, useRef, useEffect } from "react"
import type React from "react"

interface CommandInputProps {
  onCommand: (command: string) => void
}

export function CommandInput({ onCommand }: CommandInputProps) {
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onCommand(input)
      setInput("")
    }
  }

  return (
    <div className="bg-card px-6 py-4 border-t-2 border-foreground">
      <div className="flex items-center gap-3 font-mono">
        <span className="text-accent font-bold">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter command (help for list)"
          className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
        />
        <span className="animate-pulse text-accent">▮</span>
      </div>
    </div>
  )
}

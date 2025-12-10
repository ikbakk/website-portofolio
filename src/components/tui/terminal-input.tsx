import { useState, useRef, useEffect } from "react"
import type { PaneType } from "./terminal-nav"

interface TerminalInputProps {
  onCommand: (command: string) => void
  onNavigate: (pane: PaneType) => void
  commandHistory?: string[]
}

const navMap: Record<string, PaneType> = {
  "1": "about",
  "2": "projects",
  "3": "skills",
  "4": "contact",
}

const commands = ["about", "projects", "skills", "contact", "help", "clear", "navigate"]

export function TerminalInput({ onCommand, onNavigate, commandHistory = [] }: TerminalInputProps) {
  const [input, setInput] = useState("")
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      processCommand(input.trim())
      setInput("")
      setHistoryIndex(-1)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "")
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "")
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      const match = commands.find((cmd) => cmd.startsWith(input.toLowerCase()))
      if (match) setInput(match)
    }
  }

  const processCommand = (cmd: string) => {
    const lowerCmd = cmd.toLowerCase()

    if (navMap[lowerCmd]) {
      onNavigate(navMap[lowerCmd])
      onCommand(cmd)
      return
    }

    const navMatch = lowerCmd.match(/^(navigate|nav|go|goto)\s+(\d)$/)
    if (navMatch && navMap[navMatch[2]]) {
      onNavigate(navMap[navMatch[2]])
      onCommand(cmd)
      return
    }

    const paneNames: PaneType[] = ["about", "projects", "skills", "contact"]
    if (paneNames.includes(lowerCmd as PaneType)) {
      onNavigate(lowerCmd as PaneType)
      onCommand(cmd)
      return
    }

    onCommand(cmd)
  }

  return (
    <div className="tui-input-area">
      <span className="tui-prompt">$</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="type 'help' or use navigation"
        className="tui-input"
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
      />
      <span className="tui-cursor animate-blink">▮</span>
    </div>
  )
}

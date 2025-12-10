/**
 * Main Terminal Component
 * TUI Portfolio with interactive commands and clickable navigation
 */

import { useState, useCallback, useRef, useEffect } from "react"
import { TerminalHeader } from "./terminal-header"
import type { PaneType } from "./terminal-nav"
import { TerminalInput } from "./terminal-input"
import { AboutPane } from "./panes/about-pane"
import { ProjectsPane } from "./panes/projects-pane"
import { SkillsPane } from "./panes/skills-pane"
import { ContactPane } from "./panes/contact-pane"
import { AnimatePresence, motion } from "./animations"

interface TerminalLine {
  id: number
  type: "input" | "output" | "error" | "success"
  content: string
  isGroupStart?: boolean
}

export function Terminal() {
  const [activePane, setActivePane] = useState<PaneType>("about")
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: 0, type: "output", content: "Welcome! Type 'help' for commands", isGroupStart: true },
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [showHistory, setShowHistory] = useState(false) // Hidden by default on small screens
  const historyEndRef = useRef<HTMLDivElement>(null)

  // Check screen size and auto-show history on larger screens
  useEffect(() => {
    const checkScreenSize = () => {
      setShowHistory(window.innerWidth >= 768) // md breakpoint
    }
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Auto-scroll to newest command when history is visible
  useEffect(() => {
    if (showHistory) {
      historyEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [history, showHistory])

  const addLine = useCallback((type: TerminalLine["type"], content: string, isGroupStart = false) => {
    setHistory((prev) => [...prev, { id: Date.now() + Math.random(), type, content, isGroupStart }])
  }, [])

  const handleNavigate = useCallback((pane: PaneType) => {
    setActivePane(pane)
  }, [])

  const handleCommand = useCallback(
    (cmd: string) => {
      const command = cmd.toLowerCase().trim()
      setCommandHistory((prev) => [...prev, cmd])
      addLine("input", `$ ${cmd}`, true)

      // Help command
      if (command === "help") {
        addLine("output", "╭─────────────────────────────────────────╮")
        addLine("output", "│  AVAILABLE COMMANDS                     │")
        addLine("output", "├─────────────────────────────────────────┤")
        addLine("output", "│  1, about      → About me               │")
        addLine("output", "│  2, projects   → View projects          │")
        addLine("output", "│  3, skills     → Technical skills       │")
        addLine("output", "│  4, contact    → Contact info           │")
        addLine("output", "├─────────────────────────────────────────┤")
        addLine("output", "│  clear         → Clear terminal         │")
        addLine("output", "│  email         → Copy email address     │")
        addLine("output", "│  github        → Open GitHub profile    │")
        addLine("output", "│  history       → Toggle history panel   │")
        addLine("output", "╰─────────────────────────────────────────╯")
        return
      }

      // Clear command
      if (command === "clear" || command === "cls") {
        setHistory([])
        return
      }

      // Toggle history command
      if (command === "history" || command === "hist") {
        setShowHistory((prev) => !prev)
        return
      }

      // Email command
      if (command === "email") {
        navigator.clipboard?.writeText("hello@devnull.dev")
        addLine("success", "✓ Email copied: hello@devnull.dev")
        return
      }

      // GitHub command
      if (command === "github" || command === "gh") {
        window.open("https://github.com", "_blank")
        addLine("success", "✓ Opening GitHub...")
        return
      }

      // Theme/scanlines toggle
      if (command === "theme" || command === "scanlines") {
        const scanlines = document.querySelector(".tui-scanlines")
        if (scanlines) {
          scanlines.classList.toggle("hidden")
          const isHidden = scanlines.classList.contains("hidden")
          addLine("success", `✓ Scanlines ${isHidden ? "off" : "on"}`)
        }
        return
      }

      // Whoami
      if (command === "whoami") {
        addLine("output", "devnull — fullstack developer")
        return
      }

      // Date
      if (command === "date") {
        addLine("output", new Date().toLocaleString())
        return
      }

      // Neofetch-style
      if (command === "neofetch" || command === "fetch") {
        addLine("output", "  ╭──────────────╮")
        addLine("output", "  │   DEVNULL    │  OS: Web Browser")
        addLine("output", "  │    ╭───╮     │  Host: portfolio.dev")
        addLine("output", "  │    │ ◉ │     │  Uptime: 5+ years")
        addLine("output", "  │    ╰───╯     │  Shell: TypeScript")
        addLine("output", "  ╰──────────────╯  Theme: Neo-Brutal")
        return
      }

      // Easter eggs
      if (command === "sudo" || command.startsWith("sudo ")) {
        addLine("error", "Nice try. No root access here 😏")
        return
      }

      if (command === "rm -rf /" || command === "rm -rf /*") {
        addLine("error", "I don't think so, buddy.")
        return
      }

      if (command === "exit" || command === "quit") {
        addLine("output", "Why would you want to leave? 🥺")
        return
      }

      if (command === "ls") {
        addLine("output", "about.txt  projects/  skills.json  contact.md")
        return
      }

      if (command === "pwd") {
        addLine("output", "/home/devnull/portfolio")
        return
      }

      if (command === "cat") {
        addLine("output", "🐱 meow")
        return
      }

      // Navigation commands
      const navNames = ["about", "projects", "skills", "contact"]
      const navMatch = command.match(/^(navigate|nav|go|goto)\s+(\d)$/)
      if (navNames.includes(command) || navMatch || /^[1-4]$/.test(command)) {
        const paneName = navNames.includes(command)
          ? command
          : navMatch
            ? navNames[parseInt(navMatch[2]) - 1]
            : navNames[parseInt(command) - 1]
        addLine("success", `→ ${paneName}`)
        return
      }

      // Unknown command
      addLine("error", `command not found: ${cmd}`)
    },
    [addLine]
  )

  const renderPane = () => {
    switch (activePane) {
      case "about":
        return <AboutPane />
      case "projects":
        return <ProjectsPane />
      case "skills":
        return <SkillsPane />
      case "contact":
        return <ContactPane />
      default:
        return <AboutPane />
    }
  }

  return (
    <div className="tui-terminal h-screen flex flex-col overflow-hidden">
      {/* Subtle scanlines effect */}
      <div className="tui-scanlines" />

      {/* Header with integrated navigation */}
      <TerminalHeader
        name="DEVNULL"
        status="online"
        title="fullstack developer"
        activePane={activePane}
        onNavigate={handleNavigate}
      />

      {/* Main content area - only this scrolls */}
      <main className="flex-1 overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePane}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                {renderPane()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Command history - toggleable */}
      <AnimatePresence>
        {showHistory && history.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-border bg-[var(--bg)] flex-shrink-0"
          >
            <div className="px-4 py-2 max-h-32 overflow-y-auto text-xs">
              <div className="space-y-1">
                {history.map((line, index) => {
                  const showGap = line.isGroupStart && index > 0
                  return (
                    <motion.div
                      key={line.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15 }}
                      className={`font-mono ${showGap ? "pt-2 mt-2 border-t border-border/30" : ""} ${
                        line.type === "input"
                          ? "text-foreground font-bold"
                          : line.type === "error"
                            ? "text-red-400"
                            : line.type === "success"
                              ? "text-[var(--accent)]"
                              : "text-muted-foreground"
                      }`}
                    >
                      {line.type === "success" && (
                        <motion.span
                          initial={{ scale: 1.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {line.content}
                        </motion.span>
                      )}
                      {line.type === "error" && (
                        <motion.span
                          initial={{ x: [-2, 2, -2, 0] }}
                          animate={{ x: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {line.content}
                        </motion.span>
                      )}
                      {line.type !== "success" && line.type !== "error" && line.content}
                    </motion.div>
                  )
                })}
              </div>
              <div ref={historyEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom bar: toggle + input */}
      <div className="border-t-2 border-foreground bg-[var(--bg)] flex-shrink-0">
        {/* History toggle button */}
        <div className="flex items-center">
          <motion.button
            onClick={() => setShowHistory(!showHistory)}
            className="px-3 py-2 text-xs text-muted-foreground hover:text-foreground border-r border-border flex items-center gap-2 transition-colors"
            whileHover={{ backgroundColor: "var(--bg-elevated)" }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              animate={{ rotate: showHistory ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ▲
            </motion.span>
            <span className="hidden sm:inline">
              {showHistory ? "hide" : "show"} history
            </span>
            {history.length > 1 && (
              <span className="text-[var(--accent)]">({history.length})</span>
            )}
          </motion.button>

          {/* Input takes rest of space */}
          <div className="flex-1">
            <TerminalInput
              onCommand={handleCommand}
              onNavigate={handleNavigate}
              commandHistory={commandHistory}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

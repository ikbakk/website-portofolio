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
  const [showHistory, setShowHistory] = useState(false)
  const historyEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkScreenSize = () => setShowHistory(window.innerWidth >= 768)
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  useEffect(() => {
    if (showHistory) historyEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [history, showHistory])

  const addLine = useCallback((type: TerminalLine["type"], content: string, isGroupStart = false) => {
    setHistory((prev) => [...prev, { id: Date.now() + Math.random(), type, content, isGroupStart }])
  }, [])

  const handleNavigate = useCallback((pane: PaneType) => setActivePane(pane), [])

  const handleCommand = useCallback(
    (cmd: string) => {
      const command = cmd.toLowerCase().trim()
      setCommandHistory((prev) => [...prev, cmd])
      addLine("input", `$ ${cmd}`, true)

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

      if (command === "clear" || command === "cls") return setHistory([])
      if (command === "history" || command === "hist") return setShowHistory((prev) => !prev)

      if (command === "email") {
        navigator.clipboard?.writeText("ikbakfir@gmail.com")
        return addLine("success", "✓ Email copied: ikbakfir@gmail.com")
      }

      if (command === "github" || command === "gh") {
        window.open("https://github.com/ikbakk", "_blank")
        return addLine("success", "✓ Opening GitHub...")
      }

      if (command === "theme" || command === "scanlines") {
        const scanlines = document.querySelector(".tui-scanlines")
        if (scanlines) {
          scanlines.classList.toggle("hidden")
          return addLine("success", `✓ Scanlines ${scanlines.classList.contains("hidden") ? "off" : "on"}`)
        }
        return
      }

      if (command === "whoami") return addLine("output", "ikbakk — fullstack developer from Mataram, Indonesia")
      if (command === "date") return addLine("output", new Date().toLocaleString())

      if (command === "neofetch" || command === "fetch") {
        addLine("output", "  ╭──────────────╮")
        addLine("output", "  │    IKBAKK    │  OS: Web Browser")
        addLine("output", "  │    ╭───╮     │  Host: ikbakk.dev")
        addLine("output", "  │    │ ◉ │     │  Uptime: 3+ years")
        addLine("output", "  │    ╰───╯     │  Shell: TypeScript")
        addLine("output", "  ╰──────────────╯  Theme: Neo-Brutal")
        return
      }

      if (command === "sudo" || command.startsWith("sudo ")) return addLine("error", "Nice try. No root access here 😏")
      if (command === "rm -rf /" || command === "rm -rf /*") return addLine("error", "I don't think so, buddy.")
      if (command === "exit" || command === "quit") return addLine("output", "Why would you want to leave? 🥺")
      if (command === "ls") return addLine("output", "about.txt  projects/  skills.json  contact.md")
      if (command === "pwd") return addLine("output", "/home/devnull/portfolio")
      if (command === "cat") return addLine("output", "🐱 meow")

      const navNames = ["about", "projects", "skills", "contact"]
      const navMatch = command.match(/^(navigate|nav|go|goto)\s+(\d)$/)
      if (navNames.includes(command) || navMatch || /^[1-4]$/.test(command)) {
        const paneName = navNames.includes(command)
          ? command
          : navMatch
            ? navNames[parseInt(navMatch[2]) - 1]
            : navNames[parseInt(command) - 1]
        return addLine("success", `→ ${paneName}`)
      }

      addLine("error", `command not found: ${cmd}`)
    },
    [addLine]
  )

  const panes = { about: AboutPane, projects: ProjectsPane, skills: SkillsPane, contact: ContactPane }
  const ActivePane = panes[activePane]

  return (
    <div className="tui-terminal h-screen flex flex-col overflow-hidden">
      <div className="tui-scanlines" />

      <TerminalHeader
        name="IKBAKK"
        status="online"
        title="fullstack developer"
        activePane={activePane}
        onNavigate={handleNavigate}
      />

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
                <ActivePane />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

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
                {history.map((line, index) => (
                  <motion.div
                    key={line.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`font-mono ${line.isGroupStart && index > 0 ? "pt-2 mt-2 border-t border-border/30" : ""} ${
                      line.type === "input"
                        ? "text-foreground font-bold"
                        : line.type === "error"
                          ? "text-red-400"
                          : line.type === "success"
                            ? "text-[var(--accent)]"
                            : "text-muted-foreground"
                    }`}
                  >
                    {line.type === "success" ? (
                      <motion.span initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.2 }}>
                        {line.content}
                      </motion.span>
                    ) : line.type === "error" ? (
                      <motion.span initial={{ x: [-2, 2, -2, 0] }} animate={{ x: 0 }} transition={{ duration: 0.2 }}>
                        {line.content}
                      </motion.span>
                    ) : (
                      line.content
                    )}
                  </motion.div>
                ))}
              </div>
              <div ref={historyEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-t-2 border-foreground bg-[var(--bg)] flex-shrink-0">
        <div className="flex items-center">
          <motion.button
            onClick={() => setShowHistory(!showHistory)}
            className="px-3 py-2 text-xs text-muted-foreground hover:text-foreground border-r border-border flex items-center gap-2 transition-colors"
            whileHover={{ backgroundColor: "var(--bg-elevated)" }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span animate={{ rotate: showHistory ? 180 : 0 }} transition={{ duration: 0.2 }}>▲</motion.span>
            <span className="hidden sm:inline">{showHistory ? "hide" : "show"} history</span>
            {history.length > 1 && <span className="text-[var(--accent)]">({history.length})</span>}
          </motion.button>
          <div className="flex-1">
            <TerminalInput onCommand={handleCommand} onNavigate={handleNavigate} commandHistory={commandHistory} />
          </div>
        </div>
      </div>
    </div>
  )
}


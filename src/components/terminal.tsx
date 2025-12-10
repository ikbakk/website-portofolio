import { useState } from "react"
import { TerminalPane } from "./terminal-pane"
import { CommandInput } from "./command-input"

type PaneType = "about" | "projects" | "skills" | "contact"

interface PaneState {
  active: PaneType
  history: string[]
}

export default function Terminal() {
  const [paneState, setPaneState] = useState<PaneState>({
    active: "about",
    history: ["$ whoami"],
  })
  const [splitView, setSplitView] = useState(false)
  const [secondPane, setSecondPane] = useState<PaneType>("projects")

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim()
    const history = [...paneState.history, `$ ${command}`]

    if (cmd === "help") {
      history.push("Available commands:")
      history.push("  about       - View bio and experience")
      history.push("  projects    - Show portfolio projects")
      history.push("  skills      - List technical skills")
      history.push("  contact     - Contact information")
      history.push("  split       - Toggle split view")
      history.push("  clear       - Clear terminal")
      history.push("")
    } else if (cmd === "clear") {
      setPaneState({ ...paneState, history: ["$ whoami"] })
      return
    } else if (cmd === "split") {
      setSplitView(!splitView)
      history.push(`Split view ${!splitView ? "enabled" : "disabled"}`)
      history.push("")
    } else if (["about", "projects", "skills", "contact"].includes(cmd)) {
      setPaneState({
        ...paneState,
        active: cmd as PaneType,
        history: [...history, ""],
      })
      return
    } else if (cmd === "") {
      setPaneState(paneState)
      return
    } else {
      history.push(`command not found: ${command}`)
      history.push("Type 'help' for available commands")
      history.push("")
    }

    setPaneState({ ...paneState, history })
  }

  const handleSecondPaneCommand = (command: string) => {
    const cmd = command.toLowerCase().trim()
    if (["about", "projects", "skills", "contact"].includes(cmd)) {
      setSecondPane(cmd as PaneType)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-mono">
      <div className="border-b-2 border-foreground px-6 py-4 bg-card">
        <div className="text-xs font-bold tracking-widest uppercase">┌─ Terminal: Developer Portfolio ─┐</div>
      </div>

      <div className="flex-1 flex gap-0 overflow-hidden">
        {/* Left pane */}
        <div className={`flex-1 flex flex-col ${splitView ? "border-r-2 border-foreground" : ""}`}>
          <TerminalPane type={paneState.active} />
          <div className="border-t-2 border-foreground">
            <CommandInput onCommand={handleCommand} />
          </div>
        </div>

        {splitView && (
          <div className="flex-1 flex flex-col">
            <TerminalPane type={secondPane} />
            <div className="border-t-2 border-foreground">
              <CommandInput onCommand={handleSecondPaneCommand} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

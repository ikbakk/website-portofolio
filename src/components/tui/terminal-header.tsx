/**
 * Terminal Header Component
 * Two-row layout: Identity + Navigation
 */

import { GlitchText, motion } from "./animations"
import type { PaneType } from "./terminal-nav"

interface NavItem {
  id: number
  key: PaneType
  label: string
}

const navItems: NavItem[] = [
  { id: 1, key: "about", label: "ABOUT" },
  { id: 2, key: "projects", label: "PROJECTS" },
  { id: 3, key: "skills", label: "SKILLS" },
  { id: 4, key: "contact", label: "CONTACT" },
]

interface TerminalHeaderProps {
  name?: string
  status?: "online" | "away" | "busy"
  title?: string
  activePane: PaneType
  onNavigate: (pane: PaneType) => void
}

export function TerminalHeader({
  name = "DEVNULL",
  status = "online",
  title = "fullstack developer",
  activePane,
  onNavigate,
}: TerminalHeaderProps) {
  const statusColors = {
    online: "bg-[var(--accent)]",
    away: "bg-yellow-500",
    busy: "bg-red-500",
  }

  return (
    <motion.header
      className="border-b-2 border-foreground bg-[var(--bg)]"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Row 1: Identity */}
      <div className="px-4 py-3 flex items-center border-b border-border">
        <div className="flex items-center gap-4 flex-1">
          {/* Name bracket with glitch effect */}
          <div className="flex items-center gap-2">
            <span className="text-foreground/50">[</span>
            <GlitchText className="font-bold tracking-wider text-foreground">
              {name}
            </GlitchText>
            <span className="text-foreground/50">]</span>
          </div>

          {/* Decorative line */}
          <div className="tui-line hidden sm:block" />

          {/* Title */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-[var(--accent)]">::</span>
            <span className="text-sm text-muted-foreground">{title}</span>
          </div>

          <div className="tui-line hidden md:block" />
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <span className="text-foreground/50">[</span>
          <motion.span
            className={`w-2 h-2 ${statusColors[status]}`}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs uppercase tracking-wider">{status}</span>
          <span className="text-foreground/50">]</span>
        </div>
      </div>

      {/* Row 2: Navigation */}
      <nav className="px-4 py-2 flex flex-wrap items-center gap-2 bg-[var(--bg-elevated)]">
        <span className="text-xs text-muted-foreground uppercase tracking-wider mr-1 hidden sm:inline">
          nav:
        </span>
        {navItems.map((item, index) => (
          <motion.button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            className={`tui-nav-btn text-xs ${activePane === item.key ? "active" : ""}`}
            aria-current={activePane === item.key ? "page" : undefined}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-[var(--accent)] mr-1">[{item.id}]</span>
            {item.label}
          </motion.button>
        ))}
      </nav>
    </motion.header>
  )
}

/**
 * Terminal Navigation Component
 * Numbered clickable buttons for non-coder visitors
 */

export type PaneType = "about" | "projects" | "skills" | "contact"

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

interface TerminalNavProps {
  activePane: PaneType
  onNavigate: (pane: PaneType) => void
}

export function TerminalNav({ activePane, onNavigate }: TerminalNavProps) {
  return (
    <nav className="tui-nav">
      <span className="text-xs text-muted-foreground uppercase tracking-wider self-center mr-2">
        navigate:
      </span>
      {navItems.map((item) => (
        <button
          key={item.key}
          onClick={() => onNavigate(item.key)}
          className={`tui-nav-btn ${activePane === item.key ? "active" : ""}`}
          aria-current={activePane === item.key ? "page" : undefined}
        >
          <span className="text-[var(--accent)] mr-2">[{item.id}]</span>
          {item.label}
        </button>
      ))}
    </nav>
  )
}

export { navItems }


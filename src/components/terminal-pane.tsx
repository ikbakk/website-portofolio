"use client"
import { AboutPane } from "./panes/about-pane"
import { ProjectsPane } from "./panes/projects-pane"
import { SkillsPane } from "./panes/skills-pane"
import { ContactPane } from "./panes/contact-pane"

type PaneType = "about" | "projects" | "skills" | "contact"

interface TerminalPaneProps {
  type: PaneType
}

export function TerminalPane({ type }: TerminalPaneProps) {
  const renderPane = () => {
    switch (type) {
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
    <div className="flex-1 overflow-y-auto bg-background border-foreground">
      <div className="p-6 space-y-6">{renderPane()}</div>
    </div>
  )
}

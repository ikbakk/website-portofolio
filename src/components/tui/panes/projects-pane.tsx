/**
 * Projects Pane - Portfolio projects showcase
 * With stagger and hover animations
 */

import { StaggerContainer, StaggerItem, motion } from "../animations"

export function ProjectsPane() {
  const projects = [
    {
      name: "CloudSync",
      description: "Real-time file synchronization platform with end-to-end encryption",
      tech: ["TypeScript", "React", "Node.js", "WebSocket"],
      status: "live",
      link: "#",
    },
    {
      name: "DevMetrics",
      description: "Analytics dashboard for developer productivity tracking",
      tech: ["Next.js", "PostgreSQL", "Prisma", "Chart.js"],
      status: "live",
      link: "#",
    },
    {
      name: "TerminalCSS",
      description: "CSS framework for building terminal-styled web interfaces",
      tech: ["CSS", "PostCSS", "Tailwind"],
      status: "oss",
      link: "#",
    },
    {
      name: "APIForge",
      description: "Automated REST API generator from database schemas",
      tech: ["Go", "PostgreSQL", "Docker"],
      status: "wip",
      link: "#",
    },
  ]

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      live: "border-green-500 text-green-500",
      oss: "border-[var(--accent)] text-[var(--accent)]",
      wip: "border-yellow-500 text-yellow-500",
    }
    const labels: Record<string, string> = {
      live: "LIVE",
      oss: "OSS",
      wip: "WIP",
    }
    return (
      <span className={`text-xs px-2 py-0.5 border ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  return (
    <StaggerContainer className="space-y-8">
      {/* Header */}
      <StaggerItem>
        <section className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="tui-label">$ ls -la ~/projects</span>
            <div className="tui-line" />
          </div>
          <p className="text-sm text-muted-foreground">
            total {projects.length} projects — click to view details
          </p>
        </section>
      </StaggerItem>

      {/* Projects Grid */}
      <StaggerItem>
        <section className="grid gap-4 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.a
              key={i}
              href={project.link}
              className="tui-project group block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{
                y: -4,
                boxShadow: "6px 6px 0 var(--accent)",
                borderColor: "var(--accent)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-foreground group-hover:text-[var(--accent)] transition-colors">
                  {project.name}
                </h3>
                {statusBadge(project.status)}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tech.map((t) => (
                  <motion.span
                    key={t}
                    className="tui-tag text-[10px]"
                    whileHover={{ scale: 1.05 }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.a>
          ))}
        </section>
      </StaggerItem>

      {/* More projects hint */}
      <StaggerItem>
        <motion.section
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-[var(--accent)]">&gt;</span> More projects available on{" "}
          <a href="#" className="tui-link">
            GitHub
          </a>
        </motion.section>
      </StaggerItem>
    </StaggerContainer>
  )
}

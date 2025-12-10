import { StaggerContainer, StaggerItem, Typewriter, motion } from "../animations"

const experience = [
  {
    role: "Senior Fullstack Developer",
    company: "TechCorp Inc.",
    period: "2022 — Present",
    description: "Leading development of scalable web applications",
  },
  {
    role: "Software Engineer",
    company: "StartupXYZ",
    period: "2020 — 2022",
    description: "Built microservices architecture and APIs",
  },
  {
    role: "Junior Developer",
    company: "Digital Agency Co.",
    period: "2018 — 2020",
    description: "Frontend development and UI implementation",
  },
]

const bioItems = [
  "Based in Jakarta, Indonesia",
  "5+ years of professional experience",
  "Open source contributor",
  "Coffee-driven development enthusiast",
]

export function AboutPane() {
  return (
    <StaggerContainer className="space-y-8">
      <StaggerItem>
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="tui-label">$ whoami</span>
            <div className="tui-line" />
          </div>
          <div className="tui-box-accent">
            <h1 className="text-xl font-bold mb-2">
              <Typewriter text="Hey, I'm Devnull" speed={60} />
            </h1>
            <motion.p
              className="text-muted-foreground leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              Fullstack developer crafting digital experiences with code. I build
              things for the web — from pixel-perfect interfaces to robust backend
              systems. Currently obsessed with TypeScript, React, and making
              terminals look cool.
            </motion.p>
          </div>
        </section>
      </StaggerItem>

      <StaggerItem>
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="tui-label">~/bio.txt</span>
            <div className="tui-line" />
          </div>
          <StaggerContainer className="space-y-3 text-sm">
            {bioItems.map((item, i) => (
              <StaggerItem key={i}>
                <p className="text-foreground/90">
                  <span className="text-[var(--accent)]">&gt;</span> {item}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </StaggerItem>

      <StaggerItem>
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="tui-label">experience.log</span>
            <div className="tui-line" />
          </div>
          <StaggerContainer className="space-y-0">
            {experience.map((exp, i) => (
              <StaggerItem key={i}>
                <motion.div
                  className="tui-timeline-item"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="font-bold text-foreground">{exp.role}</h3>
                    <span className="text-xs text-muted-foreground">{exp.period}</span>
                  </div>
                  <p className="text-sm text-[var(--accent)]">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mt-1">{exp.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </StaggerItem>
    </StaggerContainer>
  )
}

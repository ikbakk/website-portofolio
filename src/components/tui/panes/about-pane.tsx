import { StaggerContainer, StaggerItem, Typewriter, motion } from "../animations"

const experience = [
  {
    role: "Fullstack Developer",
    company: "Freelance / Outsourced",
    period: "2022 — Present",
    description: "Delivered end-to-end web applications for clients across analytics, restaurant, and automotive sectors",
  },
  {
    role: "Fullstack Developer",
    company: "IoT & Real-time Systems",
    period: "2021 — 2022",
    description: "Developed real-time IoT monitoring dashboards using React, MQTT, and Firebase",
  },
  {
    role: "Apprentice Fullstack Developer",
    company: "Training Program",
    period: "6 months",
    description: "Completed intensive apprenticeship focused on scalable and maintainable fullstack systems",
  },
  {
    role: "Team Lead / Fullstack Developer",
    company: "Project-Based",
    period: "2022 — Present",
    description: "Led team projects integrating REST APIs and coordinating workflows through GitHub Projects",
  },
  {
    role: "Software Developer",
    company: "Bongkarin",
    period: "2021 — 2022",
    description: "Developed end-to-end IoT system for monitoring patient vitals with live visualization",
  },
  {
    role: "Electrical Engineer",
    company: "Previous Career",
    period: "Pre-2021",
    description: "Technical background in electrical engineering before transitioning to software development",
  },
]

const bioItems = [
  "Based in Mataram, Indonesia",
  "3+ years of professional coding experience",
  "Builds end-to-end web applications from UI to backend",
  "Experienced with real-time dashboards and IoT systems",
  "Comfortable modernizing legacy codebases",
  "Works across web, mobile, CMS, and admin platforms",
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
              <Typewriter text="Hey, I'm Iqbal Firdaus" speed={60} />
            </h1>
            <motion.p
              className="text-muted-foreground leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              Fullstack Developer with experience delivering end-to-end web applications across
              analytics, restaurant, automotive, IoT, and government sectors. Strong in building
              responsive frontend interfaces, scalable backend services, and real-time dashboards
              using modern JavaScript and TypeScript ecosystems. Electrical Engineer turned
              developer — I bring a systems-thinking approach to software problems.
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

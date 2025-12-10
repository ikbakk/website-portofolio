/**
 * Skills Pane - Technical skills and expertise
 * With stagger animations and counter
 */

import { StaggerContainer, StaggerItem, Counter, motion } from "../animations"

export function SkillsPane() {
  const skillCategories = [
    {
      name: "Languages",
      skills: ["TypeScript", "JavaScript", "Python", "Go", "Rust", "SQL"],
    },
    {
      name: "Frontend",
      skills: ["React", "Next.js", "Vue.js", "TailwindCSS", "Framer Motion", "GSAP"],
    },
    {
      name: "Backend",
      skills: ["Node.js", "Express", "Hono", "PostgreSQL", "MongoDB", "Redis"],
    },
    {
      name: "DevOps",
      skills: ["Docker", "Git", "Linux", "CI/CD", "AWS", "Vercel"],
    },
  ]

  const tools = [
    "VS Code",
    "Neovim",
    "Figma",
    "Postman",
    "TablePlus",
    "Warp",
    "Arc Browser",
    "Notion",
    "Linear",
  ]

  const stats = [
    { label: "Years Coding", value: "5+" },
    { label: "Projects Shipped", value: "20+" },
    { label: "Open Source Repos", value: "12" },
    { label: "Keyboards Survived", value: "3" },
  ]

  return (
    <StaggerContainer className="space-y-8">
      {/* Header */}
      <StaggerItem>
        <section className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="tui-label">$ cat skills.json</span>
            <div className="tui-line" />
          </div>
        </section>
      </StaggerItem>

      {/* Skills by category */}
      <StaggerItem>
        <section className="grid gap-6 md:grid-cols-2">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              className="tui-box space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
              whileHover={{ borderColor: "var(--accent)" }}
            >
              <h3 className="font-bold text-[var(--accent)] text-sm uppercase tracking-wider">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    className="tui-tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: catIndex * 0.1 + skillIndex * 0.05 }}
                    whileHover={{ scale: 1.08, backgroundColor: "var(--accent)", color: "var(--bg)" }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </section>
      </StaggerItem>

      {/* Tools */}
      <StaggerItem>
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="tui-label">~/tools</span>
            <div className="tui-line" />
          </div>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                className="tui-tag-accent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </section>
      </StaggerItem>

      {/* Stats with counter animation */}
      <StaggerItem>
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="tui-label">stats --dev</span>
            <div className="tui-line" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="tui-box py-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -2, boxShadow: "4px 4px 0 var(--accent)" }}
              >
                <div className="text-2xl font-bold text-[var(--accent)]">
                  <Counter value={stat.value} duration={1.5} />
                </div>
                <div className="text-xs text-muted-foreground uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>
      </StaggerItem>
    </StaggerContainer>
  )
}

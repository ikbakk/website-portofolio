import { StaggerContainer, StaggerItem, Counter, motion } from "../animations"

const skillCategories = [
  { name: "Languages", skills: ["JavaScript", "TypeScript", "Golang", "Python", "Java"] },
  { name: "Frontend", skills: ["React", "Next.js", "Remix", "Astro.js", "Tailwind CSS", "React Native", "ReCharts", "React Query"] },
  { name: "Backend", skills: ["Node.js", "Express.js", "NestJS", "Go Gin", "Firebase", "Firestore", "MQTT", "REST APIs", "BFF Pattern"] },
  { name: "CMS & Tools", skills: ["Sanity CMS", "WordPress", "Elementor", "GitHub Projects", "Figma"] },
]

const tools = ["VS Code", "Figma", "GitHub Projects", "Firebase", "Sanity CMS", "WordPress", "Elementor", "Postman"]

const stats = [
  { label: "Years Coding", value: "3+" },
  { label: "Projects Shipped", value: "15+" },
  { label: "Sectors Worked", value: "6" },
  { label: "Keyboards Survived", value: "2" },
]

export function SkillsPane() {
  return (
    <StaggerContainer className="space-y-8">
      <StaggerItem>
        <section className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="tui-label">$ cat skills.json</span>
            <div className="tui-line" />
          </div>
        </section>
      </StaggerItem>

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

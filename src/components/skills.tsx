export default function Skills() {
  const skills = {
    Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"],
    Backend: ["Node.js", "Express", "GraphQL", "REST APIs", "PostgreSQL"],
    Tools: ["Git", "Docker", "AWS", "Vercel", "GitHub Actions"],
    Other: ["Web Performance", "Accessibility", "SEO", "Testing", "DevOps"],
  }

  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-20 tui-section-divider">
      <div className="pt-8">
        <p className="font-mono text-xs text-accent mb-4">$ skills --list</p>
        <h2 className="tui-title text-4xl mb-12">Technical Skills</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-bold text-lg mb-4 pb-3 border-b-2 border-foreground font-mono text-accent">
                [{category.toUpperCase()}]
              </h3>
              <div className="flex flex-wrap gap-3">
                {items.map((skill, idx) => (
                  <span key={idx} className="tui-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

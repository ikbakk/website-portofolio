export default function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-featured e-commerce platform with real-time inventory, payment processing, and admin dashboard.",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      link: "#",
    },
    {
      title: "Task Management App",
      description:
        "Collaborative task management tool with real-time updates, team workspaces, and advanced filtering.",
      tags: ["Next.js", "TypeScript", "Firebase", "Tailwind"],
      link: "#",
    },
    {
      title: "Analytics Dashboard",
      description: "Data visualization dashboard with interactive charts, real-time metrics, and custom reporting.",
      tags: ["React", "D3.js", "Express", "MongoDB"],
      link: "#",
    },
    {
      title: "Social Network",
      description: "Social platform with user profiles, messaging, feeds, and community features.",
      tags: ["Next.js", "GraphQL", "PostgreSQL", "Redis"],
      link: "#",
    },
  ]

  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-20 tui-section-divider">
      <div className="pt-8">
        <p className="font-mono text-xs text-accent mb-4">$ ls -la projects/</p>
        <h2 className="tui-title text-4xl mb-12">Featured Projects</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <div key={idx} className="tui-card group hover:shadow-lg transition-all duration-200">
              <p className="font-mono text-xs text-accent mb-3">[{idx + 1}]</p>
              <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">{project.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed text-sm">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tui-tag">
                    {tag}
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

export function ProjectsPane() {
  return (
    <>
      <div className="border-l-4 border-accent pl-4">
        <div className="text-accent font-bold text-lg tracking-wider">$ ls -la projects/</div>
        <p className="text-foreground/70 text-sm mt-1">total 12 projects</p>
      </div>

      <div className="space-y-4">
        {[
          {
            name: "E-Commerce Platform",
            desc: "Full-stack marketplace with payments, inventory",
            tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
          },
          {
            name: "Real-time Chat App",
            desc: "Live messaging with WebSocket, presence detection",
            tech: ["Next.js", "WebSocket", "Redis", "TypeScript"],
          },
          {
            name: "Analytics Dashboard",
            desc: "Data visualization and reporting system",
            tech: ["React", "D3.js", "API", "TailwindCSS"],
          },
        ].map((project, i) => (
          <div key={i} className="border-2 border-foreground p-4 hover:bg-card/50 transition-colors">
            <div className="font-bold text-accent text-sm">{project.name}</div>
            <p className="text-foreground text-sm mt-1">{project.desc}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {project.tech.map((t) => (
                <span key={t} className="tui-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

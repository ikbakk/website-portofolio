export function AboutPane() {
  return (
    <>
      <div className="border-l-4 border-accent pl-4">
        <div className="text-accent font-bold text-lg tracking-wider">$ whoami</div>
        <p className="text-foreground mt-2">Alex Chen - Fullstack Developer</p>
      </div>

      <div className="space-y-3">
        <div className="text-accent font-mono text-sm">~/about.txt</div>
        <p className="text-foreground/90 leading-relaxed">
          Full-stack developer with 5+ years of experience building scalable web applications. Passionate about clean
          code, modern architecture, and great user experiences. Specializing in React, Next.js, Node.js, and
          TypeScript.
        </p>
      </div>

      <div className="space-y-4">
        <div className="text-accent font-mono text-sm">📍 Experience</div>
        {[
          { role: "Senior Developer", company: "Tech Corp", period: "2022 - Present" },
          { role: "Full Stack Engineer", company: "StartUp Inc", period: "2020 - 2022" },
          { role: "Junior Developer", company: "Digital Agency", period: "2019 - 2020" },
        ].map((exp, i) => (
          <div key={i} className="border-l-2 border-foreground pl-3">
            <div className="font-bold text-foreground">{exp.role}</div>
            <div className="text-sm text-muted-foreground">{exp.company}</div>
            <div className="text-xs text-muted-foreground">{exp.period}</div>
          </div>
        ))}
      </div>
    </>
  )
}

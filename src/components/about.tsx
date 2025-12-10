export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-20 tui-section-divider">
      <div className="grid md:grid-cols-3 gap-8 pt-8">
        <div className="md:col-span-2">
          <div className="space-y-6">
            <div>
              <p className="font-mono text-xs text-accent mb-4">$ cat about.txt</p>
              <h2 className="tui-title text-4xl mb-6">About Me</h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed border-l-2 border-accent/30 pl-4">
              <p>
                I'm a fullstack developer with 5+ years of experience building web applications that solve real
                problems. I specialize in React, TypeScript, and Node.js.
              </p>
              <p>
                My approach combines clean code, thoughtful design, and performance optimization. I believe in writing
                code that's not just functional, but maintainable and scalable.
              </p>
              <p>
                When I'm not coding, you'll find me contributing to open source, writing technical articles, or
                exploring new technologies.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="tui-card">
            <p className="font-mono text-xs text-accent mb-3">experience.log</p>
            <p className="font-bold text-lg">5+ Years</p>
            <p className="text-sm text-muted-foreground">Fullstack development</p>
          </div>
          <div className="tui-card">
            <p className="font-mono text-xs text-accent mb-3">focus.json</p>
            <p className="font-bold text-lg">Specialized In</p>
            <p className="text-sm text-muted-foreground">React, TS, Node.js, Cloud</p>
          </div>
          <div className="tui-card">
            <p className="font-mono text-xs text-accent mb-3">location.sh</p>
            <p className="font-bold text-lg">San Francisco</p>
            <p className="text-sm text-muted-foreground">West Coast, USA</p>
          </div>
        </div>
      </div>
    </section>
  )
}

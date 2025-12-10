export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 md:py-32">
      <div className="space-y-8 border-l-2 border-foreground pl-8">
        <div className="space-y-2">
          <p className="font-mono text-xs text-muted-foreground">$ whoami</p>
          <h1 className="tui-title text-6xl md:text-8xl leading-tight">Alex Chen</h1>
          <p className="font-mono text-sm text-accent">{"> Fullstack Developer | System Builder | Code Architect"}</p>
        </div>

        <div className="space-y-4 font-mono text-sm leading-relaxed">
          <p className="text-muted-foreground">
            <span className="text-foreground">$</span> Building modern web applications with React, Node.js, and cloud
            technologies. Passionate about creating performant, accessible, and beautiful digital experiences.
          </p>
          <p className="text-muted-foreground">
            <span className="text-foreground">$</span> Terminal-inspired design meets clean code practices. Every pixel
            intentional. Every function optimized.
          </p>
        </div>

        <div className="flex gap-4 pt-8 flex-wrap">
          <button className="tui-button bg-accent text-accent-foreground hover:bg-accent/90">View My Work</button>
          <button className="tui-button border-2 border-accent text-accent hover:bg-accent/10">Get In Touch</button>
        </div>
      </div>
    </section>
  )
}

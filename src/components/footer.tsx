export default function Footer() {
  return (
    <footer className="border-t-2 border-foreground bg-card">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4 font-mono text-accent">[NAVIGATION]</h3>
            <ul className="space-y-2 text-sm text-muted-foreground font-mono">
              <li>
                <a href="#about" className="hover:text-accent transition-colors">
                  $ cd about
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-accent transition-colors">
                  $ cd projects
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-accent transition-colors">
                  $ cd skills
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-accent transition-colors">
                  $ cd contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 font-mono text-accent">[SOCIAL]</h3>
            <ul className="space-y-2 text-sm text-muted-foreground font-mono">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  github.com/alex
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  linkedin.com/alex
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  twitter.com/alex
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  alex@example.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 font-mono text-accent">[CONTACT]</h3>
            <p className="text-sm text-muted-foreground font-mono">
              alex@example.com
              <br />
              San Francisco, CA
            </p>
          </div>
        </div>

        <div className="border-t-2 border-foreground pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground font-mono">
          <p>© 2025 Alex Chen. All rights reserved.</p>
          <p>$ Built with React & Tailwind</p>
        </div>
      </div>
    </footer>
  )
}

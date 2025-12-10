import { useState } from "react"
import Link from "next/link"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background border-b-2 border-foreground">
      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="#" className="tui-title">
          {"> alex.dev"}
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          <Link href="#about" className="tui-header hover:text-accent transition-colors">
            [ABOUT]
          </Link>
          <Link href="#projects" className="tui-header hover:text-accent transition-colors">
            [PROJECTS]
          </Link>
          <Link href="#skills" className="tui-header hover:text-accent transition-colors">
            [SKILLS]
          </Link>
          <Link href="#contact" className="tui-header hover:text-accent transition-colors">
            [CONTACT]
          </Link>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="tui-box p-2 md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden border-t-2 border-foreground bg-card">
          <div className="px-6 py-4 flex flex-col gap-4">
            <Link href="#about" className="tui-header">
              [ABOUT]
            </Link>
            <Link href="#projects" className="tui-header">
              [PROJECTS]
            </Link>
            <Link href="#skills" className="tui-header">
              [SKILLS]
            </Link>
            <Link href="#contact" className="tui-header">
              [CONTACT]
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

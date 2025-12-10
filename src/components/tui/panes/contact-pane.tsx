/**
 * Contact Pane - Contact information and form
 * With stagger animations
 */

import { useState } from "react"
import { StaggerContainer, StaggerItem, motion } from "../animations"

export function ContactPane() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const contacts = [
    { label: "Email", value: "hello@devnull.dev", href: "mailto:hello@devnull.dev" },
    { label: "GitHub", value: "@devnull", href: "https://github.com" },
    { label: "Twitter", value: "@devnull_dev", href: "https://twitter.com" },
    { label: "LinkedIn", value: "/in/devnull", href: "https://linkedin.com" },
  ]

  return (
    <StaggerContainer className="space-y-8">
      {/* Header */}
      <StaggerItem>
        <section className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="tui-label">$ ./contact --init</span>
            <div className="tui-line" />
          </div>
          <p className="text-sm text-muted-foreground">
            Let's build something together. Drop a message or find me elsewhere.
          </p>
        </section>
      </StaggerItem>

      {/* Quick contacts */}
      <StaggerItem>
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="tui-label">links.txt</span>
            <div className="tui-line" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {contacts.map((contact, i) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="tui-box flex items-center justify-between group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{
                  borderColor: "var(--accent)",
                  x: 4,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-xs text-muted-foreground uppercase">{contact.label}</span>
                <span className="text-sm text-foreground group-hover:text-[var(--accent)] transition-colors">
                  {contact.value}
                </span>
              </motion.a>
            ))}
          </div>
        </section>
      </StaggerItem>

      {/* Contact form */}
      <StaggerItem>
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="tui-label">message.new</span>
            <div className="tui-line" />
          </div>

          {submitted ? (
            <motion.div
              className="tui-box-accent text-center py-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.p
                className="text-[var(--accent)] font-bold"
                initial={{ y: 10 }}
                animate={{ y: 0 }}
              >
                ✓ Message sent successfully!
              </motion.p>
              <p className="text-sm text-muted-foreground mt-2">I'll get back to you soon.</p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <motion.div
                  className="space-y-2"
                  whileFocus-within={{ scale: 1.01 }}
                >
                  <label className="text-xs text-muted-foreground uppercase">Name</label>
                  <motion.input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[var(--bg-elevated)] border-2 border-foreground/30 px-3 py-2 text-sm focus:border-[var(--accent)] outline-none transition-colors"
                    placeholder="Your name"
                    required
                    whileFocus={{ borderColor: "var(--accent)" }}
                  />
                </motion.div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase">Email</label>
                  <motion.input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[var(--bg-elevated)] border-2 border-foreground/30 px-3 py-2 text-sm focus:border-[var(--accent)] outline-none transition-colors"
                    placeholder="your@email.com"
                    required
                    whileFocus={{ borderColor: "var(--accent)" }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground uppercase">Message</label>
                <motion.textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[var(--bg-elevated)] border-2 border-foreground/30 px-3 py-2 text-sm focus:border-[var(--accent)] outline-none transition-colors resize-none"
                  placeholder="Your message..."
                  rows={5}
                  required
                  whileFocus={{ borderColor: "var(--accent)" }}
                />
              </div>
              <motion.button
                type="submit"
                className="tui-nav-btn w-full sm:w-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-[var(--accent)] mr-2">&gt;</span>
                Send Message
              </motion.button>
            </motion.form>
          )}
        </section>
      </StaggerItem>

      {/* Footer note */}
      <StaggerItem>
        <motion.section
          className="text-xs text-muted-foreground border-t border-border pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>
            <span className="text-[var(--accent)]">TIP:</span> You can also type{" "}
            <code className="bg-[var(--bg-elevated)] px-1">'email'</code> in the terminal to copy my email.
          </p>
        </motion.section>
      </StaggerItem>
    </StaggerContainer>
  )
}

"use client"

import type React from "react"

import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-20 tui-section-divider">
      <div className="max-w-2xl pt-8">
        <p className="font-mono text-xs text-accent mb-4">$ contact --init</p>
        <h2 className="tui-title text-4xl mb-8">Get In Touch</h2>

        <p className="text-muted-foreground mb-12 leading-relaxed">
          Have a project in mind or want to collaborate? I'd love to hear from you. Send me a message and I'll get back
          to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-mono font-semibold mb-2 text-accent">&gt; Name:</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="tui-input"
              placeholder="your name"
            />
          </div>

          <div>
            <label className="block text-sm font-mono font-semibold mb-2 text-accent">&gt; Email:</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="tui-input"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-mono font-semibold mb-2 text-accent">&gt; Message:</label>
            <textarea
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="tui-input min-h-32 resize-none"
              placeholder="your message here..."
            />
          </div>

          <button type="submit" className="tui-button bg-accent text-accent-foreground hover:bg-accent/90 w-full">
            {submitted ? "✓ Message Sent!" : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  )
}

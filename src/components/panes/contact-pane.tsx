"use client"
import { useState } from "react"
import type React from "react"

export function ContactPane() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setTimeout(() => {
      setStatus("success")
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setStatus("idle"), 2000)
    }, 500)
  }

  return (
    <>
      <div className="border-l-4 border-accent pl-4">
        <div className="text-accent font-bold text-lg tracking-wider">$ contact --info</div>
      </div>

      <div className="space-y-4">
        <div className="border-2 border-foreground p-4">
          <div className="text-accent font-mono text-sm mb-3">Email</div>
          <a href="mailto:alex@example.com" className="text-foreground hover:text-accent transition-colors">
            alex@example.com
          </a>
        </div>

        <div className="border-2 border-foreground p-4">
          <div className="text-accent font-mono text-sm mb-3">Social Links</div>
          <div className="space-y-2">
            {[
              { label: "GitHub", url: "#" },
              { label: "LinkedIn", url: "#" },
              { label: "Twitter", url: "#" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                className="text-foreground hover:text-accent transition-colors text-sm block"
              >
                → {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {status === "success" && (
        <div className="border-2 border-accent p-3 bg-accent/10 text-accent text-sm font-mono">
          ✓ Message sent successfully
        </div>
      )}
    </>
  )
}

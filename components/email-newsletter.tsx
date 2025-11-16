"use client"

import type React from "react"

import { useState } from "react"
import { Mail, CheckCircle2 } from "lucide-react"

export function EmailNewsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <section className="py-12 md:py-16 bg-primary text-white">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-neutral-300 mb-6">
            Subscribe to our newsletter for exclusive deals and new product announcements.
          </p>

          <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>
            <button type="submit" className="btn-accent px-6">
              Subscribe
            </button>
          </form>

          {subscribed && (
            <div className="mt-4 flex items-center justify-center gap-2 text-accent">
              <CheckCircle2 className="w-5 h-5" />
              <span>Thanks for subscribing!</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

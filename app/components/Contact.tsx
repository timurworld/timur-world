"use client";

import { useState } from "react";
import { useReveal } from "../hooks/useReveal";

export default function Contact() {
  const ref = useReveal();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "", honey: "" });
  const [submitted, setSubmitted] = useState(false);
  const [mathAnswer, setMathAnswer] = useState("");
  const [mathA] = useState(Math.floor(Math.random() * 8) + 2);
  const [mathB] = useState(Math.floor(Math.random() * 8) + 2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Bot checks
    if (formData.honey) return; // honeypot filled = bot
    if (parseInt(mathAnswer) !== mathA + mathB) return; // wrong math = bot
    if (!formData.name.trim() || !formData.message.trim()) return;

    // TODO: Wire to actual email service (Formspree, EmailJS, etc.)
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(0,212,255,0.2)",
    color: "#fff",
    borderRadius: "12px",
    padding: "14px 16px",
    fontSize: "16px",
    outline: "none",
    width: "100%",
    transition: "border-color 0.3s, box-shadow 0.3s",
  };

  return (
    <section id="contact" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-[10%] left-[15%] w-[40%] h-[50%] rounded-full bg-neon-blue/[0.06] blur-[140px]" />
        <div className="absolute bottom-[5%] right-[10%] w-[35%] h-[45%] rounded-full bg-neon-purple/[0.06] blur-[120px]" />
      </div>
      <div className="absolute inset-0 grain" />
      <div className="absolute top-0 left-[5%] right-[5%] h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.15), rgba(191,90,242,0.15), transparent)" }} />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Label */}
        <div className="reveal mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase mx-auto"
            style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}
          >
            <span className="text-lg">📬</span>
            <span className="text-neon-blue">Contact</span>
          </span>
        </div>

        <h2 className="reveal font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-7xl font-bold tracking-[-0.03em] leading-[1.05] mb-6">
          <span className="gradient-text">Share your ideas</span> 💡
        </h2>

        <p className="reveal text-white/40 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Got an idea for a game? Want a character designed? Need some
          brainrot in your life? Hit me up! 🧠💀
        </p>

        {/* CTA or Form */}
        <div className="reveal">
          {!showForm && !submitted ? (
            <button
              onClick={() => setShowForm(true)}
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg text-white
                transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                hover:scale-110 active:scale-95 hover-wiggle
                focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon-blue"
              style={{
                background: "linear-gradient(135deg, #00d4ff, #bf5af2, #ff2d78)",
                boxShadow: "0 0 25px rgba(0,212,255,0.35), 0 0 50px rgba(191,90,242,0.2)",
              }}
            >
              <span className="text-xl">✉️</span>
              Say Hello
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          ) : submitted ? (
            <div className="rounded-2xl p-8 text-center" style={{ background: "var(--color-surface)", border: "2px solid rgba(48,209,88,0.3)" }}>
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-neon-green mb-2">Message Sent!</h3>
              <p className="text-white/40">Thanks for reaching out. I&apos;ll get back to you soon!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto text-left space-y-4">
              <div className="rounded-2xl p-6 md:p-8 space-y-4" style={{ background: "var(--color-surface)", border: "1px solid rgba(0,212,255,0.15)" }}>
                {/* Name */}
                <div>
                  <label className="text-sm font-bold text-white/50 mb-1.5 block">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="What should I call you?"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = "#00d4ff"; e.target.style.boxShadow = "0 0 15px rgba(0,212,255,0.2)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(0,212,255,0.2)"; e.target.style.boxShadow = "none"; }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-bold text-white/50 mb-1.5 block">Email <span className="text-white/30">(optional)</span></label>
                  <input
                    type="email"
                    placeholder="So I can reply back"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = "#bf5af2"; e.target.style.boxShadow = "0 0 15px rgba(191,90,242,0.2)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(0,212,255,0.2)"; e.target.style.boxShadow = "none"; }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-sm font-bold text-white/50 mb-1.5 block">Your Idea / Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me your brainrot idea..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical", minHeight: "100px" }}
                    onFocus={(e) => { e.target.style.borderColor = "#ff2d78"; e.target.style.boxShadow = "0 0 15px rgba(255,45,120,0.2)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(0,212,255,0.2)"; e.target.style.boxShadow = "none"; }}
                  />
                </div>

                {/* Math CAPTCHA */}
                <div>
                  <label className="text-sm font-bold text-white/50 mb-1.5 block">
                    Quick check: What is {mathA} + {mathB}? 🤔
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="?"
                    value={mathAnswer}
                    onChange={(e) => setMathAnswer(e.target.value)}
                    style={{ ...inputStyle, maxWidth: "120px" }}
                    onFocus={(e) => { e.target.style.borderColor = "#ffe23d"; e.target.style.boxShadow = "0 0 15px rgba(255,226,61,0.2)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(0,212,255,0.2)"; e.target.style.boxShadow = "none"; }}
                  />
                </div>

                {/* Honeypot — hidden from humans, bots fill it */}
                <input
                  type="text"
                  name="website"
                  value={formData.honey}
                  onChange={(e) => setFormData({ ...formData, honey: e.target.value })}
                  style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 rounded-xl font-bold text-white text-base
                      transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      background: "linear-gradient(135deg, #00d4ff, #bf5af2)",
                      boxShadow: "0 0 20px rgba(0,212,255,0.3)",
                    }}
                  >
                    Send Message 🚀
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-5 py-3.5 rounded-xl font-bold text-white/50 text-sm hover:text-white
                      transition-all duration-300 hover:scale-105"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

      </div>

      {/* Footer */}
      <div className="relative z-10 mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px mb-8" style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.1), rgba(191,90,242,0.1), transparent)" }} />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/20">
            <p>&copy; {new Date().getFullYear()} timur.world</p>
            <p className="flex items-center gap-1.5">
              Built with 🧠 and 🏒
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

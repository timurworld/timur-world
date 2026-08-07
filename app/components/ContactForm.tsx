"use client";

import { useState } from "react";

// TODO(Elya): confirm this is the right inbox for the domain.
const CONTACT_EMAIL = "hello@timur.world";

// Web3Forms access key — get one free at https://web3forms.com by entering the
// inbox address; messages then send silently from the form, no mail app.
// Leave empty to fall back to the visitor's mail app.
const WEB3FORMS_ACCESS_KEY = "";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "", honey: "" });
  const [mathAnswer, setMathAnswer] = useState("");
  const [mathA] = useState(() => Math.floor(Math.random() * 8) + 2);
  const [mathB] = useState(() => Math.floor(Math.random() * 8) + 2);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const viaForm = WEB3FORMS_ACCESS_KEY.length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (form.honey) return; // bots fill the hidden field
    if (!form.name.trim() || !form.message.trim()) {
      setError("Please add your name and a message.");
      return;
    }
    if (parseInt(mathAnswer, 10) !== mathA + mathB) {
      setError("Check the math answer and try again!");
      return;
    }

    if (viaForm) {
      // Silent in-page send via Web3Forms relay.
      setSending(true);
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `Timur.World message from ${form.name}`,
            name: form.name,
            email: form.email || "no-reply@timur.world",
            message: form.message,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setSent(true);
        } else {
          setError("Something went wrong sending — please try again.");
        }
      } catch {
        setError("Something went wrong sending — please try again.");
      } finally {
        setSending(false);
      }
      return;
    }

    // Fallback: open the visitor's mail app pre-filled.
    const subject = encodeURIComponent(`Timur.World message from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const inputCls =
    "w-full px-4 py-3 rounded-xl bg-paper border border-ink/10 text-ink text-sm " +
    "placeholder:text-pencil/60 focus:outline-none focus:border-[#2F7CFF] transition-colors";

  if (sent) {
    return (
      <div className="text-center py-8">
        <span className="text-4xl">💌</span>
        <p className="font-[family-name:var(--font-display)] text-lg font-bold text-ink mt-3">
          {viaForm
            ? "Sent! Thanks for the note — we read everything."
            : <>Your email app should be open — hit send and it&apos;s on its way!</>}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputCls}
        />
        <input
          type="email"
          placeholder="Email (optional)"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputCls}
        />
      </div>

      <textarea
        placeholder="Your message, question, or character idea…"
        rows={4}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className={inputCls}
      />

      {/* Honeypot — invisible to humans */}
      <input
        type="text"
        value={form.honey}
        onChange={(e) => setForm({ ...form, honey: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="flex items-center gap-3">
        <label className="text-sm text-pencil shrink-0">
          Quick check: {mathA} + {mathB} =
        </label>
        <input
          type="number"
          value={mathAnswer}
          onChange={(e) => setMathAnswer(e.target.value)}
          className={`${inputCls} !w-20`}
        />
      </div>

      {error && <p className="text-sm text-[#FF4D7D] font-semibold">{error}</p>}

      <button
        type="submit"
        disabled={sending}
        className="px-6 py-3.5 bg-ink text-white font-[family-name:var(--font-collector)] font-bold text-xs uppercase tracking-wider hover:bg-ink/90 transition-colors disabled:opacity-60"
      >
        {sending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

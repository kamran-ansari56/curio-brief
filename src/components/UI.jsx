import { useState } from 'react'
import { C } from '../theme.js'

export function ELI5({ text, color }) {
  return (
    <div style={{ fontSize: 14, color: C.text, lineHeight: 1.85, background: `${color}0d`, borderRadius: 10, padding: '12px 14px', marginBottom: 10 }}>
      {text}
    </div>
  )
}

export function ActionRow({ label, text, color }) {
  return (
    <div style={{ display: 'flex', gap: 8, padding: '8px 12px', background: C.surface, borderRadius: 8, marginBottom: 6, borderLeft: `2px solid ${color}` }}>
      <span style={{ fontSize: 11, color, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap', paddingTop: 1, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{text}</span>
    </div>
  )
}

export function Tag({ label, color }) {
  return (
    <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 20, background: `${color}22`, color, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginRight: 6, marginBottom: 4 }}>
      {label}
    </span>
  )
}

export function SectionHeader({ text, color }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12, marginTop: 4 }}>
      {text}
    </div>
  )
}

export function Mnemonic({ text, color }) {
  const [open, setOpen] = useState(false)
  if (!text) return null
  return (
    <div onClick={() => setOpen(o => !o)} style={{ marginTop: 12, padding: '8px 14px', borderRadius: 10, border: `1px dashed ${open ? color : C.dim}`, background: open ? `${color}10` : 'transparent', cursor: 'pointer', transition: 'all 0.25s' }}>
      <span style={{ fontSize: 11, color: open ? color : C.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        🧠 Memory Trick · {open ? 'tap to hide ▲' : 'tap to reveal ▼'}
      </span>
      {open && <div style={{ marginTop: 6, fontSize: 13, color: C.text, lineHeight: 1.6 }}>{text}</div>}
    </div>
  )
}

export function Card({ emoji, title, color, children, mnemonic, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, marginBottom: 14, overflow: 'hidden' }}>
      <div onClick={() => setOpen(o => !o)} style={{ padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', borderBottom: open ? `1px solid ${C.border}` : 'none' }}>
        <span style={{ fontSize: 20 }}>{emoji}</span>
        <span style={{ flex: 1, fontWeight: 700, fontSize: 14, color: C.text, lineHeight: 1.3 }}>{title}</span>
        <span style={{ color: C.dim, fontSize: 12 }}>{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div style={{ padding: '14px 16px' }}>
          {children}
          {mnemonic && <Mnemonic text={mnemonic} color={color} />}
        </div>
      )}
    </div>
  )
}

export function Quiz({ questions, color, onXP }) {
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  if (!questions?.length) return null
  const q = questions[idx]

  const choose = (i) => {
    if (selected !== null) return
    setSelected(i)
    if (i === q.answer) setScore(s => s + 1)
  }

  const next = () => {
    const isLast = idx + 1 >= questions.length
    if (isLast) {
      const final = score + (selected === q.answer ? 1 : 0)
      setDone(true)
      onXP && onXP(final * 10)
    } else {
      setIdx(i => i + 1)
      setSelected(null)
    }
  }

  if (done) {
    const final = score
    return (
      <div style={{ textAlign: 'center', padding: '28px', background: C.card, borderRadius: 16, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 52, marginBottom: 8 }}>{final === questions.length ? '🏆' : final >= 2 ? '⭐' : '📚'}</div>
        <div style={{ fontSize: 20, fontWeight: 900, color, marginBottom: 6 }}>{final}/{questions.length} Correct!</div>
        <div style={{ color: C.muted, fontSize: 13 }}>
          {final === questions.length ? 'Perfect score! +30 XP earned!' : final >= 2 ? 'Nice work! +20 XP earned!' : 'Keep learning! +10 XP earned!'}
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${color}44`, padding: 20 }}>
      <div style={{ fontSize: 11, color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, fontWeight: 800 }}>
        🧩 Quiz · Question {idx + 1}/{questions.length}
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 16, lineHeight: 1.5 }}>{q.q}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
        {q.options.map((opt, i) => {
          let bg = C.surface, border = C.border, tc = C.text
          if (selected !== null) {
            if (i === q.answer) { bg = '#0d2a0d'; border = C.mint; tc = C.mint }
            else if (i === selected) { bg = '#2a0d0d'; border = C.rose; tc = C.rose }
          }
          return (
            <button key={i} onClick={() => choose(i)} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 10, padding: '10px 14px', color: tc, fontSize: 14, textAlign: 'left', cursor: selected !== null ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>
              <span style={{ opacity: 0.4, marginRight: 8 }}>{['A','B','C','D'][i]}.</span>{opt}
            </button>
          )
        })}
      </div>
      {selected !== null && (
        <>
          <div style={{ padding: '12px 14px', borderRadius: 10, marginBottom: 12, background: selected === q.answer ? '#0d2a0d' : '#2a0d0d', border: `1px solid ${selected === q.answer ? C.mint : C.rose}44` }}>
            <div style={{ fontWeight: 700, color: selected === q.answer ? C.mint : C.rose, marginBottom: 4, fontSize: 13 }}>
              {selected === q.answer ? '✅ Correct!' : '❌ Not quite — but here\'s the cool part:'}
            </div>
            <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>💡 {q.funFact}</div>
          </div>
          <button onClick={next} style={{ width: '100%', padding: '11px', background: color, color: '#0d0d14', border: 'none', borderRadius: 10, fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
            {idx + 1 >= questions.length ? 'See My Score 🏁' : 'Next Question →'}
          </button>
        </>
      )}
    </div>
  )
}

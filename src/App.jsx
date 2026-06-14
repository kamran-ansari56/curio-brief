import { useState, useEffect } from 'react'
import { C, DOMAINS } from './theme.js'
import { RENDERERS } from './components/DomainViews.jsx'
import { SectionHeader } from './components/UI.jsx'

// ── Import all available date data files ─────────────────────────────────────
// Add new dates here as you generate them
import d0601 from './data/2026-06-01.js'
import d0602 from './data/2026-06-02.js'
import d0612 from './data/2026-06-12.js'
import d0613 from './data/2026-06-13.js'

const ALL_BRIEFS = {
  '2026-06-01': d0601,
  '2026-06-02': d0602,
  '2026-06-12': d0612,
  '2026-06-13': d0613,
}

const AVAILABLE_DATES = Object.keys(ALL_BRIEFS).sort()

// ── XP Bar ────────────────────────────────────────────────────────────────────
function XPBar({ xp }) {
  const level = Math.floor(xp / 100) + 1
  const pct = xp % 100
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: C.lavender, whiteSpace: 'nowrap' }}>LVL {level}</div>
      <div style={{ width: 80, height: 5, background: C.dim, borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg,${C.lavender},${C.mint})`, borderRadius: 3, transition: 'width 0.5s' }} />
      </div>
      <div style={{ fontSize: 11, color: C.muted, whiteSpace: 'nowrap' }}>{xp} XP</div>
    </div>
  )
}

// ── Date Pill ─────────────────────────────────────────────────────────────────
function fmtDate(iso) {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
}

function fmtDateLong(iso) {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [activeDate, setActiveDate] = useState(AVAILABLE_DATES[AVAILABLE_DATES.length - 1])
  const [activeId, setActiveId] = useState('news')
  const [visibleIds, setVisibleIds] = useState(DOMAINS.map(d => d.id))
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem('curio_xp') || '0'))
  const [showFilter, setShowFilter] = useState(false)
  const [showDates, setShowDates] = useState(false)

  useEffect(() => {
    localStorage.setItem('curio_xp', xp)
  }, [xp])

  const visibleDomains = DOMAINS.filter(d => visibleIds.includes(d.id))
  const active = DOMAINS.find(d => d.id === activeId) || visibleDomains[0]
  const Renderer = RENDERERS[activeId]
  const brief = ALL_BRIEFS[activeDate]
  const data = brief ? brief[activeId] : null

  const toggleCat = (id) => {
    setVisibleIds(prev =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter(x => x !== id) : prev) : [...prev, id]
    )
  }

  const reportName = `Daily_Brief_for_${activeDate}`

  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: "'Inter',-apple-system,sans-serif", color: C.text }}>

      {/* ── HEADER ── */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: '14px 20px', position: 'sticky', top: 0, zIndex: 200 }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>

          {/* Top row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.03em', background: `linear-gradient(120deg,${C.lavender},${C.mint},${C.peach})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                🌌 CURIO BRIEF
              </div>
              <div style={{ fontSize: 9, color: C.muted, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'monospace', marginTop: 2 }}>
                {reportName}
              </div>
            </div>
            <XPBar xp={xp} />
          </div>

          {/* Controls row */}
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap', alignItems: 'center' }}>

            {/* Date selector */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => { setShowDates(s => !s); setShowFilter(false) }}
                style={{ padding: '7px 14px', background: C.card, border: `1px solid ${C.mint}44`, borderRadius: 8, color: C.mint, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                📅 {fmtDateLong(activeDate)} ▾
              </button>
              {showDates && (
                <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, zIndex: 300, minWidth: 180, display: 'flex', flexDirection: 'column', gap: 4, boxShadow: '0 8px 32px #00000066' }}>
                  <div style={{ fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Available Briefs</div>
                  {AVAILABLE_DATES.slice().reverse().map(d => (
                    <button key={d} onClick={() => { setActiveDate(d); setShowDates(false); setActiveId('news') }} style={{
                      padding: '8px 12px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                      background: activeDate === d ? `${C.mint}22` : 'transparent',
                      border: `1px solid ${activeDate === d ? C.mint : 'transparent'}`,
                      color: activeDate === d ? C.mint : C.text, fontWeight: activeDate === d ? 700 : 400
                    }}>
                      {fmtDateLong(d)}
                    </button>
                  ))}
                  <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 6, paddingTop: 6, fontSize: 11, color: C.dim, lineHeight: 1.5 }}>
                    More dates added daily.<br/>Ask Claude to generate!
                  </div>
                </div>
              )}
            </div>

            {/* Category filter */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => { setShowFilter(s => !s); setShowDates(false) }}
                style={{ padding: '7px 14px', background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, color: C.muted, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                🎛 Topics ({visibleIds.length}/10)
              </button>
              {showFilter && (
                <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, zIndex: 300, width: 280, display: 'flex', flexWrap: 'wrap', gap: 6, boxShadow: '0 8px 32px #00000066' }}>
                  {DOMAINS.map(d => (
                    <button key={d.id} onClick={() => toggleCat(d.id)} style={{
                      padding: '5px 10px', borderRadius: 8, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
                      background: visibleIds.includes(d.id) ? `${d.color}22` : C.surface,
                      border: `1px solid ${visibleIds.includes(d.id) ? d.color : C.border}`,
                      color: visibleIds.includes(d.id) ? d.color : C.muted
                    }}>
                      {d.emoji} {d.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* XP info */}
            <div style={{ marginLeft: 'auto', fontSize: 11, color: C.muted }}>
              {AVAILABLE_DATES.length} brief{AVAILABLE_DATES.length !== 1 ? 's' : ''} available
            </div>
          </div>

          {/* Tab strip */}
          <div style={{ display: 'flex', gap: 2, marginTop: 12, overflowX: 'auto', paddingBottom: 1 }}>
            {visibleDomains.map(d => (
              <button key={d.id} onClick={() => setActiveId(d.id)} style={{
                display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px',
                borderRadius: '8px 8px 0 0',
                border: `1px solid ${activeId === d.id ? d.color + '66' : C.border}`,
                borderBottom: activeId === d.id ? `2px solid ${d.color}` : `1px solid ${C.border}`,
                background: activeId === d.id ? `${d.color}12` : 'transparent',
                cursor: 'pointer', fontSize: 11, fontWeight: activeId === d.id ? 800 : 500,
                color: activeId === d.id ? d.color : C.muted,
                whiteSpace: 'nowrap', fontFamily: 'inherit', transition: 'all 0.15s', flexShrink: 0
              }}>
                <span>{d.emoji}</span><span>{d.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 16px 80px' }}>

        {/* Domain header */}
        {active && brief && (
          <div style={{ marginBottom: 20, padding: '14px 18px', background: `${active.color}0d`, border: `1px solid ${active.color}33`, borderRadius: 14 }}>
            <div style={{ fontSize: 24, marginBottom: 4 }}>{active.emoji}</div>
            <div style={{ fontSize: 17, fontWeight: 900, color: active.color, marginBottom: 2 }}>{active.label}</div>
            <div style={{ fontSize: 12, color: C.muted }}>{active.desc} · {fmtDateLong(activeDate)}</div>
          </div>
        )}

        {/* No brief for this date */}
        {!brief && (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: C.card, borderRadius: 16, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 10 }}>No brief for {fmtDateLong(activeDate)}</div>
            <div style={{ fontSize: 14, color: C.muted, maxWidth: 360, margin: '0 auto', lineHeight: 1.8 }}>
              Ask Claude to <strong style={{ color: C.lavender }}>"generate brief for [date]"</strong> — it searches real news and writes all 10 domains fresh.
            </div>
            <div style={{ marginTop: 16, fontSize: 12, color: C.dim }}>
              Available dates: {AVAILABLE_DATES.map(d => fmtDate(d)).join(', ')}
            </div>
          </div>
        )}

        {/* Render domain content */}
        {brief && Renderer && data && (
          <Renderer data={data} color={active.color} onXP={(earned) => setXp(x => x + earned)} />
        )}

        {brief && (!Renderer || !data) && (
          <div style={{ textAlign: 'center', padding: '40px', color: C.muted, fontSize: 14 }}>
            Content for this section is not available yet.
          </div>
        )}
      </div>

      {/* ── CLOSE DROPDOWNS on outside click ── */}
      {(showFilter || showDates) && (
        <div onClick={() => { setShowFilter(false); setShowDates(false) }}
          style={{ position: 'fixed', inset: 0, zIndex: 100 }} />
      )}

      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.dim}; border-radius: 2px; }
        button { transition: opacity 0.15s; }
        button:hover:not(:disabled) { opacity: 0.8; }
        @media (max-width: 600px) {
          .tab-strip button span:last-child { display: none; }
        }
      `}</style>
    </div>
  )
}

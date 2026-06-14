import { C } from '../theme.js'
import { ELI5, ActionRow, Tag, SectionHeader, Card, Quiz, Mnemonic } from './UI.jsx'

export function NewsView({ data, color, onXP }) {
  if (!data?.segments) return null
  return (
    <div>
      {data.segments.map((seg, i) => (
        <div key={i} style={{ marginBottom: 24 }}>
          <SectionHeader text={seg.name} color={seg.color || color} />
          {seg.stories.map((s, j) => (
            <Card key={j} emoji="📰" title={s.headline} color={color} mnemonic={s.mnemonic}>
              <ELI5 text={s.eli5} color={color} />
              <ActionRow label="Why care" text={s.whyItMatters} color={color} />
            </Card>
          ))}
        </div>
      ))}
      <SectionHeader text="🧩 Test Yourself" color={color} />
      <Quiz questions={data.quiz} color={color} onXP={onXP} />
    </div>
  )
}

export function MarketsView({ data, color, onXP }) {
  if (!data?.globalPulse) return null
  const im = data.indianMarket
  return (
    <div>
      <Card emoji="🌊" title="The World's Money River Today" color={color}>
        <ELI5 text={data.globalPulse.eli5} color={color} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {data.globalPulse.keyThings?.map((k, i) => <Tag key={i} label={k} color={color} />)}
        </div>
      </Card>
      <Card emoji="🎪" title="India's Stock Bazaar" color={color}>
        <ELI5 text={im?.eli5} color={color} />
      </Card>
      <SectionHeader text="🚀 3 Stocks to Watch" color={color} />
      {im?.breakouts?.map((b, i) => (
        <Card key={i} emoji="📈" title={b.name} color={color}>
          <ELI5 text={b.whyExciting} color={color} />
          <ActionRow label="Risk" text={b.risk} color={C.rose} />
        </Card>
      ))}
      <Card emoji="🎟️" title={`IPO Spotlight: ${im?.ipoSpot?.name}`} color={color}>
        <div style={{ marginBottom: 10 }}>
          <span style={{ padding: '4px 16px', borderRadius: 20, fontWeight: 800, fontSize: 13, background: im?.ipoSpot?.verdict === 'Apply' ? '#0d2a0d' : im?.ipoSpot?.verdict === 'Avoid' ? '#2a0d0d' : '#2a2a0d', color: im?.ipoSpot?.verdict === 'Apply' ? C.mint : im?.ipoSpot?.verdict === 'Avoid' ? C.rose : C.lemon }}>
            {im?.ipoSpot?.verdict}
          </span>
        </div>
        <ELI5 text={im?.ipoSpot?.eli5} color={color} />
      </Card>
      <Card emoji="📖" title={im?.lessonOfDay?.title} color={color} mnemonic={im?.lessonOfDay?.mnemonic}>
        <ELI5 text={im?.lessonOfDay?.story} color={color} />
      </Card>
      <div style={{ fontSize: 11, color: C.muted, marginBottom: 16, fontStyle: 'italic', padding: '0 4px' }}>
        ⚠️ Educational only. Not SEBI-registered investment advice. Do your own research.
      </div>
      <SectionHeader text="🧩 Test Yourself" color={color} />
      <Quiz questions={data.quiz} color={color} onXP={onXP} />
    </div>
  )
}

export function PsychView({ data, color, onXP }) {
  if (!data?.mindTrick) return null
  return (
    <div>
      <Card emoji="🧠" title={data.mindTrick.name} color={color} mnemonic={data.mindTrick.mnemonic}>
        <ELI5 text={data.mindTrick.eli5} color={color} />
        <ActionRow label="Real Life" text={data.mindTrick.realLife} color={color} />
      </Card>
      <Card emoji="👁️" title={data.bodyLanguage.signal} color={color} mnemonic={data.bodyLanguage.mnemonic}>
        <ELI5 text={data.bodyLanguage.eli5} color={color} />
        <ActionRow label="Use It" text={data.bodyLanguage.howToUse} color={color} />
      </Card>
      <Card emoji="⚡" title={data.superpower.name} color={color} mnemonic={data.superpower.mnemonic}>
        <ELI5 text={data.superpower.story} color={color} />
        <ActionRow label="Shield" text={data.superpower.shield} color={C.rose} />
      </Card>
      <SectionHeader text="🧩 Test Yourself" color={color} />
      <Quiz questions={data.quiz} color={color} onXP={onXP} />
    </div>
  )
}

export function LeadView({ data, color, onXP }) {
  if (!data?.leaderMove) return null
  return (
    <div>
      <Card emoji="👑" title={data.leaderMove.name} color={color} mnemonic={data.leaderMove.mnemonic}>
        <ELI5 text={data.leaderMove.story} color={color} />
        <ActionRow label="Do Today" text={data.leaderMove.doThis} color={color} />
      </Card>
      <Card emoji="🔭" title={data.visionarySecret?.concept || 'Visionary Thinking'} color={color} mnemonic={data.visionarySecret?.mnemonic}>
        <ELI5 text={data.visionarySecret?.eli5} color={color} />
        <ActionRow label="Exercise" text={data.visionarySecret?.exercise} color={color} />
      </Card>
      <Card emoji="💎" title={data.eliteHabit.habit} color={color} mnemonic={data.eliteHabit.mnemonic}>
        <ELI5 text={data.eliteHabit.whyItWorks} color={color} />
        <ActionRow label="Who & How" text={data.eliteHabit.whoAndHow} color={color} />
      </Card>
      <Card emoji="🗿" title={data.sigmaWisdom.lesson} color={color} mnemonic={data.sigmaWisdom.mnemonic}>
        <ELI5 text={data.sigmaWisdom.story} color={color} />
        <ActionRow label="Do Now" text={data.sigmaWisdom.action} color={color} />
      </Card>
      <SectionHeader text="🧩 Test Yourself" color={color} />
      <Quiz questions={data.quiz} color={color} onXP={onXP} />
    </div>
  )
}

export function WealthView({ data, color, onXP }) {
  if (!data?.wealthSecret) return null
  return (
    <div>
      <Card emoji="🌱" title={data.wealthSecret.name} color={color} mnemonic={data.wealthSecret.mnemonic}>
        <ELI5 text={data.wealthSecret.story} color={color} />
        <ActionRow label="This Week" text={data.wealthSecret.action} color={color} />
      </Card>
      <Card emoji="🏧" title={data.moneyMachine.type} color={color} mnemonic={data.moneyMachine.mnemonic}>
        <ELI5 text={data.moneyMachine.eli5} color={color} />
        <ActionRow label="India Angle" text={data.moneyMachine.indiaAngle} color={color} />
      </Card>
      <Card emoji="🔄" title="Mindset Flip" color={color} mnemonic={data.mindsetFlip?.mnemonic}>
        <div style={{ background: '#2a0d0d', borderRadius: 10, padding: '10px 14px', marginBottom: 8 }}>
          <div style={{ fontSize: 10, color: C.rose, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Most people think</div>
          <div style={{ fontSize: 13, color: C.muted }}>{data.mindsetFlip?.oldThinking}</div>
        </div>
        <div style={{ background: '#0d2a0d', borderRadius: 10, padding: '10px 14px', marginBottom: 8 }}>
          <div style={{ fontSize: 10, color: C.mint, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>1% thinks</div>
          <div style={{ fontSize: 14, color: C.text, fontWeight: 600 }}>{data.mindsetFlip?.newThinking}</div>
        </div>
        <ELI5 text={data.mindsetFlip?.why} color={color} />
      </Card>
      <div style={{ padding: '18px', background: `${color}15`, border: `1px solid ${color}44`, borderRadius: 14, marginBottom: 14, textAlign: 'center' }}>
        <div style={{ fontSize: 26, fontWeight: 900, color, marginBottom: 6 }}>{data.magicNumber?.number}</div>
        <div style={{ fontSize: 14, color: C.text, lineHeight: 1.7 }}>{data.magicNumber?.eli5}</div>
        <Mnemonic text={data.magicNumber?.mnemonic} color={color} />
      </div>
      <SectionHeader text="🧩 Test Yourself" color={color} />
      <Quiz questions={data.quiz} color={color} onXP={onXP} />
    </div>
  )
}

export function CommView({ data, color, onXP }) {
  if (!data?.speakingSkill) return null
  return (
    <div>
      <Card emoji="🎤" title={data.speakingSkill.name} color={color} mnemonic={data.speakingSkill.mnemonic}>
        <ELI5 text={data.speakingSkill.story} color={color} />
        <ActionRow label="Drill" text={data.speakingSkill.drill} color={color} />
      </Card>
      <Card emoji="🤝" title={data.negotiationMove.tactic} color={color} mnemonic={data.negotiationMove.mnemonic}>
        <ELI5 text={data.negotiationMove.eli5} color={color} />
        <ActionRow label="Script" text={data.negotiationMove.script} color={color} />
      </Card>
      <Card emoji="🏢" title={data.officeWin.rule} color={color} mnemonic={data.officeWin.mnemonic}>
        <ELI5 text={data.officeWin.story} color={color} />
        <ActionRow label="Mistake" text={data.officeWin.mistake} color={C.rose} />
      </Card>
      <Card emoji="💪" title={data.confidenceHack.technique} color={color} mnemonic={data.confidenceHack.mnemonic}>
        <ELI5 text={data.confidenceHack.science} color={color} />
        <ActionRow label="Do It Now" text={data.confidenceHack.doItNow} color={color} />
      </Card>
      <SectionHeader text="🧩 Test Yourself" color={color} />
      <Quiz questions={data.quiz} color={color} onXP={onXP} />
    </div>
  )
}

export function MindView({ data, color, onXP }) {
  if (!data?.brainHack) return null
  return (
    <div>
      <Card emoji="🚀" title={data.brainHack.name} color={color} mnemonic={data.brainHack.mnemonic}>
        <ELI5 text={data.brainHack.eli5} color={color} />
        <ActionRow label="Protocol" text={data.brainHack.protocol} color={color} />
      </Card>
      <Card emoji="🐸" title={data.disciplineCode.principle} color={color} mnemonic={data.disciplineCode.mnemonic}>
        <ELI5 text={data.disciplineCode.story} color={color} />
        <ActionRow label="Today" text={data.disciplineCode.todayAction} color={color} />
      </Card>
      <Card emoji="👾" title={data.impulseKiller.urge} color={color} mnemonic={data.impulseKiller.mnemonic}>
        <ELI5 text={data.impulseKiller.eli5} color={color} />
        <ActionRow label="Interrupt" text={data.impulseKiller.interrupt} color={color} />
      </Card>
      <Card emoji="🥶" title={data.bodyUpgrade.practice} color={color} mnemonic={data.bodyUpgrade.mnemonic}>
        <ELI5 text={data.bodyUpgrade.eli5} color={color} />
        <ActionRow label="Min Dose" text={data.bodyUpgrade.minimumDose} color={color} />
      </Card>
      <SectionHeader text="🧩 Test Yourself" color={color} />
      <Quiz questions={data.quiz} color={color} onXP={onXP} />
    </div>
  )
}

export function KnowView({ data, color, onXP }) {
  if (!data?.mathMagic) return null
  return (
    <div>
      <Card emoji="✨" title={data.mathMagic.concept} color={color} mnemonic={data.mathMagic.mnemonic}>
        <ELI5 text={data.mathMagic.eli5} color={color} />
        <ActionRow label="Real World" text={data.mathMagic.realWorldUse} color={color} />
      </Card>
      <Card emoji="🌌" title={data.scienceWow.concept} color={color} mnemonic={data.scienceWow.mnemonic}>
        <ELI5 text={data.scienceWow.eli5} color={color} />
        <ActionRow label="Mind Blow" text={data.scienceWow.mindBlow} color={color} />
      </Card>
      <Card emoji="📜" title={data.historyStory.event} color={color} mnemonic={data.historyStory.mnemonic}>
        <ELI5 text={data.historyStory.story} color={color} />
        <ActionRow label="Steal This" text={data.historyStory.lesson} color={color} />
      </Card>
      <Card emoji="🗺️" title={data.earthSecret.place} color={color} mnemonic={data.earthSecret.mnemonic}>
        <ELI5 text={data.earthSecret.secret} color={color} />
        <ActionRow label="Your Edge" text={data.earthSecret.edge} color={color} />
      </Card>
      <SectionHeader text="🧩 Test Yourself" color={color} />
      <Quiz questions={data.quiz} color={color} onXP={onXP} />
    </div>
  )
}

export function AIView({ data, color, onXP }) {
  if (!data?.toolSpotlight) return null
  return (
    <div>
      <Card emoji="🤖" title={data.toolSpotlight.name} color={color} mnemonic={data.toolSpotlight.mnemonic}>
        <Tag label={data.toolSpotlight.category} color={color} />
        <ELI5 text={data.toolSpotlight.eli5} color={color} />
        <ActionRow label="Secret Move" text={data.toolSpotlight.secretMove} color={color} />
      </Card>
      <Card emoji="⚙️" title={data.workflowWin.title} color={color} mnemonic={data.workflowWin.mnemonic}>
        <ELI5 text={data.workflowWin.problem} color={color} />
        <ol style={{ paddingLeft: 18, margin: '8px 0 10px', color: C.muted, fontSize: 13, lineHeight: 2 }}>
          {data.workflowWin.steps?.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
        <ActionRow label="Time Saved" text={data.workflowWin.timeSaved} color={color} />
      </Card>
      <Card emoji="📋" title={`Prompt: ${data.promptOfDay.purpose}`} color={color} mnemonic={data.promptOfDay.mnemonic}>
        <Tag label={`Use on: ${data.promptOfDay.where}`} color={color} />
        <div style={{ marginTop: 10, padding: '14px', background: '#080812', borderRadius: 10, fontFamily: 'monospace', fontSize: 13, color: '#a8e6c0', lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>
          {data.promptOfDay.prompt}
        </div>
      </Card>
      <Card emoji="🔮" title={data.futureWatch.trend} color={color} mnemonic={data.futureWatch.mnemonic}>
        <ELI5 text={data.futureWatch.eli5} color={color} />
        <ActionRow label="Your Move" text={data.futureWatch.yourMove} color={color} />
      </Card>
      <SectionHeader text="🧩 Test Yourself" color={color} />
      <Quiz questions={data.quiz} color={color} onXP={onXP} />
    </div>
  )
}

export function TravelView({ data, color, onXP }) {
  if (!data?.destination) return null
  return (
    <div>
      <Card emoji="🗺️" title={`${data.destination.country} · ${data.destination.region}`} color={color} mnemonic={data.destination.mnemonic}>
        <ELI5 text={data.destination.eli5} color={color} />
        <ActionRow label="Best Time" text={data.destination.bestTime} color={color} />
        <ActionRow label="Hidden Gem" text={data.destination.hiddenGem} color={color} />
      </Card>
      <Card emoji="📋" title={`Visa: ${data.visaTip.focus}`} color={color} mnemonic={data.visaTip.mnemonic}>
        <ELI5 text={data.visaTip.eli5} color={color} />
        <ActionRow label="Golden Tip" text={data.visaTip.goldenTip} color={color} />
      </Card>
      <Card emoji="🤲" title={`Culture Code: ${data.culturalCode.culture}`} color={color} mnemonic={data.culturalCode.mnemonic}>
        <ActionRow label="Do This" text={data.culturalCode.doThis} color={color} />
        <ActionRow label="Never Do" text={data.culturalCode.neverDoThis} color={C.rose} />
      </Card>
      <SectionHeader text="🧩 Test Yourself" color={color} />
      <Quiz questions={data.quiz} color={color} onXP={onXP} />
    </div>
  )
}

export const RENDERERS = {
  news: NewsView,
  markets: MarketsView,
  psychology: PsychView,
  leadership: LeadView,
  wealth: WealthView,
  communication: CommView,
  mind: MindView,
  knowledge: KnowView,
  ai: AIView,
  travel: TravelView,
}

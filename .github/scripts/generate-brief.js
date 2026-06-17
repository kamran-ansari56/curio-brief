// .github/scripts/generate-brief.js  v4
// Claude (Anthropic API) + web search + halal stocks + quality gate

import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..', '..')
const DATA_DIR = path.join(ROOT, 'src', 'data')
const APP_PATH = path.join(ROOT, 'src', 'App.jsx')

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function sanitize(obj) {
  let str = JSON.stringify(obj)
  str = str
    .replace(/\u20B9/g, 'Rs.').replace(/\u20AC/g, 'EUR').replace(/\u00A3/g, 'GBP')
    .replace(/\u2014/g, ' - ').replace(/\u2013/g, ' - ')
    .replace(/\u2018/g, "'").replace(/\u2019/g, "'")
    .replace(/\u201C/g, '"').replace(/\u201D/g, '"')
    .replace(/\u2026/g, '...')
    .replace(/[\u00C0-\u00FF]/g, c => {
      const m = {'\u00e0':'a','\u00e1':'a','\u00e9':'e','\u00ea':'e','\u00ed':'i',
                 '\u00f3':'o','\u00fa':'u','\u00fc':'u','\u00f1':'n','\u00e7':'c',
                 '\u00c0':'A','\u00c1':'A','\u00c9':'E','\u00d1':'N','\u00c7':'C'}
      return m[c] || c
    })
  return JSON.parse(str)
}

function getTargetDate() {
  if (process.env.TARGET_DATE?.trim()) return process.env.TARGET_DATE.trim()
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().split('T')[0]
}

function fmtDate(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
    day: '2-digit', month: 'long', year: 'numeric'
  })
}

function passesQualityGate(brief) {
  const checks = []
  const segs = brief.news?.segments || []
  const totalStories = segs.reduce((n, s) => n + (s.stories?.length || 0), 0)
  checks.push({ pass: totalStories >= 6, name: `news stories (${totalStories}, need 6+)` })

  const headlines = segs.flatMap(s => s.stories?.map(st => st.headline) || [])
  const specific = headlines.filter(h => /\d|[A-Z]{2,}|Trump|India|Iran|China|Fed|RBI|Nifty/.test(h)).length
  checks.push({ pass: specific >= Math.floor(headlines.length * 0.5), name: `specific headlines (${specific}/${headlines.length})` })

  const breakouts = brief.markets?.indianMarket?.breakouts || []
  const halalTagged = breakouts.filter(b => b.halal !== undefined).length
  checks.push({ pass: breakouts.length >= 3, name: `stocks (${breakouts.length}, need 3)` })
  checks.push({ pass: halalTagged >= 3, name: `halal tags (${halalTagged}/3)` })

  const domains = ['news','markets','psychology','leadership','wealth','communication','mind','knowledge','ai','travel']
  const quizCount = domains.filter(d => Array.isArray(brief[d]?.quiz) && brief[d].quiz.length >= 2).length
  checks.push({ pass: quizCount >= 8, name: `quizzes (${quizCount}/10, need 8+)` })

  const size = JSON.stringify(brief).length
  checks.push({ pass: size > 20000, name: `content size (${size} chars, need 20k+)` })

  const failed = checks.filter(c => !c.pass)
  if (failed.length > 0) {
    console.log('  Quality gate FAILED:')
    failed.forEach(c => console.log(`    - ${c.name}`))
    return false
  }
  console.log(`  Quality gate passed (${size.toLocaleString()} chars, ${totalStories} stories)`)
  return true
}

async function fetchRealNews(dateStr, dateLabel) {
  console.log(`  Fetching real news for ${dateStr}...`)
  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      tools: [{ type: 'web_search_20250305', name: 'web_search' }],
      messages: [{
        role: 'user',
        content: `Search for the most important real news events that happened on ${dateLabel} (${dateStr}).

Cover: world politics, US news, Middle East, India news, global economy, Nifty/Sensex levels, technology, sports results.

Return 15-20 specific real headlines with:
- Actual names of people and countries
- Specific numbers (prices, levels, counts)
- What actually happened, concisely

Be a journalist. Specificity is everything.`
      }]
    })
    const text = response.content.filter(b => b.type === 'text').map(b => b.text).join('\n')
    console.log(`  Got ${text.length} chars of news context`)
    return text || `Context for ${dateLabel}: major global events of this period in 2026.`
  } catch (err) {
    console.error(`  Web search failed: ${err.message}`)
    return `Generate content for ${dateLabel} based on global events of this period in 2026.`
  }
}

async function generateAllDomains(dateStr, dateLabel, newsContext) {
  console.log('  Generating all 10 domains...')

  const SYSTEM = `You are writing Curio Brief — a daily 10-domain knowledge brief.

RULES:
1. Return ONLY raw valid JSON. No markdown. No backticks. No explanation.
2. Simple language — explain to a curious smart friend.
3. SPECIFIC: use real names, real numbers, real places. No vague generalities.
4. Short sentences. Vivid analogies. Make it genuinely interesting.
5. Every eli5 needs at least one concrete analogy.
6. Quiz answers must be unambiguous. funFact must be genuinely surprising.

HALAL STOCK RULES for markets.indianMarket.breakouts:
- halal: true = pharma, IT, FMCG, telecom, manufacturing, gold, cement, real estate development
- halal: false = banks with riba (HDFC Bank, ICICI Bank, SBI, Kotak), cigarettes (ITC), alcohol companies, consumer finance NBFCs (Bajaj Finance)
- halal: "conditional" = diversified conglomerates with financial arms (Reliance), insurance (HDFC Life), stock exchanges (BSE)
- buyPrice/sellPrice/stopLoss = "Rs.XXXX" if halal, "N/A" if not halal
- PREFER halal stocks. Always try to find 3 clean halal setups.`

  const USER = `DATE: ${dateLabel} (${dateStr})

REAL NEWS FOR THIS DATE:
${newsContext}

Generate the complete Curio Brief JSON. All 10 domains required.

For news domain: anchor headlines to the real events above. Use specific names and numbers.
For markets domain: use real market context if present in the news above.

Required JSON structure — fill every field with real content:

{
  "news": {
    "segments": [
      {"name":"🌐 What's happening with countries?","color":"#a0d4f5","stories":[
        {"headline":"Specific real headline","eli5":"3-4 sentences with vivid analogy","whyItMatters":"1 sentence","mnemonic":"memorable hook"},
        {"headline":"...","eli5":"...","whyItMatters":"...","mnemonic":"..."},
        {"headline":"...","eli5":"...","whyItMatters":"...","mnemonic":"..."}
      ]},
      {"name":"💸 What's happening with money?","color":"#a8edcb","stories":[
        {"headline":"...","eli5":"...","whyItMatters":"...","mnemonic":"..."},
        {"headline":"...","eli5":"...","whyItMatters":"...","mnemonic":"..."}
      ]},
      {"name":"💻 What's happening with technology?","color":"#c9b8f5","stories":[
        {"headline":"...","eli5":"...","whyItMatters":"...","mnemonic":"..."}
      ]},
      {"name":"🌿 What's happening with our planet?","color":"#f5c6a0","stories":[
        {"headline":"...","eli5":"...","whyItMatters":"...","mnemonic":"..."}
      ]}
    ],
    "quiz":[
      {"q":"Question about one real story above","options":["A","B","C","D"],"answer":1,"funFact":"Surprising real fact"},
      {"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},
      {"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}
    ]
  },
  "markets": {
    "globalPulse":{"eli5":"3-4 sentences. Water/river analogy. Reference real events.","keyThings":["Brent Crude: $XX","Nifty: ~XX,XXX","Gold: $X,XXX","USD/INR: XX.X"]},
    "indianMarket":{
      "eli5":"2-3 sentences. Bazaar analogy.",
      "breakouts":[
        {"name":"Company Name (NSE: TICKER)","halal":true,"buyPrice":"Rs.XXXX","sellPrice":"Rs.XXXX","stopLoss":"Rs.XXXX","whyExciting":"Why interesting this week. 2 sentences.","risk":"Key risk. 1 sentence."},
        {"name":"...","halal":false,"buyPrice":"N/A","sellPrice":"N/A","stopLoss":"N/A","whyExciting":"...","risk":"..."},
        {"name":"...","halal":true,"buyPrice":"Rs.XXXX","sellPrice":"Rs.XXXX","stopLoss":"Rs.XXXX","whyExciting":"...","risk":"..."}
      ],
      "ipoSpot":{"name":"IPO name or None this week","verdict":"Apply/Avoid/Watch","eli5":"2 sentences."},
      "lessonOfDay":{"title":"Investing concept","story":"3-4 sentences with analogy.","mnemonic":"..."}
    },
    "quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]
  },
  "psychology": {
    "mindTrick":{"name":"Real psychology concept name","eli5":"4 sentences. Everyday analogy.","realLife":"2 sentences where to see this.","mnemonic":"..."},
    "bodyLanguage":{"signal":"Specific body language cue","eli5":"3 sentences.","howToUse":"2 sentences practical.","mnemonic":"..."},
    "superpower":{"name":"Influence principle (Cialdini, Kahneman, etc)","story":"3-4 sentence story in action.","shield":"2 sentences how to defend.","mnemonic":"..."},
    "quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]
  },
  "leadership": {
    "leaderMove":{"name":"Leadership principle","story":"4 sentence story about a real leader.","doThis":"2 sentences exact action.","mnemonic":"..."},
    "visionarySecret":{"concept":"Visionary thinking concept","eli5":"3-4 sentences.","exercise":"2 sentences.","mnemonic":"..."},
    "eliteHabit":{"habit":"Habit from elite performer (name them)","whoAndHow":"Name + exactly how they practice it.","whyItWorks":"2 sentences.","mnemonic":"..."},
    "sigmaWisdom":{"lesson":"Stoic or independent thinking lesson","story":"3 sentences.","action":"1 sentence — do this today.","mnemonic":"..."},
    "quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]
  },
  "wealth": {
    "wealthSecret":{"name":"Wealth concept name","story":"4 sentences. Seed/snowball/river analogy.","action":"2 sentences this-week action.","mnemonic":"..."},
    "moneyMachine":{"type":"Passive income vehicle name","eli5":"3 sentences. Vending machine analogy.","indiaAngle":"2 sentences India-specific (SIP/REIT/SGB/P2P).","mnemonic":"..."},
    "mindsetFlip":{"oldThinking":"Common money belief","newThinking":"What wealthy people believe instead","why":"2-3 sentences math or logic.","mnemonic":"..."},
    "magicNumber":{"number":"Key financial rule or ratio","eli5":"3 sentences story.","mnemonic":"..."},
    "quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]
  },
  "communication": {
    "speakingSkill":{"name":"Speaking technique name","story":"3-4 sentences. Famous speaker example.","drill":"2 sentences exact practice drill.","mnemonic":"..."},
    "negotiationMove":{"tactic":"Negotiation tactic name","eli5":"3 sentences analogy.","script":"Exact words to say.","mnemonic":"..."},
    "officeWin":{"rule":"Professional behaviour principle","story":"3 sentences Person A vs Person B contrast.","mistake":"1 sentence most common mistake.","mnemonic":"..."},
    "confidenceHack":{"technique":"Evidence-based confidence technique","science":"2 sentences brain or body science.","doItNow":"2 sentences before your next meeting.","mnemonic":"..."},
    "quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]
  },
  "mind": {
    "brainHack":{"name":"Brain technique name","eli5":"3-4 sentences. Wild horse analogy.","protocol":"2-3 sentences exact protocol with timing.","mnemonic":"..."},
    "disciplineCode":{"principle":"Discipline principle name","story":"3 sentences warrior or athlete story.","todayAction":"2 sentences exactly what to do today.","mnemonic":"..."},
    "impulseKiller":{"urge":"Specific impulse type","eli5":"2 sentences.","interrupt":"2 sentences 60-second interrupt technique.","mnemonic":"..."},
    "bodyUpgrade":{"practice":"Physical practice name","eli5":"2 sentences why it works.","minimumDose":"1 sentence minimum effective dose.","mnemonic":"..."},
    "quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]
  },
  "knowledge": {
    "mathMagic":{"concept":"Math or stats concept name","eli5":"4 sentences. Toy or food analogy.","realWorldUse":"2 sentences real application.","mnemonic":"..."},
    "scienceWow":{"field":"Physics/Chemistry/Biology/Astronomy","concept":"Specific concept name","eli5":"4 sentences with wonder.","mindBlow":"1-2 sentences jaw-dropping fact.","mnemonic":"..."},
    "historyStory":{"event":"Specific historical event or person","story":"4 sentences narrative. Include real names and dates.","lesson":"2 sentences what to steal from this for today.","mnemonic":"..."},
    "earthSecret":{"place":"Specific country or region","secret":"3 sentences something most people do not know. Specific facts.","edge":"2 sentences why knowing this gives an advantage.","mnemonic":"..."},
    "quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]
  },
  "ai": {
    "toolSpotlight":{"name":"Real AI tool name","category":"writing/coding/research/creative","eli5":"3-4 sentences. Magic assistant analogy.","secretMove":"2-3 sentences non-obvious power use most people miss.","mnemonic":"..."},
    "workflowWin":{"title":"Workflow name","problem":"2 sentences what it solves.","steps":["Step 1 specific","Step 2","Step 3","Step 4"],"timeSaved":"1 sentence realistic saving.","mnemonic":"..."},
    "promptOfDay":{"purpose":"Specific use case","prompt":"Exact ready-to-use prompt with [PLACEHOLDERS IN BRACKETS].","where":"Claude/ChatGPT/Gemini","mnemonic":"..."},
    "futureWatch":{"trend":"Specific real AI trend","eli5":"3 sentences before and after impact.","yourMove":"2 sentences what to do right now.","mnemonic":"..."},
    "quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]
  },
  "travel": {
    "destination":{"country":"Specific country","region":"Specific region or city","eli5":"4 sentences postcard description. Sensory details.","bestTime":"1-2 sentences optimal travel window.","hiddenGem":"2 sentences what tourists almost never discover.","mnemonic":"..."},
    "visaTip":{"focus":"Country visa process for Indian passport holders","eli5":"3 sentences simple directions.","goldenTip":"2 sentences tactical tip most people miss.","mnemonic":"..."},
    "culturalCode":{"culture":"Country or culture name","doThis":"2 sentences what locals love when visitors do this.","neverDoThis":"2 sentences what genuinely offends locals.","mnemonic":"..."},
    "quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]
  }
}`

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`  Claude call attempt ${attempt}/3...`)
      const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 8000,
        system: SYSTEM,
        messages: [{ role: 'user', content: USER }]
      })

      const raw = response.content.find(b => b.type === 'text')?.text || ''
      const clean = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()
      const parsed = JSON.parse(clean)

      const domains = ['news','markets','psychology','leadership','wealth','communication','mind','knowledge','ai','travel']
      const missing = domains.filter(d => !parsed[d])
      if (missing.length > 0) throw new Error(`Missing domains: ${missing.join(', ')}`)

      return parsed
    } catch (err) {
      console.error(`  Attempt ${attempt} failed: ${err.message.slice(0, 120)}`)
      if (attempt < 3) await new Promise(r => setTimeout(r, 3000))
    }
  }
  return null
}

function rebuildAppJsx() {
  console.log('\n  Rebuilding App.jsx...')
  const dateFiles = fs.readdirSync(DATA_DIR)
    .filter(f => /^\d{4}-\d{2}-\d{2}\.js$/.test(f))
    .sort()

  let app = fs.readFileSync(APP_PATH, 'utf8')
  const START = '// == DATA START =='
  const END = '// == DATA END =='
  const lines = [START, '']
  const varNames = []

  for (const file of dateFiles) {
    const dateStr = file.replace('.js', '')
    const varName = 'd' + dateStr.slice(2).replace(/-/g, '')
    varNames.push({ dateStr, varName })
    let content = fs.readFileSync(path.join(DATA_DIR, file), 'utf8').trim()
    content = content.replace(/^export default\s*/, `const ${varName} = `)
    lines.push(content, '')
  }

  lines.push('const ALL_BRIEFS = {')
  for (const { dateStr, varName } of varNames) lines.push(`  '${dateStr}': ${varName},`)
  lines.push('}', '', END)

  const sp = app.indexOf(START)
  const ep = app.indexOf(END) + END.length
  app = app.slice(0, sp) + lines.join('\n') + app.slice(ep)
  fs.writeFileSync(APP_PATH, app, 'utf8')
  console.log(`  App.jsx rebuilt with ${dateFiles.length} dates`)
}

function findMissingDates() {
  const existing = new Set(
    fs.readdirSync(DATA_DIR)
      .filter(f => /^\d{4}-\d{2}-\d{2}\.js$/.test(f))
      .map(f => f.replace('.js', ''))
  )
  if (existing.size === 0) return []

  const sorted = [...existing].sort()
  const first = new Date(sorted[0] + 'T00:00:00')
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  yesterday.setHours(0, 0, 0, 0)

  const missing = []
  const cursor = new Date(first)
  while (cursor <= yesterday) {
    const iso = cursor.toISOString().split('T')[0]
    if (!existing.has(iso)) missing.push(iso)
    cursor.setDate(cursor.getDate() + 1)
  }
  return missing
}

async function main() {
  const mode = process.env.MODE || 'single'
  console.log('\n Curio Brief Generator v4 (Claude + quality gate)')
  console.log('='.repeat(50) + '\n')

  let datesToGenerate = []

  if (mode === 'backfill-auto') {
    datesToGenerate = findMissingDates()
    if (datesToGenerate.length === 0) {
      console.log('No missing dates.')
      rebuildAppJsx()
      fs.writeFileSync('/tmp/generated_date.txt', 'no-changes')
      return
    }
    console.log(`Auto-backfill: ${datesToGenerate.length} missing dates`)
  } else if (mode === 'backfill-manual') {
    datesToGenerate = (process.env.DATES || '').split(',').map(d => d.trim()).filter(Boolean)
    if (process.env.FORCE !== 'true') {
      datesToGenerate = datesToGenerate.filter(d => !fs.existsSync(path.join(DATA_DIR, `${d}.js`)))
    }
    console.log(`Manual: ${datesToGenerate.join(', ')}`)
  } else {
    datesToGenerate = [getTargetDate()]
    console.log(`Single: ${datesToGenerate[0]}`)
  }

  const results = { generated: [], failed: [], skipped: [] }

  for (const dateStr of datesToGenerate) {
    const dataPath = path.join(DATA_DIR, `${dateStr}.js`)
    if (fs.existsSync(dataPath) && process.env.FORCE !== 'true') {
      console.log(`Skipping ${dateStr} (exists)`)
      results.skipped.push(dateStr)
      continue
    }

    console.log(`\nGenerating ${dateStr} (${fmtDate(dateStr)})`)

    const newsContext = await fetchRealNews(dateStr, fmtDate(dateStr))
    await new Promise(r => setTimeout(r, 500))

    const brief = await generateAllDomains(dateStr, fmtDate(dateStr), newsContext)

    if (!brief) {
      console.log(`  Failed after 3 attempts`)
      results.failed.push(dateStr)
      continue
    }

    if (!passesQualityGate(brief)) {
      console.log(`  Failed quality gate — not committing`)
      fs.writeFileSync(`/tmp/failed_${dateStr}.json`, JSON.stringify(brief, null, 2))
      results.failed.push(dateStr)
      continue
    }

    const clean = sanitize(brief)
    fs.writeFileSync(dataPath, `export default ${JSON.stringify(clean, null, 2)}\n`, 'utf8')
    console.log(`  Written: src/data/${dateStr}.js`)
    results.generated.push(dateStr)
  }

  if (results.generated.length > 0) rebuildAppJsx()

  console.log('\n' + '='.repeat(50))
  console.log(`Generated: ${results.generated.join(', ') || 'none'}`)
  if (results.failed.length) console.log(`Failed:    ${results.failed.join(', ')}`)
  if (results.skipped.length) console.log(`Skipped:   ${results.skipped.join(', ')}`)

  fs.writeFileSync('/tmp/generated_date.txt', results.generated.join(', ') || 'no-changes')

  if (results.failed.length > 0 && results.generated.length === 0) process.exit(1)
}

main().catch(err => { console.error('Fatal:', err); process.exit(1) })

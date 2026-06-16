// .github/scripts/generate-brief.js
// v3: Uses OpenAI with web_search_preview tool for real news per date

import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// ── Sanitize Unicode that breaks esbuild ────────────────────────────────────
function sanitizeForJS(obj) {
  let str = JSON.stringify(obj)
  str = str
    .replace(/\u20B9/g, 'Rs.')
    .replace(/\u20AC/g, 'EUR')
    .replace(/\u00A3/g, 'GBP')
    .replace(/\u2014/g, ' - ')
    .replace(/\u2013/g, ' - ')
    .replace(/\u2018/g, "'")
    .replace(/\u2019/g, "'")
    .replace(/\u201C/g, '"')
    .replace(/\u201D/g, '"')
    .replace(/\u2026/g, '...')
    .replace(/\u00B0/g, ' degrees')
    .replace(/\u2082/g, '2')
    .replace(/\u23F0/g, '')
    .replace(/\u23F1/g, '')
    .replace(/\u23F3/g, '')
    .replace(/\u23F8/g, '')
    .replace(/\u20E3/g, '')
    .replace(/[\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]/g, c => {
      const map = {'\u00e0':'a','\u00e1':'a','\u00e2':'a','\u00e3':'a','\u00e4':'a','\u00e5':'a',
                   '\u00e8':'e','\u00e9':'e','\u00ea':'e','\u00eb':'e',
                   '\u00ec':'i','\u00ed':'i','\u00ee':'i','\u00ef':'i',
                   '\u00f2':'o','\u00f3':'o','\u00f4':'o','\u00f5':'o','\u00f6':'o',
                   '\u00f9':'u','\u00fa':'u','\u00fb':'u','\u00fc':'u',
                   '\u00fd':'y','\u00f1':'n','\u00e7':'c',
                   '\u00c0':'A','\u00c1':'A','\u00c9':'E','\u00d1':'N','\u00c7':'C'}
      return map[c] || c
    })
  return JSON.parse(str)
}



const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..', '..')
const DATA_DIR = path.join(ROOT, 'src', 'data')
const APP_PATH = path.join(ROOT, 'src', 'App.jsx')

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

function getTargetDate() {
  if (process.env.TARGET_DATE && process.env.TARGET_DATE.trim()) {
    return process.env.TARGET_DATE.trim()
  }
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().split('T')[0]
}

function formatDateLabel(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
    day: '2-digit', month: 'long', year: 'numeric'
  })
}

// ── Step 1: Fetch real news headlines for the date using web search ──────────
async function fetchRealNews(dateStr, dateLabel) {
  console.log(`  Searching real news for ${dateStr}...`)
  try {
    const response = await client.responses.create({
      model: 'gpt-4o-mini',
      tools: [{ type: 'web_search_preview' }],
      input: `Search for the top real world news headlines that happened on ${dateLabel} (${dateStr}). 
      Find actual events from: world politics, global economy, technology, science/environment, Indian stock market (Nifty/Sensex levels, major movers).
      Return a bullet list of 15-20 specific real headlines with brief facts. Be specific — include names, numbers, countries.
      Focus on: geopolitics, US news, India news, Middle East, European news, markets, tech announcements.`
    })
    const text = response.output_text || ''
    console.log(`  ✓ Got ${text.length} chars of news context`)
    return text
  } catch (err) {
    console.error(`  ✗ Web search failed: ${err.message}`)
    // Fallback: use model knowledge
    return `Generate realistic news content for ${dateLabel} based on global events of that period in 2026.`
  }
}

// ── Step 2: Generate structured domain content using real news as context ────
async function generateDomain(domainId, dateLabel, newsContext) {
  console.log(`  → Generating ${domainId}...`)

  const prompts = {
    news: `You are writing a daily news brief for ${dateLabel}.
REAL NEWS CONTEXT (use these actual events — do not make up different ones):
${newsContext}

Using the real events above, create a structured news brief. Pick the most important/interesting stories.
Return ONLY valid JSON, no markdown:
{
  "segments": [
    {"name":"🌐 What's happening with countries?","color":"#a0d4f5","stories":[
      {"headline":"Real headline from the news above","eli5":"Explain this real event simply like telling a curious friend. Use a vivid analogy. 3-4 sentences. Be specific about what actually happened.","whyItMatters":"One sentence why this matters to ordinary people.","mnemonic":"A fun memory trick for this specific story."},
      {"headline":"...","eli5":"...","whyItMatters":"...","mnemonic":"..."},
      {"headline":"...","eli5":"...","whyItMatters":"...","mnemonic":"..."}
    ]},
    {"name":"💸 What's happening with money?","color":"#a8edcb","stories":[
      {"headline":"...","eli5":"...","whyItMatters":"...","mnemonic":"..."},
      {"headline":"...","eli5":"...","whyItMatters":"...","mnemonic":"..."},
      {"headline":"...","eli5":"...","whyItMatters":"...","mnemonic":"..."}
    ]},
    {"name":"💻 What's happening with technology?","color":"#c9b8f5","stories":[
      {"headline":"...","eli5":"...","whyItMatters":"...","mnemonic":"..."},
      {"headline":"...","eli5":"...","whyItMatters":"...","mnemonic":"..."}
    ]},
    {"name":"🌿 What's happening with our planet?","color":"#f5c6a0","stories":[
      {"headline":"...","eli5":"...","whyItMatters":"...","mnemonic":"..."},
      {"headline":"...","eli5":"...","whyItMatters":"...","mnemonic":"..."}
    ]}
  ],
  "quiz":[
    {"q":"Question about one of the real stories above","options":["A","B","C","D"],"answer":0,"funFact":"Interesting real fact about the answer."},
    {"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},
    {"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}
  ]
}`,

    markets: `You are writing a markets brief for ${dateLabel}.
REAL NEWS CONTEXT:
${newsContext}

Using the real market/economic context above, write the markets section.
Return ONLY valid JSON, no markdown:
{
  "globalPulse":{"eli5":"3-4 sentences describing what actually happened in global markets that day using a river/water analogy. Reference real events.","keyThings":["S&P 500: specific level or movement","Brent Crude: specific price","Gold: specific price or movement","Nifty: specific level or movement"]},
  "indianMarket":{"eli5":"2-3 sentences on Indian market that day using bazaar analogy. Reference real sector movements if known.","breakouts":[
    {"name":"NSE:SYMBOL — Company Name","whyExciting":"Why this stock was interesting that week. 2 sentences.","risk":"Key risk. 1 sentence."},
    {"name":"...","whyExciting":"...","risk":"..."},
    {"name":"...","whyExciting":"...","risk":"..."}
  ],"ipoSpot":{"name":"Active IPO name or None this week","verdict":"Apply/Avoid/Watch","eli5":"2 simple sentences."},"lessonOfDay":{"title":"One investing concept","story":"Explain with a relatable analogy. 3-4 sentences.","mnemonic":"Memory trick."}},
  "quiz":[
    {"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},
    {"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},
    {"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}
  ]
}`,

    psychology: `Write a psychology & behaviour brief for ${dateLabel}. Make it timeless but reference real events from this context where relevant:
${newsContext.slice(0, 500)}
Return ONLY valid JSON:
{"mindTrick":{"name":"Name of a real psychological concept","eli5":"4 sentences with everyday example. Make it vivid.","realLife":"Where you'll see this today. 2 sentences.","mnemonic":"Silly memory trick."},"bodyLanguage":{"signal":"Specific body language cue","eli5":"3 sentences. Cartoon-like description.","howToUse":"2 sentences practical application.","mnemonic":"..."},"superpower":{"name":"Influence or persuasion principle","story":"3-4 sentence story showing it in action.","shield":"2 sentences — how to defend against it.","mnemonic":"..."},"quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]}`,

    leadership: `Write a leadership brief for ${dateLabel}. Reference real leaders or events from the news context where relevant:
${newsContext.slice(0, 400)}
Return ONLY valid JSON:
{"leaderMove":{"name":"Leadership principle name","story":"4 sentences campfire story about a real or historical leader.","doThis":"2 sentences exact action today.","mnemonic":"..."},"visionarySecret":{"concept":"Visionary thinking concept","eli5":"3-4 sentences with telescope/binoculars analogy.","exercise":"2 sentences practical exercise.","mnemonic":"..."},"eliteHabit":{"habit":"Habit from Bezos/Buffett/Gates/Musk/etc","whoAndHow":"Name + exactly how they practice it. 2 sentences.","whyItWorks":"2 sentences scientific or strategic reason.","mnemonic":"..."},"sigmaWisdom":{"lesson":"Stoic or independent thinking lesson","story":"3 sentences using metaphor or ancient story.","action":"1 sentence — do this today.","mnemonic":"..."},"quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]}`,

    wealth: `Write a wealth & financial freedom brief for ${dateLabel}.
Return ONLY valid JSON:
{"wealthSecret":{"name":"Wealth concept name","story":"4 sentences with seed/tree/river analogy. Very visual.","action":"2 sentences specific this-week action.","mnemonic":"..."},"moneyMachine":{"type":"Passive income vehicle name","eli5":"3 sentences — magic vending machine analogy.","indiaAngle":"2 sentences India-specific context (SIP/REIT/SGB etc).","mnemonic":"..."},"mindsetFlip":{"oldThinking":"What most people believe about money","newThinking":"What wealthy people believe instead","why":"2-3 sentences why the new way works mathematically.","mnemonic":"..."},"magicNumber":{"number":"A key financial rule/ratio/number (Rule of 72, 4% rule, etc)","eli5":"3 sentences story explaining it.","mnemonic":"..."},"quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]}`,

    communication: `Write a communication & speaking brief for ${dateLabel}.
Return ONLY valid JSON:
{"speakingSkill":{"name":"Speaking technique name","story":"3-4 sentences — famous speaker using this technique.","drill":"2 sentences — exact practice drill.","mnemonic":"..."},"negotiationMove":{"tactic":"Negotiation tactic name","eli5":"3 sentences — school lunch trade analogy.","script":"1-2 sentences exact words to say.","mnemonic":"..."},"officeWin":{"rule":"Professional behavior principle","story":"3 sentences contrasting person A vs person B.","mistake":"1 sentence most common mistake.","mnemonic":"..."},"confidenceHack":{"technique":"Evidence-based confidence technique","science":"2 sentences brain/body science.","doItNow":"2 sentences — use this before a meeting/presentation.","mnemonic":"..."},"quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]}`,

    mind: `Write a mind control & discipline brief for ${dateLabel}.
Return ONLY valid JSON:
{"brainHack":{"name":"Brain technique name","eli5":"3-4 sentences wild horse taming analogy.","protocol":"2-3 sentences exact protocol with timing.","mnemonic":"..."},"disciplineCode":{"principle":"Discipline principle name","story":"3 sentences warrior or athlete story.","todayAction":"2 sentences exactly what to do today.","mnemonic":"..."},"impulseKiller":{"urge":"Specific impulse type (phone/food/anger/lust/procrastination)","eli5":"2 sentences monster-in-head analogy.","interrupt":"2 sentences exact 60-second interrupt technique.","mnemonic":"..."},"bodyUpgrade":{"practice":"Physical practice name","eli5":"2 sentences simple analogy for why it works.","minimumDose":"1 sentence minimum effective dose.","mnemonic":"..."},"quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]}`,

    knowledge: `Write a science, math & history brief for ${dateLabel}.
Return ONLY valid JSON:
{"mathMagic":{"concept":"Specific math/stats/probability concept name","eli5":"4 sentences — toy, food, or game analogy. Make it magical.","realWorldUse":"2 sentences — finance, sports, or engineering application.","mnemonic":"..."},"scienceWow":{"field":"Physics/Chemistry/Biology/Astronomy","concept":"Specific concept name","eli5":"4 sentences with wonder. Explain the mechanism simply.","mindBlow":"1-2 sentences most jaw-dropping fact about this.","mnemonic":"..."},"historyStory":{"event":"Specific historical event or person","story":"4 sentences — exciting narrative, not textbook. Include real names and dates.","lesson":"2 sentences — what to steal from this for today.","mnemonic":"..."},"earthSecret":{"place":"Specific country or region","secret":"3 sentences — something most people don't know. Specific facts.","edge":"2 sentences — why knowing this gives you an advantage in conversations or business.","mnemonic":"..."},"quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]}`,

    ai: `Write an AI & productivity brief for ${dateLabel}. Reference real AI developments from this news context:
${newsContext.slice(0, 500)}
Return ONLY valid JSON:
{"toolSpotlight":{"name":"Real AI tool name","category":"writing/coding/research/automation/creative","eli5":"3-4 sentences magic robot assistant analogy. Specific capabilities.","secretMove":"2-3 sentences non-obvious power use most people miss.","mnemonic":"..."},"workflowWin":{"title":"Workflow name","problem":"2 sentences what boring/hard thing it solves.","steps":["Step 1 (specific)","Step 2","Step 3","Step 4"],"timeSaved":"1 sentence realistic time saving.","mnemonic":"..."},"promptOfDay":{"purpose":"Specific use case","prompt":"The exact ready-to-use prompt with [PLACEHOLDERS IN BRACKETS].","where":"Claude/ChatGPT/Gemini","mnemonic":"..."},"futureWatch":{"trend":"Specific real AI trend happening now","eli5":"3 sentences before/after story showing impact.","yourMove":"2 sentences what to do about it right now.","mnemonic":"..."},"quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]}`,

    travel: `Write a travel intelligence brief for ${dateLabel}.
Return ONLY valid JSON:
{"destination":{"country":"Specific country","region":"Specific region/city","eli5":"4 sentences — postcard description that makes you want to go immediately. Sensory details.","bestTime":"1-2 sentences optimal window and why.","hiddenGem":"2 sentences — what tourists almost never discover.","mnemonic":"..."},"visaTip":{"focus":"Specific country visa process for Indian passport holders","eli5":"3 sentences — simple directions like telling a friend.","goldenTip":"2 sentences — one tactical tip most people miss.","mnemonic":"..."},"culturalCode":{"culture":"Specific country/culture","doThis":"2 sentences — what locals love when visitors do this.","neverDoThis":"2 sentences — what would genuinely embarrass or offend locals.","mnemonic":"..."},"quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]}`
  }

  const SYSTEM = `You are a brilliant content generator. Return ONLY raw valid JSON. No markdown. No backticks. No preamble. No explanation.
Write in simple language — like explaining to a curious, smart friend who loves "aha!" moments.
Short sentences. Vivid analogies. Make it genuinely interesting. No jargon. No generic platitudes.
Be SPECIFIC — use real names, real numbers, real places. Avoid vague generalities.`

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        max_tokens: 2000,
        temperature: 0.7,
        messages: [
          { role: 'system', content: SYSTEM },
          { role: 'user', content: prompts[domainId] }
        ]
      })
      const raw = response.choices[0].message.content.trim()
      const clean = raw.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(clean)
      console.log(`     ✓ ${domainId}`)
      return parsed
    } catch (err) {
      console.error(`     ✗ ${domainId} attempt ${attempt}: ${err.message}`)
      if (attempt < 3) await new Promise(r => setTimeout(r, 2000))
    }
  }
  return null
}

// ── Rebuild App.jsx from ALL data files ──────────────────────────────────────
function rebuildAppJsx() {
  console.log('\nRebuilding App.jsx...')
  if (!fs.existsSync(DATA_DIR)) return

  const dateFiles = fs.readdirSync(DATA_DIR)
    .filter(f => f.match(/^\d{4}-\d{2}-\d{2}\.js$/))
    .sort()

  if (dateFiles.length === 0) { console.log('  No data files found'); return }
  console.log(`  Found ${dateFiles.length} date files: ${dateFiles.map(f=>f.replace('.js','')).join(', ')}`)

  let appContent = fs.readFileSync(APP_PATH, 'utf8')
  const START = '// == DATA START =='
  const END = '// == DATA END =='

  const dataLines = [START, '']
  const varNames = []

  for (const file of dateFiles) {
    const dateStr = file.replace('.js', '')
    const varName = 'd' + dateStr.slice(2).replace(/-/g, '')
    varNames.push({ dateStr, varName })

    let fileContent = fs.readFileSync(path.join(DATA_DIR, file), 'utf8')
    fileContent = fileContent.replace(/^export default\s*/, `const ${varName} = `).trimEnd()
    dataLines.push(fileContent, '')
  }

  dataLines.push('const ALL_BRIEFS = {')
  for (const { dateStr, varName } of varNames) {
    dataLines.push(`  '${dateStr}': ${varName},`)
  }
  dataLines.push('}', '', END)

  const newBlock = dataLines.join('\n')

  if (appContent.includes(START) && appContent.includes(END)) {
    const before = appContent.indexOf(START)
    const after = appContent.indexOf(END) + END.length
    appContent = appContent.slice(0, before) + newBlock + appContent.slice(after)
  } else {
    appContent = appContent.replace('const AVAILABLE_DATES', newBlock + '\n\nconst AVAILABLE_DATES')
  }

  fs.writeFileSync(APP_PATH, appContent, 'utf8')
  console.log(`  ✓ App.jsx updated with ${varNames.length} dates`)
}

// ── Find missing dates ────────────────────────────────────────────────────────
function findMissingDates() {
  if (!fs.existsSync(DATA_DIR)) return []

  const existing = new Set(
    fs.readdirSync(DATA_DIR)
      .filter(f => f.match(/^\d{4}-\d{2}-\d{2}\.js$/))
      .map(f => f.replace('.js', ''))
  )

  if (existing.size === 0) return []

  const sortedExisting = [...existing].sort()
  const firstDate = new Date(sortedExisting[0] + 'T00:00:00')
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  yesterday.setHours(0, 0, 0, 0)

  const missing = []
  const cursor = new Date(firstDate)
  while (cursor <= yesterday) {
    const iso = cursor.toISOString().split('T')[0]
    if (!existing.has(iso)) missing.push(iso)
    cursor.setDate(cursor.getDate() + 1)
  }
  return missing
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const mode = process.env.MODE || 'single'
  console.log('\n🌌 Curio Brief Generator v3 (with real news)\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  let datesToGenerate = []

  if (mode === 'backfill-auto') {
    datesToGenerate = findMissingDates()
    if (datesToGenerate.length === 0) {
      console.log('✅ No missing dates. All caught up!')
      rebuildAppJsx()
      fs.writeFileSync('/tmp/generated_date.txt', 'no-changes')
      return
    }
    console.log(`📋 Auto-backfill: ${datesToGenerate.length} missing dates\n`)
  } else if (mode === 'backfill-manual') {
    datesToGenerate = (process.env.DATES || '').split(',').map(d => d.trim()).filter(Boolean)
    console.log(`📋 Manual backfill: ${datesToGenerate.join(', ')}\n`)
  } else {
    datesToGenerate = [getTargetDate()]
    console.log(`📅 Single date: ${datesToGenerate[0]}\n`)
  }

  const domains = ['news', 'markets', 'psychology', 'leadership', 'wealth', 'communication', 'mind', 'knowledge', 'ai', 'travel']

  for (const dateStr of datesToGenerate) {
    const dataPath = path.join(DATA_DIR, `${dateStr}.js`)
    if (fs.existsSync(dataPath)) {
      console.log(`⏭  ${dateStr} already exists, skipping.`)
      continue
    }

    const dateLabel = formatDateLabel(dateStr)
    console.log(`\n⚡ Generating ${dateStr} (${dateLabel})`)

    // Fetch real news first
    const newsContext = await fetchRealNews(dateStr, dateLabel)
    await new Promise(r => setTimeout(r, 500))

    const brief = {}
    for (const domainId of domains) {
      const result = await generateDomain(domainId, dateLabel, newsContext)
      brief[domainId] = result || { error: true }
      await new Promise(r => setTimeout(r, 300))
    }

    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
    fs.writeFileSync(dataPath, `export default ${JSON.stringify(sanitizeForJS(brief), null, 2)}\n`, 'utf8')
    console.log(`  ✓ Written: src/data/${dateStr}.js`)
  }

  rebuildAppJsx()
  fs.writeFileSync('/tmp/generated_date.txt', datesToGenerate.join(', '))
  console.log('\n✅ Done!\n')
}

main().catch(err => { console.error('Fatal:', err); process.exit(1) })

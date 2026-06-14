// .github/scripts/generate-brief.js
// Robust version: generates brief + rewrites App.jsx from all data files found on disk

import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..', '..')
const DATA_DIR = path.join(ROOT, 'src', 'data')
const APP_PATH = path.join(ROOT, 'src', 'App.jsx')

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// ── Determine target date ────────────────────────────────────────────────────
function getTargetDate() {
  if (process.env.TARGET_DATE && process.env.TARGET_DATE.trim()) {
    return process.env.TARGET_DATE.trim()
  }
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().split('T')[0]
}

// ── Prompts ──────────────────────────────────────────────────────────────────
function buildPrompts(dateLabel) {
  const SYSTEM = `You are a content generator for a daily intelligence brief app.
Return ONLY raw valid JSON. No markdown. No backticks. No preamble.
Explain everything simply — like telling a curious smart person who loves stories.
Short sentences. Analogies. Fun. No jargon. Date context: ${dateLabel}.`

  return {
    SYSTEM,
    news: `Generate global news for ${dateLabel}. JSON:
{"segments":[
  {"name":"🌐 What's happening with countries?","color":"#a0d4f5","stories":[
    {"headline":"...","eli5":"4 sentences simple analogy.","whyItMatters":"1 sentence.","mnemonic":"silly memory trick"},
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
  {"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},
  {"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},
  {"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}
]}`,

    markets: `Generate markets brief for ${dateLabel}. JSON:
{"globalPulse":{"eli5":"3-4 sentences river analogy for global markets.","keyThings":["S&P500: ...","Brent: ...","Gold: ...","Nifty: ..."]},"indianMarket":{"eli5":"3 sentences bazaar analogy.","breakouts":[{"name":"NSE:SYMBOL — Name","whyExciting":"2 sentences.","risk":"1 sentence."},{"name":"...","whyExciting":"...","risk":"..."},{"name":"...","whyExciting":"...","risk":"..."}],"ipoSpot":{"name":"IPO or None","verdict":"Apply/Avoid/Watch","eli5":"2 sentences."},"lessonOfDay":{"title":"...","story":"3-4 sentences analogy.","mnemonic":"..."}},"quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]}`,

    psychology: `Generate psychology brief for ${dateLabel}. JSON:
{"mindTrick":{"name":"...","eli5":"4 sentences everyday example.","realLife":"2 sentences.","mnemonic":"..."},"bodyLanguage":{"signal":"...","eli5":"3 sentences.","howToUse":"2 sentences.","mnemonic":"..."},"superpower":{"name":"...","story":"3-4 sentences tiny story.","shield":"2 sentences.","mnemonic":"..."},"quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]}`,

    leadership: `Generate leadership brief for ${dateLabel}. JSON:
{"leaderMove":{"name":"...","story":"4 sentences campfire story.","doThis":"2 sentences.","mnemonic":"..."},"visionarySecret":{"concept":"...","eli5":"3-4 sentences.","exercise":"2 sentences.","mnemonic":"..."},"eliteHabit":{"habit":"...","whoAndHow":"2 sentences.","whyItWorks":"2 sentences.","mnemonic":"..."},"sigmaWisdom":{"lesson":"...","story":"3 sentences stoic metaphor.","action":"1 sentence.","mnemonic":"..."},"quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]}`,

    wealth: `Generate wealth brief for ${dateLabel}. JSON:
{"wealthSecret":{"name":"...","story":"4 sentences seed/tree analogy.","action":"2 sentences.","mnemonic":"..."},"moneyMachine":{"type":"...","eli5":"3 sentences vending machine analogy.","indiaAngle":"2 sentences India-specific.","mnemonic":"..."},"mindsetFlip":{"oldThinking":"...","newThinking":"...","why":"2-3 sentences.","mnemonic":"..."},"magicNumber":{"number":"Rule name","eli5":"3 sentences story.","mnemonic":"..."},"quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]}`,

    communication: `Generate communication brief for ${dateLabel}. JSON:
{"speakingSkill":{"name":"...","story":"3-4 sentences famous speaker story.","drill":"2 sentences.","mnemonic":"..."},"negotiationMove":{"tactic":"...","eli5":"3 sentences analogy.","script":"1-2 sentences exact words.","mnemonic":"..."},"officeWin":{"rule":"...","story":"3 sentences contrast.","mistake":"1 sentence.","mnemonic":"..."},"confidenceHack":{"technique":"...","science":"2 sentences.","doItNow":"2 sentences.","mnemonic":"..."},"quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]}`,

    mind: `Generate mind & discipline brief for ${dateLabel}. JSON:
{"brainHack":{"name":"...","eli5":"3-4 sentences wild horse analogy.","protocol":"2-3 sentences exact steps.","mnemonic":"..."},"disciplineCode":{"principle":"...","story":"3 sentences warrior story.","todayAction":"2 sentences.","mnemonic":"..."},"impulseKiller":{"urge":"type of impulse","eli5":"2 sentences monster analogy.","interrupt":"2 sentences exact technique.","mnemonic":"..."},"bodyUpgrade":{"practice":"...","eli5":"2 sentences analogy.","minimumDose":"1 sentence.","mnemonic":"..."},"quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]}`,

    knowledge: `Generate knowledge brief for ${dateLabel}. JSON:
{"mathMagic":{"concept":"Math concept name","eli5":"4 sentences toy/food analogy.","realWorldUse":"2 sentences.","mnemonic":"..."},"scienceWow":{"field":"Physics/Chemistry/Biology/Astronomy","concept":"...","eli5":"4 sentences with awe.","mindBlow":"1-2 sentences.","mnemonic":"..."},"historyStory":{"event":"...","story":"4 sentences exciting narrative.","lesson":"2 sentences.","mnemonic":"..."},"earthSecret":{"place":"Country or region","secret":"3 sentences amazing fact.","edge":"2 sentences why it helps you.","mnemonic":"..."},"quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]}`,

    ai: `Generate AI & productivity brief for ${dateLabel}. JSON:
{"toolSpotlight":{"name":"...","category":"writing/coding/research/automation","eli5":"3-4 sentences magic robot analogy.","secretMove":"2-3 sentences power use.","mnemonic":"..."},"workflowWin":{"title":"...","problem":"2 sentences what it solves.","steps":["Step 1","Step 2","Step 3","Step 4"],"timeSaved":"1 sentence.","mnemonic":"..."},"promptOfDay":{"purpose":"What this does","prompt":"Exact ready-to-use prompt with [PLACEHOLDERS].","where":"Claude/ChatGPT/Gemini","mnemonic":"..."},"futureWatch":{"trend":"...","eli5":"3 sentences before/after story.","yourMove":"2 sentences.","mnemonic":"..."},"quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]}`,

    travel: `Generate travel brief for ${dateLabel}. JSON:
{"destination":{"country":"...","region":"...","eli5":"4 sentences postcard description.","bestTime":"1-2 sentences.","hiddenGem":"2 sentences secret.","mnemonic":"..."},"visaTip":{"focus":"Country visa for Indian passport","eli5":"3 sentences simple directions.","goldenTip":"2 sentences tactical tip.","mnemonic":"..."},"culturalCode":{"culture":"...","doThis":"2 sentences locals love.","neverDoThis":"2 sentences would offend.","mnemonic":"..."},"quiz":[{"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},{"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}]}`
  }
}

// ── Generate one domain ───────────────────────────────────────────────────────
async function generateDomain(domainId, prompt, systemPrompt) {
  console.log(`  → ${domainId}...`)
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        max_tokens: 2000,
        temperature: 0.7,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
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

// ── Rebuild App.jsx from ALL data files on disk ──────────────────────────────
// This is the robust approach: instead of patching App.jsx,
// we read the template markers and rebuild the data section completely.
function rebuildAppJsx() {
  console.log('\nRebuilding App.jsx from all data files...')

  // Find all date files
  if (!fs.existsSync(DATA_DIR)) {
    console.error('No data directory found!')
    return
  }

  const dateFiles = fs.readdirSync(DATA_DIR)
    .filter(f => f.match(/^\d{4}-\d{2}-\d{2}\.js$/))
    .sort()

  console.log(`  Found ${dateFiles.length} date files: ${dateFiles.map(f => f.replace('.js','')).join(', ')}`)

  if (dateFiles.length === 0) {
    console.error('No data files found!')
    return
  }

  // Read current App.jsx
  let appContent = fs.readFileSync(APP_PATH, 'utf8')

  // Find the marker that separates the "before data" section from everything else
  const START_MARKER = '// ══ DATA START ══'
  const END_MARKER = '// ══ DATA END ══'

  // Build the new data block
  const dataLines = []
  dataLines.push(START_MARKER)
  dataLines.push('')

  const varNames = []
  for (const file of dateFiles) {
    const dateStr = file.replace('.js', '')
    const varName = 'd' + dateStr.slice(2).replace(/-/g, '')  // 2026-06-15 → d260615
    varNames.push({ dateStr, varName })

    const fileContent = fs.readFileSync(path.join(DATA_DIR, file), 'utf8')
    const inlined = fileContent
      .replace(/^export default\s*/, `const ${varName} = `)
      .trimEnd()

    dataLines.push(inlined)
    dataLines.push('')
  }

  // Build ALL_BRIEFS
  dataLines.push('const ALL_BRIEFS = {')
  for (const { dateStr, varName } of varNames) {
    dataLines.push(`  '${dateStr}': ${varName},`)
  }
  dataLines.push('}')
  dataLines.push('')
  dataLines.push(END_MARKER)

  const newDataBlock = dataLines.join('\n')

  // Replace the data block in App.jsx
  if (appContent.includes(START_MARKER) && appContent.includes(END_MARKER)) {
    // Replace between markers
    const beforeMarker = appContent.indexOf(START_MARKER)
    const afterMarker = appContent.indexOf(END_MARKER) + END_MARKER.length
    appContent = appContent.slice(0, beforeMarker) + newDataBlock + appContent.slice(afterMarker)
    console.log('  ✓ Replaced existing data block')
  } else {
    // First time: insert before AVAILABLE_DATES
    const insertBefore = 'const AVAILABLE_DATES'
    if (!appContent.includes(insertBefore)) {
      console.error('Cannot find insertion point in App.jsx!')
      return
    }
    appContent = appContent.replace(insertBefore, newDataBlock + '\n\n' + insertBefore)
    console.log('  ✓ Inserted new data block')
  }

  fs.writeFileSync(APP_PATH, appContent, 'utf8')
  console.log(`  ✓ App.jsx updated with ${varNames.length} dates`)
}

// ── Find all missing dates from first available date to yesterday ─────────────
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
    if (!existing.has(iso)) {
      missing.push(iso)
    }
    cursor.setDate(cursor.getDate() + 1)
  }

  return missing
}

// ── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  const mode = process.env.MODE || 'single'

  console.log('\n🌌 Curio Brief Generator')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  let datesToGenerate = []

  if (mode === 'backfill-auto') {
    // Auto-detect all missing dates
    datesToGenerate = findMissingDates()
    if (datesToGenerate.length === 0) {
      console.log('✅ No missing dates found. All caught up!')
      rebuildAppJsx()
      return
    }
    console.log(`📋 Auto-backfill mode: ${datesToGenerate.length} missing dates`)
    console.log(`   Dates: ${datesToGenerate.join(', ')}\n`)
  } else if (mode === 'backfill-manual') {
    // Manually specified dates via env
    datesToGenerate = (process.env.DATES || '').split(',').map(d => d.trim()).filter(Boolean)
    console.log(`📋 Manual backfill: ${datesToGenerate.join(', ')}\n`)
  } else {
    // Single date (default: T-1)
    const date = getTargetDate()
    datesToGenerate = [date]
    console.log(`📅 Single date: ${date}\n`)
  }

  // Generate each date
  for (const dateStr of datesToGenerate) {
    const dateLabel = new Date(dateStr + 'T00:00:00').toLocaleDateString('en-GB', {
      day: '2-digit', month: 'long', year: 'numeric'
    })

    const dataPath = path.join(DATA_DIR, `${dateStr}.js`)

    if (fs.existsSync(dataPath)) {
      console.log(`⏭  ${dateStr} already exists, skipping.`)
      continue
    }

    console.log(`\n⚡ Generating ${dateStr} (${dateLabel})`)

    const prompts = buildPrompts(dateLabel)
    const brief = {}
    const domains = ['news', 'markets', 'psychology', 'leadership', 'wealth', 'communication', 'mind', 'knowledge', 'ai', 'travel']

    for (const domainId of domains) {
      const result = await generateDomain(domainId, prompts[domainId], prompts.SYSTEM)
      brief[domainId] = result || { error: true }
      await new Promise(r => setTimeout(r, 300))
    }

    // Write data file
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
    fs.writeFileSync(dataPath, `export default ${JSON.stringify(brief, null, 2)}\n`, 'utf8')
    console.log(`  ✓ Written: src/data/${dateStr}.js`)
  }

  // Always rebuild App.jsx from ALL files on disk
  rebuildAppJsx()

  // Write generated date for commit message
  fs.writeFileSync('/tmp/generated_date.txt', datesToGenerate.join(', '))

  console.log('\n✅ Complete! Vercel will deploy in ~60 seconds.\n')
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})

// .github/scripts/generate-brief.js
// Runs in GitHub Actions. Generates one day's brief and injects it into App.jsx.

import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// ── Determine target date ────────────────────────────────────────────────────
function getTargetDate() {
  if (process.env.TARGET_DATE && process.env.TARGET_DATE.trim()) {
    return process.env.TARGET_DATE.trim()
  }
  const d = new Date()
  d.setDate(d.getDate() - 1) // T-1 = yesterday
  return d.toISOString().split('T')[0]
}

const TARGET_DATE = getTargetDate()
const DATE_LABEL = new Date(TARGET_DATE + 'T00:00:00').toLocaleDateString('en-GB', {
  day: '2-digit', month: 'long', year: 'numeric'
})

console.log(`Generating brief for: ${TARGET_DATE} (${DATE_LABEL})`)

// ── Prompts ──────────────────────────────────────────────────────────────────
const SYSTEM = `You are a brilliant content generator for a daily intelligence brief app.
Return ONLY raw valid JSON. No markdown. No backticks. No explanation. No preamble.
Explain everything simply — like telling a curious, smart person who loves stories and "aha!" moments.
Use short sentences. Use analogies. Make it engaging. No jargon. No corporate speak.
All content should be relevant to the date context provided.`

const DOMAINS = {
  news: `Generate a news brief for ${DATE_LABEL}. Return JSON:
{
  "segments": [
    {
      "name": "🌐 What's happening with countries?",
      "color": "#a0d4f5",
      "stories": [
        {"headline":"...","eli5":"Explain simply with analogy, 4 sentences.","whyItMatters":"One sentence.","mnemonic":"Silly memory trick."},
        {"headline":"...","eli5":"...","whyItMatters":"...","mnemonic":"..."},
        {"headline":"...","eli5":"...","whyItMatters":"...","mnemonic":"..."}
      ]
    },
    {
      "name": "💸 What's happening with money?",
      "color": "#a8edcb",
      "stories": [
        {"headline":"...","eli5":"...","whyItMatters":"...","mnemonic":"..."},
        {"headline":"...","eli5":"...","whyItMatters":"...","mnemonic":"..."},
        {"headline":"...","eli5":"...","whyItMatters":"...","mnemonic":"..."}
      ]
    },
    {
      "name": "💻 What's happening with technology?",
      "color": "#c9b8f5",
      "stories": [
        {"headline":"...","eli5":"...","whyItMatters":"...","mnemonic":"..."},
        {"headline":"...","eli5":"...","whyItMatters":"...","mnemonic":"..."}
      ]
    },
    {
      "name": "🌿 What's happening with our planet?",
      "color": "#f5c6a0",
      "stories": [
        {"headline":"...","eli5":"...","whyItMatters":"...","mnemonic":"..."},
        {"headline":"...","eli5":"...","whyItMatters":"...","mnemonic":"..."}
      ]
    }
  ],
  "quiz": [
    {"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},
    {"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},
    {"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}
  ]
}`,

  markets: `Generate a markets brief for ${DATE_LABEL}. Return JSON:
{
  "globalPulse": {
    "eli5": "3-4 sentences using water/river analogy for global markets that day.",
    "keyThings": ["S&P500: context","Brent crude: context","Gold: context","Nifty: context"]
  },
  "indianMarket": {
    "eli5": "3 sentences on Indian market using bazaar analogy.",
    "breakouts": [
      {"name":"NSE:SYMBOL — Company name","whyExciting":"2 sentences simple explanation.","risk":"1 sentence key risk."},
      {"name":"...","whyExciting":"...","risk":"..."},
      {"name":"...","whyExciting":"...","risk":"..."}
    ],
    "ipoSpot": {"name":"IPO name or None active","verdict":"Apply / Avoid / Watch","eli5":"2 simple sentences."},
    "lessonOfDay": {"title":"One investing lesson","story":"3-4 sentences with analogy.","mnemonic":"Memory trick."}
  },
  "quiz": [
    {"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},
    {"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},
    {"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}
  ]
}`,

  psychology: `Generate a psychology brief for ${DATE_LABEL}. Return JSON:
{
  "mindTrick": {"name":"...","eli5":"4 sentences using everyday example.","realLife":"2 sentences.","mnemonic":"..."},
  "bodyLanguage": {"signal":"...","eli5":"3 sentences.","howToUse":"2 sentences.","mnemonic":"..."},
  "superpower": {"name":"...","story":"3-4 sentences with a tiny story.","shield":"2 sentences.","mnemonic":"..."},
  "quiz": [
    {"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},
    {"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},
    {"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}
  ]
}`,

  leadership: `Generate a leadership brief for ${DATE_LABEL}. Return JSON:
{
  "leaderMove": {"name":"...","story":"4 sentences campfire story about a famous leader.","doThis":"2 sentences.","mnemonic":"..."},
  "visionarySecret": {"concept":"...","eli5":"3-4 sentences with telescope analogy.","exercise":"2 sentences.","mnemonic":"..."},
  "eliteHabit": {"habit":"...","whoAndHow":"2 sentences name + how they do it.","whyItWorks":"2 sentences.","mnemonic":"..."},
  "sigmaWisdom": {"lesson":"...","story":"3 sentences stoic metaphor.","action":"1 sentence.","mnemonic":"..."},
  "quiz": [
    {"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},
    {"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},
    {"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}
  ]
}`,

  wealth: `Generate a wealth brief for ${DATE_LABEL}. Return JSON:
{
  "wealthSecret": {"name":"...","story":"4 sentences with seed/tree analogy.","action":"2 sentences.","mnemonic":"..."},
  "moneyMachine": {"type":"...","eli5":"3 sentences passive income as magic vending machine.","indiaAngle":"2 sentences India-specific.","mnemonic":"..."},
  "mindsetFlip": {"oldThinking":"...","newThinking":"...","why":"2-3 sentences.","mnemonic":"..."},
  "magicNumber": {"number":"Rule or stat name","eli5":"3 sentences story.","mnemonic":"..."},
  "quiz": [
    {"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},
    {"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},
    {"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}
  ]
}`,

  communication: `Generate a communication brief for ${DATE_LABEL}. Return JSON:
{
  "speakingSkill": {"name":"...","story":"3-4 sentences with famous speaker story.","drill":"2 sentences.","mnemonic":"..."},
  "negotiationMove": {"tactic":"...","eli5":"3 sentences school lunch trade analogy.","script":"1-2 sentences exact words.","mnemonic":"..."},
  "officeWin": {"rule":"...","story":"3 sentences contrast story.","mistake":"1 sentence.","mnemonic":"..."},
  "confidenceHack": {"technique":"...","science":"2 sentences brain/body analogy.","doItNow":"2 sentences.","mnemonic":"..."},
  "quiz": [
    {"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},
    {"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},
    {"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}
  ]
}`,

  mind: `Generate a mind & discipline brief for ${DATE_LABEL}. Return JSON:
{
  "brainHack": {"name":"...","eli5":"3-4 sentences wild horse taming analogy.","protocol":"2-3 sentences exact steps.","mnemonic":"..."},
  "disciplineCode": {"principle":"...","story":"3 sentences athlete or warrior story.","todayAction":"2 sentences.","mnemonic":"..."},
  "impulseKiller": {"urge":"type of impulse","eli5":"2 sentences monster-in-head analogy.","interrupt":"2 sentences exact technique.","mnemonic":"..."},
  "bodyUpgrade": {"practice":"...","eli5":"2 sentences simple analogy.","minimumDose":"1 sentence time and method.","mnemonic":"..."},
  "quiz": [
    {"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},
    {"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},
    {"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}
  ]
}`,

  knowledge: `Generate a knowledge brief for ${DATE_LABEL}. Return JSON:
{
  "mathMagic": {"concept":"Calculus/Stats/Probability concept name","eli5":"4 sentences toy or food analogy.","realWorldUse":"2 sentences finance or sports.","mnemonic":"..."},
  "scienceWow": {"field":"Physics/Chemistry/Biology/Astronomy","concept":"...","eli5":"4 sentences with wonder and awe.","mindBlow":"1-2 sentences mind-blowing fact.","mnemonic":"..."},
  "historyStory": {"event":"...","story":"4 sentences exciting not textbook.","lesson":"2 sentences steal from history.","mnemonic":"..."},
  "earthSecret": {"place":"Country or region","secret":"3 sentences amazing fact.","edge":"2 sentences why knowing this helps.","mnemonic":"..."},
  "quiz": [
    {"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},
    {"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},
    {"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}
  ]
}`,

  ai: `Generate an AI & productivity brief for ${DATE_LABEL}. Return JSON:
{
  "toolSpotlight": {"name":"...","category":"writing/coding/research/automation/creative","eli5":"3-4 sentences magic robot assistant analogy.","secretMove":"2-3 sentences non-obvious power use.","mnemonic":"..."},
  "workflowWin": {"title":"...","problem":"2 sentences what boring thing it solves.","steps":["Step 1","Step 2","Step 3","Step 4"],"timeSaved":"1 sentence.","mnemonic":"..."},
  "promptOfDay": {"purpose":"What this prompt does","prompt":"The exact ready-to-use prompt with [PLACEHOLDERS].","where":"Claude / ChatGPT / Gemini","mnemonic":"..."},
  "futureWatch": {"trend":"...","eli5":"3 sentences before/after story.","yourMove":"2 sentences what to do now.","mnemonic":"..."},
  "quiz": [
    {"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},
    {"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},
    {"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}
  ]
}`,

  travel: `Generate a travel brief for ${DATE_LABEL}. Return JSON:
{
  "destination": {"country":"...","region":"...","eli5":"4 sentences postcard description.","bestTime":"1-2 sentences.","hiddenGem":"2 sentences secret most tourists miss.","mnemonic":"..."},
  "visaTip": {"focus":"Country or visa type for Indian passport holders","eli5":"3 sentences simple directions.","goldenTip":"2 sentences tactical tip.","mnemonic":"..."},
  "culturalCode": {"culture":"...","doThis":"2 sentences locals love.","neverDoThis":"2 sentences would offend.","mnemonic":"..."},
  "quiz": [
    {"q":"...","options":["A","B","C","D"],"answer":0,"funFact":"..."},
    {"q":"...","options":["A","B","C","D"],"answer":1,"funFact":"..."},
    {"q":"...","options":["A","B","C","D"],"answer":2,"funFact":"..."}
  ]
}`
}

// ── Generate one domain ───────────────────────────────────────────────────────
async function generateDomain(domainId, prompt) {
  console.log(`  Generating ${domainId}...`)
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 2000,
      temperature: 0.7,
      messages: [
        { role: 'system', content: SYSTEM },
        { role: 'user', content: prompt }
      ]
    })
    const raw = response.choices[0].message.content.trim()
    const clean = raw.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch (err) {
    console.error(`  ERROR generating ${domainId}:`, err.message)
    return null
  }
}

// ── Generate all domains ──────────────────────────────────────────────────────
async function generateAllDomains() {
  const brief = {}
  for (const [domainId, prompt] of Object.entries(DOMAINS)) {
    const result = await generateDomain(domainId, prompt)
    if (result) {
      brief[domainId] = result
    } else {
      // Use a minimal fallback so the file is still valid
      brief[domainId] = { error: true }
    }
    // Small delay to avoid rate limits
    await new Promise(r => setTimeout(r, 500))
  }
  return brief
}

// ── Write data file ────────────────────────────────────────────────────────────
function writeDateFile(dateStr, brief) {
  const dir = path.join(process.cwd(), 'src', 'data')
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  const filePath = path.join(dir, `${dateStr}.js`)
  const content = `export default ${JSON.stringify(brief, null, 2)}\n`
  fs.writeFileSync(filePath, content, 'utf8')
  console.log(`  Written: src/data/${dateStr}.js`)
}

// ── Update App.jsx ─────────────────────────────────────────────────────────────
function updateAppJsx(dateStr) {
  const appPath = path.join(process.cwd(), 'src', 'App.jsx')
  let content = fs.readFileSync(appPath, 'utf8')

  // Derive variable name: 2026-06-15 → d0615
  const varName = 'd' + dateStr.slice(5).replace('-', '')

  // Check if already imported
  if (content.includes(`'./data/${dateStr}.js'`)) {
    console.log(`  App.jsx already has ${dateStr}, skipping.`)
    return
  }

  // Find the last import line for data files and add after it
  // Pattern: const dXXXX = ... (we inline data, not import)
  // Since our App.jsx inlines data, we need to:
  // 1. Add the new data as a const before ALL_BRIEFS
  // 2. Add the date to ALL_BRIEFS

  // Read the new data file and inline it
  const dataPath = path.join(process.cwd(), 'src', 'data', `${dateStr}.js`)
  const dataContent = fs.readFileSync(dataPath, 'utf8')
    .replace('export default ', `const ${varName} = `)
    .trimEnd()

  // Insert before the ALL_BRIEFS line
  const allBriefsMarker = 'const ALL_BRIEFS = {'
  if (!content.includes(allBriefsMarker)) {
    console.error('  ERROR: Could not find ALL_BRIEFS in App.jsx')
    return
  }

  // Add data const before ALL_BRIEFS
  content = content.replace(
    allBriefsMarker,
    `${dataContent}\n\n${allBriefsMarker}`
  )

  // Add to ALL_BRIEFS object — find the closing } of ALL_BRIEFS
  // Pattern: '2026-06-XX': dXXXX, (find last one and add after)
  const allBriefsEnd = content.indexOf('\n}', content.indexOf(allBriefsMarker))
  const insertPos = allBriefsEnd
  content = content.slice(0, insertPos) +
    `\n  '${dateStr}': ${varName},` +
    content.slice(insertPos)

  fs.writeFileSync(appPath, content, 'utf8')
  console.log(`  Updated App.jsx with ${dateStr}`)
}

// ── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🌌 Curio Brief Generator`)
  console.log(`📅 Target date: ${TARGET_DATE} (${DATE_LABEL})`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`)

  // Check if already exists
  const dataPath = path.join(process.cwd(), 'src', 'data', `${TARGET_DATE}.js`)
  if (fs.existsSync(dataPath)) {
    console.log(`Brief for ${TARGET_DATE} already exists. Skipping.`)
    fs.writeFileSync('/tmp/generated_date.txt', TARGET_DATE)
    process.exit(0)
  }

  // Generate
  console.log('Generating all 10 domains...\n')
  const brief = await generateAllDomains()

  // Write data file
  console.log('\nWriting files...')
  writeDateFile(TARGET_DATE, brief)

  // Update App.jsx
  updateAppJsx(TARGET_DATE)

  // Write date for commit message
  fs.writeFileSync('/tmp/generated_date.txt', TARGET_DATE)

  console.log(`\n✅ Done! Brief for ${TARGET_DATE} is ready.`)
  console.log('Vercel will auto-deploy in ~60 seconds after git push.\n')
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})

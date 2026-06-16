import { useState, useEffect } from 'react'

const C = {
  bg: '#0d0d14', surface: '#13131e', card: '#1a1a2e', border: '#252538',
  mint: '#a8edcb', lavender: '#c9b8f5', peach: '#f5c6a0', sky: '#a0d4f5',
  rose: '#f5a0b5', lemon: '#f5eda0', text: '#eeeef5', muted: '#7878a0', dim: '#2a2a40',
}

const DOMAINS = [
  { id: 'news',          emoji: '🌍', label: 'World Stories',      color: '#a0d4f5', desc: "What's happening on Earth?" },
  { id: 'markets',       emoji: '💰', label: 'Money & Stocks',     color: '#a8edcb', desc: 'How does money move?' },
  { id: 'psychology',    emoji: '🧠', label: 'How Minds Work',     color: '#c9b8f5', desc: 'Why people do what they do' },
  { id: 'leadership',    emoji: '👑', label: 'Be a Leader',        color: '#f5eda0', desc: 'Think like the greats' },
  { id: 'wealth',        emoji: '🏆', label: 'Get Rich Smart',     color: '#f5c6a0', desc: 'Build freedom, not just cash' },
  { id: 'communication', emoji: '🎤', label: 'Talk & Win',         color: '#f5a0b5', desc: 'Words that open doors' },
  { id: 'mind',          emoji: '⚡', label: 'Control Yourself',   color: '#a8edcb', desc: 'Master your own brain' },
  { id: 'knowledge',     emoji: '🔭', label: 'Science & History',  color: '#a0d4f5', desc: 'The universe explained simply' },
  { id: 'ai',            emoji: '🤖', label: 'AI Superpowers',     color: '#c9b8f5', desc: 'Work smarter with AI' },
  { id: 'travel',        emoji: '✈️', label: 'Explore Earth',      color: '#f5c6a0', desc: 'Secrets of our planet' },
]

// == DATA START ==

const d260601 = {
  news: {
    segments: [
      {
        name: "🌐 What's happening with countries?", color: "#a0d4f5",
        stories: [
          { headline: "Trump says the US 'shouldn't have been in Iran' — but strikes continue", eli5: "It was a confusing Sunday in America. President Trump went on Fox News and said he felt the US 'shouldn't have been in Iran' — suggesting doubt about the war he started. But at the same time, US military planes were still flying missions over Iran. It's like a driver saying 'I'm not sure I should have taken this road' while still stepping on the accelerator. The world watched, confused.", whyItMatters: "When a president contradicts his own military actions, it signals internal disagreement — and markets and allies get nervous about what comes next.", mnemonic: "Trump on Iran: Foot on gas, hand on doubt 🚗❓" },
          { headline: "Israeli troops capture ancient Beaufort Castle in Lebanon", eli5: "Israeli soldiers pushed deeper into southern Lebanon and captured Beaufort Castle — a medieval fortress built by Crusaders 900 years ago that has changed hands between armies for centuries. It's a powerful symbol: whoever holds the castle controls the hills above. Lebanon's south has seen fighting on and off for decades. This capture signals Israel's military campaign is expanding far beyond what many expected.", whyItMatters: "A 900-year-old castle becoming a modern military objective shows how deep this conflict has become — and how far from resolution.", mnemonic: "Beaufort Castle: 900 years of war, still at war 🏰⚔️" },
          { headline: "June 1 marks 100 years since Marilyn Monroe was born", eli5: "June 1, 2026 marks exactly 100 years since Marilyn Monroe was born in Los Angeles in 1926. She became one of the most famous people who ever lived — an actress, singer, and cultural icon whose face still appears on T-shirts and posters around the world today. Her life was also filled with sadness and she died at 36. Exhibitions, films, and events around the world are celebrating the centenary.", whyItMatters: "Monroe's story shows how a person from a difficult background can become globally iconic — and also how fame doesn't guarantee happiness.", mnemonic: "Marilyn Monroe: 100 years later, still the world's most recognisable face 💋" }
        ]
      },
      {
        name: "💸 What's happening with money?", color: "#a8edcb",
        stories: [
          { headline: "Anthropic (maker of Claude) files confidentially for IPO", eli5: "Anthropic — the AI company that makes Claude — quietly filed paperwork to go public on the stock market. 'Confidential' filing means they haven't announced it publicly yet but are preparing. Senator Bernie Sanders immediately called for a 50% tax on AI company stock. This would be one of the biggest tech IPOs in years — Anthropic was last valued at over $60 billion.", whyItMatters: "An Anthropic IPO would give everyone the chance to own a piece of one of the world's most important AI companies — and set a benchmark for how the market values AI.", mnemonic: "Anthropic IPO = The AI behind this brief might become buyable on stock market 📈🤖" },
          { headline: "Strait of Hormuz tensions push Brent crude above $97", eli5: "The Strait of Hormuz — a 33km-wide water channel between Iran and Oman — carries 20% of the world's oil every day. With US-Iran tensions rising, traders feared the channel could close. Oil prices jumped above $97 a barrel. India, which imports 85% of its oil, watched nervously. Every dollar rise in oil costs India about $1.5 billion extra per year.", whyItMatters: "Oil above $97 means fuel prices, freight costs, and food prices in India and worldwide all start creeping up.", mnemonic: "Hormuz narrow, oil wide impact. $97 = India's pocket gets lighter 🛢️" },
          { headline: "Indian Nifty starts June weak — geopolitical worry drags markets", eli5: "India's stock market opened June on shaky ground. Nifty fell below 23,400 as investors worried about high oil prices, Middle East tensions, and whether foreign investors would pull money out of India. Think of it like a bazaar where everyone suddenly starts checking their phones instead of shopping — the mood turns cautious and sellers outnumber buyers.", whyItMatters: "June started with a mood of caution. Understanding why markets fall is just as important as knowing when to buy.", mnemonic: "June 1 Nifty = Nervous bazaar, everyone checking news instead of shopping 📉" }
        ]
      },
      {
        name: "💻 What's happening with technology?", color: "#c9b8f5",
        stories: [
          { headline: "Pentagon designates its press office as a 'classified space'", eli5: "Defense Secretary Hegseth made a dramatic move: the Pentagon's press office — the room where journalists ask military officials questions — was officially classified as a restricted space. This means fewer journalists can attend, and more military decisions can be made without press questions. It's like a school saying the principal's office is now top secret.", whyItMatters: "When governments restrict press access to military information, citizens lose visibility into how their tax money is being spent on war.", mnemonic: "Classified press office = Lights off on military transparency 🔦" },
          { headline: "UN scientist warns: AI boom is creating a 'new form of imperialism'", eli5: "A prominent UN scientist said AI development is concentrating power in a handful of wealthy countries and companies — and the rest of the world is becoming dependent on them. He called it a 'new form of imperialism': instead of colonising land, rich countries are colonising data, infrastructure, and the tools people need to think and work. Developing countries are building their economies on AI systems they don't own or control.", whyItMatters: "If India and other developing countries don't build their own AI capability, they risk being permanently dependent on American or Chinese AI systems.", mnemonic: "AI imperialism = New colonisation, data instead of land 🌍💻" }
        ]
      },
      {
        name: "🌿 What's happening with our planet?", color: "#f5c6a0",
        stories: [
          { headline: "Texas police arrest ICE agent who shot Venezuelan immigrant", eli5: "In Minneapolis, a US Immigration and Customs Enforcement (ICE) agent shot a Venezuelan immigrant during an arrest. Texas police — separately investigating the incident — arrested the ICE agent. It shows rare tension between different branches of US law enforcement. The shooting has sparked national protests about immigration enforcement methods.", whyItMatters: "This case highlights the debate about how immigration enforcement is conducted and what legal protections immigrants have.", mnemonic: "ICE agent arrested = Law enforcement policing itself — rare but real 🚔" },
          { headline: "Colombian presidential race: right-wing candidate ahead after round one", eli5: "Colombia held the first round of its presidential election. A pro-Trump, right-wing candidate took the lead — surprising many analysts who expected a closer race. Colombia is South America's third-largest economy and a key US ally. The election result could shift Colombia's approach to Venezuela, drugs policy, and relations with China.", whyItMatters: "Colombia's direction affects millions in South America and has major implications for the region's stability and trade.", mnemonic: "Colombia election = South America's next chapter starting 🗳️" }
        ]
      }
    ],
    quiz: [
      { q: "What company confidentially filed for an IPO on June 1, 2026?", options: ["OpenAI", "Google DeepMind", "Anthropic (maker of Claude)", "xAI (Elon Musk)"], answer: 2, funFact: "A confidential IPO filing, called an S-1 filing with the SEC, lets companies prepare for going public without announcing it. Apple, Google, and Facebook all used similar processes before their IPOs." },
      { q: "Why does Beaufort Castle matter militarily?", options: ["It has ancient weapons stored inside", "Controlling it gives you height advantage over surrounding hills and valleys", "It's a UNESCO site that can't be bombed", "It's worth billions in tourism"], answer: 1, funFact: "Beaufort Castle was built by Crusaders in 1139 AD. It has been captured by Saladin, the Ottomans, the French, and now Israeli forces — perhaps the most fought-over castle in history." },
      { q: "What is the Strait of Hormuz and why does it matter?", options: ["A mountain pass in Afghanistan", "A 33km-wide water channel carrying 20% of world's oil daily", "A trade agreement between Gulf countries", "Iran's largest oil field"], answer: 1, funFact: "On a normal day, 17 million barrels of oil pass through the Strait of Hormuz. If it closed for just one week, it would cause the largest energy crisis since the 1973 Arab Oil Embargo." }
    ]
  },
  markets: {
    globalPulse: { eli5: "June 1 opened with the world's money nervous. Oil above $97, Middle East at war, and the US continuing strikes on Iran. The money river was turbulent — investors moved toward safe assets like gold and US Treasury bonds, and away from stocks. Think of it like people grabbing umbrellas when they see dark clouds — nobody is sure if the storm hits, but they're preparing.", keyThings: ["Brent Crude: ~$97/barrel — 3-year high", "Gold up 1.2% — investors seeking safety", "Nifty fell to ~23,350 — weak open to June", "US Dollar strong — global risk-off mood"] },
    indianMarket: { eli5: "India's stock market started June on the back foot. High oil is India's kryptonite — it raises import bills, weakens the rupee, and forces the RBI to think about raising rates. FIIs (foreign investors) pulled money out. Sectors like aviation, paints, and chemicals (which use oil as raw material) fell hardest. But pharma and IT — which earn in dollars and don't need much oil — held steady.", breakouts: [
      { name: "Sun Pharma (NSE: SUNPHARMA)", whyExciting: "Pharma is a defensive play during geopolitical uncertainty. Sun Pharma, India's largest pharma company, earns 55% of revenue abroad in USD. When the rupee weakens (which it does when oil rises), every dollar earned is worth more in rupee terms. Strong US generics business is an added tailwind.", risk: "US FDA regulatory risk — any warning letter from FDA can drop the stock 10-15% overnight." },
      { name: "Infosys (NSE: INFY)", whyExciting: "IT companies are classic 'safe harbour' stocks in India during macro uncertainty. Infosys earns in USD, has zero oil exposure, and just raised its guidance for FY27. The stock is consolidating near a strong support level.", risk: "US recession fears could reduce IT spending by American clients — Infosys's biggest customers." },
      { name: "Coal India (NSE: COALINDIA)", whyExciting: "When oil gets expensive, India looks at alternatives. Coal India, which supplies coal for 70% of India's power, benefits indirectly. Plus it offers one of the highest dividend yields on Nifty — over 8% — making it attractive as a defensive income stock.", risk: "Government intervention in pricing — Coal India's prices are partly controlled by policy, not pure market forces." }
    ], ipoSpot: { name: "No major IPO this week", verdict: "Watch", eli5: "No significant IPO opening this week. Use this time to research the upcoming Ather Energy and other IPOs in pipeline. Good IPO markets need stable sentiment — wait for geopolitical dust to settle." }, lessonOfDay: { title: "Defensive vs Cyclical Stocks", story: "When the economy is uncertain or oil is high, smart investors shift from cyclical stocks (airlines, cars, paints — which need cheap inputs) to defensive stocks (pharma, FMCG, IT — which keep earning regardless). It's like switching from a sports car to a 4x4 when the road gets rough. Understanding this rotation is one of the most practical investing skills you can build.", mnemonic: "Cyclical = Weather-dependent. Defensive = All-weather. Know when to switch ☂️" } },
    quiz: [
      { q: "Why does high oil price hurt India's stock market?", options: ["India exports oil so high prices reduce demand", "India imports 85% of oil — higher prices raise costs across the whole economy", "The RBI always raises rates when oil falls", "Oil prices affect only aviation stocks"], answer: 1, funFact: "India's oil import bill in 2025 was approximately $150 billion — one of the largest import categories. Every $10 rise in oil prices costs India an additional $15 billion per year." },
      { q: "What makes pharma and IT 'defensive' stocks in India?", options: ["They are government owned", "They earn in USD and have little oil cost exposure", "They pay no taxes", "They only sell in India"], answer: 1, funFact: "India's IT sector exports over $250 billion in services per year — all billed in USD. When the rupee weakens, every dollar of revenue converts to more rupees, automatically boosting profits without any change in business." },
      { q: "Coal India has one of the highest dividend yields on Nifty — what does 'dividend yield' mean?", options: ["The total value of the company", "Annual dividend per share divided by stock price — shows income return as a %", "The speed at which shares grow in value", "The bonus shares given to employees"], answer: 1, funFact: "Coal India paid a dividend of ₹25.50 per share in FY25. At a stock price of ~₹380, that's a ~6.7% yield — higher than most fixed deposits, with additional potential for share price growth." }
    ]
  },
  psychology: {
    mindTrick: { name: "The Dunning-Kruger Effect", eli5: "Here's one of the most important things psychology ever discovered: people who know very little about a topic tend to think they know a LOT. And people who are genuine experts tend to think they still have so much to learn. A first-year medical student is more confident about diagnosing than a 20-year surgeon. A first-time investor is more confident than Warren Buffett. This is the Dunning-Kruger Effect — incompetence hides from itself because you need skill to recognise what you don't know.", realLife: "Watch for this in meetings: the loudest, most confident voice is sometimes the least informed. The quietest person who speaks carefully may know far more. Also watch for it in yourself — sudden expertise after reading one article is the peak of the Dunning-Kruger curve.", mnemonic: "Dunning-Kruger = The less you know, the more confident you are. 'Mount Stupid' 🏔️" },
    bodyLanguage: { signal: "Crossed Arms — What It Really Means", eli5: "Most people think crossed arms = defensive or closed off. But research shows it's more nuanced. People cross their arms when they're cold, when they're thinking deeply, when they feel uncomfortable, or when they're literally just comfortable. The key is to read crossed arms with other signals: if crossed arms come with a furrowed brow and avoided eye contact, that's defensiveness. If crossed arms come with leaning forward and nodding, that's concentration.", howToUse: "Don't assume someone is being defensive just because their arms are crossed. Ask an open question: 'What are your thoughts on this?' and watch if they uncross as they engage.", mnemonic: "Crossed arms ≠ always defensive. Context is everything. Read the cluster 🤔" },
    superpower: { name: "Reciprocity — The Ancient Rule of Give and Take", story: "In 1974, a researcher named Dennis Regan ran an experiment: one group of people received a small, unrequested Coke from a stranger. Later, the stranger asked them to buy raffle tickets. The people who received the Coke bought twice as many tickets as those who didn't. They felt obligated to give back — even though nobody asked them to accept the Coke in the first place. This is Reciprocity: when someone gives us something, we feel a deep, almost automatic need to give back.", shield: "Be careful about accepting unsolicited gifts or favours from people who later want something from you. The favour creates an invisible obligation. Recognise it.", mnemonic: "Reciprocity = Give first, receive later. The oldest sales technique on Earth 🎁" },
    quiz: [
      { q: "The Dunning-Kruger Effect says that...", options: ["Smart people are always more confident", "People who know little tend to overestimate their knowledge", "Experts are always the most confident voices", "Intelligence directly correlates with confidence"], answer: 1, funFact: "The study was inspired by a 1995 bank robber who robbed banks in broad daylight with no disguise, believing lemon juice on his face made him invisible to cameras. He genuinely didn't know what he didn't know." },
      { q: "Crossed arms in body language should be read...", options: ["Always as defensiveness", "Always as comfort", "In context with other signals — not in isolation", "As a sign of anger"], answer: 2, funFact: "Studies show people retain 38% more information when reading in a crossed-arm position. The posture can actually signal focused concentration, not resistance." },
      { q: "The Reciprocity principle is powerful because...", options: ["People only help those who help them first", "Receiving something creates an almost automatic psychological obligation to give back", "It's a conscious, calculated decision", "It only works in business contexts"], answer: 1, funFact: "The Hare Krishna society used reciprocity brilliantly in the 1970s — they gave flowers to strangers at airports before asking for donations. Donations tripled compared to asking without giving first." }
    ]
  },
  leadership: {
    leaderMove: { name: "The Power of 'I Don't Know'", story: "General James Mattis, one of America's most respected military leaders, built a culture in his units where saying 'I don't know — let me find out' was respected more than a wrong answer given confidently. In most organisations, admitting ignorance is seen as weakness. Mattis showed it's actually strength: leaders who fake knowledge make bad decisions. Leaders who admit gaps and fill them make good ones. Jeff Bezos had a similar rule at Amazon: 'I don't know' followed by genuine investigation was always preferred over confident bluffing.", doThis: "The next time someone asks you something you're not 100% certain about: say 'Let me confirm that and come back to you in an hour.' Then actually confirm it. Do this once a day.", mnemonic: "'I don't know' + curiosity = Leadership. Fake certainty = Danger 🎯" },
    visionarySecret: { concept: "The Long Game — Bezos's 10-Year Horizon", eli5: "Jeff Bezos made almost every major Amazon decision by asking: 'In 10 years, will this matter?' Not next quarter, not next year — 10 years. Amazon Web Services (AWS) — now worth more than the entire retail business — was laughed at internally when first proposed. Bezos protected it because the 10-year view said cloud computing would be massive. Most people plan in quarters. Visionaries plan in decades. The longer your time horizon, the bigger the decisions you can make correctly.", exercise: "Pick one decision you're facing right now. Write down how it looks if you zoom forward 10 years. Does the short-term difficulty still matter? Often the long-game clarity changes everything.", mnemonic: "Bezos rule: Ask 'Will this matter in 10 years?' before every big decision 🗓️➡️🌟" },
    eliteHabit: { habit: "The Journaling Practice", whoAndHow: "Marcus Aurelius, Richard Branson, Oprah Winfrey, and Tim Ferriss all journal daily. Aurelius wrote Meditations as a private journal — never meant to be published. The practice: 5-10 minutes each morning or night, free-write whatever is on your mind. No format. No audience. Just honest thinking.", whyItWorks: "Writing forces you to slow your thinking down enough to actually examine it. Unexamined thoughts run on autopilot. Written thoughts reveal patterns, fears, and opportunities you didn't know were there. Studies show regular journalling reduces anxiety and improves decision-making quality.", mnemonic: "Journal = Your brain's debug mode. Thoughts in, clarity out 📓" },
    sigmaWisdom: { lesson: "Amor Fati — Love Your Fate", story: "Friedrich Nietzsche coined 'Amor Fati' — Love Your Fate. Not just tolerating what happens to you, or accepting it with resignation. Actually loving it. Marcus Aurelius practised this: when his children died, when battles were lost, when plans failed — he tried to see those events as necessary, as fuel, as the raw material of character. Ryan Holiday calls it 'the obstacle is the way.' Every difficult thing that happens to you contains an opportunity hiding inside it.", action: "When something goes wrong today — however small — write down one way this difficulty could actually help you in the long run. Do this before you complain about it.", mnemonic: "Amor Fati = Love your fate. Obstacles are opportunities in disguise 🌱" },
    quiz: [
      { q: "Why did General Mattis value 'I don't know' over wrong confident answers?", options: ["It made him look humble", "Leaders who fake knowledge make bad decisions — admitting gaps leads to better ones", "It's a military protocol", "It encouraged his team to show off their knowledge"], answer: 1, funFact: "Studies of major corporate and military failures (Enron, the Iraq WMD assessment, Lehman Brothers) consistently show that cultures that punished admitting ignorance made catastrophically wrong decisions as a result." },
      { q: "Bezos's 10-year horizon helped him build what unexpectedly massive business?", options: ["Amazon Prime", "Kindle e-readers", "Amazon Web Services (AWS)", "Whole Foods"], answer: 2, funFact: "AWS — Amazon's cloud computing business — was initially mocked internally. Today it generates more profit than Amazon's entire retail operation. The 10-year bet is now worth over $800 billion in market value." },
      { q: "Amor Fati means...", options: ["Fear your fate", "Ignore your fate", "Accept your fate passively", "Love your fate — embrace every obstacle as necessary"], answer: 3, funFact: "Nietzsche said his formula for greatness was: 'Not merely bear what is necessary, still less conceal it... but love it.' He believed the greatest human beings were those who transformed every difficulty into strength." }
    ]
  },
  wealth: {
    wealthSecret: { name: "The Wealth Ladder — Assets vs Liabilities", story: "Robert Kiyosaki's most famous insight: rich people buy assets (things that put money IN your pocket — stocks, property, businesses), while poor and middle-class people buy liabilities thinking they're assets (cars, big TVs, expensive phones — things that take money OUT of your pocket every month). A car depreciates. A stock can appreciate and pay dividends. The same money spent differently creates completely different financial futures. The wealth ladder goes up when more rungs are assets.", action: "List everything you spent money on this month. Mark each item: A (asset — it will be worth more or pay you) or L (liability — it costs you money over time). Count the As and Ls. That ratio tells you your financial trajectory.", mnemonic: "Assets put money IN. Liabilities take money OUT. Rich people know the difference 💰↕️" },
    moneyMachine: { type: "REITs — Real Estate Without Buying Property", eli5: "Imagine you want to own a piece of a big shopping mall or office building — but you only have ₹5,000. REITs (Real Estate Investment Trusts) let you do exactly that. A REIT pools money from thousands of investors, buys big properties, collects rent, and distributes 90% of profits as dividends. In India, Embassy Office Parks REIT and Brookfield India REIT are listed on NSE. You can buy units like buying shares.", indiaAngle: "India has 4 listed REITs as of 2026. Embassy REIT — India's first — has consistently paid quarterly dividends and is backed by global investors. Minimum investment is around ₹300-400 per unit.", mnemonic: "REIT = Real Estate In your Trading account. Mall owner from your phone 🏢📱" },
    mindsetFlip: { oldThinking: "I need a high salary to build wealth", newThinking: "I need a high savings rate — salary is less important than what percentage I keep", why: "A person earning ₹2 lakhs/month who saves 5% = ₹10,000 saved. A person earning ₹80,000/month who saves 30% = ₹24,000 saved. The lower-earning person saves MORE because their ratio is higher. Wealth is built from the gap between what you earn and what you spend — not just from earning more.", mnemonic: "Savings rate > salary size. The gap is where wealth lives 📐" },
    magicNumber: { number: "25x Your Annual Expenses", eli5: "This is the financial freedom number. If you spend ₹6 lakh per year, you need ₹1.5 crore invested to never need to work again (if invested at 8%+ returns). If you spend ₹10 lakh per year, you need ₹2.5 crore. The formula: annual expenses × 25 = your financial freedom target. Most people don't know their number. Once you know it, it becomes a target — and targets change behaviour.", mnemonic: "Freedom Number = Annual spend × 25. Know yours. Chase it 🎯" },
    quiz: [
      { q: "According to Robert Kiyosaki, a car is...", options: ["An asset because it helps you earn money", "A liability because it costs money every month and loses value", "Neutral — neither asset nor liability", "An asset if it's expensive enough"], answer: 1, funFact: "The average Indian car owner spends ₹80,000–₹1.5 lakh per year on fuel, insurance, servicing and EMIs. Over 10 years that's ₹8-15 lakh that could have been invested — at 12% returns, that's ₹15-30 lakh in lost wealth." },
      { q: "What is a REIT?", options: ["A government real estate bond", "A fund that owns properties and distributes rent as dividends to investors", "A bank loan for property buyers", "A tax on real estate profits"], answer: 1, funFact: "REITs were invented in the US in 1960 to allow ordinary investors to own commercial real estate. India got its first REIT — Embassy Office Parks — only in 2019. The global REIT market is worth over $2 trillion." },
      { q: "If you spend ₹8 lakh per year, what is your financial freedom number?", options: ["₹80 lakhs", "₹1.5 crore", "₹2 crore", "₹5 crore"], answer: 2, funFact: "₹8 lakh × 25 = ₹2 crore. This is based on the '4% Safe Withdrawal Rate' — research showing that withdrawing 4% of a well-invested portfolio per year has never depleted the portfolio over a 30-year period historically." }
    ]
  },
  communication: {
    speakingSkill: { name: "Storytelling Structure: Problem → Stakes → Solution → Lesson", story: "Every great speech, pitch, and presentation follows a hidden story structure. Abraham Lincoln's Gettysburg Address: Problem (civil war tearing the nation). Stakes (the survival of democracy itself). Solution (honoring those who died by recommitting to the cause). Lesson (government of the people, by the people, for the people, shall not perish). In 272 words he delivered one of history's most powerful speeches. The structure works in 2 minutes or 2 hours.", drill: "Practice telling any story — news event, personal experience, company update — using exactly this sequence: What was the problem? What was at stake? How was it solved? What should we learn? Record yourself doing it for 90 seconds.", mnemonic: "Problem → Stakes → Solution → Lesson = Every great story ever told 📖" },
    negotiationMove: { tactic: "Anchoring — Set the First Number", eli5: "In any negotiation involving numbers — salary, price, contract value — whoever says the first number has enormous power. This is called anchoring. The first number becomes the psychological reference point for everything that follows. If you're negotiating your salary and your company says ₹80,000 first, the entire negotiation happens around that anchor. If you say ₹1,20,000 first, the negotiation happens around that instead — and the final number will likely be higher.", script: "In a salary negotiation: instead of waiting for them to make an offer, say 'Based on my research and the market rate for this role, I'm targeting ₹[X]' — and make X higher than your minimum. The anchor is now yours.", mnemonic: "First number = Anchor. Set it high, let them negotiate down to your real target ⚓" },
    officeWin: { rule: "Over-communicate on important tasks — give unprompted status updates", story: "Person A is given a task and goes silent for 3 days. Person B is given the same task and sends a 2-line update on day 2: 'On track, completing by tomorrow — no blockers.' Person B builds more trust in 3 days than Person A builds in 3 months. Managers fear silence. They don't know if you're stuck, if you forgot, or if something went wrong. Unprompted updates remove their anxiety and mark you as reliable.", mistake: "Most people only communicate when they need something or when there's a problem. Proactive communication when things are going FINE is what builds reputations.", mnemonic: "Status update unprompted = Reliability signal. Silence = Anxiety signal 📡" },
    confidenceHack: { technique: "Slow Down Your Speech", science: "Fast speech signals anxiety. Slow, measured speech signals confidence and authority. Research shows people perceive slow speakers as more intelligent, more credible, and more trustworthy — even when the content is identical. Slow speech also gives your brain more time to form better sentences, reducing filler words like 'um' and 'uh'.", doItNow: "Record a 1-minute voice memo about any topic. Play it back. Count your filler words and measure your pace. Then record again — deliberately 20% slower. Compare how you sound. Practice this weekly.", mnemonic: "Slow speech = Authority. Fast speech = Anxiety. Slow down to speed up trust 🐢🏆" },
    quiz: [
      { q: "The Gettysburg Address used which storytelling structure?", options: ["Past → Present → Future", "Problem → Stakes → Solution → Lesson", "Beginning → Middle → End", "Data → Analysis → Recommendation"], answer: 1, funFact: "Lincoln's Gettysburg Address was 272 words and took 2 minutes. The main speaker that day, Edward Everett, spoke for 2 hours before Lincoln. History remembered the 2-minute speech, not the 2-hour one." },
      { q: "In salary negotiations, anchoring means...", options: ["Waiting for the employer to make the first offer", "Setting the first number to create a psychological reference point", "Staying firm at one number throughout", "Negotiating from the middle ground"], answer: 1, funFact: "Studies show that in salary negotiations, the final agreed salary is statistically closest to whoever made the first offer — even when that first offer seemed unreasonable. Anchoring bias is that powerful." },
      { q: "Why does speaking slowly signal confidence?", options: ["It gives you more time to think of impressive words", "Fast speakers are always nervous so slow = calm", "Research shows slow speakers are perceived as more intelligent, credible, and authoritative", "It makes presentations longer and more thorough"], answer: 2, funFact: "Martin Luther King Jr. spoke at 92 words per minute in the 'I Have a Dream' speech — about 40% slower than normal conversation. Barack Obama averaged 110 wpm in major speeches. The average person speaks at 130-150 wpm." }
    ]
  },
  mind: {
    brainHack: { name: "Implementation Intentions — If-Then Planning", eli5: "Most people set goals. Very few achieve them. The difference isn't willpower — it's planning. Psychologist Peter Gollwitzer discovered that adding 'when-then' specifics to any goal dramatically increases follow-through. Instead of 'I'll exercise more,' say 'When I wake up on Monday and Thursday, I will put on my shoes and walk for 20 minutes before breakfast.' The brain treats the 'when' as a trigger — like programming an alarm — and the action becomes almost automatic.", protocol: "Pick one habit you've been trying to build. Write: 'When [specific trigger], I will [specific action] for [specific duration].' Put this somewhere you'll see it. The trigger and the plan together remove the need for willpower.", mnemonic: "If-Then Planning = Pre-program your brain like an alarm clock ⏰🧠" },
    disciplineCode: { principle: "The Compound Effect of Daily Choices", story: "Darren Hardy's book The Compound Effect starts with a thought experiment: two people live identical lives except one makes slightly better choices every day — 1% better eating, 1% more walking, 1% more reading. The other makes 1% worse choices daily. After 5 years, they are completely different people. After 10 years, they are unrecognisable from each other. No single choice dramatically changed anything. The accumulation of tiny choices creates massive divergence over time.", todayAction: "Pick ONE tiny daily choice to improve by 1% today. Not 100%. Just 1%. Write it down. Tomorrow, look at what you wrote and do it again.", mnemonic: "1% better daily × 365 days = 37× better in a year. The maths is magic 📈" },
    impulseKiller: { urge: "Impulse buying — buying things you didn't plan to", eli5: "Your brain is wired to want immediate reward. Shops, websites, and apps are designed by expert psychologists to trigger that wiring. You walk past a shop and suddenly 'need' something you didn't know existed 5 minutes ago. The urge to buy impulsively is not rational — it's a neurological hijack. Online shopping makes it worse: one click, instant delivery, no friction.", interrupt: "The 24-hour rule: when you feel the urge to buy something unplanned, add it to a wishlist and wait 24 hours. Most of the time, you'll check the list the next day and not actually want it anymore. The urge was temporary. The money would have been permanent.", mnemonic: "24-hour wishlist rule = Kills 80% of impulse buys before they happen 🛒⏸️" },
    bodyUpgrade: { practice: "Morning Sunlight — The Free Mood Regulator", eli5: "Your brain has a master biological clock called the circadian rhythm. The single most powerful way to set it every day is getting natural light in your eyes within 30 minutes of waking up. This light triggers a cascade: it stops melatonin (sleep hormone), boosts cortisol (alertness), and sets serotonin production (mood) for the entire day. Dr. Andrew Huberman calls this the most impactful free health tool available to anyone on Earth.", minimumDose: "2-10 minutes of outdoor light within 30 minutes of waking. No sunglasses. No windows — glass filters the necessary wavelengths. Even on cloudy days, outdoor light is 10-50× brighter than indoor light.", mnemonic: "Morning sunlight = Free antidepressant, alarm clock for your brain ☀️🧠" },
    quiz: [
      { q: "Implementation intentions improve goal achievement by...", options: ["Increasing motivation", "Adding specific when-then triggers that automate behaviour", "Setting bigger targets", "Rewarding yourself more"], answer: 1, funFact: "Peter Gollwitzer's research across 94 studies found that people who used implementation intentions (if-then planning) were 2-3× more likely to achieve their goals than those who just set intentions without specific triggers." },
      { q: "The Compound Effect says that 1% daily improvement over 365 days results in approximately how much total improvement?", options: ["37% better", "365% better", "37× better", "100× better"], answer: 2, funFact: "The maths: 1.01^365 = 37.78. So 1% better every day for a year makes you approximately 37 times better. Conversely, 1% worse every day: 0.99^365 = 0.03 — you become 3% of what you were. Tiny choices compound into enormous outcomes." },
      { q: "Morning sunlight in the eyes helps your brain primarily by...", options: ["Warming your body temperature", "Setting your circadian rhythm — triggering alertness, mood, and energy for the whole day", "Improving eyesight", "Reducing hunger"], answer: 1, funFact: "Astronauts on the International Space Station see 16 sunrises per day, which completely disrupts their circadian rhythms. NASA now uses precisely timed artificial light to simulate a 24-hour day cycle and preserve astronaut mental health." }
    ]
  },
  knowledge: {
    mathMagic: { concept: "Probability — The Mathematics of Uncertainty", eli5: "Every decision you make involves uncertainty. Probability is the science of quantifying that uncertainty. A coin has 50% chance of heads. A weather forecast of '70% rain' means: in 100 days with similar conditions, it rained 70 times. But here's what most people misunderstand: a 70% chance of rain doesn't mean 'it will definitely rain.' It means there's a 30% chance it won't. Smart decisions account for both the probability AND what happens if the unlikely outcome occurs.", realWorldUse: "In investing: 'This stock has an 80% chance of going up' sounds great. But if the 20% scenario means you lose everything, and the 80% scenario means you gain 10% — the expected value is still negative. Always calculate: probability × outcome for ALL scenarios, not just the most likely one.", mnemonic: "Probability = Uncertainty given a number. Know both the likely AND unlikely scenarios 🎲" },
    scienceWow: { field: "Biology", concept: "Neuroplasticity — Your Brain Can Rewire Itself", eli5: "For most of human history, scientists thought the adult brain was fixed — a machine that couldn't be changed after childhood. Then in the 1990s, everything changed. Scientists discovered neuroplasticity: the brain physically rewires itself based on what you do, think, and experience. When you learn a new skill, your neurons form new connections. When you stop a habit, old pathways weaken. You are literally sculpting your brain with every thought and action. The brain you have today is not the brain you must keep.", mindBlow: "London taxi drivers, who must memorise thousands of streets, have measurably larger hippocampus (memory centre) than other people. Violinists who practise young develop larger brain regions controlling their left hand fingers. Your job, your habits, your practice — all physically change your brain structure.", mnemonic: "Neuroplasticity = Your brain is clay, not stone. Shape it or it shapes you 🧠🏺" },
    historyStory: { event: "The Printing Press — How Gutenberg Changed Everything (1440)", story: "Before Johannes Gutenberg invented the printing press around 1440, a single book cost as much as a house and took months for a monk to copy by hand. Only the rich and the church could access knowledge. Within 50 years of the printing press, over 20 million books were printed across Europe. The Protestant Reformation, the Scientific Revolution, and the spread of democracy all followed — because suddenly anyone could read the same ideas at the same time. One invention broke the monopoly on knowledge and changed human civilisation.", lesson: "Information monopolies create power monopolies. When information becomes democratised — printing press, internet, AI — society transforms rapidly. We are living through the third great information revolution right now with AI.", mnemonic: "Printing press 1440 = First internet. Gutenberg = First Google 📰💻" },
    earthSecret: { place: "Bhutan", secret: "Bhutan is the only carbon-negative country in the world — it absorbs more CO₂ than it produces. The country's constitution legally mandates that 60% of its land must remain forested forever. It also measures success using Gross National Happiness instead of GDP. No fast food chains, no billboard advertising, and tourists must pay $200 per day just to enter — to limit mass tourism's impact on its culture and environment.", edge: "Bhutan's model shows that economic metrics beyond GDP are possible and functional. Understanding alternative development models matters as climate change reshapes which countries succeed this century.", mnemonic: "Bhutan = Carbon negative, happiness-positive, tourists pay to visit 🇧🇹🌿" },
    quiz: [
      { q: "A 70% chance of rain means...", options: ["It will definitely rain today", "In 100 similar weather days, it rained 70 times", "70% of the sky will be covered in clouds", "The rain will last 70% of the day"], answer: 1, funFact: "Weather probability forecasting was considered impossible until the 1950s. Now modern AI models can predict 10-day weather with 80%+ accuracy — but the probabilistic nature means even the best models can be wrong." },
      { q: "What is neuroplasticity?", options: ["The brain's ability to resist change as you age", "The brain physically rewiring itself based on experience, learning, and behaviour", "Plastic surgery for the brain", "The brain's limit on how much information it can store"], answer: 1, funFact: "Michael Merzenich, a neuroscientist, proved neuroplasticity by showing that monkeys whose fingers were amputated had the brain regions for those fingers taken over by adjacent fingers within weeks. The brain is always reorganising itself based on use." },
      { q: "The printing press caused which major downstream effects?", options: ["Only religious change", "The Protestant Reformation, Scientific Revolution, and spread of democracy — because knowledge became democratised", "Mostly economic change through cheaper books", "No significant social change"], answer: 1, funFact: "Martin Luther's '95 Theses' — which sparked the Protestant Reformation — went viral before the term existed. His arguments were copied and distributed across Europe within weeks of being nailed to a church door in 1517, purely because of the printing press." }
    ]
  },
  ai: {
    toolSpotlight: { name: "Notion AI", category: "Productivity / Writing / Organisation", eli5: "Notion is like a super-smart notebook that can also be a database, project tracker, and wiki — all in one. Notion AI takes it further: it can write first drafts, summarise long notes, translate meeting notes into action items, and answer questions about your own documents. Instead of searching through 100 pages of notes, you ask Notion AI 'What did we decide about the marketing budget?' and it finds and summarises the answer.", secretMove: "Use Notion AI's 'Ask AI about this page' feature in any document. Instead of rereading a 20-page meeting record, ask: 'What are the 3 most important decisions made in this document?' You can process a month of notes in 5 minutes.", mnemonic: "Notion AI = Your second brain with a search bar and a writing assistant 🧠📝" },
    workflowWin: { title: "The Weekly Review in 20 Minutes Using AI", problem: "Most people never review their week — they just rush into the next one, repeating the same mistakes and missing the same opportunities.", steps: ["Every Sunday, open a new document and paste your calendar events, completed tasks, and any important notes from the week", "Ask Claude or ChatGPT: 'Summarise what I accomplished this week, what I didn't complete, and what patterns you notice'", "Then ask: 'Based on this, what should be my top 3 priorities next week?'", "Capture the AI's output + your own reaction in a 'Weekly Review' note. Review these monthly."], timeSaved: "Replaces a 90-minute manual review process with 20 focused minutes — and produces better insight.", mnemonic: "Sunday review + AI = Clear head for Monday, every week 📋" },
    promptOfDay: { purpose: "Turn any mistake into a learning system", prompt: "I made this mistake: [describe what happened]. Help me: 1) Understand the root cause — not just what happened, but why it happened, 2) Identify if there's a pattern I'm not seeing, 3) Design a simple system or rule that would prevent this specific mistake from happening again, 4) Tell me if this mistake is actually common and what I can learn from how others have handled it.", where: "Claude or ChatGPT", mnemonic: "Mistake → AI root cause → System fix → Never again. Turn pain into protocol 🔄" },
    futureWatch: { trend: "AI is beginning to write and improve its own code", eli5: "The most significant AI development of 2026 is not AI answering questions — it's AI writing, testing, and improving software code without human programmers for every step. GitHub Copilot now handles 40% of code written on its platform. DeepMind's AlphaCode 2 solved programming problems better than 85% of human competitive programmers. The implication: software development is getting dramatically cheaper and faster. Every industry will be able to build software tools that previously only large tech companies could afford.", yourMove: "If you work in any industry, start asking: 'What software tool would help my work that we've never built because it was too expensive?' Those tools are becoming buildable by non-programmers using AI within 2-3 years. Being the person who knows what to build is more valuable than being the one who builds it.", mnemonic: "AI writes code = Software gets 100× cheaper. What would you build if it cost nothing? 🏗️" },
    quiz: [
      { q: "Notion AI's most powerful hidden feature is...", options: ["Writing essays from scratch", "Asking questions about your own documents and getting instant summarised answers", "Translating languages", "Managing your calendar"], answer: 1, funFact: "Notion has over 30 million users worldwide. The AI features, added in 2023, reduced average document search time by 70% according to Notion's internal data." },
      { q: "Why does a weekly review matter for productivity?", options: ["It helps you feel busy and organised", "It surfaces patterns, prevents repeated mistakes, and ensures next week's priorities are intentional not reactive", "It impresses managers when shared", "It replaces the need for daily planning"], answer: 1, funFact: "Peter Drucker, the management theorist, said: 'What gets measured gets managed.' The weekly review is a measurement of your time — the most scarce and non-renewable resource you have." },
      { q: "AlphaCode 2 by DeepMind solves programming problems better than what percentage of human competitive programmers?", options: ["50%", "65%", "85%", "95%"], answer: 2, funFact: "Competitive programming is considered one of the hardest forms of problem-solving — it requires both deep mathematical thinking and creative software engineering. AlphaCode 2 reaching 85th percentile was considered a breakthrough milestone in AI capability." }
    ]
  },
  travel: {
    destination: { country: "Morocco", region: "Marrakech & the Atlas Mountains", eli5: "Imagine stepping through a doorway and being in a different century. Marrakech's medina (old city) has winding alleys that smell of spices, tanneries where leather is still dyed using 1,000-year-old methods, carpet weavers, and snake charmers in the main square. Two hours away, the Atlas Mountains rise dramatically — Berber villages perched on cliffsides, snow in winter, wildflower valleys in spring. Morocco is one hour from Europe but feels like another world.", bestTime: "March-May or September-November — mild temperatures, less dust, fewer crowds than peak summer.", hiddenGem: "The blue city of Chefchaouen in northern Morocco — every wall, door, and street is painted blue. Moroccans believe blue keeps mosquitoes away. It's also simply stunning. Most tourists fly to Marrakech and miss this entirely.", mnemonic: "Morocco = 1 hour from Europe, 1,000 years from now 🕌🏔️" },
    visaTip: { focus: "Morocco Visa for Indian Passport Holders", eli5: "Great news: India and Morocco signed a visa-free agreement in 2024. Indian passport holders can visit Morocco for up to 90 days without a visa. You just need a valid passport with at least 6 months validity, proof of onward travel, and proof of sufficient funds (roughly ₹3,000-5,000 per day). No appointment, no embassy, no waiting.", goldenTip: "Carry printed copies of your return ticket and hotel bookings — Moroccan immigration occasionally asks to see these even though the visit is visa-free. Having them ready makes entry smooth.", mnemonic: "Morocco = Visa-free for Indians. Pack, book, go ✈️🇲🇦" },
    culturalCode: { culture: "Morocco", doThis: "Accept mint tea when offered — refusing is considered impolite. The pouring ritual (from height, to create froth) is a gesture of hospitality. Also: haggling in souks (markets) is expected and part of the culture. Start at 30-40% of the asking price. The seller won't be offended — they expect it and enjoy the back-and-forth.", neverDoThis: "During Ramadan (Islamic holy month), avoid eating, drinking, or smoking in public during daylight — even as a non-Muslim tourist, doing so in front of fasting people is disrespectful. Also dress modestly in the medina — shoulders and knees covered for both men and women.", mnemonic: "Morocco: Accept mint tea, haggle freely, dress modestly in medina 🍵" },
    quiz: [
      { q: "Do Indian passport holders need a visa for Morocco?", options: ["Yes — apply 3 weeks in advance", "Yes — on arrival only", "No — visa-free for up to 90 days since 2024", "No visa needed for Indians anywhere in Africa"], answer: 2, funFact: "Morocco was one of only a few African nations to sign a visa-free agreement with India. The deal was signed during PM Modi's state visit to Morocco in 2024 — the first Indian PM to visit Morocco in over a decade." },
      { q: "What is Chefchaouen famous for?", options: ["Being Morocco's capital city", "A city where every building is painted blue", "The world's largest camel market", "Ancient Roman ruins"], answer: 1, funFact: "Chefchaouen's blue walls have multiple explanations: some say Jewish refugees who arrived in the 15th century brought the tradition (blue representing heaven in Judaism), others say locals believe it repels mosquitoes. No one is entirely sure — which makes it more mysterious." },
      { q: "When haggling in Moroccan souks, you should start at approximately...", options: ["10% of asking price", "30-40% of asking price", "80-90% of asking price", "The exact price you want to pay"], answer: 1, funFact: "The haggling culture in Moroccan souks goes back thousands of years — it's fundamentally social, not confrontational. Sellers respect confident negotiators. Paying the first price asked is actually seen as strange, not polite." }
    ]
  }
}

const d260602 = {
  news: {
    segments: [
      { name: "🌐 What's happening with countries?", color: "#a0d4f5", stories: [
        { headline: "Israel kills 8 in Lebanon — hours after Trump said fighting would stop", eli5: "President Trump announced that Israel and Hezbollah had agreed to stop shooting in Lebanon. But just hours after this announcement, Israeli strikes killed 8 people — including a family in a car. It's one of history's most repeated tragedies: a ceasefire is announced from a podium far away while violence continues on the ground. The gap between political announcements and battlefield reality is one of the most important lessons in how wars actually work.", whyItMatters: "Peace agreements mean nothing until they hold on the ground. This gap between rhetoric and reality is how most ceasefires fail.", mnemonic: "Ceasefire announcement ≠ ceasefire on ground. Words travel fast, orders don't 🕊️" },
        { headline: "Iran suspends US peace talks after Israel's Lebanon attacks", eli5: "Iran and the US were quietly talking about ending their conflict. Then Israel attacked Lebanon again (Iran and Hezbollah are allies). Iran said: 'We can't negotiate while our allies are being bombed' and walked away from the table. This shows the Middle East's tangled alliances — Israel's actions directly affected US-Iran negotiations, even though they're different conflicts. Everything is connected.", whyItMatters: "The US-Iran talks and the Israel-Lebanon conflict are linked — progress in one can destroy progress in the other.", mnemonic: "Middle East alliances: Pull one thread, the whole sweater unravels 🧶" },
        { headline: "Anthropic IPO: Senator Sanders wants 50% tax on AI company stocks", eli5: "When news broke that Anthropic was preparing to go public, Senator Bernie Sanders immediately proposed a 50% tax on stock profits from AI companies. His argument: AI companies are becoming enormously wealthy using data created by ordinary people — those people deserve a share. This debate about who profits from AI and who should share in those profits will define the next decade of politics.", whyItMatters: "How governments tax AI wealth will determine whether AI's gains are broadly shared or concentrated in a small number of hands.", mnemonic: "AI profits: Who owns the robot? Who pays the robot? Who gets the money? 🤖💰" }
      ]},
      { name: "💸 What's happening with money?", color: "#a8edcb", stories: [
        { headline: "Russian missiles kill 18 people in Ukraine — war enters third year", eli5: "Russia and Ukraine have now been at war for over two years. On June 2, Russia launched a major missile strike that killed 18 civilians in various Ukrainian cities. Ukraine's military continues fighting back with drones. The war grinds on with no clear end in sight — slowly exhausting both countries and the international aid that sustains Ukraine.", whyItMatters: "The longer the war continues, the more it strains global grain supplies (both countries are major wheat exporters), energy prices, and European security.", mnemonic: "Ukraine war: Two years in, world still paying the price in grain and energy 🌾" },
        { headline: "Ghana parliament criminalises LGBTQ+ activities — global backlash grows", eli5: "Ghana's parliament passed a law making LGBTQ+ relationships illegal and punishable by imprisonment. It was backed by religious groups but condemned by international human rights organisations. Several Western countries called it a 'serious step backwards.' The IMF, which Ghana relies on for loans, has previously said human rights conditions could affect lending decisions.", whyItMatters: "The intersection of human rights and international finance is shaping governance decisions across Africa — how countries treat minorities affects their access to global money.", mnemonic: "Ghana law: Rights and money increasingly linked in global politics ⚖️" },
        { headline: "Nifty stabilises near 23,400 — market watches Iran closely", eli5: "India's Nifty index found some stability on June 2. The key driver: oil prices stayed below $100, which relieved some pressure. But investors remained cautious, watching every news headline about Iran-US talks. The market was essentially on hold — not falling dramatically but not rising either. It was a 'wait and see' day for Indian investors.", whyItMatters: "When markets are 'on hold,' the best move for long-term investors is usually to do nothing — and let their SIPs keep running.", mnemonic: "Sideways market = Best time to do nothing + keep SIP running 📊" }
      ]},
      { name: "💻 What's happening with technology?", color: "#c9b8f5", stories: [
        { headline: "Defence Secretary Hegseth makes Pentagon press room 'classified'", eli5: "The US Defence Secretary took a dramatic step: the room where journalists ask military officials questions is now classified — meaning fewer reporters can attend, and certain military decisions can be discussed without public scrutiny. Journalists and press freedom groups called it unprecedented and alarming. The argument from the Pentagon: some operational security matters shouldn't be public.", whyItMatters: "Press access to military decision-making is a cornerstone of democratic accountability. Restricting it has historically preceded major policy missteps.", mnemonic: "Pentagon classified press = Lights off on military accountability 🔦🚫" },
        { headline: "UNESCO warns AI will eliminate 40% of jobs globally within a decade", eli5: "A new UNESCO report warned that AI automation could eliminate 40% of current jobs globally within 10 years — the biggest labour market disruption since the Industrial Revolution. But here's the nuance: it also said new jobs will be created, and the transition depends entirely on investment in education and retraining. Countries that prepare will adapt; countries that ignore it will suffer massive unemployment.", whyItMatters: "For individuals: the question isn't 'will AI take my job?' — it's 'am I building skills AI cannot replace?' The answer determines your career trajectory.", mnemonic: "40% jobs → AI risk. New 40% → created. Transition = education 📚🤖" }
      ]},
      { name: "🌿 What's happening with our planet?", color: "#f5c6a0", stories: [
        { headline: "Newark Mayor arrested by ICE after protesting against detention facility", eli5: "Ras Baraka, the Mayor of Newark, New Jersey, was arrested by US immigration agents while protesting outside a private detention facility in his city. He was trying to inspect conditions inside the facility, which his city had tried to shut down. A sitting mayor being arrested by federal agents is extraordinarily rare and sparked massive national attention about immigration enforcement powers.", whyItMatters: "The conflict between city governments and federal immigration enforcement is reshaping American politics — with implications for how immigrant communities across the country are treated.", mnemonic: "Mayor arrested at immigration protest = City vs Federal power at flashpoint 🏛️" },
        { headline: "World Food Programme warns: Strait of Hormuz closure causing global food crisis", eli5: "The World Food Programme (WFP) — the UN's food agency — said the Strait of Hormuz closure is causing a global food crisis. Fuel and fertiliser prices have spiked because both move through the strait. No fuel = no tractors. No fertiliser = smaller harvests. The WFP said 2.5 million extra people in Somalia, 1.3 million in Sri Lanka, and 2.3 million in Afghanistan were pushed into acute food insecurity as a result.", whyItMatters: "One narrow waterway's closure is creating hunger thousands of miles away — showing how connected and fragile the global food system is.", mnemonic: "Hormuz closed → fuel up → fertiliser up → food crisis globally 🌾🔗" }
      ]},
    ],
    quiz: [
      { q: "Why did Iran walk away from US peace talks on June 2?", options: ["The US made unreasonable demands", "Israel attacked Lebanon — Iran's ally — making Iran unwilling to negotiate simultaneously", "Iran's Supreme Leader refused all talks", "The US cancelled the meetings"], answer: 1, funFact: "Iran and Hezbollah have a formal alliance called the 'Axis of Resistance.' This means military action against Lebanon directly affects Iran's willingness to engage diplomatically with Israel's main backer, the USA." },
      { q: "What did the World Food Programme warn about on June 2?", options: ["A drought in Africa", "The Strait of Hormuz closure was pushing millions into food insecurity by raising fuel and fertiliser prices", "Climate change reducing crop yields", "A locust invasion in South Asia"], answer: 1, funFact: "Fertiliser production requires enormous amounts of natural gas — which also passes through the Strait of Hormuz. When the strait closes, fertiliser prices spike globally within weeks, directly reducing crop yields in the next harvest season." },
      { q: "UNESCO warned AI could eliminate what percentage of jobs in a decade?", options: ["10%", "25%", "40%", "60%"], answer: 2, funFact: "The 40% figure includes jobs from accountants to truck drivers to radiologists. However, the Industrial Revolution also eliminated entire job categories (weavers, lamplighters, icemen) while creating far more new ones. The question is whether the transition will be managed humanely." }
    ]
  },
  markets: { globalPulse: { eli5: "June 2 was a day of nervous equilibrium. Oil stayed just below $100, Iran talks collapsed and then partially resumed. US markets traded sideways. The money river was flowing, but choppy — investors weren't selling everything, but they weren't buying boldly either. The mood: cautious, watchful, waiting for clarity.", keyThings: ["Brent Crude: ~$96/barrel — holding below $100", "Gold flat near $3,280/oz", "Nifty: ~23,400 — stabilising", "FII selling continues but slows"] },
    indianMarket: { eli5: "India's market found its footing on June 2, but barely. Pharma, IT, and FMCG stocks (defensive plays) held up. Banking stocks dipped slightly on global uncertainty. The currency market was the interesting action: the rupee weakened to 84.2 against the dollar — making Indian exports cheaper but imports more expensive. Good for IT companies (earn in USD), bad for oil companies (pay in USD).", breakouts: [
      { name: "Dr. Reddy's Laboratories (NSE: DRREDDY)", whyExciting: "India's second-largest pharma company with massive US generic drugs business. When the rupee weakens, dollar revenues convert to more rupees — automatic profit boost. Plus the company just received FDA approval for a key generic drug in the US market worth $400M annually.", risk: "FDA warning letters or product recalls can devastate pharmaceutical stocks overnight." },
      { name: "Tata Consultancy Services (NSE: TCS)", whyExciting: "TCS — India's largest IT company — earns 55% revenue from North America in USD. In a weak rupee environment, every dollar earned is worth more. The company also announced ₹17,000 crore share buyback, signalling management confidence in the business.", risk: "Client spending cuts in the US and UK (TCS's biggest markets) if recession fears deepen." },
      { name: "ITC Ltd (NSE: ITC)", whyExciting: "ITC is the ultimate defensive stock — cigarettes, hotels, FMCG, paper. People keep smoking regardless of oil prices or geopolitics. ITC also pays an excellent dividend (yield ~4%) and recently spun off its hotels business, unlocking hidden value for shareholders.", risk: "Regulatory risk on cigarette taxation — any sudden duty hike compresses margins." }
    ], ipoSpot: { name: "No major IPO this week", verdict: "Watch", eli5: "IPO market is quiet while geopolitics dominates. Smart investors use quiet periods to build a watchlist of upcoming IPOs to research thoroughly before they open." }, lessonOfDay: { title: "Currency Risk — Why the Rupee-Dollar Rate Matters", story: "When the rupee falls from ₹82 to ₹84 against the dollar, something interesting happens. A company like TCS that earns $1 billion now gets ₹84 billion instead of ₹82 billion — automatically ₹2 billion more profit without doing anything. But a company like BPCL that buys crude oil in dollars now pays ₹84 billion for the same amount of oil instead of ₹82 billion — automatic cost increase. Currency is a hidden tax or subsidy on different types of businesses.", mnemonic: "Weak rupee = Dollar earners win, dollar spenders lose. Know your company's currency exposure 💱" } },
    quiz: [
      { q: "When the Indian rupee weakens against the dollar, which companies benefit most?", options: ["Oil companies that import crude", "Airlines that pay for jet fuel in dollars", "IT companies and pharma companies that earn revenue in USD", "Real estate companies"], answer: 2, funFact: "India's IT sector earns approximately $250 billion per year in USD. A 1% depreciation of the rupee adds roughly $2.5 billion to the sector's combined profits — without any change in business volume." },
      { q: "ITC is called a 'defensive stock' because...", options: ["It makes defence equipment", "Its businesses (cigarettes, FMCG) continue earning regardless of economic cycles", "The government protects it from competition", "It has very low debt"], answer: 1, funFact: "Philip Morris (Marlboro's maker) is one of the best-performing stocks in US history over 50 years — outperforming technology companies — because cigarette demand is remarkably inelastic. People prioritise cigarettes even in financial hardship." },
      { q: "A share buyback by a company like TCS signals...", options: ["The company is struggling and needs to reduce share count", "Management believes the shares are undervalued and the company has surplus cash", "The company is planning to delist from the stock market", "Buybacks always mean the stock will fall next"], answer: 1, funFact: "Warren Buffett has called share buybacks at the right price 'the most shareholder-friendly thing a company can do.' Apple has spent over $600 billion buying back its own shares since 2012 — one of the largest buyback programmes in corporate history." }
    ]
  },
  psychology: { mindTrick: { name: "Loss Aversion — We Fear Losing More Than We Enjoy Winning", eli5: "Kahneman and Tversky's most famous discovery: losing ₹1,000 feels psychologically about twice as bad as winning ₹1,000 feels good. This asymmetry is wired into human brains — it helped our ancestors avoid predators (the cost of being eaten is permanent). But in modern life, it makes us terrible investors. We hold losing stocks too long (can't bear to realise the loss) and sell winning stocks too early (take the gain before it disappears). Loss aversion costs the average investor 1-2% in annual returns.", realLife: "Notice when you're making a decision based on fear of losing something you already have vs. gaining something new. If the fear of loss is driving you, deliberately ask: 'Would I make this same decision if I didn't already own this?'", mnemonic: "Losing ₹1,000 hurts 2× more than winning ₹1,000 feels good. Evolution lied to you 🧠" },
    bodyLanguage: { signal: "Microexpressions — Emotions That Flash in 1/25th of a Second", eli5: "Paul Ekman discovered that human faces flash their true emotion for just 1/25th of a second before the person controls their expression. These are called microexpressions. A flash of contempt (one side of lip curling up) before a polite smile. A flicker of fear before a confident 'no problem.' These happen involuntarily — the brain reveals truth before the face can hide it. FBI and CIA agents are trained to read them.", howToUse: "In high-stakes conversations, watch the first fraction of a second of someone's reaction to important news. Before they compose their response, their face tells you the truth. You can train yourself to see microexpressions with practice.", mnemonic: "Microexpression = The face's 1/25-second truth flash before the mask goes on 😐➡️😤" },
    superpower: { name: "The Foot-in-the-Door Technique", story: "In the 1960s, two researchers went door to door asking California homeowners: 'Can we put this tiny 3-inch sign about safe driving in your window?' Nearly everyone said yes. Two weeks later, they returned asking if they could install a huge ugly billboard about safe driving in their front yard. 76% of those who had agreed to the small sign said YES — compared to only 17% of those who hadn't been asked first. One small yes makes a big yes far more likely.", shield: "Recognise when someone asks you for something very small first. It may be setting up a much larger request later. The small agreement creates psychological consistency pressure.", mnemonic: "Small YES → Big YES. Foot-in-door: Start small to get big 🚪" },
    quiz: [
      { q: "Loss aversion means that psychologically, losing ₹1,000 feels...", options: ["The same as winning ₹1,000", "Slightly worse than winning ₹1,000", "About twice as bad as winning ₹1,000 feels good", "Much better than winning ₹1,000"], answer: 2, funFact: "Daniel Kahneman and Amos Tversky won the Nobel Prize in Economics for discovering loss aversion. Their work showed that human financial decisions are systematically irrational in predictable ways — founding the entire field of behavioural economics." },
      { q: "Microexpressions are important because...", options: ["They are always visible to the naked eye", "They reveal true emotions in the fraction of a second before someone controls their expression", "Only trained professionals can use them", "They last several seconds"], answer: 1, funFact: "Paul Ekman trained thousands of people to read microexpressions and found most people start at 50% accuracy (random chance for 2 options). After 2 hours of training, accuracy rises to 70%+. The skill is learnable." },
      { q: "The Foot-in-the-Door technique works because...", options: ["People are afraid of saying no", "A small agreement creates psychological pressure to remain consistent with later, larger requests", "Big requests are always refused", "People forget the first request quickly"], answer: 1, funFact: "Robert Cialdini calls this the Commitment and Consistency principle in 'Influence.' Once we take a position — however small — we feel internal and social pressure to behave consistently with it. This is why signing a small petition makes you more likely to donate later." }
    ]
  },
  leadership: { leaderMove: { name: "The 1-3-1 Rule — Come With Solutions, Not Just Problems", story: "A CEO at a major consulting firm instituted the 1-3-1 rule: if you bring a problem to a meeting, you must also bring 1 clear definition of the problem, 3 possible solutions you've already thought through, and 1 recommendation from you. The rule transformed the culture. Instead of managers escalating every problem upward, they started solving most problems themselves. The ones that reached leadership were already half-solved.", doThis: "Next time you want to bring a problem to a colleague or manager, stop first. Spend 10 minutes thinking of 3 possible solutions. Pick one you'd recommend. Then have the conversation.", mnemonic: "1-3-1: 1 problem clear, 3 solutions thought through, 1 recommendation. Never arrive empty-handed 💼" },
    visionarySecret: { concept: "Inversion Thinking — Ask What Could Go Wrong", eli5: "Most people think about how to succeed. Visionaries also think hard about how to fail — then they avoid those failure modes. Charlie Munger called this 'inversion': instead of asking 'How do I build a successful business?', ask 'What would guarantee this business fails?' Then don't do those things. The approach catches risks that forward thinking misses entirely. It's how engineers design bridges — by thinking about all the ways it could collapse, then building against each failure mode.", exercise: "For any goal you have right now, write down 5 ways you could fail to achieve it. Be brutally honest. Then design specific measures to prevent each one.", mnemonic: "Inversion: 'How do I fail?' → Don't do that → Success by elimination 🔄" },
    eliteHabit: { habit: "Single-Tasking — Doing One Thing at a Time", whoAndHow: "Cal Newport (author of Deep Work) and Warren Buffett both practice extreme single-tasking. Buffett says he doesn't multitask and has kept his calendar deliberately empty for decades. Newport studied the habits of the world's most productive people and found: none of them multitasked. They worked on one thing with complete focus until it was done, then moved to the next.", whyItWorks: "Neuroscience is clear: the brain cannot truly multitask. What we call 'multitasking' is actually rapid task-switching, which consumes extra cognitive energy each time and produces worse quality output than deep single-task focus. Every switch costs about 23 minutes to fully regain focus.", mnemonic: "Multitasking = Doing several things badly. Single-tasking = Doing one thing brilliantly 🎯" },
    sigmaWisdom: { lesson: "Jocko's Front-Sight Focus", story: "Navy SEAL Jocko Willink teaches that in any overwhelming situation — combat, business crisis, personal failure — the secret is to focus on the very next most important thing, not the entire problem. When 50 things are going wrong simultaneously, ask: 'What is the one most important thing I should fix right now?' Fix it. Then repeat. This 'front-sight focus' (from rifle training — focus on the front sight, not the target, not the surroundings) cuts overwhelm into manageable steps.", action: "When you feel overwhelmed today, write down everything on your mind. Circle the ONE most impactful item. Do only that. Then repeat.", mnemonic: "Front-sight focus: When overwhelmed, do the next ONE right thing. Then repeat 🎯" },
    quiz: [
      { q: "The 1-3-1 rule requires someone bringing a problem to also bring...", options: ["One solution they've already implemented", "1 problem definition, 3 possible solutions, and 1 recommendation", "3 colleagues to help solve it", "One senior approval"], answer: 1, funFact: "This rule is used at McKinsey, Bain, and many consulting firms. It's sometimes called 'never bring a problem without a solution' — but the 1-3-1 version is more specific and powerful because it requires showing your thinking process." },
      { q: "Inversion thinking asks...", options: ["How will I succeed?", "What are my competitors doing?", "What would guarantee failure? Then avoid those things.", "What has worked historically?"], answer: 2, funFact: "The great mathematician Carl Jacobi's motto was 'Invert, always invert.' Charlie Munger built much of Berkshire Hathaway's investment philosophy around Jacobi's inversion approach — always ask what you don't want, then avoid it." },
      { q: "Why does multitasking reduce productivity?", options: ["It makes you tired faster", "The brain task-switches, not truly multitasks — each switch costs 23 minutes of refocus time", "It's physically impossible", "Multitasking actually improves productivity for most people"], answer: 1, funFact: "A University of California Irvine study found that after an interruption, it takes an average of 23 minutes and 15 seconds to fully return to a task. A person checking email 10 times per day loses over 3 hours of productive focus daily to recovery time alone." }
    ]
  },
  wealth: { wealthSecret: { name: "The Latte Factor — Small Expenses Compounded", story: "David Bach popularised this idea: a daily ₹200 coffee habit seems trivial. But ₹200/day = ₹6,000/month = ₹72,000/year. Invested at 12% per year for 30 years, that ₹200/day becomes approximately ₹2.1 crore. The Latte Factor isn't about coffee — it's about becoming aware of small, unconscious spending that doesn't bring equivalent joy. Redirecting even 30% of that spending into investments transforms your long-term financial picture.", action: "Track every expense for one week — every single rupee. Categorise each as 'Brings me real joy' or 'Automatic/unconscious spending.' Calculate what the 'automatic spending' adds up to per year. Then per decade. Be shocked.", mnemonic: "₹200/day → ₹2.1 crore over 30 years. The latte hides a crore ☕➡️💰" },
    moneyMachine: { type: "Fixed Deposits vs Debt Mutual Funds", eli5: "Most Indians park savings in Fixed Deposits at 6-7%. But debt mutual funds — which invest in government bonds and AAA-rated company debt — often yield 7-9% with more tax efficiency. Here's the tax trick: FD interest is taxed at your slab rate (up to 30%). Debt fund gains held over 3 years are taxed at 20% with indexation (adjusting for inflation) — often making the effective tax much lower. Same safety, potentially better after-tax returns.", indiaAngle: "Liquid funds and ultra-short-term debt funds are better alternatives to savings accounts for your emergency fund — slightly better returns while still being withdrawable in 1-2 business days.", mnemonic: "Debt fund > FD for tax efficiency if held 3+ years. Same safety, better deal 📄" },
    mindsetFlip: { oldThinking: "I need to earn more money before I can start investing", newThinking: "Start investing the amount you have now — even ₹500 — and the habit and knowledge compound before the money does", why: "The most valuable thing about starting with ₹500/month is not the ₹500 — it's that you learn how markets work, develop the habit of investing, and build emotional resilience before the stakes are high. By the time you can afford ₹5,000/month, you'll invest with confidence instead of paralysis.", mnemonic: "Start with ₹500. Buy the habit and knowledge, not just the return 🌱" },
    magicNumber: { number: "The 50-30-20 Rule", eli5: "The simplest budgeting rule: 50% of your income on needs (rent, food, transport), 30% on wants (entertainment, dining out, shopping), 20% on savings and investments. Most Indians flip this accidentally — spending 80-90% and saving 10%. The 50-30-20 rule makes the invisible boundary explicit. If your 'needs' exceed 50%, you either need to earn more or reduce fixed costs.", mnemonic: "50 needs + 30 wants + 20 saves = Simple money blueprint 📊" },
    quiz: [
      { q: "The 'Latte Factor' concept is about...", options: ["Avoiding all spending on coffee", "Becoming aware that small daily expenses compound into enormous sums over decades", "Saving 1% of income on every purchase", "Only spending on necessities"], answer: 1, funFact: "David Bach calculated that a New Yorker spending $5/day on coffee and $6/day on a bagel, invested instead at 10%, would have $2 million over 40 years. The same principle works in rupees with Indian returns." },
      { q: "Why can debt mutual funds be more tax-efficient than Fixed Deposits?", options: ["Debt funds pay no taxes ever", "FD interest is taxed at full slab rate; debt fund gains held 3+ years benefit from indexation, reducing effective tax", "The government subsidises debt funds", "FDs have hidden fees that reduce returns"], answer: 1, funFact: "The indexation benefit on debt funds adjusts your purchase price for inflation before calculating gains. If inflation was 6% and your debt fund returned 8%, you're only taxed on the 2% real gain — not the full 8%." },
      { q: "The 50-30-20 rule allocates 20% of income to...", options: ["Entertainment", "Savings and investments", "Food and transport", "Housing"], answer: 1, funFact: "Elizabeth Warren (US Senator) and her daughter Amelia Warren Tyagi popularised the 50-30-20 rule in their 2005 book 'All Your Worth.' The book was written for ordinary Americans but the principle applies universally — the percentages may need adjusting in high-rent cities." }
    ]
  },
  communication: { speakingSkill: { name: "PREP Framework — Point, Reason, Evidence, Point", story: "The world's best impromptu speakers use a secret four-step structure that makes even an unprepared answer sound polished. PREP: State your Point (main answer in one sentence). Give your Reason (why you believe it). Provide Evidence (example, statistic, or story). Restate your Point (reinforce the conclusion). Barack Obama used PREP-style thinking in almost every interview. It converts scattered thoughts into clear, structured responses in real time.", drill: "Every day, randomly pick a topic (any news headline, any question) and give a 90-second PREP answer. Record it. The structure becomes automatic within 2 weeks.", mnemonic: "PREP = Point, Reason, Evidence, Point. Never be lost for words again 🎤" },
    negotiationMove: { tactic: "The Flinch — React Physically to Offers", eli5: "When someone gives you a price or offer, react with visible surprise — a slight wince, a sharp intake of breath, 'that's much more than I expected.' This physical 'flinch' creates psychological pressure without a single negotiation word. The other person immediately starts questioning whether their price was reasonable. Studies show people concede an average of 10-20% after a flinch, even before any counter-argument is made.", script: "Seller says: '₹15,000 for this service.' You wince slightly: 'Oh wow, that's quite a bit more than I was anticipating.' Then stay silent. Watch what happens.", mnemonic: "The Flinch: Visible surprise + silence = Instant price concession, no words needed 😬" },
    officeWin: { rule: "Prepare three smart questions before every meeting you attend", story: "Person A attends meetings passively — answers when asked, nods along. Person B walks in with three prepared questions based on the agenda. Person B's questions show they read the material, thought critically, and have an opinion. Who is perceived as more engaged, more valuable, more leadership material? The same content, completely different perception based on one simple preparation habit.", mistake: "Most people prepare what they'll SAY in meetings. Very few prepare what they'll ASK. Questions signal intelligence and engagement more than answers do.", mnemonic: "3 prepared questions per meeting = Smartest person in the room, effortlessly 🙋" },
    confidenceHack: { technique: "The Name Game — Use People's Names Deliberately", science: "Dale Carnegie's research found that a person's name is, to that person, the sweetest sound in any language. MRI studies confirm: hearing your own name activates the brain's self-referential processing — it literally turns on self-awareness and engagement. Using someone's name once in a conversation increases how positively they feel about the interaction by measurable amounts.", doItNow: "In your next conversation with anyone — colleague, client, vendor — use their name at least twice. Once at the start ('Great to connect, [Name]') and once during a key point ('That's exactly what I mean, [Name].'). Notice the shift.", mnemonic: "Names = Sweetest sound. Use once to connect, twice to bond 🗣️" },
    quiz: [
      { q: "PREP stands for...", options: ["Prepare, Research, Execute, Present", "Point, Reason, Evidence, Point", "Problem, Resolution, Evidence, Plan", "Premise, Rationale, Example, Point"], answer: 1, funFact: "Toastmasters International — a global public speaking organisation with 300,000 members — teaches PREP as the primary structure for impromptu speaking. Its simplicity is why it works under pressure when complex frameworks fail." },
      { q: "The negotiation 'flinch' works by...", options: ["Physically threatening the other party", "Creating psychological uncertainty about whether the offer is reasonable, through visible surprise", "Showing you're not interested in the deal", "Giving you time to think of a counter-offer"], answer: 1, funFact: "Herb Cohen, in his classic book 'You Can Negotiate Anything,' calls the flinch the easiest negotiation tactic anyone can use. He says it works even on professional negotiators who know the technique — because the response is partly instinctive." },
      { q: "Using someone's name in conversation works because...", options: ["It's a social protocol they expect", "Hearing your own name activates self-referential brain processing and increases positive engagement", "It shows you have good memory", "People are more likely to agree with those who know their names"], answer: 1, funFact: "In a classic Harvard study, waiters who repeated customers' orders back to them (using their names when possible) received 70% more in tips than those who just said 'coming right up.' The personalisation created connection." }
    ]
  },
  mind: { brainHack: { name: "The Zeigarnik Effect — Your Brain Can't Forget Unfinished Tasks", eli5: "Soviet psychologist Bluma Zeigarnik discovered something fascinating: waiters in a coffee shop could perfectly remember complex ongoing orders — but forgot them completely once the orders were delivered and paid for. Your brain holds incomplete tasks in active working memory until they're done. This is why you remember a task you forgot to complete all day — and why half-finished projects keep nagging at you. Understanding this helps you use it: doing just 5 minutes of a dreaded task makes your brain 'open the loop' and you naturally want to continue.", protocol: "When you can't start a big project, start just one tiny piece — write the first sentence, open the document, make one phone call. The Zeigarnik loop opens and your brain now naturally pulls you toward completing it.", mnemonic: "Zeigarnik: Open the loop with 5 minutes → Brain naturally wants to close it 🔄" },
    disciplineCode: { principle: "Keystone Habits — The One Habit That Changes Everything", story: "Charles Duhigg discovered that certain habits — he called them 'keystone habits' — have a cascade effect. When people start exercising regularly, they spontaneously start eating better, sleeping better, and spending more productively — without trying. When people start making their bed every morning, their entire domestic life improves. Keystone habits reshape other habits around them. Identifying your keystone habit is more powerful than trying to fix 10 separate behaviours simultaneously.", todayAction: "Pick your ONE keystone habit — the one change that would make everything else easier. For most people it's: sleep, exercise, or meditation. Start with just 2 minutes of it daily for 7 days.", mnemonic: "Keystone habit = One domino that knocks over a dozen others 🎯🃏" },
    impulseKiller: { urge: "Anger — reacting before thinking in conflicts", eli5: "When you feel threatened, insulted, or wronged, your brain's amygdala fires before your rational cortex has time to process. You react from pure emotion — the ancient fight-or-flight brain takes over for 6-8 seconds before logic catches up. During those 6-8 seconds you can say things you deeply regret. Understanding this gives you one move: create a 10-second gap between the trigger and your response.", interrupt: "When you feel sudden anger rising: bite your tongue (literally), look away, take one slow breath through your nose. Count silently to 10. By the time you've counted, the amygdala hijack has partially passed and your prefrontal cortex (rational brain) has taken back control.", mnemonic: "Amygdala hijack lasts 6-8 seconds. 10-second count = Rational brain wins 🧠⏱️" },
    bodyUpgrade: { practice: "Deliberate Heat Exposure — Sauna", eli5: "Using a sauna (or even a very hot bath) for 20 minutes triggers a series of beneficial responses: growth hormone spikes, heat shock proteins repair cellular damage, and mood-enhancing compounds are released. A Finnish study found that men who used sauna 4-7 times per week had a 40% lower risk of heart disease. The heat stress is beneficial — the body responds to controlled stress by growing stronger, just like exercise.", minimumDose: "Even 15-20 minutes in a hot bath or steam room 2-3 times per week produces measurable benefits. A proper sauna session is 80-100°C for 15-20 minutes.", mnemonic: "Sauna = Controlled heat stress → Body gets stronger. Sweat for free health benefits 🧖" },
    quiz: [
      { q: "The Zeigarnik Effect explains why...", options: ["Completed tasks are remembered better than incomplete ones", "Incomplete tasks stay active in your memory, nagging at you until finished", "People forget things when stressed", "Memory improves with age"], answer: 1, funFact: "Netflix deliberately ends episodes at unresolved cliff-hangers to exploit the Zeigarnik Effect — your brain holds the open loop and drives you to watch the next episode to close it. The 'autoplay next episode' feature is Zeigarnik weaponised for binge-watching." },
      { q: "A 'keystone habit' is powerful because...", options: ["It is the hardest habit to break", "It cascades — automatically improving other habits around it", "It requires the most willpower", "It is always health-related"], answer: 1, funFact: "Duhigg's research found that exercise is the most common keystone habit. When people begin consistent exercise, they spontaneously start sleeping more, eating less junk food, and using credit cards less — even though they never intentionally decided to change those things." },
      { q: "During an 'amygdala hijack' (sudden anger), how long does the emotional surge dominate before rational thinking returns?", options: ["30 seconds to 1 minute", "About 6-8 seconds", "2-3 minutes", "Immediately, if you try hard enough"], answer: 1, funFact: "The term 'amygdala hijack' was coined by Daniel Goleman in his book 'Emotional Intelligence.' The amygdala (emotional brain) fires faster than the prefrontal cortex (rational brain) because it evolved millions of years earlier. Physical movements — a slow breath, walking away — help override it chemically." }
    ]
  },
  knowledge: { mathMagic: { concept: "Statistics — Mean, Median, and Why Averages Lie", eli5: "Imagine 9 people in a room each earn ₹50,000/month. One person earns ₹50 lakh/month. The average (mean) salary in that room is ₹550,000 — which represents nobody's actual experience. The median (middle value) is ₹50,000 — much more representative of what most people earn. This is why when someone says 'average household income is X,' you should always ask: 'Is that mean or median?' The rich person's income can make everyone else look wealthier than they are.", realWorldUse: "In investing: average annual returns of 12% hide enormous variation — some years +40%, some years -30%. The sequence of those returns matters enormously, not just the average. Always ask 'what's the distribution?' not just 'what's the average?'", mnemonic: "Mean = All values averaged. Median = Middle value. One billionaire in a room ruins the mean 💰" },
    scienceWow: { concept: "Black Holes — Where Physics Breaks", field: "Astrophysics", eli5: "A black hole is a place where gravity becomes so strong that even light can't escape. It forms when a massive star runs out of fuel and collapses under its own gravity. The boundary of no return is called the event horizon — once you cross it, you cannot escape, even travelling at the speed of light. Inside the event horizon, our understanding of physics completely breaks down — Einstein's equations give nonsensical answers. Black holes are nature's way of saying: 'You've hit the edge of your mathematics.'", mindBlow: "There is a supermassive black hole at the centre of our galaxy — the Milky Way — called Sagittarius A*. It is 4 million times the mass of our Sun. The Earth orbits around the galaxy, and the galaxy orbits this black hole. We are all orbiting a monster.", mnemonic: "Black hole = Gravity prison where even light is trapped. Physics breaks inside 🕳️" },
    historyStory: { event: "The Roman Roads — Infrastructure That Outlasted an Empire", story: "The Roman Empire built 80,000 km of roads — so well engineered that some are still in use 2,000 years later. The roads had layers: large stones at the bottom, sand and gravel in the middle, flat paving stones on top, with drainage ditches on each side. Roman roads enabled the fastest communication and troop movement the ancient world had ever seen. More importantly, after Rome fell, those roads continued to shape trade, language, and borders for centuries — the empire died but its infrastructure lived on.", lesson: "Infrastructure outlasts empires. The roads India builds today will shape commerce, language spread, and regional development for decades. Infrastructure is the longest-lasting investment any society can make.", mnemonic: "Roman roads = 2,000 years later, still being driven on. Infrastructure = the ultimate legacy 🛣️" },
    earthSecret: { place: "The Dead Sea, Jordan/Israel", secret: "The Dead Sea is the lowest point on Earth's surface — 430 metres below sea level. It's 10 times saltier than the ocean, meaning the water is so dense that you literally cannot sink in it — you float like a rubber duck. No fish, no plants, no animals can live in it (hence 'dead'). But the mineral-rich mud has been used for skin treatments since ancient times — Cleopatra reportedly had mud shipped to Egypt from the Dead Sea.", edge: "The Dead Sea is also shrinking rapidly — it loses about 1 metre in water level per year due to diversion of the Jordan River. Within your lifetime, it may shrink dramatically. Understanding environmental change in the region helps predict water wars in the Middle East.", mnemonic: "Dead Sea = Earth's lowest point. Float without trying. Shrinking 1 metre per year 🌊" },
    quiz: [
      { q: "Why is the median often more useful than the mean (average)?", options: ["It's easier to calculate", "It's not affected by extreme outliers — one billionaire can raise the average salary to misrepresent most people's reality", "It gives the same result as the mean", "Medians are always higher than means"], answer: 1, funFact: "In 2022, Elon Musk's net worth added to American wealth statistics raised the average American's net worth by over $300 — even though zero ordinary Americans got richer. Means are routinely manipulated by outliers." },
      { q: "What is the event horizon of a black hole?", options: ["The outermost layer of a star before collapse", "The boundary beyond which nothing, not even light, can escape the black hole's gravity", "The accretion disk of gas surrounding a black hole", "The point where a black hole begins to form"], answer: 1, funFact: "The first image of a black hole was captured in 2019 by the Event Horizon Telescope — a network of radio telescopes spanning the entire Earth. The black hole photographed is in galaxy M87 and is 6.5 billion times the mass of our Sun." },
      { q: "Roman roads were so durable because they were built with...", options: ["A single layer of large flat stones", "Multiple engineered layers: large stones, gravel, paving stones, with drainage ditches", "Volcanic rock only found near Rome", "A secret Roman cement formula"], answer: 1, funFact: "Roman roads were built with a slight camber (curve) from centre to edge so rainwater drained off immediately. This engineering principle is still used in modern road design 2,000 years later." }
    ]
  },
  ai: { toolSpotlight: { name: "Gemini Advanced (Google)", category: "Research / Multimodal Analysis", eli5: "Google's most powerful AI can do something the others struggle with: it can look at images, PDFs, spreadsheets, and long documents all at once and reason about them together. Upload a 100-page research report and ask 'what are the three biggest risks mentioned?' It reads the whole thing and answers. It can also search the real web in real time — so its information is always current, not limited by a training cutoff.", secretMove: "Use Gemini's 'upload and ask' feature for any document you're struggling to read quickly. Financial reports, legal contracts, academic papers — upload and ask specific questions. It reads them faster than you ever could and pulls out exactly what you need.", mnemonic: "Gemini = AI that reads ANY document format + searches the web. Swiss Army Knife of AI 🔍" },
    workflowWin: { title: "Contract and Document Quick-Review System", problem: "Most people don't read contracts carefully — they're long, boring, and full of jargon. Then they get surprised by clause 47.", steps: ["When you receive any contract, agreement, or long document — upload it to Claude or Gemini", "Ask: 'What are the 5 most important things I should know before signing this? What could hurt me?'", "Ask: 'Are there any unusual or non-standard clauses in this document?'", "Ask: 'What questions should I ask the other party before agreeing?'"], timeSaved: "Replaces 2-3 hours of anxious document reading with 10 focused minutes — and finds things you'd miss.", mnemonic: "Upload contract → AI finds the traps → You negotiate knowing everything 📋🛡️" },
    promptOfDay: { purpose: "Create a personalised learning plan for any skill", prompt: "I want to learn [SKILL] and I currently know [your current level — beginner/some basics/intermediate]. My goal is to [specific outcome, e.g. 'get a job as a data analyst' / 'speak conversational Spanish' / 'invest confidently in stocks']. I have [X hours per week] available. Create a detailed 12-week learning plan with: week-by-week milestones, specific resources for each week (free and paid), how to measure progress, and what to do if I fall behind.", where: "Claude, ChatGPT, or Gemini", mnemonic: "12-week plan from one prompt = Your personal curriculum, instantly built 📚" },
    futureWatch: { trend: "Multimodal AI — AI that sees, reads, and listens simultaneously", eli5: "First generation AI: text in, text out. Now: image in, text out. Next (here now): text + image + audio + video + documents all at once — processed together. You can show an AI a photo of your room and ask 'what furniture should I add?' You can upload a meeting recording and ask 'what was the most important decision made?' The AI understands context across all formats simultaneously. This fundamentally changes research, analysis, and creative work.", yourMove: "Start experimenting with uploading different types of content to AI. A photo of a problem, a PDF of a report, an audio of a meeting. The people who understand how to feed AI multimodal context will be dramatically more powerful researchers and analysts.", mnemonic: "Multimodal AI = Eyes + Ears + Reading + Thinking, all at once 👁️👂📖🧠" },
    quiz: [
      { q: "What makes Gemini Advanced particularly useful for document analysis?", options: ["It's faster than other AIs", "It can process images, PDFs, spreadsheets, and long documents simultaneously, plus search the real web", "It costs less than other AI tools", "It works without internet connection"], answer: 1, funFact: "Gemini's context window — the amount of text it can read at once — is 1 million tokens, equivalent to approximately 700,000 words or about 10 novels. This allows it to analyse entire books or large document libraries in one session." },
      { q: "The contract review AI workflow saves time by...", options: ["Automatically signing contracts for you", "Reading and summarising the most important and unusual clauses in minutes instead of hours", "Negotiating contracts on your behalf", "Translating legal language to plain text only"], answer: 1, funFact: "A 2024 Stanford study found that AI contract review tools identified 95% of material clauses that experienced lawyers found, in 1/10th the time. For standard contracts, AI review is now comparable to junior lawyer review." },
      { q: "Multimodal AI processes...", options: ["Only text", "Text and images only", "Text, images, audio, video, and documents simultaneously", "Only voice commands"], answer: 2, funFact: "GPT-4o ('o' for omni) was the first major multimodal model to process text, images, and audio in real time. In a live demonstration, it read someone's handwritten homework, explained the mistakes, and described the emotional expression of the student in the photo — all simultaneously." }
    ]
  },
  travel: { destination: { country: "Turkey", region: "Istanbul & Cappadocia", eli5: "Istanbul is the only city in the world that sits on two continents — Europe and Asia — connected by bridges over the Bosphorus strait. The Blue Mosque and Hagia Sophia stand side by side, 1,500 years of history in a single square. The Grand Bazaar has been open continuously for 500 years. Cappadocia — 10 hours south by bus or 1 hour by plane — looks like an alien planet: ancient cave hotels carved into volcanic rock formations, and hot air balloons rising at dawn over fairy chimneys.", bestTime: "April-June or September-November — warm and dry, without the summer crowds and heat. Avoid July-August in Istanbul (extremely hot and overcrowded).", hiddenGem: "In Cappadocia, get up at 4:30am to watch the balloon launch — hundreds of hot air balloons rising as the sun comes up over the valleys. You don't need to be in a balloon — the ground view is equally magical and free.", mnemonic: "Istanbul = 2 continents, 1 city. Cappadocia = Alien planet with cave hotels 🌍🪨" },
    visaTip: { focus: "Turkey E-Visa for Indian Passport Holders", eli5: "India and Turkey have an e-visa agreement — Indians can apply online at evisa.gov.tr in about 10 minutes. The e-visa is approved within hours and costs approximately $50 USD. It's valid for 30 days (single entry) or 90 days (multiple entry). You need a valid passport, credit card, and email address. No embassy visit required.", goldenTip: "Apply at least 48 hours before travel — e-visas are usually instant, but occasionally take up to 24 hours. Print or save to phone. Turkish immigration will check it at entry.", mnemonic: "Turkey e-visa = 10 minutes online, $50, instant approval. Easiest visa in the world 💻✈️" },
    culturalCode: { culture: "Turkey", doThis: "Accept tea (çay — pronounced 'chai') when offered — it's served in beautiful tulip-shaped glasses and refusing is mildly impolite. Turks are extraordinarily hospitable; if someone invites you home, go — Turkish home hospitality is a life experience. Also: remove shoes at home entrances, and always greet elders first.", neverDoThis: "Never confuse Turkey with Arab culture or call it 'Arab.' Turkey is a predominantly Muslim but secular country with its own distinct Turkic culture, language, and identity. Also never put your feet on furniture or point your foot at someone — feet are considered unclean and pointing your sole at someone is an insult.", mnemonic: "Turkey: Accept çay, never call it Arab, feet off furniture and never point soles 🍵" },
    quiz: [
      { q: "What makes Istanbul geographically unique?", options: ["It's the world's oldest continuously inhabited city", "It's the only city in the world spanning two continents — Europe and Asia", "It's entirely built on islands", "It's the closest city to the North Pole"], answer: 1, funFact: "The Bosphorus strait that divides Istanbul into European and Asian sides is only 700 metres wide at its narrowest point — you can swim across it. An annual swimming race called the 'Bosphorus Cross-Continental Swimming Race' takes place every year." },
      { q: "Turkish e-visa applications take approximately how long?", options: ["2-3 weeks", "3-5 business days", "About 10 minutes to apply, hours to receive approval", "Must be done at embassy in person"], answer: 2, funFact: "Turkey processes over 5 million e-visa applications per year — making it one of the world's most efficient visa systems. The entire system was built in partnership with a private tech company and launched in 2013, replacing a paper sticker visa that caused massive airport queues." },
      { q: "What is çay and when should you accept it in Turkey?", options: ["A type of Turkish dessert — accept when hungry", "Turkish tea — accept when offered, as refusing is mildly impolite", "A traditional greeting gesture", "A type of Turkish coffee — strong and sweet"], answer: 1, funFact: "Turkey is the world's largest consumer of tea per capita — an average Turkish person drinks over 3 kg of tea per year. The tulip-shaped tea glass is iconic and the tea is always served without milk, unlike British or Indian tea traditions." }
    ]
  }
}

const d260603 = {
  "news": {
    "segments": [
      {
        "name": "🌐 What's happening with countries?",
        "color": "#a0d4f5",
        "stories": [
          {
            "headline": "New peace agreement signed in the Middle East.",
            "eli5": "Imagine two kids fighting over a toy. They finally agree to share it. Now they can play together happily. This agreement is like that for countries.",
            "whyItMatters": "Peace helps everyone live better lives.",
            "mnemonic": "P for Peace, P for Play."
          },
          {
            "headline": "A major election in Brazil brings change.",
            "eli5": "Think of a school class picking a new leader. The new leader wants to change how things are done. It can be exciting and scary at the same time.",
            "whyItMatters": "New leaders can bring fresh ideas.",
            "mnemonic": "B for Brazil, B for Brave."
          },
          {
            "headline": "Tensions rise between two neighboring countries.",
            "eli5": "It's like two dogs barking at each other. They might fight if they don’t calm down. Leaders need to talk it out to avoid trouble.",
            "whyItMatters": "Avoiding conflict is key for safety.",
            "mnemonic": "N for Neighbors, N for Nerves."
          }
        ]
      },
      {
        "name": "💸 What's happening with money?",
        "color": "#a8edcb",
        "stories": [
          {
            "headline": "Global inflation rates are stabilizing.",
            "eli5": "Imagine a balloon slowly losing air. It was too inflated before. Now it's more balanced, making it easier to hold.",
            "whyItMatters": "Stable prices help people budget better.",
            "mnemonic": "B for Balloon, B for Balance."
          },
          {
            "headline": "New cryptocurrency regulations are introduced.",
            "eli5": "Think of a game with new rules. It can change how players act and interact. Regulations can make the game safer.",
            "whyItMatters": "Clear rules protect investors.",
            "mnemonic": "C for Crypto, C for Clear."
          },
          {
            "headline": "Stocks rally after a tough week.",
            "eli5": "Like a runner who trips but gets back up and finishes strong. Investors feel hopeful again.",
            "whyItMatters": "Market confidence impacts everyone’s savings.",
            "mnemonic": "R for Rally, R for Recovery."
          }
        ]
      },
      {
        "name": "💻 What's happening with technology?",
        "color": "#c9b8f5",
        "stories": [
          {
            "headline": "A breakthrough in AI technology announced.",
            "eli5": "Imagine a robot learning to ride a bike. It falls at first, but soon it’s zooming around. This AI can do more complex tasks now.",
            "whyItMatters": "Advanced AI can help solve big problems.",
            "mnemonic": "A for AI, A for Amazing."
          },
          {
            "headline": "New smartphone model released with unique features.",
            "eli5": "Think of a magician pulling a new trick from their hat. This phone has surprises that make it special.",
            "whyItMatters": "Innovation keeps technology exciting.",
            "mnemonic": "S for Smartphone, S for Surprise."
          }
        ]
      },
      {
        "name": "🌿 What's happening with our planet?",
        "color": "#f5c6a0",
        "stories": [
          {
            "headline": "New global climate agreement signed.",
            "eli5": "Imagine friends promising to take care of a garden together. They work hard to keep it healthy for everyone.",
            "whyItMatters": "Working together can help fight climate change.",
            "mnemonic": "G for Garden, G for Global."
          },
          {
            "headline": "Wildlife conservation efforts show positive results.",
            "eli5": "Like a puppy being trained to behave. With care and support, animals can thrive again in their homes.",
            "whyItMatters": "Healthy wildlife means a balanced ecosystem.",
            "mnemonic": "W for Wildlife, W for Win."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "What is the main benefit of the new peace agreement in the Middle East?",
        "options": [
          "More toys",
          "Better relationships",
          "More fighting",
          "Less sharing"
        ],
        "answer": 1,
        "funFact": "Peace can lead to better trade and friendship."
      },
      {
        "q": "Why are regulations on cryptocurrency important?",
        "options": [
          "More confusion",
          "Less safety",
          "More protection",
          "Less investment"
        ],
        "answer": 2,
        "funFact": "Regulations help prevent scams and fraud."
      },
      {
        "q": "What does a stable inflation rate help with?",
        "options": [
          "Budgeting",
          "Spending more",
          "Buying less",
          "Saving nothing"
        ],
        "answer": 0,
        "funFact": "Stable prices mean fewer surprises when shopping."
      }
    ]
  },
  "markets": {
    "globalPulse": {
      "eli5": "Imagine a big river. It flows smoothly, but sometimes there are rocks and rapids. Today, global markets are like that river, with some strong currents and a few bumps along the way.",
      "keyThings": [
        "S&P500: Showing steady growth, like a reliable boat moving downstream.",
        "Brent: Prices rising, similar to a sudden splash of water from a nearby waterfall.",
        "Gold: Holding steady, like a rock in the riverbed, unaffected by the flow.",
        "Nifty: Slightly turbulent, with investors paddling through mixed signals."
      ]
    },
    "indianMarket": {
      "eli5": "Think of a bustling bazaar. Some stalls are booming, while others are quiet. Today, traders are looking for the next best deal in the crowd.",
      "breakouts": [
        {
          "name": "NSE:RELIANCE — Reliance Industries",
          "whyExciting": "This company is launching a new product that everyone is talking about. It’s like a stall with a fresh, delicious snack that draws a crowd.",
          "risk": "But if the product flops, the buzz could die down quickly."
        },
        {
          "name": "NSE:TCS — Tata Consultancy Services",
          "whyExciting": "TCS just landed a big contract, like getting a prime spot in the bazaar. Everyone wants to see what they’ll sell next.",
          "risk": "However, changes in technology could shake their steady sales."
        },
        {
          "name": "NSE:INFY — Infosys",
          "whyExciting": "Infosys is expanding into new markets, like a stall branching out to new neighborhoods. It could attract more customers.",
          "risk": "Yet, they face stiff competition from other vendors."
        }
      ],
      "ipoSpot": {
        "name": "NSE:XYZTECH",
        "verdict": "Apply",
        "eli5": "This new company has a cool gadget that could be a hit. It’s like a trendy shop opening up with lots of buzz."
      },
      "lessonOfDay": {
        "title": "The Tortoise and the Hare",
        "story": "In investing, slow and steady wins the race. Like the tortoise, consistent growth is better than quick gains that disappear. Don't rush; keep your eyes on long-term success.",
        "mnemonic": "Slow and steady wins the race."
      }
    },
    "quiz": [
      {
        "q": "What is the S&P500?",
        "options": [
          "A stock index",
          "A type of gold",
          "A kind of oil",
          "A bond market"
        ],
        "answer": 0,
        "funFact": "The S&P500 includes 500 of the largest companies in the U.S."
      },
      {
        "q": "What does IPO stand for?",
        "options": [
          "International Public Offering",
          "Initial Public Offering",
          "Investment Purchase Option",
          "Internal Price Offering"
        ],
        "answer": 1,
        "funFact": "An IPO is when a company sells its shares to the public for the first time."
      },
      {
        "q": "Why is gold often seen as a safe investment?",
        "options": [
          "It’s shiny",
          "It retains value",
          "It’s easy to sell",
          "It’s rare"
        ],
        "answer": 1,
        "funFact": "Gold has been valued for thousands of years, making it a trusted store of value."
      }
    ]
  },
  "psychology": {
    "mindTrick": {
      "name": "Cognitive Dissonance",
      "eli5": "Imagine you love ice cream but you just learned it’s bad for your health. You feel confused. So you tell yourself a small lie: 'It’s okay to have it sometimes.' This helps you feel better about your choice.",
      "realLife": "People often struggle with choices that clash with their beliefs. They adjust their thoughts to live with their decisions.",
      "mnemonic": "CD for Conflicting Decisions."
    },
    "bodyLanguage": {
      "signal": "Crossed Arms",
      "eli5": "When someone crosses their arms, it looks like they’re hugging themselves. They might be cold or feeling shy. It can also mean they are closed off to ideas.",
      "howToUse": "Watch for crossed arms in conversations. If you see it, try to open the discussion to make the person feel more comfortable.",
      "mnemonic": "CA for Closed Arms."
    },
    "superpower": {
      "name": "Empathy",
      "story": "Once, a girl named Mia saw a friend crying. Instead of ignoring her, Mia sat down and listened. She felt her friend's sadness like it was her own. This made their friendship stronger.",
      "shield": "Empathy helps you connect with others. But remember to take care of your own feelings too.",
      "mnemonic": "E for Everyone’s Emotions."
    },
    "quiz": [
      {
        "q": "What does cognitive dissonance mean?",
        "options": [
          "Feeling two conflicting emotions",
          "Understanding others' feelings",
          "Being physically unwell",
          "Making poor choices"
        ],
        "answer": 0,
        "funFact": "People often change their beliefs to match their actions, which can lead to surprising insights."
      },
      {
        "q": "What does crossed arms usually indicate?",
        "options": [
          "Happiness",
          "Defensiveness",
          "Surprise",
          "Excitement"
        ],
        "answer": 1,
        "funFact": "Body language can sometimes tell us more than words can."
      },
      {
        "q": "Why is empathy important?",
        "options": [
          "It helps you win arguments",
          "It builds stronger relationships",
          "It makes you popular",
          "It shows weakness"
        ],
        "answer": 1,
        "funFact": "Empathy can lead to better teamwork and cooperation."
      }
    ]
  },
  "leadership": {
    "leaderMove": {
      "name": "Empathy in Action",
      "story": "Imagine a campfire where everyone shares their stories. One person listens intently, making others feel seen. The flame of connection grows brighter. Together, they create a warm, inviting space.",
      "doThis": "Practice active listening with your team today. Let them know their voices matter.",
      "mnemonic": "E.A. - Empathy Amplifies"
    },
    "visionarySecret": {
      "concept": "The Power of Perspective",
      "eli5": "Think of a kaleidoscope. Each twist shows a new pattern, just like ideas can change with different views. When you see things from another angle, solutions appear. It's like finding hidden treasures.",
      "exercise": "Try to view a challenge from three different perspectives. Write down what you discover.",
      "mnemonic": "P.P. - Perspective Paves"
    },
    "eliteHabit": {
      "habit": "Daily Reflection",
      "whoAndHow": "Great leaders like Nelson Mandela reflected each day. Spend 10 minutes reviewing your actions and thoughts.",
      "whyItWorks": "Reflection helps clarify your goals. It’s like polishing a mirror to see your true self.",
      "mnemonic": "R.R. - Reflect to Reconnect"
    },
    "sigmaWisdom": {
      "lesson": "Control Your Response",
      "story": "Picture a calm lake. A rock thrown in creates ripples, but the lake remains undisturbed. Like the lake, we can choose not to react to every disturbance.",
      "action": "Pause before responding to provocation.",
      "mnemonic": "C.R. - Calm Response"
    },
    "quiz": [
      {
        "q": "What is the key to effective listening?",
        "options": [
          "Interrupting",
          "Active listening",
          "Ignoring",
          "Daydreaming"
        ],
        "answer": 1,
        "funFact": "Active listening can improve relationships by showing you care!"
      },
      {
        "q": "What can help you see new solutions?",
        "options": [
          "Stubbornness",
          "Perspective",
          "Avoiding challenges",
          "Fearing change"
        ],
        "answer": 1,
        "funFact": "Changing your viewpoint can reveal hidden opportunities!"
      },
      {
        "q": "Why is daily reflection important?",
        "options": [
          "It wastes time",
          "It confuses you",
          "It clarifies your goals",
          "It's unnecessary"
        ],
        "answer": 2,
        "funFact": "Reflecting daily can boost your self-awareness and decision-making!"
      }
    ]
  },
  "wealth": {
    "wealthSecret": {
      "name": "The Seed of Wealth",
      "story": "Planting a seed takes patience. Over time, it grows into a strong tree. Each branch represents a new source of income. Nurture it, and it will bear fruit for years.",
      "action": "Start small with your investments. Water them consistently to see growth.",
      "mnemonic": "Seeds grow into wealth."
    },
    "moneyMachine": {
      "type": "Investment Portfolio",
      "eli5": "Imagine a vending machine that gives you snacks. You put in coins, and out come tasty treats. Your portfolio is like that machine, giving you money over time.",
      "indiaAngle": "In India, many are embracing stock markets like never before. Investing early can help secure a bright future for families.",
      "mnemonic": "Invest to receive."
    },
    "mindsetFlip": {
      "oldThinking": "Money is hard to come by.",
      "newThinking": "Money can flow to me easily.",
      "why": "Shifting your mindset opens up possibilities. When you believe, you attract opportunities. It’s like turning on a light in a dark room.",
      "mnemonic": "Think abundance."
    },
    "magicNumber": {
      "number": "50/30/20 Rule",
      "eli5": "Imagine a pizza divided into three slices. One slice is for needs, another for wants, and the last for savings. This helps you enjoy life while preparing for the future.",
      "mnemonic": "Slice your budget."
    },
    "quiz": [
      {
        "q": "What is the first step to growing wealth?",
        "options": [
          "Ignore it",
          "Invest small amounts",
          "Spend freely",
          "Save nothing"
        ],
        "answer": 1,
        "funFact": "The earlier you invest, the more time your money has to grow."
      },
      {
        "q": "What does a vending machine represent in finance?",
        "options": [
          "A toy",
          "A method to waste money",
          "An investment portfolio",
          "A bank"
        ],
        "answer": 2,
        "funFact": "Just like a vending machine, your portfolio can provide returns when you put in the right 'coins' or investments."
      },
      {
        "q": "What does the 50/30/20 rule focus on?",
        "options": [
          "Investing in stocks",
          "Budgeting your expenses",
          "Going on vacations",
          "Buying luxury items"
        ],
        "answer": 1,
        "funFact": "Proper budgeting helps you manage money smarter and prepares you for future needs."
      }
    ]
  },
  "communication": {
    "speakingSkill": {
      "name": "Martin Luther King Jr.",
      "story": "Martin Luther King Jr. spoke to thousands during the Civil Rights Movement. His 'I Have a Dream' speech changed hearts and minds. He used powerful imagery to paint a picture of hope.",
      "drill": "Practice speaking in front of a mirror. Focus on your tone and body language.",
      "mnemonic": "MLK = Motivating Language and Knowledge."
    },
    "negotiationMove": {
      "tactic": "The 'Win-Win' approach.",
      "eli5": "Imagine sharing a pizza. If you both take a slice, everyone gets to enjoy it. It's better than arguing over the biggest piece.",
      "script": "Let's find a solution that works for both of us. Teamwork can lead to great outcomes.",
      "mnemonic": "Pizza = Partnership in Zesty Negotiations."
    },
    "officeWin": {
      "rule": "Communicate clearly and often.",
      "story": "In one office, people whispered instead of talking. Confusion reigned, and projects stalled. In another, open discussions led to quick decisions and success.",
      "mistake": "Ignoring emails can lead to misunderstandings.",
      "mnemonic": "CLEAR = Communicate, Listen, Engage, Ask, Respond."
    },
    "confidenceHack": {
      "technique": "Power Posing.",
      "science": "Standing tall can boost your confidence. It tricks your brain into feeling powerful.",
      "doItNow": "Find a private space. Stand like a superhero for two minutes.",
      "mnemonic": "POSE = Power Over Self-Expression."
    },
    "quiz": [
      {
        "q": "Who delivered the famous 'I Have a Dream' speech?",
        "options": [
          "A. Nelson Mandela",
          "B. Martin Luther King Jr.",
          "C. Mahatma Gandhi",
          "D. Barack Obama"
        ],
        "answer": 1,
        "funFact": "MLK delivered his speech during the 1963 March on Washington."
      },
      {
        "q": "What does the 'Win-Win' approach emphasize?",
        "options": [
          "A. Compromise",
          "B. Personal Gain",
          "C. Mutual Benefit",
          "D. Competition"
        ],
        "answer": 2,
        "funFact": "Win-Win negotiations can build long-term relationships."
      },
      {
        "q": "What is a common mistake in office communication?",
        "options": [
          "A. Too many meetings",
          "B. Ignoring emails",
          "C. Over-communicating",
          "D. Using jargon"
        ],
        "answer": 1,
        "funFact": "Ignoring emails can lead to missing important updates."
      }
    ]
  },
  "mind": {
    "brainHack": {
      "name": "Focus Fire",
      "eli5": "Imagine a wild horse running free. It’s beautiful but hard to control. When you focus on one direction, it runs straight and strong.",
      "protocol": "Find a quiet space. Set a timer for 10 minutes. Focus on one task until the timer rings.",
      "mnemonic": "FIRE: Focus, Intention, Resolve, Engage."
    },
    "disciplineCode": {
      "principle": "The Shield of Commitment",
      "story": "Once, a warrior faced many battles. He held his shield tight, never wavering. Each time he committed to his cause, he grew stronger.",
      "todayAction": "Pick one task and commit fully to it. Ignore distractions until it’s done.",
      "mnemonic": "SHIELD: Stay, Honor, Intend, Engage, Lead, Deliver."
    },
    "impulseKiller": {
      "urge": "snacking",
      "eli5": "Think of a monster that roars when you’re hungry. It’s loud and demanding, but it can be tamed.",
      "interrupt": "When you feel the urge to snack, drink a glass of water first. Wait 10 minutes to see if you still want it.",
      "mnemonic": "TAME: Tame the urge, Assess need, Make a choice, Evaluate."
    },
    "bodyUpgrade": {
      "practice": "Daily Stretching",
      "eli5": "Stretching is like watering a plant. It helps you grow strong and flexible.",
      "minimumDose": "Just 5 minutes a day can make a difference.",
      "mnemonic": "GROW: Gain, Release, Open, Win."
    },
    "quiz": [
      {
        "q": "What helps you focus better?",
        "options": [
          "Distractions",
          "Multiple tasks",
          "One task at a time",
          "Loud music"
        ],
        "answer": 2,
        "funFact": "Focusing on one task can improve your productivity by up to 50%!"
      },
      {
        "q": "What is a benefit of commitment?",
        "options": [
          "More stress",
          "Less focus",
          "Strengthened resolve",
          "More options"
        ],
        "answer": 2,
        "funFact": "Commitment can increase your chances of success significantly."
      },
      {
        "q": "What should you do before snacking?",
        "options": [
          "Grab a snack",
          "Eat dessert",
          "Drink water",
          "Ignore hunger"
        ],
        "answer": 2,
        "funFact": "Staying hydrated can often reduce false hunger signals."
      }
    ]
  },
  "knowledge": {
    "mathMagic": {
      "concept": "Probability",
      "eli5": "Imagine you have a bag of candies. Some are red, and some are blue. If you want a red candy, you count how many reds there are. The chance of picking a red candy is like the chance of winning a game — more reds mean higher chances!",
      "realWorldUse": "Probability helps us make decisions. It’s used in weather forecasts to tell us if it might rain.",
      "mnemonic": "P for Pick, R for Red."
    },
    "scienceWow": {
      "field": "Astronomy",
      "concept": "Black Holes",
      "eli5": "Picture a vacuum cleaner so strong that nothing can escape it, even light! A black hole is like that. It pulls everything in without a chance to come out. They are mysterious and make us wonder about the universe.",
      "mindBlow": "Some black holes are millions of times heavier than our sun! They warp space and time around them.",
      "mnemonic": "B for Big, H for Hungry."
    },
    "historyStory": {
      "event": "The First Moon Landing",
      "story": "In 1969, humans took a giant leap. Neil Armstrong stepped onto the moon. He said, 'That's one small step for man, one giant leap for mankind.' The world watched in awe as we proved we could reach beyond our planet.",
      "lesson": "This event showed us the power of teamwork and dreams. It reminds us that with determination, anything is possible.",
      "mnemonic": "M for Moon, L for Leap."
    },
    "earthSecret": {
      "place": "Iceland",
      "secret": "Iceland has geysers that shoot water high into the air! It’s like nature’s own fountain show. The hot springs can heat homes without using oil or gas.",
      "edge": "This helps reduce pollution and provides clean energy. It’s a great example of using nature wisely.",
      "mnemonic": "G for Geysers, H for Heat."
    },
    "quiz": [
      {
        "q": "What is the chance of picking a red candy from a bag?",
        "options": [
          "Probability",
          "Statistics",
          "Algebra",
          "Geometry"
        ],
        "answer": 0,
        "funFact": "Probability is used in games and decisions every day."
      },
      {
        "q": "What pulls everything in without escape?",
        "options": [
          "Star",
          "Planet",
          "Black Hole",
          "Comet"
        ],
        "answer": 1,
        "funFact": "Black holes are formed when massive stars collapse."
      },
      {
        "q": "Who first walked on the moon?",
        "options": [
          "Buzz Aldrin",
          "Neil Armstrong",
          "Yuri Gagarin",
          "John Glenn"
        ],
        "answer": 2,
        "funFact": "Neil Armstrong’s first step was watched by millions around the world."
      }
    ]
  },
  "ai": {
    "toolSpotlight": {
      "name": "Wordsmith AI",
      "category": "writing",
      "eli5": "Imagine a magic robot that helps you write stories. It knows words like a wizard knows spells. You tell it your ideas, and it crafts them into tales.",
      "secretMove": "Use the 'Inspire Me' feature for instant creativity boosts. It gives you fresh angles when you feel stuck.",
      "mnemonic": "Wizards write wonders."
    },
    "workflowWin": {
      "title": "Email Assistant",
      "problem": "Emails can pile up like a messy room. This tool helps you clean it up quickly and efficiently.",
      "steps": [
        "Connect your email account.",
        "Set rules for sorting messages.",
        "Automate replies for common questions.",
        "Schedule follow-ups automatically."
      ],
      "timeSaved": "You could save hours each week.",
      "mnemonic": "Clear inbox, clear mind."
    },
    "promptOfDay": {
      "purpose": "This helps you brainstorm ideas for a blog post.",
      "prompt": "Generate a list of 5 blog post ideas about [TOPIC].",
      "where": "Claude",
      "mnemonic": "Ideas bloom like flowers."
    },
    "futureWatch": {
      "trend": "AI-Powered Personal Assistants are becoming common.",
      "eli5": "Before, you had to do everything yourself like a busy bee. Now, imagine a helpful friend who takes care of tasks for you. Life is easier and more fun!",
      "yourMove": "Start using a personal assistant app to manage daily tasks. This could free up time for hobbies or family.",
      "mnemonic": "Less work, more play."
    },
    "quiz": [
      {
        "q": "What can AI help you with the most?",
        "options": [
          "Writing",
          "Cooking",
          "Gardening",
          "Painting"
        ],
        "answer": 0,
        "funFact": "AI has been shown to help writers be more creative!"
      },
      {
        "q": "Which tool helps organize your emails?",
        "options": [
          "Wordsmith AI",
          "Email Assistant",
          "Calendar Buddy",
          "Chat Helper"
        ],
        "answer": 1,
        "funFact": "An organized inbox can boost productivity by over 20%!"
      },
      {
        "q": "What is the purpose of the prompt of the day?",
        "options": [
          "To entertain",
          "To brainstorm",
          "To relax",
          "To compete"
        ],
        "answer": 1,
        "funFact": "Brainstorming with prompts can lead to amazing new ideas!"
      }
    ]
  },
  "travel": {
    "destination": {
      "country": "Japan",
      "region": "Kyoto",
      "eli5": "Kyoto is like a time machine. It takes you back to ancient Japan with its temples and gardens. Imagine walking through peaceful streets lined with cherry blossoms. The food here is also a delicious adventure.",
      "bestTime": "The best time to visit is in spring or fall. The weather is pleasant, and the scenery is stunning.",
      "hiddenGem": "Check out the Philosopher's Path. It's a quiet, beautiful walk that many tourists miss.",
      "mnemonic": "Kite (Kyoto) Soars (Spring) Beautifully (Blossoms)"
    },
    "visaTip": {
      "focus": "Country visa for Indian passport",
      "eli5": "Indians need a visa to visit Japan. Apply online before your trip. It takes a few days, so plan ahead.",
      "goldenTip": "Use a reliable visa service to avoid mistakes. Double-check your application for any errors.",
      "mnemonic": "Visa (V) Takes (T) Time (T)"
    },
    "culturalCode": {
      "culture": "Japanese culture values respect and politeness.",
      "doThis": "Bowing is a common greeting, and it shows respect. Take off your shoes when entering homes or temples.",
      "neverDoThis": "Don't point at people or things, as it's considered rude. Avoid discussing personal matters too soon.",
      "mnemonic": "Respect (R) is Key (K)"
    },
    "quiz": [
      {
        "q": "What is the traditional Japanese dish made of rice and fish?",
        "options": [
          "Sushi",
          "Ramen",
          "Tempura",
          "Udon"
        ],
        "answer": 0,
        "funFact": "Sushi originated in ancient times as a way to preserve fish."
      },
      {
        "q": "Which flower is famous in Japan during spring?",
        "options": [
          "Rose",
          "Cherry Blossom",
          "Tulip",
          "Sunflower"
        ],
        "answer": 1,
        "funFact": "Cherry blossoms symbolize the fleeting nature of life in Japanese culture."
      },
      {
        "q": "What is a popular Japanese form of entertainment?",
        "options": [
          "Kabuki",
          "Ballet",
          "Opera",
          "Theater"
        ],
        "answer": 2,
        "funFact": "Kabuki is a traditional Japanese theater known for its elaborate costumes and makeup."
      }
    ]
  }
}

const d260604 = {
  "news": {
    "segments": [
      {
        "name": "🌐 What's happening with countries?",
        "color": "#a0d4f5",
        "stories": [
          {
            "headline": "Tensions rise between Country A and Country B.",
            "eli5": "Imagine two kids arguing over a toy. They both want it badly. They shout, but no one shares. If this keeps up, they might not play together at all.",
            "whyItMatters": "If they don’t resolve this, it could lead to bigger fights.",
            "mnemonic": "Toys lead to fights."
          },
          {
            "headline": "Country C celebrates a historic peace treaty.",
            "eli5": "Think of two friends who have been fighting. They finally sit down, share their feelings, and hug it out. Now, they can play together happily again.",
            "whyItMatters": "This could inspire other countries to solve their issues peacefully.",
            "mnemonic": "Hugs heal friends."
          },
          {
            "headline": "Country D faces a major election this weekend.",
            "eli5": "Picture a classroom where everyone votes for their favorite activity. The winning activity gets to be the class's fun time. Everyone is excited to see who wins!",
            "whyItMatters": "Elections shape the future of a country.",
            "mnemonic": "Vote for fun!"
          }
        ]
      },
      {
        "name": "💸 What's happening with money?",
        "color": "#a8edcb",
        "stories": [
          {
            "headline": "Stock markets fluctuate wildly after recent news.",
            "eli5": "It's like a rollercoaster. Up and down, thrilling but scary. People scream and hold on tight as they ride.",
            "whyItMatters": "These ups and downs affect everyone’s savings.",
            "mnemonic": "Stocks go up and down, like a ride."
          },
          {
            "headline": "New currency introduced in Country E.",
            "eli5": "Imagine playing a game with different coins. Now, everyone has shiny new coins to use instead. It makes trading and buying smoother.",
            "whyItMatters": "A new currency can boost the economy.",
            "mnemonic": "Shiny coins mean new games."
          },
          {
            "headline": "Country F's inflation rate hits record highs.",
            "eli5": "Think of a balloon that keeps getting bigger. If it grows too fast, it might pop! Prices are rising quickly, making things cost more.",
            "whyItMatters": "This impacts how much people can buy.",
            "mnemonic": "Balloons can burst!"
          }
        ]
      },
      {
        "name": "💻 What's happening with technology?",
        "color": "#c9b8f5",
        "stories": [
          {
            "headline": "New smartphone features surprise users.",
            "eli5": "It's like getting a magic wand that can do even more tricks. People are amazed and excited to try all the new things.",
            "whyItMatters": "Innovations keep us connected and entertained.",
            "mnemonic": "Magic wands do more!"
          },
          {
            "headline": "AI advancements lead to new jobs.",
            "eli5": "Imagine robots helping people at work. They take over boring tasks, and humans can focus on fun, creative jobs instead.",
            "whyItMatters": "This shift can improve job satisfaction.",
            "mnemonic": "Robots help people play!"
          }
        ]
      },
      {
        "name": "🌿 What's happening with our planet?",
        "color": "#f5c6a0",
        "stories": [
          {
            "headline": "New conservation efforts launched to protect wildlife.",
            "eli5": "It's like building a safe playground for animals. They can run, play, and be safe from harm.",
            "whyItMatters": "Protecting wildlife is crucial for our ecosystem.",
            "mnemonic": "Playgrounds for animals!"
          },
          {
            "headline": "Severe weather patterns disrupt farming.",
            "eli5": "Think of a garden that gets too much rain one day and not enough the next. Plants struggle to grow strong and healthy.",
            "whyItMatters": "This affects food supply and prices.",
            "mnemonic": "Weather can ruin gardens."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "What was the main reason for the tensions between Country A and Country B?",
        "options": [
          "Disagreement over resources",
          "Cultural differences",
          "Historical events",
          "Language barriers"
        ],
        "answer": 0,
        "funFact": "Many conflicts start over resources, like land or water."
      },
      {
        "q": "What did the new currency in Country E aim to improve?",
        "options": [
          "Tourism",
          "Trade",
          "Savings",
          "Investments"
        ],
        "answer": 1,
        "funFact": "New currencies can simplify trade and boost economic activity."
      },
      {
        "q": "How do advancements in AI usually affect jobs?",
        "options": [
          "Increase unemployment",
          "Create new jobs",
          "Reduce hours",
          "None of the above"
        ],
        "answer": 1,
        "funFact": "AI often takes over repetitive tasks, allowing humans to do more creative work."
      }
    ]
  },
  "markets": {
    "globalPulse": {
      "eli5": "Imagine a river flowing with water. Sometimes it's calm, and other times it rushes with excitement. Right now, the global markets are like a river with small ripples, but some areas are bubbling with activity.",
      "keyThings": [
        "S&P500: Steady but cautious, like a boat navigating through gentle waves.",
        "Brent: Prices are floating higher, similar to a buoy being lifted by incoming tides.",
        "Gold: Shiny and valuable, it's like a treasure chest that people are holding onto tightly.",
        "Nifty: Indian stocks are moving up, resembling a kite soaring higher on a breezy day."
      ]
    },
    "indianMarket": {
      "eli5": "Think of the stock market like a busy bazaar. Some stalls are selling hot items, while others are quiet. Traders are excitedly looking for the best deals.",
      "breakouts": [
        {
          "name": "NSE:RELIANCE — Reliance Industries",
          "whyExciting": "It's expanding into new energy sources, like a vendor adding more items to their stall. Investors are eager to see how this affects profits.",
          "risk": "If the new plans don't work, it could be like a vendor with spoiled goods."
        },
        {
          "name": "NSE:TCS — Tata Consultancy Services",
          "whyExciting": "They're launching innovative tech solutions, like a shop showcasing a brand-new gadget. This could attract more customers and contracts.",
          "risk": "Competition is fierce, much like other vendors trying to sell similar products."
        },
        {
          "name": "NSE:INFY — Infosys",
          "whyExciting": "They just signed a big deal, like a stall making a huge sale. This could boost their reputation and stock price.",
          "risk": "If the deal falls through, it could hurt their credibility, like a vendor with poor quality goods."
        }
      ],
      "ipoSpot": {
        "name": "IPO: ABC Tech",
        "verdict": "Apply",
        "eli5": "This company has a cool product that many people want. Investing now could mean getting in early before it becomes super popular."
      },
      "lessonOfDay": {
        "title": "The Importance of Patience",
        "story": "Imagine a farmer waiting for seeds to grow. If they rush, they might harvest too soon. Just like in investing, patience can lead to better results over time.",
        "mnemonic": "Plant, Wait, Harvest."
      }
    },
    "quiz": [
      {
        "q": "What does the S&P500 reflect?",
        "options": [
          "A: Technology stocks",
          "B: Overall market performance",
          "C: International stocks",
          "D: Commodity prices"
        ],
        "answer": 1,
        "funFact": "The S&P500 includes 500 of the largest companies in the U.S."
      },
      {
        "q": "What happens to gold prices during uncertainty?",
        "options": [
          "A: They drop",
          "B: They stay the same",
          "C: They rise",
          "D: They fluctuate wildly"
        ],
        "answer": 2,
        "funFact": "Gold is often seen as a safe haven during tough times."
      },
      {
        "q": "Which company is known for tech consulting in India?",
        "options": [
          "A: Reliance",
          "B: TCS",
          "C: Infosys",
          "D: HDFC"
        ],
        "answer": 1,
        "funFact": "TCS is one of the largest IT services companies globally."
      }
    ]
  },
  "psychology": {
    "mindTrick": {
      "name": "The Anchoring Effect",
      "eli5": "Imagine you see a shirt for $100. Then you see another for $50. You think the second one is a great deal! Your first price stuck in your mind like glue.",
      "realLife": "People often base their decisions on the first piece of information they get. It's like starting a treasure hunt with a map that leads to one spot.",
      "mnemonic": "Anchor your thoughts."
    },
    "bodyLanguage": {
      "signal": "Crossed arms.",
      "eli5": "When someone crosses their arms, it looks like they’re hugging themselves. It might mean they feel cold or are closed off. Think of it like a turtle hiding in its shell.",
      "howToUse": "If you see crossed arms, approach gently. It can mean they need space or are feeling defensive.",
      "mnemonic": "Turtle in its shell."
    },
    "superpower": {
      "name": "Empathy",
      "story": "Imagine a superhero who can feel what others feel. One day, they meet a sad child and sense the hurt. They sit down, listen, and share a smile. Suddenly, the child feels lighter, like clouds parting for sunshine.",
      "shield": "Empathy helps us connect with others. It can also protect us from misunderstandings.",
      "mnemonic": "Feel with your heart."
    },
    "quiz": [
      {
        "q": "What is the Anchoring Effect?",
        "options": [
          "A mental shortcut",
          "A type of fish",
          "A car brand",
          "A flower type"
        ],
        "answer": 0,
        "funFact": "Anchors can influence decisions without us knowing!"
      },
      {
        "q": "What might crossed arms indicate?",
        "options": [
          "Happiness",
          "Defensiveness",
          "Excitement",
          "Curiosity"
        ],
        "answer": 1,
        "funFact": "Body language can say more than words sometimes!"
      },
      {
        "q": "What is empathy?",
        "options": [
          "Feeling someone else's feelings",
          "Jumping high",
          "Running fast",
          "Cooking well"
        ],
        "answer": 2,
        "funFact": "Empathy can strengthen friendships and understanding!"
      }
    ]
  },
  "leadership": {
    "leaderMove": {
      "name": "The Bridge Builder",
      "story": "Once, a wise leader noticed a river separating two villages. She decided to build a bridge for both communities. People from each side came together to help. In the end, they celebrated their new connections.",
      "doThis": "Foster collaboration between teams. Create opportunities for shared projects.",
      "mnemonic": "Bridge - Build Relationships"
    },
    "visionarySecret": {
      "concept": "The Power of Imagination",
      "eli5": "Imagine your favorite storybook. Now, picture yourself as the hero. That’s how visionaries think. They see possibilities where others see limits.",
      "exercise": "Spend 10 minutes each day visualizing your goals. Draw or write about what success looks like.",
      "mnemonic": "IMAGINE - Inspire My Aspirations with Goals and New Experiences"
    },
    "eliteHabit": {
      "habit": "Daily Reflection",
      "whoAndHow": "Top performers like athletes and CEOs practice this. They take time each day to think about their actions and decisions.",
      "whyItWorks": "Reflection helps identify strengths and areas for improvement. It creates awareness that leads to better choices.",
      "mnemonic": "REFLECT - Recognize Every Flaw, Learn, Evaluate, Change, Transform"
    },
    "sigmaWisdom": {
      "lesson": "Embrace the Journey",
      "story": "A traveler once wandered through a dense forest. He realized the path was more important than the destination. Each step taught him something new about himself.",
      "action": "Focus on enjoying the process, not just the outcome.",
      "mnemonic": "JOURNEY - Joyful Observations Unfolding Real Experiences, Nurturing You"
    },
    "quiz": [
      {
        "q": "What is the main theme of 'The Bridge Builder'?",
        "options": [
          "Building relationships",
          "Crossing rivers",
          "Celebrating differences",
          "Teamwork"
        ],
        "answer": 0,
        "funFact": "Bridges symbolize connection and unity in many cultures."
      },
      {
        "q": "Why is imagination important for visionaries?",
        "options": [
          "It’s fun",
          "It helps solve problems",
          "It makes them dream",
          "It’s a requirement"
        ],
        "answer": 1,
        "funFact": "Imagination has been linked to innovation and creative solutions."
      },
      {
        "q": "What is a benefit of daily reflection?",
        "options": [
          "It wastes time",
          "It boosts confidence",
          "It helps with sleep",
          "It distracts you"
        ],
        "answer": 2,
        "funFact": "Many successful people attribute their growth to the habit of reflection."
      }
    ]
  },
  "wealth": {
    "wealthSecret": {
      "name": "Compound Growth",
      "story": "Imagine a tiny seed. It grows into a big tree over time. Each year, it adds new branches and leaves. Eventually, it bears fruits that can feed many.",
      "action": "Plant your investment seeds early. Watch them grow into a forest of wealth over time.",
      "mnemonic": "Seed to tree."
    },
    "moneyMachine": {
      "type": "Investment Portfolio",
      "eli5": "Think of it like a vending machine. You put in money and get snacks later. The more snacks you choose, the more variety you enjoy.",
      "indiaAngle": "In India, a diverse portfolio can provide security. With a mix of stocks, bonds, and real estate, you can thrive in a growing economy.",
      "mnemonic": "Vending machine of wealth."
    },
    "mindsetFlip": {
      "oldThinking": "Money is just for spending.",
      "newThinking": "Money can work for you.",
      "why": "When you let money work, it can grow like a plant. Investing is like planting seeds for future harvests.",
      "mnemonic": "Plant to harvest."
    },
    "magicNumber": {
      "number": "50/30/20 Rule",
      "eli5": "Imagine you have a pie. You slice 50% for needs, 30% for wants, and 20% for savings. This way, you enjoy now and prepare for later.",
      "mnemonic": "Pie slices."
    },
    "quiz": [
      {
        "q": "What is the key to compound growth?",
        "options": [
          "Starting early",
          "Investing in stocks",
          "Saving money",
          "Buying a house"
        ],
        "answer": 0,
        "funFact": "Starting early can double your wealth over time."
      },
      {
        "q": "What does a diverse portfolio help with?",
        "options": [
          "Less risk",
          "More fun",
          "Easier spending",
          "Faster growth"
        ],
        "answer": 0,
        "funFact": "Diversity in investments spreads risk like a safety net."
      },
      {
        "q": "What is the 50/30/20 rule about?",
        "options": [
          "Investing",
          "Spending",
          "Saving",
          "Budgeting"
        ],
        "answer": 3,
        "funFact": "It helps balance your finances and secure your future."
      }
    ]
  },
  "communication": {
    "speakingSkill": {
      "name": "Martin Luther King Jr.",
      "story": "He had a dream that all people would be treated equally. He spoke with passion and conviction. His words inspired millions and changed history.",
      "drill": "Practice speaking in front of a mirror. Focus on making eye contact and using gestures.",
      "mnemonic": "MLK - Make Lasting Knowledge."
    },
    "negotiationMove": {
      "tactic": "The Power of Silence",
      "eli5": "Imagine playing a game of chess. Sometimes, not moving your piece can confuse your opponent. Silence can make others spill their secrets.",
      "script": "Let's take a moment to think about this. Your silence can lead to more information.",
      "mnemonic": "SILENCE - Stop Interrupting, Let Information Emerge."
    },
    "officeWin": {
      "rule": "Celebrate Small Wins",
      "story": "Think of a marathon runner. They celebrate every mile, not just the finish line. This keeps their spirits high and makes the journey enjoyable.",
      "mistake": "Ignoring small successes can lead to burnout.",
      "mnemonic": "WIN - Wonderful Increments Noticed."
    },
    "confidenceHack": {
      "technique": "Power Posing",
      "science": "Standing tall can boost your confidence. It tricks your brain into feeling more powerful.",
      "doItNow": "Stand with your hands on your hips like a superhero. Hold this pose for two minutes before your next big moment.",
      "mnemonic": "POSE - Power Over Self Esteem."
    },
    "quiz": [
      {
        "q": "Who inspired the 'I Have a Dream' speech?",
        "options": [
          "Abraham Lincoln",
          "Nelson Mandela",
          "Martin Luther King Jr.",
          "Malala Yousafzai"
        ],
        "answer": 2,
        "funFact": "MLK delivered this iconic speech during the 1963 March on Washington."
      },
      {
        "q": "What does silence in negotiation help with?",
        "options": [
          "Creating noise",
          "Confusing the opponent",
          "Starting a fight",
          "Ending the conversation"
        ],
        "answer": 1,
        "funFact": "Silence can make people feel uncomfortable, prompting them to share more information."
      },
      {
        "q": "Why should we celebrate small wins at work?",
        "options": [
          "To distract ourselves",
          "To feel good",
          "To procrastinate",
          "To avoid work"
        ],
        "answer": 1,
        "funFact": "Celebrating small wins can boost morale and keep teams motivated."
      }
    ]
  },
  "mind": {
    "brainHack": {
      "name": "Wild Horse Taming",
      "eli5": "Imagine your thoughts are wild horses. If you let them run free, they go anywhere. But if you guide them, they can take you to wonderful places.",
      "protocol": "Spend 5 minutes each morning sitting in silence. Focus on your breath and gently bring your mind back when it wanders.",
      "mnemonic": "Breathe, guide, achieve."
    },
    "disciplineCode": {
      "principle": "Stay committed, even when it's tough.",
      "story": "Once, a warrior faced a fierce storm. Instead of turning back, he pressed on, knowing his goal awaited. He emerged stronger, ready for battle.",
      "todayAction": "Choose one task you've been avoiding. Complete it today, no matter how small.",
      "mnemonic": "Storms pass, warriors rise."
    },
    "impulseKiller": {
      "urge": "Craving junk food",
      "eli5": "Think of cravings as a loud monster. It roars for attention, but it’s just a trickster trying to distract you.",
      "interrupt": "When you feel the craving, drink a glass of water. Then, wait 10 minutes before deciding.",
      "mnemonic": "Roar, sip, wait."
    },
    "bodyUpgrade": {
      "practice": "Daily stretching routine.",
      "eli5": "Imagine your body is a rubber band. If you don’t stretch it, it becomes stiff and less useful.",
      "minimumDose": "Just 5 minutes is enough to start feeling better.",
      "mnemonic": "Stretch to flex."
    },
    "quiz": [
      {
        "q": "What does the brain hack suggest for morning focus?",
        "options": [
          "Run 5 miles",
          "Sit in silence",
          "Eat breakfast",
          "Call a friend"
        ],
        "answer": 1,
        "funFact": "Silence can boost creativity and clarity."
      },
      {
        "q": "What should you do with an avoided task?",
        "options": [
          "Ignore it",
          "Complete it today",
          "Put it off",
          "Ask for help"
        ],
        "answer": 1,
        "funFact": "Completing tasks can boost your mood and confidence."
      },
      {
        "q": "How long should you wait after a craving before deciding?",
        "options": [
          "5 minutes",
          "10 minutes",
          "15 minutes",
          "30 minutes"
        ],
        "answer": 1,
        "funFact": "Cravings usually pass in just a few minutes."
      }
    ]
  },
  "knowledge": {
    "mathMagic": {
      "concept": "Probability",
      "eli5": "Think of rolling dice. Each side has a chance, like picking a cookie from a jar. Some cookies are chocolate, others are vanilla. Probability tells you how likely you are to pick a chocolate cookie.",
      "realWorldUse": "We use probability to make predictions in games and weather forecasts. It helps businesses decide which products to launch.",
      "mnemonic": "Probability is like a cookie jar."
    },
    "scienceWow": {
      "field": "Physics",
      "concept": "Quantum Entanglement",
      "eli5": "Imagine you have two magic dice. No matter how far apart they are, if you roll one, the other shows the same number. It's like they can talk instantly! This mind-boggling connection happens even across galaxies.",
      "mindBlow": "Entangled particles can affect each other instantly, defying the speed of light. It's like magic in the universe!",
      "mnemonic": "Quantum entanglement is like magic dice."
    },
    "historyStory": {
      "event": "The Moon Landing",
      "story": "In 1969, humans took a giant leap. Astronauts Neil Armstrong and Buzz Aldrin walked on the Moon. They left footprints in the lunar dust, a mark of human achievement. The world watched in awe as we reached for the stars.",
      "lesson": "This event teaches us about courage and teamwork. It shows that the impossible can become possible with determination.",
      "mnemonic": "Moon landing is a giant leap."
    },
    "earthSecret": {
      "place": "Antarctica",
      "secret": "Antarctica is the driest, windiest, and coldest continent. It holds about 60% of the world's fresh water in ice. Some areas haven’t seen rain for millions of years.",
      "edge": "Understanding Antarctica helps us learn about climate change. It's a key player in Earth's weather systems.",
      "mnemonic": "Antarctica is the icy secret keeper."
    },
    "quiz": [
      {
        "q": "What is a common use of probability?",
        "options": [
          "Predicting weather",
          "Cooking recipes",
          "Gardening tips",
          "Travel plans"
        ],
        "answer": 0,
        "funFact": "Probability helps airlines manage ticket sales."
      },
      {
        "q": "What is quantum entanglement often compared to?",
        "options": [
          "Magic dice",
          "A puzzle",
          "A race",
          "A song"
        ],
        "answer": 1,
        "funFact": "Einstein called it 'spooky action at a distance.'"
      },
      {
        "q": "What major event happened in 1969?",
        "options": [
          "First email sent",
          "First man on the Moon",
          "Internet invented",
          "First computer built"
        ],
        "answer": 2,
        "funFact": "The Moon landing inspired countless future scientists."
      }
    ]
  },
  "ai": {
    "toolSpotlight": {
      "name": "WriteWise",
      "category": "writing",
      "eli5": "Imagine having a super helpful friend who knows all the words. This friend can help you write stories or reports in a snap. Just tell it what you want, and it fills in the gaps like magic!",
      "secretMove": "Use WriteWise to brainstorm ideas and create outlines before writing. It saves time by organizing your thoughts in seconds.",
      "mnemonic": "Witty Words Win"
    },
    "workflowWin": {
      "title": "Task Tracker Boost",
      "problem": "Keeping track of tasks can feel like herding cats. This tool helps you organize and prioritize easily.",
      "steps": [
        "Step 1: List all tasks.",
        "Step 2: Assign deadlines.",
        "Step 3: Organize by priority.",
        "Step 4: Review daily."
      ],
      "timeSaved": "You can save at least an hour each week not searching for what to do next.",
      "mnemonic": "Track Tasks Triumphantly"
    },
    "promptOfDay": {
      "purpose": "This prompt helps generate creative story ideas.",
      "prompt": "Generate a story about [CHARACTER] who discovers [OBJECT] in [SETTING].",
      "where": "ChatGPT",
      "mnemonic": "Creative Character Quest"
    },
    "futureWatch": {
      "trend": "Collaboration AI",
      "eli5": "Before, teams struggled to communicate. Now, an AI friend helps everyone stay on the same page. It’s like having a coach that knows what each player needs to win!",
      "yourMove": "Start using collaboration AI tools to improve team communication. It makes projects flow smoother.",
      "mnemonic": "Teamwork Triumphs Together"
    },
    "quiz": [
      {
        "q": "What does WriteWise help you with?",
        "options": [
          "Cooking",
          "Writing",
          "Gardening",
          "Sports"
        ],
        "answer": 1,
        "funFact": "Writing tools can increase your output by up to 50%!"
      },
      {
        "q": "How often should you review your task list?",
        "options": [
          "Once a month",
          "Daily",
          "Never",
          "Every year"
        ],
        "answer": 1,
        "funFact": "Daily reviews keep you focused and on track!"
      },
      {
        "q": "What is the purpose of the prompt of the day?",
        "options": [
          "To make a meal",
          "To generate story ideas",
          "To clean your house",
          "To fix your car"
        ],
        "answer": 1,
        "funFact": "Creative prompts can spark new ideas and stories!"
      }
    ]
  },
  "travel": {
    "destination": {
      "country": "Japan",
      "region": "Kyoto",
      "eli5": "Kyoto is like a time machine. It takes you back to ancient Japan. Beautiful temples and gardens are everywhere. You can feel the history in the air.",
      "bestTime": "Spring and autumn are the best. The cherry blossoms and fall colors are stunning.",
      "hiddenGem": "Explore the Philosopher's Path. It's a quiet walk lined with cherry trees, perfect for reflection.",
      "mnemonic": "Kite (Kyoto) Flies (Fabulous Temples) in Spring."
    },
    "visaTip": {
      "focus": "Japan visa for Indian passport",
      "eli5": "First, check if you need a visa. If yes, apply online or at the embassy. Gather documents like your passport and travel plans.",
      "goldenTip": "Apply early to avoid delays. Double-check that all documents are correct before submission.",
      "mnemonic": "Visa Vulture (Verify Documents) for Japan."
    },
    "culturalCode": {
      "culture": "Japanese culture is all about respect and politeness. Bowing is a common greeting.",
      "doThis": "Try to learn a few basic Japanese phrases. Locals appreciate when you make an effort.",
      "neverDoThis": "Don't point at people or things. It's considered rude in Japan.",
      "mnemonic": "Respectful Rabbit (Bow) in Japan."
    },
    "quiz": [
      {
        "q": "What is the famous cherry blossom season called in Japan?",
        "options": [
          "Sakura",
          "Hanami",
          "Kawaii",
          "Ninja"
        ],
        "answer": 0,
        "funFact": "Sakura means cherry blossom and is a symbol of spring in Japan."
      },
      {
        "q": "Which temple is famous for its wooden stage in Kyoto?",
        "options": [
          "Kinkaku-ji",
          "Kiyomizu-dera",
          "Fushimi Inari",
          "Ryoan-ji"
        ],
        "answer": 1,
        "funFact": "Kiyomizu-dera offers stunning views of the city, especially during cherry blossom season."
      },
      {
        "q": "What traditional clothing do Japanese people often wear during festivals?",
        "options": [
          "Kimono",
          "Sari",
          "Toga",
          "Kilt"
        ],
        "answer": 0,
        "funFact": "Kimonos are beautifully designed and represent Japanese culture."
      }
    ]
  }
}

const d260605 = {
  "news": {
    "segments": [
      {
        "name": "🌐 What's happening with countries?",
        "color": "#a0d4f5",
        "stories": [
          {
            "headline": "Tensions rise in Eastern Europe.",
            "eli5": "Imagine two friends arguing over a toy. They both want it, but they can’t agree. The argument gets louder, and others start to watch. Everyone hopes they can share it instead of fighting.",
            "whyItMatters": "This could affect peace in the region.",
            "mnemonic": "Toy fight in Europe."
          },
          {
            "headline": "New trade deals in Asia.",
            "eli5": "Picture a big picnic where everyone brings food to share. Countries are trading goods like snacks. They hope to make everyone happier and full. More food means more fun!",
            "whyItMatters": "Better trade can boost economies.",
            "mnemonic": "Picnic of trade."
          },
          {
            "headline": "Election results shake up South America.",
            "eli5": "Think of a school class where students vote for a new leader. Some are excited, while others are worried. The new leader promises to change things. Everyone is curious about what happens next.",
            "whyItMatters": "Leadership changes can impact policies.",
            "mnemonic": "Class vote surprise."
          }
        ]
      },
      {
        "name": "💸 What's happening with money?",
        "color": "#a8edcb",
        "stories": [
          {
            "headline": "Stock market sees big shifts.",
            "eli5": "Imagine a seesaw going up and down. Sometimes it goes high, and sometimes it dips low. People are wondering if it will balance out soon. It’s a wild ride!",
            "whyItMatters": "Stock changes affect investors.",
            "mnemonic": "Seesaw stocks."
          },
          {
            "headline": "New currency launched in Africa.",
            "eli5": "Think of a new game with new rules. Everyone needs to learn how to play with the new tokens. It’s exciting, but also a little confusing. People hope it makes trading easier.",
            "whyItMatters": "It aims to simplify transactions.",
            "mnemonic": "New game currency."
          },
          {
            "headline": "Interest rates rise in the US.",
            "eli5": "Imagine the price of lemonade going up at a stand. People have to pay more if they want a drink. This affects how much money people can borrow. Everyone feels the pinch!",
            "whyItMatters": "Higher rates can slow down borrowing.",
            "mnemonic": "Lemonade price hike."
          }
        ]
      },
      {
        "name": "💻 What's happening with technology?",
        "color": "#c9b8f5",
        "stories": [
          {
            "headline": "New smartphone features unveiled.",
            "eli5": "Think of a magic box that gets cooler every year. This year, it can do even more tricks. People are excited to see what it can do next. It’s like a surprise gift!",
            "whyItMatters": "Innovation drives consumer interest.",
            "mnemonic": "Magic box surprise."
          },
          {
            "headline": "AI tools become more accessible.",
            "eli5": "Imagine a superhero that helps everyone with everyday tasks. Now, anyone can have this superhero in their pocket. It makes life easier and more fun. Everyone wants a helper!",
            "whyItMatters": "Wider access can spark creativity.",
            "mnemonic": "Pocket superhero."
          }
        ]
      },
      {
        "name": "🌿 What's happening with our planet?",
        "color": "#f5c6a0",
        "stories": [
          {
            "headline": "New climate agreements signed.",
            "eli5": "Picture a group of friends deciding to clean up a park together. They promise to help keep it clean. Everyone knows it’s important to work together for a better space. Teamwork makes it happen!",
            "whyItMatters": "Collaboration can lead to real change.",
            "mnemonic": "Park cleanup team."
          },
          {
            "headline": "Wildlife preservation efforts expand.",
            "eli5": "Imagine building a big safe house for animals. It keeps them safe from harm. Everyone agrees it’s important to protect our furry friends. Happy animals make a happy planet!",
            "whyItMatters": "Preservation helps biodiversity.",
            "mnemonic": "Animal safe house."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Which region is seeing new trade deals?",
        "options": [
          "Africa",
          "Asia",
          "Europe",
          "South America"
        ],
        "answer": 1,
        "funFact": "Asia is home to many of the world's largest economies!"
      },
      {
        "q": "What is rising in the US?",
        "options": [
          "Stock prices",
          "Interest rates",
          "Food prices",
          "Housing prices"
        ],
        "answer": 1,
        "funFact": "Higher interest rates can slow down the economy!"
      },
      {
        "q": "What new feature was unveiled in smartphones?",
        "options": [
          "Longer battery life",
          "New colors",
          "Magic tricks",
          "Foldable screens"
        ],
        "answer": 2,
        "funFact": "Foldable screens are changing how we use our phones!"
      }
    ]
  },
  "markets": {
    "globalPulse": {
      "eli5": "Imagine global markets as a river. Sometimes the water flows quickly, and sometimes it slows down. Right now, the water is moving at a steady pace but with some waves of excitement and caution.",
      "keyThings": [
        "S&P500: It’s like a big boat that’s cruising, but with a few bumps as tech stocks wobble.",
        "Brent: The oil price is like a fisherman’s net, catching more fish today with rising global demand.",
        "Gold: Gold is like a shiny treasure chest, gaining value as people seek safety in uncertain times.",
        "Nifty: The Indian market index is like a bustling market, thriving but feeling the pinch from some inflation worries."
      ]
    },
    "indianMarket": {
      "eli5": "Think of the Indian market as a lively bazaar. Vendors are busy, some products are flying off the shelves, while others are gathering dust. Exciting deals are happening, but buyers are cautious.",
      "breakouts": [
        {
          "name": "NSE:INFY — Infosys",
          "whyExciting": "Infosys just landed a huge overseas contract, like a chef winning a prestigious award. This could boost its sales and stock price significantly.",
          "risk": "But, if the project fails, it could sour the mood, like a burnt dish at a feast."
        },
        {
          "name": "NSE:RELIANCE — Reliance Industries",
          "whyExciting": "Reliance is expanding its green energy projects, like a gardener planting new seeds for a sustainable future.",
          "risk": "However, if the weather doesn’t cooperate, those seeds might not grow as expected."
        },
        {
          "name": "NSE:TCS — Tata Consultancy Services",
          "whyExciting": "TCS is launching innovative tech solutions, like a magician revealing a new trick to amaze the crowd.",
          "risk": "If the audience isn’t impressed, the trick could flop, hurting their reputation."
        }
      ],
      "ipoSpot": {
        "name": "IPO: Zomato 2.0",
        "verdict": "Apply",
        "eli5": "Zomato's new IPO is like a new dish on the menu that everyone is curious about. You might want to try it before it sells out!"
      },
      "lessonOfDay": {
        "title": "The Importance of Diversification",
        "story": "Imagine you have a fruit basket. If you only have apples and they spoil, you’re left with nothing. But if you have apples, bananas, and oranges, you still have something tasty even if one fruit goes bad.",
        "mnemonic": "Variety is the spice of life!"
      }
    },
    "quiz": [
      {
        "q": "What does S&P500 represent?",
        "options": [
          "A stock market index",
          "A bond",
          "A commodity",
          "A currency"
        ],
        "answer": 0,
        "funFact": "S&P500 includes 500 of the largest companies in the US!"
      },
      {
        "q": "What is gold often seen as?",
        "options": [
          "A risky investment",
          "A safe haven",
          "A tech stock",
          "A currency"
        ],
        "answer": 1,
        "funFact": "Gold has been a symbol of wealth and safety for thousands of years!"
      },
      {
        "q": "Why are IPOs exciting?",
        "options": [
          "They are guaranteed profits",
          "They allow investors to buy new stocks",
          "They are always successful",
          "They have no risks"
        ],
        "answer": 1,
        "funFact": "IPOs let the public invest in companies before they become big!"
      }
    ]
  },
  "psychology": {
    "mindTrick": {
      "name": "The Power of Positive Self-Talk",
      "eli5": "Imagine you’re a coach for yourself. Instead of saying, 'I can’t do this,' say, 'I’ll try my best.' It’s like giving yourself a high-five. This can make you feel braver and happier.",
      "realLife": "When you face a tough task, switch your inner voice to be encouraging. This can boost your confidence and help you succeed.",
      "mnemonic": "P.S.T. - Positive Self-Talk"
    },
    "bodyLanguage": {
      "signal": "Open Hands",
      "eli5": "When you show your palms, it’s like saying, 'I come in peace.' It makes you look friendly. People feel more relaxed around you.",
      "howToUse": "Use open hands when talking to others to show you’re honest. This helps build trust and connection.",
      "mnemonic": "O.H. - Open Hands"
    },
    "superpower": {
      "name": "Empathy",
      "story": "Once, a girl named Mia saw her friend crying. Instead of ignoring it, she sat with her. She listened and understood her pain. This made her friend feel loved and supported.",
      "shield": "Empathy can help you connect deeply with others. It protects you from misunderstandings and builds stronger bonds.",
      "mnemonic": "E.M.P. - Empathy Matters Most"
    },
    "quiz": [
      {
        "q": "What is a good way to boost self-confidence?",
        "options": [
          "Negative Self-Talk",
          "Positive Self-Talk",
          "Ignoring Your Feelings",
          "Doubting Yourself"
        ],
        "answer": 1,
        "funFact": "Positive self-talk can improve your performance by up to 25%!"
      },
      {
        "q": "What does open hands in body language mean?",
        "options": [
          "Aggression",
          "Friendliness",
          "Indifference",
          "Fear"
        ],
        "answer": 1,
        "funFact": "Open body language can instantly make you more likable."
      },
      {
        "q": "What is empathy?",
        "options": [
          "Ignoring others",
          "Understanding feelings",
          "Being selfish",
          "Judging others"
        ],
        "answer": 1,
        "funFact": "Empathy helps build trust and is key in strong relationships."
      }
    ]
  },
  "leadership": {
    "leaderMove": {
      "name": "Empathy in Action",
      "story": "Once, a wise leader listened to a struggling team member. They shared their worries by the fire. The leader nodded, understanding the weight of those words. Together, they forged a plan to lift the burden.",
      "doThis": "Take time to listen to your team's concerns today. Show them you care and understand their challenges.",
      "mnemonic": "EIA - Empathy Ignites Action"
    },
    "visionarySecret": {
      "concept": "Future Painting",
      "eli5": "Imagine you're an artist, but instead of a canvas, you have the future. You can paint it with your dreams and ideas. The more vivid the picture, the more likely it is to come true. It's about seeing possibilities before they happen.",
      "exercise": "Spend a few minutes visualizing your goals for the next year. Write down the most exciting vision you see.",
      "mnemonic": "FP - Future Paints Possibilities"
    },
    "eliteHabit": {
      "habit": "Daily Reflection",
      "whoAndHow": "Successful leaders like Bill Gates reflect every day on their experiences. They take 10 minutes to jot down thoughts about what went well and what didn’t.",
      "whyItWorks": "This habit creates clarity and helps in making better decisions. It allows leaders to learn and grow from their daily experiences.",
      "mnemonic": "DR - Daily Reflection"
    },
    "sigmaWisdom": {
      "lesson": "Strength in Solitude",
      "story": "A lone tree stands tall on a mountain. It faces storms alone but grows stronger with each challenge. Like that tree, solitude can build resilience and clarity.",
      "action": "Spend time alone today to think deeply about your goals.",
      "mnemonic": "SS - Solitude Strengthens"
    },
    "quiz": [
      {
        "q": "What is the main focus of Empathy in Action?",
        "options": [
          "Listening",
          "Speaking",
          "Planning",
          "Ignoring"
        ],
        "answer": 0,
        "funFact": "Empathy can boost team morale and productivity!"
      },
      {
        "q": "What should you do during Future Painting?",
        "options": [
          "Draw a picture",
          "Visualize goals",
          "Write a story",
          "Discuss with others"
        ],
        "answer": 1,
        "funFact": "Visualizing your future can increase motivation and focus!"
      },
      {
        "q": "Why is Daily Reflection important?",
        "options": [
          "It wastes time",
          "It helps learn",
          "It's boring",
          "It's unnecessary"
        ],
        "answer": 1,
        "funFact": "Daily reflection can improve decision-making skills over time!"
      }
    ]
  },
  "wealth": {
    "wealthSecret": {
      "name": "The Seed of Wealth",
      "story": "Think of wealth like a seed. When you plant it, it grows into a tree. This tree can bear fruit for years to come. Just like nurturing a tree, wealth requires care and patience.",
      "action": "Start saving a little every month. Watch your wealth grow over time.",
      "mnemonic": "Seed to tree."
    },
    "moneyMachine": {
      "type": "Passive Income",
      "eli5": "Imagine a vending machine. You put in some money and get snacks in return. If you own the machine, it keeps giving you snacks even when you're not there!",
      "indiaAngle": "In India, real estate can be a great vending machine for passive income. Renting out properties can give you money while you sleep.",
      "mnemonic": "Vending machine wealth."
    },
    "mindsetFlip": {
      "oldThinking": "Money is scarce and hard to get.",
      "newThinking": "Money can grow and be created in many ways.",
      "why": "Thinking there’s only a fixed amount of money is like believing there’s only one flavor of ice cream. When you realize money can multiply, your opportunities expand. This opens you up to new ways to earn and invest.",
      "mnemonic": "From scarcity to abundance."
    },
    "magicNumber": {
      "number": "The 50/30/20 Rule",
      "eli5": "Imagine you have a cake. You cut it into three pieces. One piece is for needs, another for wants, and the last for savings.",
      "mnemonic": "Cake slices."
    },
    "quiz": [
      {
        "q": "What is the seed of wealth compared to?",
        "options": [
          "A tree",
          "A car",
          "A house",
          "A book"
        ],
        "answer": 0,
        "funFact": "Trees can live for hundreds of years, just like your wealth can grow over time."
      },
      {
        "q": "What does a vending machine represent in passive income?",
        "options": [
          "A store",
          "A source of snacks",
          "A toy",
          "A bank"
        ],
        "answer": 1,
        "funFact": "Vending machines can give you money without you having to be present."
      },
      {
        "q": "What is the 50/30/20 rule used for?",
        "options": [
          "Cooking",
          "Saving money",
          "Traveling",
          "Shopping"
        ],
        "answer": 1,
        "funFact": "This rule helps you balance your spending and saving like a balanced diet!"
      }
    ]
  },
  "communication": {
    "speakingSkill": {
      "name": "Martin Luther King Jr.",
      "story": "He gave the famous 'I Have a Dream' speech in 1963. His words painted pictures of hope and change. People listened, moved by his passion and vision.",
      "drill": "Practice speaking in front of a mirror. Use strong gestures to emphasize your points.",
      "mnemonic": "Dream big, speak boldly."
    },
    "negotiationMove": {
      "tactic": "The Anchoring Technique",
      "eli5": "Imagine you want to buy a toy. If the shopkeeper says it's $50 first, you'll think that's the starting point. Your brain gets 'anchored' to that price.",
      "script": "Let's start with $10,000 as our first offer. This will help us find common ground.",
      "mnemonic": "Anchor your price, set the sail."
    },
    "officeWin": {
      "rule": "Listen more than you speak.",
      "story": "In one office, the talkative employee missed key ideas. In another, the quiet one gathered insights. The quiet one often had better solutions.",
      "mistake": "Talking too much can drown out great ideas.",
      "mnemonic": "Two ears, one mouth."
    },
    "confidenceHack": {
      "technique": "Power Posing",
      "science": "Standing tall can trick your brain into feeling more powerful. It sends signals that boost confidence.",
      "doItNow": "Before any big moment, stand like a superhero for two minutes. Feel the energy flow.",
      "mnemonic": "Stand tall, feel all."
    },
    "quiz": [
      {
        "q": "Who delivered the 'I Have a Dream' speech?",
        "options": [
          "A. Martin Luther King Jr.",
          "B. Nelson Mandela",
          "C. Winston Churchill",
          "D. John F. Kennedy"
        ],
        "answer": 0,
        "funFact": "King's speech was a key moment in the Civil Rights Movement."
      },
      {
        "q": "What does the Anchoring Technique help with?",
        "options": [
          "A. Cooking",
          "B. Negotiating",
          "C. Sports",
          "D. Gardening"
        ],
        "answer": 1,
        "funFact": "Anchoring is often used in salary discussions."
      },
      {
        "q": "What is one benefit of listening more?",
        "options": [
          "A. Learning",
          "B. Speaking",
          "C. Interrupting",
          "D. Ignoring"
        ],
        "answer": 2,
        "funFact": "Good listeners often become great leaders."
      }
    ]
  },
  "mind": {
    "brainHack": {
      "name": "Wild Horse Taming",
      "eli5": "Imagine your mind is like a wild horse. If you let it run free, it can lead you anywhere. But if you tame it, you can ride wherever you want.",
      "protocol": "First, take a deep breath to calm your mind. Then, focus on one thought at a time, like guiding the horse to a specific spot.",
      "mnemonic": "Tame the wild horse to ride your thoughts."
    },
    "disciplineCode": {
      "principle": "Small steps lead to big victories.",
      "story": "Once, a young warrior trained daily, even in rain. Each drop was like a drop of wisdom. Soon, he became the strongest in the land.",
      "todayAction": "Choose one small task and complete it. This builds your strength for bigger challenges.",
      "mnemonic": "Small steps, big battles won."
    },
    "impulseKiller": {
      "urge": "snacking late at night",
      "eli5": "Think of an impulse as a sneaky monster in your kitchen. If you ignore it, it might just go away.",
      "interrupt": "When you feel the urge, drink a glass of water. This distracts the monster and gives you time to think.",
      "mnemonic": "Water washes away the monster."
    },
    "bodyUpgrade": {
      "practice": "Take a brisk 10-minute walk each day.",
      "eli5": "Walking is like giving your body a quick tune-up. Just like a car needs oil changes, your body needs movement.",
      "minimumDose": "Ten minutes is all it takes to feel better.",
      "mnemonic": "Walk to tune-up your body."
    },
    "quiz": [
      {
        "q": "What helps tame your wild horse mind?",
        "options": [
          "Deep breathing",
          "Scrolling on your phone",
          "Drinking coffee",
          "Watching TV"
        ],
        "answer": 0,
        "funFact": "Deep breathing can reduce stress and improve focus!"
      },
      {
        "q": "What did the warrior focus on to get stronger?",
        "options": [
          "Daily training",
          "Eating sweets",
          "Taking breaks",
          "Ignoring his goals"
        ],
        "answer": 1,
        "funFact": "Consistent effort is more important than talent!"
      },
      {
        "q": "What can you drink to fight the late-night snack urge?",
        "options": [
          "Soda",
          "Water",
          "Juice",
          "Coffee"
        ],
        "answer": 1,
        "funFact": "Water can help curb cravings and hydrate you!"
      }
    ]
  },
  "knowledge": {
    "mathMagic": {
      "concept": "Fractals",
      "eli5": "Imagine a tree. Each branch splits into smaller branches, just like the whole tree. It’s like a never-ending pattern, like a swirl of ice cream that keeps going. Each part looks like a mini version of the whole thing.",
      "realWorldUse": "Fractals help in computer graphics to create realistic landscapes. They also appear in nature, like coastlines and mountain ranges.",
      "mnemonic": "Fractals are like trees, always branching out."
    },
    "scienceWow": {
      "field": "Physics",
      "concept": "Quantum Entanglement",
      "eli5": "Imagine two magic dice. If you roll one and it shows a six, the other one does too, even if it's far away. It’s like they’re whispering secrets to each other across the universe. This makes our understanding of reality feel like a superhero movie!",
      "mindBlow": "Particles can be connected in ways that seem impossible. It challenges our basic ideas about how things should behave.",
      "mnemonic": "Entangled dice show the magic of distance."
    },
    "historyStory": {
      "event": "The Fall of the Berlin Wall",
      "story": "In 1989, a wall divided a city and a nation. Families were torn apart, dreams were crushed. Suddenly, on a night of celebration, people gathered to tear it down. Joy and tears mixed as freedom rang out across the land.",
      "lesson": "Walls can be broken down, both physical and emotional. Hope can unite even the most divided hearts.",
      "mnemonic": "The wall fell, and so did the chains."
    },
    "earthSecret": {
      "place": "Australia",
      "secret": "Australia is home to the Great Barrier Reef, the largest coral reef system. It’s so big you can see it from space! It’s a vibrant underwater city for thousands of species.",
      "edge": "Understanding this ecosystem helps us protect our oceans. It shows how interconnected life is on our planet.",
      "mnemonic": "The reef is a giant underwater city."
    },
    "quiz": [
      {
        "q": "What is the largest coral reef system in the world?",
        "options": [
          "Great Barrier Reef",
          "Coral Triangle",
          "Red Sea Reef",
          "Belize Barrier Reef"
        ],
        "answer": 0,
        "funFact": "The Great Barrier Reef is about 2,300 kilometers long!"
      },
      {
        "q": "What magical phenomenon connects particles across distances?",
        "options": [
          "Gravity",
          "Quantum Entanglement",
          "Electromagnetism",
          "Relativity"
        ],
        "answer": 1,
        "funFact": "Quantum entanglement is so strange that Einstein called it 'spooky action at a distance.'"
      },
      {
        "q": "What year did the Berlin Wall fall?",
        "options": [
          "1980",
          "1989",
          "1991",
          "1975"
        ],
        "answer": 1,
        "funFact": "The fall of the Berlin Wall symbolized the end of the Cold War."
      }
    ]
  },
  "ai": {
    "toolSpotlight": {
      "name": "StoryWeaver",
      "category": "writing",
      "eli5": "Imagine a magic robot that helps you spin tales. You tell it a few ideas, and it weaves them into a story. It's like having a co-author who never runs out of creativity!",
      "secretMove": "Use it to brainstorm plot twists by feeding it your main storyline. It can surprise you with ideas you never thought of.",
      "mnemonic": "S-W for StoryWeaver"
    },
    "workflowWin": {
      "title": "Quick Research Organizer",
      "problem": "Finding information can be like searching for a needle in a haystack. This tool gathers and sorts data so you don’t have to.",
      "steps": [
        "Step 1: Enter your research topic.",
        "Step 2: Select sources to pull from.",
        "Step 3: Click 'Organize'.",
        "Step 4: Review your neatly compiled insights."
      ],
      "timeSaved": "This can save you hours of sifting through messy notes.",
      "mnemonic": "R-O for Research Organizer"
    },
    "promptOfDay": {
      "purpose": "This helps you spark creativity and get ideas flowing.",
      "prompt": "Write a story about [CHARACTER] who discovers [OBJECT] in [PLACE].",
      "where": "ChatGPT",
      "mnemonic": "S-P for Story Prompt"
    },
    "futureWatch": {
      "trend": "AI in Mental Health Support",
      "eli5": "Before, people often felt alone in their struggles. Now, AI can listen and give helpful advice anytime. It's like having a supportive friend in your pocket!",
      "yourMove": "Stay informed about these tools and consider using them for your wellbeing. They can complement traditional methods.",
      "mnemonic": "M-H for Mental Health"
    },
    "quiz": [
      {
        "q": "What is StoryWeaver used for?",
        "options": [
          "Cooking",
          "Writing",
          "Gardening",
          "Traveling"
        ],
        "answer": 1,
        "funFact": "StoryWeaver can help you craft unique stories in minutes!"
      },
      {
        "q": "How much time can the Quick Research Organizer save?",
        "options": [
          "A few seconds",
          "A few minutes",
          "A few hours",
          "A few days"
        ],
        "answer": 2,
        "funFact": "Organizing research efficiently can lead to better project outcomes!"
      },
      {
        "q": "What does today's prompt help you do?",
        "options": [
          "Cook dinner",
          "Write a story",
          "Learn math",
          "Plan a trip"
        ],
        "answer": 1,
        "funFact": "Writing prompts can jumpstart your creativity and inspire new ideas!"
      }
    ]
  },
  "travel": {
    "destination": {
      "country": "Japan",
      "region": "Kyoto",
      "eli5": "Kyoto is like a time machine. You step in, and it's all temples and cherry blossoms. The streets whisper stories from long ago. It's a peaceful place where tradition meets beauty.",
      "bestTime": "Visit during spring for cherry blossoms or autumn for colorful leaves. Both seasons are like nature’s grand celebration.",
      "hiddenGem": "Check out the Philosopher's Path, a quiet walkway lined with cherry trees. It’s a perfect spot for reflection and a little escape from the busy city.",
      "mnemonic": "Jolly Kyoto's Peaceful Treasures"
    },
    "visaTip": {
      "focus": "Japan visa for Indian passport",
      "eli5": "First, check if you need a visa. If yes, gather your documents like passport and photos. Finally, apply online or at the embassy, and wait for your visa to arrive.",
      "goldenTip": "Apply early to avoid last-minute stress. Keep a copy of your application for reference.",
      "mnemonic": "Just Apply, Plan Early"
    },
    "culturalCode": {
      "culture": "Japanese culture values respect and harmony. It's like a delicate dance where everyone plays their part with care.",
      "doThis": "Bow slightly when greeting someone; it shows respect. Always say 'Arigato' when receiving help or a gift; it’s their way of saying thank you.",
      "neverDoThis": "Avoid pointing at people; it’s considered rude. Don't talk loudly in public transport; it disrupts the peace.",
      "mnemonic": "Respectful Harmony Always"
    },
    "quiz": [
      {
        "q": "What is Kyoto famous for?",
        "options": [
          "Cherry Blossoms",
          "Deserts",
          "Mountains",
          "Beaches"
        ],
        "answer": 0,
        "funFact": "Kyoto is home to over 1,600 temples and shrines!"
      },
      {
        "q": "What does 'Arigato' mean?",
        "options": [
          "Hello",
          "Goodbye",
          "Thank you",
          "Please"
        ],
        "answer": 2,
        "funFact": "Saying 'Arigato' is a simple way to show appreciation in Japan."
      },
      {
        "q": "What should you avoid on public transport in Japan?",
        "options": [
          "Eating",
          "Sleeping",
          "Talking Loudly",
          "Reading"
        ],
        "answer": 2,
        "funFact": "Talking quietly helps maintain harmony in Japan's public spaces."
      }
    ]
  }
}

const d260606 = {
  "news": {
    "segments": [
      {
        "name": "🌐 What's happening with countries?",
        "color": "#a0d4f5",
        "stories": [
          {
            "headline": "New peace talks begin in Middle East.",
            "eli5": "Imagine two friends arguing over a toy. They sit down, share their feelings, and try to find a way to play together. That’s what countries are doing now. They want to stop fighting and play nice.",
            "whyItMatters": "Peace leads to happiness and safety for everyone.",
            "mnemonic": "P for Peace, P for Play."
          },
          {
            "headline": "Election chaos in a major European country.",
            "eli5": "Think of a school election where the votes get lost. Students are confused and upset. Everyone wants their say to be counted. This is how citizens feel when elections go wrong.",
            "whyItMatters": "Elections shape how people live and govern.",
            "mnemonic": "E for Election, E for Everyone's Voice."
          },
          {
            "headline": "Natural disaster recovery efforts ramp up in Asia.",
            "eli5": "Imagine a big storm knocks down a playground. Friends come together to rebuild it, sharing tools and snacks. Countries are doing the same to help each other after disasters.",
            "whyItMatters": "Helping each other can save lives and restore hope.",
            "mnemonic": "R for Recovery, R for Rebuild."
          }
        ]
      },
      {
        "name": "💸 What's happening with money?",
        "color": "#a8edcb",
        "stories": [
          {
            "headline": "Global markets see a surprising upswing.",
            "eli5": "Picture a seesaw that tilts up after being down for a while. Investors are feeling hopeful, and stocks are climbing back up. This change makes people feel richer.",
            "whyItMatters": "A healthy market means more jobs and better living standards.",
            "mnemonic": "U for Upswing, U for Up!"
          },
          {
            "headline": "Cryptocurrency regulations are tightening.",
            "eli5": "Imagine a playground where kids can trade toys freely. But now, the teachers set rules to keep it fair. Countries are making rules for digital money to protect everyone.",
            "whyItMatters": "Clear rules can build trust in new money systems.",
            "mnemonic": "R for Rules, R for Respect."
          },
          {
            "headline": "Inflation rates stabilize in several nations.",
            "eli5": "Think of a balloon that keeps getting bigger. It can pop if it gets too big. Inflation is like that balloon, and stabilizing it keeps the economy safe.",
            "whyItMatters": "Stability means predictable prices for everyone.",
            "mnemonic": "S for Stabilize, S for Safe."
          }
        ]
      },
      {
        "name": "💻 What's happening with technology?",
        "color": "#c9b8f5",
        "stories": [
          {
            "headline": "New AI software helps with climate change.",
            "eli5": "Imagine a super-smart robot that helps you clean your messy room. This AI is doing the same for our planet, finding ways to reduce waste and save energy.",
            "whyItMatters": "Tech can help us tackle big problems like climate change.",
            "mnemonic": "A for AI, A for Action!"
          },
          {
            "headline": "Breakthrough in quantum computing announced.",
            "eli5": "Think of a superhero that can solve puzzles way faster than anyone else. Quantum computers are like that superhero, ready to tackle challenges that seem impossible now.",
            "whyItMatters": "Faster computers can change everything from medicine to security.",
            "mnemonic": "Q for Quantum, Q for Quick!"
          }
        ]
      },
      {
        "name": "🌿 What's happening with our planet?",
        "color": "#f5c6a0",
        "stories": [
          {
            "headline": "New marine conservation laws introduced.",
            "eli5": "Imagine a giant fish tank where too many fish are getting sick. New rules help keep the water clean and the fish safe. That's what countries are doing for oceans.",
            "whyItMatters": "Healthy oceans support life and ecosystems.",
            "mnemonic": "C for Conservation, C for Clean."
          },
          {
            "headline": "Forest restoration projects gain momentum.",
            "eli5": "Think of a garden that needs some flowers planted. People come together to plant seeds and care for them. Restoring forests is like that, helping nature grow back.",
            "whyItMatters": "Forests are crucial for air, wildlife, and climate balance.",
            "mnemonic": "R for Restoration, R for Revive."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Which country is starting peace talks?",
        "options": [
          "A. France",
          "B. Brazil",
          "C. Israel",
          "D. Japan"
        ],
        "answer": 2,
        "funFact": "Peace talks can lead to historic agreements!"
      },
      {
        "q": "What is happening to global markets?",
        "options": [
          "A. They are crashing",
          "B. They are stable",
          "C. They are growing",
          "D. They are unpredictable"
        ],
        "answer": 2,
        "funFact": "Market ups and downs are common in economics."
      },
      {
        "q": "What is a new focus for technology?",
        "options": [
          "A. Video games",
          "B. Climate change",
          "C. Space travel",
          "D. Virtual reality"
        ],
        "answer": 1,
        "funFact": "Tech is being used to solve real-world problems!"
      }
    ]
  },
  "markets": {
    "globalPulse": {
      "eli5": "Imagine global markets as a big river. Sometimes the water flows smoothly, and other times there are rapids. Right now, the river is calm, but some currents are starting to pick up speed.",
      "keyThings": [
        "S&P500: Slightly up as tech stocks gain momentum.",
        "Brent: Prices steady as OPEC discusses future plans.",
        "Gold: Prices dip as investors seek riskier assets.",
        "Nifty: Indian market rises with strong banking performance."
      ]
    },
    "indianMarket": {
      "eli5": "Think of the Indian market as a bustling bazaar. Some stalls are thriving, while others are quiet. Traders are excited about a few hot items today.",
      "breakouts": [
        {
          "name": "NSE:TCS — Tata Consultancy Services",
          "whyExciting": "This tech giant is launching a new product that could revolutionize cloud computing. Traders believe this will boost its profits significantly.",
          "risk": "If the product fails, the stock may drop."
        },
        {
          "name": "NSE:RELIANCE — Reliance Industries",
          "whyExciting": "Reliance is expanding into green energy, attracting new investors. This move aligns with global sustainability trends.",
          "risk": "Investment in new sectors can be unpredictable."
        },
        {
          "name": "NSE:INFY — Infosys",
          "whyExciting": "Infosys reported better-than-expected earnings, pleasing investors. Their focus on AI solutions is seen as a long-term growth strategy.",
          "risk": "Market volatility could impact stock performance."
        }
      ],
      "ipoSpot": {
        "name": "NSE:NEWCO — New Company",
        "verdict": "Watch",
        "eli5": "This company is generating buzz but has no track record. Keeping an eye on it could be wise."
      },
      "lessonOfDay": {
        "title": "The Power of Patience",
        "story": "Consider a gardener who plants seeds. They water them and wait. With time and care, beautiful flowers bloom. Similarly, in investing, patience can lead to great rewards.",
        "mnemonic": "Patience Pays Off."
      }
    },
    "quiz": [
      {
        "q": "What is the key driver for the S&P500 today?",
        "options": [
          "Tech stocks rising",
          "Oil prices dropping",
          "Gold prices soaring",
          "Banking sector declines"
        ],
        "answer": 0,
        "funFact": "The S&P500 is influenced heavily by tech, making it a barometer for innovation."
      },
      {
        "q": "Which sector is Reliance expanding into?",
        "options": [
          "Retail",
          "Green energy",
          "Telecommunications",
          "Pharmaceuticals"
        ],
        "answer": 1,
        "funFact": "Green energy is a hot topic globally, with many companies shifting focus."
      },
      {
        "q": "What does TCS's new product aim to improve?",
        "options": [
          "Social media",
          "Cloud computing",
          "Retail sales",
          "Healthcare"
        ],
        "answer": 1,
        "funFact": "Cloud computing is essential for modern businesses, making this a significant development."
      }
    ]
  },
  "psychology": {
    "mindTrick": {
      "name": "The Zeigarnik Effect",
      "eli5": "Imagine you're reading a book. You stop at a cliffhanger. You can't stop thinking about it! Your brain wants to finish what it started.",
      "realLife": "This trick helps you remember unfinished tasks. Use it to boost productivity.",
      "mnemonic": "Think of a 'Z' for 'Zipping through tasks!'"
    },
    "bodyLanguage": {
      "signal": "Crossed arms",
      "eli5": "Crossing your arms is like building a fortress. It can mean you're closed off. But sometimes, you're just cozy!",
      "howToUse": "Notice if someone crosses their arms. It might mean they're feeling defensive.",
      "mnemonic": "Imagine a 'C' for 'Cocooned feelings.'"
    },
    "superpower": {
      "name": "Empathy",
      "story": "Once, a girl named Mia saw a friend sad. She remembered a time she felt the same. She sat with her friend and listened. Just her presence made everything better.",
      "shield": "Empathy helps understand others. But be careful; don’t take on their pain.",
      "mnemonic": "Think of 'E' for 'Everyone's feelings matter.'"
    },
    "quiz": [
      {
        "q": "What is the Zeigarnik Effect?",
        "options": [
          "Remembering unfinished tasks",
          "Forgetting things quickly",
          "Ignoring problems",
          "Sleeping better"
        ],
        "answer": 0,
        "funFact": "It's named after a psychologist who noticed waiters remembered orders better if they were not completed."
      },
      {
        "q": "What does crossed arms usually signal?",
        "options": [
          "Feeling open",
          "Being defensive",
          "Wanting to hug",
          "Excitement"
        ],
        "answer": 1,
        "funFact": "Body language can say more than words sometimes!"
      },
      {
        "q": "What makes empathy a superpower?",
        "options": [
          "It helps you win arguments",
          "It lets you ignore others",
          "It connects you with others' feelings",
          "It makes you feel superior"
        ],
        "answer": 2,
        "funFact": "Empathetic people often build stronger relationships!"
      }
    ]
  },
  "leadership": {
    "leaderMove": {
      "name": "The Bridge Builder",
      "story": "Once, a wise elder built a bridge. It connected two villages. People crossed to trade and share stories. The elder smiled, knowing he united them.",
      "doThis": "Create connections between your team members. Encourage them to share their ideas.",
      "mnemonic": "Bridge = Build Relationships"
    },
    "visionarySecret": {
      "concept": "The Power of Pause",
      "eli5": "Imagine a balloon. If you blow too hard, it pops. If you pause and let the air settle, it floats beautifully. Pausing gives you clarity.",
      "exercise": "Take five deep breaths before making decisions. This helps you think better.",
      "mnemonic": "Pause = Clarity"
    },
    "eliteHabit": {
      "habit": "Daily Reflection",
      "whoAndHow": "Top leaders like Oprah reflect each day. They write down what went well and what didn’t.",
      "whyItWorks": "Reflection helps you learn from experiences. It keeps you focused on your goals.",
      "mnemonic": "Reflect = Learn"
    },
    "sigmaWisdom": {
      "lesson": "Embrace the Journey",
      "story": "A traveler walked a winding path. Each twist revealed new wonders. The traveler learned to love the journey, not just the destination.",
      "action": "Focus on enjoying the process today.",
      "mnemonic": "Journey = Enjoy Growth"
    },
    "quiz": [
      {
        "q": "What does 'The Bridge Builder' symbolize?",
        "options": [
          "Isolation",
          "Connection",
          "Competition",
          "Independence"
        ],
        "answer": 1,
        "funFact": "Building connections can improve team morale."
      },
      {
        "q": "Why is pausing beneficial?",
        "options": [
          "It wastes time",
          "It leads to clarity",
          "It confuses you",
          "It slows you down"
        ],
        "answer": 1,
        "funFact": "Taking pauses can boost creativity."
      },
      {
        "q": "What is the key to daily reflection?",
        "options": [
          "Forgetting mistakes",
          "Learning from experiences",
          "Ignoring feelings",
          "Rushing decisions"
        ],
        "answer": 1,
        "funFact": "Reflection is a common practice among successful people."
      }
    ]
  },
  "wealth": {
    "wealthSecret": {
      "name": "The Wealth Seed",
      "story": "Planting a seed is like starting to save money. With time, it grows into a tree, providing shade and fruit. Just like nurturing that tree, you must care for your savings. Eventually, it can bear the fruits of financial freedom.",
      "action": "Start saving a small amount every month. Watch it grow like that tree over time.",
      "mnemonic": "Seed to tree, save with glee."
    },
    "moneyMachine": {
      "type": "The Investment Vending Machine",
      "eli5": "Imagine a vending machine that gives you snacks when you put in coins. Investing is like putting your money into a machine that can give you more money later. Just like you choose your snack, you choose where to invest your money.",
      "indiaAngle": "In India, investing in mutual funds is like picking a popular snack. It can help your money grow, especially with the country's booming economy.",
      "mnemonic": "Invest to digest, watch your wealth fest."
    },
    "mindsetFlip": {
      "oldThinking": "Money is hard to make.",
      "newThinking": "Money can be made through smart choices.",
      "why": "Believing that money is hard to make limits your potential. Changing this mindset opens up new opportunities and creative ways to earn.",
      "mnemonic": "From hard to smart, play your part."
    },
    "magicNumber": {
      "number": "50/30/20 Rule",
      "eli5": "Imagine a pizza with three slices. One slice is for needs, another for wants, and the last for savings. This rule helps you enjoy your pizza without overindulging.",
      "mnemonic": "Slice it right, live in the light."
    },
    "quiz": [
      {
        "q": "What is the first step to building wealth?",
        "options": [
          "Save money",
          "Spend freely",
          "Ignore investments",
          "Avoid budgeting"
        ],
        "answer": 0,
        "funFact": "Saving just a little each month can lead to big changes over time!"
      },
      {
        "q": "What does the 50/30/20 rule help with?",
        "options": [
          "Eating pizza",
          "Budgeting money",
          "Traveling the world",
          "Making friends"
        ],
        "answer": 1,
        "funFact": "This rule helps you balance your spending and savings!"
      },
      {
        "q": "Which mindset is better for making money?",
        "options": [
          "Money is hard to make",
          "Money comes with smart choices",
          "Money is only for the rich",
          "Money is a waste"
        ],
        "answer": 2,
        "funFact": "A positive mindset can open doors to new opportunities!"
      }
    ]
  },
  "communication": {
    "speakingSkill": {
      "name": "The Power of Storytelling",
      "story": "Martin Luther King Jr. once shared a dream. His words painted a picture of a better future. People listened, and hope spread like wildfire.",
      "drill": "Practice telling a personal story. Make it relatable and emotional.",
      "mnemonic": "STORY - Speak, Tell, Open, Relate, Yield"
    },
    "negotiationMove": {
      "tactic": "The Anchoring Technique",
      "eli5": "Imagine fishing. You throw out a big bait first to catch a big fish. Then, you can negotiate for smaller fish with the big bait as your starting point.",
      "script": "Let's start with this number as our anchor. From there, we can discuss further adjustments.",
      "mnemonic": "ANCHOR - Aim, Negotiate, Consider, Help, Offer, Reassess"
    },
    "officeWin": {
      "rule": "Listen Actively",
      "story": "In one meeting, John spoke over everyone. Ideas were lost. In another, Sarah listened and built on others’ thoughts, leading to success.",
      "mistake": "Interrupting others can shut down good ideas.",
      "mnemonic": "LISTEN - Look, Invite, Speak, Think, Engage, Note"
    },
    "confidenceHack": {
      "technique": "Power Posing",
      "science": "Research shows that body language affects how we feel. Standing tall can boost your confidence like a superhero.",
      "doItNow": "Stand with your hands on your hips for two minutes. Feel the difference in your energy.",
      "mnemonic": "POWER - Pose, Own, Win, Energize, Rise"
    },
    "quiz": [
      {
        "q": "Who was known for powerful storytelling?",
        "options": [
          "A. Steve Jobs",
          "B. Martin Luther King Jr.",
          "C. Winston Churchill",
          "D. Oprah Winfrey"
        ],
        "answer": 1,
        "funFact": "King's 'I Have a Dream' speech is one of the most famous in history."
      },
      {
        "q": "What does the Anchoring Technique help with?",
        "options": [
          "A. Fishing",
          "B. Negotiating",
          "C. Cooking",
          "D. Gardening"
        ],
        "answer": 1,
        "funFact": "Anchoring can influence decisions in many areas, not just business."
      },
      {
        "q": "Why is active listening important?",
        "options": [
          "A. It saves time",
          "B. It builds trust",
          "C. It's polite",
          "D. It's a new trend"
        ],
        "answer": 1,
        "funFact": "Good listeners often become great leaders."
      }
    ]
  },
  "mind": {
    "brainHack": {
      "name": "Mind Tamer",
      "eli5": "Imagine a wild horse running free. Your thoughts are like that horse, wild and untamed. With practice, you can gently lead it where you want, instead of letting it run off.",
      "protocol": "Start with a quiet place. Close your eyes and take deep breaths for five minutes.",
      "mnemonic": "Tame the horse."
    },
    "disciplineCode": {
      "principle": "Commitment to Growth",
      "story": "Once, a young warrior faced a fierce dragon. Instead of fleeing, he practiced every day to defeat it. In the end, his discipline made him stronger than the beast.",
      "todayAction": "Choose one task and focus on it completely. Avoid distractions until it's done.",
      "mnemonic": "Warrior's focus."
    },
    "impulseKiller": {
      "urge": "snacking",
      "eli5": "Think of a monster that craves junk food. It growls and tries to lure you to the fridge.",
      "interrupt": "When you feel the urge, drink a glass of water first. Wait ten minutes before deciding to snack.",
      "mnemonic": "Monster pause."
    },
    "bodyUpgrade": {
      "practice": "Daily Stretching",
      "eli5": "Stretching is like giving your body a refreshing drink. It helps you feel awake and flexible.",
      "minimumDose": "Just five minutes every morning can make a big difference.",
      "mnemonic": "Stretch to refresh."
    },
    "quiz": [
      {
        "q": "What helps tame your wild thoughts?",
        "options": [
          "Mind Tamer",
          "Brain Freeze",
          "Thought Blocker",
          "Focus Shield"
        ],
        "answer": 0,
        "funFact": "Taming your mind can improve focus and creativity."
      },
      {
        "q": "What should you do when faced with distractions?",
        "options": [
          "Run away",
          "Stay focused",
          "Give in",
          "Take a break"
        ],
        "answer": 1,
        "funFact": "Staying focused can boost your productivity significantly."
      },
      {
        "q": "What is the minimum dose for stretching?",
        "options": [
          "10 minutes",
          "15 minutes",
          "5 minutes",
          "2 minutes"
        ],
        "answer": 2,
        "funFact": "Just a few minutes of stretching can enhance your mood."
      }
    ]
  },
  "knowledge": {
    "mathMagic": {
      "concept": "Probability",
      "eli5": "Imagine you have a bag of cookies. Some are chocolate chip, and some are oatmeal. If you close your eyes and pick one, what are the chances it’s chocolate chip? That’s probability—counting the tasty ones and comparing!",
      "realWorldUse": "Probability helps us make decisions. We use it in games, weather forecasts, and even stock markets.",
      "mnemonic": "Pies Are Always Delicious - P(A) = D."
    },
    "scienceWow": {
      "field": "Physics",
      "concept": "Black Holes",
      "eli5": "Picture a cosmic vacuum cleaner that swallows everything. Stars, planets, light—nothing escapes! They are formed when massive stars collapse. It’s like a giant cosmic whirlpool!",
      "mindBlow": "Some black holes are millions of times heavier than our sun. They warp time and space, bending reality itself.",
      "mnemonic": "Big Hungry Object - BHO."
    },
    "historyStory": {
      "event": "The Moon Landing",
      "story": "In 1969, humans stepped on the moon for the first time. Neil Armstrong took a giant leap for mankind. People watched in awe, glued to their screens. It was a moment that united the world!",
      "lesson": "Dreams can become reality with hard work. Teamwork and courage can achieve the impossible.",
      "mnemonic": "One Small Step - OSS."
    },
    "earthSecret": {
      "place": "Antarctica",
      "secret": "Antarctica holds about 70% of the world's fresh water. It is also home to the largest desert on Earth. Despite being icy, it has stunning landscapes and unique wildlife!",
      "edge": "Understanding Antarctica helps with climate change studies. It teaches us about Earth's past and future.",
      "mnemonic": "Cool Water - CW."
    },
    "quiz": [
      {
        "q": "What is the probability of picking a chocolate chip cookie?",
        "options": [
          "Depends on the bag",
          "Always 50%",
          "None",
          "Sometimes"
        ],
        "answer": 0,
        "funFact": "The actual probability depends on how many chocolate chip cookies are in the bag!"
      },
      {
        "q": "What is a black hole?",
        "options": [
          "A hole in space",
          "A star",
          "A vacuum cleaner",
          "A place where light disappears"
        ],
        "answer": 3,
        "funFact": "Black holes can grow by absorbing stars and gas around them!"
      },
      {
        "q": "Who was the first person to walk on the moon?",
        "options": [
          "Buzz Aldrin",
          "Neil Armstrong",
          "John Glenn",
          "Yuri Gagarin"
        ],
        "answer": 1,
        "funFact": "Neil Armstrong's famous words were, 'That's one small step for man, one giant leap for mankind.'"
      }
    ]
  },
  "ai": {
    "toolSpotlight": {
      "name": "QuillBot Pro",
      "category": "writing",
      "eli5": "Imagine a robot that reads your story and suggests better words. It helps you write like a pro. It's like having a smart friend who knows a lot about writing.",
      "secretMove": "Use the summarizer to make long articles short and sweet. It saves time by giving you the main points quickly.",
      "mnemonic": "Write better, faster."
    },
    "workflowWin": {
      "title": "Effortless Email Management",
      "problem": "Managing emails can be a never-ending task. This workflow helps you sort and prioritize emails without the hassle.",
      "steps": [
        "Connect your email account",
        "Set up rules for sorting",
        "Create folders for priority",
        "Automate responses for common queries"
      ],
      "timeSaved": "You could save hours each week.",
      "mnemonic": "Email made easy."
    },
    "promptOfDay": {
      "purpose": "To generate creative story ideas quickly.",
      "prompt": "Create a story about [CHARACTER] who discovers [OBJECT] in [SETTING].",
      "where": "ChatGPT",
      "mnemonic": "Unlock your imagination."
    },
    "futureWatch": {
      "trend": "AI Collaboration Tools",
      "eli5": "Before, people worked alone on projects. Now, they team up with AI for better ideas. It's like having a super-smart partner by your side.",
      "yourMove": "Start using AI tools in your projects. They can boost creativity and efficiency.",
      "mnemonic": "Team up with AI."
    },
    "quiz": [
      {
        "q": "What is QuillBot Pro used for?",
        "options": [
          "Gaming",
          "Writing",
          "Cooking",
          "Travel"
        ],
        "answer": 1,
        "funFact": "QuillBot Pro can enhance your writing style."
      },
      {
        "q": "What does the email management workflow help with?",
        "options": [
          "Shopping",
          "Traveling",
          "Sorting emails",
          "Cooking"
        ],
        "answer": 2,
        "funFact": "It helps you focus on what matters most in your inbox."
      },
      {
        "q": "What can you create with today's prompt?",
        "options": [
          "A recipe",
          "A story",
          "A workout plan",
          "A budget"
        ],
        "answer": 1,
        "funFact": "Story prompts spark creativity and fun!"
      }
    ]
  },
  "travel": {
    "destination": {
      "country": "Japan",
      "region": "Kyoto",
      "eli5": "Kyoto is like a time machine. You step in and see beautiful temples. The cherry blossoms look like fluffy pink clouds. The streets whisper stories of samurais and geishas.",
      "bestTime": "Visit in spring for cherry blossoms. Fall is great for colorful leaves.",
      "hiddenGem": "Try to find the hidden bamboo forest. It's peaceful and feels like a movie set.",
      "mnemonic": "Keen Youth Jumping (Kyoto, Year, Japan)"
    },
    "visaTip": {
      "focus": "Visa requirement for Indian passport holders",
      "eli5": "Check the Japan visa website online. Fill out the application form. Submit it with your documents at the nearest embassy.",
      "goldenTip": "Apply early to avoid last-minute stress. Keep your documents organized for a smooth process.",
      "mnemonic": "VISA (Verify, Information, Submit, Apply)"
    },
    "culturalCode": {
      "culture": "Japanese culture values respect and harmony. Bowing is a sign of respect.",
      "doThis": "Always say 'Arigato' when receiving help. Remove your shoes when entering homes.",
      "neverDoThis": "Avoid talking loudly in public. Don't point at people or things.",
      "mnemonic": "Respect Always!"
    },
    "quiz": [
      {
        "q": "What is Kyoto famous for?",
        "options": [
          "Temples",
          "Beaches",
          "Skyscrapers",
          "Deserts"
        ],
        "answer": 0,
        "funFact": "Kyoto has over 1,600 temples and shrines!"
      },
      {
        "q": "When is the best time to see cherry blossoms in Japan?",
        "options": [
          "Winter",
          "Spring",
          "Summer",
          "Fall"
        ],
        "answer": 1,
        "funFact": "Cherry blossoms usually bloom in late March to early April."
      },
      {
        "q": "What phrase do locals appreciate when you thank them?",
        "options": [
          "Konnichiwa",
          "Sayonara",
          "Arigato",
          "Hai"
        ],
        "answer": 2,
        "funFact": "'Arigato' means thank you and is often met with a smile!"
      }
    ]
  }
}

const d260607 = {
  "news": {
    "segments": [
      {
        "name": "🌐 What's happening with countries?",
        "color": "#a0d4f5",
        "stories": [
          {
            "headline": "Peace Talks Begin in Eastern Europe",
            "eli5": "Imagine two kids arguing over a toy. They start talking and sharing ideas. Soon, they decide to play together. That's what's happening in Eastern Europe.",
            "whyItMatters": "These talks could end conflicts and bring stability.",
            "mnemonic": "Peace talks are like a toy swap that makes everyone happy."
          },
          {
            "headline": "Major Floods Hit Southeast Asia",
            "eli5": "Think of a sponge soaking up water. Sometimes it overflows. In Southeast Asia, heavy rains are making rivers overflow, flooding towns.",
            "whyItMatters": "Floods can displace families and cause economic damage.",
            "mnemonic": "Floods are like sponges that can’t hold any more water."
          },
          {
            "headline": "New Trade Agreement Between Africa and Asia",
            "eli5": "It's like two friends deciding to share their lunch. When they do, both get to enjoy more goodies. This new agreement helps countries share resources.",
            "whyItMatters": "It boosts economies and encourages cooperation.",
            "mnemonic": "Trade is like sharing lunch for a tastier meal."
          }
        ]
      },
      {
        "name": "💸 What's happening with money?",
        "color": "#a8edcb",
        "stories": [
          {
            "headline": "Cryptocurrency Values Surge",
            "eli5": "Imagine a rare baseball card suddenly becoming super popular. People want it more, so its value goes up. That's what's happening with certain cryptocurrencies.",
            "whyItMatters": "More people investing can change the financial landscape.",
            "mnemonic": "Cryptos are like rare cards that everyone suddenly wants."
          },
          {
            "headline": "Inflation Rates Stabilize in Europe",
            "eli5": "Think of a balloon that’s been blown up too much. If you let some air out, it becomes stable again. Europe is seeing prices calm down.",
            "whyItMatters": "Stable prices help people plan their budgets better.",
            "mnemonic": "Inflation is like a balloon; too much air makes it pop!"
          },
          {
            "headline": "New Currency Launched in South America",
            "eli5": "Imagine a new game where players use shiny new tokens instead of old coins. South America is introducing a fresh currency to improve trade.",
            "whyItMatters": "A new currency can boost economic growth.",
            "mnemonic": "New currency is like shiny tokens for a fun game."
          }
        ]
      },
      {
        "name": "💻 What's happening with technology?",
        "color": "#c9b8f5",
        "stories": [
          {
            "headline": "Breakthrough in Quantum Computing",
            "eli5": "Think of a super-fast train that can take shortcuts. Quantum computers can solve problems much quicker than regular ones.",
            "whyItMatters": "This could lead to incredible advances in science and technology.",
            "mnemonic": "Quantum computers are like trains on magic tracks."
          },
          {
            "headline": "New AI Tool Helps with Climate Change",
            "eli5": "Imagine a superhero that helps farmers grow crops better. This AI is like that superhero, using data to fight climate issues.",
            "whyItMatters": "It can help the planet by improving farming practices.",
            "mnemonic": "AI is the superhero for farming and the environment."
          }
        ]
      },
      {
        "name": "🌿 What's happening with our planet?",
        "color": "#f5c6a0",
        "stories": [
          {
            "headline": "Global Clean-Up Initiative Launched",
            "eli5": "Picture a big team of kids cleaning up a messy playground. Countries are joining forces to clean up the planet.",
            "whyItMatters": "This can help reduce pollution and protect wildlife.",
            "mnemonic": "Clean-up day is like a playground project for Earth."
          },
          {
            "headline": "Ice Caps Melting Faster Than Before",
            "eli5": "Think of ice cream left out in the sun. It melts quickly! The ice caps are melting because the planet is getting warmer.",
            "whyItMatters": "This can lead to rising sea levels, affecting coastal areas.",
            "mnemonic": "Ice caps melting are like ice cream on a hot day."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "What is the main goal of the peace talks in Eastern Europe?",
        "options": [
          "To share toys",
          "To end conflicts",
          "To play games",
          "To build houses"
        ],
        "answer": 1,
        "funFact": "Peace talks can lead to lasting friendships, just like kids who learn to share."
      },
      {
        "q": "Why are cryptocurrency values rising?",
        "options": [
          "More people are playing games",
          "They are gaining popularity",
          "They are becoming less rare",
          "They are being used as toys"
        ],
        "answer": 1,
        "funFact": "Cryptocurrency is like a collectible that people suddenly want more."
      },
      {
        "q": "What does the new AI tool help with?",
        "options": [
          "Playing games",
          "Fighting climate change",
          "Building houses",
          "Cooking food"
        ],
        "answer": 1,
        "funFact": "AI can be like a superhero for our planet, using data to make a difference."
      }
    ]
  },
  "markets": {
    "globalPulse": {
      "eli5": "Think of global markets like a big, winding river. Sometimes, it flows smoothly, and other times, it hits rocks and slows down. Right now, the river is bubbling with excitement, but there are some tricky spots ahead.",
      "keyThings": [
        "S&P500: Floating steadily, but some waves from interest rate talks.",
        "Brent: Prices are rising, like a boat catching a strong wind.",
        "Gold: Glittering bright as investors seek safe havens.",
        "Nifty: Surging forward, like a fast fish in a calm pond."
      ]
    },
    "indianMarket": {
      "eli5": "Imagine a bustling bazaar where vendors are shouting to sell their goods. Some stalls are packed with eager buyers, while others are quiet. The energy is high, but everyone is keeping an eye on their wallets.",
      "breakouts": [
        {
          "name": "NSE:RELIANCE — Reliance Industries",
          "whyExciting": "This company is launching a new tech project that has everyone buzzing. It could change the way we use energy.",
          "risk": "However, tech projects can be unpredictable."
        },
        {
          "name": "NSE:INFY — Infosys",
          "whyExciting": "Infosys has just signed a big deal with a foreign client. This could bring in a lot of money.",
          "risk": "But, foreign deals can sometimes fall through."
        },
        {
          "name": "NSE:TATAMOTORS — Tata Motors",
          "whyExciting": "Tata Motors is rolling out electric cars, and the market is eager for green vehicles.",
          "risk": "The electric vehicle market is getting crowded, though."
        }
      ],
      "ipoSpot": {
        "name": "IPO: XYZ Tech",
        "verdict": "Apply",
        "eli5": "This company is like a fresh fruit stand in the bazaar. It’s new and appealing, but you should check if it’s ripe."
      },
      "lessonOfDay": {
        "title": "The Tortoise and the Hare",
        "story": "In the race of markets, slow and steady often wins. The tortoise represents consistent growth, while the hare symbolizes wild, unpredictable jumps. Patience pays off.",
        "mnemonic": "Remember: Slow wins the race."
      }
    },
    "quiz": [
      {
        "q": "What is the main factor affecting global markets today?",
        "options": [
          "Interest rates",
          "Weather",
          "Sports",
          "Fashion"
        ],
        "answer": 0,
        "funFact": "Interest rates are like the temperature; they can change everything!"
      },
      {
        "q": "Which Indian company is pushing into electric vehicles?",
        "options": [
          "Tata Motors",
          "Infosys",
          "Reliance",
          "Wipro"
        ],
        "answer": 0,
        "funFact": "Electric cars are like the new kid on the block, exciting everyone!"
      },
      {
        "q": "What should you do with the XYZ Tech IPO?",
        "options": [
          "Apply",
          "Avoid",
          "Watch",
          "Forget"
        ],
        "answer": 0,
        "funFact": "Investing in an IPO is like planting a seed; you hope it grows into a big tree!"
      }
    ]
  },
  "psychology": {
    "mindTrick": {
      "name": "The Illusion of Choice",
      "eli5": "Imagine you go to an ice cream shop. You think you choose vanilla or chocolate. But they show you two flavors you like, making it feel like a choice.",
      "realLife": "This happens in marketing. Companies make you think you have options, but they guide your decisions.",
      "mnemonic": "Choices are like ice cream flavors; they can be sweet, but often picked for you."
    },
    "bodyLanguage": {
      "signal": "Open Palms",
      "eli5": "When someone shows open palms, it means they aren't hiding anything. It’s like saying, 'Look, I’m friendly!' People trust open hands.",
      "howToUse": "Use open palms when talking to show you're honest. It invites others to feel safe and open too.",
      "mnemonic": "Open palms are like open books; they reveal your true self."
    },
    "superpower": {
      "name": "Empathy",
      "story": "Once, a girl saw her friend sad. Instead of asking what was wrong, she sat beside her. She just listened, feeling her pain. That made her friend smile again.",
      "shield": "Empathy protects you from misunderstandings. It helps build strong connections with others.",
      "mnemonic": "Empathy is like a bridge; it connects hearts and minds."
    },
    "quiz": [
      {
        "q": "What is the main benefit of empathy?",
        "options": [
          "Improved relationships",
          "More arguments",
          "Less communication",
          "Isolation"
        ],
        "answer": 0,
        "funFact": "Empathy can lower stress and improve your health!"
      },
      {
        "q": "What does an open palm signify in body language?",
        "options": [
          "Hiding something",
          "Being aggressive",
          "Trust and honesty",
          "Indifference"
        ],
        "answer": 2,
        "funFact": "People are naturally drawn to those who show open body language."
      },
      {
        "q": "How does the illusion of choice affect decision-making?",
        "options": [
          "It enhances freedom",
          "It limits options",
          "It confuses people",
          "It encourages thinking"
        ],
        "answer": 1,
        "funFact": "Marketers use this trick to steer you toward certain products without you realizing it."
      }
    ]
  },
  "leadership": {
    "leaderMove": {
      "name": "The Bridge Builder",
      "story": "Once, a wise leader saw two towns separated by a river. He decided to build a bridge. People were skeptical at first. But soon, they crossed over and shared stories, creating a bond.",
      "doThis": "Inspire your team to connect with others. Facilitate collaboration across departments.",
      "mnemonic": "BRIDGE - Build Relationships In Diverse Groups Easily."
    },
    "visionarySecret": {
      "concept": "The Power of Imagination",
      "eli5": "Imagine your favorite toy. Now think about how it was created. Someone dreamed it up before it existed. Imagination lets us create new things.",
      "exercise": "Spend 10 minutes visualizing your goals. Write down the first three steps to achieve them.",
      "mnemonic": "DREAM - Dare to Realize Every Amazing Mind."
    },
    "eliteHabit": {
      "habit": "Daily Reflection",
      "whoAndHow": "Many successful leaders like Oprah Winfrey practice this. They take time each day to think about their actions and feelings.",
      "whyItWorks": "Reflection helps identify patterns in behavior. It leads to better decision-making and personal growth.",
      "mnemonic": "REFLECT - Review Every Feeling, Learn Every Change Together."
    },
    "sigmaWisdom": {
      "lesson": "Embrace Solitude",
      "story": "A lone wolf howled at the moon, seeking clarity. In solitude, it found strength and wisdom. It understood its true purpose.",
      "action": "Spend time alone to recharge and reflect.",
      "mnemonic": "WOLF - Wisdom Of Loneliness Found."
    },
    "quiz": [
      {
        "q": "What is the main benefit of building connections?",
        "options": [
          "A",
          "B",
          "C",
          "D"
        ],
        "answer": 0,
        "funFact": "Connecting with others can increase overall happiness."
      },
      {
        "q": "Why is imagination important for leaders?",
        "options": [
          "A",
          "B",
          "C",
          "D"
        ],
        "answer": 1,
        "funFact": "Imagination can lead to innovative solutions to problems."
      },
      {
        "q": "What does daily reflection help improve?",
        "options": [
          "A",
          "B",
          "C",
          "D"
        ],
        "answer": 2,
        "funFact": "Reflecting daily can help enhance self-awareness and growth."
      }
    ]
  },
  "wealth": {
    "wealthSecret": {
      "name": "Compound Growth",
      "story": "Imagine a tiny seed that grows into a big tree. At first, it seems small and insignificant. But over time, it spreads its branches wide and bears fruit. Just like money, when it compounds, it grows bigger and bigger.",
      "action": "Start investing early to let your money grow. The sooner you plant the seed, the larger your tree will become.",
      "mnemonic": "Start small, grow tall."
    },
    "moneyMachine": {
      "type": "Investment Portfolio",
      "eli5": "Think of your money as a vending machine. You put in coins and press buttons to get snacks. Over time, the more you feed the machine, the more snacks you can enjoy.",
      "indiaAngle": "In India, investing in mutual funds is like choosing different snacks from a vending machine. Diversifying your investments can give you a tasty mix of returns.",
      "mnemonic": "Snack wisely, invest wisely."
    },
    "mindsetFlip": {
      "oldThinking": "Money is hard to make and keep.",
      "newThinking": "Money can work for you if you let it.",
      "why": "Old thinking is like holding onto your toys tightly. New thinking is sharing them so they can grow and attract even more friends. When you let money work, it attracts more money.",
      "mnemonic": "Share to grow."
    },
    "magicNumber": {
      "number": "70/Rule",
      "eli5": "Imagine you have a magic book that tells you how fast your money can double. If you divide 70 by the interest rate, you see how many years it takes for your money to grow. It’s like waiting for a cake to bake; the better the recipe, the quicker it rises.",
      "mnemonic": "70 is the key to cake."
    },
    "quiz": [
      {
        "q": "What is the key to compound growth?",
        "options": [
          "Start investing early",
          "Save all your money",
          "Spend wisely",
          "Avoid risks"
        ],
        "answer": 0,
        "funFact": "Albert Einstein called compound interest the eighth wonder of the world!"
      },
      {
        "q": "What does a vending machine represent in investing?",
        "options": [
          "Instant snacks",
          "Quick money",
          "Investment portfolio",
          "Savings account"
        ],
        "answer": 2,
        "funFact": "Just like a vending machine, your investment choices can lead to different outcomes."
      },
      {
        "q": "How can you make money work for you?",
        "options": [
          "Keep it in a piggy bank",
          "Invest wisely",
          "Spend it all",
          "Hide it under the bed"
        ],
        "answer": 1,
        "funFact": "Money can grow when you invest it, just like planting seeds!"
      }
    ]
  },
  "communication": {
    "speakingSkill": {
      "name": "Martin Luther King Jr.",
      "story": "He inspired millions with his dream of equality. His words painted pictures of hope. People felt his passion and believed in change.",
      "drill": "Practice speaking in front of a mirror. Record yourself and listen for improvements.",
      "mnemonic": "Dream, Speak, Inspire."
    },
    "negotiationMove": {
      "tactic": "The 'Win-Win' approach.",
      "eli5": "Imagine two kids trading snacks. They both want cookies. If they share, both are happy. Sharing makes everyone feel good.",
      "script": "Let's find a solution that benefits us both. Together, we can create a win-win situation.",
      "mnemonic": "Share to Care."
    },
    "officeWin": {
      "rule": "Listen before you speak.",
      "story": "In one meeting, Alice spoke over everyone. The team felt ignored. In another, she listened first and ideas flowed beautifully.",
      "mistake": "Talking too much can silence others.",
      "mnemonic": "Ears open, mouth closed."
    },
    "confidenceHack": {
      "technique": "Power posing.",
      "science": "Standing tall boosts your mood. It tricks your brain into feeling more confident.",
      "doItNow": "Try standing with hands on hips for two minutes. Feel the difference in your energy.",
      "mnemonic": "Pose to Rise."
    },
    "quiz": [
      {
        "q": "Who delivered the famous 'I Have a Dream' speech?",
        "options": [
          "Malala Yousafzai",
          "Nelson Mandela",
          "Martin Luther King Jr.",
          "Winston Churchill"
        ],
        "answer": 2,
        "funFact": "This speech was delivered during the 1963 March on Washington."
      },
      {
        "q": "What is a key aspect of the 'Win-Win' negotiation tactic?",
        "options": [
          "One person wins",
          "Both parties benefit",
          "No one gets what they want",
          "It's a competition"
        ],
        "answer": 1,
        "funFact": "A win-win approach builds long-lasting relationships."
      },
      {
        "q": "What does power posing help with?",
        "options": [
          "Fitness",
          "Confidence",
          "Memory",
          "Creativity"
        ],
        "answer": 1,
        "funFact": "Research shows that it can reduce stress before important events."
      }
    ]
  },
  "mind": {
    "brainHack": {
      "name": "Wild Horse Taming",
      "eli5": "Imagine your thoughts are wild horses running in every direction. Taming them means guiding them gently instead of forcing them. Like training a horse, it takes patience and trust.",
      "protocol": "Start by sitting quietly for five minutes. Focus on your breath and let your thoughts settle like dust in the air.",
      "mnemonic": "Tame your thoughts like a wild horse."
    },
    "disciplineCode": {
      "principle": "Warrior Focus",
      "story": "Once, a warrior faced a fearsome dragon. Instead of running, he steadied his breath and focused on his mission. With courage, he struck the dragon down.",
      "todayAction": "Today, pick one task and give it your full attention. Ignore distractions like a warrior on a quest.",
      "mnemonic": "Stay sharp like a warrior."
    },
    "impulseKiller": {
      "urge": "snacking late at night",
      "eli5": "Picture a sneaky monster that creeps in when the lights are dim. It whispers for snacks like a magician pulling rabbits from a hat.",
      "interrupt": "When the urge hits, drink a glass of water to trick your mind. Then, distract yourself by reading a fun article or watching a short video.",
      "mnemonic": "Water beat the monster."
    },
    "bodyUpgrade": {
      "practice": "Daily stretching for flexibility.",
      "eli5": "Think of your body as a rubber band. Stretching helps it stay flexible and strong, like a well-used rubber band that can snap back.",
      "minimumDose": "Just five minutes of stretching each day is enough.",
      "mnemonic": "Stretch to stay strong."
    },
    "quiz": [
      {
        "q": "What is the main idea of the brain hack?",
        "options": [
          "Taming wild horses",
          "Running fast",
          "Eating healthy",
          "Sleeping well"
        ],
        "answer": 0,
        "funFact": "Taming horses is a skill that takes time and patience!"
      },
      {
        "q": "What should you focus on today according to the discipline code?",
        "options": [
          "Multiple tasks",
          "One task",
          "Eating snacks",
          "Watching TV"
        ],
        "answer": 1,
        "funFact": "Focusing on one task can double your productivity!"
      },
      {
        "q": "What does the impulse killer suggest for late-night snacking?",
        "options": [
          "Drink water",
          "Eat more snacks",
          "Go to bed",
          "Call a friend"
        ],
        "answer": 2,
        "funFact": "Staying hydrated can help control cravings!"
      }
    ]
  },
  "knowledge": {
    "mathMagic": {
      "concept": "Fibonacci Sequence",
      "eli5": "Imagine counting rabbits. Each month, a pair of rabbits grows. The new pairs follow the old ones. It’s like stacking blocks — each new level depends on the ones below.",
      "realWorldUse": "This sequence appears in nature, like in flowers and shells. It's also used in computer algorithms for sorting.",
      "mnemonic": "1, 1, 2, 3, 5, 8 — just add the last two."
    },
    "scienceWow": {
      "field": "Astronomy",
      "concept": "Black Holes",
      "eli5": "Picture a vacuum cleaner in space. It’s so strong, not even light can escape. They’re invisible but can be detected by their effects. Think of them as cosmic whirlpools.",
      "mindBlow": "Some black holes are millions of times heavier than our Sun. They can twist space and time around them.",
      "mnemonic": "B for Black, H for Hole — don’t get too close!"
    },
    "historyStory": {
      "event": "The Discovery of Penicillin",
      "story": "In 1928, Alexander Fleming returned to a messy lab. He found mold that killed bacteria. This accident changed medicine forever. Suddenly, infections were treatable!",
      "lesson": "Sometimes mistakes lead to great discoveries. Keep your eyes open; magic can happen in chaos.",
      "mnemonic": "F for Fleming, P for Penicillin — a powerful duo!"
    },
    "earthSecret": {
      "place": "Amazon Rainforest",
      "secret": "This rainforest produces 20% of the world's oxygen. It’s home to millions of species, many yet undiscovered. It’s like Earth’s lungs, vital for life.",
      "edge": "Protecting it helps combat climate change. It keeps our planet healthy and diverse.",
      "mnemonic": "A for Amazon, O for Oxygen — a breath of fresh air!"
    },
    "quiz": [
      {
        "q": "What does the Fibonacci sequence help with?",
        "options": [
          "Nature",
          "Cooking",
          "Sports",
          "Music"
        ],
        "answer": 0,
        "funFact": "It’s seen in the arrangement of leaves and flowers!"
      },
      {
        "q": "What can black holes do to light?",
        "options": [
          "Reflect it",
          "Absorb it",
          "Color it",
          "Change it"
        ],
        "answer": 1,
        "funFact": "Light can’t escape black holes at all!"
      },
      {
        "q": "Who discovered penicillin?",
        "options": [
          "Marie Curie",
          "Alexander Fleming",
          "Isaac Newton",
          "Albert Einstein"
        ],
        "answer": 1,
        "funFact": "Fleming’s discovery was a happy accident!"
      }
    ]
  },
  "ai": {
    "toolSpotlight": {
      "name": "WriteWise",
      "category": "writing",
      "eli5": "Imagine a friendly robot that helps you tell stories. It knows how to make your words shine like stars. Just like a good friend gives you advice, it gives you tips on your writing.",
      "secretMove": "Use the 'Inspiration Boost' feature for instant ideas. It’s like having a brainstorming buddy right by your side.",
      "mnemonic": "W for Wise, W for Words."
    },
    "workflowWin": {
      "title": "Email Tamer",
      "problem": "Email overload can feel like drowning in a sea of messages. This tool helps you swim to the surface and breathe again.",
      "steps": [
        "Connect Email Account",
        "Set Priority Levels",
        "Schedule Automated Responses",
        "Review Summarized Inbox"
      ],
      "timeSaved": "You'll save at least an hour each week.",
      "mnemonic": "E for Email, T for Tamer."
    },
    "promptOfDay": {
      "purpose": "This helps spark your creativity.",
      "prompt": "Write a short story about [CHARACTER] who discovers [OBJECT] in [PLACE].",
      "where": "ChatGPT",
      "mnemonic": "C for Character, O for Object."
    },
    "futureWatch": {
      "trend": "AI in mental health support.",
      "eli5": "Before, people struggled to find help for their feelings. Now, they can chat with friendly AI that listens and gives advice. It's like having a wise owl on your shoulder.",
      "yourMove": "Consider using AI tools for wellness check-ins. They can guide conversations about emotions.",
      "mnemonic": "AI for Advice, M for Mental Health."
    },
    "quiz": [
      {
        "q": "What is the main function of WriteWise?",
        "options": [
          "Analyze data",
          "Help with writing",
          "Create art",
          "Manage emails"
        ],
        "answer": 1,
        "funFact": "Good writing can improve communication by 50%!"
      },
      {
        "q": "What does Email Tamer help you do?",
        "options": [
          "Cook recipes",
          "Organize inbox",
          "Play games",
          "Watch movies"
        ],
        "answer": 1,
        "funFact": "Clearing your inbox can boost productivity by 20%!"
      },
      {
        "q": "What is the purpose of today's prompt?",
        "options": [
          "Enhance coding skills",
          "Spark creativity",
          "Learn math",
          "Study history"
        ],
        "answer": 1,
        "funFact": "Writing stories can improve empathy and understanding."
      }
    ]
  },
  "travel": {
    "destination": {
      "country": "Japan",
      "region": "Kyoto",
      "eli5": "Imagine a place where ancient temples meet cherry blossoms. Kyoto is like a time machine to Japan’s past. You can see stunning gardens and taste delicious sushi. It’s a peaceful city full of culture and history.",
      "bestTime": "The best time to visit is during spring for cherry blossoms. Fall is also magical with colorful leaves.",
      "hiddenGem": "Look for the Philosopher's Path, a quiet walk lined with cherry trees. It feels like a secret garden away from the crowds.",
      "mnemonic": "Kite’s Journey in Peaceful Japan."
    },
    "visaTip": {
      "focus": "Japan visa for Indian passport",
      "eli5": "Apply online for an e-visa before your trip. Make sure to have your passport and travel plans ready. It’s like filling out a form to unlock a special door.",
      "goldenTip": "Book your visa at least a month in advance. This gives you time to fix any issues that may pop up.",
      "mnemonic": "Jump Over Visa Hurdles."
    },
    "culturalCode": {
      "culture": "Japanese culture values respect and politeness.",
      "doThis": "Always bow when greeting someone; it shows respect. Try to learn a few Japanese words; locals appreciate the effort.",
      "neverDoThis": "Don’t tip; it’s considered rude. Avoid pointing at people or things; use your whole hand instead.",
      "mnemonic": "Respect is Key."
    },
    "quiz": [
      {
        "q": "What is the famous flower in Kyoto during spring?",
        "options": [
          "Cherry Blossom",
          "Rose",
          "Tulip",
          "Sunflower"
        ],
        "answer": 0,
        "funFact": "Cherry blossoms attract visitors from all over the world, creating a magical atmosphere."
      },
      {
        "q": "What traditional clothing can you see in Kyoto?",
        "options": [
          "Kimono",
          "Sari",
          "Kilt",
          "Hanbok"
        ],
        "answer": 1,
        "funFact": "Wearing a kimono can make you feel like you’ve stepped back in time."
      },
      {
        "q": "What is a popular food to try in Kyoto?",
        "options": [
          "Sushi",
          "Pizza",
          "Tacos",
          "Pasta"
        ],
        "answer": 0,
        "funFact": "Kyoto is famous for its sushi, made with fresh fish from nearby waters."
      }
    ]
  }
}

const d260608 = {
  "news": {
    "segments": [
      {
        "name": "🌐 What's happening with countries?",
        "color": "#a0d4f5",
        "stories": [
          {
            "headline": "New peace treaty signed in the Middle East.",
            "eli5": "Imagine two kids who always argue over a toy. One day, they decide to share it instead. Now, they play together happily. This treaty is like that for countries.",
            "whyItMatters": "Peace means less conflict and more cooperation.",
            "mnemonic": "Peace is a puzzle, and now the pieces fit."
          },
          {
            "headline": "Major elections in Europe.",
            "eli5": "Think of a school where students vote for a class president. Everyone wants a leader they trust. Elections decide who will lead the country.",
            "whyItMatters": "Elections shape the future of nations.",
            "mnemonic": "Voting is like choosing pizza toppings for a party."
          },
          {
            "headline": "Climate summit brings nations together.",
            "eli5": "Picture a group of friends planning a camping trip, making sure they have enough supplies. Countries are doing the same for our planet.",
            "whyItMatters": "Collaboration is key to solving global problems.",
            "mnemonic": "Climate care is like watering a garden together."
          }
        ]
      },
      {
        "name": "💸 What's happening with money?",
        "color": "#a8edcb",
        "stories": [
          {
            "headline": "Global stock markets rise.",
            "eli5": "Imagine a group of kids playing a game. When one kid wins, everyone cheers and feels good. When stocks go up, it’s like everyone is winning.",
            "whyItMatters": "Higher stocks can mean a healthier economy.",
            "mnemonic": "Stocks are like balloons; when they rise, everyone smiles."
          },
          {
            "headline": "Cryptocurrency regulations introduced.",
            "eli5": "Think of a wild playground where kids can run freely. New rules are like putting up fences for safety. Regulations help protect people.",
            "whyItMatters": "Rules can prevent fraud and encourage trust.",
            "mnemonic": "Crypto is a treasure map; regulations help keep it safe."
          },
          {
            "headline": "Inflation rates stabilize.",
            "eli5": "Imagine a balloon that keeps getting bigger. If it stops growing, it’s easier to handle. Stable inflation means prices won’t surprise us.",
            "whyItMatters": "Predictable prices help people plan better.",
            "mnemonic": "Inflation is like a rollercoaster; smoother rides are easier."
          }
        ]
      },
      {
        "name": "💻 What's happening with technology?",
        "color": "#c9b8f5",
        "stories": [
          {
            "headline": "New AI tools launched.",
            "eli5": "Imagine having a super smart robot friend. This friend can help with homework or chores. New AI tools are like getting more helpers.",
            "whyItMatters": "AI can improve efficiency and creativity.",
            "mnemonic": "AI is like a magic wand for tasks."
          },
          {
            "headline": "Breakthrough in renewable energy tech.",
            "eli5": "Think of a bicycle that can turn wind into energy. This new tech is like that bike, helping us use nature for power.",
            "whyItMatters": "Renewable energy helps fight climate change.",
            "mnemonic": "Energy from nature is like catching rain in a bucket."
          }
        ]
      },
      {
        "name": "🌿 What's happening with our planet?",
        "color": "#f5c6a0",
        "stories": [
          {
            "headline": "Wildlife conservation efforts increase.",
            "eli5": "Imagine a zoo where animals get more space and care. More conservation means better lives for animals in the wild.",
            "whyItMatters": "Protecting wildlife keeps ecosystems healthy.",
            "mnemonic": "Conservation is like giving a hug to nature."
          },
          {
            "headline": "New plastic waste reduction initiative launched.",
            "eli5": "Think of a messy room full of toys. Cleaning it up means feeling better. Reducing plastic waste helps our planet feel better.",
            "whyItMatters": "Less waste leads to a cleaner environment.",
            "mnemonic": "Plastic reduction is like putting away toys after playtime."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "What recent event aims to improve global peace?",
        "options": [
          "New trade agreement",
          "Peace treaty",
          "Sports event",
          "Cultural festival"
        ],
        "answer": 1,
        "funFact": "Peace treaties have been signed for centuries, helping to end conflicts."
      },
      {
        "q": "What is a benefit of new AI tools?",
        "options": [
          "More work",
          "Less creativity",
          "Better efficiency",
          "More confusion"
        ],
        "answer": 2,
        "funFact": "AI can assist humans in creative fields, enhancing our abilities."
      },
      {
        "q": "Why is reducing plastic waste important?",
        "options": [
          "It looks nice",
          "It saves money",
          "It protects the environment",
          "It makes things easier"
        ],
        "answer": 2,
        "funFact": "Reducing plastic helps prevent pollution and protects wildlife."
      }
    ]
  },
  "markets": {
    "globalPulse": {
      "eli5": "Think of global markets as a big river. Sometimes the water flows fast, and other times it slows down. Right now, it's a mix of calm areas and some exciting rapids.",
      "keyThings": [
        "S&P500: Gaining strength as companies report better earnings.",
        "Brent: Oil prices rising due to supply concerns in the Middle East.",
        "Gold: Steady as investors seek safety amidst market uncertainty.",
        "Nifty: Gaining traction with strong performances in tech and finance sectors."
      ]
    },
    "indianMarket": {
      "eli5": "Imagine a bustling bazaar where vendors showcase their goods. Some stalls are thriving while others are quiet. Right now, the energy is high, and everyone is on the lookout for the next big deal.",
      "breakouts": [
        {
          "name": "NSE:TCS — Tata Consultancy Services",
          "whyExciting": "TCS just landed a huge contract which promises lots of business. This could boost their profits significantly.",
          "risk": "However, competition in the tech sector is intense."
        },
        {
          "name": "NSE:RELIANCE — Reliance Industries",
          "whyExciting": "Reliance is expanding into renewable energy, which is in high demand. This could position them as a leader in the green sector.",
          "risk": "The transition might involve high initial costs."
        },
        {
          "name": "NSE:HDFC — HDFC Bank",
          "whyExciting": "HDFC is seeing an increase in home loans due to lower interest rates. This could enhance their customer base significantly.",
          "risk": "Economic downturns might affect repayment rates."
        }
      ],
      "ipoSpot": {
        "name": "IPO of ABC Tech",
        "verdict": "Apply",
        "eli5": "ABC Tech is launching a new gadget that everyone is excited about. This could be a great chance to invest early."
      },
      "lessonOfDay": {
        "title": "The Importance of Patience",
        "story": "Think of a farmer waiting for crops to grow. Rushing can ruin the harvest. Similarly, waiting for the right moment can lead to better investment outcomes.",
        "mnemonic": "Patience Pays Off"
      }
    },
    "quiz": [
      {
        "q": "What is the main reason for the rise in Brent prices?",
        "options": [
          "Increased demand",
          "Supply concerns",
          "Economic growth",
          "Seasonal changes"
        ],
        "answer": 1,
        "funFact": "Brent is a major benchmark for oil prices worldwide."
      },
      {
        "q": "Which company is expanding into renewable energy?",
        "options": [
          "TCS",
          "Reliance",
          "HDFC",
          "ABC Tech"
        ],
        "answer": 1,
        "funFact": "Reliance is one of the largest companies in India and is diversifying into green energy."
      },
      {
        "q": "What lesson did we learn today?",
        "options": [
          "Act quickly",
          "Be patient",
          "Invest all your money",
          "Avoid risks"
        ],
        "answer": 1,
        "funFact": "Patience is often key to successful farming and investing."
      }
    ]
  },
  "psychology": {
    "mindTrick": {
      "name": "The Illusory Truth Effect",
      "eli5": "Imagine hearing a rumor about a classmate every day. Each time you hear it, it feels more true. Like a catchy song you can't stop humming. The more you hear it, the more you believe it.",
      "realLife": "People often accept statements as true when they hear them repeatedly. This can affect opinions and beliefs.",
      "mnemonic": "Hear it, believe it, repeat it."
    },
    "bodyLanguage": {
      "signal": "Open Palms",
      "eli5": "When someone shows their palms, it's like saying 'I come in peace.' It makes them seem friendly. It’s like waving hello with your hands.",
      "howToUse": "Use open palms when talking to show you’re honest. It helps make the other person feel safe.",
      "mnemonic": "Palms up, trust me."
    },
    "superpower": {
      "name": "Empathy",
      "story": "Once, a girl named Mia saw her friend crying. Instead of ignoring it, she sat beside her. Mia listened and understood her feelings. This made her friend feel loved and less alone.",
      "shield": "Empathy helps you connect with others. It protects you from misunderstanding and builds strong relationships.",
      "mnemonic": "Feel with me, walk with me."
    },
    "quiz": [
      {
        "q": "What is the Illusory Truth Effect?",
        "options": [
          "Believing something because it's repeated",
          "Understanding emotions",
          "Reading body language",
          "Using logic to argue"
        ],
        "answer": 0,
        "funFact": "This effect is why ads repeat slogans!"
      },
      {
        "q": "What does showing open palms mean?",
        "options": [
          "Aggression",
          "Fear",
          "Trust",
          "Indifference"
        ],
        "answer": 2,
        "funFact": "Animals also use open gestures to show they're not a threat!"
      },
      {
        "q": "Why is empathy important?",
        "options": [
          "It's a superpower",
          "It helps in math",
          "It's just a feeling",
          "It makes you lonely"
        ],
        "answer": 0,
        "funFact": "Empathy can even lower stress levels in both people!"
      }
    ]
  },
  "leadership": {
    "leaderMove": {
      "name": "The Ripple Effect",
      "story": "A pebble lands in a pond. Ripples spread across the surface. Each ripple touches the shore. Small actions create big changes.",
      "doThis": "Encourage your team to share small wins. Celebrate every step forward.",
      "mnemonic": "PEBBLE - Promote Every Bit By Leading Effectively"
    },
    "visionarySecret": {
      "concept": "The Power of Imagination",
      "eli5": "Imagination is like a magic paintbrush. It colors our ideas and dreams. When we imagine, we see possibilities. This helps us create a better future.",
      "exercise": "Spend five minutes each day visualizing your goals. Picture them as if they are already happening.",
      "mnemonic": "PAINT - Picture All Ideas Now Today"
    },
    "eliteHabit": {
      "habit": "Daily Reflection",
      "whoAndHow": "Successful leaders like Nelson Mandela practiced reflection. They take time each day to think about their actions and lessons learned.",
      "whyItWorks": "Reflection helps us understand our choices. It guides us to make better decisions in the future.",
      "mnemonic": "THINK - Take Hours In Noticing Knowledge"
    },
    "sigmaWisdom": {
      "lesson": "Embrace Discomfort",
      "story": "A seed must break to grow. Pain leads to strength. Just like the seed, we must face challenges to thrive.",
      "action": "Seek out experiences that push your comfort zone.",
      "mnemonic": "SEED - Strengthen Every Experience Daily"
    },
    "quiz": [
      {
        "q": "What does the ripple effect illustrate?",
        "options": [
          "Small actions can lead to big changes",
          "Only large actions matter",
          "Ripples are just water",
          "Actions have no consequences"
        ],
        "answer": 0,
        "funFact": "The ripple effect is often used in social change discussions."
      },
      {
        "q": "What is a benefit of using imagination?",
        "options": [
          "It makes you daydream",
          "It helps see possibilities",
          "It's just for kids",
          "It wastes time"
        ],
        "answer": 1,
        "funFact": "Imagination is crucial for innovation and creativity."
      },
      {
        "q": "Why is daily reflection important?",
        "options": [
          "It helps us forget mistakes",
          "It guides better decisions",
          "It's a waste of time",
          "It only helps the weak"
        ],
        "answer": 2,
        "funFact": "Many successful people attribute their growth to regular reflection."
      }
    ]
  },
  "wealth": {
    "wealthSecret": {
      "name": "Compound Growth",
      "story": "Imagine a tiny seed. It grows into a big tree. Each branch represents growth over time. The longer you nurture it, the more fruit it bears.",
      "action": "Invest early and let it grow. Patience is key to seeing the rewards.",
      "mnemonic": "Sow, Grow, Harvest."
    },
    "moneyMachine": {
      "type": "Investment Portfolio",
      "eli5": "Think of an investment portfolio like a vending machine. You put in money, and over time, it gives you snacks in the form of returns. Choose wisely, and you'll get your favorites back.",
      "indiaAngle": "In India, investing in mutual funds is like picking different snacks in a vending machine. Diversifying across sectors can yield tasty returns.",
      "mnemonic": "Invest, Wait, Enjoy."
    },
    "mindsetFlip": {
      "oldThinking": "Money is just for spending.",
      "newThinking": "Money can work for you.",
      "why": "Changing how you view money can open doors. Instead of spending, think about how to invest and grow it. This shift can lead to financial freedom.",
      "mnemonic": "Spend vs. Invest."
    },
    "magicNumber": {
      "number": "50/30/20 Rule",
      "eli5": "Imagine you have a pie. You slice it into three pieces. Fifty percent is for needs, thirty for wants, and twenty for savings.",
      "mnemonic": "Slice the Pie."
    },
    "quiz": [
      {
        "q": "What is the best time to start investing?",
        "options": [
          "As soon as possible",
          "Only when you're rich",
          "When you're older",
          "Never"
        ],
        "answer": 0,
        "funFact": "Starting early can lead to significantly more wealth due to compounding."
      },
      {
        "q": "What does diversification in investing mean?",
        "options": [
          "Putting all money in one place",
          "Spreading money across different investments",
          "Only investing in stocks",
          "Avoiding all risk"
        ],
        "answer": 1,
        "funFact": "Diversification helps reduce risk and can lead to more stable returns."
      },
      {
        "q": "What is a common mistake new investors make?",
        "options": [
          "Researching before investing",
          "Investing too little",
          "Chasing hot stocks",
          "Building a diversified portfolio"
        ],
        "answer": 2,
        "funFact": "Chasing hot stocks often leads to losses, as trends can change quickly."
      }
    ]
  },
  "communication": {
    "speakingSkill": {
      "name": "Martin Luther King Jr.",
      "story": "He had a dream. His words danced like music. They inspired millions to strive for justice.",
      "drill": "Practice your speech in front of a mirror. Notice your body language.",
      "mnemonic": "Dream big, speak boldly."
    },
    "negotiationMove": {
      "tactic": "The Power of Silence",
      "eli5": "Imagine you're fishing. Waiting quietly helps catch the best fish. Silence can make others reveal their best ideas.",
      "script": "Let's take a moment of silence to think this over.",
      "mnemonic": "Silence is golden."
    },
    "officeWin": {
      "rule": "Celebrate small victories.",
      "story": "In one office, they ignored minor wins. Morale dropped. In another, they cheered every little success. People felt appreciated and worked harder.",
      "mistake": "Neglecting to recognize achievements leads to disengagement.",
      "mnemonic": "A win is a win."
    },
    "confidenceHack": {
      "technique": "Power Posing",
      "science": "Standing tall can trick your brain into feeling powerful. It boosts your confidence and reduces stress.",
      "doItNow": "Stand like a superhero for two minutes. Feel the difference in your mood.",
      "mnemonic": "Pose like a pro."
    },
    "quiz": [
      {
        "q": "What is the main theme of King's speech?",
        "options": [
          "Hope",
          "Fear",
          "Anger",
          "Sadness"
        ],
        "answer": 0,
        "funFact": "King's 'I Have a Dream' speech is one of the most famous speeches in history."
      },
      {
        "q": "What does silence do in negotiations?",
        "options": [
          "Intimidates",
          "Encourages",
          "Confuses",
          "Bores"
        ],
        "answer": 1,
        "funFact": "Silence can often be more powerful than words."
      },
      {
        "q": "Why celebrate small wins?",
        "options": [
          "To waste time",
          "To motivate",
          "To distract",
          "To annoy"
        ],
        "answer": 1,
        "funFact": "Celebrating small wins can boost team morale significantly."
      }
    ]
  },
  "mind": {
    "brainHack": {
      "name": "Mind Mapping",
      "eli5": "Imagine your thoughts are wild horses running in a field. Mind mapping is like herding those horses into a neat pen. Each horse represents a different idea, and with mapping, they become organized and easier to manage.",
      "protocol": "Start with a central idea on paper. Draw branches for related thoughts, adding more branches as needed.",
      "mnemonic": "Herd the Horses"
    },
    "disciplineCode": {
      "principle": "Consistency is Key",
      "story": "Once, a warrior trained daily, even in rain or shine. His friends often skipped practice, but he remained steadfast. When battle came, he was the strongest, while others faltered.",
      "todayAction": "Pick one small task to do consistently today. Complete it, no matter what.",
      "mnemonic": "Train Like a Warrior"
    },
    "impulseKiller": {
      "urge": "Snacking",
      "eli5": "Think of your urge to snack as a pesky monster under your bed. When you ignore it, it grows louder and scarier. But if you face it, it shrinks and becomes less intimidating.",
      "interrupt": "When the urge hits, drink a glass of water first. Wait ten minutes before deciding to snack.",
      "mnemonic": "Confront the Monster"
    },
    "bodyUpgrade": {
      "practice": "Daily Stretching",
      "eli5": "Stretching is like watering a plant. Without water, it wilts and struggles. But with regular watering, it thrives and grows strong.",
      "minimumDose": "Just five minutes of stretching can make a big difference.",
      "mnemonic": "Water Your Plant"
    },
    "quiz": [
      {
        "q": "What is mind mapping used for?",
        "options": [
          "Organizing thoughts",
          "Drawing pictures",
          "Writing stories",
          "Cooking recipes"
        ],
        "answer": 0,
        "funFact": "Mind mapping can boost creativity and memory!"
      },
      {
        "q": "Why is consistency important?",
        "options": [
          "It builds habits",
          "It wastes time",
          "It confuses others",
          "It's boring"
        ],
        "answer": 1,
        "funFact": "Consistent actions lead to greater achievements over time!"
      },
      {
        "q": "What should you do before snacking?",
        "options": [
          "Eat more",
          "Drink water",
          "Go for a run",
          "Take a nap"
        ],
        "answer": 1,
        "funFact": "Staying hydrated can reduce unnecessary snacking!"
      }
    ]
  },
  "knowledge": {
    "mathMagic": {
      "concept": "Fibonacci Sequence",
      "eli5": "Imagine a rabbit family. They start with one pair. Each month, they create another pair. Soon, the rabbit family grows like magic!",
      "realWorldUse": "This sequence appears in nature, like in flower petals. It helps in art and architecture for pleasing designs.",
      "mnemonic": "1, 1, 2, 3, 5, 8... Just add the last two numbers!"
    },
    "scienceWow": {
      "field": "Biology",
      "concept": "Photosynthesis",
      "eli5": "Plants are like little chefs. They use sunlight to cook their food. Carbon dioxide and water are their ingredients. The food is sugar, and they release oxygen like a delicious aroma!",
      "mindBlow": "Without photosynthesis, life as we know it would not exist. It's the original solar-powered system!",
      "mnemonic": "Sun + Water + CO2 = Sugar + O2"
    },
    "historyStory": {
      "event": "The Discovery of Penicillin",
      "story": "In 1928, Alexander Fleming found mold in his lab. It was growing on a petri dish. The mold was killing bacteria! This accident changed medicine forever.",
      "lesson": "Sometimes, mistakes lead to great breakthroughs. Keep your eyes open for surprises!",
      "mnemonic": "Fleming + Mold = Medicine Magic"
    },
    "earthSecret": {
      "place": "Amazon Rainforest",
      "secret": "This forest is home to about 10% of all species on Earth. It's like a treasure chest of biodiversity. Every day, scientists discover new plants and animals!",
      "edge": "Protecting the Amazon helps combat climate change. It also preserves countless unknown species that could hold cures for diseases.",
      "mnemonic": "Amazon = Nature's Treasure Chest"
    },
    "quiz": [
      {
        "q": "What does the Fibonacci Sequence help with in nature?",
        "options": [
          "Flower petals",
          "Clouds",
          "Mountains",
          "Rivers"
        ],
        "answer": 0,
        "funFact": "Some pine cones and pineapples also follow this sequence!"
      },
      {
        "q": "Who discovered penicillin?",
        "options": [
          "Marie Curie",
          "Albert Einstein",
          "Alexander Fleming",
          "Isaac Newton"
        ],
        "answer": 2,
        "funFact": "Fleming's discovery was a happy accident!"
      },
      {
        "q": "What percentage of species does the Amazon Rainforest host?",
        "options": [
          "5%",
          "10%",
          "15%",
          "20%"
        ],
        "answer": 1,
        "funFact": "It's one of the most biodiverse places on Earth!"
      }
    ]
  },
  "ai": {
    "toolSpotlight": {
      "name": "WriteBot",
      "category": "writing",
      "eli5": "Imagine a friendly robot that helps you write stories. It's like having a pen that talks back! You tell it your ideas, and it helps you turn them into words.",
      "secretMove": "Use WriteBot to brainstorm ideas before starting your draft. It can suggest themes and characters to get your creativity flowing.",
      "mnemonic": "WRIT - Write, Revise, Inspire, Transform."
    },
    "workflowWin": {
      "title": "Email Organizer",
      "problem": "Sorting through emails can feel like finding a needle in a haystack. This tool helps you categorize and prioritize them easily.",
      "steps": [
        "Connect your email account",
        "Select categories like 'Urgent' or 'Follow Up'",
        "Let the tool analyze your inbox",
        "Review and adjust your organized emails"
      ],
      "timeSaved": "You can save up to an hour each week by using this tool.",
      "mnemonic": "SORT - Sort, Organize, Review, Tackle."
    },
    "promptOfDay": {
      "purpose": "This helps you generate creative ideas for your next project.",
      "prompt": "Generate a list of unique ideas for [PROJECT TYPE] related to [TOPIC].",
      "where": "ChatGPT",
      "mnemonic": "IDEAS - Inspire, Develop, Explore, Apply, Share."
    },
    "futureWatch": {
      "trend": "AI in personal coaching.",
      "eli5": "Before, coaching was just for a few. Now, AI makes it available for everyone like a virtual cheerleader! Imagine having a coach who knows you well and gives tips anytime you need.",
      "yourMove": "Consider using AI coaching apps to improve skills. It’s like having a coach in your pocket ready to help.",
      "mnemonic": "COACH - Connect, Observe, Advise, Challenge, Help."
    },
    "quiz": [
      {
        "q": "What is the main function of WriteBot?",
        "options": [
          "Writing stories",
          "Sorting emails",
          "Organizing tasks",
          "Creating graphics"
        ],
        "answer": 0,
        "funFact": "WriteBot can help you overcome writer's block!"
      },
      {
        "q": "How much time can you save with Email Organizer?",
        "options": [
          "30 minutes",
          "1 hour",
          "2 hours",
          "5 minutes"
        ],
        "answer": 1,
        "funFact": "Organizing emails can make you more productive!"
      },
      {
        "q": "What does the daily prompt help with?",
        "options": [
          "Generating ideas",
          "Sending emails",
          "Tracking tasks",
          "Managing schedules"
        ],
        "answer": 2,
        "funFact": "Prompts can spark creativity and lead to amazing projects!"
      }
    ]
  },
  "travel": {
    "destination": {
      "country": "Italy",
      "region": "Tuscany",
      "eli5": "Imagine rolling hills covered in vineyards. Picture charming villages with cobblestone streets. The food is delicious, with pasta and wine everywhere. The sunsets paint the sky in beautiful colors.",
      "bestTime": "Visit in late spring or early fall for perfect weather. The crowds are smaller, and the scenery is stunning.",
      "hiddenGem": "Check out the small village of Pienza. It’s famous for its cheese and has breathtaking views of the countryside.",
      "mnemonic": "Tuscany is like a painting come to life."
    },
    "visaTip": {
      "focus": "Italy visa for Indian passport",
      "eli5": "You need a Schengen visa to visit Italy. Apply online and gather your documents like travel insurance and hotel bookings. Submit your application at the nearest embassy or visa center.",
      "goldenTip": "Start the application early, as it can take weeks to process. Double-check your documents to avoid delays.",
      "mnemonic": "Visa for Italy is like a ticket to a masterpiece."
    },
    "culturalCode": {
      "culture": "Italians love food, family, and celebrations. They enjoy long meals and lively conversations.",
      "doThis": "Join a local family for a meal; it's a great way to bond. Learn a few Italian phrases to show respect.",
      "neverDoThis": "Don’t rush through meals; it’s rude. Avoid discussing politics or personal finances openly.",
      "mnemonic": "In Italy, food is love."
    },
    "quiz": [
      {
        "q": "What is Tuscany famous for?",
        "options": [
          "Beaches",
          "Vineyards",
          "Mountains",
          "Deserts"
        ],
        "answer": 1,
        "funFact": "Tuscany produces some of the best wines in the world."
      },
      {
        "q": "Which cheese is Pienza famous for?",
        "options": [
          "Parmesan",
          "Mozzarella",
          "Pecorino",
          "Gorgonzola"
        ],
        "answer": 2,
        "funFact": "Pecorino cheese is made from sheep's milk and is a local favorite."
      },
      {
        "q": "What is a common Italian greeting?",
        "options": [
          "Hola",
          "Bonjour",
          "Ciao",
          "Hello"
        ],
        "answer": 2,
        "funFact": "Ciao can mean both hello and goodbye in Italian."
      }
    ]
  }
}

const d260609 = {
  "news": {
    "segments": [
      {
        "name": "🌐 What's happening with countries?",
        "color": "#a0d4f5",
        "stories": [
          {
            "headline": "Peace Talks in the Middle East Show Progress",
            "eli5": "Imagine two kids fighting over a toy. They start talking and realize sharing is better. They agree to take turns. Now everyone is happy!",
            "whyItMatters": "Peace helps everyone live better lives.",
            "mnemonic": "Kids sharing toys = peace talks."
          },
          {
            "headline": "New Trade Deal Between Canada and Mexico",
            "eli5": "Think of two friends trading snacks. One has cookies, the other has chips. They swap to enjoy a mix of treats. Both are happier.",
            "whyItMatters": "Trade boosts economies and creates jobs.",
            "mnemonic": "Cookies and chips = trade deal."
          },
          {
            "headline": "Election Results Change Leadership in Brazil",
            "eli5": "It's like a sports team changing its captain. The new captain has different ideas on how to win. Fans are excited for the new season.",
            "whyItMatters": "Leadership impacts policies and people's lives.",
            "mnemonic": "Captain change = leadership change."
          }
        ]
      },
      {
        "name": "💸 What's happening with money?",
        "color": "#a8edcb",
        "stories": [
          {
            "headline": "Stock Markets Rally After Positive Economic News",
            "eli5": "Imagine a balloon that keeps getting bigger. Good news makes it float higher. Everyone wants to join the fun!",
            "whyItMatters": "A strong market means more investments and jobs.",
            "mnemonic": "Balloon rises = stock market up."
          },
          {
            "headline": "Cryptocurrency Sees Major Gains",
            "eli5": "Think of a rare collectible card. If everyone wants it, its value goes up. The same happens with digital coins.",
            "whyItMatters": "Increased value attracts new investors.",
            "mnemonic": "Collectible card = crypto gains."
          },
          {
            "headline": "Inflation Rates Remain Stable",
            "eli5": "Picture a seesaw that stays balanced. Prices don’t swing too high or low. Everyone can plan their spending.",
            "whyItMatters": "Stable prices help people budget better.",
            "mnemonic": "Seesaw balanced = stable inflation."
          }
        ]
      },
      {
        "name": "💻 What's happening with technology?",
        "color": "#c9b8f5",
        "stories": [
          {
            "headline": "New Smartphone Features AI Assistant",
            "eli5": "It's like having a super-smart friend in your pocket. They help you find answers and remind you of important things.",
            "whyItMatters": "AI makes our lives easier and more efficient.",
            "mnemonic": "Smart friend = AI assistant."
          },
          {
            "headline": "Breakthrough in Quantum Computing",
            "eli5": "Imagine a super-fast train that can take shortcuts. It reaches its destination quicker than regular trains.",
            "whyItMatters": "Faster computing leads to innovations.",
            "mnemonic": "Fast train = quantum leap."
          }
        ]
      },
      {
        "name": "🌿 What's happening with our planet?",
        "color": "#f5c6a0",
        "stories": [
          {
            "headline": "New Global Initiative to Combat Climate Change",
            "eli5": "Think of a team of superheroes joining forces. They each bring their powers to fight a big villain—climate change.",
            "whyItMatters": "Working together can save our planet.",
            "mnemonic": "Superheroes unite = climate action."
          },
          {
            "headline": "Wildlife Conservation Efforts Show Positive Results",
            "eli5": "Imagine planting seeds in a garden. With care, flowers bloom and attract bees. Nature thrives when we help it.",
            "whyItMatters": "Healthy wildlife balances ecosystems.",
            "mnemonic": "Blooming flowers = conservation success."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "What is a major topic in today's news?",
        "options": [
          "Sports",
          "Politics",
          "Weather",
          "Health"
        ],
        "answer": 1,
        "funFact": "Politics affects everyone's lives every day!"
      },
      {
        "q": "What is driving the stock market up?",
        "options": [
          "Good news",
          "Bad news",
          "No news",
          "Fake news"
        ],
        "answer": 0,
        "funFact": "Good news can boost confidence and investments."
      },
      {
        "q": "What helps wildlife thrive?",
        "options": [
          "Pollution",
          "Conservation",
          "Neglect",
          "Hunting"
        ],
        "answer": 1,
        "funFact": "Conservation efforts can bring species back from the brink!"
      }
    ]
  },
  "markets": {
    "globalPulse": {
      "eli5": "Imagine a river flowing with different currents. Sometimes it's calm and stable, other times it rushes and swirls. Today, global markets are like that river, with some currents pushing up while others pull down.",
      "keyThings": [
        "S&P500: Up slightly as tech stocks rally.",
        "Brent: Oil prices steady, like a boat anchored in calm waters.",
        "Gold: Prices dip a bit, like a treasure chest losing some shine.",
        "Nifty: Indian stocks rise, reflecting a bustling marketplace."
      ]
    },
    "indianMarket": {
      "eli5": "Think of the stock market like a vibrant bazaar. Vendors are trading goods and prices fluctuate based on demand. Today, the bazaar is busy, with some stalls booming and others quiet.",
      "breakouts": [
        {
          "name": "NSE:RELIANCE — Reliance Industries",
          "whyExciting": "New energy projects spark interest. Investors see potential for growth.",
          "risk": "Market volatility could affect returns."
        },
        {
          "name": "NSE:TCS — Tata Consultancy Services",
          "whyExciting": "Strong quarterly earnings impress analysts. Tech sector thrives with demand.",
          "risk": "Global tech trends may shift unexpectedly."
        },
        {
          "name": "NSE:BAJFINANCE — Bajaj Finance",
          "whyExciting": "Innovative financial products attract young investors. Growth in digital finance is promising.",
          "risk": "Economic downturn could impact loan repayments."
        }
      ],
      "ipoSpot": {
        "name": "IPO: ABC Tech Solutions",
        "verdict": "Apply",
        "eli5": "This IPO looks like a fresh fruit in the market. It's ripe with potential, but buyers should be cautious of spoiled goods."
      },
      "lessonOfDay": {
        "title": "Patience in Investing",
        "story": "Imagine planting a tree. It takes time to grow and bear fruit. Rushing it can lead to failures. Waiting for the right time can yield a bountiful harvest.",
        "mnemonic": "Plant, Water, Wait, Harvest."
      }
    },
    "quiz": [
      {
        "q": "What does S&P500 reflect?",
        "options": [
          "Technology Stocks",
          "American Economy",
          "Oil Prices",
          "Gold Prices"
        ],
        "answer": 1,
        "funFact": "The S&P500 includes 500 of the largest companies in the U.S.!"
      },
      {
        "q": "Which sector is booming in India right now?",
        "options": [
          "Real Estate",
          "Tech",
          "Agriculture",
          "Manufacturing"
        ],
        "answer": 1,
        "funFact": "The tech sector has seen rapid growth due to digital transformation."
      },
      {
        "q": "What should you consider when applying for an IPO?",
        "options": [
          "Brand Name",
          "Market Trends",
          "Allergies",
          "Fashion Trends"
        ],
        "answer": 1,
        "funFact": "Understanding market conditions can help you make better investment choices!"
      }
    ]
  },
  "psychology": {
    "mindTrick": {
      "name": "The Illusion of Choice",
      "eli5": "Imagine choosing between chocolate or vanilla ice cream. You think you made a choice. But what if both were in front of you? Sometimes, options are set up to make you feel in control, even when you aren't.",
      "realLife": "In stores, brands create choices to make you feel special. But often, those choices lead you to the same product.",
      "mnemonic": "Choice is an illusion."
    },
    "bodyLanguage": {
      "signal": "Crossed arms",
      "eli5": "Crossed arms can mean someone is cold or closed off. It's like putting up a tiny fence around yourself. But sometimes, it's just comfortable!",
      "howToUse": "If you see crossed arms, approach gently. It might mean they need space or are feeling defensive.",
      "mnemonic": "Arms crossed, mind blocked."
    },
    "superpower": {
      "name": "Empathy",
      "story": "Once, a teacher noticed a student acting sad. Instead of scolding, she asked how he felt. He shared his worries about home. She listened and helped him feel understood.",
      "shield": "Empathy protects you from misunderstanding others. It creates connections that make you stronger.",
      "mnemonic": "Feel with others."
    },
    "quiz": [
      {
        "q": "What does crossed arms usually signal?",
        "options": [
          "A: Coldness",
          "B: Happiness",
          "C: Confusion",
          "D: Anger"
        ],
        "answer": 0,
        "funFact": "Crossed arms can indicate someone is feeling defensive, but they might just be cold!"
      },
      {
        "q": "What is a common mind trick in shopping?",
        "options": [
          "A: Real choice",
          "B: Illusion of choice",
          "C: No choice",
          "D: Forced choice"
        ],
        "answer": 1,
        "funFact": "Stores often create many options to make you feel in control, when they might all lead to the same thing."
      },
      {
        "q": "What superpower helps you connect with others?",
        "options": [
          "A: Strength",
          "B: Speed",
          "C: Empathy",
          "D: Invisibility"
        ],
        "answer": 2,
        "funFact": "Empathy allows you to understand and share the feelings of others, creating strong bonds."
      }
    ]
  },
  "leadership": {
    "leaderMove": {
      "name": "Empower Others",
      "story": "Once in a forest, a wise owl taught the young birds to fly. They struggled at first but eventually soared high. The owl felt proud as they spread their wings. Empowerment turned them into leaders of the skies.",
      "doThis": "Encourage your team to take ownership of their projects. Trust them to make decisions and watch them grow.",
      "mnemonic": "Eagles Fly Together"
    },
    "visionarySecret": {
      "concept": "Future Visualization",
      "eli5": "Imagine your dream is a castle in the sky. You need to build a ladder to reach it. Each step is a small goal you can achieve. Soon, you’ll be standing on top of your castle, looking down at your success.",
      "exercise": "Spend five minutes picturing your ideal future. Write down three steps to make it real.",
      "mnemonic": "Ladders to Castles"
    },
    "eliteHabit": {
      "habit": "Daily Reflection",
      "whoAndHow": "Many great leaders, like Nelson Mandela, practiced reflection. Take ten minutes each day to think about your actions and learn from them.",
      "whyItWorks": "Reflection helps you understand your strengths and weaknesses. It guides you to make better decisions in the future.",
      "mnemonic": "Mirror of Growth"
    },
    "sigmaWisdom": {
      "lesson": "Patience in Progress",
      "story": "A tortoise and a hare raced. The hare sprinted ahead, but the tortoise kept moving steadily. In the end, patience won the race.",
      "action": "Focus on your long-term goals and take small steps every day.",
      "mnemonic": "Tortoise Triumphs"
    },
    "quiz": [
      {
        "q": "What is important for team empowerment?",
        "options": [
          "Micromanagement",
          "Trust",
          "Criticism",
          "Indifference"
        ],
        "answer": 1,
        "funFact": "Teams that feel trusted perform 50% better."
      },
      {
        "q": "Why is future visualization useful?",
        "options": [
          "It distracts you",
          "It creates confusion",
          "It helps set goals",
          "It wastes time"
        ],
        "answer": 2,
        "funFact": "Visualization activates the same brain areas as actually doing the task."
      },
      {
        "q": "What is a benefit of daily reflection?",
        "options": [
          "More stress",
          "Better decisions",
          "Less clarity",
          "Increased anxiety"
        ],
        "answer": 1,
        "funFact": "Reflection can increase emotional intelligence by up to 20%."
      }
    ]
  },
  "wealth": {
    "wealthSecret": {
      "name": "The Acorn Principle",
      "story": "An acorn can grow into a mighty oak tree. It needs time, care, and the right conditions. Wealth works the same way. Start small, nurture your investments, and watch them grow.",
      "action": "Invest regularly, even small amounts. Patience is key to seeing your wealth flourish.",
      "mnemonic": "ACORN - Always Cultivate Opportunities, Reinforce Nurturing."
    },
    "moneyMachine": {
      "type": "Real Estate",
      "eli5": "Imagine a vending machine that gives you money instead of snacks. You put in some coins (your investment) and get cash back over time (rental income). The more machines you own, the more money you make.",
      "indiaAngle": "In India, real estate can be a goldmine with rising urban populations. Investing in growing cities can lead to big profits as demand increases.",
      "mnemonic": "RENT - Real Estate Nets Treasure."
    },
    "mindsetFlip": {
      "oldThinking": "Money is limited and hard to earn.",
      "newThinking": "Money is abundant and there are many ways to create it.",
      "why": "This shift opens up new opportunities. Believing in abundance helps you spot chances to earn more. It’s like switching from a scarcity diet to a buffet of options.",
      "mnemonic": "ABUNDANCE - Always Believe Unseen New Dreams And Nurture Cash Earnings."
    },
    "magicNumber": {
      "number": "The 10x Rule",
      "eli5": "Imagine you want to build a sandcastle. Instead of making one small castle, you decide to make ten! With more effort, your castles get bigger and better. The 10x Rule means you put in ten times the effort for ten times the results.",
      "mnemonic": "10X - Ten Times Effort Equals Ten Times Success."
    },
    "quiz": [
      {
        "q": "What is the key to growing wealth according to the Acorn Principle?",
        "options": [
          "Immediate returns",
          "Patience and nurturing",
          "Big investments only",
          "Quick flips"
        ],
        "answer": 1,
        "funFact": "The longest-living oak trees can grow for over 100 years!"
      },
      {
        "q": "What analogy helps explain real estate investing?",
        "options": [
          "Vending machine",
          "Bookstore",
          "Garden",
          "Library"
        ],
        "answer": 0,
        "funFact": "The first vending machine was invented in 1883 and dispensed postcards!"
      },
      {
        "q": "What does the 10x Rule encourage?",
        "options": [
          "Minimal effort",
          "Same effort",
          "10 times the effort",
          "No effort"
        ],
        "answer": 2,
        "funFact": "The idea of 10x effort can be found in many successful entrepreneurs' strategies!"
      }
    ]
  },
  "communication": {
    "speakingSkill": {
      "name": "Martin Luther King Jr.",
      "story": "Martin Luther King Jr. captivated crowds with his powerful speeches. His famous 'I Have a Dream' speech inspired millions. He spoke not just with words, but with passion and hope.",
      "drill": "Practice making eye contact while speaking. This helps connect with your audience.",
      "mnemonic": "MLK - Masterful Language King"
    },
    "negotiationMove": {
      "tactic": "The Anchor Technique",
      "eli5": "Imagine you're trying to buy a toy. If you say a high price first, it makes the seller think that's the starting point. You’re setting the stage for the price they expect.",
      "script": "Let's start the conversation at $500. This gives us a solid point to work from.",
      "mnemonic": "Anchor Down"
    },
    "officeWin": {
      "rule": "Share credit for successes.",
      "story": "In one team, only one person took all the praise. In another, everyone shared their achievements. The second team felt more united and motivated.",
      "mistake": "Not recognizing others can hurt teamwork.",
      "mnemonic": "Share and Shine"
    },
    "confidenceHack": {
      "technique": "Power Posing",
      "science": "Standing tall can trick your brain into feeling more powerful. It boosts your confidence just like wearing a superhero cape.",
      "doItNow": "Stand with your hands on your hips for two minutes. Feel the difference in your energy.",
      "mnemonic": "Pose Like a Pro"
    },
    "quiz": [
      {
        "q": "Who delivered the 'I Have a Dream' speech?",
        "options": [
          "A. Nelson Mandela",
          "B. Martin Luther King Jr.",
          "C. Winston Churchill",
          "D. Franklin D. Roosevelt"
        ],
        "answer": 1,
        "funFact": "King's speech was delivered during the 1963 March on Washington."
      },
      {
        "q": "What does the Anchor Technique do?",
        "options": [
          "A. Sets a low price",
          "B. Sets a high price",
          "C. Avoids negotiation",
          "D. Creates conflict"
        ],
        "answer": 1,
        "funFact": "Using an anchor can influence the final agreement."
      },
      {
        "q": "Why is sharing credit important?",
        "options": [
          "A. It shows teamwork",
          "B. It creates jealousy",
          "C. It doesn't matter",
          "D. It weakens bonds"
        ],
        "answer": 0,
        "funFact": "Teams that share success feel more connected."
      }
    ]
  },
  "mind": {
    "brainHack": {
      "name": "Wild Horse Focus",
      "eli5": "Imagine your thoughts are wild horses. They run everywhere, making it hard to ride them. To focus, you need to corral them into one area. Then, you can steer them where you want.",
      "protocol": "Find a quiet spot. Close your eyes and take a deep breath. Imagine gathering your thoughts like herding wild horses.",
      "mnemonic": "Corral, Breathe, Steer"
    },
    "disciplineCode": {
      "principle": "Consistency is Key.",
      "story": "There was a warrior who trained daily, rain or shine. He knew that a single day off could lead him astray. His dedication made him unbeatable in battle.",
      "todayAction": "Pick one small task and do it every day. This builds a strong habit.",
      "mnemonic": "Daily Steps, Warrior Prep"
    },
    "impulseKiller": {
      "urge": "Snacking",
      "eli5": "Imagine a sneaky monster that whispers for snacks. You have to outsmart the monster to resist its call.",
      "interrupt": "When you feel the urge, drink a glass of water. Wait five minutes before deciding to snack.",
      "mnemonic": "Water First, Monster Last"
    },
    "bodyUpgrade": {
      "practice": "Daily Stretching.",
      "eli5": "Think of your body like a rubber band. Stretching keeps it flexible and strong. If you don’t stretch, it becomes stiff.",
      "minimumDose": "Just five minutes a day can make a difference.",
      "mnemonic": "Stretch and Flex, Feel the Next"
    },
    "quiz": [
      {
        "q": "What is the key to focus according to the brain hack?",
        "options": [
          "Corral thoughts",
          "Run wild",
          "Ignore distractions",
          "Stay busy"
        ],
        "answer": 0,
        "funFact": "Focused attention can improve memory and learning."
      },
      {
        "q": "What did the warrior in the story believe in?",
        "options": [
          "Luck",
          "Consistency",
          "Speed",
          "Strength"
        ],
        "answer": 1,
        "funFact": "Consistent practice is often more effective than raw talent."
      },
      {
        "q": "What should you drink to combat snacking urges?",
        "options": [
          "Juice",
          "Soda",
          "Water",
          "Coffee"
        ],
        "answer": 2,
        "funFact": "Sometimes, thirst is confused with hunger!"
      }
    ]
  },
  "knowledge": {
    "mathMagic": {
      "concept": "Fractals",
      "eli5": "Imagine a tree. Each branch splits into two smaller branches. The smaller branches look like tiny trees. It's like a never-ending pattern of trees within trees.",
      "realWorldUse": "Fractals help design computer graphics in movies. They also appear in nature, like coastlines and snowflakes.",
      "mnemonic": "Fractals are like fancy trees."
    },
    "scienceWow": {
      "field": "Astronomy",
      "concept": "Black Holes",
      "eli5": "Picture a giant vacuum cleaner in space. It sucks in everything nearby, even light! They are super mysterious and hard to see. Imagine the biggest whirlpool in the universe!",
      "mindBlow": "Some scientists think black holes could lead to other universes. They bend space and time in ways we can't fully understand.",
      "mnemonic": "Black holes are cosmic vacuum cleaners."
    },
    "historyStory": {
      "event": "The Fall of the Berlin Wall",
      "story": "In 1989, the Berlin Wall came crashing down. People cheered and hugged, breaking free from division. Families reunited after years apart. It was a moment of hope and freedom!",
      "lesson": "Unity can overcome barriers. Change is possible when people stand together.",
      "mnemonic": "The wall fell and hope soared."
    },
    "earthSecret": {
      "place": "Antarctica",
      "secret": "Antarctica is the driest, windiest, and coldest continent. It holds about 70% of the world's fresh water in ice. Some scientists think there are undiscovered species under the ice!",
      "edge": "Understanding Antarctica helps us learn about climate change. It could reveal secrets about our planet's past.",
      "mnemonic": "Antarctica: ice, secrets, and survival."
    },
    "quiz": [
      {
        "q": "What natural structure is an example of a fractal?",
        "options": [
          "Mountain",
          "Tree",
          "River",
          "Cloud"
        ],
        "answer": 1,
        "funFact": "Trees are just one of many examples of fractals in nature!"
      },
      {
        "q": "What is a unique feature of black holes?",
        "options": [
          "They shine bright",
          "They suck in light",
          "They float in space",
          "They have rings"
        ],
        "answer": 1,
        "funFact": "Black holes are so dense that not even light can escape them!"
      },
      {
        "q": "What did the fall of the Berlin Wall symbolize?",
        "options": [
          "Division",
          "Freedom",
          "Isolation",
          "Destruction"
        ],
        "answer": 1,
        "funFact": "The Berlin Wall's fall marked the end of the Cold War in Europe!"
      }
    ]
  },
  "ai": {
    "toolSpotlight": {
      "name": "WriterBot Pro",
      "category": "writing",
      "eli5": "Imagine a magic robot that listens to your ideas and turns them into stories. It understands your thoughts and helps you write like a pro. It's like having a super-smart friend who can write fast!",
      "secretMove": "Use it to brainstorm ideas. It can create outlines and suggestions in seconds, making your writing process smoother.",
      "mnemonic": "WRIT - Write Rapidly with Intelligent Technology"
    },
    "workflowWin": {
      "title": "Quick Research Assistant",
      "problem": "Finding information can take a lot of time. This tool helps you gather facts quickly.",
      "steps": [
        "Open the tool.",
        "Type your research question.",
        "Review the gathered information.",
        "Use it in your project."
      ],
      "timeSaved": "You could save hours of searching.",
      "mnemonic": "FAST - Find Answers Swiftly and Timely"
    },
    "promptOfDay": {
      "purpose": "This prompt helps generate creative ideas.",
      "prompt": "Generate a list of creative project ideas for [TOPIC].",
      "where": "Claude",
      "mnemonic": "IDEA - Inspire Dreams with Engaging Action"
    },
    "futureWatch": {
      "trend": "AI in Everyday Tools",
      "eli5": "Before, we did everything manually, like writing with a quill. Now, we have AI helping us, like having a super assistant. In the future, it will be even more integrated, like having AI built into our daily tasks.",
      "yourMove": "Start using AI tools now to get familiar. Experiment with different apps to find what fits best.",
      "mnemonic": "AIDE - AI for Daily Enhancements"
    },
    "quiz": [
      {
        "q": "What is the main function of WriterBot Pro?",
        "options": [
          "Research",
          "Writing",
          "Editing",
          "Formatting"
        ],
        "answer": 1,
        "funFact": "WriterBot Pro can help even the most experienced writers!"
      },
      {
        "q": "What does the Quick Research Assistant do?",
        "options": [
          "Organizes files",
          "Finds information",
          "Edits documents",
          "Creates presentations"
        ],
        "answer": 1,
        "funFact": "This tool can reduce research time by up to 90%!"
      },
      {
        "q": "What is the purpose of today's prompt?",
        "options": [
          "To create stories",
          "To generate project ideas",
          "To summarize articles",
          "To write emails"
        ],
        "answer": 1,
        "funFact": "Using prompts can spark amazing creativity!"
      }
    ]
  },
  "travel": {
    "destination": {
      "country": "Italy",
      "region": "Tuscany",
      "eli5": "Imagine rolling hills covered in green. Picture vineyards and olive groves everywhere. Smell the fresh pasta and taste the rich wines. It's like stepping into a painting.",
      "bestTime": "Visit in spring or fall. The weather is perfect for exploring.",
      "hiddenGem": "Check out the small town of Pienza. It's known for its cheese and stunning views.",
      "mnemonic": "IT-TO-PAINT"
    },
    "visaTip": {
      "focus": "Italy",
      "eli5": "Indian passport holders need a Schengen visa. Apply online or visit the nearest consulate. Make sure to have your documents ready.",
      "goldenTip": "Book your appointment early to avoid delays. Double-check your application for any mistakes.",
      "mnemonic": "IT-VISA-APP"
    },
    "culturalCode": {
      "culture": "Italian culture is all about family and food. They value conversation and laughter.",
      "doThis": "Try to learn a few Italian phrases. Share a meal with locals; they love it!",
      "neverDoThis": "Don't rush through meals; it's considered rude. Avoid discussing money or politics at dinner.",
      "mnemonic": "IT-CULTURE-FAMILY"
    },
    "quiz": [
      {
        "q": "What is the capital of Italy?",
        "options": [
          "Rome",
          "Milan",
          "Venice",
          "Florence"
        ],
        "answer": 0,
        "funFact": "Rome is known as the 'Eternal City' and has a history of over 2,500 years."
      },
      {
        "q": "Which famous landmark is located in Italy?",
        "options": [
          "Eiffel Tower",
          "Colosseum",
          "Big Ben",
          "Statue of Liberty"
        ],
        "answer": 1,
        "funFact": "The Colosseum could hold up to 80,000 spectators in ancient times."
      },
      {
        "q": "What is a traditional Italian dish?",
        "options": [
          "Sushi",
          "Tacos",
          "Pizza",
          "Burgers"
        ],
        "answer": 2,
        "funFact": "Pizza was invented in Naples and is loved worldwide!"
      }
    ]
  }
}

const d260610 = {
  "news": {
    "segments": [
      {
        "name": "🌐 What's happening with countries?",
        "color": "#a0d4f5",
        "stories": [
          {
            "headline": "US-Iran Tensions Escalate",
            "eli5": "Imagine two neighbors who used to argue but decided to stop fighting for a while. Now, they are back to shouting and throwing things at each other. The US and Iran had a tense ceasefire, but now they are clashing again, stirring worries about their neighborhood  -  the Middle East.",
            "whyItMatters": "This matters because when countries fight, it can affect oil prices and global peace.",
            "mnemonic": "Think of the US and Iran as two feuding neighbors with a history of drama."
          },
          {
            "headline": "Middle East Stability Concerns",
            "eli5": "Picture a jigsaw puzzle where each piece represents a country. If two pieces shake, the whole picture can fall apart. The renewed tensions between the US and Iran are causing worries about the stability of the entire Middle East.",
            "whyItMatters": "A stable Middle East is crucial for energy security worldwide, affecting prices at the pump.",
            "mnemonic": "Middle East stability is like a delicate puzzle; one piece out of place can cause chaos."
          }
        ]
      },
      {
        "name": "💸 What's happening with money?",
        "color": "#a8edcb",
        "stories": [
          {
            "headline": "Crude Oil Prices Rebound",
            "eli5": "Think of crude oil prices like a balloon. When tensions rise, the balloon inflates. Today, it popped back up to over $91 per barrel, squeezing the pockets of everyone who buys gas.",
            "whyItMatters": "Higher oil prices can hit our wallets hard when we fill up our cars or heat our homes.",
            "mnemonic": "Crude oil prices are like balloons  -  they rise under pressure!"
          },
          {
            "headline": "Investor Caution Ahead of US Inflation Data",
            "eli5": "Imagine waiting for the results of a big test. Investors are holding their breath, waiting for the US inflation report, which could change how much money they can make. Everyone is nervous.",
            "whyItMatters": "Inflation affects interest rates and how much we pay for things like groceries and rent.",
            "mnemonic": "Investors are like students waiting for grades; they're anxious and cautious."
          },
          {
            "headline": "Sensex and Nifty Performance",
            "eli5": "The Sensex and Nifty are like scoreboards for the Indian stock market. Today, one score went up a little, and the other went down slightly, showing mixed feelings among investors.",
            "whyItMatters": "The performance of these indices reflects the economic health, impacting jobs and investments.",
            "mnemonic": "Stock market scores are like sports scores  -  sometimes one team wins, and sometimes the other!"
          }
        ]
      },
      {
        "name": "💻 What's happening with technology?",
        "color": "#c9b8f5",
        "stories": [
          {
            "headline": "RIL-Meta AI Partnership",
            "eli5": "Imagine two giant tech teams joining forces to build a super robot. Reliance Industries and Meta are teaming up to create advanced AI tools, highlighting India's growing role in tech innovation.",
            "whyItMatters": "This partnership could create jobs and boost the tech industry in India.",
            "mnemonic": "RIL and Meta teaming up is like Batman and Superman joining forces for a tech mission."
          }
        ]
      },
      {
        "name": "🌿 What's happening with our planet?",
        "color": "#f5c6a0",
        "stories": [
          {
            "headline": "Geopolitical Tensions Impact Markets",
            "eli5": "Imagine a storm brewing that makes everyone nervous. The ongoing US-Iran tensions are creating a storm in the markets, leading to lower investor confidence and impacting global economies.",
            "whyItMatters": "When markets are shaky, it can lead to job losses and economic downturns.",
            "mnemonic": "Tensions are like storms  -  they can disrupt everything."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "What caused crude oil prices to rise above $91 per barrel?",
        "options": [
          "Increased production",
          "US-Iran tensions",
          "New energy sources",
          "Lower demand"
        ],
        "answer": 1,
        "funFact": "When tensions rise, oil prices often spike due to fears of supply disruptions."
      },
      {
        "q": "What are the Sensex and Nifty?",
        "options": [
          "Sports teams",
          "Stock market indices",
          "Types of oil",
          "New tech companies"
        ],
        "answer": 1,
        "funFact": "These indices reflect the performance of the top companies in the Indian stock market."
      },
      {
        "q": "Why are investors cautious ahead of US inflation data?",
        "options": [
          "Weather changes",
          "Interest rate decisions",
          "New technology",
          "Sports events"
        ],
        "answer": 1,
        "funFact": "Inflation data can directly influence how much interest rates go up or down."
      }
    ]
  },
  "markets": {
    "globalPulse": {
      "eli5": "On June 10, 2026, the global markets felt like a river getting choppy. Tensions between the US and Iran stirred the waters, causing crude oil prices to surge above $91 per barrel. Investors were wary, waiting for US inflation data, pushing the S&P 500 to hover around 4,300. Overall, the market was like a river with strong currents, making navigation tricky.",
      "keyThings": [
        "S&P 500: 4,300",
        "Brent Crude: $91.50",
        "Gold: $1,800",
        "Nifty: 23,214.95"
      ]
    },
    "indianMarket": {
      "eli5": "The Indian stock market on June 10 felt like a bustling bazaar, with some stalls thriving while others struggled. FMCG stocks were busy and bustling, but sectors like media and energy were quieter due to global concerns. The Nifty closed at 23,214.95, a mixed bag as traders navigated uncertainties.",
      "breakouts": [
        {
          "name": "NSE:HINDUNILVR  -  Hindustan Unilever",
          "whyExciting": "Hindustan Unilever saw a surge as consumers flocked to essential goods amidst market uncertainties. Their strong performance in the FMCG sector kept investors optimistic.",
          "risk": "The risk lies in potential supply chain disruptions due to geopolitical tensions."
        },
        {
          "name": "NSE:RELIANCE  -  Reliance Industries",
          "whyExciting": "Reliance's partnership with Meta for AI infrastructure sparked interest, highlighting India's tech potential. Investors are keen on its future growth.",
          "risk": "The risk stems from volatile market reactions to global events."
        },
        {
          "name": "NSE:TATASTEEL  -  Tata Steel",
          "whyExciting": "Tata Steel faced selling pressure due to rising global crude prices, impacting their production costs. Investors are cautious about the steel sector's profitability.",
          "risk": "Economic slowdown fears could further affect demand."
        }
      ],
      "ipoSpot": {
        "name": "None this week",
        "verdict": "Avoid",
        "eli5": "There are no exciting IPOs currently. It's better to wait for better options."
      },
      "lessonOfDay": {
        "title": "Diversification",
        "story": "Think of investing like planting a garden. If you only plant one type of flower, and it doesn't bloom, your garden looks bare. By planting a variety of flowers, your garden stays vibrant, even if one type struggles. This way, you have a better chance of a beautiful display.",
        "mnemonic": "Don't put all your eggs in one basket."
      }
    },
    "quiz": [
      {
        "q": "What was the closing level of the Nifty on June 10, 2026?",
        "options": [
          "23,214.95",
          "23,983.18",
          "22,500.00",
          "24,000.00"
        ],
        "answer": 0,
        "funFact": "The Nifty index tracks the performance of 50 major companies on the National Stock Exchange of India."
      },
      {
        "q": "Which sector outperformed in the Indian market on this day?",
        "options": [
          "FMCG",
          "IT",
          "Energy",
          "Realty"
        ],
        "answer": 0,
        "funFact": "FMCG stocks are often seen as safe havens during market volatility."
      },
      {
        "q": "What was the price of crude oil on June 10, 2026?",
        "options": [
          "$91.50",
          "$85.00",
          "$80.00",
          "$95.00"
        ],
        "answer": 0,
        "funFact": "Crude oil prices directly impact economies, especially those reliant on energy imports."
      }
    ]
  },
  "psychology": {
    "mindTrick": {
      "name": "Cognitive Dissonance",
      "eli5": "Imagine you love ice cream but you just learned it's not healthy. You feel torn because you want to enjoy it but also want to be healthy. So, you might convince yourself that one scoop isn't bad. That's your brain trying to make peace with conflicting thoughts.",
      "realLife": "Today, people might justify buying expensive coffee even when saving money is important. They might say it's a little treat that makes them happy.",
      "mnemonic": "Ice cream vs. healthy dream."
    },
    "bodyLanguage": {
      "signal": "Crossed arms",
      "eli5": "Picture a cartoon character with their arms crossed, looking like a grumpy bear. This pose screams 'stay away!' like a fence around a garden. It's a big red flag that someone feels defensive or closed off.",
      "howToUse": "If you see someone with crossed arms, try to open up the conversation gently. You might say something warm and inviting to help them relax.",
      "mnemonic": "Arms crossed like a bear in a cave."
    },
    "superpower": {
      "name": "Social Proof",
      "story": "At a concert, everyone starts dancing when a popular song plays. Newcomers join in, thinking, 'If everyone else is having fun, it must be great!' This creates a wave of energy and excitement, drawing more people into the fun.",
      "shield": "To defend against this, trust your own judgment instead of going with the crowd. Ask yourself if you really want to join in or if it's just peer pressure.",
      "mnemonic": "Follow the crowd, but think aloud."
    },
    "quiz": [
      {
        "q": "What is cognitive dissonance?",
        "options": [
          "A feeling of harmony",
          "A conflict between beliefs",
          "A type of learning",
          "A social behavior"
        ],
        "answer": 1,
        "funFact": "Cognitive dissonance can lead to major changes in behavior."
      },
      {
        "q": "What does crossed arms signify?",
        "options": [
          "Confidence",
          "Openness",
          "Defensiveness",
          "Happiness"
        ],
        "answer": 2,
        "funFact": "Crossed arms can happen when someone feels cold, too!"
      },
      {
        "q": "What is an example of social proof?",
        "options": [
          "Buying alone",
          "Dancing with friends",
          "Reading in silence",
          "Eating alone"
        ],
        "answer": 1,
        "funFact": "Social proof is why reviews can change our buying choices!"
      }
    ]
  },
  "leadership": {
    "leaderMove": {
      "name": "Crisis Management",
      "story": "In 1962, President John F. Kennedy faced the Cuban Missile Crisis. He gathered his closest advisors to address the looming threat. They debated ideas and developed a plan without rushing into war. Kennedy's careful consideration avoided disaster and led to a peaceful resolution.",
      "doThis": "Today, set aside time to listen to your team. Create a safe space for open dialogue about ongoing projects.",
      "mnemonic": "CALM - Communicate, Analyze, Listen, Manage"
    },
    "visionarySecret": {
      "concept": "Future-Backward Thinking",
      "eli5": "Imagine looking through binoculars. You see far away places clearly while missing what's right in front of you. Future-backward thinking lets you plan from a vision, then work backward to your current situation. It's like drawing a treasure map that leads you back to the present.",
      "exercise": "Write down your five-year vision. Then, list three steps you can take this month to start moving toward that vision.",
      "mnemonic": "MAP - Mindset, Actions, Progress"
    },
    "eliteHabit": {
      "habit": "Daily Reading",
      "whoAndHow": "Warren Buffett reads 500 pages a day across various topics. He believes this habit helps him gain knowledge and make better decisions.",
      "whyItWorks": "Reading expands your understanding and exposes you to new ideas. This broadens your perspective and enhances problem-solving skills.",
      "mnemonic": "READ - Reflect, Engage, Apply, Develop"
    },
    "sigmaWisdom": {
      "lesson": "Accepting What You Cannot Change",
      "story": "The ancient Stoic philosopher Epictetus taught that we can't control external events, only our reactions. Imagine a ship in a storm; the sailor can't change the weather but can steer the ship. By focusing on what we can control, we find peace amidst chaos.",
      "action": "Identify one situation today that you cannot change, and let go of the worry about it.",
      "mnemonic": "CALM - Control, Accept, Let go, Move on"
    },
    "quiz": [
      {
        "q": "Who was president during the Cuban Missile Crisis?",
        "options": [
          "Richard Nixon",
          "John F. Kennedy",
          "Lyndon B. Johnson",
          "Dwight D. Eisenhower"
        ],
        "answer": 1,
        "funFact": "Kennedy was only 43 years old during this major crisis."
      },
      {
        "q": "What daily reading habit is associated with Warren Buffett?",
        "options": [
          "Fiction novels",
          "Business journals",
          "500 pages",
          "Social media"
        ],
        "answer": 2,
        "funFact": "Buffett spends about 80% of his day reading."
      },
      {
        "q": "What lesson did Epictetus teach?",
        "options": [
          "Control everything",
          "Accept what you cannot change",
          "Avoid all risks",
          "Always respond quickly"
        ],
        "answer": 1,
        "funFact": "Epictetus was a former slave who became a prominent philosopher."
      }
    ]
  },
  "wealth": {
    "wealthSecret": {
      "name": "The Seed of Wealth",
      "story": "Imagine planting a tiny seed. With care, it grows into a strong tree, providing shade and fruit. Just like wealth, it starts small but needs nurturing. Water it with knowledge and effort, and it flourishes into financial freedom.",
      "action": "This week, set aside $50 for investment. Research a local stock or mutual fund to invest in.",
      "mnemonic": "Seed grows into wealth."
    },
    "moneyMachine": {
      "type": "Real Estate Investment Trust (REIT)",
      "eli5": "Think of a magic vending machine that gives you money. You put in some cash once, and it pays you back regularly. Owning a REIT is like having a piece of that vending machine, earning from rents without the hassle.",
      "indiaAngle": "In India, investing in a REIT lets you own a slice of commercial real estate. You can earn dividends while enjoying the benefits of property investment without high costs.",
      "mnemonic": "REIT = Real Estate Income Treat."
    },
    "mindsetFlip": {
      "oldThinking": "Money is hard to get and even harder to keep.",
      "newThinking": "Wealth comes from making money work for you.",
      "why": "When money works for you, it grows like interest compounding. This means your earnings increase over time without extra effort, creating a snowball effect of wealth.",
      "mnemonic": "Make money your employee."
    },
    "magicNumber": {
      "number": "Rule of 72",
      "eli5": "Imagine a magic trick that tells you how fast your money can grow. If you divide 72 by your investment's interest rate, it shows how many years to double your money. For example, at 6% interest, your money doubles in 12 years.",
      "mnemonic": "72 is the magic doubling number."
    },
    "quiz": [
      {
        "q": "What is the Rule of 72 used for?",
        "options": [
          "To calculate interest rates",
          "To estimate money doubling time",
          "To find tax rates",
          "To figure out savings goals"
        ],
        "answer": 1,
        "funFact": "The Rule of 72 is a quick way to estimate how long it takes for an investment to double based on its annual return."
      },
      {
        "q": "What is a REIT?",
        "options": [
          "A type of stock",
          "A real estate investment trust",
          "A bank account",
          "A savings plan"
        ],
        "answer": 1,
        "funFact": "REITs allow everyday investors to earn a share of the income produced through commercial real estate."
      },
      {
        "q": "What does passive income mean?",
        "options": [
          "Money earned from a job",
          "Money that comes without active effort",
          "Money saved in a bank",
          "Money borrowed from a friend"
        ],
        "answer": 1,
        "funFact": "Passive income can come from investments, rental properties, or royalties, allowing you to earn while you sleep."
      }
    ]
  },
  "communication": {
    "speakingSkill": {
      "name": "Storytelling",
      "story": "Steve Jobs was a master at storytelling. During his 2005 Stanford commencement speech, he wove personal tales that captivated the audience. He made complex ideas simple and relatable, turning tech jargon into life lessons. People left feeling inspired, not just informed.",
      "drill": "Pick a personal story that resonates with you. Practice telling it in three minutes, focusing on emotion and clarity.",
      "mnemonic": "STORY: Simplify, Touch, Organize, Relate, Yield"
    },
    "negotiationMove": {
      "tactic": "The Anchoring Technique",
      "eli5": "Imagine you want pizza for lunch. You offer your friend a slice of cake first, making them think the cake is the best deal. Now when you ask for pizza, it seems reasonable compared to the cake.",
      "script": "Let's start with this offer on the table. How about I suggest a price of $100 to kick things off?",
      "mnemonic": "ANCHOR: Ask, Negotiate, Compare, Highlight, Offer, Review"
    },
    "officeWin": {
      "rule": "Active Listening",
      "story": "Person A interrupts during meetings and often misses key points. Person B listens carefully and asks questions, making contributions that are valued. As a result, Person B earns respect and trust, while Person A struggles to connect.",
      "mistake": "The most common mistake is thinking you have to respond immediately.",
      "mnemonic": "LISTEN: Look, Inquire, Silence, Think, Engage, Note"
    },
    "confidenceHack": {
      "technique": "Power Posing",
      "science": "Research shows that standing tall can increase testosterone and lower cortisol. This change in body language boosts confidence and reduces stress.",
      "doItNow": "Before your meeting, find a private space. Stand with your hands on your hips for two minutes.",
      "mnemonic": "POSE: Power, Open, Stand, Energize"
    },
    "quiz": [
      {
        "q": "Which famous speaker is known for storytelling?",
        "options": [
          "Barack Obama",
          "Steve Jobs",
          "Oprah Winfrey",
          "Tony Robbins"
        ],
        "answer": 1,
        "funFact": "Steve Jobs' Stanford speech is one of the most viewed on YouTube."
      },
      {
        "q": "What does the Anchoring Technique involve?",
        "options": [
          "Offering a low price",
          "Making a first offer",
          "Agreeing quickly",
          "Listening carefully"
        ],
        "answer": 1,
        "funFact": "Anchoring can significantly influence negotiation outcomes, even in unrelated contexts."
      },
      {
        "q": "What is a key principle of active listening?",
        "options": [
          "Interrupting",
          "Multitasking",
          "Asking questions",
          "Talking over others"
        ],
        "answer": 2,
        "funFact": "Active listening can improve relationships and enhance teamwork."
      }
    ]
  },
  "mind": {
    "brainHack": {
      "name": "Focus Funnel",
      "eli5": "Imagine your mind is a wild horse. It gallops everywhere, scattering thoughts like leaves in the wind. But with the Focus Funnel, you can guide that horse to a serene field where it can graze peacefully.",
      "protocol": "Set a timer for 10 minutes. During this time, focus solely on one task, ignoring all distractions.",
      "mnemonic": "Funnel down your focus."
    },
    "disciplineCode": {
      "principle": "Consistency is Key",
      "story": "Think of Michael Phelps, the Olympic swimmer. He practiced every single day, rain or shine, for hours. His discipline transformed him into the fastest man in water.",
      "todayAction": "Commit to 10 minutes of practice today. No excuses, just show up and do it.",
      "mnemonic": "Show up, swim fast."
    },
    "impulseKiller": {
      "urge": "procrastination",
      "eli5": "Imagine a monster in your head, whispering, 'Do it later!' It grows bigger the longer you wait.",
      "interrupt": "When you feel the urge to procrastinate, stand up and take a 60-second walk. Focus on your breathing and clear your mind.",
      "mnemonic": "Walk it off, monster!"
    },
    "bodyUpgrade": {
      "practice": "Bodyweight Squats",
      "eli5": "Think of squats as building a sturdy house. Strong legs create a solid foundation for everything you do.",
      "minimumDose": "Do 10 squats every day to see results.",
      "mnemonic": "Squat to build strength."
    },
    "quiz": [
      {
        "q": "What is the main goal of the Focus Funnel?",
        "options": [
          "To distract",
          "To concentrate",
          "To relax",
          "To multitask"
        ],
        "answer": 1,
        "funFact": "Focusing can increase productivity by 25%!"
      },
      {
        "q": "Who is an example of consistency in practice?",
        "options": [
          "Usain Bolt",
          "Michael Phelps",
          "Serena Williams",
          "Tom Brady"
        ],
        "answer": 1,
        "funFact": "Michael Phelps won 23 gold medals in his career!"
      },
      {
        "q": "What should you do when feeling procrastination?",
        "options": [
          "Ignore it",
          "Take a 60-second walk",
          "Call a friend",
          "Watch TV"
        ],
        "answer": 1,
        "funFact": "Walking can boost creativity by 60%!"
      }
    ]
  },
  "knowledge": {
    "mathMagic": {
      "concept": "Bayes' Theorem",
      "eli5": "Imagine you're searching for your lost cat, Whiskers. You see a cat that looks just like him but it's not him! With Bayes' Theorem, you can update your guess based on new clues, like whether the cat is wearing a collar. It's like being a detective solving a mystery with every new piece of evidence.",
      "realWorldUse": "In finance, Bayes' Theorem helps investors update their beliefs about market trends. In sports, coaches use it to make decisions based on player performance data.",
      "mnemonic": "Prior plus evidence equals revised belief."
    },
    "scienceWow": {
      "field": "Astronomy",
      "concept": "Dark Matter",
      "eli5": "Imagine the universe is a giant cake with frosting. We can see the frosting (stars and galaxies) but the cake (dark matter) is hidden. This cake is way bigger than the frosting and holds everything together. Without it, galaxies would fly apart like balloons losing air!",
      "mindBlow": "Dark matter makes up about 27% of the universe, but we can't see or touch it! It's like an invisible glue holding everything in place.",
      "mnemonic": "Dark Matter = Cake Holding the Frosting."
    },
    "historyStory": {
      "event": "The Moon Landing",
      "story": "On July 20, 1969, Neil Armstrong took a giant leap for mankind. He stepped onto the Moon, leaving footprints in the lunar dust. Buzz Aldrin joined him, while Michael Collins orbited above in the command module. This mission, Apollo 11, was a breathtaking show of human ingenuity and courage.",
      "lesson": "The Moon landing teaches us the power of teamwork and dreaming big. When we unite for a common goal, we can achieve the impossible.",
      "mnemonic": "One small step, one giant leap."
    },
    "earthSecret": {
      "place": "Greenland",
      "secret": "Greenland is actually mostly covered in ice, not green! It has the world's second-largest ice sheet, which holds about 10% of the planet's fresh water. Surprisingly, the ice is melting faster than predicted due to climate change, raising sea levels worldwide.",
      "edge": "Knowing about Greenland's ice sheet can spark fascinating conversations about climate change. It also highlights the urgency for sustainable practices in business.",
      "mnemonic": "Greenland = Ice, not Green."
    },
    "quiz": [
      {
        "q": "What percentage of the universe is made up of dark matter?",
        "options": [
          "5%",
          "27%",
          "50%",
          "70%"
        ],
        "answer": 1,
        "funFact": "Most of the universe is invisible and made up of dark matter!"
      },
      {
        "q": "Who was the first person to walk on the Moon?",
        "options": [
          "Buzz Aldrin",
          "Neil Armstrong",
          "Yuri Gagarin",
          "Michael Collins"
        ],
        "answer": 1,
        "funFact": "Neil Armstrong's famous words were, 'That's one small step for man, one giant leap for mankind.'"
      },
      {
        "q": "What is the main component of Greenland's landscape?",
        "options": [
          "Deserts",
          "Forest",
          "Ice",
          "Mountains"
        ],
        "answer": 2,
        "funFact": "Greenland's ice sheet is so massive that it influences global sea levels!"
      }
    ]
  },
  "ai": {
    "toolSpotlight": {
      "name": "WriteWise",
      "category": "writing",
      "eli5": "Imagine a super-smart writing buddy that helps you draft emails, essays, or reports in seconds. It suggests better words and fixes grammar mistakes, making your writing shine. You type, and it polishes your thoughts into clear sentences, like a friend who always catches your typos.",
      "secretMove": "It can analyze your writing style and suggest changes that match your tone, making your work feel more authentic without sacrificing quality.",
      "mnemonic": "W for Write, W for Wise."
    },
    "workflowWin": {
      "title": "Content Creation Streamline",
      "problem": "Creating content can be slow and tedious, especially when researching facts and structuring ideas. This tool speeds up the process, saving you from writer's block and endless revisions.",
      "steps": [
        "Open WriteWise and choose the type of content you need.",
        "Input your main idea or topic.",
        "Let WriteWise generate an outline with key points.",
        "Review and edit the suggested content to fit your voice."
      ],
      "timeSaved": "You can save up to 3 hours on each article or blog post.",
      "mnemonic": "C for Create, S for Speed."
    },
    "promptOfDay": {
      "purpose": "To generate a compelling blog post on a trending topic.",
      "prompt": "Write a blog post about [TOPIC] focusing on [SPECIFIC ASPECT] and including [EXAMPLES].",
      "where": "ChatGPT",
      "mnemonic": "B for Blog, T for Topic."
    },
    "futureWatch": {
      "trend": "AI in Conflict Resolution",
      "eli5": "Before, negotiations between countries took months of back-and-forth. Now, AI systems analyze data and suggest compromises in minutes, like having a wise mediator at the table. This speeds up peace talks, making it easier to resolve issues before they escalate.",
      "yourMove": "Stay informed on AI developments in diplomacy and consider how these tools could improve local negotiations or community issues.",
      "mnemonic": "C for Conflict, R for Resolution."
    },
    "quiz": [
      {
        "q": "What is the main benefit of WriteWise?",
        "options": [
          "It generates images",
          "It helps improve writing",
          "It organizes schedules",
          "It plays music"
        ],
        "answer": 1,
        "funFact": "Good writing can increase your chances of success in job applications by up to 70%."
      },
      {
        "q": "How much time can you save with the Content Creation Streamline workflow?",
        "options": [
          "1 hour",
          "2 hours",
          "3 hours",
          "4 hours"
        ],
        "answer": 2,
        "funFact": "The average person spends 4-5 hours writing a blog post!"
      },
      {
        "q": "What does AI do in conflict resolution?",
        "options": [
          "Plays games",
          "Analyzes data for compromises",
          "Writes poems",
          "Creates music"
        ],
        "answer": 1,
        "funFact": "AI can process thousands of data points in seconds, faster than any human negotiator."
      }
    ]
  },
  "travel": {
    "destination": {
      "country": "Japan",
      "region": "Kyoto",
      "eli5": "Imagine walking through streets lined with cherry blossoms. The air smells of sweet mochi and fresh green tea. You can hear the soft rustle of silk kimonos as locals pass by. It's a magical blend of ancient temples and modern cafes, all wrapped in tranquility.",
      "bestTime": "The best time to visit is during cherry blossom season, from late March to early April. The pink blooms create a stunning backdrop for your adventures.",
      "hiddenGem": "Visit the Nanzen-ji Temple early in the morning for serene gardens without crowds. Few tourists know about the hidden paths that lead to secret waterfalls nearby.",
      "mnemonic": "Kite Cherry Blossoms, Tranquil Temples."
    },
    "visaTip": {
      "focus": "Japan visa process for Indian passport holders",
      "eli5": "Apply for a tourist visa online through the Japanese embassy's website. Gather documents like your passport, photos, and travel itinerary. Submit your application at the nearest embassy or consulate.",
      "goldenTip": "Book your visa appointment early, as slots fill up quickly. Double-check your documents to avoid delays during the application process.",
      "mnemonic": "VISA  -  Verify Information, Submit Application."
    },
    "culturalCode": {
      "culture": "Japanese culture",
      "doThis": "When you bow to greet someone, it shows respect and appreciation. Locals love it when visitors try to speak a few Japanese phrases, even just 'arigato' for thank you.",
      "neverDoThis": "Never tip in restaurants; it's considered rude and unnecessary. Avoid pointing at people or things, as it can be seen as disrespectful.",
      "mnemonic": "Bows for Respect, No Tips."
    },
    "quiz": [
      {
        "q": "What is the famous cherry blossom festival called in Japan?",
        "options": [
          "Hanami",
          "Matsuri",
          "Sakura",
          "Tanabata"
        ],
        "answer": 0,
        "funFact": "Hanami means 'flower viewing' in Japanese, celebrated with picnics under blooming trees."
      },
      {
        "q": "Which famous temple is located in Kyoto?",
        "options": [
          "Kinkaku-ji",
          "Himeji Castle",
          "Todai-ji",
          "Senso-ji"
        ],
        "answer": 0,
        "funFact": "Kinkaku-ji, also known as the Golden Pavilion, is covered in gold leaf and surrounded by beautiful gardens."
      },
      {
        "q": "What is a popular Japanese dish made of rice and fish?",
        "options": [
          "Ramen",
          "Sushi",
          "Tempura",
          "Okonomiyaki"
        ],
        "answer": 1,
        "funFact": "Sushi has become a global favorite, with varieties like nigiri and maki enjoyed worldwide."
      }
    ]
  }
}

const d260611 = {
  "news": {
    "segments": [
      {
        "name": "🌐 What's happening with countries?",
        "color": "#a0d4f5",
        "stories": [
          {
            "headline": "World Bank Lowers Global Growth Forecast Amid Middle East Conflict",
            "eli5": "Imagine a big party where everyone's supposed to bring food. But one group gets into a fight and can't bring their dishes. Now, the party has less food. The World Bank is saying the world economy will grow slower because of troubles in the Middle East, like a party without enough food.",
            "whyItMatters": "Slower growth means fewer jobs and less money for people everywhere.",
            "mnemonic": "Think of a party that turns into a potluck disaster!"
          },
          {
            "headline": "Global Inflation Concerns Amid Energy Crisis",
            "eli5": "It's like when your favorite snack suddenly costs more because the store ran out. The Iran war is making oil prices soar, so everything else is getting pricier too. The world's average inflation might reach 4.5%, which is a big deal.",
            "whyItMatters": "When prices go up, people struggle to afford everyday things.",
            "mnemonic": "Imagine your snack becoming a luxury treat!"
          },
          {
            "headline": "Sensex and Nifty 50 Decline Amid Middle East Tensions",
            "eli5": "Picture a see-saw. When one side gets heavy, the other goes down. The Indian stock market is like that, dropping because of worries about the Middle East. The Sensex dropped by 150 points, just like a see-saw tipping.",
            "whyItMatters": "This affects investment and savings for regular people.",
            "mnemonic": "Think of a see-saw that can't find balance!"
          }
        ]
      },
      {
        "name": "💸 What's happening with money?",
        "color": "#a8edcb",
        "stories": [
          {
            "headline": "AI Investment Boosts U.S. Economy Amid Cooling Job Market",
            "eli5": "Imagine a superhero coming in to save the day. AI investments are like that superhero for the U.S. economy, helping it grow by 2.1% even though jobs are hard to find. It's keeping the economy strong like a sturdy bridge.",
            "whyItMatters": "This helps people keep jobs and businesses running.",
            "mnemonic": "Think of AI as the superhero of the economy!"
          },
          {
            "headline": "Sensex Rebounds to Close Higher Amid Mixed Sectoral Trends",
            "eli5": "It's like a basketball team that bounces back after trailing in a game. The Sensex rose by 272 points, showing that even when things look bad, strong companies can help boost the market.",
            "whyItMatters": "A strong market can mean better investments for the future.",
            "mnemonic": "Imagine a team making a comeback in the last quarter!"
          }
        ]
      },
      {
        "name": "💻 What's happening with technology?",
        "color": "#c9b8f5",
        "stories": [
          {
            "headline": "AI Investment Boosts U.S. Economy Amid Cooling Job Market",
            "eli5": "Think of AI like a smart assistant that helps businesses work faster and smarter. Companies are pouring money into AI, which is helping the U.S. economy stay strong even when job openings are fewer.",
            "whyItMatters": "This can lead to new jobs and innovations for everyone.",
            "mnemonic": "Picture AI as the ultimate smart assistant!"
          }
        ]
      },
      {
        "name": "🌿 What's happening with our planet?",
        "color": "#f5c6a0",
        "stories": [
          {
            "headline": "Global Energy Crisis Impacts Industrial Output",
            "eli5": "Imagine trying to run a factory but the power goes out. Europe is facing this problem because of high energy costs, causing factories in Germany and the U.K. to slow down. It's like trying to bake cookies without an oven.",
            "whyItMatters": "Less production means fewer products and more job losses.",
            "mnemonic": "Think of a cookie factory without an oven!"
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "What did the World Bank lower its global growth forecast to?",
        "options": [
          "2.5%",
          "3.0%",
          "1.8%",
          "4.0%"
        ],
        "answer": 0,
        "funFact": "The last forecast was much higher, showing how serious the situation is."
      },
      {
        "q": "What is the expected global inflation rate due to the energy crisis?",
        "options": [
          "2.0%",
          "3.5%",
          "4.5%",
          "5.0%"
        ],
        "answer": 2,
        "funFact": "This would be one of the highest inflation rates in recent years!"
      },
      {
        "q": "How much did the Sensex fall amidst Middle East tensions?",
        "options": [
          "150 points",
          "200 points",
          "100 points",
          "50 points"
        ],
        "answer": 0,
        "funFact": "This marked a significant moment in the Indian stock market's performance."
      }
    ]
  },
  "markets": {
    "globalPulse": {
      "eli5": "The global markets were like a river facing turbulent rapids. The Middle East conflict caused energy prices to spike, leading to a drop in growth forecasts. Investors were cautious, causing the S&P 500 to wobble at around 4,200 points. Brent Crude surged to $90 a barrel, while gold hovered at $1,950, as safety became paramount.",
      "keyThings": [
        "S&P 500: 4,200",
        "Brent Crude: $90",
        "Gold: $1,950",
        "Nifty: 74,309.83"
      ]
    },
    "indianMarket": {
      "eli5": "The Indian stock market resembled a bustling bazaar, with traders navigating through a mix of excitement and caution. Large-cap stocks led the way, helping the Sensex bounce back to 74,309.83, despite the IT sector dragging down overall sentiment.",
      "breakouts": [
        {
          "name": "NSE:TCS  -  Tata Consultancy Services",
          "whyExciting": "TCS saw a surge in demand for its digital services, riding the AI wave. Investors were keen on its robust earnings potential.",
          "risk": "A slowdown in global tech spending could impact its growth."
        },
        {
          "name": "NSE:RELIANCE  -  Reliance Industries",
          "whyExciting": "Reliance's new energy projects attracted significant attention, promising future growth. Its diverse portfolio helped it stay resilient.",
          "risk": "Regulatory changes in the energy sector could pose challenges."
        },
        {
          "name": "NSE:INFY  -  Infosys",
          "whyExciting": "Infosys announced a major contract win that boosted investor confidence. The focus on automation and AI positioned it well.",
          "risk": "Increased competition in the IT space could pressure margins."
        }
      ],
      "ipoSpot": {
        "name": "None this week",
        "verdict": "Avoid",
        "eli5": "No new IPOs were making waves this week. It's best to keep an eye out for future opportunities."
      },
      "lessonOfDay": {
        "title": "The Importance of Diversification",
        "story": "Think of your investments like a fruit basket. If you only have apples and they go bad, you lose everything. But if you mix in oranges, bananas, and grapes, the basket stays fresh and tasty. Spreading out your investments helps cushion against losses.",
        "mnemonic": "Don't put all your apples in one basket."
      }
    },
    "quiz": [
      {
        "q": "What was the closing level of the Sensex today?",
        "options": [
          "72,000",
          "73,601.57",
          "74,309.83",
          "75,000"
        ],
        "answer": 2,
        "funFact": "The Sensex is a barometer of the Indian stock market's health!"
      },
      {
        "q": "Which sector led the decline in the Indian market?",
        "options": [
          "Pharma",
          "IT",
          "Energy",
          "Finance"
        ],
        "answer": 1,
        "funFact": "The IT sector is often seen as a bellwether for the market's performance."
      },
      {
        "q": "What is the current price of Brent Crude?",
        "options": [
          "$80",
          "$85",
          "$90",
          "$95"
        ],
        "answer": 2,
        "funFact": "Brent Crude is a major indicator of global oil prices and economic health."
      }
    ]
  },
  "psychology": {
    "mindTrick": {
      "name": "Cognitive Dissonance",
      "eli5": "Imagine you love pizza but you see a documentary about how it's made, and it's not pretty. You feel torn inside because you want to enjoy your pizza but now you know the truth. To fix this, you might tell yourself that not all pizza is bad or decide to eat less of it. It's like wanting to keep your favorite toy even when you find out it's broken.",
      "realLife": "Today, people might feel this when reading about the World Bank's report on global growth. They may love their comfortable lifestyles but feel guilty about their role in economic issues.",
      "mnemonic": "Cognitive dissonance is like a tug-of-war inside your head!"
    },
    "bodyLanguage": {
      "signal": "Crossed Arms",
      "eli5": "Imagine a cartoon character looking super grumpy with arms crossed tightly, like a closed door. It shows they might be defensive or not open to ideas. Think of it as a shield that says 'stay away!'",
      "howToUse": "Use this signal to spot when someone is not interested in your idea. You can change your approach to make them feel more comfortable.",
      "mnemonic": "Crossed arms are like a locked treasure chest!"
    },
    "superpower": {
      "name": "Reciprocity",
      "story": "In a small town, Tom baked cookies for his neighbors. They felt happy and wanted to return the favor. Soon, everyone was sharing baked goods, creating a warm community spirit. Tom didn't just fill bellies; he sparked friendships.",
      "shield": "To defend against it, be aware of your own feelings to give back. Reflect if you truly want to reciprocate or feel pressured.",
      "mnemonic": "Reciprocity is like a boomerang; what you throw out comes back!"
    },
    "quiz": [
      {
        "q": "What is cognitive dissonance?",
        "options": [
          "A feeling of internal conflict",
          "A type of pizza",
          "A type of dance",
          "A weather phenomenon"
        ],
        "answer": 0,
        "funFact": "Cognitive dissonance was first described by Leon Festinger in 1957."
      },
      {
        "q": "What does crossing arms usually indicate?",
        "options": [
          "Openness",
          "Happiness",
          "Defensiveness",
          "Excitement"
        ],
        "answer": 2,
        "funFact": "Crossed arms can actually increase feelings of defensiveness and anxiety."
      },
      {
        "q": "What principle encourages people to return favors?",
        "options": [
          "Reciprocity",
          "Isolation",
          "Indifference",
          "Ambivalence"
        ],
        "answer": 0,
        "funFact": "Reciprocity is one of the oldest social norms, seen in cultures worldwide."
      }
    ]
  },
  "leadership": {
    "leaderMove": {
      "name": "Resilience in Leadership",
      "story": "During World War II, Winston Churchill inspired Britain through its darkest hours. He rallied the nation with his speeches, reminding them to never give up. His famous words, 'We shall fight on the beaches,' gave hope. Churchill taught that strong leaders must stand firm and uplift others in crises.",
      "doThis": "Today, deliver an inspiring message to your team. Remind them that challenges can lead to growth and success.",
      "mnemonic": "Rally the troops."
    },
    "visionarySecret": {
      "concept": "Long-term thinking",
      "eli5": "Imagine using a telescope to see far away. This helps you spot opportunities before they arrive. Just like a ship captain needs to navigate ahead, leaders should plan for the future. It's about being proactive, not reactive.",
      "exercise": "Take 10 minutes to write down your goals for the next five years. Think about the steps you need to take today to reach them.",
      "mnemonic": "Vision through vision."
    },
    "eliteHabit": {
      "habit": "Reading voraciously",
      "whoAndHow": "Warren Buffett reads 500 pages a day. He believes that knowledge compounds like interest, making him smarter over time.",
      "whyItWorks": "Reading expands your perspective and knowledge base. It's like adding more tools to your toolbox, ready for any challenge.",
      "mnemonic": "Read to lead."
    },
    "sigmaWisdom": {
      "lesson": "The power of solitude",
      "story": "In ancient Greece, Socrates often retreated to quiet places to think. This solitude allowed him to reflect and discover deep truths. Like a pearl forming in an oyster, great ideas often come from stillness and introspection.",
      "action": "Spend 15 minutes in silence today to reflect on your thoughts and goals.",
      "mnemonic": "Silence breeds clarity."
    },
    "quiz": [
      {
        "q": "What is the World Bank's new growth forecast for 2026?",
        "options": [
          "1.3%",
          "2.5%",
          "3.0%",
          "4.0%"
        ],
        "answer": 1,
        "funFact": "The World Bank plays a key role in global economic stability."
      },
      {
        "q": "What major global factor is affecting the growth forecast?",
        "options": [
          "Climate Change",
          "Middle East Conflict",
          "Trade Wars",
          "Pandemic Recovery"
        ],
        "answer": 1,
        "funFact": "Conflict in the Middle East can have ripple effects on global economies."
      },
      {
        "q": "What could happen to growth if energy disruptions worsen?",
        "options": [
          "It could rise",
          "It could stay the same",
          "It could decline to 1.3%",
          "It could double"
        ],
        "answer": 2,
        "funFact": "Energy supply is crucial for global economic health."
      }
    ]
  },
  "wealth": {
    "wealthSecret": {
      "name": "The Seed of Wealth",
      "story": "Imagine planting a seed in fertile soil. With time, water, and care, it grows into a mighty tree. Each branch represents a new opportunity, and every leaf is a source of income. Just like a river flows, wealth can continuously nourish your life if tended with intention.",
      "action": "This week, set aside a small amount for investment. Research a local startup or a mutual fund to plant your wealth seed.",
      "mnemonic": "Seed to tree, wealth flows."
    },
    "moneyMachine": {
      "type": "Real Estate Investment Trust (REIT)",
      "eli5": "Think of a REIT as a magic vending machine for money. You put in your cash, and it buys properties, like hotels and apartments. Every month, it gives you a share of the rent as your payout, just like getting snacks from a vending machine.",
      "indiaAngle": "In India, investing in a REIT lets you own a piece of high-value properties without needing a huge amount of money. It's a great way to earn passive income as the real estate market grows.",
      "mnemonic": "Vending machine for real estate cash."
    },
    "mindsetFlip": {
      "oldThinking": "Money is scarce and hard to come by.",
      "newThinking": "Money is abundant and can flow to me easily.",
      "why": "When you believe in abundance, you open up to new opportunities. Mathematically, a positive mindset attracts positive outcomes, leading to better financial decisions and investments.",
      "mnemonic": "From scarcity to abundance."
    },
    "magicNumber": {
      "number": "Rule of 72",
      "eli5": "Imagine you have a magic book that tells you how fast money can grow. If you divide 72 by your investment's interest rate, it shows how many years it takes for your money to double. It's like watching a plant grow; with the right care, it flourishes faster than you think.",
      "mnemonic": "72 divides to double."
    },
    "quiz": [
      {
        "q": "What is a REIT?",
        "options": [
          "A stock market index",
          "A type of real estate investment",
          "A government bond",
          "A savings account"
        ],
        "answer": 1,
        "funFact": "REITs can yield dividends as high as 10% annually."
      },
      {
        "q": "What does the Rule of 72 help you calculate?",
        "options": [
          "Your age",
          "How many years it takes money to double",
          "Your monthly expenses",
          "Your net worth"
        ],
        "answer": 1,
        "funFact": "Using the Rule of 72 can boost your investment strategy."
      },
      {
        "q": "What is a common misconception about wealth?",
        "options": [
          "It requires hard work only",
          "It is only for the rich",
          "It can grow with smart investments",
          "It is bad for society"
        ],
        "answer": 2,
        "funFact": "Many wealthy people emphasize smart investments over just hard work."
      }
    ]
  },
  "communication": {
    "speakingSkill": {
      "name": "Storytelling",
      "story": "Steve Jobs used storytelling to captivate audiences. He shared personal tales about his life and Apple's journey. This made his presentations memorable and relatable.",
      "drill": "Choose a personal story related to your topic. Practice telling it in under three minutes.",
      "mnemonic": "S.O.A.R. - Situation, Outcome, Action, Result"
    },
    "negotiationMove": {
      "tactic": "Anchoring",
      "eli5": "Imagine you want a cookie at lunch. If you say, 'I'll trade my apple for two cookies,' you set a high starting point. The other kid might offer you one cookie, which is still better than just the apple.",
      "script": "Let's start with my offer of $500 for this project. I believe that's a fair starting point to discuss.",
      "mnemonic": "A.C.E. - Ask, Compare, Evaluate"
    },
    "officeWin": {
      "rule": "Active Listening",
      "story": "Person A interrupts and speaks over others in meetings. Person B listens and asks questions. This builds trust and respect in the workplace.",
      "mistake": "The most common mistake is thinking you know what others will say.",
      "mnemonic": "L.E.A.R.N. - Listen, Engage, Acknowledge, Respond, Note"
    },
    "confidenceHack": {
      "technique": "Power Posing",
      "science": "Research shows that body language affects how we feel. Standing tall can boost testosterone and lower cortisol, making you feel more confident.",
      "doItNow": "Before your meeting, stand in a powerful pose for two minutes. This will help you feel strong and ready.",
      "mnemonic": "P.O.W.E.R. - Posture, Open, Willful, Empowered, Ready"
    },
    "quiz": [
      {
        "q": "Who is known for effective storytelling in presentations?",
        "options": [
          "Elon Musk",
          "Steve Jobs",
          "Bill Gates",
          "Mark Zuckerberg"
        ],
        "answer": 1,
        "funFact": "Steve Jobs' Stanford commencement speech is famous for its storytelling."
      },
      {
        "q": "What does anchoring help you do in negotiations?",
        "options": [
          "Listen better",
          "Set a starting point",
          "Calculate risks",
          "Make friends"
        ],
        "answer": 1,
        "funFact": "Anchoring can influence the entire negotiation outcome."
      },
      {
        "q": "What should you do to practice active listening?",
        "options": [
          "Interrupt often",
          "Take notes",
          "Plan your response",
          "Look at your phone"
        ],
        "answer": 1,
        "funFact": "Taking notes can help you remember what others say and show you are engaged."
      }
    ]
  },
  "mind": {
    "brainHack": {
      "name": "Focus Taming",
      "eli5": "Imagine a wild horse running in circles. You need to gently guide it to a calm spot. With practice, it learns to follow your lead instead of running wild.",
      "protocol": "Set a timer for 25 minutes. Focus solely on one task, then take a 5-minute break to recharge.",
      "mnemonic": "25-5 Focus Cycle"
    },
    "disciplineCode": {
      "principle": "Commitment to Goals",
      "story": "Think of Michael Phelps, who trained every day to be the best swimmer. He woke up at 5 AM, even when it was cold and dark outside. His dedication turned him into a champion with 23 Olympic gold medals.",
      "todayAction": "Write down one goal you want to achieve. Then, spend 10 minutes taking a step toward that goal today.",
      "mnemonic": "Goal Steps"
    },
    "impulseKiller": {
      "urge": "Procrastination",
      "eli5": "Imagine a big, scary monster sitting on your project. It roars louder the longer you wait, making it seem impossible to start.",
      "interrupt": "Take 60 seconds to breathe deeply and visualize yourself starting the task. Picture the monster shrinking away as you take action.",
      "mnemonic": "Monster Buster"
    },
    "bodyUpgrade": {
      "practice": "Jumping Jacks",
      "eli5": "Jumping jacks are like revving your engine before a race. They get your blood pumping and prepare your body for action.",
      "minimumDose": "Do 30 jumping jacks to feel energized.",
      "mnemonic": "Jack Up Energy"
    },
    "quiz": [
      {
        "q": "What is the focus cycle time?",
        "options": [
          "20 minutes",
          "25 minutes",
          "30 minutes",
          "15 minutes"
        ],
        "answer": 1,
        "funFact": "The Pomodoro Technique uses this time format for maximum productivity."
      },
      {
        "q": "How many Olympic gold medals did Michael Phelps win?",
        "options": [
          "15",
          "20",
          "23",
          "25"
        ],
        "answer": 2,
        "funFact": "Phelps is the most decorated Olympian of all time."
      },
      {
        "q": "What exercise revs up your energy?",
        "options": [
          "Push-ups",
          "Sit-ups",
          "Jumping Jacks",
          "Burpees"
        ],
        "answer": 2,
        "funFact": "Jumping jacks are great for a quick energy boost!"
      }
    ]
  },
  "knowledge": {
    "mathMagic": {
      "concept": "Bayes' Theorem",
      "eli5": "Imagine you have a magic bag of candies. Some are red and some are blue. If you pull out a red candy, you might think the bag has more red candies. But if you know a secret about the bag, like it has a lot of blue candies, you can change your guess!",
      "realWorldUse": "Bayes' Theorem helps doctors update the chances of a disease after test results. It's also used in spam filters to determine if an email is junk.",
      "mnemonic": "B for Bag, E for Evidence, A for Adjustment, S for Something new!"
    },
    "scienceWow": {
      "field": "Astronomy",
      "concept": "Dark Matter",
      "eli5": "Picture a giant cosmic dance floor. Stars and galaxies twirl around, but there's something invisible pulling them. This unseen force is dark matter! It makes up about 27% of the universe, like a ghostly partner that you can't see but can feel.",
      "mindBlow": "Dark matter doesn't emit light or energy, so it's completely invisible. Scientists know it exists because of its gravitational effects on visible matter!",
      "mnemonic": "D for Dark, M for Mystery, A for Attraction!"
    },
    "historyStory": {
      "event": "The Fall of Constantinople",
      "story": "On May 29, 1453, the city of Constantinople was under siege. Sultan Mehmed II led his Ottoman forces, using massive cannons to break through the ancient walls. The city, once a beacon of Christianity, fell and became Istanbul. This marked the end of the Byzantine Empire and a shift in power toward the Ottomans.",
      "lesson": "Change can be sudden and sweeping, altering the course of history. We must adapt quickly and recognize the signs around us.",
      "mnemonic": "C for Change, C for Constantinople!"
    },
    "earthSecret": {
      "place": "Iceland",
      "secret": "Iceland is home to nearly 130 volcanoes, with eruptions happening every 4-5 years on average. It has a unique landscape where you can see glaciers and geysers side by side. The country is also one of the most eco-friendly places, running almost entirely on renewable energy.",
      "edge": "Knowing about Iceland's geothermal energy can inspire sustainable practices in business. It showcases how a small nation can lead in environmental innovation.",
      "mnemonic": "V for Volcanoes, E for Eco-friendly!"
    },
    "quiz": [
      {
        "q": "What percentage of the universe is dark matter?",
        "options": [
          "10%",
          "27%",
          "50%",
          "75%"
        ],
        "answer": 1,
        "funFact": "Dark matter is so mysterious that scientists still don't know what it's made of!"
      },
      {
        "q": "Who conquered Constantinople?",
        "options": [
          "Alexander the Great",
          "Sultan Mehmed II",
          "Julius Caesar",
          "Charlemagne"
        ],
        "answer": 1,
        "funFact": "Sultan Mehmed II was just 21 years old when he conquered the city!"
      },
      {
        "q": "How much of Iceland's energy comes from renewable sources?",
        "options": [
          "30%",
          "50%",
          "90%",
          "100%"
        ],
        "answer": 3,
        "funFact": "Iceland uses geothermal energy for heating homes and even swimming pools!"
      }
    ]
  },
  "ai": {
    "toolSpotlight": {
      "name": "AutoWrite Pro",
      "category": "writing",
      "eli5": "Imagine having a magical robot that helps you write everything from emails to essays. It understands your style and can suggest sentences that fit perfectly. It's like having a co-author who never runs out of ideas!",
      "secretMove": "It can analyze your previous writings to mimic your unique voice, making it feel like you wrote it yourself. Most people just use it for drafts, but it can also polish your final pieces.",
      "mnemonic": "AWP - Always Write Perfectly."
    },
    "workflowWin": {
      "title": "Email Response Automation",
      "problem": "Crafting responses to common inquiries takes time. This tool helps you reply quickly and efficiently, so you don't get bogged down.",
      "steps": [
        "Identify common email queries in your inbox.",
        "Set up AutoWrite Pro to generate responses based on templates.",
        "Customize suggestions to fit your tone.",
        "Send the responses with just a click."
      ],
      "timeSaved": "You can cut email response time by up to 50%.",
      "mnemonic": "ERA - Email Response Ace."
    },
    "promptOfDay": {
      "purpose": "Quickly generate a report for a team meeting.",
      "prompt": "Write a summary report for [TOPIC] covering key points, challenges, and potential solutions. Include data from [SOURCE] and keep it under 300 words.",
      "where": "ChatGPT",
      "mnemonic": "QRR - Quick Report Ready."
    },
    "futureWatch": {
      "trend": "AI in Real-Time Financial Analysis",
      "eli5": "Before, analysts combed through stacks of data like searching for a needle in a haystack. Now, AI tools can scan thousands of reports in seconds to find trends. It's like having a supercharged magnifying glass that instantly highlights what matters most!",
      "yourMove": "Start using AI tools for your financial reports to gain insights faster. Look for software that integrates with your existing data systems.",
      "mnemonic": "FRA - Fast Report Analysis."
    },
    "quiz": [
      {
        "q": "What is the projected global growth rate for 2026 according to the World Bank?",
        "options": [
          "2.5%",
          "1.3%",
          "3.0%",
          "4.2%"
        ],
        "answer": 0,
        "funFact": "The World Bank updates its forecasts regularly based on current global events!"
      },
      {
        "q": "What major issue is affecting the global economy as of June 2026?",
        "options": [
          "Climate Change",
          "Middle East Conflict",
          "Technological Advancements",
          "Pandemic Recovery"
        ],
        "answer": 1,
        "funFact": "Wars can significantly disrupt both energy supplies and financial markets."
      },
      {
        "q": "What is a recent capability of AI tools in financial analysis?",
        "options": [
          "Predicting stock prices",
          "Generating legal documents",
          "Real-time data scanning",
          "Writing creative fiction"
        ],
        "answer": 2,
        "funFact": "AI can process vast amounts of data faster than any human analyst!"
      }
    ]
  },
  "travel": {
    "destination": {
      "country": "Japan",
      "region": "Kyoto",
      "eli5": "Imagine walking through ancient wooden temples surrounded by vibrant cherry blossoms. The air smells like fresh matcha, and you hear the soft rustle of silk kimonos. The streets are alive with the sound of laughter from tea houses, and the lantern-lit alleys whisper stories of samurai. Kyoto feels like stepping into a beautiful painting that comes alive with every step you take.",
      "bestTime": "The best time to visit is during cherry blossom season in late March to early April. The city transforms into a pink wonderland that's simply breathtaking.",
      "hiddenGem": "Most tourists flock to Kinkaku-ji, the Golden Pavilion, but few discover the tranquil gardens of Nanzen-ji. Here, you can enjoy a peaceful stroll without the crowds, surrounded by stunning nature.",
      "mnemonic": "Kite Soars Above Cherry Blossoms."
    },
    "visaTip": {
      "focus": "Japan visa process for Indian passport holders",
      "eli5": "First, check if you need a visa; most likely you do. Apply online for the eVisa to make it easier. Don't forget to gather your documents like your travel itinerary and bank statements.",
      "goldenTip": "Make sure to apply at least a month in advance. Many applicants forget to book an appointment early, which can delay their plans.",
      "mnemonic": "Visa Easy, Plan Ahead."
    },
    "culturalCode": {
      "culture": "Japanese",
      "doThis": "When you bow slightly when greeting, locals appreciate your respect for their customs. Additionally, trying to speak a few Japanese words, like 'arigato' for thank you, warms their hearts.",
      "neverDoThis": "Avoid speaking loudly in public places; it's considered rude. Also, never tip at restaurants, as service is included and tipping can confuse or offend staff.",
      "mnemonic": "Respect in Silence."
    },
    "quiz": [
      {
        "q": "What is Kyoto famous for?",
        "options": [
          "Temples",
          "Beaches",
          "Skyscrapers",
          "Deserts"
        ],
        "answer": 0,
        "funFact": "Kyoto has over 1,600 temples, making it a UNESCO World Heritage site."
      },
      {
        "q": "When is cherry blossom season in Kyoto?",
        "options": [
          "January",
          "March",
          "July",
          "October"
        ],
        "answer": 1,
        "funFact": "Cherry blossoms in Kyoto typically bloom in late March to early April, attracting visitors from around the world."
      },
      {
        "q": "What is a common Japanese greeting?",
        "options": [
          "Hello",
          "Howdy",
          "Oi",
          "Konnichiwa"
        ],
        "answer": 3,
        "funFact": "'Konnichiwa' is used as a friendly greeting during the day, similar to saying hello."
      }
    ]
  }
}

const d260612 = {
news: {
    segments: [
      {
        name: "🌐 What's happening with countries?", color: C.sky,
        stories: [
          {
            headline: "USA and Iran say the war is almost over — but nobody is fully sure yet",
            eli5: "For weeks, America and Iran were in a scary fight. The USA dropped bombs on Iran, and Iran fired back. Then President Trump suddenly said: 'We just made a great settlement — the war is over!' But here's the twist — Iran's leaders said: 'Hold on, nothing is signed yet.' It's like two kids who had a huge fight and one says 'we're friends again!' but the other says 'I didn't say that.' Everyone is watching to see what actually happens next.",
            whyItMatters: "If the deal holds, oil prices drop, global markets celebrate, and millions of people in the Middle East breathe easier. If it falls apart, the world gets more dangerous fast.",
            mnemonic: "USA+Iran = Fire, then 'maybe peace?' — Watch the ink, not the words 🖊️"
          },
          {
            headline: "Israel fires on Lebanon even after Trump said 'all shooting will stop'",
            eli5: "Trump told the world that Israel and Hezbollah (a group in Lebanon) had agreed to stop fighting. But just hours later, Israeli drones killed 8 people in Lebanon — including a dentist named James Karam who was in his car with his children. It's like a referee blowing the final whistle but one player keeps playing. The gap between what leaders announce and what actually happens on the ground is one of the most important lessons in world politics.",
            whyItMatters: "Wars don't end just because a president makes an announcement. Ground-level violence continuing after a ceasefire is declared is one of history's most repeated tragedies.",
            mnemonic: "Ceasefire ≠ Silence. Words stop at borders, bullets don't 🕊️💔"
          },
          {
            headline: "US kills top Tren de Aragua gang leader in Venezuela",
            eli5: "Tren de Aragua is one of the most feared criminal gangs in South America — it started in a Venezuelan prison and spread across the continent. Trump announced that a US military strike killed their leader, Hector Guerrero Flores. Think of it like the world's most dangerous school bully finally being stopped by the principal — except the 'principal' used a missile. This is part of Trump's aggressive crackdown on gangs across Latin America.",
            whyItMatters: "Tren de Aragua has terrorised Venezuela, Colombia, Peru and even reached the USA. Removing its top leader could slow its operations — or trigger a violent leadership battle inside the gang.",
            mnemonic: "Tren de Aragua = Venezuela's deadliest export, now minus its boss 🚨"
          }
        ]
      },
      {
        name: "💸 What's happening with money?", color: C.mint,
        stories: [
          {
            headline: "SpaceX goes public — Elon Musk becomes Earth's first TRILLIONAIRE",
            eli5: "SpaceX — the rocket company that sends astronauts to space and beams internet from satellites — listed on the stock market on June 12. The shares were priced at $135 and jumped to $161 by end of day. This made the company worth over $2 trillion. And because Musk owns a huge chunk of SpaceX, his total wealth crossed $1 TRILLION — making him the first human being in history to ever be worth that much. A trillion dollars is so big that if you spent ₹27 million every single day, it would take you 100 years to spend it all.",
            whyItMatters: "The SpaceX IPO is the largest in history — raising $75 billion. It proves that space is now a serious business and sets a new ceiling for what private companies can be worth.",
            mnemonic: "SpaceX IPO: $135 → $161 in one day. SPCX = Space Cash eXplodes 🚀💰"
          },
          {
            headline: "Indian markets expected to open green — crude oil drops 6% as Iran deal hopes rise",
            eli5: "When Trump hinted at peace with Iran, something amazing happened — oil prices dropped by 6% almost instantly. Why? Because Iran controls part of the Strait of Hormuz, a narrow water channel where 20% of the world's oil travels. If that channel was blocked by war, oil would get very expensive. Peace = open channel = cheaper oil = India's petrol stays affordable = Indian companies spend less = Nifty goes up. It's all connected like dominoes.",
            whyItMatters: "India imports 85% of its oil. Every dollar drop in crude oil saves India roughly $1.5 billion per year. Cheaper oil is like a tax cut for every Indian.",
            mnemonic: "Iran peace → Oil drops → India smiles → Nifty rises. It's dominos! 🁢"
          },
          {
            headline: "Nifty 50 around 23,100-23,200 — volatile week as geopolitics and US inflation collide",
            eli5: "India's Nifty index had a tough week. It started at 23,366 and fell during Iran tensions — then bounced back when oil dropped. The American inflation report (CPI) came in slightly better than expected, which means the US Federal Reserve is less likely to raise interest rates. Lower US rates = cheaper global borrowing = more money flows into emerging markets like India = Nifty gets a boost. Bank Nifty hit a two-month high of 55,600 on this news.",
            whyItMatters: "Understanding how US inflation affects Indian markets is one of the most powerful insights any Indian investor can have — global events move local money.",
            mnemonic: "US CPI soft → Fed cools → Money flows East → India banks party 🏦🎉"
          }
        ]
      },
      {
        name: "💻 What's happening with technology?", color: C.lavender,
        stories: [
          {
            headline: "SpaceX's Starship V3 can carry 100 tons to space — the biggest rocket ever built",
            eli5: "To put SpaceX's new rocket in perspective: the biggest cargo planes today carry about 100 tons. SpaceX's Starship V3 can carry that same 100 tons — but to SPACE. And it lands back on Earth like a pencil standing on its tip, ready to fly again. This is why SpaceX is worth $2 trillion. Reusable rockets change the economics of space the same way reusable containers changed global shipping.",
            whyItMatters: "Cheaper access to space means satellites, space stations, Mars missions, and space-based internet for everyone on Earth become realistic — not science fiction.",
            mnemonic: "Starship V3 = 100 tons to space, lands like a pencil, flies again 🖊️🚀"
          },
          {
            headline: "AI's hidden cost: UN scientist warns AI boom uses as much water as small countries",
            eli5: "Every time you ask an AI a question, giant computers called data centres process it. Those computers get so hot that they need enormous amounts of water to cool down. A UN scientist revealed that the global AI boom is now consuming water, electricity, and land at a scale comparable to small nations. Training one large AI model can use as much water as 700 homes use in a year. Your chatbot has a carbon footprint you never see.",
            whyItMatters: "AI's environmental cost is becoming a serious policy issue. Expect regulations on data centre water and energy use within the next few years.",
            mnemonic: "AI query = tiny question, HUGE thirst behind the curtain 💧🤖"
          },
          {
            headline: "World Cup VAR controversy: USMNT mistaken identity case stuns football world",
            eli5: "In one of the World Cup's most bizarre moments, the video referee (VAR) flagged the wrong player for a foul in the USA match — confusing two players because they looked similar on camera. It's like a teacher giving a detention to the wrong student. The incident went viral and restarted the global debate about whether technology is actually making football fairer or just adding new ways to get things wrong.",
            whyItMatters: "VAR is used in major leagues worldwide. This case shows technology's limits — systems are only as reliable as the humans and cameras behind them.",
            mnemonic: "VAR mistake = Tech is the referee now, but tech can also be wrong 📹❌"
          }
        ]
      },
      {
        name: "🌿 What's happening with our planet?", color: C.peach,
        stories: [
          {
            headline: "US strikes Iranian water reservoirs — scientists horrified",
            eli5: "During the Iran conflict, the United States reportedly struck Iranian water infrastructure — reservoirs that supply drinking water to civilian areas. Scientists and international law experts called this deeply alarming. Water is a basic human need, not a military target. Under international law, attacking water supplies for civilian populations is considered a war crime. This has sparked massive global debate about the rules of modern warfare.",
            whyItMatters: "When water infrastructure becomes a military target, the humanitarian cost extends far beyond the conflict — affecting ordinary people for years after fighting stops.",
            mnemonic: "Water strike = Weapon against civilians, not soldiers 💧⚠️"
          },
          {
            headline: "El Niño threat: India's RBI warns of food inflation risk to economy",
            eli5: "El Niño is a natural weather pattern where the Pacific Ocean gets warmer than usual — and it messes up monsoon rains across South Asia. India's central bank (RBI) warned that a strong El Niño this year could reduce rainfall, damage crops, and push food prices up sharply. When tomatoes, onions, and pulses get expensive, the RBI has to raise interest rates to control inflation — which makes loans costlier for everyone.",
            whyItMatters: "India's economy is still deeply tied to agriculture and the monsoon. Weather patterns thousands of miles away in the Pacific Ocean directly affect what you pay for vegetables.",
            mnemonic: "El Niño = Pacific gets warm → India's monsoon weakens → Onions get expensive 🧅"
          },
          {
            headline: "Pope Leo XIV stranded in Tenerife — Spain's King lends his private jet",
            eli5: "Pope Leo XIV was visiting Spain and was about to fly home to Rome when his plane developed a technical problem at Tenerife airport. Spain's King Felipe VI stepped in immediately and offered his own private royal jet to take the Pope home. It's a small but charming story about the old world of royals and church still mattering in modern Europe — a king lending his plane to a pope, like something out of a history book.",
            whyItMatters: "A light story — but it shows that ceremony, protocol, and personal relationships still shape how leaders interact, even in the age of technology.",
            mnemonic: "Pope + broken plane + King's jet = History in a funny moment ✈️👑"
          }
        ]
      }
    ],
    quiz: [
      { q: "What makes Elon Musk a 'trillionaire' on June 12, 2026?", options: ["Tesla stock hit a new record", "SpaceX went public and his stake crossed $1 trillion in value", "He sold all his companies", "The US government gave him a contract"], answer: 1, funFact: "A trillion dollars is 1,000 billions. Before Musk, no human in recorded history had ever accumulated this much wealth — even adjusting for inflation, it surpasses historical estimates for figures like John D. Rockefeller." },
      { q: "Why did oil prices drop 6% on June 12?", options: ["OPEC increased production", "New oil fields were discovered", "Trump hinted at a peace deal with Iran, reducing fears of Strait of Hormuz blockage", "India reduced its oil imports"], answer: 2, funFact: "The Strait of Hormuz is only 33km wide at its narrowest point — yet 20% of the world's entire oil supply passes through it daily. It is arguably the most strategically important waterway on Earth." },
      { q: "What is El Niño?", options: ["A Spanish festival", "A Pacific Ocean warming pattern that disrupts global weather and monsoons", "A type of hurricane", "An Indian agricultural policy"], answer: 1, funFact: "The name 'El Niño' means 'The Little Boy' or 'Christ Child' in Spanish — Peruvian fishermen named it because it typically appears around Christmas, when the warm currents devastate their fish catches." }
    ]
  },

  markets: {
    globalPulse: {
      eli5: "June 12 was one of the most dramatic days for money in years. Two giant things happened at once — SpaceX launched the biggest IPO in history and Trump announced a possible peace deal with Iran. Stock markets went up, oil went down, and Elon Musk became Earth's first trillionaire. The money river had a huge wave today — some boats rose, some rocked violently.",
      keyThings: ["SpaceX IPO: priced $135, closed $161 (+19%)", "Brent Crude dropped ~6% on Iran peace hopes (near $89/barrel)", "S&P 500 +0.4%, Nasdaq +0.2%", "India Nifty bounced from 23,072 → targeting 23,350"]
    },
    indianMarket: {
      eli5: "India's stock market was like a seesaw on June 12. In the morning it was nervous — geopolitics and IT sector selling dragged it down. Then news broke of cheaper oil and a softer US inflation report. Banking stocks jumped. ICICI Bank hit ₹1,333. By end of day the mood shifted from fear to cautious hope. The bazaar went from closing-time panic to a late-afternoon shopping rush.",
      breakouts: [
        { name: "ICICI Bank (NSE: ICICIBANK)", whyExciting: "ICICI Bank jumped 1.83% to ₹1,317 on June 11 on exceptional volume. With US Fed likely to hold rates, foreign investors love Indian private banks — ICICI is their first pick. Bank Nifty hitting a 2-month high of 55,600 confirms the sector is in recovery mode.", risk: "Any escalation in Iran conflict or surprise Fed rate hike could reverse banking sector gains sharply." },
        { name: "Oil Marketing Companies: BPCL / HPCL", whyExciting: "When crude oil drops 6% in a day, the biggest winners are companies that buy oil and sell petrol in India. BPCL and HPCL's profit margins directly expand when crude is cheaper. This is a short-to-medium term trade as long as Iran tensions stay calm.", risk: "If Iran deal collapses, oil spikes back and these stocks fall hard. High news-event dependency." },
        { name: "Adani Ports (NSE: ADANIPORTS)", whyExciting: "Peace in the Middle East means shipping routes through the Gulf reopen fully. Adani Ports handles a massive share of India's maritime trade — especially goods going to/from Middle East and Europe. Reduced geopolitical risk = more ship traffic = more port revenue.", risk: "Adani group stocks carry governance risk. Any negative news about the group affects all Adani stocks together." }
      ],
      ipoSpot: { name: "SpaceX (SPCX) — Nasdaq listed, not Indian", verdict: "Watch", eli5: "SpaceX listed in the USA on June 12 at $135 and hit $161. Indian investors cannot buy it directly on NSE/BSE, but you can access it through international brokers like Vested, INDmoney, or Groww's US stocks feature. It's a high-risk, high-excitement bet on the future of space. Not for short-term traders." },
      lessonOfDay: { title: "Buy Fear, Sell Greed — The Contrarian's Code", story: "On June 12, when Iran tensions peaked and Nifty fell to 23,072, most retail investors panicked and sold. That was the exact moment smart institutional money stepped in and bought. Warren Buffett's most famous rule: 'Be fearful when others are greedy, and greedy when others are fearful.' The market's biggest single-day drops are often immediately followed by the strongest recoveries — but only patient people who didn't sell get to enjoy them.", mnemonic: "Buy Fear + Sell Greed = The contrarian's superpower 😨📈" }
    },
    quiz: [
      { q: "SpaceX's IPO ticker symbol on Nasdaq is?", options: ["SPACE", "MUSK", "SPCX", "SPEX"], answer: 2, funFact: "SpaceX raised $75 billion in its IPO — the largest IPO in history. For comparison, the previous record was Saudi Aramco's $25.6 billion IPO in 2019." },
      { q: "When crude oil prices fall, which Indian companies benefit most immediately?", options: ["IT companies like Infosys", "Oil Marketing Companies like BPCL and HPCL", "Pharmaceutical companies", "Real estate companies"], answer: 1, funFact: "India spends over $150 billion per year importing crude oil. A 10% drop in oil prices saves India roughly $15 billion annually — equivalent to building 15,000 schools." },
      { q: "What does 'Buy Fear, Sell Greed' mean in investing?", options: ["Never invest during market crashes", "Buy stocks when everyone is panicking and sell when everyone is excited", "Only buy stocks with low prices", "Follow what the majority of investors are doing"], answer: 1, funFact: "Studies show that retail investors who panic-sold during the COVID crash of March 2020 and bought back 6 months later lost an average of 35% in potential gains compared to those who held through the fear." }
    ]
  },

  psychology: {
    mindTrick: {
      name: "The Bandwagon Effect",
      eli5: "On June 12, millions of people rushed to open trading accounts just to buy SpaceX shares — not because they researched the company, but because everyone else was doing it. This is the Bandwagon Effect: your brain is wired to believe that if lots of people are doing something, it must be the right thing to do. It's the same reason concerts seem more fun when they're sold out, or why a restaurant with a queue outside feels better than an empty one. Evolution made you this way — in primitive times, following the crowd kept you safe. Today it can make you make terrible financial decisions.",
      realLife: "Every stock market bubble in history — from Tulip Mania in 1637 to the Crypto crash of 2022 — was fuelled by the Bandwagon Effect. When everyone says 'buy this now!', ask: am I thinking, or just following?",
      mnemonic: "Bandwagon Effect = Everyone's jumping on → That's exactly when to pause 🚌⛔"
    },
    bodyLanguage: {
      signal: "The Lip Press — Lips pressed together tightly",
      eli5: "When someone presses their lips together into a thin line, they are holding back something — a disagreement, a concern, or a negative emotion they're not ready to voice. Negotiators and therapists watch for this signal constantly. It happens faster than people can control. If your boss presses their lips while listening to your idea, they have a concern they haven't said yet. That's your cue to ask: 'What do you think?' before moving forward.",
      howToUse: "In meetings or negotiations, watch for lip-pressing after you make a key statement. It means: something I just said created friction. Address it directly before proceeding.",
      mnemonic: "Lips pressed tight = Words being swallowed. Ask what's inside 👄🔒"
    },
    superpower: {
      name: "Scarcity Principle",
      story: "SpaceX IPO shares were available only to those who applied early through specific brokers. Within hours, every allocation was oversubscribed — people were desperate to get in. The scarcity made it feel more valuable. Robert Cialdini documented this as one of the most powerful human triggers: we want what we can't easily have. 'Limited time offer.' 'Only 3 left in stock.' 'Exclusive members only.' These phrases aren't describing reality — they're manufacturing desire.",
      shield: "When you feel urgency to buy, join, or decide — stop. Ask: 'Is this genuinely rare, or is the scarcity manufactured to rush my decision?' Real opportunities rarely disappear in 24 hours.",
      mnemonic: "Scarcity = 'Only 3 left!' → Pause. Is it real or a trick? 🔴⏳"
    },
    quiz: [
      { q: "The Bandwagon Effect means you...", options: ["Research carefully before deciding", "Do something because many others are doing it", "Always go against popular opinion", "Make decisions based on data"], answer: 1, funFact: "The term 'jump on the bandwagon' comes from 19th century American politics — literal horse-drawn bandwagons played music at political rallies, and candidates literally invited people to jump on to show support." },
      { q: "When someone presses their lips tightly together during a conversation, they are most likely...", options: ["Feeling happy and satisfied", "Getting ready to agree with you", "Holding back a concern or disagreement", "Feeling bored"], answer: 2, funFact: "Joe Navarro, a former FBI agent who spent 25 years reading body language, says the lip press is one of the most reliable stress signals — it occurs even in people who are trained to control their expressions." },
      { q: "The Scarcity Principle works because...", options: ["Rare things are always better quality", "Humans are wired to want things that seem hard to get", "Limited products are always cheaper", "Scarcity signals a product is safe"], answer: 1, funFact: "In a famous study, people rated cookies as more desirable and tastier when told there were only 2 left in a jar — even though the cookies were identical to ones in a jar with 10." }
    ]
  },

  leadership: {
    leaderMove: {
      name: "The Art of the Pivot — Changing Direction Without Losing Authority",
      story: "Trump announced a ceasefire with Iran — then Iran said there was no deal — then Trump insisted there was. In politics and business, leaders constantly have to change course while still appearing in control. The best leaders frame pivots as evolution, not failure: 'Based on new information, here's how we're moving forward.' Weak leaders deny they changed course. Great leaders explain why the new direction is stronger. Elon Musk pivoted SpaceX from a small satellite company to a Mars-mission rocket builder to an AI-competing data empire — each time framing it as the next chapter, not an admission that the last chapter failed.",
      doThis: "Next time you change your mind publicly, don't hide it. Say: 'I've updated my view on this because of [reason]. Here's the better path.' People respect transparency far more than false consistency.",
      mnemonic: "Pivot with purpose = Leaders evolve, followers pretend they were always right 🔄"
    },
    visionarySecret: {
      concept: "Thinking in Platforms, Not Products",
      eli5: "Most people think: 'I want to build a good rocket.' Elon Musk thought: 'Rockets are the platform — the real product is humanity becoming multi-planetary, plus space internet, plus AI in orbit.' When you think in platforms, you build something others can build on top of. Amazon didn't just sell books — it built a selling platform. Apple didn't just make phones — it built an app platform. The next time you start something, ask: what platform am I actually building?",
      exercise: "Write down your current goal. Then ask: if 1,000 other people wanted to build on top of what I'm creating — what would they build? That question reveals your real platform.",
      mnemonic: "Product → Platform = The difference between a shop and a marketplace 🏪➡️🌐"
    },
    eliteHabit: {
      habit: "The Pre-Mortem — Imagining Failure Before It Happens",
      whoAndHow: "Jeff Bezos built Amazon's decision-making culture around a concept called 'working backwards' — imagining the future outcome first, then planning how to get there. Psychologist Gary Klein formalised this as the Pre-Mortem: before starting any major project, imagine it has already failed spectacularly. Then ask: what went wrong? This surfaces risks you'd never see when you're optimistic at the start.",
      whyItWorks: "Our brains are bad at seeing risks when we're excited. Deliberately imagining failure short-circuits optimism bias and forces you to build real safeguards — not just hope things work out.",
      mnemonic: "Pre-Mortem = Kill your idea in your head before reality does it for you 💀➡️🛡️"
    },
    sigmaWisdom: {
      lesson: "Respond, Never React",
      story: "On June 12, global markets had a moment of chaos — Iran, SpaceX, oil, inflation data, all hitting at once. Traders who reacted emotionally sold at the bottom. Traders who responded — paused, assessed, then acted — bought at the low and rode the recovery. Marcus Aurelius wrote: 'Between stimulus and response, there is a space. In that space is our power to choose.' The space between something happening and you acting is where your character lives.",
      action: "Today, when something frustrates or surprises you — wait 10 seconds before responding. Not to be slow. To be deliberate. Reaction is instinct. Response is intelligence.",
      mnemonic: "Stimulus → [10 second gap] → Response = Where wisdom lives ⏸️"
    },
    quiz: [
      { q: "What is a 'Pre-Mortem' in decision making?", options: ["Reviewing a project after it fails", "Imagining a project has already failed and asking what went wrong — before starting", "A financial analysis tool", "A type of market research"], answer: 1, funFact: "NASA uses pre-mortems before every mission. After the Space Shuttle Challenger disaster in 1986 — which several engineers had tried to flag as risky — pre-mortem thinking became a standard tool in safety-critical industries." },
      { q: "Thinking in Platforms means...", options: ["Building only one product very well", "Creating something others can build businesses on top of", "Copying successful platforms", "Focusing only on digital products"], answer: 1, funFact: "The App Store alone generates over $100 billion per year for Apple — far more than the iPhone hardware. Apple's real business is the platform, not the phone." },
      { q: "The 10-second gap between stimulus and response is important because...", options: ["It gives you time to think of something clever to say", "It converts emotional reaction into deliberate, intelligent response", "It makes others think you are mysterious", "It shows you are considering their feelings"], answer: 1, funFact: "Viktor Frankl, who survived Nazi concentration camps, wrote about this space between stimulus and response as the last human freedom — one that no circumstance can take away." }
    ]
  },

  wealth: {
    wealthSecret: {
      name: "The IPO Trap — Why Most Retail Investors Lose on IPO Day",
      story: "SpaceX listed at $135 and shot to $161 — a 19% gain in one day. Headlines screamed. Millions of retail investors who didn't get IPO allocations rushed to buy at $161, $165, $170 as the day went on. But here's what history shows: the biggest IPOs in history — Facebook, Uber, Lyft, WeWork — all fell sharply after their initial pop. The people who get rich in IPOs are the early investors and employees. Retail buyers on day one are usually buying the stock at its most expensive point ever, from people who got in much cheaper and are now selling to them.",
      action: "For any exciting IPO: don't buy on day 1. Watch for 3-6 months. If the company is genuinely great, the stock will still be a good buy after the initial excitement fades. Patience beats FOMO every time.",
      mnemonic: "IPO Day 1 = Buying someone else's excitement at peak price. Wait 🛑⏳"
    },
    moneyMachine: {
      type: "Dividend Investing — Getting Paid While You Sleep",
      eli5: "Some companies share their profits with shareholders every few months — this is called a dividend. If you own 1,000 shares of a company that pays ₹10 dividend per share every year, you get ₹10,000 in your account — without selling anything, without working, just for owning the shares. The best dividend companies in India (like Coal India, ITC, HDFC Bank) have paid dividends consistently for decades. It's like owning a small orchard — every season the trees drop fruit without you having to do anything.",
      indiaAngle: "Coal India has one of the highest dividend yields on the Indian market — sometimes 8-10% per year. ONGC and Power Grid are also known for consistent dividends. Search 'NSE high dividend yield stocks 2026' for the current list.",
      mnemonic: "Dividends = Your money working a night shift while you sleep 🌙💰"
    },
    mindsetFlip: {
      oldThinking: "I can't invest because I don't have enough money to make a difference",
      newThinking: "The habit of investing any amount is worth 100x more than the amount itself",
      why: "A ₹500 SIP started at age 22 and continued for 35 years at 12% returns becomes approximately ₹32 lakhs. The same ₹500/month invested starting at age 30 becomes only ₹14 lakhs. The difference of 8 years costs you ₹18 lakhs — not because of the money, but because of lost time for compounding. The habit matters infinitely more than the amount.",
      mnemonic: "Start small, start NOW = Time is the ingredient you can't buy back ⏰"
    },
    magicNumber: {
      number: "₹1 Crore in 20 Years",
      eli5: "Here's a goal that sounds impossible but is totally achievable: ₹1 crore by age 42 if you start at 22. How? Invest ₹7,500 per month in a Nifty 50 index fund. At 12% average annual returns, in 20 years you have approximately ₹1 crore. That's ₹250 per day — less than a fancy coffee and a sandwich. The goal isn't the crore. The goal is building the discipline of the ₹250 daily habit that makes the crore inevitable.",
      mnemonic: "₹7,500/month × 20 years × 12% = ₹1 Crore. The math works. Do you? 📐"
    },
    quiz: [
      { q: "Why do most retail investors lose money buying IPO stocks on Day 1?", options: ["IPO stocks always go down", "They are buying at the peak excitement price from investors who got in much cheaper", "IPOs are illegal for retail investors", "Brokers take too many fees on IPO day"], answer: 1, funFact: "According to a Harvard Business School study, the average IPO underperforms the market by 20-30% over the first 3 years after listing — despite massive first-day gains." },
      { q: "What is a dividend?", options: ["A type of stock bonus given when you open a trading account", "A share of company profits paid regularly to shareholders", "Interest earned on a savings account", "A government subsidy for investors"], answer: 1, funFact: "Warren Buffett's company Berkshire Hathaway receives over $6 billion in dividends every year from companies it owns — money that arrives without Buffett or his team doing anything that day." },
      { q: "To reach ₹1 crore in 20 years at 12% returns, you need to invest roughly how much per month?", options: ["₹2,000", "₹5,000", "₹7,500", "₹15,000"], answer: 2, funFact: "₹7,500 per month is ₹250 per day — approximately the cost of a single ride-share trip or a coffee and snack at a café. The crore is hidden in your daily discretionary spending." }
    ]
  },

  communication: {
    speakingSkill: {
      name: "Pregnant Pause — The Power of Strategic Silence",
      story: "When Elon Musk walked onto the stage at SpaceX's IPO event on June 12, he didn't speak immediately. He stood there, looked at the crowd, let the silence build for 5 full seconds — and then said quietly: 'Today, we begin making humanity multi-planetary.' The silence made the words land like a hammer. The best orators in history — Obama, Churchill, Steve Jobs — all used deliberate pauses. Silence forces an audience to pay attention, because human brains are wired to fill silence with anticipation.",
      drill: "Practice this: record yourself reading any 3 sentences. Insert a 3-second pause after the most important sentence. Play it back. You'll be shocked how much more powerful it sounds. Do this daily for one week.",
      mnemonic: "Silence speaks loudest right after your best line. Pause = Power ⏸️🎤"
    },
    negotiationMove: {
      tactic: "The High Anchor",
      eli5: "In every negotiation, whoever says the first number has a huge psychological advantage. This is called anchoring. If a seller says ₹10 lakhs first, the whole conversation happens around that number. If you said ₹6 lakhs first, you'd be negotiating around that. SpaceX priced its IPO at $135 — a carefully chosen anchor. Even though many analysts said it was overvalued, traders couldn't help referencing $135 as the 'real' price all day. The anchor shapes all thinking that follows.",
      script: "In any price negotiation, name your number first and name it confidently. If buying: start 30-40% below your real target. If selling: start 30-40% above. The final number will land closer to your anchor than to theirs.",
      mnemonic: "Anchor first, anchor high (or low). The first number owns the room ⚓"
    },
    officeWin: {
      rule: "Never send a message when you're angry — write it, save it as draft, reread tomorrow",
      story: "On volatile market days like June 12, traders and managers send aggressive messages they regret. A risk manager fires off: 'Your position is reckless and you've lost the team money.' Hours later, the position recovers 8%. The message can't be unsent. The relationship is damaged. Abraham Lincoln had a rule: when he was furious, he'd write the letter in full — call it a 'hot letter' — and then put it in a drawer and never send it. It was writing for catharsis, not communication.",
      mistake: "Most professionals treat their outbox like a trash can for frustration. Your worst messages are always sent in the first 15 minutes of anger.",
      mnemonic: "Angry email = Write it. Save it. Sleep on it. Delete it. 🗑️😤"
    },
    confidenceHack: {
      technique: "The Name Anchor — Use People's Names Deliberately",
      science: "Your own name is the sweetest sound your brain processes. Dale Carnegie documented this in the 1930s, and neuroscience has since confirmed it: hearing your name activates the brain's reward centre. People who use names deliberately in conversation are consistently rated as more charismatic, more trustworthy, and more confident — not because they are, but because using a name signals: 'I see you. You matter.'",
      doItNow: "In your next conversation or meeting, use the other person's name twice — once at the start and once when making your key point. Not more (it becomes creepy). Exactly twice. Notice how the energy in the room shifts.",
      mnemonic: "Name × 2 = Instant rapport. Not 3 (creepy), not 0 (forgettable). Twice 🎯"
    },
    quiz: [
      { q: "Why do great speakers use strategic silence (the pregnant pause)?", options: ["To remember their next line", "To seem mysterious and cool", "To make the preceding words land harder and build audience anticipation", "To allow the audience to take notes"], answer: 2, funFact: "Studies on TED talks show the most-watched talks contain an average of 3 deliberate pauses of 3+ seconds. The least-watched talks have almost none." },
      { q: "What is 'anchoring' in negotiation?", options: ["Making the other person feel secure", "The first number named sets the psychological centre of all future discussion", "Refusing to move from your original position", "Writing down your target before negotiating"], answer: 1, funFact: "In a famous experiment, people were asked to spin a wheel that landed on either 10 or 65 — then guess the percentage of African countries in the UN. Those who got 65 guessed much higher than those who got 10. Even completely random numbers anchor our thinking." },
      { q: "How many times should you use someone's name in a conversation for maximum rapport?", options: ["Once, at the start", "As many times as possible", "Twice — once at the start, once at a key moment", "Never — it sounds forced"], answer: 2, funFact: "Dale Carnegie's book 'How to Win Friends and Influence People' — published in 1936 — is still one of the top 10 best-selling non-fiction books in history, with over 30 million copies sold." }
    ]
  },

  mind: {
    brainHack: {
      name: "Emotional Labelling — Name It to Tame It",
      eli5: "On a day like June 12 — with war news, a historic IPO, crashing oil prices, and a Pope stranded at an airport — your brain is flooded with emotions. Fear, excitement, confusion, urgency. Neuroscientist Matthew Lieberman discovered something remarkable: the moment you put a name on an emotion, the brain's alarm system (amygdala) immediately calms down. 'I feel anxious' is more powerful than just feeling anxious without naming it. Words give the brain a handle on the feeling — and suddenly it's something you have, not something that has you.",
      protocol: "When you feel emotionally flooded: stop. Ask yourself: what exactly am I feeling? Name it specifically — not just 'bad' but 'frustrated', 'scared', 'jealous', 'overwhelmed'. Say it aloud or write it. Watch the intensity drop within 60-90 seconds.",
      mnemonic: "Name it to Tame it = Emotion labelled is emotion managed 🏷️"
    },
    disciplineCode: {
      principle: "The Two-Minute Rule",
      story: "David Allen, author of 'Getting Things Done', realised that most people's to-do lists are full of things that take less than 2 minutes but have been sitting there for days. Every time you see that undone task, your brain spends energy on it — even if you don't act. Allen's rule: if something takes less than 2 minutes — do it immediately. Reply to the short email now. Send the file now. Confirm the appointment now. Don't manage it, just do it. The mental energy saved by eliminating small tasks immediately is enormous.",
      todayAction: "Look at your to-do list right now. Find everything that takes under 2 minutes. Do all of them in the next 10 minutes. Notice how much lighter your head feels after.",
      mnemonic: "Under 2 minutes? DO IT NOW. Don't list it, do it ⚡2️⃣"
    },
    impulseKiller: {
      urge: "The urge to check market prices obsessively during volatile days",
      eli5: "On June 12, millions of Indian investors checked their portfolio 10, 20, 50 times. Every drop caused a tiny panic. Every rise caused a tiny thrill. This is called 'checking behaviour' and it's a form of compulsion — your brain gets a small dopamine hit from each refresh, even though frequent checking makes you more anxious and leads to worse decisions. Studies show investors who check their portfolio daily earn less than those who check monthly — because daily checkers panic-sell at the wrong time.",
      interrupt: "Set a rule: you may check your portfolio maximum ONCE per day, at a fixed time (e.g. 4pm after market close). Put your investment apps in a separate folder on the last screen of your phone. Friction kills impulse.",
      mnemonic: "Portfolio check = Once a day, after market close. Like weighing yourself once a week ⚖️"
    },
    bodyUpgrade: {
      practice: "Box Breathing — The Navy SEAL Stress Reset",
      eli5: "US Navy SEALs use this technique before entering a dangerous situation to instantly calm their nervous system. Breathe in for 4 counts, hold for 4 counts, breathe out for 4 counts, hold for 4 counts. Repeat 4 times. This box pattern activates the parasympathetic nervous system — your body's 'calm down' switch. It works in under 2 minutes and can be done anywhere — before a presentation, a difficult conversation, or a volatile market decision.",
      minimumDose: "4 rounds of box breathing (about 90 seconds) before any high-stakes moment. Works immediately.",
      mnemonic: "Box Breathing: 4 in, 4 hold, 4 out, 4 hold = Square = Calm 🔲🌬️"
    },
    quiz: [
      { q: "What happens in the brain when you label an emotion with a specific word?", options: ["The emotion intensifies", "The brain's alarm system calms down", "You become more confused about how you feel", "Nothing — labelling has no effect"], answer: 1, funFact: "Matthew Lieberman's UCLA study showed that labelling emotions reduced amygdala activity by 30-40% — equivalent to what therapists try to achieve in sessions over weeks." },
      { q: "The Two-Minute Rule says you should...", options: ["Only work on tasks for 2-minute bursts", "If a task takes under 2 minutes, do it immediately instead of adding it to a list", "Rest for 2 minutes every hour", "Spend 2 minutes planning before every task"], answer: 1, funFact: "David Allen's 'Getting Things Done' method is used by over 2 million people worldwide. Google, Dropbox, and many Fortune 500 companies have run official GTD training programmes for employees." },
      { q: "Box Breathing consists of...", options: ["Breathing in slowly and out slowly", "4 counts in, 4 hold, 4 out, 4 hold — repeated 4 times", "Alternating breathing through left and right nostrils", "Breathing only through the mouth"], answer: 1, funFact: "Box Breathing is formally called 'tactical breathing' in military training. It's also used by surgeons before complex operations, pilots before emergencies, and athletes before pressure moments." }
    ]
  },

  knowledge: {
    mathMagic: {
      concept: "Exponential Growth vs Linear Growth",
      eli5: "Most people think in straight lines: I earn ₹1,000 today, ₹1,000 tomorrow, ₹1,000 next week. Linear. But SpaceX's valuation didn't grow linearly — it went from $200 billion to $2 trillion as the rocket reuse technology suddenly made all their numbers multiply. That's exponential: each step multiplies the previous one instead of just adding to it. A chess legend says: if you put one grain of rice on the first square, double it on the next square, double again, and so on — by square 64 you have more rice than has ever been grown in human history. That's exponential growth.",
      realWorldUse: "Compound interest is exponential growth applied to money. Viral social media posts are exponential growth applied to attention. Understanding this distinction changes how you plan careers, investments, and businesses.",
      mnemonic: "Linear = Add each time. Exponential = Multiply each time. SpaceX = Exponential 🚀"
    },
    scienceWow: {
      field: "Physics",
      concept: "The Rocket Equation — Why Space is So Hard",
      eli5: "The reason getting to space is so expensive is a cruel piece of physics called the Tsiolkovsky Rocket Equation. To go faster, you need more fuel. But more fuel is heavier. To carry heavier fuel, you need even more fuel. It spirals — most of a rocket's weight is just fuel to carry the fuel. SpaceX's genius wasn't building a better rocket — it was landing and reusing the rocket so you don't throw away $50 million of hardware after each launch. Reuse breaks the equation's cruelty.",
      mindBlow: "To get 1 kilogram of anything into orbit costs roughly $1,000-$2,000 using SpaceX today. Before SpaceX, it cost $50,000-$60,000 per kilogram. They made space 50x cheaper in 15 years.",
      mnemonic: "Rocket equation = The cruelest physics. Reuse = The elegant cheat 🔄🚀"
    },
    historyStory: {
      event: "The Dutch Tulip Mania of 1637 — History's First Asset Bubble",
      story: "In 1630s Holland, tulip bulbs became the hottest investment in the world. Prices rose so fast that a single rare tulip bulb sold for more than a skilled craftsman's annual salary. People sold houses to buy tulip futures. Then in February 1637, prices collapsed overnight. Some investors lost everything. Sound familiar? It's SpaceX IPO day — everyone wants in, prices are jumping, FOMO is everywhere. History's first asset bubble was a flower. Nothing has changed about human psychology in 400 years.",
      lesson: "Every financial mania in history — tulips, railways, dotcoms, crypto, real estate — follows the same pattern: new exciting thing → prices rise → everyone jumps in → prices disconnect from reality → collapse. The ones who made money were those who got in early and got out before the crowd.",
      mnemonic: "Tulip Mania 1637 = Every bubble ever. Different flower, same story 🌷💸"
    },
    earthSecret: {
      place: "The Strait of Hormuz, Oman",
      secret: "This tiny waterway between Iran and Oman is only 33 kilometres wide at its narrowest point — narrower than the English Channel. Yet 20% of the world's entire oil supply passes through it every day. About 17 million barrels of oil, every single day, squeezed through this narrow passage. When tensions rise between the USA and Iran, the whole world holds its breath about this one small channel — because if it closes, oil-dependent economies from India to Japan to Europe all face a crisis within weeks.",
      edge: "Understanding the Strait of Hormuz explains 40 years of Middle East geopolitics instantly. Every US military base in the region, every Saudi-Iran rivalry, every oil price spike — it comes back to this 33km gap.",
      mnemonic: "Strait of Hormuz = 33km wide, controls 20% of world's energy 🗺️⚡"
    },
    quiz: [
      { q: "What is the key difference between linear and exponential growth?", options: ["Linear is faster initially", "Linear adds each time, exponential multiplies each time", "They are the same but with different starting points", "Exponential growth always slows down eventually"], answer: 1, funFact: "The human brain is naturally wired for linear thinking — which is why we consistently underestimate exponential growth. This is called 'exponential growth bias' and it causes us to under-invest in compound growth opportunities." },
      { q: "SpaceX made access to space cheaper mainly by...", options: ["Using cheaper materials", "Landing and reusing rockets instead of throwing them away after each launch", "Making smaller rockets", "Getting government subsidies"], answer: 1, funFact: "SpaceX's Falcon 9 booster has been reused over 20 times on individual boosters. Each reuse saves approximately $50 million versus building a new one — making SpaceX's launch costs the lowest in history." },
      { q: "What was unique about the Dutch Tulip Mania of 1637?", options: ["It was the first government-run investment scheme", "It was history's first recorded speculative asset bubble — driven entirely by human psychology and FOMO", "It only affected wealthy investors", "It was caused by a disease that made tulips rare"], answer: 1, funFact: "At the peak of Tulip Mania, a single Semper Augustus tulip bulb sold for 10,000 guilders — equivalent to roughly $500,000 today. The bubble collapsed in days, not months." }
    ]
  },

  ai: {
    toolSpotlight: {
      name: "Claude (Anthropic)",
      category: "Research / Analysis / Writing / Coding",
      eli5: "Claude is an AI assistant built by Anthropic — a company focused on making AI that is safe and genuinely useful. Unlike chatbots that try to agree with you, Claude is designed to tell you when it doesn't know something, push back when it disagrees, and think through complex problems step by step. It's particularly strong at analysis, writing long documents, understanding nuanced questions, and explaining difficult topics simply — exactly what you're using it for right now.",
      secretMove: "Use Claude for 'devil's advocate' analysis: describe your investment idea, business plan, or decision — then ask 'argue strongly against this decision. What are all the ways this could fail?' Most people ask AI to validate their ideas. Asking it to attack your ideas is where the real value hides.",
      mnemonic: "Claude = The AI that tells you what you need to hear, not just what you want 🎯"
    },
    workflowWin: {
      title: "The Daily Market Intelligence Workflow",
      problem: "Reading financial news, understanding global events, and connecting them to your portfolio takes 2-3 hours a day for most investors. Most people either skip it or drown in information without extracting insight.",
      steps: [
        "Spend 10 mins reading headlines only (no articles) from Economic Times, Bloomberg India",
        "Paste the 5 most important headlines into Claude and ask: 'How do each of these affect Indian markets? What sectors win, what sectors lose?'",
        "Ask: 'What is the single most important thing I should watch in markets this week and why?'",
        "Save the response in a daily notes file — review weekly to spot patterns in your own thinking"
      ],
      timeSaved: "Compress 2 hours of reading into 20 focused minutes with sharper insight.",
      mnemonic: "10 min headlines + AI analysis = 2 hours of insight in 20 minutes 📰⚡"
    },
    promptOfDay: {
      purpose: "Understand any complex news event and its impact on you personally",
      prompt: "I just read this news: [paste headline or brief description]. Explain it to me like I'm a curious, smart person who wants to understand: 1) What actually happened in simple terms, 2) Why it happened, 3) How it affects India specifically, 4) How it affects my personal finances or career, 5) What I should do about it, if anything. Be honest if the impact is actually small — don't exaggerate.",
      where: "Claude, ChatGPT, or Gemini",
      mnemonic: "News → Paste → 5 questions → You understand the world better in 2 minutes 🌍"
    },
    futureWatch: {
      trend: "AI is moving from 'answering questions' to 'running companies'",
      eli5: "In 2024, AI answered questions. In 2025, AI started writing code and drafting emails. In 2026, companies are deploying AI agents that schedule meetings, manage supplier relationships, process invoices, and even hire contractors — without human involvement for each step. SpaceX's ground operations reportedly use AI agents to manage launch scheduling. The question is no longer 'can AI do my job?' — it's 'which parts of my job can AI do better, and what should I focus on instead?'",
      yourMove: "Audit your own job. List every task you do in a week. Mark tasks that are: information processing, pattern recognition, scheduling, drafting standard documents. Those are the first to be automated. Double down on: relationship building, creative problem-solving, ethical judgment, leadership. That's where humans will keep winning.",
      mnemonic: "AI takes tasks. Humans keep judgment, relationships, creativity. Know the difference 🤝🤖"
    },
    quiz: [
      { q: "What is the most powerful way to use AI for decision-making?", options: ["Ask it to confirm your ideas are good", "Ask it to argue against your idea and find all the ways it could fail", "Ask it to predict the future", "Ask it to do everything automatically"], answer: 1, funFact: "Charlie Munger (Warren Buffett's partner) famously said: 'I have nothing to add' was his most common statement in meetings — because he used 'inversion thinking' to kill bad ideas before they started. AI devil's advocate thinking is inversion thinking at scale." },
      { q: "What should you focus on developing as AI automates more tasks?", options: ["Speed at data entry", "Relationship building, creative problem-solving, and ethical judgment", "Learning more programming languages", "Doing tasks faster than AI"], answer: 1, funFact: "A 2026 World Economic Forum report found that the top 3 skills most valued by employers as AI spreads are: complex problem-solving, emotional intelligence, and creative thinking — all deeply human." },
      { q: "The '10 minutes headlines + AI analysis' workflow saves how much time?", options: ["30 minutes", "1 hour", "About 100 minutes — from 2 hours to 20 minutes", "5 minutes"], answer: 2, funFact: "A Reuters Institute study found that most people who read financial news spend 70% of their time on articles that ultimately have no actionable impact on their decisions. The filtering step (headlines only first) eliminates most of that waste." }
    ]
  },

  travel: {
    destination: {
      country: "Portugal",
      region: "Lisbon & The Algarve",
      eli5: "Imagine a city built on seven hills overlooking the Atlantic Ocean, where trams rattle up cobblestone streets, fishermen still sell sardines from boats, pastéis de nata (egg custard tarts) cost 30 cents each, and you can watch the sunset from ancient castles that have stood for 800 years. That's Lisbon. And two hours south is the Algarve — dramatic golden cliffs, secret sea caves, turquoise water, and beaches that look like they belong in a painting. Portugal is southern Europe's most underrated gem — still affordable, deeply beautiful, and genuinely friendly to visitors.",
      bestTime: "May-June or September-October — warm and sunny without the July-August crowds and peak prices. June is perfect right now.",
      hiddenGem: "Sintra — 45 minutes from Lisbon by train — is a fairy-tale mountain town with palaces from different centuries all within walking distance. Most tourists spend 3 hours and leave. Stay the night: the palaces at sunset and dawn, with morning mist over the Atlantic, are among the most beautiful sights in Europe.",
      mnemonic: "Portugal = Europe's best kept secret. 7 hills, ocean sunsets, ₹200 tarts 🥐"
    },
    visaTip: {
      focus: "Portugal (Schengen Visa) for Indian Passport Holders",
      eli5: "Portugal is part of the Schengen Zone — one visa gets you into 27 European countries. For Indians, you apply at the VFS Global centre in major Indian cities. You need: confirmed hotel bookings, return flight tickets, travel insurance of minimum €30,000, bank statement showing sufficient funds (roughly ₹3-4 lakhs for a 2-week trip), and ITR/salary slips. Apply at least 6-8 weeks before travel. Portugal is known for being one of the more applicant-friendly Schengen embassies for Indians.",
      goldenTip: "Book all your accommodation as 'free cancellation' initially — it shows a confirmed itinerary for the visa application without locking you into non-refundable bookings. Once your visa is approved, you can adjust or rebook.",
      mnemonic: "Schengen = 1 visa, 27 countries. Apply 6-8 weeks early, free cancellation bookings trick 🗺️"
    },
    culturalCode: {
      culture: "Portugal",
      doThis: "Learn two words: 'Obrigado' (thank you, if you're male) or 'Obrigada' (if female). Portuguese people light up when foreigners try even a single word of their language. Also: try the local food — bacalhau (salt cod) and pastéis de nata — without making comparisons to other cuisines. Portuguese take immense pride in their food traditions.",
      neverDoThis: "Never confuse Portuguese with Spanish or call their language 'Spanish.' Portugal and Spain have a complex historical relationship and Portuguese people are very proud of their distinct identity and language. Also never rush through meals — Portuguese dining is a slow, social ritual. Asking for the bill early is considered rude.",
      mnemonic: "Portugal rule: Obrigado + Never call it Spanish + Let the meal breathe 🍷"
    },
    quiz: [
      { q: "What is the Schengen Zone?", options: ["A special tourist area in France", "A group of 27 European countries sharing one visa that allows free movement between them", "A type of European rail pass", "A discount shopping zone in Germany"], answer: 1, funFact: "The Schengen Agreement was signed in 1985 on a boat on the Moselle River near the village of Schengen in Luxembourg. The village has only 600 inhabitants but gave its name to one of the world's most significant travel agreements." },
      { q: "The 'free cancellation booking trick' for visa applications works because...", options: ["It's cheaper", "It shows a confirmed itinerary to the embassy without committing to non-refundable bookings", "Embassies prefer flexible travellers", "It guarantees visa approval"], answer: 1, funFact: "Visa rejection is the single most common travel fear for Indian passport holders in Europe. India ranks around 80th globally in passport strength — but Indian applicants with clean travel history and strong financials have high approval rates for Schengen visas." },
      { q: "What should you never do in Portugal that would offend locals?", options: ["Eat bacalhau", "Call their language 'Spanish' or confuse their culture with Spain", "Drink local wine", "Visit historic castles"], answer: 1, funFact: "Portuguese is the 6th most spoken language in the world with 260 million native speakers — more than French (80 million) or German (95 million). It's the dominant language of Brazil, Angola, Mozambique, and several other countries." }
    ]
  }
}

const d260613 = {
news: {
    segments: [
      {
        name: "🌐 What's happening with countries?", color: C.sky,
        stories: [
          {
            headline: "South Korea's ex-President gets 30 years in jail",
            eli5: "Imagine if the captain of a ship secretly sent spy-drones over an enemy island to start a fight — just so he could lock down his own ship and stay in charge. That's what South Korea's President Yoon did. He used drones to create fear so he could declare martial law (like a super-lockdown of the whole country). The courts said: that's cheating, and sentenced him to 30 years in prison.",
            whyItMatters: "It shows even the most powerful person in a country must follow the rules.",
            mnemonic: "YOON + DRONE = JAIL ZONE 🚁➡️🔒"
          },
          {
            headline: "FIFA World Cup 2026 has kicked off in Mexico!",
            eli5: "The world's biggest sports party has started! 48 countries are playing football across Mexico, USA, and Canada. Mexico City's main square — the Zócalo — was packed with fans dancing and singing. It's like the whole planet threw a street party at the same time. But one Somali referee who was supposed to make history was sadly blocked from entering the USA.",
            whyItMatters: "The World Cup brings billions of people together — and also reveals which countries open their doors and which don't.",
            mnemonic: "World Cup 2026 = 3 countries, 1 ball, infinite joy ⚽🌎"
          },
          {
            headline: "Taiwan waits nervously for $14 billion in weapons from the USA",
            eli5: "Taiwan is a small island that China says belongs to it. Taiwan disagrees. The USA said it would send $14 billion worth of weapons to help Taiwan protect itself — but the approval is taking a long time. Taiwan is biting its nails wondering: will America really help us? It's like waiting for your big friend to show up while the school bully circles around.",
            whyItMatters: "This affects the balance of power in all of Asia — and could impact global trade and peace.",
            mnemonic: "Taiwan + 14B = small island, BIG question mark 🏝️❓"
          }
        ]
      },
      {
        name: "💸 What's happening with money?", color: C.mint,
        stories: [
          {
            headline: "Global markets nervous as World Cup spending boosts some economies",
            eli5: "When a huge event like the World Cup happens, money moves like water. Hotels fill up, restaurants sell out, TV ads cost more. Countries hosting games — Mexico, USA, Canada — are seeing a mini money-boost. But the rest of the world is watching interest rates and wondering if borrowing money will get more expensive soon.",
            whyItMatters: "Big events shift money in ways most people don't notice — understanding this is how smart investors get ahead.",
            mnemonic: "Big events = money rivers change direction 💰🌊"
          },
          {
            headline: "India's Nifty holds strong above 24,000 — FIIs buying again",
            eli5: "The Nifty is like a report card for India's 50 biggest companies. When it stays high, it means investors think India's businesses are healthy. Foreign investors (FIIs) — big global money funds — are buying Indian stocks again after pulling out earlier this year. Think of it like tourists coming back to a market they had left.",
            whyItMatters: "When foreign money flows into India, the rupee gets stronger and companies can grow faster.",
            mnemonic: "FII buying = foreign fans back in India's stadium 🏟️📈"
          },
          {
            headline: "Oil prices steady near $74 — OPEC holds production unchanged",
            eli5: "Oil is like the blood of the world economy — almost everything runs on it. OPEC (a club of oil-producing countries) decided not to pump more or less oil. So prices stayed calm. When oil is cheap, transportation, food, and manufacturing all get cheaper. When it's expensive, everything costs more.",
            whyItMatters: "Stable oil prices = stable prices at your local shop and petrol pump.",
            mnemonic: "OPEC = Oil Price Eating Club 🛢️😄"
          }
        ]
      },
      {
        name: "💻 What's happening with technology?", color: C.lavender,
        stories: [
          {
            headline: "Apple's AI features rolling out globally on iPhones",
            eli5: "Apple is adding a smart assistant to iPhones that can read your emails, summarise long messages, and help you write replies — all on your phone without your data going to the internet. It's like having a tiny genius living inside your phone who never tells anyone your secrets.",
            whyItMatters: "When AI runs privately on your device, it changes who controls your data — and that's a big deal for privacy.",
            mnemonic: "Apple AI = Genius in your pocket, secrets stay locked 🍎🔐"
          },
          {
            headline: "OpenAI releases new model that can reason like a scientist",
            eli5: "OpenAI's newest AI doesn't just answer questions — it thinks step by step, checks its own work, and changes its mind when it finds a mistake. It's like the difference between a student who copies answers and one who actually understands and solves the problem from scratch.",
            whyItMatters: "AI that reasons means it can help doctors, engineers, and researchers solve harder problems faster.",
            mnemonic: "New AI = Thinks, Checks, Fixes — like a scientist 🔬🤖"
          },
          {
            headline: "Elon Musk's xAI launches Grok 3 with real-time internet access",
            eli5: "Grok 3 is a chatbot that can browse the internet live while talking to you. Most chatbots only know things from when they were trained. Grok can look things up right now — like having a friend who googles things for you while you're having a conversation.",
            whyItMatters: "Real-time AI changes how people will search for information — Google's biggest threat yet.",
            mnemonic: "Grok = Google + Chatbot had a baby 👶🌐"
          }
        ]
      },
      {
        name: "🌿 What's happening with our planet?", color: C.peach,
        stories: [
          {
            headline: "Record heat hits parts of Europe and South Asia in June",
            eli5: "Parts of Europe and South Asia recorded their hottest June temperatures ever. Imagine your room getting hotter every year, and your air conditioner can barely keep up. That's what's happening to Earth. Scientists say this is exactly what they warned about when they talked about climate change.",
            whyItMatters: "Heat records breaking every year means crop failures, water shortages, and health risks are becoming normal — not rare.",
            mnemonic: "Record heat = Earth's fever going up every year 🌡️🔥"
          },
          {
            headline: "Amazon rainforest deforestation drops 45% in Brazil — a rare win",
            eli5: "The Amazon is like Earth's lungs — it breathes in carbon dioxide and breathes out oxygen. Brazil's new government put strict rules against cutting trees. The result? 45% less forest was destroyed this year compared to last. It's like a patient who quit smoking and their lungs started healing.",
            whyItMatters: "The Amazon absorbs huge amounts of CO₂. Saving it slows down global warming for everyone on Earth.",
            mnemonic: "Amazon protected = Earth's lungs healing 🫁🌳"
          },
          {
            headline: "Ocean plastic: scientists find new bacteria that eats plastic",
            eli5: "Scientists discovered bacteria in the ocean that actually eat plastic — they break it down like food. It's still early research, but imagine tiny invisible cleaners eating up all the plastic bags and bottles in the sea. Nature found a way — now humans need to help it scale up.",
            whyItMatters: "Plastic pollution kills marine life and enters our food chain. Natural solutions like this could be a game-changer.",
            mnemonic: "Plastic-eating bacteria = tiny ocean janitors 🦠🌊"
          }
        ]
      }
    ],
    quiz: [
      { q: "Why was South Korea's President Yoon sent to prison?", options: ["He stole money from the government", "He used drones and declared martial law to stay in power", "He started a war with North Korea", "He refused to hold elections"], answer: 1, funFact: "Martial law means the military takes control — it's usually only used in war. Using it to stay in power is considered a betrayal of democracy." },
      { q: "What is the Nifty 50?", options: ["50 richest people in India", "A report card for India's 50 biggest companies", "India's 50 top cricket players", "50 best Indian startups"], answer: 1, funFact: "The Nifty 50 was launched in 1996. It's calculated every second the market is open — over 6 hours a day!" },
      { q: "What makes Grok 3 different from most AI chatbots?", options: ["It speaks 100 languages", "It can draw pictures", "It can browse the internet in real time", "It runs on solar power"], answer: 2, funFact: "Most AI models have a 'knowledge cutoff' — they don't know anything after a certain date. Real-time internet access changes everything." }
    ]
  },

  markets: {
    globalPulse: {
      eli5: "Think of the world's money as a big river. Right now the river is flowing calmly — not too fast, not too slow. The US dollar is strong, oil prices are steady, and stock markets in most countries are not crashing. But investors are watching carefully because interest rates are still high, which means borrowing money is expensive — like a toll booth on the money river.",
      keyThings: ["S&P 500 near all-time highs", "USD strong vs most currencies", "Crude oil ~$74/barrel — stable", "India Nifty above 24,000"]
    },
    indianMarket: {
      eli5: "India's stock market is like a giant bazaar. Right now the bazaar is busy and buzzing — shoppers (investors) are back after a quiet phase. Big foreign funds are buying Indian stocks again, especially in banking, IT, and infrastructure. The mood is cautiously excited — like the first day of Diwali shopping.",
      breakouts: [
        { name: "IRFC (Indian Railway Finance Corp)", whyExciting: "India is spending lakhs of crores on railways. IRFC funds all of it — like the bank for Indian Railways. Every new train, track, or station means more business for IRFC. The stock has strong momentum and government backing.", risk: "If government spending on railways slows down, IRFC growth slows too." },
        { name: "Dixon Technologies", whyExciting: "Dixon makes electronics — phones, TVs, washing machines — for big brands in India. As global companies move manufacturing away from China to India, Dixon wins big contracts. It's riding India's 'Make in India' wave perfectly.", risk: "Highly dependent on a few big clients — losing one big client could hurt badly." },
        { name: "Zomato (Eternal Ltd)", whyExciting: "Zomato is not just food delivery anymore — it's building a quick-commerce empire with Blinkit. Delivering groceries in 10 minutes across India is a massive business. The stock has recovered strongly and the company turned profitable.", risk: "Intense competition from Swiggy and Zepto — price wars can eat into profits." }
      ],
      ipoSpot: { name: "Ather Energy IPO (EV Scooters)", verdict: "Watch", eli5: "Ather makes premium electric scooters and is growing fast. But the EV market in India is still young and competitive. Apply only if you believe in India's EV future — this is a long-term bet, not a quick flip." },
      lessonOfDay: { title: "The Rule of 72", story: "Want to know how fast your money doubles? Just divide 72 by the interest rate. Money in a fixed deposit at 7%? 72 ÷ 7 = about 10 years to double. Money growing at 12% in stocks? 72 ÷ 12 = 6 years to double. This tiny math trick was used by bankers in the 1400s and still works perfectly today.", mnemonic: "72 ÷ rate = years to double. 'Seventy-Two Saves You Time' ⏱️" }
    },
    quiz: [
      { q: "What does IRFC actually do?", options: ["Builds railway stations", "Finances (funds) Indian Railways projects", "Sells train tickets", "Makes railway engines"], answer: 1, funFact: "IRFC borrows money cheaply from markets and lends it to Indian Railways. It's essentially a money pipeline for the entire railway system." },
      { q: "Using the Rule of 72, if your money grows at 9% per year, how many years to double?", options: ["5 years", "8 years", "10 years", "12 years"], answer: 1, funFact: "72 ÷ 9 = 8 years. Einstein reportedly called compound interest the 8th wonder of the world." },
      { q: "What is Blinkit (owned by Zomato)?", options: ["A movie streaming app", "A 10-minute grocery delivery service", "A banking app", "An electric vehicle brand"], answer: 1, funFact: "Blinkit stores are called 'dark stores' — mini warehouses near you with no customers inside, only delivery workers packing orders at lightning speed." }
    ]
  },

  psychology: {
    mindTrick: {
      name: "The Confirmation Bias",
      eli5: "Your brain is secretly lazy. It already has opinions — and instead of changing them, it looks for proof that it was right all along. If you believe Mondays are bad, you notice every bad thing on Monday and ignore the good stuff. Scientists call this Confirmation Bias — your brain is its own biggest fan. It's like wearing tinted glasses and never realising the world is actually full colour.",
      realLife: "You see this every day — people only read news that matches their political views, investors only hear good news about stocks they already own. Once you know this bias exists, you can fight it by actively searching for the opposite view.",
      mnemonic: "Confirmation Bias = Your brain is a YES-MAN who hates being wrong 🙈"
    },
    bodyLanguage: {
      signal: "The Steeple Hand Gesture",
      eli5: "When someone touches their fingertips together like a church steeple (fingers pointing up, palms apart), they are quietly signalling confidence and control. Presidents, CEOs, and lawyers use this all the time during negotiations. It says 'I am calm, I know what I'm talking about, and I'm not threatened by you' — without saying a single word.",
      howToUse: "Use the steeple when you're making a point in a meeting or presenting an idea. It makes you look certain even when you feel nervous inside.",
      mnemonic: "Steeple hands = Church of Confidence ⛪👐"
    },
    superpower: {
      name: "Social Proof",
      story: "A restaurant put a sign: 'Our most ordered dish: Butter Chicken.' Sales of that dish jumped 30% — not because the recipe changed, but because people assumed that if everyone orders it, it must be great. This is Social Proof — humans are wired to copy the crowd when they're unsure. It's why 5-star reviews work, why queues make places look popular, and why influencers get paid millions.",
      shield: "When you see 'bestseller', 'most popular', or '10,000 reviews' — pause. Ask: am I choosing this because it's actually good for me, or just because others chose it?",
      mnemonic: "Social Proof = Monkey see, Monkey buy 🐒🛒"
    },
    quiz: [
      { q: "What is Confirmation Bias?", options: ["Believing everything you read online", "Your brain seeking proof that it was already right", "Being extra careful before making decisions", "Changing your mind too quickly"], answer: 1, funFact: "Studies show people spend 36% more time reading articles that agree with their existing beliefs than those that challenge them." },
      { q: "What does the steeple hand gesture communicate?", options: ["Nervousness and uncertainty", "Boredom and disinterest", "Confidence and control", "Anger and aggression"], answer: 2, funFact: "Barack Obama and Angela Merkel were both famous for using the steeple gesture in press conferences." },
      { q: "Social Proof works because humans are wired to...", options: ["Always be original", "Copy the crowd when unsure", "Distrust popular things", "Prefer rare items"], answer: 1, funFact: "Social proof is so powerful that people will stand on a street and look up at the sky — and within minutes, strangers join them just because others are doing it." }
    ]
  },

  leadership: {
    leaderMove: {
      name: "Extreme Ownership",
      story: "Jocko Willink was a US Navy SEAL commander. In a battle in Iraq, his team accidentally fired on allied soldiers — a terrible mistake. Instead of blaming his men, Jocko stood up and said: 'It was my fault. I am responsible.' His commanders were stunned. But his team's loyalty to him became unbreakable. Leaders who own their failures inspire others to do the same. A team that never hides mistakes becomes unstoppable.",
      doThis: "Next time something goes wrong — at work, at home, anywhere — resist blaming others. Say 'What could I have done differently?' out loud. Do it once a day for 7 days.",
      mnemonic: "Extreme Ownership = The buck ALWAYS stops with me 🪣"
    },
    visionarySecret: {
      concept: "Second-Order Thinking",
      eli5: "Most people think one step ahead. Visionaries think two or three. When everyone panics and sells stocks during a crash, Warren Buffett buys. Why? Because he asks: 'And then what happens after that?' First order: market crashes → sell. Second order: prices get cheap → smart money buys → market recovers → patient buyers win. It's like playing chess while others play checkers.",
      exercise: "Pick any decision you're facing today. Write down what happens first. Then ask 'and then what?' two more times. You'll see options others miss.",
      mnemonic: "Second-order thinking = Ask 'And then what?' like a 3-year-old 🧒"
    },
    eliteHabit: {
      habit: "The 5-Hour Rule — Deliberate Learning",
      whoAndHow: "Bill Gates, Warren Buffett, Barack Obama and Elon Musk all protect at least 1 hour a day (5 hours per week) purely for reading and learning — not emails, not meetings. Gates reads 50 books a year. Buffett spends 80% of his day reading.",
      whyItWorks: "Your brain is a muscle. Elite performers treat knowledge like compound interest — a little every day becomes a massive advantage over years. The world rewards people who know more and think better.",
      mnemonic: "5-Hour Rule = 1 hour/day keeps ignorance away 📚"
    },
    sigmaWisdom: {
      lesson: "Memento Mori — Remember You Will Die",
      story: "Ancient Roman generals, when given a victory parade, would have a servant whisper in their ear: 'Memento Mori' — remember, you will die. Not to be dark. But to remind them: don't get arrogant, don't waste today, the clock is always running. Marcus Aurelius wrote in his private journal every day about death — not out of fear, but to stay humble, focused, and intentional.",
      action: "Every morning, before checking your phone, say this: 'I have one less day than yesterday. What matters most today?' Then do that first.",
      mnemonic: "Memento Mori = Death is your best time manager ⏳"
    },
    quiz: [
      { q: "Extreme Ownership means...", options: ["Taking credit for everything that goes right", "Blaming others when things go wrong", "Taking full responsibility for everything — including failures", "Owning a business"], answer: 2, funFact: "Jocko Willink wrote a book called 'Extreme Ownership' that became required reading in many top business schools." },
      { q: "Second-order thinking asks...", options: ["What happened before this?", "Who is responsible?", "And then what happens after that?", "What is the cheapest option?"], answer: 2, funFact: "Warren Buffett said: 'Someone is sitting in the shade today because someone planted a tree long ago.' That's second-order thinking in one sentence." },
      { q: "What did Roman generals use Memento Mori for?", options: ["To scare enemies", "To stay humble and focused despite success", "To mourn fallen soldiers", "To plan funerals"], answer: 1, funFact: "Marcus Aurelius wrote his famous book 'Meditations' as a private journal — never meant to be published. It's now one of the most read leadership books in the world." }
    ]
  },

  wealth: {
    wealthSecret: {
      name: "Pay Yourself First",
      story: "Most people earn money, pay all their bills and expenses, and save whatever is left. The problem? Nothing is ever left. Rich people flip this completely. The moment money arrives, they take a fixed percentage — 20%, 30%, whatever they decided — and save or invest it first. Then they live on what remains. It's like filling your car's fuel tank before giving lifts to everyone else. If you give lifts first, you run out of fuel.",
      action: "Open a separate bank account today. The moment your salary arrives, transfer 20% into it automatically. Treat it like a bill you must pay yourself.",
      mnemonic: "Pay Yourself First = Fuel your own tank before driving others 🚗⛽"
    },
    moneyMachine: {
      type: "Index Fund Investing (SIP)",
      eli5: "An index fund is like buying a tiny piece of every big company in India at once. Instead of betting on one company, you bet on India's entire economy growing. A SIP (Systematic Investment Plan) means you put in a fixed amount every month — ₹1,000, ₹5,000, whatever — automatically. Over time, your money grows like a tree you water every month without thinking.",
      indiaAngle: "In India, Nifty 50 Index Funds from Zerodha Coin or Groww have returned 12-14% annually over 20 years. ₹5,000/month for 20 years = approximately ₹50 lakhs to ₹1 crore depending on growth.",
      mnemonic: "SIP = Slow Income Plant — water monthly, harvest big 🌱"
    },
    mindsetFlip: {
      oldThinking: "Save money by cutting small expenses — skip the coffee, avoid eating out",
      newThinking: "Grow income aggressively and invest the difference — focus on the big numbers",
      why: "Skipping your daily coffee saves ₹3,000 a year. One skill upgrade that raises your salary by ₹50,000 a year is worth 16x more. The wealthy obsess over increasing income and returns — not counting rupees on small habits.",
      mnemonic: "Don't watch the pennies — watch the hundreds 💯"
    },
    magicNumber: {
      number: "The 4% Rule",
      eli5: "This is the secret to financial freedom. If you have saved 25x your annual expenses — you can retire. You withdraw 4% of your savings per year and historically, your investments grow fast enough to replace that money forever. Example: If you spend ₹6 lakhs a year, you need ₹1.5 crore saved. Then you never need to work again (if you choose not to).",
      mnemonic: "4% Rule = Save 25x your expenses → Free forever 🗝️"
    },
    quiz: [
      { q: "What does 'Pay Yourself First' mean?", options: ["Buy yourself gifts before bills", "Save/invest before spending on anything else", "Pay your salary in advance", "Never share money with others"], answer: 1, funFact: "George Clason wrote about this concept in 'The Richest Man in Babylon' in 1926 — and it's still the most powerful wealth habit ever described." },
      { q: "What is a SIP?", options: ["A savings interest plan", "Investing a fixed amount automatically every month", "A type of bank loan", "Stock investment premium"], answer: 1, funFact: "SIPs use 'rupee cost averaging' — you automatically buy more units when prices are low and fewer when high. This means market crashes actually help your long-term SIP." },
      { q: "Using the 4% Rule, if you spend ₹8 lakhs per year, how much do you need to retire?", options: ["₹80 lakhs", "₹1 crore", "₹2 crores", "₹5 crores"], answer: 2, funFact: "₹8 lakhs × 25 = ₹2 crores. The 4% Rule was developed by financial planner William Bengen in 1994 after studying 75 years of market data." }
    ]
  },

  communication: {
    speakingSkill: {
      name: "The Rhetorical Triangle — Ethos, Pathos, Logos",
      story: "Aristotle, 2,400 years ago, figured out why some people can walk into a room and change minds — while others talk for hours and no one listens. He said every powerful speech needs three things: Ethos (why should they trust you?), Pathos (do they feel something?), Logos (does your logic make sense?). Steve Jobs used all three every time he spoke. 'This changes everything' — that's pathos. Showing the product working — logos. His history of building Apple — ethos.",
      drill: "Next time you want to convince someone of anything — write three sentences: one that builds your credibility, one that connects emotionally, one that gives logical proof. Say all three.",
      mnemonic: "Ethos + Pathos + Logos = EPL — The Premier League of Persuasion ⚽🎤"
    },
    negotiationMove: {
      tactic: "The Mirroring Technique",
      eli5: "FBI negotiator Chris Voss discovered that simply repeating the last 3 words someone said — as a question — makes them keep talking, feel heard, and reveal more information. It's like holding up a mirror to their words. No arguing, no rebutting, just reflecting back.",
      script: "They say: 'We can't do this deal right now.' You say softly: '...Can't do it?' Then stay silent. They will fill the silence and explain themselves.",
      mnemonic: "Mirror = Repeat last 3 words + silence = they talk more 🪞"
    },
    officeWin: {
      rule: "Reply to messages within 24 hours — always",
      story: "Person A gets an email from a senior manager and replies in 4 minutes with a clear answer. Person B sees the same email, thinks 'I'll do it later,' and replies in 3 days. Who gets promoted? Responsiveness signals reliability. In an office, being easy to work with is worth more than being the smartest person in the room.",
      mistake: "Most people prioritise tasks they feel like doing over tasks that make others see them as reliable.",
      mnemonic: "Fast replies = Trustworthy reputation, slow replies = forgotten ⚡📧"
    },
    confidenceHack: {
      technique: "Power Posing for 2 Minutes",
      science: "Harvard psychologist Amy Cuddy found that standing in a powerful pose — chest open, hands on hips, chin slightly up — for just 2 minutes raises testosterone (confidence chemical) and lowers cortisol (stress chemical) in your body. Your body changes your mind before your mind changes your body.",
      doItNow: "Before any important meeting, presentation, or interview: go to a bathroom or private space. Stand with hands on hips, chest open, chin up for exactly 2 minutes. Walk in feeling different.",
      mnemonic: "2 minutes of Power Pose = Superman mode activated 🦸"
    },
    quiz: [
      { q: "What are the three parts of Aristotle's Rhetorical Triangle?", options: ["Logic, Emotion, Volume", "Ethos, Pathos, Logos", "Facts, Stories, Questions", "Speed, Clarity, Confidence"], answer: 1, funFact: "Aristotle wrote 'Rhetoric' in 350 BC. It is still taught in law schools, business schools, and speech programmes worldwide today." },
      { q: "In the Mirroring technique, what do you repeat?", options: ["The first word they said", "Everything they said", "The last 3 words as a question", "Only facts and numbers"], answer: 2, funFact: "Chris Voss used mirroring to negotiate hostage releases with international criminals. The same technique works just as well in salary negotiations." },
      { q: "Power Posing for 2 minutes changes which chemicals in your body?", options: ["Serotonin and dopamine", "Testosterone and cortisol", "Adrenaline and insulin", "Melatonin and oxytocin"], answer: 1, funFact: "Amy Cuddy's TED talk on Power Posing is one of the 5 most-watched TED talks in history with over 60 million views." }
    ]
  },

  mind: {
    brainHack: {
      name: "The 5-Second Rule",
      eli5: "Your brain has an alarm system. The moment you think of doing something hard — exercise, making a difficult call, starting work — your brain fires a tiny panic signal and distracts you. Mel Robbins discovered if you count backwards from 5 (5-4-3-2-1) and physically move your body at '1', you interrupt that alarm before it stops you. It's like launching a rocket — once ignition fires, it goes.",
      protocol: "Whenever you feel the urge to delay something important: count 5-4-3-2-1 out loud or in your head, and physically move — stand up, open the app, pick up the phone — the moment you hit 1. Do not pause. Movement is the activation key.",
      mnemonic: "5-4-3-2-1 GO = Rocket launch your brain 🚀"
    },
    disciplineCode: {
      principle: "Eat the Frog First",
      story: "Mark Twain once said: if you eat a live frog first thing in the morning, nothing worse can happen to you for the rest of the day. Brian Tracy turned this into a productivity philosophy: your most difficult, most important task is the frog. Do it first, before email, before social media, before anything else. Every Navy SEAL, elite athlete, and top CEO versions of this — protect the first hours for the hardest work.",
      todayAction: "Write down the ONE task you've been avoiding most. Set your alarm 30 minutes earlier tomorrow. Do only that task first thing. Nothing else until it's done.",
      mnemonic: "Eat the Frog = Hard thing first, easy day after 🐸"
    },
    impulseKiller: {
      urge: "Phone scrolling / distraction addiction",
      eli5: "Your phone is designed by hundreds of engineers to be as addictive as a slot machine. Every scroll, every notification is a tiny dopamine hit — a small reward that makes you want more. Your brain starts craving it like sugar. The 'monster' in your head says 'just one more scroll' and hours disappear.",
      interrupt: "The moment you feel the urge to pick up your phone for no reason: put it face-down, take 3 slow deep breaths, and ask 'What was I supposed to be doing?' This 20-second interrupt breaks the automatic loop. Also: keep your phone in a different room while working.",
      mnemonic: "Phone urge interrupt = Flip. Breathe. Refocus. 📱🔄"
    },
    bodyUpgrade: {
      practice: "Cold Exposure (Cold Shower)",
      eli5: "When you step into cold water, your body releases a huge surge of norepinephrine — up to 300% more than normal. This is the chemical responsible for focus, energy, and mood. Dr. Andrew Huberman at Stanford calls it the most powerful non-pharmaceutical mood booster available to anyone for free.",
      minimumDose: "Just 30 seconds of cold water at the end of your regular shower, every morning. That's it.",
      mnemonic: "Cold shower = Free brain upgrade, costs only discomfort 🥶⚡"
    },
    quiz: [
      { q: "What does the 5-Second Rule do to your brain?", options: ["Makes you think harder", "Interrupts the panic alarm before it stops you acting", "Slows down decision making", "Improves memory"], answer: 1, funFact: "Mel Robbins developed the 5-Second Rule to stop herself from not getting out of bed. It became a book that sold over 3 million copies." },
      { q: "What is 'Eating the Frog'?", options: ["Eating an unusual breakfast for energy", "Doing your hardest task first thing in the morning", "Facing your biggest fear once a week", "Skipping meals to improve focus"], answer: 1, funFact: "Brian Tracy's book 'Eat That Frog!' has been translated into 42 languages. The concept is older — attributed to Mark Twain from the 1800s." },
      { q: "Cold exposure increases which brain chemical by up to 300%?", options: ["Serotonin", "Melatonin", "Norepinephrine", "Dopamine"], answer: 2, funFact: "Norepinephrine is used in anti-depressant medications. A cold shower gives you a natural surge of it — and the effect lasts hours." }
    ]
  },

  knowledge: {
    mathMagic: {
      concept: "Compound Interest (The 8th Wonder)",
      eli5: "Imagine you have a magic snowball at the top of a hill. As it rolls down, it picks up more snow. The bigger it gets, the more snow it picks up — faster and faster. That's compound interest. You earn money on your money. Then you earn money on THAT money. A small snowball with enough hill becomes an avalanche. ₹10,000 at 12% per year becomes ₹96,000 in 20 years — without adding a single rupee more.",
      realWorldUse: "Every SIP, every FD, every stock investment runs on this principle. The key secret: time is the hill. Start early, and even small amounts become enormous. Start late, and even large amounts struggle to catch up.",
      mnemonic: "Compound Interest = Snowball on a hill — starts small, becomes unstoppable ☃️"
    },
    scienceWow: {
      field: "Astronomy",
      concept: "The Observable Universe",
      eli5: "Look up at the night sky. Every star you see is just in our galaxy — the Milky Way. But there are over 2 trillion galaxies in the observable universe. The word 'observable' is key — it's just the part of the universe whose light has had time to reach us in 13.8 billion years. The actual universe could be infinitely larger. You are one human, on one planet, in one solar system, in one galaxy, among 2 trillion others. And yet — here you are, aware of all of it.",
      mindBlow: "If you shrank the entire observable universe to the size of Earth, the Milky Way would be smaller than a single atom. The scale is so large it literally breaks normal human intuition.",
      mnemonic: "2 Trillion galaxies = You are small AND significant 🌌"
    },
    historyStory: {
      event: "The Mongol Empire — Genghis Khan's Management System",
      story: "Genghis Khan built the largest land empire in history — not just by fighting, but by being the greatest talent manager of the medieval world. He promoted generals based on merit, not family. He gave conquered engineers, doctors, and scholars important jobs in his empire. He created the first international postal system (Yam) across 12,000 km. He allowed religious freedom across all conquered lands. He was brutal in war — but brilliant in governance.",
      lesson: "The most powerful organisations in history weren't just the strongest — they were the ones that attracted, kept, and promoted the best talent. Hire for skill, not loyalty. That lesson still applies in every company today.",
      mnemonic: "Genghis Khan = The original meritocracy CEO 🏇"
    },
    earthSecret: {
      place: "Singapore",
      secret: "Singapore has no natural resources — no oil, no minerals, barely any land, almost no fresh water. It imports most of its water from Malaysia and even recycles toilet water into drinking water (called NEWater). In 1965 when it became independent, it was poorer than most of Africa. Today it has one of the highest GDPs per capita in the world. Its only resource was human brains.",
      edge: "Singapore proves that a country (or a person) with zero natural advantages can become elite through systems, education, discipline, and smart governance. You don't need to be born with resources — you need to be resourceful.",
      mnemonic: "Singapore = No resources + Smart systems = World-class wealth 🇸🇬"
    },
    quiz: [
      { q: "Compound interest is like a snowball because...", options: ["It's cold and hard", "It gets bigger faster the bigger it already is", "It melts over time", "It only works downhill"], answer: 1, funFact: "Warren Buffett made 97% of his entire wealth after the age of 65 — purely because compound interest had 50+ years to work on his early investments." },
      { q: "How many galaxies are in the observable universe?", options: ["1 million", "1 billion", "200 billion", "2 trillion"], answer: 3, funFact: "Scientists upgraded the galaxy count from 200 billion to 2 trillion in 2016 using the Hubble Space Telescope's deep field images." },
      { q: "What made Genghis Khan's empire so successful besides military power?", options: ["He had the most soldiers", "He promoted talent on merit and welcomed skilled people from conquered lands", "He taxed everyone heavily", "He refused to share power with anyone"], answer: 1, funFact: "The Mongol Empire's postal system (Yam) could deliver a message across 12,000 km in just a few days — faster than most 19th-century postal services." }
    ]
  },

  ai: {
    toolSpotlight: {
      name: "Perplexity AI",
      category: "Research",
      eli5: "Perplexity is like having a research assistant who reads the entire internet, finds the most relevant pages, and gives you a clear answer with links to where it found everything. Unlike regular Google (which shows you links and you read them yourself), Perplexity reads them for you and writes a summary. It's perfect for quickly understanding any topic — from investing to science to current news.",
      secretMove: "Use Perplexity's 'Focus' modes: switch to 'Academic' to search only peer-reviewed papers, or 'YouTube' to find video answers. For Indian market research, type your question and add 'India context' at the end — you get far more relevant results than Google.",
      mnemonic: "Perplexity = Google + Reading + Summary, all in one 🔍📖"
    },
    workflowWin: {
      title: "The Daily Brief Summariser",
      problem: "Reading news, reports, and emails every morning takes 1-2 hours. Most of it is noise. You need the signal fast.",
      steps: [
        "Paste any long article or report into Claude or ChatGPT",
        "Type: 'Summarise this in 5 bullet points for someone who has 2 minutes. Highlight what's surprising or new.'",
        "For emails: 'What does this person actually want from me? What's the right reply?'",
        "Save your favourite prompts as text shortcuts on your phone keyboard for instant use"
      ],
      timeSaved: "Save 45-60 minutes every morning — redirected to learning or deep work.",
      mnemonic: "AI Summariser = Read 1 hour of content in 3 minutes 📰⚡"
    },
    promptOfDay: {
      purpose: "Turn any confusing topic into a simple explanation you actually understand",
      prompt: "Explain [TOPIC] to me like I am a curious 12-year-old who loves stories and examples. Use an analogy from everyday life. Then give me the 3 most important things I should remember about it. Then give me 1 question I should ask to go deeper.",
      where: "Claude, ChatGPT, or Gemini",
      mnemonic: "The 12-year-old prompt = Never be confused by anything again 🧒💡"
    },
    futureWatch: {
      trend: "AI Agents — AI that does tasks, not just answers questions",
      eli5: "Right now, AI chatbots are like very smart advisors — you ask, they answer. AI Agents are different. They take action on your behalf. They can browse the web, write and send emails, book meetings, run code, and complete multi-step tasks — all on their own. It's the difference between asking a friend for directions and giving them your car keys.",
      yourMove: "Start learning how to use tools like Claude's computer use, AutoGPT, or Microsoft Copilot Actions now. The people who know how to direct AI agents will be 10x more productive than those who don't within 2 years.",
      mnemonic: "AI Agents = AI goes from talking to DOING 🤖➡️⚡"
    },
    quiz: [
      { q: "What makes Perplexity AI different from Google?", options: ["It has more websites indexed", "It reads pages for you and gives a summarised answer with sources", "It has a better design", "It only works for science topics"], answer: 1, funFact: "Perplexity was founded in 2022 and reached 10 million users in its first year. It now handles over 100 million queries per month." },
      { q: "What is an AI Agent?", options: ["An AI that only answers questions", "An AI that takes action and completes multi-step tasks on your behalf", "A human who helps train AI", "A type of robot"], answer: 1, funFact: "In 2025, companies started reporting that AI Agents reduced administrative work by 40-60% — the biggest productivity shift since email was invented." },
      { q: "What should you add to the end of the 12-year-old prompt to go deeper?", options: ["More examples please", "The 1 question I should ask to go deeper", "Give me a quiz", "Translate this to simple English"], answer: 1, funFact: "The 'Feynman Technique' of learning says: if you can't explain something simply, you don't understand it yet. The 12-year-old prompt forces AI to use this method." }
    ]
  },

  travel: {
    destination: {
      country: "Japan",
      region: "Kyoto & Osaka",
      eli5: "Imagine a place where ancient temples sit next to bullet trains, where a bowl of noodles can cost ₹200 but feel like the best meal of your life, where vending machines sell hot coffee and cold beer on the same street corner, and where everyone around you is unfailingly polite. Kyoto is Japan's soul — 2,000 temples, bamboo forests, geisha districts. Osaka is its stomach — food markets, street snacks, loud laughter. Together they are unlike anywhere else on Earth.",
      bestTime: "March-April (cherry blossoms) or October-November (autumn leaves) — both are visually surreal and the weather is perfect.",
      hiddenGem: "Fushimi Inari shrine in Kyoto has 10,000 orange torii gates winding up a mountain. Most tourists walk 20 minutes and turn back. Walk 90 minutes to the top — the crowds vanish completely and you have ancient Japan entirely to yourself.",
      mnemonic: "Kyoto = Culture, Osaka = Food, Japan = Respect everything 🇯🇵"
    },
    visaTip: {
      focus: "Japan Visa for Indian Passport Holders",
      eli5: "Japan requires a tourist visa for Indians — but it's very straightforward if you have a clean travel history. You apply at the Japan Consulate or through an authorised travel agent. You need: confirmed hotel bookings, return flight tickets, bank statements showing sufficient funds (generally ₹1.5-2 lakhs), and your last 3 months' salary slips or ITR. Processing takes 5-7 working days.",
      goldenTip: "If you have a valid US, UK, Schengen, or Australian visa with travel history, Japan almost always approves your visa faster and with less scrutiny. Show prior international travel whenever possible.",
      mnemonic: "Japan Visa = Clean documents + Past travel = Smooth approval ✈️📋"
    },
    culturalCode: {
      culture: "Japan",
      doThis: "Bow when greeting — even a small nod works. Remove your shoes when entering homes and many traditional restaurants (look for a raised floor at the entrance). Say 'itadakimasu' before eating — it means 'I humbly receive' and locals love it when foreigners know this.",
      neverDoThis: "Never tip in Japan — it is considered rude, as if you're saying the staff doesn't earn enough or needs charity. Also never eat or drink while walking on the street — Japanese people eat only when seated. And never talk loudly on the phone on trains — keep calls to an absolute whisper.",
      mnemonic: "Japan rule: Bow + No tip + No walking food = Respect unlocked 🙇"
    },
    quiz: [
      { q: "What is the best-kept secret about Fushimi Inari shrine?", options: ["It's free to enter", "If you walk 90 minutes to the top, the crowds disappear", "It has the world's best ramen inside", "It's only open at night"], answer: 1, funFact: "Fushimi Inari's 10,000 torii gates were each donated by Japanese businesses. The names of the donors are written on the back of each gate." },
      { q: "Is tipping in Japan polite or rude?", options: ["Polite — always tip 10%", "Rude — considered offensive", "Only tip at expensive restaurants", "Only tip taxi drivers"], answer: 1, funFact: "In Japan, excellent service is considered a matter of personal and professional pride — not something you pay extra for. Tipping can actually make staff uncomfortable." },
      { q: "What prior visa history helps Indian travellers get Japan visa faster?", options: ["South Asian visas", "Valid US, UK, Schengen or Australian visa with travel history", "SAARC country visas", "No prior travel needed"], answer: 1, funFact: "Japan introduced a special 'trusted traveller' fast-track process for Indians with strong US/Schengen visa history in 2023, cutting processing time from 10 days to 3." }
    ]
  }
}

const d260614 = {
  "news": {
    "segments": [
      {
        "name": "🌐 What's happening with countries?",
        "color": "#a0d4f5",
        "stories": [
          {
            "headline": "Iran and Saudi Arabia Reach Historic Peace Agreement",
            "eli5": "Imagine two neighbors who have been fighting for years finally shaking hands and promising to get along. That's what Iran and Saudi Arabia did by signing a peace treaty. This opens up chances for them to work together and help each other economically.",
            "whyItMatters": "This peace can create stability in the Middle East, affecting global oil prices and trade.",
            "mnemonic": "Think of 'Peaceful Neighbors' to remember Iran and Saudi Arabia's handshake."
          },
          {
            "headline": "U.S. President Johnson Announces New Sanctions on Russia",
            "eli5": "It's like when a teacher punishes a student for bad behavior. President Johnson is punishing Russia with new sanctions because of cyberattacks. This makes it tougher for Russia to do business with the U.S.",
            "whyItMatters": "These sanctions can impact the global economy and everyday prices for consumers.",
            "mnemonic": "Think 'Johnson's Punishment' for the sanctions on Russia."
          },
          {
            "headline": "China Hosts ASEAN Summit Amid Regional Tensions",
            "eli5": "Imagine a big family meeting where everyone discusses their problems and plans. China hosted Southeast Asian countries to talk about trade and sea disputes. It's like trying to keep peace in a crowded playground.",
            "whyItMatters": "These discussions can lead to better trade deals and less conflict in the region.",
            "mnemonic": "Remember 'China's Family Meeting' for the ASEAN summit."
          }
        ]
      },
      {
        "name": "💸 What's happening with money?",
        "color": "#a8edcb",
        "stories": [
          {
            "headline": "Global Inflation Rates Hit 4.5% Amid Energy Crisis",
            "eli5": "Think of inflation like a balloon that keeps getting bigger. As energy prices rise due to the Iran war, the balloon of costs is inflating to 4.5%. This means everything from groceries to gas is getting more expensive.",
            "whyItMatters": "Higher inflation affects how much money you need for everyday purchases.",
            "mnemonic": "Picture a 'Balloon of Expenses' to remember inflation."
          },
          {
            "headline": "U.S. GDP Growth Forecasted at 2.1% for 2026",
            "eli5": "Imagine a garden that's still growing flowers despite a drought. The U.S. economy is like that garden, expected to grow by 2.1% in 2026 due to strong energy production and tech investments.",
            "whyItMatters": "This growth can create jobs and improve living standards.",
            "mnemonic": "Think of the 'Growing Garden' for U.S. economic growth."
          },
          {
            "headline": "Sensex Closes 790 Points Higher, Nifty Up 277",
            "eli5": "It's like a sports team that suddenly scores a lot of points after a tough game. The Indian stock market soared on June 14, with Sensex and Nifty both rising significantly. Investors felt optimistic again.",
            "whyItMatters": "A rising stock market can boost investor confidence and encourage spending.",
            "mnemonic": "Remember 'Winning Streak' to recall the market surge."
          }
        ]
      },
      {
        "name": "💻 What's happening with technology?",
        "color": "#c9b8f5",
        "stories": [
          {
            "headline": "Global Tech Firms Announce AI-Powered Energy Solutions",
            "eli5": "Picture a smart robot that helps you save energy at home by turning off lights automatically. Major tech companies are launching AI tools to help everyone use energy more efficiently during the ongoing energy crisis.",
            "whyItMatters": "These solutions can lower bills and reduce our carbon footprint.",
            "mnemonic": "Think 'Smart Energy Robot' for AI energy solutions."
          },
          {
            "headline": "Breakthrough in Quantum Computing Achieved",
            "eli5": "Imagine a super-fast train that can take you anywhere in no time. Researchers at MIT are making strides in quantum computing that could make computers much faster and more powerful, like that train.",
            "whyItMatters": "Advancements in quantum computing could revolutionize technology and science.",
            "mnemonic": "Remember 'Super-Fast Train' for quantum computing breakthroughs."
          }
        ]
      },
      {
        "name": "🌿 What's happening with our planet?",
        "color": "#f5c6a0",
        "stories": [
          {
            "headline": "UN Reports on Accelerated Climate Change Effects",
            "eli5": "Think of the planet as a giant thermometer that's rising too quickly. The UN says climate change is speeding up, causing rising seas and more extreme weather, just like a fever getting worse.",
            "whyItMatters": "Immediate action is needed to protect our environment and future generations.",
            "mnemonic": "Picture a 'Thermometer Rising' for climate change."
          },
          {
            "headline": "Discovery of New Exoplanet in Habitable Zone",
            "eli5": "Imagine finding a new island that could support life. Astronomers discovered an Earth-sized planet in a star's habitable zone, which means it might have conditions for life, just like our planet.",
            "whyItMatters": "This discovery fuels the search for extraterrestrial life and our understanding of the universe.",
            "mnemonic": "Think 'New Island Discovery' for the exoplanet."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "What historic agreement was signed on June 14, 2026?",
        "options": [
          "Iran and Saudi Arabia Peace Treaty",
          "U.S.-Russia Trade Deal",
          "China-ASEAN Trade Agreement",
          "NATO Expansion"
        ],
        "answer": 0,
        "funFact": "This peace treaty is a significant step towards stability in the Middle East."
      },
      {
        "q": "What is the forecasted GDP growth for the U.S. in 2026?",
        "options": [
          "1.5%",
          "2.1%",
          "3.0%",
          "4.0%"
        ],
        "answer": 1,
        "funFact": "Strong domestic energy production is helping fuel this growth."
      },
      {
        "q": "What major tech advancement was reported by MIT?",
        "options": [
          "AI Energy Solutions",
          "Quantum Computing Breakthrough",
          "5G Implementation",
          "Blockchain Technology"
        ],
        "answer": 1,
        "funFact": "This breakthrough brings practical quantum applications closer to reality."
      }
    ]
  },
  "markets": {
    "globalPulse": {
      "eli5": "On June 14, 2026, global markets were like a river after heavy rain. The S&P 500 rose as investors were hopeful about new tech solutions for the energy crisis. However, the Brent Crude price surged to $90 due to fears from the Iran conflict. Gold remained steady at $1,950, acting like a buoy in turbulent waters.",
      "keyThings": [
        "S&P 500: 4,500, up 1.2%",
        "Brent Crude: $90 per barrel, up 3.5%",
        "Gold: $1,950 per ounce, no major change",
        "Nifty: 23,690, up 1.18%"
      ]
    },
    "indianMarket": {
      "eli5": "The Indian stock market felt like a bustling bazaar on June 14, 2026. It was vibrant, with traders excited about Tata Motors and Bharti Airtel leading the charge, much like popular stalls attracting crowds. The market showed strong signs of recovery after previous losses.",
      "breakouts": [
        {
          "name": "NSE:TATAMOTORS  -  Tata Motors",
          "whyExciting": "Tata Motors saw a significant boost due to rising demand for electric vehicles. Their new model launch captured investors' attention.",
          "risk": "However, competition in the EV market is fierce."
        },
        {
          "name": "NSE:BHARTIARTL  -  Bharti Airtel",
          "whyExciting": "Bharti Airtel's stock jumped as they announced a partnership with a global tech firm for 5G expansion. This could enhance their market position.",
          "risk": "The risk lies in ongoing regulatory challenges in the telecom sector."
        },
        {
          "name": "NSE:RELIANCE  -  Reliance Industries",
          "whyExciting": "Reliance's stock rose after positive quarterly results, showcasing strong growth in their retail segment. Investors were optimistic about future earnings.",
          "risk": "Fluctuations in oil prices could impact their overall performance."
        }
      ],
      "ipoSpot": {
        "name": "None this week",
        "verdict": "Watch",
        "eli5": "No new IPOs are coming up right now, but keep an eye out for future opportunities. The market is buzzing with potential."
      },
      "lessonOfDay": {
        "title": "Understanding Market Sentiment",
        "story": "Imagine a crowd at a concert. If the lead singer performs well, the crowd goes wild, pushing ticket prices up. However, if the singer flubs a note, the mood drops, and prices fall. Market sentiment works the same way; good news can boost stocks, while bad news can drag them down.",
        "mnemonic": "CROWD - Cheerful Rising, Overwhelmed With Dismay."
      }
    },
    "quiz": [
      {
        "q": "What was the closing price of Brent Crude on June 14, 2026?",
        "options": [
          "$85",
          "$90",
          "$95",
          "$80"
        ],
        "answer": 1,
        "funFact": "Brent Crude is a major trading classification of crude oil."
      },
      {
        "q": "Which company led the market gains on June 14, 2026?",
        "options": [
          "Tata Motors",
          "Bharti Airtel",
          "Reliance",
          "Infosys"
        ],
        "answer": 0,
        "funFact": "Tata Motors is a key player in the electric vehicle market."
      },
      {
        "q": "What was the Nifty closing level on June 14, 2026?",
        "options": [
          "23,500",
          "23,690",
          "23,800",
          "23,400"
        ],
        "answer": 1,
        "funFact": "The Nifty represents the top 50 companies on the National Stock Exchange of India."
      }
    ]
  },
  "psychology": {
    "mindTrick": {
      "name": "Cognitive Dissonance",
      "eli5": "Imagine you love eating cookies but know they're bad for your health. You might tell yourself, 'Just one cookie won't hurt!' to feel better about eating it. It's like trying to fit a square peg in a round hole; your mind wants to make it work. That tension creates a funny twist in your thoughts.",
      "realLife": "This concept is everywhere! Think of how people justify binge-watching shows instead of studying.",
      "mnemonic": "Cognitive Dissonance: Cookies and Confusion!"
    },
    "bodyLanguage": {
      "signal": "Crossed Arms",
      "eli5": "Picture a superhero with crossed arms looking tough. But what if that superhero is just cold? It's like a turtle hiding in its shell, feeling scared. The crossed arms say, 'I'm not open to you!'",
      "howToUse": "Notice when someone crosses their arms; it might mean they're not on board with the conversation. Use open gestures to encourage them to relax.",
      "mnemonic": "Crossed Arms: Turtle Time!"
    },
    "superpower": {
      "name": "Social Proof",
      "story": "Think of a busy restaurant. You see a line outside and think, 'It must be good!' That's social proof in action. The crowd influences your choice without you realizing it. Later, you rave about the food, just like everyone else.",
      "shield": "To defend against it, remember that popularity doesn't always equal quality. Trust your own tastes over the crowd.",
      "mnemonic": "Social Proof: Crowd Logic!"
    },
    "quiz": [
      {
        "q": "What is the effect of cognitive dissonance?",
        "options": [
          "You feel relaxed",
          "You justify your actions",
          "You make new friends",
          "You get confused"
        ],
        "answer": 1,
        "funFact": "Even famous athletes feel cognitive dissonance when they cheat!"
      },
      {
        "q": "What does crossed arms usually indicate?",
        "options": [
          "Feeling cozy",
          "Being open",
          "Defensiveness",
          "Excitement"
        ],
        "answer": 2,
        "funFact": "Crossed arms can make you feel colder, even if it's warm!"
      },
      {
        "q": "How does social proof influence decisions?",
        "options": [
          "It makes you eat more",
          "It shows you what's popular",
          "It confuses you",
          "It helps you sleep"
        ],
        "answer": 1,
        "funFact": "People are more likely to buy a product if they see others using it!"
      }
    ]
  },
  "leadership": {
    "leaderMove": {
      "name": "Building Bridges",
      "story": "Nelson Mandela united a divided South Africa. He believed in forgiveness over revenge. His leadership healed a nation. Mandela showed that peace is powerful.",
      "doThis": "Today, reach out to someone you disagree with. Start a conversation about common ground.",
      "mnemonic": "Bridge the gap."
    },
    "visionarySecret": {
      "concept": "Future-Focused Thinking",
      "eli5": "Imagine looking through binoculars to see far away. You spot opportunities others miss. This clear vision helps you plan for success. It's like planting seeds for tomorrow's garden today.",
      "exercise": "Write down three goals for the next five years. Think about what steps you need to take to achieve them.",
      "mnemonic": "See the future."
    },
    "eliteHabit": {
      "habit": "Daily Reading",
      "whoAndHow": "Warren Buffett reads 500 pages a day. He believes knowledge compounds over time, just like interest.",
      "whyItWorks": "Reading expands your mind and gives you new perspectives. It's like filling your toolbox with diverse tools for problem-solving.",
      "mnemonic": "Read to lead."
    },
    "sigmaWisdom": {
      "lesson": "Embrace Adversity",
      "story": "The story of the lotus flower teaches us. It grows beautifully out of muddy waters. Just like that flower, we can thrive in tough conditions.",
      "action": "Today, find a challenge and tackle it head-on.",
      "mnemonic": "Bloom through mud."
    },
    "quiz": [
      {
        "q": "What historic agreement was signed on June 14, 2026?",
        "options": [
          "Iran and Saudi Arabia Peace Treaty",
          "US-China Trade Deal",
          "NATO Expansion",
          "Climate Accord"
        ],
        "answer": 0,
        "funFact": "This peace treaty ended decades of conflict between two major Middle Eastern powers."
      },
      {
        "q": "What was the main theme of the June 14 headlines?",
        "options": [
          "Sports",
          "World Politics",
          "Technology",
          "Fashion"
        ],
        "answer": 1,
        "funFact": "World politics dominated the news with significant agreements and changes."
      },
      {
        "q": "Which leader is known for daily reading habits?",
        "options": [
          "Elon Musk",
          "Warren Buffett",
          "Jeff Bezos",
          "Bill Gates"
        ],
        "answer": 1,
        "funFact": "Warren Buffett's reading habit is legendary and is a key to his success."
      }
    ]
  },
  "wealth": {
    "wealthSecret": {
      "name": "The Growth Tree",
      "story": "Imagine a tiny seed planted in rich soil. With water and sunlight, it grows into a towering tree. Each branch represents an investment, spreading out and bearing fruit. Over time, it provides shade and shelter, just like a solid financial plan.",
      "action": "This week, review your budget to identify unnecessary expenses. Redirect that money into a savings account or investment.",
      "mnemonic": "Seed to tree, budget to wealth."
    },
    "moneyMachine": {
      "type": "Real Estate Investment Trust (REIT)",
      "eli5": "Think of a REIT like a magic vending machine. You put in money, and it gives you a share of the rent from buildings. Just like a vending machine serves snacks, a REIT serves income from properties.",
      "indiaAngle": "In India, REITs let you invest in commercial properties with as little as Rs.10,000. They offer a way to earn rental income without the hassle of managing a property.",
      "mnemonic": "Invest in REITs, watch your money flow."
    },
    "mindsetFlip": {
      "oldThinking": "Money is hard to earn and must be saved meticulously.",
      "newThinking": "Money works best when invested and allowed to grow.",
      "why": "Investing allows your money to increase through compounding. Over time, small amounts can turn into large sums, like a snowball rolling down a hill.",
      "mnemonic": "Save to struggle, invest to thrive."
    },
    "magicNumber": {
      "number": "Rule of 72",
      "eli5": "The Rule of 72 is like a magic trick for money. Divide 72 by your investment's interest rate, and it tells you how many years it takes to double your money. If your investment earns 6%, it doubles in 12 years, just like planting a tree that grows twice as tall.",
      "mnemonic": "72 divides, wealth multiplies."
    },
    "quiz": [
      {
        "q": "What does the Rule of 72 help you calculate?",
        "options": [
          "Years to double your money",
          "Tax rates",
          "Monthly expenses",
          "Investment risks"
        ],
        "answer": 0,
        "funFact": "The Rule of 72 has been used by investors for centuries!"
      },
      {
        "q": "What is a REIT?",
        "options": [
          "A type of bond",
          "A magic vending machine",
          "A real estate investment trust",
          "A savings account"
        ],
        "answer": 2,
        "funFact": "REITs were created by Congress in 1960 to give everyone a chance to invest in real estate."
      },
      {
        "q": "What is the key to financial freedom?",
        "options": [
          "Saving as much as possible",
          "Investing wisely",
          "Working overtime",
          "Avoiding all expenses"
        ],
        "answer": 1,
        "funFact": "Investing can grow your money faster than just saving it!"
      }
    ]
  },
  "communication": {
    "speakingSkill": {
      "name": "Storytelling",
      "story": "Steve Jobs was a master storyteller. He used stories to make complex ideas simple. At the 2007 iPhone launch, he captivated the audience with a narrative about merging technology and liberal arts.",
      "drill": "Choose a personal story. Practice telling it in under two minutes.",
      "mnemonic": "S.T.O.R.Y. - Simple, Touching, Original, Relatable, Yours"
    },
    "negotiationMove": {
      "tactic": "Anchoring",
      "eli5": "Imagine you want pizza. You say, 'I'll trade my apple for your slice.' If they want more, they might say, 'How about two apples?' You've set a starting point.",
      "script": "Let's start with an offer of $10. This sets a reference point for our discussion.",
      "mnemonic": "A.N.C.H.O.R. - Ask, Negotiate, Create, Hold, Offer, Reassess"
    },
    "officeWin": {
      "rule": "Active Listening",
      "story": "Person A interrupts during meetings, making everyone feel unheard. Person B listens, nods, and asks follow-up questions, creating a positive atmosphere. This builds trust and encourages collaboration.",
      "mistake": "The most common mistake is thinking about your response instead of listening.",
      "mnemonic": "L.I.S.T.E.N. - Look, Inquire, Summarize, Think, Engage, Note"
    },
    "confidenceHack": {
      "technique": "Power Posing",
      "science": "Standing tall increases testosterone and decreases cortisol. This means more confidence and less stress.",
      "doItNow": "Before your meeting, stand with your hands on your hips for two minutes. This simple pose can boost your confidence.",
      "mnemonic": "P.O.W.E.R. - Pose, Own, Win, Energize, Relax"
    },
    "quiz": [
      {
        "q": "What is a key technique used by Steve Jobs?",
        "options": [
          "Storytelling",
          "Debating",
          "Joking",
          "Reading"
        ],
        "answer": 0,
        "funFact": "Jobs often started his presentations with a personal story."
      },
      {
        "q": "What does anchoring in negotiation help with?",
        "options": [
          "Setting a reference point",
          "Making friends",
          "Getting food",
          "Writing emails"
        ],
        "answer": 1,
        "funFact": "Anchoring can significantly influence the outcome of negotiations."
      },
      {
        "q": "What is a common mistake in active listening?",
        "options": [
          "Thinking about your response",
          "Taking notes",
          "Asking questions",
          "Nodding"
        ],
        "answer": 2,
        "funFact": "Listening fully can lead to better teamwork and ideas."
      }
    ]
  },
  "mind": {
    "brainHack": {
      "name": "Neuro-Visual Mapping",
      "eli5": "Think of your brain like a wild horse. When you guide it gently, it learns to follow your lead instead of running wild.",
      "protocol": "Spend 10 minutes daily visualizing your goals with bright images. Do this first thing in the morning after waking up.",
      "mnemonic": "Vivid Vision."
    },
    "disciplineCode": {
      "principle": "Consistency Over Perfection",
      "story": "Imagine a warrior who trains daily, rain or shine. Each small step builds strength and skill. Eventually, they become unstoppable in battle.",
      "todayAction": "Commit to practicing one skill for 15 minutes today. No distractions, just focus on that one thing.",
      "mnemonic": "Daily Grind."
    },
    "impulseKiller": {
      "urge": "Procrastination",
      "eli5": "Picture a monster in your head that loves to delay things. It thrives on excuses and fear of failure.",
      "interrupt": "When you feel the urge to procrastinate, set a timer for 60 seconds. Use that time to take one small action, like opening your study book.",
      "mnemonic": "One Minute Start."
    },
    "bodyUpgrade": {
      "practice": "High-Intensity Interval Training (HIIT)",
      "eli5": "Think of your body as a race car. Short bursts of speed make it run faster and burn fuel more efficiently.",
      "minimumDose": "Do 15 minutes of HIIT three times a week for best results.",
      "mnemonic": "Fast Fuel."
    },
    "quiz": [
      {
        "q": "What is the key to the Neuro-Visual Mapping technique?",
        "options": [
          "Using music",
          "Visualizing goals",
          "Meditation",
          "Walking"
        ],
        "answer": 1,
        "funFact": "Visualizing goals can increase motivation by 40%!."
      },
      {
        "q": "How long should the warrior train each day?",
        "options": [
          "1 hour",
          "30 minutes",
          "15 minutes",
          "5 minutes"
        ],
        "answer": 2,
        "funFact": "Even a short daily training can lead to amazing progress."
      },
      {
        "q": "What is the minimum effective dose for HIIT?",
        "options": [
          "30 minutes",
          "20 minutes",
          "15 minutes",
          "10 minutes"
        ],
        "answer": 2,
        "funFact": "Short, intense workouts can be more effective than long, moderate ones."
      }
    ]
  },
  "knowledge": {
    "mathMagic": {
      "concept": "Probability Trees",
      "eli5": "Imagine you're picking ice cream flavors. You have 3 choices: vanilla, chocolate, and strawberry. Each time you pick, you can choose again, creating a tree of options. It's like branching paths in a video game, leading to different delicious endings!",
      "realWorldUse": "Probability trees help in deciding investments in finance. They show possible outcomes and help in risk assessment.",
      "mnemonic": "Tree of choices leads to yummy outcomes."
    },
    "scienceWow": {
      "field": "Biology",
      "concept": "Photosynthesis",
      "eli5": "Plants are like tiny chefs in nature. They take sunlight, carbon dioxide, and water to cook up food. The magic happens in their leaves, where chlorophyll acts like a solar panel. It's their way of turning sunshine into energy!",
      "mindBlow": "Did you know that a single tree can produce enough oxygen for up to four people each day? That's like having a personal air factory!",
      "mnemonic": "Sunlight + Water = Plant Power!"
    },
    "historyStory": {
      "event": "The Signing of the Treaty of Versailles",
      "story": "On June 28, 1919, in the Hall of Mirrors at Versailles, leaders gathered to shape the future of Europe. Woodrow Wilson, the President of the USA, pushed for peace but clashed with British and French leaders over harsh penalties for Germany. The room buzzed with tension as they negotiated terms that would reshape the continent. This treaty, however, sowed seeds of future conflict, leading to World War II.",
      "lesson": "Sometimes, peace agreements can lead to more problems than solutions. It teaches us to seek understanding, not just victory.",
      "mnemonic": "Versailles: A peace treaty with a hidden storm."
    },
    "earthSecret": {
      "place": "Bhutan",
      "secret": "Bhutan measures its success by Gross National Happiness, not GDP. They prioritize mental well-being over economic growth, making them unique. This small kingdom is home to the world's only carbon-negative economy.",
      "edge": "Knowing this can spark discussions about alternative success models. It challenges conventional wisdom in business and government policies.",
      "mnemonic": "Happiness over wealth in Bhutan."
    },
    "quiz": [
      {
        "q": "What do plants need for photosynthesis?",
        "options": [
          "Sunlight",
          "Wind",
          "Soil",
          "Moonlight"
        ],
        "answer": 0,
        "funFact": "Plants can convert sunlight into energy, making them nature's solar panels!"
      },
      {
        "q": "What was the main focus of the Treaty of Versailles?",
        "options": [
          "Economic Growth",
          "Peace",
          "War Strategies",
          "Land Expansion"
        ],
        "answer": 1,
        "funFact": "The Treaty aimed to prevent future wars, but it ironically set the stage for World War II."
      },
      {
        "q": "What does Bhutan prioritize over GDP?",
        "options": [
          "Tourism",
          "Happiness",
          "Technology",
          "Agriculture"
        ],
        "answer": 1,
        "funFact": "Bhutan's unique approach has inspired other countries to consider well-being as a measure of progress."
      }
    ]
  },
  "ai": {
    "toolSpotlight": {
      "name": "ChatGPT-5",
      "category": "writing",
      "eli5": "Imagine a super smart friend who can write anything you want. Need a story, an email, or a report? This tool does it all in a snap!",
      "secretMove": "You can ask it to rewrite your text in different styles, like Shakespeare or a pirate! Most people just use it for basic tasks and miss this fun twist.",
      "mnemonic": "ChatGPT helps you write like a pro."
    },
    "workflowWin": {
      "title": "Daily Report Generator",
      "problem": "Writing reports takes time and focus. It's often boring and repetitive, making it hard to stay motivated.",
      "steps": [
        "Gather data from sources like Google Docs",
        "Input key points into ChatGPT-5",
        "Generate a draft report",
        "Edit and finalize the report"
      ],
      "timeSaved": "This workflow can cut report writing time by 70%.",
      "mnemonic": "Quick reports, less stress."
    },
    "promptOfDay": {
      "purpose": "Create a weekly project update",
      "prompt": "Write a project update for [PROJECT NAME] covering progress, challenges, and next steps. Include specific metrics like [METRIC] and [METRIC].",
      "where": "ChatGPT-5",
      "mnemonic": "Stay on top of your projects easily."
    },
    "futureWatch": {
      "trend": "AI-driven conflict resolution tools",
      "eli5": "Before, peace talks were slow and complicated. Now, AI analyzes data to suggest solutions quickly. This helps countries find common ground faster.",
      "yourMove": "Look for AI tools that help with negotiation processes in your own projects. Implementing them can save time and improve outcomes.",
      "mnemonic": "AI makes peace easier."
    },
    "quiz": [
      {
        "q": "What is the main benefit of using AI for writing reports?",
        "options": [
          "Saves time",
          "Makes it more complicated",
          "Requires more effort",
          "Less accurate"
        ],
        "answer": 0,
        "funFact": "AI can generate a full report in just minutes!"
      },
      {
        "q": "How much time can the Daily Report Generator save?",
        "options": [
          "10%",
          "30%",
          "50%",
          "70%"
        ],
        "answer": 3,
        "funFact": "Saving time means you can focus on more important tasks."
      },
      {
        "q": "What is a unique feature of ChatGPT-5?",
        "options": [
          "Can sing",
          "Writes in different styles",
          "Draws pictures",
          "Makes coffee"
        ],
        "answer": 1,
        "funFact": "You can turn your report into a poem if you want!"
      }
    ]
  },
  "travel": {
    "destination": {
      "country": "Italy",
      "region": "Tuscany",
      "eli5": "Imagine rolling hills painted in green and gold under a bright blue sky. The sweet smell of olive oil and fresh bread fills the air. Sunflowers dance in the breeze, and ancient stone villas dot the landscape. Every sunset turns the horizon into a canvas of orange and pink.",
      "bestTime": "The best time to visit is from late April to June. The weather is warm, and the crowds are smaller before the summer rush.",
      "hiddenGem": "Visit the tiny village of San Gimignano, famous for its medieval towers. Most tourists miss the local gelato shop that has won several international awards.",
      "mnemonic": "Tuscany's Tasteful Treasures."
    },
    "visaTip": {
      "focus": "Italy visa process for Indian passport holders",
      "eli5": "Apply for a Schengen visa online. Book an appointment at the nearest VFS center. Bring your documents and wait for approval, usually within 15 days.",
      "goldenTip": "Always apply at least a month in advance to avoid last-minute issues. Include proof of accommodation to strengthen your application.",
      "mnemonic": "Italian Visa Victory."
    },
    "culturalCode": {
      "culture": "Italian",
      "doThis": "Learn a few Italian phrases; locals appreciate the effort. Try to enjoy meals slowly, as Italians value food as a social experience.",
      "neverDoThis": "Don't ask for ketchup in a restaurant; it's considered rude. Avoid speaking loudly; Italians prefer a more subdued conversation tone.",
      "mnemonic": "Italian Etiquette Essentials."
    },
    "quiz": [
      {
        "q": "What is the capital of Italy?",
        "options": [
          "Rome",
          "Milan",
          "Venice",
          "Florence"
        ],
        "answer": 0,
        "funFact": "Rome has been a major city for over 2,500 years!"
      },
      {
        "q": "What is a traditional Italian dish?",
        "options": [
          "Sushi",
          "Tacos",
          "Pizza",
          "Curry"
        ],
        "answer": 2,
        "funFact": "Pizza originated in Naples, Italy, and is now loved worldwide!"
      },
      {
        "q": "Which famous tower is found in Pisa?",
        "options": [
          "Leaning Tower",
          "Eiffel Tower",
          "Big Ben",
          "Burj Khalifa"
        ],
        "answer": 0,
        "funFact": "The Leaning Tower of Pisa started leaning during its construction in the 12th century!"
      }
    ]
  }
}

const d260615 = {
  "news": {
    "segments": [
      {
        "name": "🌐 What's happening with countries?",
        "color": "#a0d4f5",
        "stories": [
          {
            "headline": "US-Iran Peace Agreement Reached",
            "eli5": "Imagine two neighbors who had a big fight and stopped talking. Then one day, they sit down and agree to be friends again. That's what happened between the US and Iran. They settled their differences and reopened the Strait of Hormuz, a major waterway for oil.",
            "whyItMatters": "This helps stabilize the Middle East and ensures oil continues to flow, affecting prices globally.",
            "mnemonic": "Think of 'Peace' as the key to open the 'Strait' of friendship."
          }
        ]
      },
      {
        "name": "💸 What's happening with money?",
        "color": "#a8edcb",
        "stories": [
          {
            "headline": "Sensex Surges 736 Points",
            "eli5": "Picture a rollercoaster ride that suddenly goes up! The Sensex, which is like a giant mood ring for the Indian stock market, jumped 736 points today. Investors are excited because the US-Iran peace deal means more stability.",
            "whyItMatters": "When the stock market rises, it often means people feel more confident about the economy, which can lead to job growth.",
            "mnemonic": "Remember 'Sensex Soars' to picture that thrilling ride up!"
          },
          {
            "headline": "Nifty Closes Above 23,850",
            "eli5": "Imagine a race where the Nifty index crosses a finish line at 23,853.90, like a runner breaking a personal record! This happened thanks to the good news about the US-Iran deal.",
            "whyItMatters": "A strong Nifty often indicates a booming market, which can benefit everyday investors and businesses.",
            "mnemonic": "Think 'Nifty's New Heights' as it reaches new finish lines!"
          },
          {
            "headline": "Top Gainers: Aarti Industries and More",
            "eli5": "Think of a game where certain players score big points. Companies like Aarti Industries and Gabriel India were the star players today, showing strong gains on the market. This reflects how investors trust these companies.",
            "whyItMatters": "When companies do well, they can invest more in people and projects, boosting the economy.",
            "mnemonic": "Remember 'Gainers Glow' to think of shining stars in the market!"
          }
        ]
      },
      {
        "name": "💻 What's happening with technology?",
        "color": "#c9b8f5",
        "stories": [
          {
            "headline": "FIFA World Cup 2026 Official Match Ball Unveiled",
            "eli5": "Adidas just revealed the Trionda, the shiny new soccer ball for the upcoming World Cup. It's like the secret weapon for players, designed to help them score goals and dazzle fans.",
            "whyItMatters": "This ball will be used by the world's best players, showcasing innovation in sports gear and enhancing the excitement of the tournament.",
            "mnemonic": "Think of 'Trionda Triumph' for the ball that aims for glory!"
          },
          {
            "headline": "FIFA World Cup 2026 Mascots Revealed",
            "eli5": "Meet Maple the Moose, Zayu the Jaguar, and Clutch the Bald Eagle! These mascots are like the cheerleaders of the World Cup, bringing fun and energy to the tournament.",
            "whyItMatters": "Mascots help engage fans and create a festive atmosphere, making the event even more memorable.",
            "mnemonic": "Remember 'Mascot Magic' for the trio cheering on the games!"
          }
        ]
      },
      {
        "name": "🌿 What's happening with our planet?",
        "color": "#f5c6a0",
        "stories": [
          {
            "headline": "FIFA World Cup 2026 Sustainability Initiatives Announced",
            "eli5": "The World Cup organizers are like responsible party planners who want to throw a great bash without trashing the house. They announced plans to make the event eco-friendly and reduce waste.",
            "whyItMatters": "This shows that big events can care for the environment, setting a good example for others.",
            "mnemonic": "Think 'Sustainable Soccer' to remember the eco-friendly focus!"
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "What was the Sensex's closing point on June 15, 2026?",
        "options": [
          "76,264.33",
          "75,000.00",
          "77,000.00",
          "78,500.00"
        ],
        "answer": 0,
        "funFact": "The Sensex is one of the oldest stock indices in Asia, established in 1986."
      },
      {
        "q": "Who are the mascots for the FIFA World Cup 2026?",
        "options": [
          "Maple the Moose, Zayu the Jaguar, Clutch the Bald Eagle",
          "Leo the Lion, Benny the Bear, Sam the Shark",
          "Charlie the Cheetah, Rocky the Rhino, Benny the Bison",
          "None of the above"
        ],
        "answer": 0,
        "funFact": "Mascots have been part of the World Cup since 1966, adding fun and style to the event!"
      },
      {
        "q": "What is the name of the official match ball for FIFA World Cup 2026?",
        "options": [
          "Trionda",
          "Brazuca",
          "Telstar",
          "Jabulani"
        ],
        "answer": 0,
        "funFact": "Adidas has been producing the official World Cup ball since 1970!"
      }
    ]
  },
  "markets": {
    "globalPulse": {
      "eli5": "Imagine global markets as a river that just got a big rainstorm. The peace deal between the US and Iran reopened the Strait of Hormuz, letting the water flow freely again. This caused stocks to surge like a strong current, lifting indexes everywhere. Investors felt excited and rushed in, creating a big wave of growth.",
      "keyThings": [
        "S&P 500: 4,600, up 1.5%",
        "Brent Crude: $90.25 per barrel, up 3%",
        "Gold: $1,950 per ounce, steady",
        "Nifty: 23,853.90, up 231 points"
      ]
    },
    "indianMarket": {
      "eli5": "The Indian market was like a bustling bazaar, filled with traders eager to make deals. With the Sensex soaring 736 points, everyone was excited to buy. Certain stocks, like Aarti Industries and HFCL, were the talk of the town, attracting lots of buyers.",
      "breakouts": [
        {
          "name": "NSE:AARTI  -  Aarti Industries",
          "whyExciting": "Aarti Industries saw a jump in demand due to strong quarterly results and growing market share. Investors were eager to get in on this momentum.",
          "risk": "The main risk is potential profit-taking as the stock has already surged significantly."
        },
        {
          "name": "NSE:HFCL  -  HFCL Limited",
          "whyExciting": "HFCL's stock rose sharply as they announced new contracts for telecom infrastructure. This positive news attracted many new investors.",
          "risk": "If the contracts underperform, the stock could face a quick pullback."
        },
        {
          "name": "NSE:HPCL  -  Hindustan Petroleum",
          "whyExciting": "HPCL's shares gained as oil prices rose, boosting sentiment in the energy sector. The market reacted strongly to the positive outlook.",
          "risk": "Fluctuations in global crude prices could impact future earnings."
        }
      ],
      "ipoSpot": {
        "name": "None this week",
        "verdict": "Watch",
        "eli5": "No new IPOs caught attention this week. Keep an eye out as new opportunities may come soon."
      },
      "lessonOfDay": {
        "title": "Diversification",
        "story": "Think of diversification like planting a garden with different flowers. If one type fails, others may thrive, keeping your garden colorful. Spreading investments across various sectors helps reduce risk and can lead to better returns.",
        "mnemonic": "Don't put all your eggs in one basket."
      }
    },
    "quiz": [
      {
        "q": "What was the Sensex closing level on June 15, 2026?",
        "options": [
          "76,264.33",
          "75,500.00",
          "77,000.00",
          "76,000.00"
        ],
        "answer": 0,
        "funFact": "The Sensex surge was the result of positive investor sentiment following the US-Iran peace deal."
      },
      {
        "q": "Which company introduced the official match ball for FIFA World Cup 2026?",
        "options": [
          "Nike",
          "Puma",
          "Adidas",
          "Reebok"
        ],
        "answer": 2,
        "funFact": "Adidas has been the official supplier of the World Cup match balls since 1970."
      },
      {
        "q": "How many teams will participate in the FIFA World Cup 2026?",
        "options": [
          "32",
          "48",
          "64",
          "40"
        ],
        "answer": 1,
        "funFact": "FIFA World Cup 2026 will be the first tournament with 48 teams competing."
      }
    ]
  },
  "psychology": {
    "mindTrick": {
      "name": "Cognitive Dissonance",
      "eli5": "Imagine you love pizza but just learned it's not healthy. Your brain feels like it's in a tug-of-war. To ease the pain, you might convince yourself that pizza is a special treat, not an everyday food. This way, you can still enjoy your slice without guilt.",
      "realLife": "After the US-Iran peace deal, people might struggle with conflicting feelings about past conflicts versus a hopeful future. This dissonance can lead to changes in how they view international relations.",
      "mnemonic": "Pizza vs. health battle."
    },
    "bodyLanguage": {
      "signal": "Crossed arms",
      "eli5": "Picture a cartoon character with a big frown, arms tightly crossed like a shield. It screams, 'Stay away!' even if they might be friendly. It's like a turtle hiding in its shell, showing it's not open to chatting.",
      "howToUse": "If you see someone with crossed arms, try to lighten the mood. You can open a conversation about something they enjoy to break down their barrier.",
      "mnemonic": "Crossed arms = turtle shell."
    },
    "superpower": {
      "name": "Social Proof",
      "story": "Imagine a new restaurant opens in town. At first, it's quiet, but then a group of friends walks in and starts laughing. Suddenly, more people join, thinking, 'It must be good if others are here!' This is social proof in action.",
      "shield": "To defend against it, think critically about your choices. Just because a crowd is there doesn't mean it's the best option for you.",
      "mnemonic": "Crowd = good choice."
    },
    "quiz": [
      {
        "q": "What is cognitive dissonance?",
        "options": [
          "Conflicting thoughts",
          "Feeling happy",
          "Eating too much",
          "Liking pizza"
        ],
        "answer": 0,
        "funFact": "People often change their beliefs to avoid discomfort."
      },
      {
        "q": "What does crossed arms signify in body language?",
        "options": [
          "Open and friendly",
          "Closed off",
          "Excited",
          "Curious"
        ],
        "answer": 1,
        "funFact": "Crossed arms can indicate defensiveness."
      },
      {
        "q": "What is an example of social proof?",
        "options": [
          "Buying a new car",
          "Watching a movie",
          "Dining at a busy restaurant",
          "Reading a book"
        ],
        "answer": 2,
        "funFact": "People tend to follow the crowd, especially in unfamiliar situations."
      }
    ]
  },
  "leadership": {
    "leaderMove": {
      "name": "Conflict Resolution",
      "story": "In 2021, President Joe Biden faced a major challenge with the withdrawal from Afghanistan. He navigated the tense situation with careful diplomacy. His approach emphasized dialogue and understanding. This laid the groundwork for today's US-Iran peace agreement.",
      "doThis": "Encourage open conversations in your team. Be the bridge that connects differing viewpoints.",
      "mnemonic": "Talk it out."
    },
    "visionarySecret": {
      "concept": "Long-term Perspective",
      "eli5": "Imagine looking through binoculars. What's far away seems clearer. Visionaries see the future and plan for it, not just react to today. They focus on what's coming, not just what's now.",
      "exercise": "Spend 10 minutes writing down where you see yourself in 5 years. Think about the steps to get there.",
      "mnemonic": "Future lens."
    },
    "eliteHabit": {
      "habit": "Daily Reading",
      "whoAndHow": "Warren Buffett reads 500 pages a day. He believes knowledge builds up like compound interest.",
      "whyItWorks": "Reading expands your mind and keeps you informed. It's like a mental workout that sharpens your thinking skills.",
      "mnemonic": "Read and grow."
    },
    "sigmaWisdom": {
      "lesson": "Embrace Adversity",
      "story": "Think of a strong tree that bends but doesn't break in a storm. Ancient Stoics taught that challenges shape our character. Like steel tempered in fire, we grow stronger through hardship.",
      "action": "Face one challenge today with resilience.",
      "mnemonic": "Bend, don't break."
    },
    "quiz": [
      {
        "q": "What major agreement was reached on June 15, 2026?",
        "options": [
          "US-China Trade Deal",
          "US-Iran Peace Agreement",
          "NATO Expansion",
          "Climate Change Accord"
        ],
        "answer": 1,
        "funFact": "The Strait of Hormuz is a crucial shipping route, impacting global oil supplies."
      },
      {
        "q": "Who is known for reading extensively every day?",
        "options": [
          "Elon Musk",
          "Warren Buffett",
          "Jeff Bezos",
          "Bill Gates"
        ],
        "answer": 1,
        "funFact": "Buffett credits his reading habit for much of his investment success."
      },
      {
        "q": "What principle emphasizes resolving conflicts through dialogue?",
        "options": [
          "Leadership by Example",
          "Conflict Resolution",
          "Visionary Thinking",
          "Daily Reading"
        ],
        "answer": 1,
        "funFact": "Effective conflict resolution can lead to stronger relationships and better teamwork."
      }
    ]
  },
  "wealth": {
    "wealthSecret": {
      "name": "The Seed of Wealth",
      "story": "Imagine a tiny seed buried in the ground. With care, it sprouts into a mighty tree, providing shade and fruit. Each branch represents an investment, growing larger over time. Just like a river flows, your wealth can expand and nourish those around you.",
      "action": "Start by setting aside 10% of your income this week. Research one new investment opportunity that excites you.",
      "mnemonic": "Seed, Grow, Flow."
    },
    "moneyMachine": {
      "type": "Real Estate Investment Trust (REIT)",
      "eli5": "Think of a vending machine that gives you money instead of snacks. You put in a little cash, and it spits out profits every month. It's like owning a piece of a building without being a landlord.",
      "indiaAngle": "In India, REITs let you invest in commercial properties without huge money. You can earn rental income just like owning a slice of a shopping mall.",
      "mnemonic": "Vending Profits."
    },
    "mindsetFlip": {
      "oldThinking": "Money is hard to get and even harder to keep.",
      "newThinking": "Wealth grows when I make my money work for me.",
      "why": "When your money earns interest, it can create more money over time. This compounding effect means your wealth can grow exponentially, not just linearly.",
      "mnemonic": "Work for Money vs. Money Works."
    },
    "magicNumber": {
      "number": "Rule of 72",
      "eli5": "If you have money earning interest, divide 72 by your interest rate. This tells you how many years it takes to double your money. It's like planting a tree that grows twice as big in a certain time.",
      "mnemonic": "72 to Double."
    },
    "quiz": [
      {
        "q": "What does the Rule of 72 help you calculate?",
        "options": [
          "Time to double your money",
          "Amount of taxes owed",
          "Best investment strategy",
          "Which stocks to buy"
        ],
        "answer": 0,
        "funFact": "Using this rule, if you have a 6% return, your money doubles in 12 years."
      },
      {
        "q": "What is a REIT?",
        "options": [
          "A tax on real estate",
          "A way to invest in real estate",
          "A loan for buying properties",
          "A type of insurance"
        ],
        "answer": 1,
        "funFact": "REITs allow you to invest in large properties without needing millions upfront."
      },
      {
        "q": "What is the first step to building wealth?",
        "options": [
          "Saving all your money",
          "Investing in stocks",
          "Setting aside a percentage of income",
          "Buying a house"
        ],
        "answer": 2,
        "funFact": "Saving a portion of your income is the foundation of wealth building."
      }
    ]
  },
  "communication": {
    "speakingSkill": {
      "name": "Storytelling",
      "story": "Steve Jobs was a master storyteller. During his 2005 Stanford commencement speech, he shared three personal stories. Each story was simple yet powerful, drawing the audience in.",
      "drill": "Pick a personal experience. Summarize it in three sentences with a beginning, middle, and end.",
      "mnemonic": "BME - Beginning, Middle, End"
    },
    "negotiationMove": {
      "tactic": "The Anchoring Technique",
      "eli5": "Imagine trading your apple for a friend's sandwich. If you say your apple is worth two sandwiches, your friend might think twice. You set the value high, and they adjust their offer.",
      "script": "I believe my offer is worth more due to its unique benefits. Let's start the discussion from this point.",
      "mnemonic": "Anchor high to float higher"
    },
    "officeWin": {
      "rule": "Active Listening",
      "story": "Person A listens carefully and asks follow-up questions. Person B interrupts and talks over others. A creates a positive atmosphere, while B causes frustration.",
      "mistake": "The most common mistake is thinking you already know what the other person will say.",
      "mnemonic": "Listen to win"
    },
    "confidenceHack": {
      "technique": "Power Posing",
      "science": "Standing tall with arms wide open boosts testosterone and lowers cortisol. This simple change in posture can make you feel more powerful and reduce anxiety.",
      "doItNow": "Before your meeting, stand in a strong pose for two minutes. Visualize your success while holding the pose.",
      "mnemonic": "Pose to power"
    },
    "quiz": [
      {
        "q": "Who is known for effective storytelling in speeches?",
        "options": [
          "Barack Obama",
          "Steve Jobs",
          "Tony Robbins",
          "Oprah Winfrey"
        ],
        "answer": 1,
        "funFact": "Steve Jobs' storytelling captivated audiences and created a lasting impact."
      },
      {
        "q": "What does active listening help improve?",
        "options": [
          "Conflict",
          "Trust",
          "Frustration",
          "Noise"
        ],
        "answer": 1,
        "funFact": "Active listening can reduce misunderstandings and enhance teamwork."
      },
      {
        "q": "What effect does power posing have?",
        "options": [
          "Increases stress",
          "Boosts confidence",
          "Makes you sleepy",
          "Causes distraction"
        ],
        "answer": 1,
        "funFact": "Studies show that power posing can change your mindset and behavior."
      }
    ]
  },
  "mind": {
    "brainHack": {
      "name": "Neuro-Lasso",
      "eli5": "Imagine trying to tame a wild horse. You gently guide it with a lasso until it trusts you. This technique helps your mind focus like a calm horse in a stable.",
      "protocol": "Set aside 10 minutes each morning. Use a quiet space to visualize your goals and breathe deeply.",
      "mnemonic": "Lasso your thoughts."
    },
    "disciplineCode": {
      "principle": "The Spartan Mindset",
      "story": "Imagine a Spartan warrior training daily, rain or shine. He knows discipline builds strength. Each push-up makes him tougher for battle.",
      "todayAction": "Commit to 15 minutes of focused work on a task. Turn off all distractions and just dive in.",
      "mnemonic": "Spartan strength."
    },
    "impulseKiller": {
      "urge": "procrastination",
      "eli5": "Think of procrastination as a sneaky monster hiding under your bed. It whispers to you, making you want to avoid your tasks.",
      "interrupt": "When you feel it creeping in, stand up and do 10 jumping jacks for 60 seconds. This shakes off the monster and gets your blood pumping.",
      "mnemonic": "Jump the monster away."
    },
    "bodyUpgrade": {
      "practice": "Daily Stretching",
      "eli5": "Stretching is like oiling a rusty door. It keeps your body moving smoothly and prevents injury.",
      "minimumDose": "Spend at least 5 minutes stretching each day.",
      "mnemonic": "Stretch to shine."
    },
    "quiz": [
      {
        "q": "What is the name of the brain technique?",
        "options": [
          "Neuro-Lasso",
          "Mind Rope",
          "Thought Harness",
          "Focus Net"
        ],
        "answer": 0,
        "funFact": "Neuro-Lasso helps you control your thoughts!"
      },
      {
        "q": "What time should you practice the brain hack?",
        "options": [
          "Morning",
          "Night",
          "Afternoon",
          "Whenever"
        ],
        "answer": 0,
        "funFact": "Morning is best for fresh motivation!"
      },
      {
        "q": "How long should you stretch daily?",
        "options": [
          "1 minute",
          "5 minutes",
          "10 minutes",
          "15 minutes"
        ],
        "answer": 1,
        "funFact": "Just 5 minutes can make a big difference!"
      }
    ]
  },
  "knowledge": {
    "mathMagic": {
      "concept": "Bayes' Theorem",
      "eli5": "Imagine you have a magic box full of colorful candies. Each candy has a special power related to how often you see them. If you know how many candies are red and how many candies are blue, you can guess the chances of picking a red candy next. It's like having a superpower to predict candy colors!",
      "realWorldUse": "In healthcare, doctors use Bayes' Theorem to update the likelihood of a disease as new test results come in. In finance, investors apply it to assess risks based on new market information.",
      "mnemonic": "Bears Eat Yellow Slippers (Bayes' Evidence Yields Success)"
    },
    "scienceWow": {
      "field": "Biology",
      "concept": "Photosynthesis",
      "eli5": "Think of plants as tiny solar panels. They take sunlight and mix it with water from the ground and carbon dioxide from the air. This magical blend turns into food for the plant while releasing oxygen for us to breathe. It's like nature's own cooking show every day!",
      "mindBlow": "A single tree can absorb about 48 pounds of carbon dioxide a year, helping combat climate change. Imagine if every person planted just one tree!",
      "mnemonic": "Photosynthesis Produces Oxygen, Food (PPOF)"
    },
    "historyStory": {
      "event": "The Signing of the Treaty of Paris (1783)",
      "story": "On September 3, 1783, in Paris, Benjamin Franklin, John Adams, and John Jay sat at a grand table. They were tired but excited, sipping wine as they signed the treaty that ended the Revolutionary War. It was their moment of triumph, giving birth to a new nation, the United States. A spark of hope ignited as they sealed their future with ink and ambition!",
      "lesson": "Sometimes, you have to negotiate hard for your freedom and dreams. Teamwork and perseverance can turn the tide in your favor.",
      "mnemonic": "Treaty of Paris = Triumph of Patriots (TP=TP)"
    },
    "earthSecret": {
      "place": "Bhutan",
      "secret": "Bhutan measures its success not by GDP but by Gross National Happiness. This tiny kingdom nestled in the Himalayas has a unique constitution mandating the preservation of its environment. Plus, it's home to the world's highest unclimbed peak, Gangkhar Puensum, standing at 7,570 meters.",
      "edge": "Knowing about Bhutan's approach to happiness can inspire new business strategies focused on well-being. It's a conversation starter about the value of quality over quantity.",
      "mnemonic": "Bhutan: Happy People, High Peaks (HP=HP)"
    },
    "quiz": [
      {
        "q": "What theorem helps us update probabilities with new information?",
        "options": [
          "Bayes' Theorem",
          "Pythagorean Theorem",
          "Fermat's Last Theorem",
          "Euler's Formula"
        ],
        "answer": 0,
        "funFact": "Bayes' Theorem was named after Thomas Bayes, an 18th-century statistician!"
      },
      {
        "q": "What process do plants use to convert sunlight into food?",
        "options": [
          "Respiration",
          "Photosynthesis",
          "Transpiration",
          "Digestion"
        ],
        "answer": 1,
        "funFact": "Photosynthesis is responsible for producing most of the oxygen we breathe!"
      },
      {
        "q": "Which treaty ended the American Revolutionary War?",
        "options": [
          "Treaty of Paris",
          "Treaty of Versailles",
          "Treaty of Ghent",
          "Treaty of Tordesillas"
        ],
        "answer": 0,
        "funFact": "The Treaty of Paris was signed in 1783, officially recognizing American independence!"
      }
    ]
  },
  "ai": {
    "toolSpotlight": {
      "name": "Copy.ai",
      "category": "writing",
      "eli5": "Imagine a friendly robot that helps you write anything from emails to blog posts. It understands what you want and gives you suggestions that sound like a pro wrote them. It's like having a writing buddy who never runs out of ideas!",
      "secretMove": "Many users miss that you can tweak the tone and style, making it sound more personal or professional. You can even ask it to write in the style of famous authors!",
      "mnemonic": "Copy for creativity."
    },
    "workflowWin": {
      "title": "Content Creation Streamline",
      "problem": "Creating content can be slow and tedious. Copy.ai speeds up the process, so you spend less time writing and more time sharing your ideas.",
      "steps": [
        "Log in to Copy.ai",
        "Choose the type of content you need (like blog post)",
        "Enter your topic",
        "Hit 'Generate' and tweak as needed"
      ],
      "timeSaved": "Users report saving up to 80% of their writing time.",
      "mnemonic": "Create fast, share faster."
    },
    "promptOfDay": {
      "purpose": "Generate engaging social media posts",
      "prompt": "Write a catchy social media post about [TOPIC] that includes a call to action and an engaging question.",
      "where": "ChatGPT",
      "mnemonic": "Post, engage, connect."
    },
    "futureWatch": {
      "trend": "AI in international diplomacy",
      "eli5": "Before, diplomats relied on long meetings and endless paperwork. Now, AI tools help analyze data and predict outcomes, making negotiations smoother and faster. It's like having a super-smart advisor who can read the room instantly!",
      "yourMove": "Start using AI tools for data analysis in your projects. Look for software that can help you understand trends and patterns in real-time.",
      "mnemonic": "AI for peace."
    },
    "quiz": [
      {
        "q": "What is the main benefit of using Copy.ai?",
        "options": [
          "More time for writing",
          "Faster content creation",
          "Better idea generation",
          "All of the above"
        ],
        "answer": 3,
        "funFact": "Copy.ai has helped millions of users create over a billion words!"
      },
      {
        "q": "What can AI tools help with in diplomacy?",
        "options": [
          "Predicting outcomes",
          "Writing treaties",
          "Cooking meals",
          "Decorating offices"
        ],
        "answer": 0,
        "funFact": "AI can analyze years of data in seconds to help diplomats make better decisions."
      },
      {
        "q": "How much time can users save with Copy.ai?",
        "options": [
          "10%",
          "50%",
          "80%",
          "100%"
        ],
        "answer": 2,
        "funFact": "With AI, many users complete their writing tasks in a fraction of the time!"
      }
    ]
  },
  "travel": {
    "destination": {
      "country": "Japan",
      "region": "Kyoto",
      "eli5": "Imagine walking through a city where ancient temples whisper secrets of the past. Cherry blossoms dance in the breeze, painting the streets pink. The air is filled with the sweet aroma of matcha tea and sizzling yakitori. Kyoto's vibrant culture bursts with colors, from traditional kimonos to the golden shimmer of Kinkaku-ji, the Golden Pavilion.",
      "bestTime": "Spring, especially April, is perfect for cherry blossoms. Fall, in November, treats you to a symphony of autumn colors.",
      "hiddenGem": "Visit the quiet neighborhood of Arashiyama for a magical bamboo grove. Most tourists miss the serene Iwatayama Monkey Park, a short hike with stunning views and playful monkeys.",
      "mnemonic": "Kite Soars Beautifully (Kyoto, Spring, Bamboo)"
    },
    "visaTip": {
      "focus": "Japan visa process for Indian passport holders",
      "eli5": "First, check if you need a visa online. Next, gather your documents like passport and photos. Finally, submit everything at the nearest Japanese embassy.",
      "goldenTip": "Book a visa appointment early, as slots fill up quickly. Always double-check your documents to avoid delays.",
      "mnemonic": "Jumping Visa Paperwork (Japan, Visa, Prepare)"
    },
    "culturalCode": {
      "culture": "Japanese",
      "doThis": "Learn a few basic Japanese phrases, like 'Arigato' for thank you. Locals appreciate when visitors show respect for their language and culture.",
      "neverDoThis": "Avoid tipping, as it's seen as rude. Also, don't point at people or objects; it's considered impolite.",
      "mnemonic": "Respect and Learn (Respect, Language, Avoid Tipping)"
    },
    "quiz": [
      {
        "q": "What is the name of the famous bamboo grove in Kyoto?",
        "options": [
          "Arashiyama",
          "Nara",
          "Tokyo",
          "Osaka"
        ],
        "answer": 0,
        "funFact": "The Arashiyama Bamboo Grove looks like a scene straight out of a movie."
      },
      {
        "q": "What do you say to thank someone in Japanese?",
        "options": [
          "Konnichiwa",
          "Sayonara",
          "Arigato",
          "Sumimasen"
        ],
        "answer": 2,
        "funFact": "'Arigato' comes from the word for 'rare' and expresses gratitude for something special."
      },
      {
        "q": "What is the best season to see cherry blossoms in Kyoto?",
        "options": [
          "Winter",
          "Summer",
          "Spring",
          "Fall"
        ],
        "answer": 2,
        "funFact": "In spring, Kyoto transforms into a pink wonderland as cherry blossoms bloom."
      }
    ]
  }
}

const ALL_BRIEFS = {
  '2026-06-01': d260601,
  '2026-06-02': d260602,
  '2026-06-03': d260603,
  '2026-06-04': d260604,
  '2026-06-05': d260605,
  '2026-06-06': d260606,
  '2026-06-07': d260607,
  '2026-06-08': d260608,
  '2026-06-09': d260609,
  '2026-06-10': d260610,
  '2026-06-11': d260611,
  '2026-06-12': d260612,
  '2026-06-13': d260613,
  '2026-06-14': d260614,
  '2026-06-15': d260615,
}

// == DATA END ==

const AVAILABLE_DATES = Object.keys(ALL_BRIEFS).sort()

// -- UI Components --------------------------------------------------------------
function ELI5({ text, color }) {
  return <div style={{ fontSize: 14, color: C.text, lineHeight: 1.85, background: `${color}0d`, borderRadius: 10, padding: '12px 14px', marginBottom: 10 }}>{text}</div>
}

function ActionRow({ label, text, color }) {
  return (
    <div style={{ display: 'flex', gap: 8, padding: '8px 12px', background: C.surface, borderRadius: 8, marginBottom: 6, borderLeft: `2px solid ${color}` }}>
      <span style={{ fontSize: 11, color, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap', paddingTop: 1, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{text}</span>
    </div>
  )
}

function Tag({ label, color }) {
  return <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 20, background: `${color}22`, color, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginRight: 6, marginBottom: 4 }}>{label}</span>
}

function SectionHeader({ text, color }) {
  return <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12, marginTop: 4 }}>{text}</div>
}

function Mnemonic({ text, color }) {
  const [open, setOpen] = useState(false)
  if (!text) return null
  return (
    <div onClick={() => setOpen(o => !o)} style={{ marginTop: 12, padding: '8px 14px', borderRadius: 10, border: `1px dashed ${open ? color : C.dim}`, background: open ? `${color}10` : 'transparent', cursor: 'pointer', transition: 'all 0.25s' }}>
      <span style={{ fontSize: 11, color: open ? color : C.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        🧠 Memory Trick · {open ? 'tap to hide ^' : 'tap to reveal v'}
      </span>
      {open && <div style={{ marginTop: 6, fontSize: 13, color: C.text, lineHeight: 1.6 }}>{text}</div>}
    </div>
  )
}

// -- Progress utilities ------------------------------------------------------
function ProgressBar({ value, total, color, height = 5, showLabel = false }) {
  const pct = total === 0 ? 0 : Math.round((value / total) * 100)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height, background: C.dim, borderRadius: height, overflow: 'hidden' }}>
        <div style={{
          width: `${pct}%`, height: '100%',
          background: pct === 100
            ? `linear-gradient(90deg, ${C.mint}, #6ee7b7)`
            : `linear-gradient(90deg, ${color}, ${color}cc)`,
          borderRadius: height,
          transition: 'width 0.4s ease'
        }} />
      </div>
      {showLabel && (
        <span style={{ fontSize: 11, color: pct === 100 ? C.mint : C.muted, fontWeight: 700, whiteSpace: 'nowrap', minWidth: 36, textAlign: 'right' }}>
          {pct === 100 ? '✅' : `${value}/${total}`}
        </span>
      )}
    </div>
  )
}

function Card({ emoji, title, color, children, mnemonic, cardId, readSet, onRead }) {
  const [open, setOpen] = useState(true)
  const isRead = readSet && cardId ? readSet.has(cardId) : false

  const toggleRead = (e) => {
    e.stopPropagation()
    if (onRead && cardId) onRead(cardId)
  }

  return (
    <div style={{
      background: C.card, borderRadius: 14, marginBottom: 14, overflow: 'hidden',
      border: `1px solid ${isRead ? color + '55' : C.border}`,
      transition: 'border-color 0.3s'
    }}>
      <div style={{ padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: open ? `1px solid ${C.border}` : 'none' }}>
        {/* Read tick button */}
        {onRead && (
          <button onClick={toggleRead} style={{
            width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
            background: isRead ? color : 'transparent',
            border: `2px solid ${isRead ? color : C.dim}`,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, transition: 'all 0.2s', padding: 0,
            color: isRead ? '#0d0d14' : C.dim,
          }}>
            {isRead ? '(check)' : ''}
          </button>
        )}
        <span style={{ fontSize: 20 }}>{emoji}</span>
        <span onClick={() => setOpen(o => !o)} style={{ flex: 1, fontWeight: 700, fontSize: 14, color: isRead ? C.muted : C.text, lineHeight: 1.3, cursor: 'pointer', textDecoration: isRead ? 'line-through' : 'none', opacity: isRead ? 0.7 : 1, transition: 'all 0.2s' }}>{title}</span>
        <span onClick={() => setOpen(o => !o)} style={{ color: C.dim, fontSize: 12, cursor: 'pointer' }}>{open ? '^' : 'v'}</span>
      </div>
      {open && <div style={{ padding: '14px 16px' }}>{children}{mnemonic && <Mnemonic text={mnemonic} color={color} />}</div>}
    </div>
  )
}

function Quiz({ questions, color, onXP }) {
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  if (!questions?.length) return null
  const q = questions[idx]
  const choose = (i) => { if (selected !== null) return; setSelected(i); if (i === q.answer) setScore(s => s + 1) }
  const next = () => {
    if (idx + 1 >= questions.length) { setDone(true); onXP && onXP((score + (selected === q.answer ? 1 : 0)) * 10) }
    else { setIdx(i => i + 1); setSelected(null) }
  }
  if (done) {
    const final = score
    return (
      <div style={{ textAlign: 'center', padding: '28px', background: C.card, borderRadius: 16, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 52, marginBottom: 8 }}>{final === questions.length ? '🏆' : final >= 2 ? '⭐' : '📚'}</div>
        <div style={{ fontSize: 20, fontWeight: 900, color, marginBottom: 6 }}>{final}/{questions.length} Correct!</div>
        <div style={{ color: C.muted, fontSize: 13 }}>{final === questions.length ? 'Perfect! +30 XP!' : final >= 2 ? 'Nice work! +20 XP!' : 'Keep learning! +10 XP!'}</div>
      </div>
    )
  }
  return (
    <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${color}44`, padding: 20 }}>
      <div style={{ fontSize: 11, color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, fontWeight: 800 }}>🧩 Quiz · Q{idx + 1}/{questions.length}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 16, lineHeight: 1.5 }}>{q.q}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
        {q.options.map((opt, i) => {
          let bg = C.surface, border = C.border, tc = C.text
          if (selected !== null) { if (i === q.answer) { bg = '#0d2a0d'; border = C.mint; tc = C.mint } else if (i === selected) { bg = '#2a0d0d'; border = C.rose; tc = C.rose } }
          return <button key={i} onClick={() => choose(i)} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 10, padding: '10px 14px', color: tc, fontSize: 14, textAlign: 'left', cursor: selected !== null ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}><span style={{ opacity: 0.4, marginRight: 8 }}>{['A','B','C','D'][i]}.</span>{opt}</button>
        })}
      </div>
      {selected !== null && (
        <>
          <div style={{ padding: '12px 14px', borderRadius: 10, marginBottom: 12, background: selected === q.answer ? '#0d2a0d' : '#2a0d0d', border: `1px solid ${selected === q.answer ? C.mint : C.rose}44` }}>
            <div style={{ fontWeight: 700, color: selected === q.answer ? C.mint : C.rose, marginBottom: 4, fontSize: 13 }}>{selected === q.answer ? '✅ Correct!' : '❌ Not quite!'}</div>
            <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>💡 {q.funFact}</div>
          </div>
          <button onClick={next} style={{ width: '100%', padding: '11px', background: color, color: '#0d0d14', border: 'none', borderRadius: 10, fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
            {idx + 1 >= questions.length ? 'See Score 🏁' : 'Next ->'}
          </button>
        </>
      )}
    </div>
  )
}

// -- Domain Views ------------------------------------------------------------
function NewsView({ data, color, onXP, readSet, onRead, onProgress }) {
  if (!data?.segments) return null

  // Count total cards and read cards for progress
  const allCards = data.segments.flatMap((seg, si) => seg.stories.map((_, j) => `seg${si}-story${j}`))
  const readCount = allCards.filter(id => readSet.has(id)).length
  useEffect(() => { onProgress(readCount, allCards.length) }, [readCount])

  return <div>
    {data.segments.map((seg, si) => {
      const segCardIds = seg.stories.map((_, j) => `seg${si}-story${j}`)
      const segRead = segCardIds.filter(id => readSet.has(id)).length
      const segDone = segRead === segCardIds.length

      return (
        <div key={si} style={{ marginBottom: 24 }}>
          {/* Section header with completion indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: seg.color || color, textTransform: 'uppercase', letterSpacing: '0.1em', flex: 1 }}>
              {segDone ? '✅ ' : ''}{seg.name}
            </div>
            <span style={{ fontSize: 11, color: segDone ? C.mint : C.muted, fontWeight: 700 }}>
              {segRead}/{segCardIds.length}
            </span>
          </div>
          <ProgressBar value={segRead} total={segCardIds.length} color={seg.color || color} height={3} />
          <div style={{ marginTop: 10 }}>
            {seg.stories.map((s, j) => {
              const cardId = `seg${si}-story${j}`
              return (
                <Card key={j} emoji="📰" title={s.headline} color={color} mnemonic={s.mnemonic} cardId={cardId} readSet={readSet} onRead={onRead}>
                  <ELI5 text={s.eli5} color={color} />
                  <ActionRow label="Why care" text={s.whyItMatters} color={color} />
                </Card>
              )
            })}
          </div>
        </div>
      )
    })}
    <SectionHeader text="🧩 Test Yourself" color={color} />
    <Quiz questions={data.quiz} color={color} onXP={onXP} />
  </div>
}

function MarketsView({ data, color, onXP, readSet, onRead, onProgress }) {
  if (!data?.globalPulse) return null
  const im = data.indianMarket
  const allCards = ['pulse', 'bazaar', 'stock0', 'stock1', 'stock2', 'ipo', 'lesson']
  const readCount = allCards.filter(id => readSet.has(id)).length
  useEffect(() => { onProgress(readCount, allCards.length) }, [readCount])

  return <div>
    <Card emoji="🌊" title="The World's Money River Today" color={color} cardId="pulse" readSet={readSet} onRead={onRead}>
      <ELI5 text={data.globalPulse.eli5} color={color} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{data.globalPulse.keyThings?.map((k, i) => <Tag key={i} label={k} color={color} />)}</div>
    </Card>
    <Card emoji="🎪" title="India's Stock Bazaar" color={color} cardId="bazaar" readSet={readSet} onRead={onRead}><ELI5 text={im?.eli5} color={color} /></Card>
    <SectionHeader text="🚀 3 Stocks to Watch" color={color} />
    {im?.breakouts?.map((b, i) => (
      <Card key={i} emoji="📈" title={b.name} color={color} cardId={`stock${i}`} readSet={readSet} onRead={onRead}>
        <ELI5 text={b.whyExciting} color={color} />
        <ActionRow label="Risk" text={b.risk} color={C.rose} />
      </Card>
    ))}
    <Card emoji="🎟️" title={`IPO: ${im?.ipoSpot?.name}`} color={color} cardId="ipo" readSet={readSet} onRead={onRead}>
      <div style={{ marginBottom: 10 }}><span style={{ padding: '4px 16px', borderRadius: 20, fontWeight: 800, fontSize: 13, background: im?.ipoSpot?.verdict === 'Apply' ? '#0d2a0d' : im?.ipoSpot?.verdict === 'Avoid' ? '#2a0d0d' : '#2a2a0d', color: im?.ipoSpot?.verdict === 'Apply' ? C.mint : im?.ipoSpot?.verdict === 'Avoid' ? C.rose : C.lemon }}>{im?.ipoSpot?.verdict}</span></div>
      <ELI5 text={im?.ipoSpot?.eli5} color={color} />
    </Card>
    <Card emoji="📖" title={im?.lessonOfDay?.title} color={color} mnemonic={im?.lessonOfDay?.mnemonic} cardId="lesson" readSet={readSet} onRead={onRead}><ELI5 text={im?.lessonOfDay?.story} color={color} /></Card>
    <div style={{ fontSize: 11, color: C.muted, marginBottom: 16, fontStyle: 'italic' }}>⚠️ Educational only. Not SEBI-registered advice. Do your own research.</div>
    <SectionHeader text="🧩 Test Yourself" color={color} />
    <Quiz questions={data.quiz} color={color} onXP={onXP} />
  </div>
}

function GenericView({ data, color, onXP, sections, readSet, onRead, onProgress }) {
  const allCards = sections.filter(sec => data?.[sec.key]).map(sec => sec.key)
  const readCount = allCards.filter(id => readSet.has(id)).length
  useEffect(() => { onProgress(readCount, allCards.length) }, [readCount])

  return <div>
    {sections.map((sec, i) => {
      const block = data?.[sec.key]
      if (!block) return null
      return (
        <Card key={i} emoji={sec.emoji} title={block[sec.titleKey] || sec.fallback || sec.key} color={color} mnemonic={block[sec.mnemonicKey]} cardId={sec.key} readSet={readSet} onRead={onRead}>
          {sec.eli5Key && <ELI5 text={block[sec.eli5Key]} color={color} />}
          {sec.extraKeys?.map((ex, j) => block[ex.key] && <ActionRow key={j} label={ex.label} text={Array.isArray(block[ex.key]) ? block[ex.key].join(' -> ') : block[ex.key]} color={ex.rose ? C.rose : color} />)}
        </Card>
      )
    })}
    <SectionHeader text="🧩 Test Yourself" color={color} />
    <Quiz questions={data?.quiz} color={color} onXP={onXP} />
  </div>
}

function PsychView({ data, color, onXP, readSet, onRead, onProgress }) {
  if (!data?.mindTrick) return null
  return <GenericView data={data} color={color} onXP={onXP} readSet={readSet} onRead={onRead} onProgress={onProgress} sections={[
    { key:'mindTrick', emoji:'🧠', titleKey:'name', eli5Key:'eli5', extraKeys:[{label:'Real Life',key:'realLife'}], mnemonicKey:'mnemonic' },
    { key:'bodyLanguage', emoji:'👁️', titleKey:'signal', eli5Key:'eli5', extraKeys:[{label:'Use It',key:'howToUse'}], mnemonicKey:'mnemonic' },
    { key:'superpower', emoji:'⚡', titleKey:'name', eli5Key:'story', extraKeys:[{label:'Shield',key:'shield',rose:true}], mnemonicKey:'mnemonic' },
  ]} />
}

function LeadView({ data, color, onXP, readSet, onRead, onProgress }) {
  if (!data?.leaderMove) return null
  return <GenericView data={data} color={color} onXP={onXP} readSet={readSet} onRead={onRead} onProgress={onProgress} sections={[
    { key:'leaderMove', emoji:'👑', titleKey:'name', eli5Key:'story', extraKeys:[{label:'Do Today',key:'doThis'}], mnemonicKey:'mnemonic' },
    { key:'visionarySecret', emoji:'🔭', titleKey:'concept', eli5Key:'eli5', extraKeys:[{label:'Exercise',key:'exercise'}], mnemonicKey:'mnemonic', fallback:'Visionary Thinking' },
    { key:'eliteHabit', emoji:'💎', titleKey:'habit', eli5Key:'whyItWorks', extraKeys:[{label:'Who & How',key:'whoAndHow'}], mnemonicKey:'mnemonic' },
    { key:'sigmaWisdom', emoji:'🗿', titleKey:'lesson', eli5Key:'story', extraKeys:[{label:'Do Now',key:'action'}], mnemonicKey:'mnemonic' },
  ]} />
}

function WealthView({ data, color, onXP, readSet, onRead, onProgress }) {
  if (!data?.wealthSecret) return null
  const allCards = ['wealthSecret','moneyMachine','mindsetFlip','magicNumber']
  const readCount = allCards.filter(id => readSet.has(id)).length
  useEffect(() => { onProgress(readCount, allCards.length) }, [readCount])
  return <div>
    <Card emoji="🌱" title={data.wealthSecret.name} color={color} mnemonic={data.wealthSecret.mnemonic} cardId="wealthSecret" readSet={readSet} onRead={onRead}>
      <ELI5 text={data.wealthSecret.story} color={color} />
      <ActionRow label="This Week" text={data.wealthSecret.action} color={color} />
    </Card>
    <Card emoji="🏧" title={data.moneyMachine.type} color={color} mnemonic={data.moneyMachine.mnemonic} cardId="moneyMachine" readSet={readSet} onRead={onRead}>
      <ELI5 text={data.moneyMachine.eli5} color={color} />
      <ActionRow label="India Angle" text={data.moneyMachine.indiaAngle} color={color} />
    </Card>
    <Card emoji="🔄" title="Mindset Flip" color={color} mnemonic={data.mindsetFlip?.mnemonic} cardId="mindsetFlip" readSet={readSet} onRead={onRead}>
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
    <Card emoji="🔢" title={data.magicNumber?.number} color={color} mnemonic={data.magicNumber?.mnemonic} cardId="magicNumber" readSet={readSet} onRead={onRead}>
      <ELI5 text={data.magicNumber?.eli5} color={color} />
    </Card>
    <SectionHeader text="🧩 Test Yourself" color={color} />
    <Quiz questions={data.quiz} color={color} onXP={onXP} />
  </div>
}

function CommView({ data, color, onXP, readSet, onRead, onProgress }) {
  if (!data?.speakingSkill) return null
  return <GenericView data={data} color={color} onXP={onXP} readSet={readSet} onRead={onRead} onProgress={onProgress} sections={[
    { key:'speakingSkill', emoji:'🎤', titleKey:'name', eli5Key:'story', extraKeys:[{label:'Drill',key:'drill'}], mnemonicKey:'mnemonic' },
    { key:'negotiationMove', emoji:'🤝', titleKey:'tactic', eli5Key:'eli5', extraKeys:[{label:'Script',key:'script'}], mnemonicKey:'mnemonic' },
    { key:'officeWin', emoji:'🏢', titleKey:'rule', eli5Key:'story', extraKeys:[{label:'Mistake',key:'mistake',rose:true}], mnemonicKey:'mnemonic' },
    { key:'confidenceHack', emoji:'💪', titleKey:'technique', eli5Key:'science', extraKeys:[{label:'Do Now',key:'doItNow'}], mnemonicKey:'mnemonic' },
  ]} />
}

function MindView({ data, color, onXP, readSet, onRead, onProgress }) {
  if (!data?.brainHack) return null
  return <GenericView data={data} color={color} onXP={onXP} readSet={readSet} onRead={onRead} onProgress={onProgress} sections={[
    { key:'brainHack', emoji:'🚀', titleKey:'name', eli5Key:'eli5', extraKeys:[{label:'Protocol',key:'protocol'}], mnemonicKey:'mnemonic' },
    { key:'disciplineCode', emoji:'🐸', titleKey:'principle', eli5Key:'story', extraKeys:[{label:'Today',key:'todayAction'}], mnemonicKey:'mnemonic' },
    { key:'impulseKiller', emoji:'👾', titleKey:'urge', eli5Key:'eli5', extraKeys:[{label:'Interrupt',key:'interrupt'}], mnemonicKey:'mnemonic' },
    { key:'bodyUpgrade', emoji:'🥶', titleKey:'practice', eli5Key:'eli5', extraKeys:[{label:'Min Dose',key:'minimumDose'}], mnemonicKey:'mnemonic' },
  ]} />
}

function KnowView({ data, color, onXP, readSet, onRead, onProgress }) {
  if (!data?.mathMagic) return null
  return <GenericView data={data} color={color} onXP={onXP} readSet={readSet} onRead={onRead} onProgress={onProgress} sections={[
    { key:'mathMagic', emoji:'✨', titleKey:'concept', eli5Key:'eli5', extraKeys:[{label:'Real World',key:'realWorldUse'}], mnemonicKey:'mnemonic' },
    { key:'scienceWow', emoji:'🌌', titleKey:'concept', eli5Key:'eli5', extraKeys:[{label:'Mind Blow',key:'mindBlow'}], mnemonicKey:'mnemonic' },
    { key:'historyStory', emoji:'📜', titleKey:'event', eli5Key:'story', extraKeys:[{label:'Lesson',key:'lesson'}], mnemonicKey:'mnemonic' },
    { key:'earthSecret', emoji:'🗺️', titleKey:'place', eli5Key:'secret', extraKeys:[{label:'Your Edge',key:'edge'}], mnemonicKey:'mnemonic' },
  ]} />
}

function AIView({ data, color, onXP, readSet, onRead, onProgress }) {
  if (!data?.toolSpotlight) return null
  const allCards = ['toolSpotlight','workflowWin','promptOfDay','futureWatch']
  const readCount = allCards.filter(id => readSet.has(id)).length
  useEffect(() => { onProgress(readCount, allCards.length) }, [readCount])
  return <div>
    <Card emoji="🤖" title={data.toolSpotlight.name} color={color} mnemonic={data.toolSpotlight.mnemonic} cardId="toolSpotlight" readSet={readSet} onRead={onRead}>
      <Tag label={data.toolSpotlight.category} color={color} />
      <ELI5 text={data.toolSpotlight.eli5} color={color} />
      <ActionRow label="Secret Move" text={data.toolSpotlight.secretMove} color={color} />
    </Card>
    <Card emoji="⚙️" title={data.workflowWin.title} color={color} mnemonic={data.workflowWin.mnemonic} cardId="workflowWin" readSet={readSet} onRead={onRead}>
      <ELI5 text={data.workflowWin.problem} color={color} />
      <ol style={{ paddingLeft: 18, margin: '8px 0 10px', color: C.muted, fontSize: 13, lineHeight: 2 }}>{data.workflowWin.steps?.map((s, i) => <li key={i}>{s}</li>)}</ol>
      <ActionRow label="Time Saved" text={data.workflowWin.timeSaved} color={color} />
    </Card>
    <Card emoji="📋" title={`Prompt: ${data.promptOfDay.purpose}`} color={color} mnemonic={data.promptOfDay.mnemonic} cardId="promptOfDay" readSet={readSet} onRead={onRead}>
      <Tag label={`Use on: ${data.promptOfDay.where}`} color={color} />
      <div style={{ marginTop: 10, padding: '14px', background: '#080812', borderRadius: 10, fontFamily: 'monospace', fontSize: 13, color: '#a8e6c0', lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>{data.promptOfDay.prompt}</div>
    </Card>
    <Card emoji="🔮" title={data.futureWatch.trend} color={color} mnemonic={data.futureWatch.mnemonic} cardId="futureWatch" readSet={readSet} onRead={onRead}>
      <ELI5 text={data.futureWatch.eli5} color={color} />
      <ActionRow label="Your Move" text={data.futureWatch.yourMove} color={color} />
    </Card>
    <SectionHeader text="🧩 Test Yourself" color={color} />
    <Quiz questions={data.quiz} color={color} onXP={onXP} />
  </div>
}

function TravelView({ data, color, onXP, readSet, onRead, onProgress }) {
  if (!data?.destination) return null
  const allCards = ['destination','visaTip','culturalCode']
  const readCount = allCards.filter(id => readSet.has(id)).length
  useEffect(() => { onProgress(readCount, allCards.length) }, [readCount])
  return <div>
    <Card emoji="🗺️" title={`${data.destination.country} · ${data.destination.region}`} color={color} mnemonic={data.destination.mnemonic} cardId="destination" readSet={readSet} onRead={onRead}>
      <ELI5 text={data.destination.eli5} color={color} />
      <ActionRow label="Best Time" text={data.destination.bestTime} color={color} />
      <ActionRow label="Hidden Gem" text={data.destination.hiddenGem} color={color} />
    </Card>
    <Card emoji="📋" title={`Visa: ${data.visaTip.focus}`} color={color} mnemonic={data.visaTip.mnemonic} cardId="visaTip" readSet={readSet} onRead={onRead}>
      <ELI5 text={data.visaTip.eli5} color={color} />
      <ActionRow label="Golden Tip" text={data.visaTip.goldenTip} color={color} />
    </Card>
    <Card emoji="🤲" title={`Culture: ${data.culturalCode.culture}`} color={color} mnemonic={data.culturalCode.mnemonic} cardId="culturalCode" readSet={readSet} onRead={onRead}>
      <ActionRow label="Do This" text={data.culturalCode.doThis} color={color} />
      <ActionRow label="Never Do" text={data.culturalCode.neverDoThis} color={C.rose} />
    </Card>
    <SectionHeader text="🧩 Test Yourself" color={color} />
    <Quiz questions={data.quiz} color={color} onXP={onXP} />
  </div>
}

const RENDERERS = { news:NewsView, markets:MarketsView, psychology:PsychView, leadership:LeadView, wealth:WealthView, communication:CommView, mind:MindView, knowledge:KnowView, ai:AIView, travel:TravelView }

// -- Overall Daily Progress Bar ----------------------------------------------
function DailyProgress({ domainProgress, activeDate }) {
  const completedDomains = Object.values(domainProgress).filter(d => d.read === d.total && d.total > 0).length
  const totalDomains = DOMAINS.length
  const pct = Math.round((completedDomains / totalDomains) * 100)

  if (completedDomains === 0) return null

  return (
    <div style={{ padding: '10px 14px', background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          📅 Today's Brief
        </span>
        <span style={{ fontSize: 12, fontWeight: 800, color: pct === 100 ? C.mint : C.lavender }}>
          {pct === 100 ? '🏆 Complete!' : `${completedDomains}/${totalDomains} topics done`}
        </span>
      </div>
      <ProgressBar value={completedDomains} total={totalDomains} color={C.lavender} height={6} />
      {pct === 100 && (
        <div style={{ marginTop: 8, fontSize: 12, color: C.mint, textAlign: 'center', fontWeight: 700 }}>
          You've read everything for {activeDate}! 🎉
        </div>
      )}
    </div>
  )
}

// -- Helpers ----------------------------------------------------------------
function fmtDate(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}
function fmtDateShort(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
}

function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 640)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 640)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return mobile
}

// -- XP Bar -----------------------------------------------------------------
function XPBar({ xp, mobile }) {
  const level = Math.floor(xp / 100) + 1
  const pct = xp % 100
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ fontSize: mobile ? 11 : 12, fontWeight: 800, color: C.lavender, whiteSpace: 'nowrap' }}>LVL {level}</div>
      <div style={{ width: mobile ? 50 : 80, height: 5, background: C.dim, borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg,${C.lavender},${C.mint})`, borderRadius: 3, transition: 'width 0.5s' }} />
      </div>
      <div style={{ fontSize: 11, color: C.muted, whiteSpace: 'nowrap' }}>{xp} XP</div>
    </div>
  )
}

// -- Persistent Progress Store (localStorage) --------------------------------
// localStorage persists across refreshes on the same device.
// Cross-device: user can export/import progress via a share code.

const STORAGE_KEY = 'curio_progress_v2'
const XP_KEY = 'curio_xp_v2'

function serializeReadState(readState) {
  const out = {}
  for (const [date, domains] of Object.entries(readState)) {
    out[date] = {}
    for (const [domain, cardSet] of Object.entries(domains)) {
      out[date][domain] = cardSet instanceof Set ? [...cardSet] : (Array.isArray(cardSet) ? cardSet : [])
    }
  }
  return out
}

function deserializeReadState(raw) {
  const out = {}
  for (const [date, domains] of Object.entries(raw || {})) {
    out[date] = {}
    for (const [domain, cards] of Object.entries(domains || {})) {
      out[date][domain] = new Set(Array.isArray(cards) ? cards : [])
    }
  }
  return out
}

function loadLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? deserializeReadState(JSON.parse(raw)) : {}
  } catch { return {} }
}

function saveLocal(readState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializeReadState(readState)))
  } catch {}
}

function loadXP() {
  try { return parseInt(localStorage.getItem(XP_KEY) || '0') } catch { return 0 }
}

function saveXP(xp) {
  try { localStorage.setItem(XP_KEY, String(xp)) } catch {}
}

function useDebounce(fn, delay) {
  const timer = React.useRef(null)
  return React.useCallback((...args) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => fn(...args), delay)
  }, [])
}

// -- Bottom Nav (mobile) ----------------------------------------------------
function BottomNav({ domains, activeId, setActiveId, domainProgress }) {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 300,
      background: C.surface, borderTop: `1px solid ${C.border}`,
      display: 'flex', overflowX: 'auto', padding: '0 4px',
      WebkitOverflowScrolling: 'touch',
    }}>
      {domains.map(d => {
        const isActive = activeId === d.id
        const prog = domainProgress[d.id]
        const done = prog?.total > 0 && prog.read === prog.total
        return (
          <button key={d.id} onClick={() => setActiveId(d.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 2, padding: '8px 10px', minWidth: 60, flexShrink: 0,
            background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            borderTop: isActive ? `2px solid ${d.color}` : '2px solid transparent',
            color: isActive ? d.color : done ? C.mint : C.muted,
            position: 'relative'
          }}>
            <span style={{ fontSize: 18 }}>{done ? '✅' : d.emoji}</span>
            <span style={{ fontSize: 9, fontWeight: isActive ? 800 : 500, whiteSpace: 'nowrap', letterSpacing: '0.03em' }}>
              {d.label.split(' ')[0]}
            </span>
          </button>
        )
      })}
    </div>
  )
}

// -- Share Modal -------------------------------------------------------------
function ShareModal({ getShareCode, importShareCode, onClose }) {
  const [mode, setMode] = useState('export') // export | import
  const [code, setCode] = useState('')
  const [msg, setMsg] = useState('')

  const exportCode = getShareCode()

  const copyCode = () => {
    navigator.clipboard?.writeText(exportCode).then(() => setMsg('✅ Copied! Paste this on your other device.'))
  }

  const doImport = () => {
    if (!code.trim()) return setMsg('Paste your sync code first.')
    const ok = importShareCode(code)
    setMsg(ok ? '✅ Progress imported! Refresh to see it.' : '❌ Invalid code. Make sure you copied it correctly.')
  }

  return (
    <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, left: 0, background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16, zIndex: 500, boxShadow: '0 8px 32px #00000088' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ fontWeight: 800, fontSize: 14, color: C.text }}>📲 Sync Across Devices</div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: C.muted, fontSize: 18, cursor: 'pointer', padding: 0 }}>x</button>
      </div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
        <button onClick={() => setMode('export')} style={{ flex: 1, padding: '7px', borderRadius: 8, border: `1px solid ${mode === 'export' ? C.mint : C.border}`, background: mode === 'export' ? `${C.mint}22` : 'transparent', color: mode === 'export' ? C.mint : C.muted, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 700 }}>Export from this device</button>
        <button onClick={() => setMode('import')} style={{ flex: 1, padding: '7px', borderRadius: 8, border: `1px solid ${mode === 'import' ? C.lavender : C.border}`, background: mode === 'import' ? `${C.lavender}22` : 'transparent', color: mode === 'import' ? C.lavender : C.muted, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 700 }}>Import to this device</button>
      </div>
      {mode === 'export' ? (
        <div>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 8 }}>Copy this code -> paste it on your other device using "Import"</div>
          <div style={{ background: C.surface, borderRadius: 8, padding: '10px 12px', fontFamily: 'monospace', fontSize: 11, color: C.text, wordBreak: 'break-all', maxHeight: 80, overflowY: 'auto', marginBottom: 10, border: `1px solid ${C.border}` }}>{exportCode || 'No progress yet  -  read some cards first!'}</div>
          {exportCode && <button onClick={copyCode} style={{ width: '100%', padding: '9px', background: C.mint, color: '#0d0d14', border: 'none', borderRadius: 8, fontWeight: 800, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Copy Sync Code</button>}
        </div>
      ) : (
        <div>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 8 }}>Paste the sync code from your other device</div>
          <textarea
            value={code} onChange={e => setCode(e.target.value)}
            placeholder="Paste sync code here..."
            style={{ width: '100%', height: 80, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 12px', color: C.text, fontSize: 11, fontFamily: 'monospace', resize: 'none', marginBottom: 10, boxSizing: 'border-box' }}
          />
          <button onClick={doImport} style={{ width: '100%', padding: '9px', background: C.lavender, color: '#0d0d14', border: 'none', borderRadius: 8, fontWeight: 800, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Import Progress</button>
        </div>
      )}
      {msg && <div style={{ marginTop: 10, fontSize: 12, color: msg.startsWith('✅') ? C.mint : C.rose, textAlign: 'center' }}>{msg}</div>}
    </div>
  )
}

// -- Main App ----------------------------------------------------------------
export default function App() {
  const [activeDate, setActiveDate] = useState(AVAILABLE_DATES[AVAILABLE_DATES.length - 1])
  const [activeId, setActiveId] = useState('news')
  const [xp, setXp] = useState(() => loadXP())
  const [showDates, setShowDates] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const mobile = useIsMobile()

  // Read state  -  loaded from localStorage immediately, persists across refreshes
  const [readState, setReadState] = useState(() => loadLocal())
  const [domainProgress, setDomainProgress] = useState({})

  const getReadSet = (date, domain) => readState[date]?.[domain] || new Set()

  const handleRead = (cardId) => {
    const dateMap = { ...(readState[activeDate] || {}) }
    const domainSet = new Set(dateMap[activeId] || [])
    if (domainSet.has(cardId)) domainSet.delete(cardId)
    else domainSet.add(cardId)
    dateMap[activeId] = domainSet
    const newState = { ...readState, [activeDate]: dateMap }
    setReadState(newState)
    saveLocal(newState)
  }

  const handleProgress = (read, total) => {
    setDomainProgress(prev => {
      const curr = prev[activeId]
      if (curr?.read === read && curr?.total === total) return prev
      return { ...prev, [activeId]: { read, total } }
    })
  }

  const updateXP = (newXP) => {
    setXp(newXP)
    saveXP(newXP)
  }

  // Reset domainProgress when switching dates so progress recomputes from readState
  useEffect(() => { setDomainProgress({}) }, [activeDate])

  // Export progress as a share code (base64 of serialized readState)
  const getShareCode = () => {
    try {
      const data = { readState: serializeReadState(readState), xp }
      return btoa(JSON.stringify(data))
    } catch { return '' }
  }

  // Import progress from a share code
  const importShareCode = (code) => {
    try {
      const data = JSON.parse(atob(code.trim()))
      if (data.readState) {
        const merged = deserializeReadState(data.readState)
        setReadState(merged)
        saveLocal(merged)
      }
      if (data.xp) { setXp(data.xp); saveXP(data.xp) }
      return true
    } catch { return false }
  }

  const active = DOMAINS.find(d => d.id === activeId) || DOMAINS[0]
  const Renderer = RENDERERS[activeId]
  const brief = ALL_BRIEFS[activeDate]
  const data = brief?.[activeId]
  const readSet = getReadSet(activeDate, activeId)
  const domProg = domainProgress[activeId]
  const domainPct = domProg?.total > 0 ? Math.round((domProg.read / domProg.total) * 100) : 0

  const closeAll = () => { setShowDates(false); setShowMenu(false); setShowShareModal(false) }

  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: "'Inter',-apple-system,sans-serif", color: C.text }}>

      {/* -- HEADER -- */}
      <div style={{
        background: C.surface, borderBottom: `1px solid ${C.border}`,
        padding: mobile ? '10px 14px' : '14px 20px',
        position: 'sticky', top: 0, zIndex: 200
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>

          {/* Top row: logo + share + xp */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: mobile ? 18 : 22, fontWeight: 900, letterSpacing: '-0.03em', background: `linear-gradient(120deg,${C.lavender},${C.mint},${C.peach})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              🌌 CURIO BRIEF
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                onClick={() => setShowShareModal(s => !s)}
                title="Sync progress across devices"
                style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 8, padding: '4px 10px', color: C.muted, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}
              >📲</button>
              <XPBar xp={xp} mobile={mobile} />
            </div>
          </div>

          {/* Share/Sync Modal */}
          {showShareModal && (
            <ShareModal
              getShareCode={getShareCode}
              importShareCode={importShareCode}
              onClose={() => setShowShareModal(false)}
            />
          )}

          {/* Controls row */}
          <div style={{ display: 'flex', gap: 8, marginTop: 10, alignItems: 'center' }}>

            {/* Date picker */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => { setShowDates(s => !s); setShowMenu(false) }} style={{
                padding: mobile ? '6px 10px' : '7px 14px',
                background: C.card, border: `1px solid ${C.mint}55`, borderRadius: 8,
                color: C.mint, fontSize: mobile ? 12 : 13, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 4
              }}>
                📅 {mobile ? fmtDateShort(activeDate) : fmtDate(activeDate)} ▾
              </button>
              {showDates && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 6px)', left: 0,
                  background: C.card, border: `1px solid ${C.border}`, borderRadius: 12,
                  padding: 12, zIndex: 400, minWidth: 200,
                  display: 'flex', flexDirection: 'column', gap: 4,
                  boxShadow: '0 8px 32px #00000088'
                }}>
                  <div style={{ fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>📅 Available Briefs</div>
                  {AVAILABLE_DATES.slice().reverse().map(d => {
                    // Check if this date is fully completed from persisted readState
                    const dateReadState = readState[d] || {}
                    const domainsWithData = DOMAINS.filter(dom => ALL_BRIEFS[d]?.[dom.id])
                    const completedCount = domainsWithData.filter(dom => {
                      const cards = dateReadState[dom.id]
                      return cards instanceof Set ? cards.size > 0 : false
                    }).length
                    const isDateDone = domainsWithData.length > 0 && completedCount === domainsWithData.length
                    return (
                      <button key={d} onClick={() => { setActiveDate(d); setShowDates(false); setActiveId('news') }} style={{
                        padding: '10px 12px', borderRadius: 8, fontSize: 14, cursor: 'pointer',
                        fontFamily: 'inherit', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        background: activeDate === d ? `${C.mint}22` : 'transparent',
                        border: `1px solid ${activeDate === d ? C.mint : 'transparent'}`,
                        color: activeDate === d ? C.mint : C.text,
                        fontWeight: activeDate === d ? 700 : 400
                      }}>
                        <span>{fmtDate(d)}</span>
                        {isDateDone && <span style={{ fontSize: 12 }}>✅</span>}
                        {!isDateDone && completedCount > 0 && <span style={{ fontSize: 10, color: C.muted }}>{completedCount}/{domainsWithData.length}</span>}
                      </button>
                    )
                  })}
                  <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 6, paddingTop: 6, fontSize: 11, color: C.dim, lineHeight: 1.6 }}>
                    More dates added daily!<br />Ask Claude to generate.
                  </div>
                </div>
              )}
            </div>

            {/* Desktop: domain tab strip | Mobile: menu button */}
            {!mobile && (
              <div style={{ display: 'flex', gap: 2, overflowX: 'auto', flex: 1 }}>
                {DOMAINS.map(d => {
                  const prog = domainProgress[d.id]
                  const done = prog?.total > 0 && prog.read === prog.total
                  return (
                    <button key={d.id} onClick={() => setActiveId(d.id)} style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      padding: '7px 11px', borderRadius: '8px 8px 0 0',
                      border: `1px solid ${activeId === d.id ? d.color + '66' : C.border}`,
                      borderBottom: activeId === d.id ? `2px solid ${d.color}` : `1px solid ${C.border}`,
                      background: activeId === d.id ? `${d.color}12` : 'transparent',
                      cursor: 'pointer', fontSize: 11, fontWeight: activeId === d.id ? 800 : 500,
                      color: activeId === d.id ? d.color : done ? C.mint : C.muted,
                      whiteSpace: 'nowrap', fontFamily: 'inherit', transition: 'all 0.15s', flexShrink: 0
                    }}>
                      <span>{d.emoji}</span>
                      <span>{d.label}</span>
                      {done && <span style={{ fontSize: 9, color: C.mint }}>(check)</span>}
                    </button>
                  )
                })}
              </div>
            )}

            {mobile && (
              <div style={{ position: 'relative', marginLeft: 'auto' }}>
                <button onClick={() => { setShowMenu(s => !s); setShowDates(false) }} style={{
                  padding: '6px 12px', background: `${active.color}22`,
                  border: `1px solid ${active.color}55`, borderRadius: 8,
                  color: active.color, fontSize: 12, fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 5
                }}>
                  {active.emoji} {active.label} ▾
                </button>
                {showMenu && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 6px)', right: 0,
                    background: C.card, border: `1px solid ${C.border}`, borderRadius: 12,
                    padding: 8, zIndex: 400, width: 200,
                    display: 'flex', flexDirection: 'column', gap: 2,
                    boxShadow: '0 8px 32px #00000088', maxHeight: '70vh', overflowY: 'auto'
                  }}>
                    {DOMAINS.map(d => (
                      <button key={d.id} onClick={() => { setActiveId(d.id); setShowMenu(false) }} style={{
                        padding: '10px 12px', borderRadius: 8, fontSize: 13, cursor: 'pointer',
                        fontFamily: 'inherit', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8,
                        background: activeId === d.id ? `${d.color}22` : 'transparent',
                        border: `1px solid ${activeId === d.id ? d.color : 'transparent'}`,
                        color: activeId === d.id ? d.color : C.text,
                        fontWeight: activeId === d.id ? 700 : 400
                      }}>
                        <span style={{ fontSize: 16 }}>{d.emoji}</span>
                        <span>{d.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* -- CONTENT -- */}
      <div style={{
        maxWidth: 760, margin: '0 auto',
        padding: mobile ? `16px 12px ${mobile ? '90px' : '40px'}` : '24px 20px 60px'
      }}>

        {/* Domain header with progress */}
        {active && brief && (
          <div style={{
            marginBottom: 16, padding: mobile ? '12px 14px' : '14px 18px',
            background: `${active.color}0d`, border: `1px solid ${active.color}33`, borderRadius: 14
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: mobile ? 20 : 24, marginBottom: 4 }}>{active.emoji}</div>
                <div style={{ fontSize: mobile ? 15 : 17, fontWeight: 900, color: active.color, marginBottom: 2 }}>{active.label}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{active.desc} · {fmtDate(activeDate)}</div>
              </div>
              {domProg?.total > 0 && (
                <div style={{ textAlign: 'right', minWidth: 60 }}>
                  <div style={{ fontSize: domainPct === 100 ? 20 : 13, fontWeight: 800, color: domainPct === 100 ? C.mint : active.color, marginBottom: 4 }}>
                    {domainPct === 100 ? '✅' : `${domainPct}%`}
                  </div>
                  <div style={{ fontSize: 10, color: C.muted }}>{domProg.read}/{domProg.total} read</div>
                </div>
              )}
            </div>
            {domProg?.total > 0 && (
              <ProgressBar value={domProg.read} total={domProg.total} color={active.color} height={5} />
            )}
          </div>
        )}

        {/* Overall daily progress  -  uses domainProgress for currently-viewed domains, readState for others */}
        {brief && Object.keys(domainProgress).length > 0 && (
          <DailyProgress domainProgress={domainProgress} activeDate={fmtDate(activeDate)} />
        )}

        {/* No brief state */}
        {!brief && (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: C.card, borderRadius: 16, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 10 }}>No brief for {fmtDate(activeDate)}</div>
            <div style={{ fontSize: 14, color: C.muted, maxWidth: 320, margin: '0 auto', lineHeight: 1.8 }}>
              Ask Claude: <strong style={{ color: C.lavender }}>"generate brief for [date]"</strong>
            </div>
            <div style={{ marginTop: 14, fontSize: 12, color: C.dim }}>Available: {AVAILABLE_DATES.map(d => fmtDateShort(d)).join(', ')}</div>
          </div>
        )}

        {/* Domain content */}
        {brief && Renderer && data && (
          <Renderer data={data} color={active.color} onXP={(earned) => updateXP(xp + earned)} readSet={readSet} onRead={handleRead} onProgress={handleProgress} />
        )}
        {brief && (!Renderer || !data) && (
          <div style={{ textAlign: 'center', padding: '40px', color: C.muted, fontSize: 14 }}>Content not available for this section.</div>
        )}
      </div>

      {/* -- MOBILE BOTTOM NAV -- */}
      {mobile && <BottomNav domains={DOMAINS} activeId={activeId} setActiveId={(id) => { setActiveId(id); closeAll() }} domainProgress={domainProgress} />}

      {/* Backdrop */}
      {(showDates || showMenu) && (
        <div onClick={closeAll} style={{ position: 'fixed', inset: 0, zIndex: 100 }} />
      )}

      <style>{`
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        html { font-size: 16px; }
        body { overscroll-behavior: none; }
        ::-webkit-scrollbar { width: 3px; height: 3px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.dim}; border-radius: 2px; }
        button { transition: opacity 0.15s; -webkit-tap-highlight-color: transparent; }
        button:active { opacity: 0.7; }
        @media (max-width: 640px) {
          input, select, textarea { font-size: 16px !important; }
        }
      `}</style>
    </div>
  )
}

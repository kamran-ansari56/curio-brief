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

const d0601 = {
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

const d0602 = {
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

const d0612 = {
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

const d0613 = {
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

const ALL_BRIEFS = { '2026-06-01': d0601, '2026-06-02': d0602, '2026-06-12': d0612, '2026-06-13': d0613 }

const AVAILABLE_DATES = Object.keys(ALL_BRIEFS).sort()

// ── UI Components ──────────────────────────────────────────────────────────────
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
        🧠 Memory Trick · {open ? 'tap to hide ▲' : 'tap to reveal ▼'}
      </span>
      {open && <div style={{ marginTop: 6, fontSize: 13, color: C.text, lineHeight: 1.6 }}>{text}</div>}
    </div>
  )
}

function Card({ emoji, title, color, children, mnemonic }) {
  const [open, setOpen] = useState(true)
  return (
    <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, marginBottom: 14, overflow: 'hidden' }}>
      <div onClick={() => setOpen(o => !o)} style={{ padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', borderBottom: open ? `1px solid ${C.border}` : 'none' }}>
        <span style={{ fontSize: 20 }}>{emoji}</span>
        <span style={{ flex: 1, fontWeight: 700, fontSize: 14, color: C.text, lineHeight: 1.3 }}>{title}</span>
        <span style={{ color: C.dim, fontSize: 12 }}>{open ? '▲' : '▼'}</span>
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
            {idx + 1 >= questions.length ? 'See Score 🏁' : 'Next →'}
          </button>
        </>
      )}
    </div>
  )
}

// ── Domain Views ────────────────────────────────────────────────────────────
function NewsView({ data, color, onXP }) {
  if (!data?.segments) return null
  return <div>
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
}

function MarketsView({ data, color, onXP }) {
  if (!data?.globalPulse) return null
  const im = data.indianMarket
  return <div>
    <Card emoji="🌊" title="The World's Money River Today" color={color}>
      <ELI5 text={data.globalPulse.eli5} color={color} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{data.globalPulse.keyThings?.map((k, i) => <Tag key={i} label={k} color={color} />)}</div>
    </Card>
    <Card emoji="🎪" title="India's Stock Bazaar" color={color}><ELI5 text={im?.eli5} color={color} /></Card>
    <SectionHeader text="🚀 3 Stocks to Watch" color={color} />
    {im?.breakouts?.map((b, i) => (
      <Card key={i} emoji="📈" title={b.name} color={color}>
        <ELI5 text={b.whyExciting} color={color} />
        <ActionRow label="Risk" text={b.risk} color={C.rose} />
      </Card>
    ))}
    <Card emoji="🎟️" title={`IPO: ${im?.ipoSpot?.name}`} color={color}>
      <div style={{ marginBottom: 10 }}><span style={{ padding: '4px 16px', borderRadius: 20, fontWeight: 800, fontSize: 13, background: im?.ipoSpot?.verdict === 'Apply' ? '#0d2a0d' : im?.ipoSpot?.verdict === 'Avoid' ? '#2a0d0d' : '#2a2a0d', color: im?.ipoSpot?.verdict === 'Apply' ? C.mint : im?.ipoSpot?.verdict === 'Avoid' ? C.rose : C.lemon }}>{im?.ipoSpot?.verdict}</span></div>
      <ELI5 text={im?.ipoSpot?.eli5} color={color} />
    </Card>
    <Card emoji="📖" title={im?.lessonOfDay?.title} color={color} mnemonic={im?.lessonOfDay?.mnemonic}><ELI5 text={im?.lessonOfDay?.story} color={color} /></Card>
    <div style={{ fontSize: 11, color: C.muted, marginBottom: 16, fontStyle: 'italic' }}>⚠️ Educational only. Not SEBI-registered advice. Do your own research.</div>
    <SectionHeader text="🧩 Test Yourself" color={color} />
    <Quiz questions={data.quiz} color={color} onXP={onXP} />
  </div>
}

function GenericView({ data, color, onXP, sections }) {
  return <div>
    {sections.map((sec, i) => {
      const block = data?.[sec.key]
      if (!block) return null
      return (
        <Card key={i} emoji={sec.emoji} title={block[sec.titleKey] || sec.fallback || sec.key} color={color} mnemonic={block[sec.mnemonicKey]}>
          {sec.eli5Key && <ELI5 text={block[sec.eli5Key]} color={color} />}
          {sec.extraKeys?.map((ex, j) => block[ex.key] && <ActionRow key={j} label={ex.label} text={Array.isArray(block[ex.key]) ? block[ex.key].join(' → ') : block[ex.key]} color={ex.rose ? C.rose : color} />)}
        </Card>
      )
    })}
    <SectionHeader text="🧩 Test Yourself" color={color} />
    <Quiz questions={data?.quiz} color={color} onXP={onXP} />
  </div>
}

function PsychView({ data, color, onXP }) {
  if (!data?.mindTrick) return null
  return <GenericView data={data} color={color} onXP={onXP} sections={[
    { key:'mindTrick', emoji:'🧠', titleKey:'name', eli5Key:'eli5', extraKeys:[{label:'Real Life',key:'realLife'}], mnemonicKey:'mnemonic' },
    { key:'bodyLanguage', emoji:'👁️', titleKey:'signal', eli5Key:'eli5', extraKeys:[{label:'Use It',key:'howToUse'}], mnemonicKey:'mnemonic' },
    { key:'superpower', emoji:'⚡', titleKey:'name', eli5Key:'story', extraKeys:[{label:'Shield',key:'shield',rose:true}], mnemonicKey:'mnemonic' },
  ]} />
}

function LeadView({ data, color, onXP }) {
  if (!data?.leaderMove) return null
  return <GenericView data={data} color={color} onXP={onXP} sections={[
    { key:'leaderMove', emoji:'👑', titleKey:'name', eli5Key:'story', extraKeys:[{label:'Do Today',key:'doThis'}], mnemonicKey:'mnemonic' },
    { key:'visionarySecret', emoji:'🔭', titleKey:'concept', eli5Key:'eli5', extraKeys:[{label:'Exercise',key:'exercise'}], mnemonicKey:'mnemonic', fallback:'Visionary Thinking' },
    { key:'eliteHabit', emoji:'💎', titleKey:'habit', eli5Key:'whyItWorks', extraKeys:[{label:'Who & How',key:'whoAndHow'}], mnemonicKey:'mnemonic' },
    { key:'sigmaWisdom', emoji:'🗿', titleKey:'lesson', eli5Key:'story', extraKeys:[{label:'Do Now',key:'action'}], mnemonicKey:'mnemonic' },
  ]} />
}

function WealthView({ data, color, onXP }) {
  if (!data?.wealthSecret) return null
  return <div>
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
}

function CommView({ data, color, onXP }) {
  if (!data?.speakingSkill) return null
  return <GenericView data={data} color={color} onXP={onXP} sections={[
    { key:'speakingSkill', emoji:'🎤', titleKey:'name', eli5Key:'story', extraKeys:[{label:'Drill',key:'drill'}], mnemonicKey:'mnemonic' },
    { key:'negotiationMove', emoji:'🤝', titleKey:'tactic', eli5Key:'eli5', extraKeys:[{label:'Script',key:'script'}], mnemonicKey:'mnemonic' },
    { key:'officeWin', emoji:'🏢', titleKey:'rule', eli5Key:'story', extraKeys:[{label:'Mistake',key:'mistake',rose:true}], mnemonicKey:'mnemonic' },
    { key:'confidenceHack', emoji:'💪', titleKey:'technique', eli5Key:'science', extraKeys:[{label:'Do Now',key:'doItNow'}], mnemonicKey:'mnemonic' },
  ]} />
}

function MindView({ data, color, onXP }) {
  if (!data?.brainHack) return null
  return <GenericView data={data} color={color} onXP={onXP} sections={[
    { key:'brainHack', emoji:'🚀', titleKey:'name', eli5Key:'eli5', extraKeys:[{label:'Protocol',key:'protocol'}], mnemonicKey:'mnemonic' },
    { key:'disciplineCode', emoji:'🐸', titleKey:'principle', eli5Key:'story', extraKeys:[{label:'Today',key:'todayAction'}], mnemonicKey:'mnemonic' },
    { key:'impulseKiller', emoji:'👾', titleKey:'urge', eli5Key:'eli5', extraKeys:[{label:'Interrupt',key:'interrupt'}], mnemonicKey:'mnemonic' },
    { key:'bodyUpgrade', emoji:'🥶', titleKey:'practice', eli5Key:'eli5', extraKeys:[{label:'Min Dose',key:'minimumDose'}], mnemonicKey:'mnemonic' },
  ]} />
}

function KnowView({ data, color, onXP }) {
  if (!data?.mathMagic) return null
  return <GenericView data={data} color={color} onXP={onXP} sections={[
    { key:'mathMagic', emoji:'✨', titleKey:'concept', eli5Key:'eli5', extraKeys:[{label:'Real World',key:'realWorldUse'}], mnemonicKey:'mnemonic' },
    { key:'scienceWow', emoji:'🌌', titleKey:'concept', eli5Key:'eli5', extraKeys:[{label:'Mind Blow',key:'mindBlow'}], mnemonicKey:'mnemonic' },
    { key:'historyStory', emoji:'📜', titleKey:'event', eli5Key:'story', extraKeys:[{label:'Lesson',key:'lesson'}], mnemonicKey:'mnemonic' },
    { key:'earthSecret', emoji:'🗺️', titleKey:'place', eli5Key:'secret', extraKeys:[{label:'Your Edge',key:'edge'}], mnemonicKey:'mnemonic' },
  ]} />
}

function AIView({ data, color, onXP }) {
  if (!data?.toolSpotlight) return null
  return <div>
    <Card emoji="🤖" title={data.toolSpotlight.name} color={color} mnemonic={data.toolSpotlight.mnemonic}>
      <Tag label={data.toolSpotlight.category} color={color} />
      <ELI5 text={data.toolSpotlight.eli5} color={color} />
      <ActionRow label="Secret Move" text={data.toolSpotlight.secretMove} color={color} />
    </Card>
    <Card emoji="⚙️" title={data.workflowWin.title} color={color} mnemonic={data.workflowWin.mnemonic}>
      <ELI5 text={data.workflowWin.problem} color={color} />
      <ol style={{ paddingLeft: 18, margin: '8px 0 10px', color: C.muted, fontSize: 13, lineHeight: 2 }}>{data.workflowWin.steps?.map((s, i) => <li key={i}>{s}</li>)}</ol>
      <ActionRow label="Time Saved" text={data.workflowWin.timeSaved} color={color} />
    </Card>
    <Card emoji="📋" title={`Prompt: ${data.promptOfDay.purpose}`} color={color} mnemonic={data.promptOfDay.mnemonic}>
      <Tag label={`Use on: ${data.promptOfDay.where}`} color={color} />
      <div style={{ marginTop: 10, padding: '14px', background: '#080812', borderRadius: 10, fontFamily: 'monospace', fontSize: 13, color: '#a8e6c0', lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>{data.promptOfDay.prompt}</div>
    </Card>
    <Card emoji="🔮" title={data.futureWatch.trend} color={color} mnemonic={data.futureWatch.mnemonic}>
      <ELI5 text={data.futureWatch.eli5} color={color} />
      <ActionRow label="Your Move" text={data.futureWatch.yourMove} color={color} />
    </Card>
    <SectionHeader text="🧩 Test Yourself" color={color} />
    <Quiz questions={data.quiz} color={color} onXP={onXP} />
  </div>
}

function TravelView({ data, color, onXP }) {
  if (!data?.destination) return null
  return <div>
    <Card emoji="🗺️" title={`${data.destination.country} · ${data.destination.region}`} color={color} mnemonic={data.destination.mnemonic}>
      <ELI5 text={data.destination.eli5} color={color} />
      <ActionRow label="Best Time" text={data.destination.bestTime} color={color} />
      <ActionRow label="Hidden Gem" text={data.destination.hiddenGem} color={color} />
    </Card>
    <Card emoji="📋" title={`Visa: ${data.visaTip.focus}`} color={color} mnemonic={data.visaTip.mnemonic}>
      <ELI5 text={data.visaTip.eli5} color={color} />
      <ActionRow label="Golden Tip" text={data.visaTip.goldenTip} color={color} />
    </Card>
    <Card emoji="🤲" title={`Culture: ${data.culturalCode.culture}`} color={color} mnemonic={data.culturalCode.mnemonic}>
      <ActionRow label="Do This" text={data.culturalCode.doThis} color={color} />
      <ActionRow label="Never Do" text={data.culturalCode.neverDoThis} color={C.rose} />
    </Card>
    <SectionHeader text="🧩 Test Yourself" color={color} />
    <Quiz questions={data.quiz} color={color} onXP={onXP} />
  </div>
}

const RENDERERS = { news:NewsView, markets:MarketsView, psychology:PsychView, leadership:LeadView, wealth:WealthView, communication:CommView, mind:MindView, knowledge:KnowView, ai:AIView, travel:TravelView }

// ── Helpers ────────────────────────────────────────────────────────────────
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

// ── XP Bar ─────────────────────────────────────────────────────────────────
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

// ── Bottom Nav (mobile) ────────────────────────────────────────────────────
function BottomNav({ domains, activeId, setActiveId }) {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 300,
      background: C.surface, borderTop: `1px solid ${C.border}`,
      display: 'flex', overflowX: 'auto', padding: '0 4px',
      WebkitOverflowScrolling: 'touch',
    }}>
      {domains.map(d => {
        const isActive = activeId === d.id
        return (
          <button key={d.id} onClick={() => setActiveId(d.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 2, padding: '8px 10px', minWidth: 60, flexShrink: 0,
            background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            borderTop: isActive ? `2px solid ${d.color}` : '2px solid transparent',
            color: isActive ? d.color : C.muted,
          }}>
            <span style={{ fontSize: 18 }}>{d.emoji}</span>
            <span style={{ fontSize: 9, fontWeight: isActive ? 800 : 500, whiteSpace: 'nowrap', letterSpacing: '0.03em' }}>
              {d.label.split(' ')[0]}
            </span>
          </button>
        )
      })}
    </div>
  )
}

// ── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [activeDate, setActiveDate] = useState(AVAILABLE_DATES[AVAILABLE_DATES.length - 1])
  const [activeId, setActiveId] = useState('news')
  const [xp, setXp] = useState(0)
  const [showDates, setShowDates] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const mobile = useIsMobile()

  const active = DOMAINS.find(d => d.id === activeId) || DOMAINS[0]
  const Renderer = RENDERERS[activeId]
  const brief = ALL_BRIEFS[activeDate]
  const data = brief?.[activeId]

  const closeAll = () => { setShowDates(false); setShowMenu(false) }

  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: "'Inter',-apple-system,sans-serif", color: C.text }}>

      {/* ── HEADER ── */}
      <div style={{
        background: C.surface, borderBottom: `1px solid ${C.border}`,
        padding: mobile ? '10px 14px' : '14px 20px',
        position: 'sticky', top: 0, zIndex: 200
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>

          {/* Top row: logo + xp */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: mobile ? 18 : 22, fontWeight: 900, letterSpacing: '-0.03em', background: `linear-gradient(120deg,${C.lavender},${C.mint},${C.peach})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              🌌 CURIO BRIEF
            </div>
            <XPBar xp={xp} mobile={mobile} />
          </div>

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
                  {AVAILABLE_DATES.slice().reverse().map(d => (
                    <button key={d} onClick={() => { setActiveDate(d); setShowDates(false); setActiveId('news') }} style={{
                      padding: '10px 12px', borderRadius: 8, fontSize: 14, cursor: 'pointer',
                      fontFamily: 'inherit', textAlign: 'left',
                      background: activeDate === d ? `${C.mint}22` : 'transparent',
                      border: `1px solid ${activeDate === d ? C.mint : 'transparent'}`,
                      color: activeDate === d ? C.mint : C.text,
                      fontWeight: activeDate === d ? 700 : 400
                    }}>
                      {fmtDate(d)}
                    </button>
                  ))}
                  <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 6, paddingTop: 6, fontSize: 11, color: C.dim, lineHeight: 1.6 }}>
                    More dates added daily!<br />Ask Claude to generate.
                  </div>
                </div>
              )}
            </div>

            {/* Desktop: domain tab strip | Mobile: menu button */}
            {!mobile && (
              <div style={{ display: 'flex', gap: 2, overflowX: 'auto', flex: 1 }}>
                {DOMAINS.map(d => (
                  <button key={d.id} onClick={() => setActiveId(d.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '7px 11px', borderRadius: '8px 8px 0 0',
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

      {/* ── CONTENT ── */}
      <div style={{
        maxWidth: 760, margin: '0 auto',
        padding: mobile ? `16px 12px ${mobile ? '90px' : '40px'}` : '24px 20px 60px'
      }}>

        {/* Domain header */}
        {active && brief && (
          <div style={{
            marginBottom: 16, padding: mobile ? '12px 14px' : '14px 18px',
            background: `${active.color}0d`, border: `1px solid ${active.color}33`, borderRadius: 14
          }}>
            <div style={{ fontSize: mobile ? 20 : 24, marginBottom: 4 }}>{active.emoji}</div>
            <div style={{ fontSize: mobile ? 15 : 17, fontWeight: 900, color: active.color, marginBottom: 2 }}>{active.label}</div>
            <div style={{ fontSize: 11, color: C.muted }}>{active.desc} · {fmtDate(activeDate)}</div>
          </div>
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
          <Renderer data={data} color={active.color} onXP={(earned) => setXp(x => x + earned)} />
        )}
        {brief && (!Renderer || !data) && (
          <div style={{ textAlign: 'center', padding: '40px', color: C.muted, fontSize: 14 }}>Content not available for this section.</div>
        )}
      </div>

      {/* ── MOBILE BOTTOM NAV ── */}
      {mobile && <BottomNav domains={DOMAINS} activeId={activeId} setActiveId={(id) => { setActiveId(id); closeAll() }} />}

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

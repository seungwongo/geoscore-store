import { ko } from "./ko";

export const en: typeof ko = {
  meta: {
    title: "GeoScore — Will AI cite your page?",
    description:
      "A GEO diagnostic Chrome extension that scores, in one click, whether the page you're viewing is worth citing by ChatGPT, Perplexity and Gemini — and suggests the exact sentences to fix.",
  },
  nav: {
    geo: "What is GEO?",
    features: "Features",
    rubric: "Rubric",
    report: "Sample report",
    privacy: "Privacy",
    install: "Install",
    buy: "Buy",
  },
  geo: {
    eyebrow: "What is GEO?",
    h2: "It's no longer about ranking — it's about being cited in the AI's answer",
    lead: "<b>GEO (Generative Engine Optimization)</b> means optimizing your page so AI engines like ChatGPT, Perplexity and Gemini <b>cite it as a trusted source</b> when they answer. People increasingly ask AI instead of a search box, and <b>a brand the AI never mentions is effectively invisible.</b>",
    cards: [
      {
        ico: "🔎",
        h3: "From search to the AI's answer",
        p: "Users get one synthesized answer instead of ten links. If you aren't cited in it, you lose the traffic, leads and revenue that used to come with it.",
      },
      {
        ico: "🤝",
        h3: "A citation is trust — and sales",
        p: "When the AI names you as a source, prospects already treat you as a vetted choice. It's a recommendation more powerful than any ad.",
      },
      {
        ico: "🚀",
        h3: "A first-mover window",
        p: "Most sites still don't know what AI citation depends on. Whoever optimizes first takes the narrow citation slot in AI answers.",
      },
    ],
    closing: "In the AI era, discoverability is survival. GeoScore turns that probability into a score — and tells you exactly what to fix to raise it.",
  },
  hero: {
    eyebrow: "Generative Engine Optimization",
    slides: [
      {
        line1: "If AI won't recommend you,",
        line2: "customers can't find you",
        lead: "People now ask <b>AI, not a search box.</b> If you're not cited in the answer, your business loses its very chance to be seen.",
      },
      {
        line1: "The era of finding you by",
        line2: "keyword search is ending",
        lead: "Customers ask AI and arrive through the <b>sources and recommendations it cites.</b> You need that narrow citation slot to get traffic.",
      },
      {
        line1: "Your odds of being found by AI",
        line2: "are your revenue",
        lead: "The more AI names you as a source, the more trust and traffic you get. <b>Raising your discoverability</b> is the growth strategy of the AI era.",
      },
      {
        line1: "Will AI cite your page?",
        line2: "Score it in one click",
        lead: "GeoScore scores <b>whether your page is worth citing</b> by AI — and tells you <b>what to change and how</b> to raise the odds.",
      },
    ],
    ctaBuy: "Buy now · $19",
    onceNote: "Pay once, use forever · not a subscription",
    ctaReport: "See a sample report",
    ctaNote: "Chrome Manifest V3 · No server · Bring your own API key (BYOK)",
    enginesLabel: "Engines covered:",
    enginesValue: "ChatGPT · Perplexity · Gemini · Google AI Overviews",
    demoTag: "Demo",
    demoBadge: "Needs work",
    demoContent: "Content 61/100",
    demoTech: "Technical 52/100",
  },
  why: {
    eyebrow: "Why GEO",
    h2: "The rules of search have changed",
    p: "Instead of ten links, users get <b>one synthesized answer</b> — and that answer cites only a handful of domains as sources. Ranking in the top 10 and landing in that narrow citation slot are <b>two different games</b>. Legacy SEO tools look at keywords and backlinks, but not the axis AI uses to decide citations. GeoScore scores exactly that axis.",
  },
  features: {
    eyebrow: "Features",
    h2: "It doesn't stop at a diagnosis",
    p: "Score → evidence → the sentence to fix. A practical tool for content owners, marketers and solo founders.",
    cards: [
      {
        ico: "📊",
        h3: "GEO Readiness Score & scorecard",
        p: "A 0–100 overall score and a verdict label at a glance, with per-item weight bars and the Top 3 reasons you will or won't be cited.",
        ul: [
          "Labels: Citation-ready · Citation candidate · Needs work · Hard to cite",
          "Content sub-score × 0.7 + Technical sub-score × 0.3",
          "Unscored items are excluded from the denominator and scaled proportionally",
        ],
      },
      {
        ico: "🧩",
        h3: "Hybrid scoring (works without a key)",
        p: "Scores 10 content + 5 technical items. Local heuristics (regex + DOM analysis) return 11 items instantly, even without an API key.",
        ul: [
          "Heuristics: fact density, sources, quotes, question coverage, freshness, author authority + 5 technical items",
          "BYOK: add your own LLM key to fill in 4 qualitative items + sentence rewrites",
          "The report always completes, even offline or on API errors",
        ],
      },
      {
        ico: "✍️",
        h3: "CEP (Category Entry Point) context check",
        p: "Derives 6–8 real situations users would bring to an AI (who, when, why, experience, constraints, criteria) for this page, and evaluates how well each is addressed.",
        ul: [
          "Coverage: Full · Partial · Not addressed",
          "'Product-centric → situation-centric' Before → After rewrites",
          "Guidance on the verifiable evidence (numbers, sources) each situation needs",
        ],
      },
      {
        ico: "🛠️",
        h3: "Technical check & copy-paste fixes",
        p: "Checks AI-crawler blocking (robots.txt), SSR rendering, structured data (JSON-LD) and llms.txt, then generates snippets you can paste right in.",
        ul: [
          "Accessibility verdicts for 7 crawlers incl. GPTBot, ClaudeBot, PerplexityBot",
          "robots · JSON-LD · llms.txt prescription snippets",
          "A ready-to-paste 'citation-ready intro block'",
        ],
      },
      {
        ico: "📤",
        h3: "Report export & history",
        p: "Export a report as Markdown, HTML or DOCX, and save recent diagnoses to compare score deltas on your next visit.",
        ul: [
          "Copy Markdown / download .md · .html · .docx",
          "Re-scoring the same URL shows ± vs. the previous score",
          "Korean · English UI automatically (by browser language)",
        ],
      },
      {
        ico: "🤖",
        h3: "Multiple LLM providers (BYOK)",
        p: "Choose Anthropic (Claude), OpenAI (GPT) or Google (Gemini) and run a precise diagnosis with your own key.",
        ul: [
          "Provider dropdown + a single key/model in settings",
          "One LLM call handles qualitative scoring + rewrites together",
          "Change key and model anytime in settings",
        ],
      },
    ],
  },
  rubric: {
    eyebrow: "Rubric",
    h2: "A validated 15-item rubric",
    p: "Scores the levers established by GEO research (Princeton et al., KDD 2024) and practitioner consensus — items and weights, not gut feeling.",
    contentCaption: "Content A1–A10 (sum 100)",
    techCaption: "Technical B1–B5 (sum 100 · all heuristic)",
    colItem: "Item",
    colScore: "Scoring",
    colWeight: "Weight",
    colDesc: "Description",
    tagLlm: "LLM",
    tagHeuristic: "Heuristic",
    content: [
      { item: "A1 Answer-first structure", llm: true, w: 15 },
      { item: "A2 Fact density & statistics", llm: false, w: 15 },
      { item: "A3 Source citations", llm: false, w: 12 },
      { item: "A4 Expert quotes", llm: false, w: 10 },
      { item: "A5 Extractability & chunking", llm: true, w: 14 },
      { item: "A6 Question coverage", llm: false, w: 9 },
      { item: "A7 Readability & clarity", llm: true, w: 8 },
      { item: "A8 Freshness signals", llm: false, w: 6 },
      { item: "A9 Entity & brand clarity", llm: true, w: 6 },
      { item: "A10 Author authority (E-E-A-T)", llm: false, w: 5 },
    ],
    tech: [
      { item: "B1 AI crawler access", desc: "robots.txt gate", w: 35 },
      { item: "B2 Rendering (SSR)", desc: "raw HTML vs DOM", w: 20 },
      { item: "B3 Structured data", desc: "JSON-LD direct read", w: 20 },
      { item: "B4 llms.txt", desc: "presence", w: 10 },
      { item: "B5 Technical hygiene", desc: "dates & consistency", w: 15 },
    ],
    penalty:
      "Penalties (deducted from content sub-score, max −15): keyword stuffing −7 · padding −4 · answer withholding −4",
  },
  report: {
    eyebrow: "Sample report",
    h2: "A real diagnostic report",
    p: 'Example page — a cold brew coffee product page, target query "coffee that helps me focus during late-night work"',
    url: "example-coffee.com/coldbrew",
    badge: "Needs work",
    content: "Content 61/100",
    tech: "Technical 52/100",
    scoreMeta: "Hybrid (heuristic + AI) · Target: coffee that helps me focus during late-night work",
    reasonsTitle: "Reasons to cite / not cite",
    reasons: [
      { good: true, text: '✅ Fact density & statistics (4/5) — "caffeine 12mg/100ml, acidity 3.5"' },
      { good: true, text: "✅ Rendering (SSR) (5/5) — body is server-rendered and easy for crawlers to read" },
      { good: true, text: "✅ Freshness signal (4/5) — dateModified 2026-05" },
      { good: false, text: "❌ Structured data (JSON-LD) (0/5) — no Product/Article schema" },
      { good: false, text: "❌ Answer-first structure (2/5) — first 200 words open with a brand story" },
      { good: false, text: "❌ llms.txt (0/5) — none" },
    ],
    scorecardTitle: "Scorecard",
    scorecardMore: "… plus A3·A4·A6–A10 · B2·B4·B5 (15 items total)",
    accordionTitle: "Item-by-item",
    accordion: [
      {
        item: "A1 Answer-first structure",
        score: "2/5",
        why: "The first 200 words must directly answer the main question to get cited.",
        ev: 'Evidence: "In 1998, our story began at a small roastery…"',
      },
      {
        item: "B3 Structured data (JSON-LD)",
        score: "0/5",
        why: "Structured data conveys entities and context to machines.",
        ev: "Evidence: no JSON-LD structured data (confirmed via direct DOM read)",
      },
      {
        item: "A2 Fact density & statistics",
        score: "4/5",
        why: "Statistics and fact density are the biggest lever.",
        ev: "Evidence: caffeine 12mg/100ml · acidity 3.5 · 250g",
      },
    ],
    cepTitle: "CEP check — Category Entry Points",
    cepSummary: { none: "Not addressed 2", partial: "Partial 1", full: "Full 1" },
    cep: [
      {
        cov: "none",
        covLabel: "Not addressed",
        title: "When trying to stay focused during late-night work",
        pills: ["When: late night", "Why: focus", "Criteria: caffeine · convenience"],
        q: "Recommend a coffee that keeps me focused when pulling an all-nighter",
        lack: "Only product specs — no language for the 'late-night / focus' situation",
        before: "We use high-concentration Arabica beans.",
        after:
          "For moments that demand focus, like late-night work, we packed in [insert value]mg of caffeine per 100ml.",
        needs: "Evidence needed: caffeine content figure + ingredient table / lab report source",
      },
      {
        cov: "partial",
        covLabel: "Partial",
        title: "When you need a coffee for relaxed conversation with guests",
        pills: ["Who: guests", "Experience: easy conversation"],
        q: "What's a safe, crowd-pleasing bean to serve guests at a housewarming?",
        lack: "Has a flavor profile but lacks 'hosting / crowd-pleasing' context",
        before: "A balanced-bodied medium roast.",
        after:
          "A medium roast that suits any palate, so it's a safe bet for occasions like hosting guests where you can't miss.",
        needs: "Evidence needed: roast level · popularity signals (reviews, ratings)",
      },
    ],
    cepFoot: "The evidence CEP asks for is the actual way to raise your A2 (stats) and A3 (sources) scores.",
    techTitle: "Technical fix snippets",
    introTitle: "Citation-ready intro block",
    introSnippet:
      "The key to a coffee that helps you focus during late-night work is [core answer].\nAccording to [insert value], [evidence], which means [implication].",
    disclaimer:
      "※ The report above is an illustrative example. Actual scores, evidence, CEPs and rewrites depend on the page diagnosed and the LLM you choose.",
  },
  how: {
    eyebrow: "How it works",
    h2: "Three clicks",
    steps: [
      {
        h4: "Open a page and click the icon",
        p: "Click the GeoScore icon on the page you want to diagnose and the side panel opens.",
      },
      {
        h4: "Enter a target query (optional)",
        p: '"Which question do you want to be cited as the answer to?" Leave it blank to infer automatically.',
      },
      {
        h4: "Run the diagnosis",
        p: "You get a report with score, scorecard, CEP and prescriptions. Qualitative items are filled in once you add an API key in settings.",
      },
    ],
  },
  privacy: {
    eyebrow: "Privacy",
    h2: "Your content only goes where you choose",
    list: [
      "<b>There is no server of our own.</b> No backend, DB, accounts, analytics or telemetry.",
      "Page content is sent <b>only to the single LLM provider you choose</b>, <b>with your own API key</b>, and only when you run a diagnosis.",
      "API keys and diagnosis history are stored only in your browser (<span class=\"keycap\">chrome.storage.local</span>).",
      "We <b>do not sell or share your data with third parties</b> other than your chosen provider.",
    ],
    cardIco: "🔒",
    cardH3: "Network access is limited to exactly what's needed",
    cardP: "The target domain (robots.txt, llms.txt, raw HTML) and the one LLM provider you chose:",
    hosts: ["api.anthropic.com", "api.openai.com", "generativelanguage.googleapis.com"],
  },
  install: {
    eyebrow: "Install",
    h2: "Add the extension to Chrome",
    p: "GeoScore ships as a zip file (.zip), not via the Chrome Web Store. After purchase, load the zip you receive using developer mode.",
    steps: [
      {
        h4: "Unzip",
        p: "Unzip the geo-score-0.1.0.zip file you downloaded after purchase into a folder of your choice.",
      },
      {
        h4: "Open the extensions page",
        p: "Go to chrome://extensions in Chrome, then turn on 'Developer mode' in the top-right corner.",
      },
      {
        h4: "Load the unpacked extension",
        p: "Click 'Load unpacked' and select the unzipped folder to finish installing.",
      },
    ],
    note: "Once installed, click the GeoScore icon in your toolbar to start diagnosing right away.",
  },
  purchase: {
    eyebrow: "Buy",
    h2: "Get the GeoScore extension",
    p: "One-time payment, use it forever. No login — just enter your email, download right after payment, and we'll also send the zip to that address.",
    price: "$19",
    priceUnit: "one-time · lifetime license",
    onceBadge: "One-time payment · not a subscription",
    features: [
      "The full 15-item GEO rubric",
      "BYOK — precise diagnosis with your own LLM key",
      "No server · no data collection",
      "Korean · English supported automatically",
    ],
    buyButton: "Buy & download",
    securedBy: "Payments are securely processed by Paddle.",
  },
  ctaFinal: {
    h2: "Will AI cite this page right now?",
    p: "Check in one click, and get the sentences to fix.",
    button: "Buy now · $19",
    disclaimer:
      "The GeoScore score is a <b>directional indicator</b> of citation likelihood and does not guarantee any particular citation rate or ranking. GEO criteria change fast, so re-check the latest standards periodically.",
  },
  footer: {
    brandLine: "GeoScore · GEO diagnostic Chrome extension (v0.1.0)",
    copyright: "© 2026 SEUNGWONGO.PRO · All rights reserved",
    links: { privacy: "Privacy Policy", terms: "Terms of Service", refund: "Refund Policy" },
    adminLogin: "Admin login",
    dashboard: "Dashboard",
    logout: "Log out",
  },
  admin: {
    loginTitle: "Admin login",
    email: "Email",
    password: "Password",
    submit: "Log in",
    cancel: "Cancel",
    loggingIn: "Logging in…",
    error: "Incorrect email or password.",
  },
  modal: {
    title: "Enter your email to purchase",
    desc: "After payment we'll send the extension zip file to this address.",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    continue: "Continue to payment",
    cancel: "Cancel",
    invalidEmail: "Please enter a valid email address.",
    loading: "Opening checkout…",
    verifying: "Verifying your payment…",
    error: "We couldn't confirm the payment. If you were charged, check your email or try again shortly.",
    notConfigured: "Payments aren't configured yet. Please contact the administrator.",
  },
  checkout: {
    processing: "Confirming your payment…",
    processingDesc: "One moment — you'll be taken to the download page shortly.",
    failed: "Payment confirmation is taking a moment",
    failedDesc:
      "If your payment went through, we've emailed the download link to the address you used. Please check your inbox (and spam). If the problem persists, contact support@thegreat.io.",
    backHome: "Back to home",
  },
  download: {
    verifyEyebrow: "Verify",
    verifyTitle: "Enter your email to download",
    verifyDesc: "Enter the email address you used at purchase to download the GeoScore extension.",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    verifyButton: "Verify & download",
    verifying: "Verifying…",
    invalidEmail: "Please enter a valid email address.",
    mismatch: "That email doesn't match this purchase. Please check the address you used at checkout.",
    genericError: "Verification failed. Please try again shortly.",
    okEyebrow: "Verified",
    okTitle: "Your download is starting!",
    okDesc: "If the download doesn't start automatically, use the button below.",
    button: "Download extension (.zip)",
    forEmail: "Purchase email:",
    installTitle: "How to install",
    installSteps: [
      "Unzip the file.",
      "Open chrome://extensions in Chrome and turn on 'Developer mode'.",
      "Use 'Load unpacked' and select the unzipped folder.",
    ],
    backHome: "Back to home",
    blockedEyebrow: "No access",
    blockedTitle: "Invalid download link",
    blockedDesc: "This link is invalid or has expired (valid for 30 days after purchase). Please re-check the link in your purchase confirmation email.",
    blockedCta: "Go to purchase",
  },
  legal: {
    updated: "Last updated: July 28, 2026",
    backHome: "← Home",
    privacy: {
      title: "Privacy Policy",
      intro:
        "GeoScore ('the Service') takes your privacy seriously and processes only the minimum information necessary. This policy applies to both the store (purchase) site and the Chrome extension.",
      sections: [
        {
          h: "1. Information we collect",
          items: [
            "At purchase: your email address (to deliver the extension and send purchase notices). We do not store payment details (card numbers, etc.); those are handled by our payment provider, Paddle.",
            "In the extension: there is no account or server. API keys and diagnosis history are stored only in your browser's local storage (chrome.storage.local) and are never sent to us.",
          ],
        },
        {
          h: "2. How we use information",
          items: [
            "Your email is used only to send the extension zip, receipts and essential notices.",
            "We do not provide or sell your data to third parties for marketing.",
          ],
        },
        {
          h: "3. Payment processing",
          items: [
            "Payments are processed through Paddle (the merchant of record); payment-related personal data is handled under Paddle's privacy policy.",
          ],
        },
        {
          h: "4. Retention & disposal",
          items: [
            "Transaction records such as the purchase email are retained for the period required by applicable law (e.g., e-commerce regulations) and then disposed of.",
          ],
        },
        {
          h: "5. Your rights",
          items: [
            "You may request access to, correction of, or deletion of your information at any time. Email support@thegreat.io.",
          ],
        },
        {
          h: "6. Contact",
          items: ["Privacy inquiries: support@thegreat.io"],
        },
      ],
    },
    terms: {
      title: "Terms of Service",
      intro:
        "These terms govern the purchase and use of the GeoScore extension. By purchasing or using the Service, you agree to these terms.",
      sections: [
        {
          h: "1. The service",
          items: [
            "GeoScore is a Chrome extension that diagnoses a web page's fitness (GEO) for citation by generative engines.",
            "The extension is provided as a zip file (.zip) and installed via developer mode.",
          ],
        },
        {
          h: "2. License",
          items: [
            "Purchase grants you a personal, non-exclusive license to use the extension.",
            "Redistribution, resale and reverse engineering of the extension are prohibited.",
          ],
        },
        {
          h: "3. Payment & pricing",
          items: [
            "The price is the amount shown at checkout, as a one-time payment.",
            "Payments are processed through Paddle.",
          ],
        },
        {
          h: "4. Disclaimer",
          items: [
            "The GeoScore score is a directional indicator of citation likelihood and does not guarantee any particular citation rate, search ranking or traffic.",
            "Qualitative diagnosis relies on responses from the third-party LLM (Anthropic, OpenAI, Google) you provide, and we do not warrant the accuracy of those responses.",
          ],
        },
        {
          h: "5. Limitation of liability",
          items: [
            "To the maximum extent permitted by law, we are not liable for indirect or incidental damages arising from use of the Service.",
          ],
        },
        {
          h: "6. Changes to these terms",
          items: [
            "These terms may change; changes will be posted on this page.",
          ],
        },
        {
          h: "7. Contact",
          items: ["Terms inquiries: support@thegreat.io"],
        },
      ],
    },
    refund: {
      title: "Refund Policy",
      intro:
        "Considering the nature of digital products (downloadable software), we operate the following refund policy to protect customers.",
      sections: [
        {
          h: "1. Refund window",
          items: [
            "You may request a refund within 14 days of purchase.",
            "If the product does not work properly or differs materially from its description, we will refund you as a priority.",
          ],
        },
        {
          h: "2. How refunds are processed",
          items: [
            "Refunds are issued to the original payment method via our payment provider, Paddle.",
            "After approval, funds are returned per Paddle's processing time (typically 5–10 business days).",
          ],
        },
        {
          h: "3. How to request a refund",
          items: [
            "Email support@thegreat.io with your purchase email and order (transaction) number and we'll take care of it.",
          ],
        },
        {
          h: "4. Exceptions",
          items: [
            "Refunds may be limited where repeated buy/refund abuse or a license violation is confirmed.",
          ],
        },
      ],
    },
  },
  email: {
    customer: {
      subject: "Your GeoScore extension download",
      preheader: "Thanks for your purchase — here's your download and install guide.",
      heading: "Thank you for your purchase!",
      intro:
        "Your GeoScore extension is ready. Click the button below to open the download page, then enter the email address you purchased with to get the extension.",
      button: "Open download page",
      installTitle: "How to install (3 steps)",
      installSteps: [
        "Unzip the downloaded zip file.",
        "Open chrome://extensions in Chrome and turn on 'Developer mode'.",
        "Use 'Load unpacked' and select the unzipped folder.",
      ],
      footerNote:
        "This download link is valid for 30 days after purchase. Support: support@thegreat.io · This email was sent regarding your GeoScore purchase.",
    },
    notify: {
      subject: "New GeoScore purchase",
      heading: "A new purchase came in",
      labelEmail: "Buyer email",
      labelTxn: "Transaction ID",
      labelTime: "Paid at",
      labelEmailSent: "Customer email sent",
    },
  },
};

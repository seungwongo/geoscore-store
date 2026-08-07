// GEO articles — bilingual content used by the /articles list and detail pages.
// Each article renders block-by-block; a { t: "cta" } block injects the inline
// purchase CTA. A bottom CTA is always appended by the detail page.

export type ArticleBlock =
  | { t: "h2"; x: string }
  | { t: "p"; x: string } // may contain simple <b> markup
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "quote"; x: string }
  | { t: "cta" };

export interface ArticleContent {
  title: string;
  description: string;
  category: string;
  readMins: number;
  blocks: ArticleBlock[];
}

export interface Article {
  slug: string;
  date: string; // ISO (publish date)
  ko: ArticleContent;
  en: ArticleContent;
}

export const articles: Article[] = [
  {
    slug: "what-is-geo",
    date: "2026-08-01",
    ko: {
      title: "GEO란 무엇인가: AI 시대의 새로운 검색 최적화",
      description:
        "GEO(생성형 엔진 최적화)의 정의와 SEO와의 차이, 그리고 AI가 답변에 당신의 페이지를 인용하게 만드는 것이 왜 비즈니스 생존과 직결되는지 설명합니다.",
      category: "기초",
      readMins: 6,
      blocks: [
        { t: "p", x: "사람들이 정보를 찾는 방식이 근본적으로 바뀌고 있습니다. 검색창에 키워드를 넣고 링크 10개를 훑던 시대에서, ChatGPT·Perplexity·Gemini에게 질문하고 <b>합성된 답변 하나</b>를 받는 시대로 넘어가고 있죠. 이 변화는 웹사이트를 운영하는 모든 사람에게 새로운 과제를 던집니다." },
        { t: "h2", x: "GEO의 정의" },
        { t: "p", x: "<b>GEO(Generative Engine Optimization, 생성형 엔진 최적화)</b>는 생성형 AI가 답변을 만들 때 당신의 페이지를 <b>신뢰할 만한 출처로 인용</b>하도록 콘텐츠와 기술 요소를 최적화하는 작업입니다. AI 답변에 인용되면 그 자체가 강력한 추천이 되고, 사용자는 인용된 출처를 클릭해 당신의 사이트로 유입됩니다." },
        { t: "h2", x: "SEO와 무엇이 다른가" },
        { t: "p", x: "SEO는 검색 결과 페이지에서 <b>순위</b>를 다투는 게임입니다. 상위 10위 안에 드는 것이 목표죠. 반면 GEO는 AI가 만드는 답변의 <b>좁은 인용 자리</b>에 드는 게임입니다. 그 답변은 보통 두세 개에서 일고여덟 개의 도메인만 출처로 언급합니다." },
        { t: "ul", items: [
          "SEO: 키워드, 백링크, 검색 순위 중심",
          "GEO: 사실 밀도, 인용 가능성, 추출 용이성, 구조화 데이터 중심",
          "SEO는 '클릭을 유도', GEO는 'AI가 대신 인용하고 요약'",
        ] },
        { t: "quote", x: "상위 10위에 드는 것과, AI 답변의 인용 자리에 드는 것은 완전히 다른 게임입니다." },
        { t: "cta" },
        { t: "h2", x: "왜 지금 중요한가" },
        { t: "p", x: "생성형 검색 사용이 빠르게 늘고 있습니다. AI가 당신을 언급하지 않으면, 사용자 입장에서 당신의 브랜드는 <b>존재하지 않는 것</b>과 다름없습니다. 반대로 초기에 GEO를 적용한 사이트는 경쟁이 덜한 지금 그 인용 자리를 선점할 수 있습니다." },
        { t: "h2", x: "무엇부터 해야 하나" },
        { t: "ol", items: [
          "핵심 질문에 첫 문단에서 바로 답하는 '답변 우선' 구조로 바꾸기",
          "주장에 수치·출처·인용을 붙여 사실 밀도 높이기",
          "AI 크롤러가 읽을 수 있도록 robots.txt와 렌더링 점검하기",
          "JSON-LD 구조화 데이터로 개체와 맥락을 기계에 전달하기",
        ] },
        { t: "p", x: "이 네 가지만 손봐도 인용 가능성은 눈에 띄게 올라갑니다. 문제는 '내 페이지가 지금 몇 점인지, 무엇부터 고쳐야 하는지'를 아는 것입니다. GeoScore는 바로 그것을 점수와 처방으로 알려줍니다." },
      ],
    },
    en: {
      title: "What Is GEO: The New Search Optimization for the AI Era",
      description:
        "What GEO (Generative Engine Optimization) means, how it differs from SEO, and why getting AI to cite your page is now tied directly to business survival.",
      category: "Basics",
      readMins: 6,
      blocks: [
        { t: "p", x: "The way people find information is changing at its core. We're moving from typing keywords and scanning ten links to asking ChatGPT, Perplexity or Gemini and getting <b>one synthesized answer</b>. That shift hands everyone who runs a website a brand-new challenge." },
        { t: "h2", x: "Defining GEO" },
        { t: "p", x: "<b>GEO (Generative Engine Optimization)</b> is the practice of optimizing your content and technical signals so that generative AI <b>cites your page as a trusted source</b> when it answers. A citation is a powerful recommendation in itself, and users click through from the cited source to your site." },
        { t: "h2", x: "How it differs from SEO" },
        { t: "p", x: "SEO is a game of <b>ranking</b> on the results page — the goal is the top 10. GEO is a game of landing in the <b>narrow citation slot</b> of an AI-generated answer, which typically names only a handful of domains as sources." },
        { t: "ul", items: [
          "SEO: keywords, backlinks, search ranking",
          "GEO: fact density, citability, extractability, structured data",
          "SEO earns the click; GEO gets the AI to cite and summarize you",
        ] },
        { t: "quote", x: "Ranking in the top 10 and landing in an AI answer's citation slot are two entirely different games." },
        { t: "cta" },
        { t: "h2", x: "Why it matters now" },
        { t: "p", x: "Generative search is growing fast. If the AI never mentions you, your brand is effectively <b>invisible</b> to the user. Sites that adopt GEO early can claim those citation slots while competition is still low." },
        { t: "h2", x: "Where to start" },
        { t: "ol", items: [
          "Rewrite to an 'answer-first' structure that answers the core question in the opening paragraph",
          "Raise fact density by backing claims with numbers, sources and quotes",
          "Check robots.txt and rendering so AI crawlers can actually read you",
          "Use JSON-LD structured data to convey entities and context to machines",
        ] },
        { t: "p", x: "Fixing just these four moves the needle noticeably. The hard part is knowing your page's current score and what to fix first — which is exactly what GeoScore turns into a score and a prescription." },
      ],
    },
  },
  {
    slug: "how-ai-chooses-sources",
    date: "2026-08-02",
    ko: {
      title: "AI가 인용하는 콘텐츠의 7가지 특징",
      description:
        "ChatGPT와 Perplexity 같은 생성형 엔진이 어떤 페이지를 출처로 고르는지, 실제로 인용되는 콘텐츠가 공유하는 7가지 특징을 정리했습니다.",
      category: "방법론",
      readMins: 7,
      blocks: [
        { t: "p", x: "생성형 엔진은 아무 페이지나 인용하지 않습니다. '기계가 읽고, 신뢰하고, 그대로 발췌하기 좋은' 콘텐츠를 선호하죠. 실제로 인용되는 페이지들이 공유하는 7가지 특징을 살펴봅니다." },
        { t: "h2", x: "1. 답변 우선 구조" },
        { t: "p", x: "첫 200단어 안에 핵심 질문에 대한 직답이 있어야 합니다. 브랜드 스토리로 시작하는 페이지는 AI가 발췌할 '답'을 찾지 못해 지나칩니다." },
        { t: "h2", x: "2. 높은 사실 밀도" },
        { t: "p", x: "수치, 통계, 날짜, 고유명사가 촘촘한 콘텐츠는 인용 가치가 높습니다. '빠르다' 대신 '평균 응답 200ms'처럼 검증 가능한 사실을 쓰세요." },
        { t: "h2", x: "3. 명확한 출처와 인용" },
        { t: "p", x: "주장에 출처를 붙이면 AI가 그 주장을 신뢰하고 재인용하기 쉬워집니다. 1차 자료 링크와 전문가 인용구는 특히 강력합니다." },
        { t: "h2", x: "4. 추출 가능한 청크 구조" },
        { t: "p", x: "명확한 소제목, 짧은 문단, 목록은 AI가 특정 조각을 깔끔하게 떼어 인용하도록 돕습니다. 하나의 거대한 문단은 인용되기 어렵습니다." },
        { t: "cta" },
        { t: "h2", x: "5. 질문 커버리지" },
        { t: "p", x: "사용자가 실제로 던지는 질문(누가·언제·왜·어떻게)을 페이지가 다루고 있어야 합니다. 관련 질문을 폭넓게 커버할수록 다양한 프롬프트에 매칭됩니다." },
        { t: "h2", x: "6. 최신성 신호" },
        { t: "p", x: "명시적인 게시일·수정일, 최근 데이터는 '지금도 유효한 정보'라는 신호를 줍니다. 오래된 페이지는 후순위로 밀립니다." },
        { t: "h2", x: "7. 저자 권위(E-E-A-T)" },
        { t: "p", x: "저자 정보, 경험, 전문성이 드러나면 신뢰도가 올라갑니다. 익명의 페이지보다 실명 전문가의 페이지가 인용에 유리합니다." },
        { t: "p", x: "일곱 가지를 한 번에 점검하기는 쉽지 않습니다. GeoScore는 이 항목들을 포함한 15개 루브릭으로 페이지를 자동 채점하고, 부족한 항목마다 고칠 문장을 제안합니다." },
      ],
    },
    en: {
      title: "7 Traits of Content That AI Cites",
      description:
        "How generative engines like ChatGPT and Perplexity pick their sources — the seven traits shared by pages that actually get cited.",
      category: "Methods",
      readMins: 7,
      blocks: [
        { t: "p", x: "Generative engines don't cite just any page. They favor content that is easy for a machine to read, trust and quote verbatim. Here are seven traits shared by pages that actually get cited." },
        { t: "h2", x: "1. Answer-first structure" },
        { t: "p", x: "The first 200 words must directly answer the core question. Pages that open with a brand story get skipped because the AI can't find an answer to extract." },
        { t: "h2", x: "2. High fact density" },
        { t: "p", x: "Content packed with numbers, statistics, dates and proper nouns is more citable. Write 'averages 200ms response time' instead of 'fast' — verifiable facts win." },
        { t: "h2", x: "3. Clear sources and citations" },
        { t: "p", x: "Attaching sources to claims makes the AI more willing to trust and re-cite them. Links to primary sources and expert quotes are especially strong." },
        { t: "h2", x: "4. Extractable chunk structure" },
        { t: "p", x: "Clear subheadings, short paragraphs and lists help the AI lift a clean fragment to quote. One giant paragraph is hard to cite." },
        { t: "cta" },
        { t: "h2", x: "5. Question coverage" },
        { t: "p", x: "Your page should address the real questions users ask (who, when, why, how). The more related questions you cover, the more prompts you can match." },
        { t: "h2", x: "6. Freshness signals" },
        { t: "p", x: "Explicit publish/modified dates and recent data signal that the information is still valid. Stale pages get deprioritized." },
        { t: "h2", x: "7. Author authority (E-E-A-T)" },
        { t: "p", x: "Visible author info, experience and expertise raise trust. A named expert's page beats an anonymous one for citations." },
        { t: "p", x: "Checking all seven at once isn't easy. GeoScore auto-scores your page against a 15-item rubric that includes these, and suggests the exact sentence to fix for each weak item." },
      ],
    },
  },
  {
    slug: "robots-txt-ai-crawlers",
    date: "2026-08-03",
    ko: {
      title: "robots.txt와 AI 크롤러: 당신의 페이지는 읽히고 있나요?",
      description:
        "GPTBot·ClaudeBot·PerplexityBot 등 AI 크롤러의 접근을 robots.txt가 막고 있지는 않은지, 그리고 어떻게 열어줘야 하는지 실무적으로 정리합니다.",
      category: "기술",
      readMins: 6,
      blocks: [
        { t: "p", x: "아무리 좋은 콘텐츠도 AI 크롤러가 읽지 못하면 인용될 수 없습니다. 가장 흔한 실수는 <b>robots.txt가 AI 봇을 차단</b>하고 있는 것입니다. 많은 사이트가 이 사실조차 모릅니다." },
        { t: "h2", x: "AI 크롤러란" },
        { t: "p", x: "생성형 엔진들은 각자의 크롤러로 웹을 수집합니다. 대표적으로 다음과 같습니다." },
        { t: "ul", items: [
          "GPTBot — OpenAI(ChatGPT)",
          "ClaudeBot / anthropic-ai — Anthropic(Claude)",
          "PerplexityBot — Perplexity",
          "Google-Extended — Google 생성형 AI",
        ] },
        { t: "h2", x: "차단되어 있는지 확인하는 법" },
        { t: "p", x: "당신 도메인의 <b>/robots.txt</b>를 열어 위 봇들에 대한 <b>Disallow</b> 규칙이 있는지 확인하세요. 보안·저작권 이유로 의도적으로 막았을 수도 있지만, 인용 노출을 원한다면 접근을 허용해야 합니다." },
        { t: "quote", x: "robots.txt 한 줄이 AI 인용의 문을 통째로 닫아버릴 수 있습니다." },
        { t: "cta" },
        { t: "h2", x: "허용하는 예시" },
        { t: "p", x: "특정 봇을 허용하려면 robots.txt에 명시적으로 규칙을 둘 수 있습니다. 예:" },
        { t: "ul", items: [
          "User-agent: GPTBot / Allow: /",
          "User-agent: PerplexityBot / Allow: /",
          "민감한 경로만 선택적으로 Disallow로 보호",
        ] },
        { t: "h2", x: "렌더링도 함께 봐야 합니다" },
        { t: "p", x: "크롤러가 접근할 수 있어도, 본문이 자바스크립트로만 그려진다면(클라이언트 렌더링) 봇이 빈 페이지를 볼 수 있습니다. 핵심 콘텐츠는 서버 렌더링(SSR)으로 raw HTML에 담겨야 안전합니다." },
        { t: "p", x: "GeoScore는 GPTBot·ClaudeBot·PerplexityBot 등 7종 크롤러의 접근성과 렌더링(SSR) 여부를 자동 판정하고, robots.txt 처방 스니펫까지 만들어 줍니다." },
      ],
    },
    en: {
      title: "robots.txt and AI Crawlers: Is Your Page Even Being Read?",
      description:
        "Whether your robots.txt is blocking AI crawlers like GPTBot, ClaudeBot and PerplexityBot — and how to open the door, in practical terms.",
      category: "Technical",
      readMins: 6,
      blocks: [
        { t: "p", x: "Even great content can't be cited if AI crawlers can't read it. The most common mistake is a <b>robots.txt that blocks AI bots</b> — and many sites don't even realize it." },
        { t: "h2", x: "What AI crawlers are" },
        { t: "p", x: "Generative engines collect the web with their own crawlers. The main ones include:" },
        { t: "ul", items: [
          "GPTBot — OpenAI (ChatGPT)",
          "ClaudeBot / anthropic-ai — Anthropic (Claude)",
          "PerplexityBot — Perplexity",
          "Google-Extended — Google generative AI",
        ] },
        { t: "h2", x: "How to check if you're blocked" },
        { t: "p", x: "Open your domain's <b>/robots.txt</b> and look for <b>Disallow</b> rules targeting those bots. You may have blocked them on purpose for security or copyright reasons, but if you want citation exposure you must allow access." },
        { t: "quote", x: "A single line in robots.txt can slam the door on AI citations entirely." },
        { t: "cta" },
        { t: "h2", x: "An example of allowing them" },
        { t: "p", x: "To allow specific bots, add explicit rules to robots.txt. For example:" },
        { t: "ul", items: [
          "User-agent: GPTBot / Allow: /",
          "User-agent: PerplexityBot / Allow: /",
          "Protect only sensitive paths with a targeted Disallow",
        ] },
        { t: "h2", x: "Rendering matters too" },
        { t: "p", x: "Even with access, if your body is drawn only by JavaScript (client rendering), the bot may see an empty page. Core content should ship in raw HTML via server-side rendering (SSR) to be safe." },
        { t: "p", x: "GeoScore automatically judges accessibility for 7 crawlers including GPTBot, ClaudeBot and PerplexityBot, checks SSR rendering, and even generates a robots.txt prescription snippet." },
      ],
    },
  },
  {
    slug: "json-ld-for-ai-citations",
    date: "2026-08-04",
    ko: {
      title: "JSON-LD 구조화 데이터로 AI 인용률 높이기",
      description:
        "구조화 데이터(JSON-LD)가 왜 AI 인용에 중요한지, 어떤 스키마를 어떻게 넣어야 하는지 복붙 가능한 예시와 함께 설명합니다.",
      category: "기술",
      readMins: 6,
      blocks: [
        { t: "p", x: "사람은 문맥으로 의미를 파악하지만, 기계는 명시적인 신호를 좋아합니다. <b>JSON-LD 구조화 데이터</b>는 '이 페이지가 무엇에 관한 것이고, 저자는 누구이며, 언제 작성됐는지'를 기계가 오해 없이 읽도록 알려주는 라벨입니다." },
        { t: "h2", x: "왜 인용에 도움이 되나" },
        { t: "p", x: "AI는 개체(회사·제품·인물)와 맥락을 정확히 이해할수록 안심하고 인용합니다. 구조화 데이터는 제목, 저자, 발행일, 제품 정보 같은 핵심 사실을 <b>추측이 아닌 선언</b>으로 전달합니다." },
        { t: "h2", x: "가장 많이 쓰는 스키마" },
        { t: "ul", items: [
          "Article / BlogPosting — 글·아티클",
          "Product / Offer — 제품·가격",
          "Organization — 브랜드 개체 정의",
          "FAQPage — 질문·답변",
          "BreadcrumbList — 사이트 구조",
        ] },
        { t: "cta" },
        { t: "h2", x: "복붙 예시 (Article)" },
        { t: "p", x: "글 페이지라면 <head>에 다음과 같은 JSON-LD를 넣습니다. 값을 실제 정보로 바꾸기만 하면 됩니다." },
        { t: "ul", items: [
          '@type: "Article"',
          'headline: 글 제목',
          'author: { @type: "Person", name: 저자명 }',
          'datePublished / dateModified: 발행·수정일',
        ] },
        { t: "h2", x: "흔한 실수" },
        { t: "p", x: "스키마를 넣었지만 본문 내용과 일치하지 않거나, 날짜가 오래됐거나, 필수 필드가 비어 있으면 오히려 신뢰를 잃습니다. 구조화 데이터는 <b>정확하고 최신</b>이어야 합니다." },
        { t: "p", x: "GeoScore는 페이지의 JSON-LD를 직접 읽어 존재 여부와 정합성을 점검하고, 없다면 바로 붙여넣을 수 있는 스키마 스니펫을 생성합니다." },
      ],
    },
    en: {
      title: "Raise Your AI Citation Rate with JSON-LD Structured Data",
      description:
        "Why structured data (JSON-LD) matters for AI citations, and which schemas to add and how — with copy-paste examples.",
      category: "Technical",
      readMins: 6,
      blocks: [
        { t: "p", x: "Humans infer meaning from context, but machines love explicit signals. <b>JSON-LD structured data</b> is a label that tells machines, without ambiguity, what a page is about, who wrote it and when." },
        { t: "h2", x: "Why it helps with citations" },
        { t: "p", x: "The more precisely AI understands the entities (companies, products, people) and context, the more confidently it cites. Structured data conveys key facts — title, author, publish date, product info — as <b>declarations, not guesses</b>." },
        { t: "h2", x: "The most-used schemas" },
        { t: "ul", items: [
          "Article / BlogPosting — posts and articles",
          "Product / Offer — products and pricing",
          "Organization — defining your brand entity",
          "FAQPage — questions and answers",
          "BreadcrumbList — site structure",
        ] },
        { t: "cta" },
        { t: "h2", x: "Copy-paste example (Article)" },
        { t: "p", x: "For an article page, add JSON-LD like the following in <head>. Just replace the values with your real information." },
        { t: "ul", items: [
          '@type: "Article"',
          "headline: the article title",
          'author: { @type: "Person", name: author }',
          "datePublished / dateModified: publish and update dates",
        ] },
        { t: "h2", x: "Common mistakes" },
        { t: "p", x: "If the schema doesn't match the body, the dates are stale, or required fields are empty, you actually lose trust. Structured data must be <b>accurate and current</b>." },
        { t: "p", x: "GeoScore reads your page's JSON-LD directly to check presence and consistency, and if it's missing, generates a schema snippet you can paste right in." },
      ],
    },
  },
  {
    slug: "cep-strategy",
    date: "2026-08-05",
    ko: {
      title: "CEP 전략: 제품 중심에서 상황 중심으로",
      description:
        "사용자가 AI에게 던지는 실제 상황(상황 진입점, CEP)에 맞춰 콘텐츠를 재구성하면 인용률이 오릅니다. Before/After 예시로 방법을 보여줍니다.",
      category: "전략",
      readMins: 7,
      blocks: [
        { t: "p", x: "많은 페이지가 '제품이 무엇인지'만 설명합니다. 하지만 사용자는 AI에게 <b>자신의 상황</b>을 말하며 묻습니다. 이 간극을 메우는 것이 CEP 전략입니다." },
        { t: "h2", x: "CEP란 무엇인가" },
        { t: "p", x: "<b>CEP(Category Entry Point, 상황 진입점)</b>는 사용자가 어떤 카테고리를 떠올리게 되는 구체적 상황입니다. 누가·언제·왜·어떤 제약과 기준으로 그 니즈가 생기는가를 말합니다." },
        { t: "p", x: "예를 들어 커피 원두를 판다면, 사용자는 '아라비카 원두'가 아니라 <b>'야근할 때 집중 잘 되는 커피'</b>라고 묻습니다. AI는 후자의 언어에 답하려 하죠." },
        { t: "h2", x: "Before → After" },
        { t: "p", x: "<b>Before:</b> 고농도 아라비카 원두를 사용합니다. (제품 스펙 중심)" },
        { t: "p", x: "<b>After:</b> 야근처럼 집중이 필요한 순간을 위해 100ml당 카페인 12mg을 담았습니다. (상황 + 검증 가능한 근거)" },
        { t: "cta" },
        { t: "h2", x: "CEP를 찾는 법" },
        { t: "ol", items: [
          "타깃 고객이 이 제품을 떠올리는 순간 6~8개를 나열한다",
          "각 순간을 '누가·언제·왜·기준'으로 구체화한다",
          "각 상황에 대해 실제로 던질 법한 질문을 적어본다",
          "그 질문에 직답하는 문장과 근거(수치·출처)를 페이지에 추가한다",
        ] },
        { t: "h2", x: "왜 인용률이 오르나" },
        { t: "p", x: "상황 언어로 쓰인 콘텐츠는 사용자의 실제 프롬프트와 매칭될 확률이 높습니다. 게다가 각 상황에 근거(수치·출처)를 붙이면 사실 밀도까지 올라가 인용 가치가 두 배가 됩니다." },
        { t: "p", x: "GeoScore는 페이지 기준으로 CEP를 6~8개 도출하고 각 상황의 대응도(충분·부분·미대응)를 평가하며, 제품 중심 문장을 상황 중심으로 재작성해 줍니다." },
      ],
    },
    en: {
      title: "The CEP Strategy: From Product-Centric to Situation-Centric",
      description:
        "Restructuring content around the real situations users bring to AI (Category Entry Points) raises citation rates. We show how with before/after examples.",
      category: "Strategy",
      readMins: 7,
      blocks: [
        { t: "p", x: "Many pages only explain 'what the product is.' But users describe <b>their own situation</b> when they ask an AI. Bridging that gap is what the CEP strategy is about." },
        { t: "h2", x: "What a CEP is" },
        { t: "p", x: "A <b>CEP (Category Entry Point)</b> is the concrete situation that makes a user think of a category — who, when, why, and under what constraints and criteria the need arises." },
        { t: "p", x: "If you sell coffee beans, users don't ask for 'Arabica beans' — they ask for <b>'coffee that helps me focus during late-night work.'</b> The AI tries to answer in that latter language." },
        { t: "h2", x: "Before → After" },
        { t: "p", x: "<b>Before:</b> We use high-concentration Arabica beans. (product-spec centric)" },
        { t: "p", x: "<b>After:</b> For moments that demand focus, like late-night work, we packed in 12mg of caffeine per 100ml. (situation + verifiable evidence)" },
        { t: "cta" },
        { t: "h2", x: "How to find your CEPs" },
        { t: "ol", items: [
          "List 6–8 moments when your target customer thinks of this product",
          "Make each moment concrete with who/when/why/criteria",
          "Write the questions a user would realistically ask in each",
          "Add sentences that directly answer them, backed by evidence (numbers, sources)",
        ] },
        { t: "h2", x: "Why citation rates rise" },
        { t: "p", x: "Situation-worded content is far more likely to match a user's actual prompt. And attaching evidence (numbers, sources) to each situation raises fact density too — doubling your citation value." },
        { t: "p", x: "GeoScore derives 6–8 CEPs for your page, rates coverage for each (full, partial, not addressed), and rewrites product-centric sentences into situation-centric ones." },
      ],
    },
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

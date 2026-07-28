export const ko = {
  meta: {
    title: "GeoScore — 내 페이지, AI가 인용할까?",
    description:
      "지금 보는 웹페이지가 ChatGPT·Perplexity·Gemini에 출처로 인용될 만한지 클릭 한 번으로 채점하고, 고칠 문장까지 제안하는 GEO 진단 크롬 확장.",
  },
  nav: {
    features: "기능",
    rubric: "채점 기준",
    report: "리포트 예시",
    privacy: "프라이버시",
    install: "설치 방법",
    buy: "구매하기",
  },
  hero: {
    eyebrow: "Generative Engine Optimization",
    h1_line1: "내 페이지, AI가 인용할까?",
    h1_line2: "클릭 한 번으로 채점",
    lead: "지금 보고 있는 웹페이지가 생성형 답변 엔진에 <b>출처로 인용될 만한가</b>를 채점하는 GEO 진단 크롬 확장. 점수만 주는 게 아니라 <b>어떤 문장을 어떻게 바꾸면 좋을지</b>까지 제안합니다.",
    ctaBuy: "지금 구매 · $19",
    ctaReport: "진단 리포트 예시 보기",
    ctaNote: "Chrome Manifest V3 · 서버 없음 · 본인 API 키(BYOK)",
    enginesLabel: "대응 엔진:",
    enginesValue: "ChatGPT · Perplexity · Gemini · Google AI Overviews",
    demoTag: "데모",
    demoBadge: "보강 필요",
    demoContent: "콘텐츠 61/100",
    demoTech: "기술 52/100",
  },
  why: {
    eyebrow: "왜 GEO인가",
    h2: "검색의 규칙이 바뀌었습니다",
    p: "사용자는 링크 10개 대신 <b>합성된 답 하나</b>를 받습니다. 그 답은 두세 개에서 일고여덟 개 도메인만 출처로 인용하죠. 상위 10위에 드는 것과, 그 좁은 인용 자리에 드는 것은 <b>다른 게임</b>입니다. 기존 SEO 도구는 키워드·백링크를 보지만, AI가 인용을 결정하는 축은 보지 않습니다. GeoScore는 바로 그 축을 채점합니다.",
  },
  features: {
    eyebrow: "기능",
    h2: "진단으로 끝내지 않습니다",
    p: "점수 → 근거 → 고칠 문장까지. 콘텐츠 담당자·마케터·1인 사업자를 위한 실전 도구.",
    cards: [
      {
        ico: "📊",
        h3: "GEO Readiness Score & 스코어카드",
        p: "0~100 종합 점수와 판정 라벨을 한눈에. 항목별 가중치 막대와 인용될·안 될 이유 Top 3까지 정리합니다.",
        ul: [
          "라벨: 인용 준비됨 · 인용 후보 · 보강 필요 · 인용 어려움",
          "콘텐츠 소점수 × 0.7 + 기술 소점수 × 0.3",
          "미채점 항목은 분모에서 제외해 비례 환산",
        ],
      },
      {
        ico: "🧩",
        h3: "하이브리드 채점 (키 없이도 동작)",
        p: "콘텐츠 10개 + 기술 5개 항목을 채점합니다. 로컬 휴리스틱(정규식·DOM 분석)으로 API 키 없이도 11개 항목이 즉시 나옵니다.",
        ul: [
          "휴리스틱: 통계 밀도·출처·인용구·질문 커버리지·최신성·저자 권위 + 기술 5개",
          "BYOK: 본인 LLM 키를 넣으면 정성 항목 4개 + 문장 재작성이 채워짐",
          "오프라인·API 오류에도 리포트는 항상 완성",
        ],
      },
      {
        ico: "✍️",
        h3: "CEP(상황 진입점) 맥락 진단",
        p: "사용자가 AI에 실제로 던질 상황(누가·언제·왜·경험·제약·기준)을 이 페이지 기준으로 6~8개 도출하고, 각 상황 대응도를 평가합니다.",
        ul: [
          "대응도: 충분 · 부분 · 미대응",
          "'제품 중심 → 상황 중심' Before → After 문장 재작성",
          "각 상황에 필요한 검증 가능한 근거(수치·출처) 안내",
        ],
      },
      {
        ico: "🛠️",
        h3: "기술 진단 & 복붙 처방",
        p: "AI 크롤러 차단(robots.txt)·SSR 렌더링·구조화 데이터(JSON-LD)·llms.txt를 점검하고, 바로 붙여넣을 스니펫을 만들어 줍니다.",
        ul: [
          "GPTBot·ClaudeBot·PerplexityBot 등 7종 크롤러 접근성 판정",
          "robots · JSON-LD · llms.txt 처방 스니펫",
          "복붙용 '인용 준비된 도입부 블록'",
        ],
      },
      {
        ico: "📤",
        h3: "리포트 출력 & 히스토리",
        p: "진단 리포트를 마크다운·HTML·DOCX로 내보내고, 최근 진단을 저장해 재방문 시 점수 변화를 델타로 비교합니다.",
        ul: [
          "마크다운 복사 / .md · .html · .docx 다운로드",
          "같은 URL 재진단 시 이전 대비 ± 점수 표시",
          "한국어 · 영어 인터페이스 자동(브라우저 언어 기준)",
        ],
      },
      {
        ico: "🤖",
        h3: "다중 LLM 제공자 (BYOK)",
        p: "Anthropic(Claude) · OpenAI(GPT) · Google(Gemini) 중 원하는 제공자를 골라 본인 키로 정밀 진단을 실행합니다.",
        ul: [
          "설정에서 제공자 드롭다운 + 단일 키/모델",
          "LLM 호출 1회로 정성 채점 + 재작성 동시 처리",
          "키·모델은 설정에서 언제든 변경",
        ],
      },
    ],
  },
  rubric: {
    eyebrow: "채점 기준",
    h2: "검증된 15개 항목 루브릭",
    p: "GEO 연구(프린스턴 외, KDD 2024)와 실무 합의로 정리된 레버를 그대로 채점합니다. 감이 아니라 항목·가중치로.",
    contentCaption: "콘텐츠 A1~A10 (합 100)",
    techCaption: "기술 B1~B5 (합 100 · 전부 휴리스틱)",
    colItem: "항목",
    colScore: "채점",
    colWeight: "가중치",
    colDesc: "설명",
    tagLlm: "LLM",
    tagHeuristic: "휴리스틱",
    content: [
      { item: "A1 답변 우선 구조", llm: true, w: 15 },
      { item: "A2 사실 밀도·통계", llm: false, w: 15 },
      { item: "A3 출처 인용", llm: false, w: 12 },
      { item: "A4 전문가 인용구", llm: false, w: 10 },
      { item: "A5 추출 가능성·청크화", llm: true, w: 14 },
      { item: "A6 질문 커버리지", llm: false, w: 9 },
      { item: "A7 가독성·명료성", llm: true, w: 8 },
      { item: "A8 최신성 신호", llm: false, w: 6 },
      { item: "A9 개체·브랜드 명확성", llm: true, w: 6 },
      { item: "A10 저자 권위 (E-E-A-T)", llm: false, w: 5 },
    ],
    tech: [
      { item: "B1 AI 크롤러 접근성", desc: "robots.txt 게이트", w: 35 },
      { item: "B2 렌더링(SSR)", desc: "raw HTML vs DOM", w: 20 },
      { item: "B3 구조화 데이터", desc: "JSON-LD 직독", w: 20 },
      { item: "B4 llms.txt", desc: "존재 여부", w: 10 },
      { item: "B5 기술 위생", desc: "날짜·정합", w: 15 },
    ],
    penalty:
      "감점(콘텐츠 소점수 차감, 최대 −15): 키워드 스터핑 −7 · 패딩 −4 · 답변 감금 −4",
  },
  report: {
    eyebrow: "리포트 예시",
    h2: "실제 진단 리포트",
    p: '예시 페이지 — 콜드브루 원두 제품 소개, 타깃 쿼리 "야근할 때 집중 잘 되는 커피"',
    url: "example-coffee.com/coldbrew",
    badge: "보강 필요",
    content: "콘텐츠 61/100",
    tech: "기술 52/100",
    scoreMeta: "하이브리드(휴리스틱 + AI) · 타깃: 야근할 때 집중 잘 되는 커피",
    reasonsTitle: "인용할 이유 / 안 될 이유",
    reasons: [
      { good: true, text: '✅ 사실 밀도·통계 (4/5) — "카페인 함량 12mg/100ml, 산미 3.5"' },
      { good: true, text: "✅ 렌더링(SSR) (5/5) — 본문이 서버에서 렌더되어 크롤러가 읽기 쉬움" },
      { good: true, text: "✅ 최신성 신호 (4/5) — dateModified 2026-05" },
      { good: false, text: "❌ 구조화 데이터(JSON-LD) (0/5) — Product/Article 스키마 없음" },
      { good: false, text: "❌ 답변 우선 구조 (2/5) — 첫 200단어가 브랜드 스토리로 시작" },
      { good: false, text: "❌ llms.txt (0/5) — 없음" },
    ],
    scorecardTitle: "스코어카드",
    scorecardMore: "… 외 A3·A4·A6~A10 · B2·B4·B5 (총 15항목)",
    accordionTitle: "항목별 진단",
    accordion: [
      {
        item: "A1 답변 우선 구조",
        score: "2/5",
        why: "첫 200단어가 주 질문에 직답해야 인용된다.",
        ev: '근거: "1998년, 작은 로스터리에서 시작한 우리의 이야기는…"',
      },
      {
        item: "B3 구조화 데이터(JSON-LD)",
        score: "0/5",
        why: "구조화 데이터가 개체·맥락을 기계에 전달한다.",
        ev: "근거: JSON-LD 구조화 데이터 없음 (DOM 직독 확인)",
      },
      {
        item: "A2 사실 밀도·통계",
        score: "4/5",
        why: "통계·사실 밀도가 가장 큰 레버.",
        ev: "근거: 카페인 12mg/100ml · 산미 3.5 · 250g",
      },
    ],
    cepTitle: "CEP 진단 — 상황 진입점",
    cepSummary: { none: "미대응 2", partial: "부분 1", full: "충분 1" },
    cep: [
      {
        cov: "none",
        covLabel: "미대응",
        title: "야근 중 집중력을 유지하려 할 때",
        pills: ["언제: 야근", "왜: 집중", "기준: 카페인·간편함"],
        q: "밤샘 작업할 때 집중 잘 되는 커피 추천해줘",
        lack: "제품 스펙만 있고 '야근/집중' 상황 언어가 없음",
        before: "고농도 아라비카 원두를 사용합니다.",
        after:
          "야근처럼 집중이 필요한 순간을 위해 100ml당 카페인 [수치 삽입]mg을 담았습니다.",
        needs: "필요 근거: 카페인 함량 수치 + 성분표/시험성적서 출처",
      },
      {
        cov: "partial",
        covLabel: "부분",
        title: "손님과 편하게 대화할 커피가 필요할 때",
        pills: ["누구: 손님", "경험: 부담 없는 대화"],
        q: "집들이 때 손님 대접용으로 무난한 원두 뭐가 좋아?",
        lack: "맛 프로필은 있으나 '대접·부담 없음' 맥락 부재",
        before: "균형 잡힌 바디감의 미디엄 로스트.",
        after:
          "취향을 안 타는 미디엄 로스트라, 손님 대접처럼 실패하면 안 되는 자리에 무난합니다.",
        needs: "필요 근거: 로스팅 레벨 · 대중 선호 근거(리뷰·평점)",
      },
    ],
    cepFoot: "CEP의 필요 근거는 A2(통계)·A3(출처) 점수를 올리는 실제 방법입니다.",
    techTitle: "기술 처방 스니펫",
    introTitle: "인용 준비된 도입부 블록",
    introSnippet:
      "야근할 때 집중 잘 되는 커피의 핵심은 [핵심 답변]입니다.\n[수치 삽입]에 따르면 [근거]이며, 이는 [함의]를 뜻합니다.",
    disclaimer:
      "※ 위 리포트는 기능 설명용 예시입니다. 실제 점수·근거·CEP·재작성은 진단하는 페이지와 선택한 LLM에 따라 달라집니다.",
  },
  how: {
    eyebrow: "사용 방법",
    h2: "세 번의 클릭",
    steps: [
      {
        h4: "페이지 열고 아이콘 클릭",
        p: "진단할 페이지에서 GeoScore 아이콘을 누르면 사이드 패널이 열립니다.",
      },
      {
        h4: "타깃 쿼리 입력 (선택)",
        p: '"어떤 질문의 답으로 인용되길 원하나요?" 비워두면 자동으로 추론합니다.',
      },
      {
        h4: "진단 실행",
        p: "점수·스코어카드·CEP·처방이 담긴 리포트가 나옵니다. 정성 항목은 설정에서 API 키 입력 시 채워집니다.",
      },
    ],
  },
  privacy: {
    eyebrow: "프라이버시",
    h2: "본문은 당신이 고른 곳에만 갑니다",
    list: [
      "<b>자체 서버가 없습니다.</b> 백엔드·DB·계정·애널리틱스·텔레메트리 없음.",
      "페이지 본문은 <b>사용자가 선택한 LLM 제공자(택1)</b>에게 <b>본인 API 키</b>로만, 진단 실행 시에만 전송됩니다.",
      "API 키와 진단 기록은 브라우저 로컬(<span class=\"keycap\">chrome.storage.local</span>)에만 저장됩니다.",
      "선택한 제공자 외 <b>제3자에게 데이터를 판매·공유하지 않습니다.</b>",
    ],
    cardIco: "🔒",
    cardH3: "허용 네트워크 대상은 딱 필요한 곳만",
    cardP: "진단 대상 도메인(robots.txt·llms.txt·raw HTML)과, 사용자가 고른 LLM 제공자 1곳:",
    hosts: ["api.anthropic.com", "api.openai.com", "generativelanguage.googleapis.com"],
  },
  install: {
    eyebrow: "설치 방법",
    h2: "크롬에 확장 프로그램 추가하기",
    p: "GeoScore는 Chrome 웹스토어가 아닌 압축 파일(.zip)로 제공됩니다. 구매 후 받은 zip을 개발자 모드로 불러오면 됩니다.",
    steps: [
      {
        h4: "압축 해제",
        p: "구매 후 다운로드한 geo-score-0.1.0.zip 파일의 압축을 원하는 폴더에 풉니다.",
      },
      {
        h4: "확장 프로그램 페이지 열기",
        p: "크롬 주소창에 chrome://extensions 를 입력해 이동한 뒤, 우측 상단의 '개발자 모드'를 켭니다.",
      },
      {
        h4: "압축해제된 확장 프로그램 로드",
        p: "'압축해제된 확장 프로그램을 로드합니다' 버튼을 눌러, 압축을 푼 폴더를 선택하면 설치가 완료됩니다.",
      },
    ],
    note: "설치가 끝나면 툴바의 GeoScore 아이콘을 클릭해 바로 진단을 시작할 수 있습니다.",
  },
  purchase: {
    eyebrow: "구매하기",
    h2: "GeoScore 확장 프로그램 받기",
    p: "일회성 결제로 평생 사용. 로그인 없이 이메일만 입력하면 결제 후 바로 다운로드하고, 입력한 메일로도 압축 파일을 보내드립니다.",
    price: "$19",
    priceUnit: "일회성 · 평생 라이선스",
    features: [
      "15개 항목 GEO 루브릭 전체",
      "BYOK — 본인 LLM 키로 정밀 진단",
      "서버 없음 · 데이터 비수집",
      "한국어 · 영어 자동 지원",
    ],
    buyButton: "구매하고 다운로드",
    securedBy: "결제는 Paddle로 안전하게 처리됩니다.",
  },
  ctaFinal: {
    h2: "지금 이 페이지, AI가 인용할까요?",
    p: "클릭 한 번으로 확인하고, 고칠 문장까지 받아가세요.",
    button: "지금 구매 · $19",
    disclaimer:
      "GeoScore 점수는 인용 가능성의 <b>방향성 지표</b>이며 특정 인용률이나 순위를 보장하지 않습니다. GEO 기준은 빠르게 변하므로 최신 기준을 주기적으로 재확인하세요.",
  },
  footer: {
    brandLine: "GeoScore · GEO 진단 크롬 확장 (v0.1.0)",
    copyright: "© 2026 SEUNGWONGO.PRO · All rights reserved",
    links: { privacy: "개인정보처리방침", terms: "이용약관", refund: "환불정책" },
  },
  modal: {
    title: "구매를 위해 이메일을 입력하세요",
    desc: "결제 완료 후 이 주소로 확장 프로그램 압축 파일을 보내드립니다.",
    emailLabel: "이메일 주소",
    emailPlaceholder: "you@example.com",
    continue: "결제 진행",
    cancel: "취소",
    invalidEmail: "올바른 이메일 주소를 입력하세요.",
    loading: "결제 창을 여는 중…",
    verifying: "결제를 확인하는 중…",
    error: "결제 확인에 실패했습니다. 결제가 되었다면 이메일을 확인하거나 잠시 후 다시 시도하세요.",
    notConfigured: "결제가 아직 설정되지 않았습니다. 관리자에게 문의하세요.",
  },
  download: {
    okEyebrow: "결제 완료",
    okTitle: "구매해 주셔서 감사합니다!",
    okDesc: "아래 버튼으로 GeoScore 확장 프로그램을 다운로드하세요. 같은 파일을 이메일로도 보내드렸습니다.",
    button: "확장 프로그램 다운로드 (.zip)",
    forEmail: "구매 이메일:",
    installTitle: "설치 방법",
    installSteps: [
      "zip 압축을 풉니다.",
      "크롬에서 chrome://extensions 를 열고 '개발자 모드'를 켭니다.",
      "'압축해제된 확장 프로그램을 로드'로 압축 푼 폴더를 선택합니다.",
    ],
    backHome: "홈으로 돌아가기",
    blockedEyebrow: "접근 불가",
    blockedTitle: "다운로드 권한이 없습니다",
    blockedDesc: "이 페이지는 구매를 완료한 사용자만 접근할 수 있습니다. 유효한 다운로드 링크가 없거나 만료되었습니다.",
    blockedCta: "구매 페이지로 이동",
  },
  legal: {
    updated: "최종 업데이트: 2026년 7월 28일",
    backHome: "← 홈으로",
    privacy: {
      title: "개인정보처리방침",
      intro:
        "GeoScore(이하 '서비스')는 이용자의 개인정보를 중요하게 생각하며, 최소한의 정보만 처리합니다. 본 방침은 스토어(구매) 사이트와 크롬 확장 프로그램 모두에 적용됩니다.",
      sections: [
        {
          h: "1. 수집하는 정보",
          items: [
            "구매 시: 이메일 주소(확장 프로그램 전달 및 구매 안내 목적). 결제 정보(카드번호 등)는 당사가 저장하지 않으며 결제대행사 Paddle이 처리합니다.",
            "확장 프로그램: 별도의 계정이나 서버가 없습니다. API 키와 진단 기록은 이용자 브라우저의 로컬 저장소(chrome.storage.local)에만 저장되며 당사로 전송되지 않습니다.",
          ],
        },
        {
          h: "2. 정보의 이용",
          items: [
            "입력한 이메일은 확장 프로그램 압축 파일 발송, 결제 영수증 및 필수 안내 전달에만 사용합니다.",
            "마케팅 목적의 제3자 제공이나 판매를 하지 않습니다.",
          ],
        },
        {
          h: "3. 결제 처리",
          items: [
            "결제는 Paddle(머천트 오브 레코드)을 통해 이루어지며, 결제 관련 개인정보 처리는 Paddle의 개인정보처리방침을 따릅니다.",
          ],
        },
        {
          h: "4. 보관 및 파기",
          items: [
            "구매 이메일 등 거래 기록은 관련 법령(전자상거래 등)에서 요구하는 기간 동안 보관 후 파기합니다.",
          ],
        },
        {
          h: "5. 이용자의 권리",
          items: [
            "이용자는 언제든지 본인 정보의 열람·정정·삭제를 요청할 수 있습니다. 요청은 support@thegreat.io 로 보내주세요.",
          ],
        },
        {
          h: "6. 문의",
          items: ["개인정보 관련 문의: support@thegreat.io"],
        },
      ],
    },
    terms: {
      title: "이용약관",
      intro:
        "본 약관은 GeoScore 확장 프로그램의 구매 및 이용에 관한 조건을 규정합니다. 서비스를 구매·이용함으로써 본 약관에 동의한 것으로 봅니다.",
      sections: [
        {
          h: "1. 서비스 내용",
          items: [
            "GeoScore는 웹페이지의 생성형 엔진 인용 적합도(GEO)를 진단하는 크롬 확장 프로그램입니다.",
            "확장 프로그램은 압축 파일(.zip) 형태로 제공되며, 개발자 모드로 설치합니다.",
          ],
        },
        {
          h: "2. 라이선스",
          items: [
            "구매 시 이용자 본인에게 개인적·비독점적 사용 라이선스가 부여됩니다.",
            "확장 프로그램의 재배포·재판매·역설계는 금지됩니다.",
          ],
        },
        {
          h: "3. 결제 및 가격",
          items: [
            "가격은 결제 시점에 표시된 금액이며, 일회성 결제입니다.",
            "결제는 Paddle을 통해 처리됩니다.",
          ],
        },
        {
          h: "4. 면책",
          items: [
            "GeoScore 점수는 인용 가능성에 대한 방향성 지표이며, 특정 인용률·검색 순위·트래픽을 보장하지 않습니다.",
            "정성 항목 진단은 이용자가 입력한 제3자 LLM(Anthropic·OpenAI·Google)의 응답에 의존하며, 해당 응답의 정확성에 대해 당사는 보증하지 않습니다.",
          ],
        },
        {
          h: "5. 책임의 제한",
          items: [
            "관련 법이 허용하는 최대 범위에서, 당사는 서비스 이용으로 발생한 간접·부수적 손해에 대해 책임지지 않습니다.",
          ],
        },
        {
          h: "6. 약관의 변경",
          items: [
            "본 약관은 변경될 수 있으며, 변경 시 본 페이지에 게시합니다.",
          ],
        },
        {
          h: "7. 문의",
          items: ["약관 관련 문의: support@thegreat.io"],
        },
      ],
    },
    refund: {
      title: "환불정책",
      intro:
        "디지털 제품(다운로드형 소프트웨어)의 특성을 고려하되, 이용자 보호를 위해 아래와 같은 환불 정책을 운영합니다.",
      sections: [
        {
          h: "1. 환불 가능 기간",
          items: [
            "구매일로부터 14일 이내에 환불을 요청할 수 있습니다.",
            "제품이 정상적으로 동작하지 않거나 설명과 현저히 다른 경우 우선적으로 환불해 드립니다.",
          ],
        },
        {
          h: "2. 환불 처리",
          items: [
            "환불은 결제대행사 Paddle을 통해 원 결제 수단으로 이루어집니다.",
            "환불 승인 후 Paddle의 처리 기간(통상 5~10영업일)에 따라 입금됩니다.",
          ],
        },
        {
          h: "3. 환불 요청 방법",
          items: [
            "support@thegreat.io 로 구매 이메일과 주문(트랜잭션) 번호를 알려주시면 처리해 드립니다.",
          ],
        },
        {
          h: "4. 예외",
          items: [
            "환불 정책을 악용한 반복적 구매·환불 또는 라이선스 위반이 확인된 경우 환불이 제한될 수 있습니다.",
          ],
        },
      ],
    },
  },
  email: {
    customer: {
      subject: "GeoScore 확장 프로그램 다운로드",
      preheader: "구매해 주셔서 감사합니다 — 다운로드와 설치 안내입니다.",
      heading: "구매해 주셔서 감사합니다!",
      intro:
        "GeoScore 확장 프로그램이 준비되었습니다. 이 메일에 압축 파일(.zip)을 첨부했으며, 아래 버튼으로도 다운로드할 수 있습니다.",
      button: "확장 프로그램 다운로드",
      installTitle: "설치 방법 (3단계)",
      installSteps: [
        "첨부된 zip 파일의 압축을 풉니다.",
        "크롬에서 chrome://extensions 를 열고 '개발자 모드'를 켭니다.",
        "'압축해제된 확장 프로그램을 로드'로 압축 푼 폴더를 선택합니다.",
      ],
      footerNote: "문의: support@thegreat.io · 이 메일은 GeoScore 구매에 따라 발송되었습니다.",
    },
    notify: {
      subject: "새 GeoScore 구매 발생",
      heading: "새로운 구매가 접수되었습니다",
      labelEmail: "구매자 이메일",
      labelTxn: "트랜잭션 ID",
      labelTime: "결제 시각",
      labelEmailSent: "고객 메일 발송",
    },
  },
};

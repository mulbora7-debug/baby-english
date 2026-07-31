const makeLesson = (label, theme, emoji, pattern, dialogues, words, prompt, answer, options) => ({
  label, theme, emoji, pattern, dialogues, words, quiz: { prompt, answer, options }
});
const d = (speaker, icon, en, ko) => ({ speaker, icon, en, ko });
const w = (en, ko, emoji, example) => ({ en, ko, emoji, example });
const o = (en, emoji) => ({ en, emoji });
const koreanMeanings = {
  cat:"고양이", panda:"판다", dog:"강아지", banana:"바나나", apple:"사과", grape:"포도",
  rainy:"비 오는", snowy:"눈 오는", sunny:"화창한", bus:"버스", "fire truck":"소방차",
  car:"자동차", chocolate:"초콜릿", strawberry:"딸기", help:"돕다", sleep:"자다",
  eat:"먹다", hat:"모자", dress:"드레스", bag:"가방", clock:"시계", star:"별",
  moon:"달", shoe:"신발", cup:"컵", book:"책", fish:"물고기", bird:"새",
  shell:"조개", sit:"앉다", jump:"뛰다", sad:"슬픈", angry:"화난", happy:"행복한",
  shirt:"셔츠", socks:"양말", ready:"준비된", basket:"바구니", picnic:"소풍",
  sandwich:"샌드위치", boots:"장화", umbrella:"우산", puddle:"물웅덩이",
  pajamas:"잠옷", blanket:"담요", dream:"꿈", shorts:"반바지", coat:"외투"
};

const lessons = {
  day1: makeLesson("Day 1","동물","🐼","I like ___!",
    [d("A","🧒","What animal do you like?","어떤 동물을 좋아하니?"),d("B","👧","I like pandas!","나는 판다를 좋아해!")],
    [w("panda","판다","🐼","I like pandas!"),w("animal","동물","🐾","What animal do you like?"),w("like","좋아하다","❤️","I like pandas!")],
    "panda를 찾아보세요!","panda",[o("cat","🐱"),o("panda","🐼"),o("dog","🐶")]),
  day2: makeLesson("Day 2","과일","🍎","I like ___!",
    [d("A","🧒","What fruit do you like?","어떤 과일을 좋아하니?"),d("B","👧","I like apples!","나는 사과를 좋아해!")],
    [w("apple","사과","🍎","I like apples!"),w("fruit","과일","🍓","What fruit do you like?"),w("sweet","달콤한","🍯","It is sweet!")],
    "apple을 찾아보세요!","apple",[o("banana","🍌"),o("apple","🍎"),o("grape","🍇")]),
  day3: makeLesson("Day 3","날씨","☀️","It is ___!",
    [d("A","🧒","How is the weather?","날씨가 어떠니?"),d("B","👧","It is sunny!","날씨가 화창해!")],
    [w("sunny","화창한","☀️","It is sunny!"),w("weather","날씨","🌤️","How is the weather?"),w("rainy","비 오는","🌧️","It is rainy!")],
    "sunny를 찾아보세요!","sunny",[o("rainy","🌧️"),o("snowy","❄️"),o("sunny","☀️")]),
  day4: makeLesson("Day 4","탈것","🚒","It is a ___!",
    [d("A","🧒","What is that?","저것은 무엇이니?"),d("B","👧","It is a fire truck!","소방차야!")],
    [w("fire truck","소방차","🚒","It is a fire truck!"),w("car","자동차","🚗","It is a car!"),w("bus","버스","🚌","It is a bus!")],
    "fire truck을 찾아보세요!","fire truck",[o("bus","🚌"),o("fire truck","🚒"),o("car","🚗")]),
  day5: makeLesson("Day 5","아이스크림","🍌","___, please!",
    [d("A","🧒","What ice cream do you want?","어떤 아이스크림을 원하니?"),d("B","👧","Banana, please!","바나나 맛으로 주세요!")],
    [w("banana","바나나","🍌","Banana, please!"),w("ice cream","아이스크림","🍦","I want ice cream!"),w("please","부탁해요 / 주세요","🙏","Banana, please!")],
    "banana를 찾아보세요!","banana",[o("chocolate","🍫"),o("strawberry","🍓"),o("banana","🍌")])
};

const lessonKeys = Object.keys(lessons);
const completedKey = "babyEnglishCompletedDates";
const legacyCompletedKey = "babyEnglishCompleted";
const DAY_MS = 24 * 60 * 60 * 1000;

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function dayNumber(date = new Date()) {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / DAY_MS);
}
function lessonKeyFor(date = new Date()) {
  return lessonKeys[((dayNumber(date) % lessonKeys.length) + lessonKeys.length) % lessonKeys.length];
}
function formatToday(date = new Date()) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long", day: "numeric", weekday: "short"
  }).format(date);
}
function loadCompletedDates() {
  try {
    const saved = JSON.parse(localStorage.getItem(completedKey) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}
function learningStreak(completedDates, today = new Date()) {
  const completed = new Set(completedDates);
  const cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (!completed.has(localDateKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (completed.has(localDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

localStorage.removeItem(legacyCompletedKey);
const state = {
  view: "home", currentDay: lessonKeyFor(), todayKey: localDateKey(), stage: 0, storyStage: 0, quizSolved: false,
  completedDates: loadCompletedDates()
};
const stageNames = ["대화 듣기","오늘의 단어","그림 퀴즈","완료"];
const screen = document.getElementById("screen");
const dayNav = document.getElementById("day-nav");
const homeButton = document.getElementById("home-btn");
const progressWrap = document.getElementById("progress-wrap");
let voices = [];
let speechRunId = 0;

const storyPlans = {
  cinderella: {
    title: "신데렐라의 반짝이는 하루",
    emoji: "👗",
    description: "친절, 옷, 시간 표현을 배우는 따뜻한 이야기",
    episodes: [
      ["🧹","친절한 신데렐라","I can help! · help, clean, kind"],
      ["✨","반짝이는 변신","A pretty dress! · dress, shoes, pretty"],
      ["🕛","열두 시 종소리","It is time! · clock, go, home"],
      ["👠","유리구두 찾기","Is this yours? · shoe, find, mine"]
    ]
  },
  mermaid: {
    title: "인어공주의 바닷속 친구들",
    emoji: "🧜‍♀️",
    description: "바다 생물, 색깔, 감정을 배우는 모험 이야기",
    episodes: [
      ["🐠","알록달록 물고기","I see a fish! · fish, sea, swim"],
      ["🐚","예쁜 조개껍데기","Look at this! · shell, pretty, pink"],
      ["🐬","돌고래 친구","Let’s play! · friend, jump, play"],
      ["🌊","집으로 가는 길","I am happy! · home, happy, together"]
    ]
  },
  bebe: {
    title: "베베코알라의 포근한 하루",
    emoji: "🐨",
    description: "옷 입기, 소풍, 비 오는 날, 잠자리 표현을 배우는 일상 이야기",
    episodes: [
      ["👚","혼자 준비해요","I am ready! · shirt, socks, ready"],
      ["🧺","즐거운 소풍","Let’s have a picnic! · basket, picnic, sandwich"],
      ["☔","빗방울 놀이","I see a puddle! · boots, umbrella, puddle"],
      ["🌙","별빛 잠옷","Sweet dreams! · pajamas, blanket, dream"]
    ]
  }
};

const storyLessons = {
  cinderella: [
    {
      title:"친절한 신데렐라", icon:"🧹",
      lines:[
        ["Cinderella is kind.","신데렐라는 친절해요."],
        ["She helps her little friends.","작은 친구들을 도와줘요."],
        ["I can help!","내가 도와줄게!"]
      ],
      phrase:"I can help!",
      words:[["help","돕다","🤝"],["clean","청소하다","🧹"],["kind","친절한","💛"]],
      quiz:{prompt:"help를 찾아보세요!",answer:"help",options:[["help","🤝"],["sleep","😴"],["eat","🍽️"]]}
    },
    {
      title:"반짝이는 변신", icon:"✨",
      lines:[
        ["A kind fairy comes.","친절한 요정이 찾아와요."],
        ["The dress is blue and bright.","드레스는 파랗고 반짝여요."],
        ["A pretty dress!","예쁜 드레스다!"]
      ],
      phrase:"A pretty dress!",
      words:[["dress","드레스","👗"],["shoes","신발","👠"],["pretty","예쁜","✨"]],
      quiz:{prompt:"dress를 찾아보세요!",answer:"dress",options:[["hat","👒"],["dress","👗"],["bag","👜"]]}
    },
    {
      title:"열두 시 종소리", icon:"🕛",
      lines:[
        ["Ding, dong! The clock rings.","딩동! 시계가 울려요."],
        ["It is time to go.","이제 갈 시간이에요."],
        ["I am going home!","나는 집에 가요!"]
      ],
      phrase:"It is time!",
      words:[["clock","시계","🕛"],["go","가다","🏃"],["home","집","🏠"]],
      quiz:{prompt:"clock을 찾아보세요!",answer:"clock",options:[["clock","🕛"],["star","⭐"],["moon","🌙"]]}
    },
    {
      title:"유리구두 찾기", icon:"👠",
      lines:[
        ["A little shoe is on the step.","작은 신발이 계단에 있어요."],
        ["The prince finds Cinderella.","왕자가 신데렐라를 찾아요."],
        ["Is this yours?","이것이 네 것이니?"]
      ],
      phrase:"Is this yours?",
      words:[["shoe","신발","👠"],["find","찾다","🔎"],["mine","내 것","🙋"]],
      quiz:{prompt:"shoe를 찾아보세요!",answer:"shoe",options:[["shoe","👠"],["cup","🥤"],["book","📕"]]}
    }
  ],
  mermaid: [
    {
      title:"알록달록 물고기", icon:"🐠",
      lines:[
        ["The little mermaid swims in the sea.","작은 인어공주가 바다에서 헤엄쳐요."],
        ["She sees a colorful fish.","알록달록한 물고기를 보아요."],
        ["I see a fish!","물고기가 보여!"]
      ],
      phrase:"I see a fish!",
      words:[["fish","물고기","🐠"],["sea","바다","🌊"],["swim","헤엄치다","🏊"]],
      quiz:{prompt:"fish를 찾아보세요!",answer:"fish",options:[["fish","🐠"],["bird","🐦"],["cat","🐱"]]}
    },
    {
      title:"예쁜 조개껍데기", icon:"🐚",
      lines:[
        ["A pink shell shines in the sand.","분홍 조개가 모래에서 빛나요."],
        ["The mermaid picks it up.","인어공주가 조개를 들어요."],
        ["Look at this!","이것 좀 봐!"]
      ],
      phrase:"Look at this!",
      words:[["shell","조개","🐚"],["pretty","예쁜","✨"],["pink","분홍색","🩷"]],
      quiz:{prompt:"shell을 찾아보세요!",answer:"shell",options:[["star","⭐"],["shell","🐚"],["apple","🍎"]]}
    },
    {
      title:"돌고래 친구", icon:"🐬",
      lines:[
        ["A dolphin jumps high.","돌고래가 높이 뛰어요."],
        ["They laugh and play together.","둘은 함께 웃고 놀아요."],
        ["Let's play!","같이 놀자!"]
      ],
      phrase:"Let's play!",
      words:[["friend","친구","🫶"],["jump","뛰다","🐬"],["play","놀다","🪁"]],
      quiz:{prompt:"jump를 찾아보세요!",answer:"jump",options:[["sit","🪑"],["jump","🐬"],["sleep","😴"]]}
    },
    {
      title:"집으로 가는 길", icon:"🌊",
      lines:[
        ["The sky turns orange.","하늘이 주황빛으로 변해요."],
        ["The friends swim home together.","친구들이 함께 집으로 헤엄쳐요."],
        ["I am happy!","나는 행복해!"]
      ],
      phrase:"I am happy!",
      words:[["home","집","🏠"],["happy","행복한","😊"],["together","함께","👭"]],
      quiz:{prompt:"happy를 찾아보세요!",answer:"happy",options:[["sad","😢"],["angry","😠"],["happy","😊"]]}
    }
  ],
  bebe: [
    {
      title:"혼자 준비해요", icon:"👚",
      lines:[
        ["Baby Koala chooses a pink shirt.","베베코알라는 분홍색 셔츠를 골라요."],
        ["She puts on her soft socks.","부드러운 양말을 신어요."],
        ["I am ready!","준비됐어요!"]
      ],
      phrase:"I am ready!",
      words:[["shirt","셔츠","👚"],["socks","양말","🧦"],["ready","준비된","✨"]],
      quiz:{prompt:"shirt를 찾아보세요!",answer:"shirt",options:[["hat","👒"],["shirt","👚"],["shorts","🩳"]]}
    },
    {
      title:"즐거운 소풍", icon:"🧺",
      lines:[
        ["Baby Koala packs a little basket.","베베코알라는 작은 바구니를 챙겨요."],
        ["She has a tasty sandwich.","맛있는 샌드위치도 있어요."],
        ["Let's have a picnic!","소풍을 즐겨요!"]
      ],
      phrase:"Let's have a picnic!",
      words:[["basket","바구니","🧺"],["picnic","소풍","🌳"],["sandwich","샌드위치","🥪"]],
      quiz:{prompt:"basket을 찾아보세요!",answer:"basket",options:[["basket","🧺"],["cup","🥤"],["book","📕"]]}
    },
    {
      title:"빗방울 놀이", icon:"☔",
      lines:[
        ["Baby Koala wears yellow boots.","베베코알라는 노란 장화를 신어요."],
        ["She opens a purple umbrella.","보라색 우산을 펼쳐요."],
        ["I see a puddle!","물웅덩이가 보여요!"]
      ],
      phrase:"I see a puddle!",
      words:[["boots","장화","🥾"],["umbrella","우산","☔"],["puddle","물웅덩이","💧"]],
      quiz:{prompt:"umbrella를 찾아보세요!",answer:"umbrella",options:[["coat","🧥"],["umbrella","☔"],["boots","🥾"]]}
    },
    {
      title:"별빛 잠옷", icon:"🌙",
      lines:[
        ["Baby Koala puts on star pajamas.","베베코알라는 별무늬 잠옷을 입어요."],
        ["She hugs a soft blanket.","부드러운 담요를 꼭 안아요."],
        ["Sweet dreams, Baby Koala!","좋은 꿈 꿔요, 베베코알라!"]
      ],
      phrase:"Sweet dreams!",
      words:[["pajamas","잠옷","🌟"],["blanket","담요","🛏️"],["dream","꿈","💭"]],
      quiz:{prompt:"pajamas를 찾아보세요!",answer:"pajamas",options:[["dress","👗"],["pajamas","🌟"],["coat","🧥"]]}
    }
  ]
};

function loadVoices() { voices = window.speechSynthesis?.getVoices() || []; }
function voiceFor(lang) {
  const candidates = voices.filter(v => v.lang.toLowerCase().startsWith(lang.toLowerCase()));
  const score = voice => {
    const name = voice.name.toLowerCase();
    let points = voice.localService ? 2 : 0;
    if (/natural|premium|enhanced|neural/.test(name)) points += 12;
    if (/google|microsoft/.test(name)) points += 6;
    if (/samantha|ava|jenny|aria|sunhi|yuna/.test(name)) points += 5;
    return points;
  };
  return candidates.sort((a,b) => score(b) - score(a))[0] || null;
}
function utter(text, { lang="en-US", rate=.8, pitch=1 }={}) {
  const u = new SpeechSynthesisUtterance(text);
  Object.assign(u, { lang, rate, pitch, volume:1 });
  const voice = voiceFor(lang.split("-")[0]);
  if (voice) u.voice = voice;
  return u;
}
function speak(text, options={}) {
  if (!("speechSynthesis" in window)) return alert("이 브라우저는 음성 재생을 지원하지 않습니다.");
  speechRunId += 1;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter(text, options));
}
function stopSpeech() {
  speechRunId += 1;
  if ("speechSynthesis" in window) speechSynthesis.cancel();
}
function speakSlow(text) { speak(text, { rate:.64, pitch:1 }); }
function speakSequence(items, { lang="en-US", rate=.76 }={}) {
  if (!("speechSynthesis" in window)) return alert("이 브라우저는 음성 재생을 지원하지 않습니다.");
  const runId = ++speechRunId;
  speechSynthesis.cancel();
  const queue = items.map(text => utter(text, {lang,rate,pitch:1}));
  queue.forEach((item,index) => {
    if (index < queue.length - 1) {
      item.onend = () => setTimeout(() => {
        if (runId === speechRunId) speechSynthesis.speak(queue[index + 1]);
      }, 320);
    }
  });
  if (queue[0]) speechSynthesis.speak(queue[0]);
}
function playWord(word, example) {
  const runId = ++speechRunId;
  speechSynthesis.cancel();
  const queue = [utter(word,{rate:.64}),utter(word,{rate:.64}),utter(example,{rate:.74})];
  queue[0].onend = () => setTimeout(() => {
    if (runId === speechRunId) speechSynthesis.speak(queue[1]);
  },220);
  queue[1].onend = () => setTimeout(() => {
    if (runId === speechRunId) speechSynthesis.speak(queue[2]);
  },300);
  speechSynthesis.speak(queue[0]);
}
function renderDayNav() {
  if (state.view !== "lesson") {
    dayNav.innerHTML = "";
    dayNav.hidden = true;
    return;
  }
  dayNav.hidden = false;
  const done = state.completedDates.includes(state.todayKey);
  const streak = learningStreak(state.completedDates);
  dayNav.innerHTML = `
    <div class="today-strip">
      <span>📅 ${formatToday()}</span>
      <strong>${done ? "⭐ 오늘 학습 완료" : "🌱 오늘의 수업"}</strong>
      <span>🔥 ${streak}일 연속</span>
    </div>`;
}
function updateProgress() {
  progressWrap.hidden = state.view !== "lesson";
  if (state.view !== "lesson") return;
  document.getElementById("progress-bar").style.width = `${(state.stage+1)*25}%`;
  document.getElementById("progress-text").textContent = `${state.stage+1} / 4`;
}
function render() {
  homeButton.classList.toggle("visible", state.view !== "home");
  if (state.view === "home") {
    renderHome();
    return;
  }
  if (state.view.startsWith("story:")) {
    renderStoryPreview(state.view.split(":")[1]);
    return;
  }
  if (state.view.startsWith("episode:")) {
    const [,key,index] = state.view.split(":");
    renderStoryEpisode(key, Number(index));
    return;
  }
  updateProgress();
  [renderDialogue,renderWords,renderQuiz,renderCompletion][state.stage](lessons[state.currentDay]);
}
function renderHome() {
  progressWrap.hidden = true;
  dayNav.hidden = true;
  const dailyLesson = lessons[state.currentDay];
  const done = state.completedDates.includes(state.todayKey);
  const streak = learningStreak(state.completedDates);
  screen.innerHTML = `
    <div class="menu-intro">
      <h2>오늘은 어떤 이야기를 만날까요?</h2>
      <p>${formatToday()} · ${done ? "오늘 학습을 완료했어요! ⭐" : "하루 5분, 즐겁게 시작해요."}${streak ? ` · 🔥 ${streak}일 연속` : ""}</p>
    </div>
    <div class="menu-grid">
      <button class="menu-card" data-menu="lesson">
        <span class="menu-emoji">${dailyLesson.emoji}</span>
        <span class="menu-copy"><strong>오늘의 영어 · ${dailyLesson.theme}</strong><span>${dailyLesson.pattern} · ${dailyLesson.words.map(word => word.en).join(", ")}${done ? " · 완료 ⭐" : ""}</span></span>
        <span class="menu-arrow">›</span>
      </button>
      <button class="menu-card story" data-menu="story:cinderella">
        <span class="menu-emoji">👗</span>
        <span class="menu-copy"><strong>신데렐라 이야기</strong><span>친절한 마음과 반짝이는 영어 표현</span></span>
        <span class="menu-arrow">›</span>
      </button>
      <button class="menu-card sea" data-menu="story:mermaid">
        <span class="menu-emoji">🧜‍♀️</span>
        <span class="menu-copy"><strong>인어공주 이야기</strong><span>바닷속 친구들과 신나는 영어 모험</span></span>
        <span class="menu-arrow">›</span>
      </button>
      <button class="menu-card koala" data-menu="story:bebe">
        <span class="menu-emoji">🐨</span>
        <span class="menu-copy"><strong>베베코알라 이야기</strong><span>포근한 일상에서 만나는 쉬운 영어</span></span>
        <span class="menu-arrow">›</span>
      </button>
    </div>`;
  screen.querySelectorAll("[data-menu]").forEach(button => {
    button.onclick = () => {
      state.view = button.dataset.menu;
      if (state.view === "lesson") renderDayNav();
      render();
    };
  });
}
function renderStoryPreview(key) {
  const story = storyPlans[key];
  progressWrap.hidden = true;
  dayNav.hidden = true;
  const episodes = story.episodes.map(([icon,title,words],index) => `
    <button class="episode-item" data-episode="${index}">
      <span class="episode-icon">${icon}</span>
      <span><strong>${index + 1}. ${title}</strong><span>${words}</span></span>
      <span class="episode-play">▶</span>
    </button>`).join("");
  screen.innerHTML = `
    <article class="card">
      <p class="stage-label">새로운 스토리 학습</p>
      <h2 class="stage-title">${story.emoji} ${story.title}</h2>
      <p class="stage-description">${story.description}</p>
      <div class="episode-list">${episodes}</div>
      <div class="notice">에피소드를 누르면 이야기 듣기 → 핵심 문장 → 단어 카드 → 그림 퀴즈 순서로 학습할 수 있어요.</div>
    </article>`;
  screen.querySelectorAll("[data-episode]").forEach(button => {
    button.onclick = () => {
      state.view = `episode:${key}:${button.dataset.episode}`;
      state.storyStage = 0;
      render();
      window.scrollTo({top:0,behavior:"smooth"});
    };
  });
}
function renderStoryEpisode(key,index) {
  const plan = storyPlans[key];
  const lesson = storyLessons[key][index];
  progressWrap.hidden = true;
  dayNav.hidden = true;
  const lines = lesson.lines.map(([en,ko],lineIndex) => `
    <section class="story-line">
      <span class="story-line-icon">${lineIndex === lesson.lines.length - 1 ? "💬" : lesson.icon}</span>
      <span class="story-line-copy"><strong>${en}</strong><span>${ko}</span></span>
      <span class="line-audio-pair">
        <button class="line-audio en" data-line="${lineIndex}" data-lang="en" aria-label="${en} 영어로 듣기">🇺🇸</button>
        <button class="line-audio ko" data-line="${lineIndex}" data-lang="ko" aria-label="${ko} 한국어로 듣기">🇰🇷</button>
      </span>
    </section>`).join("");
  const words = lesson.words.map(([en,ko,emoji],wordIndex) => `
    <article class="mini-word">
      <span>${emoji}</span><strong>${en}</strong><small>${ko}</small>
      <span class="mini-audio-row">
        <button data-story-word="${wordIndex}" data-lang="en" aria-label="${en} 영어로 듣기">🇺🇸 영어</button>
        <button data-story-word="${wordIndex}" data-lang="ko" aria-label="${ko} 한국어로 듣기">🇰🇷 한국어</button>
      </span>
    </article>`).join("");
  const options = lesson.quiz.options.map(([en,emoji],optionIndex) => `
    <article class="quiz-choice story-choice">
      <button class="story-quiz-option" data-story-option="${optionIndex}">
        <span>${emoji}</span><strong>${en}</strong>
      </button>
      <span class="choice-audio-row">
        <button data-story-option-audio="${optionIndex}" data-lang="en">🇺🇸</button>
        <button data-story-option-audio="${optionIndex}" data-lang="ko">🇰🇷</button>
      </span>
    </article>`).join("");
  const phraseTranslation = lesson.lines.find(([en]) => en.replace(/[.!?]/g,"").toLowerCase() === lesson.phrase.replace(/[.!?]/g,"").toLowerCase())?.[1] || "오늘의 한마디";
  const storyStages = [
    `
      <section class="story-step story-listen-step">
        <section class="read-story-box">
          <span class="read-story-icon">📖</span>
          <span><strong>이야기 듣기</strong><small>큰 버튼을 눌러 들어보세요.</small></span>
          <button data-read-story="en">🇺🇸 영어</button>
          <button data-read-story="ko">🇰🇷 한국어</button>
        </section>
        <div class="story-lines">${lines}</div>
      </section>`,
    `
      <section class="story-step story-word-step">
        <section class="phrase-box">
          <span>💬 오늘의 한마디</span>
          <strong>${lesson.phrase}</strong>
          <small>${phraseTranslation}</small>
          <span class="phrase-audio-row">
            <button data-phrase="en">🇺🇸 영어 듣기</button>
            <button data-phrase="ko">🇰🇷 한국어 듣기</button>
          </span>
        </section>
        <h3 class="story-heading">⭐ 단어를 눌러보세요</h3>
        <div class="mini-word-grid">${words}</div>
      </section>`,
    `
      <section class="story-step story-quiz">
        <h3>🎯 ${lesson.quiz.prompt}</h3>
        <div class="story-quiz-grid">${options}</div>
        <p class="feedback" data-story-feedback>그림을 골라보세요!</p>
        <div class="story-finish" data-story-finish hidden>🎉 참 잘했어요! ⭐</div>
      </section>`
  ];
  const storyStepLabels = ["1 · 이야기 듣기","2 · 단어 놀이","3 · 그림 퀴즈"];
  screen.innerHTML = `
    <article class="card story-lesson">
      <header class="story-step-header">
        <button class="story-back" data-story-back aria-label="${plan.title}로 돌아가기">← 돌아가기</button>
        <span class="story-step-title"><strong>${lesson.icon} ${lesson.title}</strong><small>${storyStepLabels[state.storyStage]}</small></span>
        <span class="story-step-dots" aria-label="3단계 중 ${state.storyStage + 1}단계">
          ${[0,1,2].map(step => `<i class="${step === state.storyStage ? "active" : ""}"></i>`).join("")}
        </span>
      </header>
      ${storyStages[state.storyStage]}
      <footer class="story-step-actions">
        <button class="secondary-btn" data-story-prev ${state.storyStage === 0 ? "disabled" : ""}>← 이전</button>
        <button class="primary-btn" data-story-next ${state.storyStage === 2 ? "hidden" : ""}>다음 →</button>
      </footer>
    </article>`;
  screen.querySelector("[data-story-back]").onclick = () => {
    stopSpeech();
    state.view = `story:${key}`;
    render();
  };
  const storyPrev = screen.querySelector("[data-story-prev]");
  const storyNext = screen.querySelector("[data-story-next]");
  storyPrev.onclick = () => {
    if (state.storyStage === 0) return;
    stopSpeech();
    state.storyStage -= 1;
    render();
  };
  if (storyNext) storyNext.onclick = () => {
    stopSpeech();
    state.storyStage = Math.min(state.storyStage + 1, 2);
    render();
  };
  screen.querySelectorAll("[data-line]").forEach(button => {
    button.onclick = () => {
      const line = lesson.lines[Number(button.dataset.line)];
      button.dataset.lang === "ko" ? speak(line[1],{lang:"ko-KR"}) : speak(line[0]);
    };
  });
  screen.querySelectorAll("[data-read-story]").forEach(button => {
    button.onclick = () => button.dataset.readStory === "ko"
      ? speakSequence(lesson.lines.map(line => line[1]),{lang:"ko-KR",rate:.8})
      : speakSequence(lesson.lines.map(line => line[0]),{rate:.74});
  });
  screen.querySelectorAll("[data-phrase]").forEach(button => {
    button.onclick = () => button.dataset.phrase === "ko"
      ? speak(phraseTranslation,{lang:"ko-KR",rate:.76})
      : speakSlow(lesson.phrase);
  });
  screen.querySelectorAll("[data-story-word]").forEach(button => {
    button.onclick = () => {
      const [en,ko] = lesson.words[Number(button.dataset.storyWord)];
      button.dataset.lang === "ko" ? speak(ko,{lang:"ko-KR"}) : speak(en,{rate:.64});
    };
  });
  screen.querySelectorAll("[data-story-option-audio]").forEach(button => {
    button.onclick = () => {
      const [en] = lesson.quiz.options[Number(button.dataset.storyOptionAudio)];
      button.dataset.lang === "ko"
        ? speak(koreanMeanings[en] || en,{lang:"ko-KR"})
        : speak(en,{rate:.66});
    };
  });
  const feedback = screen.querySelector("[data-story-feedback]");
  screen.querySelectorAll("[data-story-option]").forEach(button => {
    button.onclick = () => {
      const [en] = lesson.quiz.options[Number(button.dataset.storyOption)];
      speak(en,{rate:.62,pitch:1.08});
      screen.querySelectorAll(".story-quiz-option").forEach(el => el.classList.remove("wrong"));
      if(en === lesson.quiz.answer) {
        button.classList.add("correct");
        feedback.textContent = "정답이에요! 정말 잘했어요!";
        screen.querySelector("[data-story-finish]").hidden = false;
      } else {
        button.classList.add("wrong");
        feedback.textContent = "괜찮아요. 한 번 더 찾아볼까요?";
      }
    };
  });
}
function shell(step,title,description,content,actions) {
  screen.innerHTML = `<article class="card"><p class="stage-label">${step}단계 · ${stageNames[step-1]}</p><h2 class="stage-title">${title}</h2><p class="stage-description">${description}</p>${content}<div class="actions">${actions}</div></article>`;
}
function renderDialogue(l) {
  const cards = l.dialogues.map((x,i) => `<section class="dialogue-card"><div class="dialogue-head"><span class="character">${x.icon}</span><strong>${x.speaker} 친구</strong></div><p class="dialogue-en">${x.en}</p><p class="dialogue-ko">${x.ko}</p><div class="audio-row"><button class="control-btn" data-a="sentence" data-i="${i}">🔊 문장 듣기</button><button class="control-btn slow" data-a="slow" data-i="${i}">🐢 천천히</button><button class="control-btn korean" data-a="ko" data-i="${i}">🇰🇷 뜻 듣기</button></div></section>`).join("");
  shell(1,`${l.emoji} ${l.theme} 영어`,`먼저 영어 문장을 듣고 천천히 다시 들어보세요. 오늘의 표현은 <strong>${l.pattern}</strong> 입니다.`,`<div class="dialogue-list">${cards}</div>`,`<button class="primary-btn" data-next>오늘의 단어 보기 →</button>`);
  screen.querySelectorAll("[data-a]").forEach(btn => btn.onclick = () => {
    const x=l.dialogues[+btn.dataset.i];
    if(btn.dataset.a==="sentence") speak(x.en);
    if(btn.dataset.a==="slow") speakSlow(x.en);
    if(btn.dataset.a==="ko") speak(x.ko,{lang:"ko-KR",rate:.8,pitch:1});
  });
  screen.querySelector("[data-next]").onclick=nextStage;
}
function renderWords(l) {
  const cards=l.words.map((x,i)=>`<article class="word-card"><span class="word-emoji">${x.emoji}</span><span class="word-en">${x.en}</span><span class="word-ko">${x.ko}</span><span class="word-audio-row"><button data-word="${i}" data-lang="en">🇺🇸 영어</button><button data-word="${i}" data-lang="ko">🇰🇷 한국어</button></span></article>`).join("");
  shell(2,"⭐ 오늘의 주요 단어","단어 카드를 누르면 <strong>단어를 천천히 두 번</strong> 들려주고 예문도 읽어줍니다.",`<div class="word-grid">${cards}</div><div class="notice">부모님 팁: 바로 말하도록 재촉하기보다 같은 단어를 2~3번 즐겁게 반복해 주세요.</div>`,`<button class="secondary-btn" data-prev>← 이전</button><button class="primary-btn" data-next>그림 퀴즈 풀기 →</button>`);
  screen.querySelectorAll("[data-word]").forEach(btn=>btn.onclick=()=>{const x=l.words[+btn.dataset.word];btn.dataset.lang==="ko"?speak(x.ko,{lang:"ko-KR"}):playWord(x.en,x.example);});
  screen.querySelector("[data-prev]").onclick=prevStage; screen.querySelector("[data-next]").onclick=nextStage;
}
function renderQuiz(l) {
  const cards=l.quiz.options.map((x,i)=>`<article class="quiz-choice"><button class="quiz-option" data-option="${i}"><span class="quiz-emoji">${x.emoji}</span><span class="quiz-word">${x.en}</span></button><span class="choice-audio-row"><button data-option-audio="${i}" data-lang="en">🇺🇸 영어</button><button data-option-audio="${i}" data-lang="ko">🇰🇷 한국어</button></span></article>`).join("");
  shell(3,`🎯 ${l.quiz.prompt}`,"그림을 누르면 단어를 들을 수 있어요.",`<div class="quiz-grid">${cards}</div><p id="feedback" class="feedback"></p>`,`<button class="secondary-btn" data-prev>← 이전</button><button class="primary-btn" data-next ${state.quizSolved?"":"disabled"}>완료하기 →</button>`);
  const next=screen.querySelector("[data-next]"), feedback=screen.querySelector("#feedback");
  screen.querySelectorAll("[data-option]").forEach(btn=>btn.onclick=()=>{
    const x=l.quiz.options[+btn.dataset.option]; speak(x.en,{rate:.62,pitch:1.08});
    screen.querySelectorAll(".quiz-option").forEach(el=>el.classList.remove("wrong"));
    if(x.en===l.quiz.answer){btn.classList.add("correct");feedback.textContent="🎉 정답이에요! 정말 잘했어요!";state.quizSolved=true;next.disabled=false;}
    else{btn.classList.add("wrong");feedback.textContent="한 번 더 찾아볼까요? 😊";}
  });
  screen.querySelectorAll("[data-option-audio]").forEach(btn=>btn.onclick=()=>{
    const x=l.quiz.options[+btn.dataset.optionAudio];
    btn.dataset.lang==="ko"?speak(koreanMeanings[x.en]||x.en,{lang:"ko-KR"}):speak(x.en,{rate:.66});
  });
  screen.querySelector("[data-prev]").onclick=prevStage; next.onclick=()=>state.quizSolved&&nextStage();
}
function renderCompletion(l) {
  if(!state.completedDates.includes(state.todayKey)){
    state.completedDates.push(state.todayKey);
    localStorage.setItem(completedKey,JSON.stringify(state.completedDates));
    renderDayNav();
  }
  const streak = learningStreak(state.completedDates);
  screen.innerHTML=`<article class="card"><div class="completion"><div class="reward">🏆</div><p class="stage-label">4단계 · 오늘 학습 완료</p><h2>${l.theme} 영어 완료!</h2><p>오늘은 <strong>${l.theme}</strong>에 관한 영어를 배웠어요.<br>핵심 표현은 <strong>${l.pattern}</strong> 입니다.</p><div class="stars" aria-label="별 세 개">⭐ ⭐ ⭐</div><p class="streak-message">🔥 ${streak}일 연속 학습했어요!<br><small>내일은 새로운 영어가 기다리고 있어요.</small></p><button class="primary-btn" data-review>🔁 오늘 수업 다시 하기</button></div></article>`;
  speak("Great job! You did it!",{rate:.76,pitch:1.02});
  screen.querySelector("[data-review]").onclick=()=>{state.stage=0;state.quizSolved=false;render();};
}
function nextStage(){stopSpeech();state.stage=Math.min(state.stage+1,3);render();scrollTo({top:0,behavior:"smooth"});}
function prevStage(){stopSpeech();state.stage=Math.max(state.stage-1,0);render();scrollTo({top:0,behavior:"smooth"});}

homeButton.onclick = () => {
  stopSpeech();
  state.view = "home";
  renderDayNav();
  render();
};
renderDayNav(); render(); loadVoices();
if ("speechSynthesis" in window) speechSynthesis.onvoiceschanged=loadVoices;

function refreshDailyLesson() {
  const newTodayKey = localDateKey();
  if (newTodayKey === state.todayKey) return;
  Object.assign(state, {
    view:"home", currentDay:lessonKeyFor(), todayKey:newTodayKey, stage:0, quizSolved:false
  });
  stopSpeech();
  renderDayNav();
  render();
}
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) refreshDailyLesson();
});
window.addEventListener("focus", refreshDailyLesson);

let viewportFrame = 0;
function syncViewportFrame() {
  cancelAnimationFrame(viewportFrame);
  viewportFrame = requestAnimationFrame(() => {
    const viewport = window.visualViewport;
    const visibleHeight = Math.round(viewport ? viewport.height : window.innerHeight);
    const visibleTop = Math.round(viewport ? viewport.offsetTop : 0);
    document.documentElement.style.setProperty("--app-height", `${visibleHeight}px`);
    document.documentElement.style.setProperty("--viewport-top", `${visibleTop}px`);
  });
}
syncViewportFrame();
window.addEventListener("resize", syncViewportFrame, {passive:true});
window.addEventListener("orientationchange", syncViewportFrame, {passive:true});
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", syncViewportFrame, {passive:true});
  window.visualViewport.addEventListener("scroll", syncViewportFrame, {passive:true});
}

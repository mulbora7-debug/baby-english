const scene = (title, emoji, en, ko, word, wordKo, wordEmoji, ask, reply, choices) => ({
  title, emoji, en, ko, word, wordKo, wordEmoji, ask, reply,
  choices: choices.map(([en, ko, emoji]) => ({ en, ko, emoji }))
});

const stories = {
  cinderella: {
    title: "신데렐라", emoji: "👗", theme: "rose", tagline: "친절한 마음과 반짝이는 무도회",
    scenes: [
      scene("친절한 신데렐라","🧹","Cinderella is kind. She helps every day.","신데렐라는 친절해요. 매일 즐겁게 도와줘요.","help","돕다","🤝","Can you help?","I can help!",[["help","돕다","🤝"],["sleep","자다","😴"],["eat","먹다","🍽️"]]),
      scene("반짝이는 초대장","💌","A shiny invitation arrives for the royal ball.","왕궁 무도회에서 온 반짝이는 초대장이 도착해요.","invitation","초대장","💌","What is this?","It is an invitation!",[["invitation","초대장","💌"],["book","책","📕"],["shoe","신발","👟"]]),
      scene("다정한 요정","🪄","A kind fairy comes with a sparkling wand.","다정한 요정이 반짝이는 지팡이를 들고 와요.","fairy","요정","🧚","Who is she?","She is a fairy!",[["fairy","요정","🧚"],["bird","새","🐦"],["cat","고양이","🐱"]]),
      scene("호박 마차","🎃","The pumpkin turns into a beautiful coach.","호박이 아름다운 마차로 변해요.","coach","마차","🎃","What is it?","It is a coach!",[["coach","마차","🎃"],["bus","버스","🚌"],["boat","배","⛵"]]),
      scene("파란 드레스","👗","Cinderella wears a blue dress and glass shoes.","신데렐라는 파란 드레스와 유리구두를 신어요.","dress","드레스","👗","What color is it?","It is blue!",[["dress","드레스","👗"],["hat","모자","👒"],["coat","외투","🧥"]]),
      scene("즐거운 춤","💃","Music plays, and Cinderella dances at the ball.","음악이 흐르고 신데렐라는 무도회에서 춤을 춰요.","dance","춤추다","💃","Shall we dance?","Let's dance!",[["dance","춤추다","💃"],["swim","수영하다","🏊"],["sleep","자다","😴"]]),
      scene("열두 시 종소리","🕛","The clock rings twelve. It is time to go.","시계가 열두 번 울려요. 이제 갈 시간이에요.","clock","시계","🕛","What time is it?","It is time to go!",[["clock","시계","🕛"],["star","별","⭐"],["flower","꽃","🌸"]]),
      scene("작은 유리구두","👠","Cinderella runs home and leaves one glass shoe.","신데렐라는 집으로 달리다가 유리구두 한 짝을 남겨요.","shoe","신발","👠","What did she leave?","My shoe!",[["shoe","신발","👠"],["cup","컵","🥤"],["apple","사과","🍎"]]),
      scene("구두의 주인","🔎","The prince searches everywhere for the shoe's owner.","왕자는 구두의 주인을 찾으러 여기저기 다녀요.","find","찾다","🔎","Is this yours?","Yes, it is mine!",[["find","찾다","🔎"],["jump","뛰다","🏃"],["sing","노래하다","🎤"]]),
      scene("행복한 축하","🏰","The shoe fits. Everyone celebrates together.","유리구두가 꼭 맞아요. 모두 함께 행복하게 축하해요.","happy","행복한","😊","How do you feel?","I am happy!",[["happy","행복한","😊"],["sad","슬픈","😢"],["sleepy","졸린","🥱"]])
    ]
  },
  snowwhite: {
    title: "백설공주", emoji: "🍎", theme: "berry", tagline: "숲속 친구들과 함께하는 용기 이야기",
    scenes: [
      scene("마법 거울","🪞","A queen looks into a magic mirror.","왕비가 마법 거울을 바라봐요.","mirror","거울","🪞","What do you see?","I see a mirror!",[["mirror","거울","🪞"],["window","창문","🪟"],["door","문","🚪"]]),
      scene("용감한 숲길","🌲","Snow White walks bravely through the green forest.","백설공주는 푸른 숲길을 용감하게 걸어요.","brave","용감한","💛","Are you brave?","I am brave!",[["brave","용감한","💛"],["sleepy","졸린","🥱"],["hungry","배고픈","😋"]]),
      scene("작은 오두막","🏡","She finds a tiny cottage under the trees.","나무 아래에서 작은 오두막을 발견해요.","house","집","🏡","What do you see?","I see a house!",[["house","집","🏡"],["ship","배","🚢"],["coach","마차","🎃"]]),
      scene("일곱 친구","👋","Seven little friends come home and say hello.","일곱 명의 작은 친구들이 돌아와 인사해요.","friend","친구","🫶","Who are they?","They are my friends!",[["friend","친구","🫶"],["fish","물고기","🐠"],["flower","꽃","🌸"]]),
      scene("함께 정리해요","🧹","Snow White and her friends clean the cottage together.","백설공주와 친구들이 오두막을 함께 정리해요.","clean","청소하다","🧹","Shall we clean?","Let's clean!",[["clean","청소하다","🧹"],["dance","춤추다","💃"],["swim","수영하다","🏊"]]),
      scene("맛있는 저녁","🥣","They share warm soup and sing a happy song.","따뜻한 수프를 나누고 즐거운 노래를 불러요.","soup","수프","🥣","Do you like soup?","I like soup!",[["soup","수프","🥣"],["shoe","신발","👟"],["star","별","⭐"]]),
      scene("낯선 방문객","🚪","A visitor knocks on the cottage door.","낯선 방문객이 오두막 문을 두드려요.","door","문","🚪","Who is it?","Who is at the door?",[["door","문","🚪"],["mirror","거울","🪞"],["tree","나무","🌳"]]),
      scene("반짝이는 사과","🍎","Snow White sees a shiny red apple and feels sleepy.","백설공주는 반짝이는 빨간 사과를 보고 잠이 와요.","apple","사과","🍎","What color is it?","It is red!",[["apple","사과","🍎"],["banana","바나나","🍌"],["grape","포도","🍇"]]),
      scene("친구들의 노래","🎵","Her friends sing gently, and Snow White wakes up.","친구들이 다정하게 노래하자 백설공주가 깨어나요.","wake","깨다","☀️","Are you awake?","I am awake!",[["wake","깨다","☀️"],["sleep","자다","😴"],["eat","먹다","🍽️"]]),
      scene("숲속 축하 파티","🌼","The forest fills with flowers, music, and happy friends.","숲이 꽃과 음악, 행복한 친구들로 가득해요.","together","함께","👭","Shall we celebrate?","Let's play together!",[["together","함께","👭"],["alone","혼자","🧍"],["night","밤","🌙"]])
    ]
  },
  mermaid: {
    title: "인어공주", emoji: "🧜‍♀️", theme: "ocean", tagline: "바다와 육지를 잇는 우정의 모험",
    scenes: [
      scene("푸른 바다 궁전","🏰","A little mermaid swims near a coral palace.","작은 인어공주가 산호 궁전 곁을 헤엄쳐요.","swim","헤엄치다","🏊","Can you swim?","I can swim!",[["swim","헤엄치다","🏊"],["walk","걷다","🚶"],["sleep","자다","😴"]]),
      scene("반짝이는 보물","🐚","She collects pretty shells and shiny pearls.","예쁜 조개와 반짝이는 진주를 모아요.","shell","조개","🐚","What is this?","It is a shell!",[["shell","조개","🐚"],["apple","사과","🍎"],["shoe","신발","👟"]]),
      scene("커다란 배","🚢","The mermaid looks up and sees a big ship.","인어공주가 위를 보니 커다란 배가 보여요.","ship","배","🚢","What do you see?","I see a ship!",[["ship","배","🚢"],["house","집","🏡"],["coach","마차","🎃"]]),
      scene("거센 파도","🌊","Big waves splash, and the mermaid helps a friend.","큰 파도가 철썩이고 인어공주는 친구를 도와줘요.","wave","파도","🌊","Can you help?","I can help!",[["wave","파도","🌊"],["cloud","구름","☁️"],["flower","꽃","🌸"]]),
      scene("따뜻한 모래사장","🏖️","She brings her friend safely to the warm shore.","친구를 따뜻한 모래사장으로 안전하게 데려와요.","safe","안전한","🛟","Are you okay?","I am okay!",[["safe","안전한","🛟"],["wet","젖은","💦"],["cold","추운","🥶"]]),
      scene("바다의 마법","✨","Gentle sea magic opens a path to the land.","다정한 바다의 마법이 육지로 가는 길을 열어줘요.","magic","마법","✨","Are you ready?","I am ready!",[["magic","마법","✨"],["clock","시계","🕛"],["basket","바구니","🧺"]]),
      scene("첫걸음","👣","The mermaid takes her first steps on the land.","인어공주가 육지에서 첫걸음을 내디뎌요.","walk","걷다","🚶","Can you walk?","I can walk!",[["walk","걷다","🚶"],["swim","헤엄치다","🏊"],["fly","날다","🕊️"]]),
      scene("꽃이 핀 정원","🌸","She visits a garden full of colorful flowers.","알록달록한 꽃이 가득한 정원에 가요.","flower","꽃","🌸","What do you see?","I see flowers!",[["flower","꽃","🌸"],["fish","물고기","🐠"],["clock","시계","🕛"]]),
      scene("용기 있는 선택","💛","The mermaid chooses kindness and keeps her own voice.","인어공주는 친절을 선택하고 자신의 목소리를 지켜요.","voice","목소리","🎤","Can you sing?","I can sing!",[["voice","목소리","🎤"],["shoe","신발","👟"],["soup","수프","🥣"]]),
      scene("두 세상의 친구들","🌈","Friends from the sea and land celebrate together.","바다와 육지의 친구들이 모두 함께 축하해요.","friend","친구","🫶","Shall we be friends?","Let's be friends!",[["friend","친구","🫶"],["queen","왕비","👑"],["mirror","거울","🪞"]])
    ]
  }
};

const screen = document.getElementById("screen");
const storageKey = "fairyEnglishProgressV2";
const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
const state = { view:"home", storyKey:null, sceneIndex:0, mode:"story", solved:false };
let voices = [];
let speechRun = 0;

function loadVoices() { voices = window.speechSynthesis?.getVoices?.() || []; }
function bestVoice(lang) {
  const list = voices.filter(v => v.lang.toLowerCase().startsWith(lang.toLowerCase()));
  const score = v => (/natural|premium|enhanced|neural/i.test(v.name)?10:0)+(/google|microsoft/i.test(v.name)?5:0)+(v.localService?2:0);
  return list.sort((a,b)=>score(b)-score(a))[0] || null;
}
function utter(text, lang="en-US", rate=.78) {
  const value = new SpeechSynthesisUtterance(text);
  Object.assign(value,{lang,rate,pitch:1,volume:1});
  value.voice = bestVoice(lang.split("-")[0]);
  return value;
}
function speak(text, lang="en-US", rate=.78) {
  if (!("speechSynthesis" in window)) return;
  speechRun += 1; speechSynthesis.cancel(); speechSynthesis.speak(utter(text,lang,rate));
}
function speakAll(lines, lang="en-US") {
  if (!("speechSynthesis" in window)) return;
  const run = ++speechRun; speechSynthesis.cancel();
  const queue = lines.map(text=>utter(text,lang,lang==="ko-KR"?.82:.74));
  queue.forEach((item,i)=>item.onend=()=>setTimeout(()=>{ if(run===speechRun && queue[i+1]) speechSynthesis.speak(queue[i+1]); },260));
  if(queue[0]) speechSynthesis.speak(queue[0]);
}
function stopSpeech(){ speechRun+=1; window.speechSynthesis?.cancel?.(); }
function saveProgress(key,index){ saved[key]=Math.max(saved[key]||0,index); localStorage.setItem(storageKey,JSON.stringify(saved)); }
function progressFor(key){ return Math.min(saved[key]||0, stories[key].scenes.length); }

function render(){
  stopSpeech();
  document.body.dataset.view=state.view;
  if(state.view==="home") return renderHome();
  if(state.view==="library") return renderLibrary();
  renderScene();
}

function renderHome(){
  const continueKey = Object.keys(stories).find(key=>progressFor(key)>0 && progressFor(key)<stories[key].scenes.length);
  screen.innerHTML=`<section class="home-view">
    <header class="welcome"><span class="sparkle">✨</span><div><h1>오늘은 어떤 공주를 만날까요?</h1><p>이야기를 고르고 영어로 함께 놀아요!</p></div>${continueKey?`<button class="continue-btn" data-continue>▶ 이어서</button>`:""}</header>
    <div class="book-grid">${Object.entries(stories).map(([key,story])=>{const done=progressFor(key);return `<button class="story-book ${story.theme}" data-story="${key}"><span class="book-emoji">${story.emoji}</span><span class="book-copy"><strong>${story.title}</strong><small>${story.tagline}</small><span class="book-progress"><i style="width:${done*10}%"></i></span><em>${done} / 10 장</em></span><span class="book-open">책 열기 ›</span></button>`}).join("")}</div>
  </section>`;
  screen.querySelectorAll("[data-story]").forEach(btn=>btn.onclick=()=>{state.storyKey=btn.dataset.story;state.view="library";render();});
  screen.querySelector("[data-continue]")?.addEventListener("click",()=>{state.storyKey=continueKey;state.sceneIndex=Math.min(progressFor(continueKey),9);state.mode="story";state.view="scene";render();});
}

function renderLibrary(){
  const story=stories[state.storyKey], done=progressFor(state.storyKey);
  screen.innerHTML=`<section class="library-view ${story.theme}">
    <header class="view-header"><button data-home>🏠 처음</button><div><h1>${story.emoji} ${story.title}</h1><p>${story.tagline}</p></div><div class="listen-all"><button data-all="en">🇺🇸 전체 듣기</button><button data-all="ko">🇰🇷 전체 듣기</button></div></header>
    <div class="chapter-grid">${story.scenes.map((item,i)=>`<button data-chapter="${i}" class="chapter ${i<done?"done":""}"><span>${item.emoji}</span><strong>${i+1}. ${item.title}</strong><small>${i<done?"⭐ 다시 보기":"▶ 시작하기"}</small></button>`).join("")}</div>
  </section>`;
  screen.querySelector("[data-home]").onclick=()=>{state.view="home";render();};
  screen.querySelectorAll("[data-all]").forEach(btn=>btn.onclick=()=>speakAll(story.scenes.map(x=>btn.dataset.all==="ko"?x.ko:x.en),btn.dataset.all==="ko"?"ko-KR":"en-US"));
  screen.querySelectorAll("[data-chapter]").forEach(btn=>btn.onclick=()=>{state.sceneIndex=+btn.dataset.chapter;state.mode="story";state.solved=false;state.view="scene";render();});
}

function renderScene(){
  const story=stories[state.storyKey], item=story.scenes[state.sceneIndex];
  const progress=(state.sceneIndex+1)*10;
  screen.innerHTML=`<section class="scene-view ${story.theme}">
    <header class="scene-header"><button data-library>← 목차</button><div><strong>${story.title} · ${state.sceneIndex+1}장</strong><span>${item.title}</span></div><div class="scene-progress"><i style="width:${progress}%"></i></div><em>${state.sceneIndex+1}/10</em></header>
    ${state.mode==="story"?storyPage(item):playPage(item)}
  </section>`;
  screen.querySelector("[data-library]").onclick=()=>{state.view="library";render();};
  bindSceneActions(item);
}

function storyPage(item){
  return `<main class="story-page"><div class="scene-picture"><span>${item.emoji}</span><i>✨</i><i>⭐</i><strong>${item.word}</strong><small>${item.wordKo}</small></div>
    <div class="story-panel"><p class="english-line">${item.en}</p><p class="korean-line">${item.ko}</p><div class="voice-row"><button data-say="en">🇺🇸 영어 듣기</button><button data-say="ko">🇰🇷 한국어 듣기</button></div>
      <section class="talk-box"><span class="character-face">👸</span><div><small>캐릭터가 물어봐요</small><strong>${item.ask}</strong></div><button data-reply>💬 ${item.reply}</button></section>
    </div></main><footer class="scene-actions"><button data-prev ${state.sceneIndex===0?"disabled":""}>← 이전 장</button><button class="magic-btn" data-play>그림 놀이 하기 ✨</button></footer>`;
}

function playPage(item){
  const letter=item.word[0].toUpperCase();
  return `<main class="play-page"><header><span>🎯</span><div><h2>${item.word}를 찾아보세요!</h2><p>그림을 누르면 영어와 한국어를 들을 수 있어요.</p></div><button data-chant>🎵 ${letter}, ${letter}, ${item.word}!</button></header>
    <div class="choice-grid">${item.choices.map((choice,i)=>`<button class="picture-choice" data-choice="${i}"><span>${choice.emoji}</span><strong>${choice.en}</strong><small>${choice.ko}</small></button>`).join("")}</div>
    <div class="play-feedback" data-feedback>${state.solved?"🎉 참 잘했어요! 별을 받았어요! ⭐":"마음에 드는 그림을 눌러보세요."}</div></main>
    <footer class="scene-actions"><button data-story-mode>← 이야기</button><button class="magic-btn" data-next ${state.solved?"":"disabled"}>${state.sceneIndex===9?"이야기 완성! 🏆":"다음 장 →"}</button></footer>`;
}

function bindSceneActions(item){
  screen.querySelector("[data-say='en']")?.addEventListener("click",()=>speak(item.en));
  screen.querySelector("[data-say='ko']")?.addEventListener("click",()=>speak(item.ko,"ko-KR",.82));
  screen.querySelector("[data-reply]")?.addEventListener("click",()=>speak(item.reply,"en-US",.7));
  screen.querySelector("[data-play]")?.addEventListener("click",()=>{state.mode="play";state.solved=false;render();});
  screen.querySelector("[data-prev]")?.addEventListener("click",()=>{if(state.sceneIndex){state.sceneIndex-=1;state.mode="story";render();}});
  screen.querySelector("[data-story-mode]")?.addEventListener("click",()=>{state.mode="story";render();});
  screen.querySelector("[data-chant]")?.addEventListener("click",()=>speak(`${item.word[0].toUpperCase()}, ${item.word[0].toUpperCase()}, ${item.word}!`,"en-US",.62));
  screen.querySelectorAll("[data-choice]").forEach(btn=>btn.onclick=()=>{
    const choice=item.choices[+btn.dataset.choice]; speak(choice.en,"en-US",.66);
    screen.querySelectorAll(".picture-choice").forEach(x=>x.classList.remove("wrong"));
    if(choice.en===item.word){btn.classList.add("correct");state.solved=true;saveProgress(state.storyKey,state.sceneIndex+1);screen.querySelector("[data-feedback]").textContent="🎉 맞았어요! 반짝이는 별을 받았어요! ⭐";screen.querySelector("[data-next]").disabled=false;}else{btn.classList.add("wrong");screen.querySelector("[data-feedback]").textContent="괜찮아요! 다른 그림도 눌러볼까요?";}
  });
  screen.querySelector("[data-next]")?.addEventListener("click",()=>{if(!state.solved)return;if(state.sceneIndex===9){state.view="library";}else{state.sceneIndex+=1;state.mode="story";state.solved=false;}render();});
}

function syncHeight(){document.documentElement.style.setProperty("--app-height",`${Math.round(window.visualViewport?.height||window.innerHeight)}px`);}
syncHeight(); window.addEventListener("resize",syncHeight,{passive:true}); window.visualViewport?.addEventListener("resize",syncHeight,{passive:true});
loadVoices(); if("speechSynthesis" in window) speechSynthesis.onvoiceschanged=loadVoices;
render();

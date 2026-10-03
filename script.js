const scenes = [...document.querySelectorAll(".scene")];
const chapterCount = document.getElementById("chapterCount");
const startBtn = document.getElementById("startBtn");
const home = document.getElementById("home");
const world = document.getElementById("world");

let sceneIndex = 0;
let loveOpened = 0;
let starsOpened = 0;

function showScene(index){
  sceneIndex = Math.max(0, Math.min(index, scenes.length - 1));
  scenes.forEach((s,i)=>s.classList.toggle("scene-active", i === sceneIndex));
  chapterCount.textContent = `${sceneIndex + 1} / ${scenes.length}`;
  window.scrollTo({top:0, behavior:"smooth"});
}

startBtn.addEventListener("click", ()=>{
  home.classList.remove("active");
  world.classList.add("active");
  showScene(0);
  loveBurst(12);
});

document.querySelectorAll(".next").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    showScene(sceneIndex + 1);
    loveBurst(6);
  });
});

// Love-click popups
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
document.querySelectorAll("#loveClicks button").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    if(!btn.classList.contains("opened")){
      btn.classList.add("opened");
      loveOpened++;
      document.getElementById("clickStatus").textContent = `${loveOpened} / 6 opened`;
      loveBurst(4);
    }
    popupText.innerHTML = btn.dataset.note;
    popup.classList.add("show");
    popup.setAttribute("aria-hidden","false");
  });
});
document.getElementById("popupClose").addEventListener("click", closePopup);
popup.addEventListener("click", e=>{ if(e.target===popup) closePopup(); });
function closePopup(){
  popup.classList.remove("show");
  popup.setAttribute("aria-hidden","true");
}
document.getElementById("clickNext").addEventListener("click", ()=>{
  if(loveOpened >= 6) showScene(3);
  else {
    popupText.innerHTML = "Open all six little things first… I hid one piece of love in each. ♡";
    popup.classList.add("show");
  }
});

// 11 stars
const starMap = document.getElementById("starMap");
const starMessage = document.getElementById("starMessage");
const notes = [
  "August — your voice was the first little thing that stayed in my head.",
  "Month 2 — talking to you started feeling natural.",
  "Month 3 — your innocence became something I adored.",
  "Month 4 — I was falling, without even noticing it.",
  "Month 5 — 'pagal' became one of my favourite words.",
  "Month 6 — late-night calls started feeling like home.",
  "Month 7 — distance didn't stop you from feeling close.",
  "Month 8 — we learned that love also needs understanding.",
  "Month 9 — even our silly clashes couldn't erase the care.",
  "Month 10 — we kept choosing to talk, understand and stay.",
  "Month 11 — you're still here, and you're still one of my most precious people."
];
const coords = [
  [8,63],[17,38],[26,70],[35,30],[44,55],[53,22],[62,60],[71,38],[79,68],[87,45],[94,63]
];
coords.forEach((xy,i)=>{
  const b=document.createElement("button");
  b.className="const-star";
  b.style.left=xy[0]+"%";
  b.style.top=xy[1]+"%";
  b.title=`Star ${i+1}`;
  b.addEventListener("click", ()=>{
    if(!b.classList.contains("opened")){
      b.classList.add("opened");
      starsOpened++;
    }
    starMessage.textContent = notes[i];
    loveBurst(3);
  });
  starMap.appendChild(b);
});
for(let i=0;i<coords.length-1;i++){
  const [x1,y1]=coords[i], [x2,y2]=coords[i+1];
  const line=document.createElement("div");
  line.style.position="absolute";
  line.style.left=x1+"%";
  line.style.top=y1+"%";
  line.style.height="2px";
  line.style.width=Math.hypot(x2-x1,y2-y1)+"%";
  line.style.background="rgba(179,64,64,.18)";
  line.style.transformOrigin="left center";
  line.style.transform=`rotate(${Math.atan2(y2-y1,x2-x1)*180/Math.PI}deg)`;
  starMap.insertBefore(line, starMap.firstChild);
}
document.getElementById("starNext").addEventListener("click", ()=>{
  if(starsOpened >= 11){
    showScene(5);
    loveBurst(10);
  } else {
    starMessage.textContent = "There are still a few stars waiting for you… ♡";
  }
});

// Final burst
document.getElementById("finalBtn").addEventListener("click", ()=>{
  document.getElementById("ending").classList.add("show");
  loveBurst(35);
  for(let i=0;i<40;i++) setTimeout(dropHeart, i*40);
});

// Music support — uses music.mp3 in the same GitHub Pages folder.
const music = document.getElementById("ourMusic");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");
music.volume = 0.65;

musicToggle.addEventListener("click", async ()=>{
  if (music.paused) {
    try {
      music.load();
      await music.play();
      musicLabel.textContent = "pause";
    } catch (e) {
      musicLabel.textContent = "tap again";
    }
  } else {
    music.pause();
    musicLabel.textContent = "music";
  }
});

function dropHeart(){
  const h=document.createElement("div");
  h.className="heart-fall";
  h.textContent=["♥","♡","✦"][Math.floor(Math.random()*3)];
  h.style.left=(Math.random()*100)+"vw";
  h.style.top=(-5-Math.random()*10)+"vh";
  h.style.animationDuration=(2+Math.random()*2.2)+"s";
  document.body.appendChild(h);
  setTimeout(()=>h.remove(),5000);
}
function loveBurst(count){
  for(let i=0;i<count;i++){
    setTimeout(()=>{
      const h=document.createElement("div");
      h.className="star-fall";
      h.textContent=["♥","♡","✦"][Math.floor(Math.random()*3)];
      h.style.left=(Math.random()*100)+"vw";
      h.style.top=(-4-Math.random()*8)+"vh";
      h.style.animationDuration=(1.8+Math.random()*1.8)+"s";
      document.body.appendChild(h);
      setTimeout(()=>h.remove(),4500);
    },i*35);
  }
}

// Background sparkle field
const sparkleWrap = document.getElementById("sparkles");
for(let i=0;i<65;i++){
  const s=document.createElement("span");
  s.style.position="absolute";
  s.style.left=Math.random()*100+"vw";
  s.style.top=Math.random()*100+"vh";
  s.style.width=(1+Math.random()*2)+"px";
  s.style.height=s.style.width;
  s.style.background="#ffffff";
  s.style.borderRadius="50%";
  s.style.opacity=(0.2+Math.random()*0.5).toFixed(2);
  s.style.boxShadow="0 0 6px rgba(255,255,255,.9)";
  sparkleWrap.appendChild(s);
}

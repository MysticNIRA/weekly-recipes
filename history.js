/* "Cooked it" history. On a recipe's last screen the cook can rate it 👍 (make again) or 👎 (not
   for me), or just mark it cooked. Entries are {id, date: "YYYY-MM-DD", rating: "up" | "down" | ""},
   one per recipe per day, kept in this browser. All recipes uses them for stickers and the
   "Make again" and "Not tried yet" filters; My recipes lists them. */
const HISTORY_KEY="weekly-recipes-history",HISTORY_LIMIT=500;
const RATINGS=["up","down",""];
function cleanHistory(raw){
  if(!Array.isArray(raw))return [];
  return raw.filter(e=>typeof e?.id==="string"&&/^[a-z0-9-]{1,60}$/.test(e.id)&&/^\d{4}-\d{2}-\d{2}$/.test(e.date)&&RATINGS.includes(e.rating))
    .map(e=>({id:e.id,date:e.date,rating:e.rating})).slice(-HISTORY_LIMIT);
}
let cookHistory=[];
try{cookHistory=cleanHistory(JSON.parse(localStorage.getItem(HISTORY_KEY)||"[]"))}catch(e){}
function saveHistory(){try{localStorage.setItem(HISTORY_KEY,JSON.stringify(cookHistory))}catch(e){}}
const isoDay=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const fmtDay=day=>new Date(day+"T12:00").toLocaleDateString([],{month:"short",day:"numeric"});
const RATING_ICON={up:"👍",down:"👎","":""};

// Rating the same recipe again on the same day changes that day's entry instead of adding one.
function recordCooked(history,id,rating,day){
  const i=history.findIndex(e=>e.id===id&&e.date===day);
  const next=[...history];
  if(i>=0)next[i]={id,date:day,rating};else next.push({id,date:day,rating});
  return next.slice(-HISTORY_LIMIT);
}
// How often a recipe was cooked, when last, and its most recent rating.
function historyFor(history,id){
  const entries=history.filter(e=>e.id===id).sort((a,b)=>a.date.localeCompare(b.date));
  if(!entries.length)return null;
  const rated=entries.filter(e=>e.rating);
  return {times:entries.length,last:entries[entries.length-1].date,rating:rated.length?rated[rated.length-1].rating:""};
}

/* ---------- on the recipe and in All recipes ---------- */
function historyStickerHtml(id){
  const h=historyFor(cookHistory,id);
  return h?`<span class="sticker">${RATING_ICON[h.rating]?RATING_ICON[h.rating]+" ":""}Cooked ${h.times}×</span>`:"";
}
function lastCookedText(id){
  const h=historyFor(cookHistory,id);
  return h?`last cooked ${fmtDay(h.last)}${RATING_ICON[h.rating]?" "+RATING_ICON[h.rating]:""}`:"";
}
// The "How was it?" box on a recipe's last screen.
function rateHtml(r){
  const e=cookHistory.find(x=>x.id===r.id&&x.date===isoDay());
  const button=(rating,label)=>`<button class="btn ${e?.rating===rating?"":"secondary"}" data-rate="${rating}" aria-pressed="${e?.rating===rating}">${label}</button>`;
  const saved=!e?"":e.rating==="up"?"Saved. It'll show under 👍 Make again in All recipes."
    :e.rating==="down"?"Saved. You can still find it in All recipes.":"Saved as cooked today.";
  return `<div class="rate-box">
    <p class="rate-q">How was it?</p>
    <div class="controls">${button("up","👍 Make again")}${button("down","👎 Not for me")}${button("","✓ Just mark it cooked")}</div>
    ${saved?`<p class="recipe-sub" role="status" style="margin:8px 0 0">${saved}</p>`:""}
  </div>`;
}
function bindRate(r,rerender){
  document.querySelectorAll("button[data-rate]").forEach(b=>b.onclick=()=>{
    cookHistory=recordCooked(cookHistory,r.id,b.dataset.rate,isoDay());
    saveHistory();rerender();
  });
}

/* ---------- the list in My recipes ---------- */
function historyListHtml(){
  if(!cookHistory.length)return `<h3 class="my-head">Cooking history</h3><p class="recipe-sub">Nothing yet. When you finish a recipe, the last screen asks how it was; your answers show up here.</p>`;
  const recent=cookHistory.map((e,i)=>({...e,i})).sort((a,b)=>b.date.localeCompare(a.date)||b.i-a.i).slice(0,30);
  return `<h3 class="my-head">Cooking history</h3>
    <p class="recipe-sub">What you've cooked, newest first. Kept on this device.</p>
    ${recent.map(e=>`<div class="shop-item"><span style="flex:1"><span class="shop-name">${byId[e.id]?byId[e.id].title:"(a recipe you deleted)"}</span>
      <span class="shop-for">${fmtDay(e.date)}${e.rating==="up"?" · 👍 make again":e.rating==="down"?" · 👎 not for me":""}</span></span>
      <button class="btn secondary" data-history-remove="${e.i}" aria-label="Remove this entry">Remove</button></div>`).join("")}`;
}
function bindHistoryList(root,rerender){
  root.querySelectorAll("button[data-history-remove]").forEach(b=>b.onclick=()=>{
    cookHistory=cookHistory.filter((e,i)=>i!==+b.dataset.historyRemove);
    saveHistory();rerender();
  });
}

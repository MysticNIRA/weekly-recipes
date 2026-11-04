/* The welcome tour: a few short cards the first time someone opens the app, each pointing at the
   part of the screen it describes. It can be replayed from Settings → Help. Loaded before the main
   script; startTour and maybeStartTour only run once the page is ready. */
const TOUR_KEY="weekly-recipes-tour-done";
const TOUR_STEPS=[
 {title:"Welcome to Weekly Recipes",target:null,
  text:"Every day of the week already has a meal planned, so there's nothing to decide. Each recipe walks you through one step at a time with timers, so there's less to remember while you cook."},
 {title:"Your week",target:"days",
  text:"Monday to Sunday, with today highlighted. Tap a day to see its meal, or press Next week to plan ahead. If a meal needs soaking or marinating, a reminder shows up here the day before."},
 {title:"Cooking",target:"cookBtn",
  text:"Press Cook today's meal when you're ready. First you get everything out, then each step has a timer that beeps when time's up. ← Back to the week keeps your place."},
 {title:"Changing a day's meal",target:"swapBtn",
  text:"Want something else? Tap the day, then press Pick a different recipe and choose one. Only that date changes, and the rest of your week stays the same."},
 {title:"All recipes",target:"tabCat",
  text:"Over 200 recipes from around the world. Search, tap a quick chip like Under $3/serving, or open Filters. Press Add to plan on any recipe, then pick the day to put it on."},
 {title:"Shopping list",target:"tabShop",
  text:"A list built from your week's meals, sorted by store aisle. Tap Have it for things you already have, add your own items, and save lists for later."},
 {title:"My recipes",target:"tabMine",
  text:"Write down your own recipes, as short as an ingredient list or with steps and timers. They work everywhere other recipes do."},
 {title:"Swaps and Settings",target:"settingsBtn",
  text:"Swaps uses cheaper ingredients or what you have on hand. Settings has bigger text, dark mode, read-aloud, and more. You can replay this tour there anytime."}
];
// Optional help for the Shopping list, started from "How do lists work?" on that screen.
const LIST_TOUR_STEPS=[
 {title:"Pick the days you're shopping for",target:"shopDays",
  text:"Tick the days you'll cook from your plan. Everything those meals need is added up and sorted by store aisle. Tap Have it for anything already in your kitchen. It moves to Already have at the bottom."},
 {title:"Add your own items",target:"addExtraForm",
  text:"Need something that isn't in a recipe, like paper towels? Type it here and press Add. It goes on the same list."},
 {title:"A list that isn't for these meals",target:"newListForm",
  text:"Shopping for something else? Give it a name and press Start a new list, then add items one at a time. It saves as you go."},
 {title:"Keep it for later",target:"saveListBtn",
  text:"Press Save this list to keep a copy. Saved lists show at the bottom of this screen, so you can open them in the store."}
];
let tourSteps=TOUR_STEPS,tourStep=0,tourReturnFocus=null;
function tourSeen(){try{return localStorage.getItem(TOUR_KEY)==="1"}catch(e){return true}}
function markTourSeen(){try{localStorage.setItem(TOUR_KEY,"1")}catch(e){}}
function clearTourHighlight(){document.querySelectorAll(".tour-target").forEach(el=>el.classList.remove("tour-target"))}
function renderTour(){
  stopSpeaking();// a new card stops reading the last one
  const main=tourSteps===TOUR_STEPS,step=tourSteps[tourStep],last=tourStep===tourSteps.length-1;
  clearTourHighlight();
  const target=step.target&&document.getElementById(step.target);
  if(target){target.classList.add("tour-target");target.scrollIntoView?.({block:"nearest"})}
  // Welcome tour: the card sits at the bottom of the screen, so when the highlighted part is in the
  // lower half (the tabs on phones, or a button on the Today card) it moves to the top to stay out of
  // its way. Shorter tours keep the card at the top so it doesn't jump between cards.
  const spot=target?.getBoundingClientRect?.();
  document.getElementById("tour").classList.toggle("top",!main||!!spot&&spot.top+spot.height/2>innerHeight/2);
  const box=document.getElementById("tourBox");
  box.innerHTML=`<p class="tour-count">${tourStep+1} of ${tourSteps.length}</p>
    <h2 id="tourTitle">${step.title}</h2>
    <p>${step.text}</p>
    <div class="controls">
      ${tourStep?`<button class="btn secondary" id="tourBack">Back</button>`:""}
      <button class="btn" id="tourNext">${last?(main?"Start cooking":"Got it"):"Next"}</button>
      ${canSpeak?`<button class="btn secondary" id="tourRead">🔊 Read</button>`:""}
      ${last?"":`<button class="link" id="tourSkip">Skip ${main?"the tour":"this help"}</button>`}
    </div>`;
  document.getElementById("tourNext").onclick=()=>{if(last)endTour();else{tourStep++;renderTour()}};
  if(tourStep)document.getElementById("tourBack").onclick=()=>{tourStep--;renderTour()};
  if(!last)document.getElementById("tourSkip").onclick=endTour;
  if(canSpeak)document.getElementById("tourRead").onclick=()=>speak(`${step.title}. ${step.text}`);
  document.getElementById("tourNext").focus();
  // Scroll so the highlighted part sits in the open space beside the card (below it on phones, where
  // the card is at the top; above it on computers, where it's at the bottom), not under it.
  if(!main&&target){
    const card=box.getBoundingClientRect(),spot=target.getBoundingClientRect();
    const tabs=document.querySelector(".tabs").getBoundingClientRect();
    const tabsAtBottom=tabs.top>innerHeight/2;
    const [from,to]=card.top<innerHeight/2?[card.bottom+16,(tabsAtBottom?tabs.top:innerHeight)-16]:[16,card.top-16];
    if(spot.top<from||spot.bottom>to)window.scrollBy(0,spot.top-from);
  }
}
// Shows a set of cards (the welcome tour unless told otherwise), starting on the screen they describe.
function startTour(steps=TOUR_STEPS,startView="week"){
  tourSteps=steps;tourStep=0;tourReturnFocus=document.activeElement;
  cooking=false;setView(startView);
  document.getElementById("tour").hidden=false;
  renderTour();
}
function endTour(){
  stopSpeaking();if(tourSteps===TOUR_STEPS)markTourSeen();clearTourHighlight();
  document.getElementById("tour").hidden=true;
  tourReturnFocus?.focus?.();
}
function maybeStartTour(){
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!document.getElementById("tour").hidden)endTour()});
  if(!tourSeen())startTour();
}

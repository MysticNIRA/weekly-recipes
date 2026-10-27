/* The welcome tour: a few short cards the first time someone opens the app, each pointing at the
   part of the screen it describes. It can be replayed from Settings → Help. Loaded before the main
   script; startTour and maybeStartTour only run once the page is ready. */
const TOUR_KEY="weekly-recipes-tour-done";
const TOUR_STEPS=[
 {title:"Welcome to Weekly Recipes",target:null,
  text:"Every day of the week has a meal planned, and each recipe walks you through one step at a time with timers, so there's less to remember while you cook."},
 {title:"This week",target:"tabWeek",
  text:"Tap a day to see its meal. First you get everything out, then each step has a timer: press Start timer and it beeps when time's up. The checklist shows where you are."},
 {title:"Reminders",target:"days",
  text:"If a meal needs soaking or marinating ahead of time, a reminder shows up at the top of This week the day before."},
 {title:"All recipes",target:"tabCat",
  text:"Over 200 recipes from around the world. Search, or filter by diet, cost, calories, or time. Press Cook this on a day to put it in your week."},
 {title:"Shopping list",target:"tabShop",
  text:"A list built from your week's meals, sorted by store aisle. Tap Have it for things you already have, add your own items, and save lists for later."},
 {title:"My recipes",target:"tabMine",
  text:"Write down your own recipes, as short as an ingredient list or with steps and timers. They work everywhere other recipes do."},
 {title:"Swaps and Settings",target:"settingsBtn",
  text:"Swaps uses cheaper ingredients or what you have on hand. Settings has bigger text, dark mode, read-aloud, and more. You can replay this tour there anytime."}
];
let tourStep=0,tourReturnFocus=null;
function tourSeen(){try{return localStorage.getItem(TOUR_KEY)==="1"}catch(e){return true}}
function markTourSeen(){try{localStorage.setItem(TOUR_KEY,"1")}catch(e){}}
function clearTourHighlight(){document.querySelectorAll(".tour-target").forEach(el=>el.classList.remove("tour-target"))}
function renderTour(){
  const step=TOUR_STEPS[tourStep],last=tourStep===TOUR_STEPS.length-1;
  clearTourHighlight();
  const target=step.target&&document.getElementById(step.target);
  if(target){target.classList.add("tour-target");target.scrollIntoView?.({block:"nearest"})}
  const box=document.getElementById("tourBox");
  box.innerHTML=`<p class="tour-count">${tourStep+1} of ${TOUR_STEPS.length}</p>
    <h2 id="tourTitle">${step.title}</h2>
    <p>${step.text}</p>
    <div class="controls">
      ${tourStep?`<button class="btn secondary" id="tourBack">Back</button>`:""}
      <button class="btn" id="tourNext">${last?"Start cooking":"Next"}</button>
      ${canSpeak?`<button class="btn secondary" id="tourRead">🔊 Read</button>`:""}
      ${last?"":`<button class="link" id="tourSkip">Skip the tour</button>`}
    </div>`;
  document.getElementById("tourNext").onclick=()=>{if(last)endTour();else{tourStep++;renderTour()}};
  if(tourStep)document.getElementById("tourBack").onclick=()=>{tourStep--;renderTour()};
  if(!last)document.getElementById("tourSkip").onclick=endTour;
  if(canSpeak)document.getElementById("tourRead").onclick=()=>speak(`${step.title}. ${step.text}`);
  document.getElementById("tourNext").focus();
}
function startTour(){
  tourStep=0;tourReturnFocus=document.activeElement;
  setView("week");
  document.getElementById("tour").hidden=false;
  renderTour();
}
function endTour(){
  stopSpeaking();markTourSeen();clearTourHighlight();
  document.getElementById("tour").hidden=true;
  tourReturnFocus?.focus?.();
}
function maybeStartTour(){
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!document.getElementById("tour").hidden)endTour()});
  if(!tourSeen())startTour();
}

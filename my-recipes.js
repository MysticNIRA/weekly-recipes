/* "My recipes" tab: write, save, and edit your own recipes, as short or as detailed as you like.
   Saving, loading, and checking are in my-recipes-data.js; this file is the screens. It's loaded
   before the main script but only runs when the tab is opened, so it can use the app's helpers. */
let editingId=null,mineNotice="",triedSave=false,saveTimer=null,syncTimer=null,menuTimer=null;
const myEntry=id=>myEntries.find(e=>e.id===id);
const cleanMine=d=>cleanMyData(d,Object.keys(MEALS),Object.keys(DISH_TYPES));
const plainText=s=>s.replace(/&(amp|lt|gt|quot|#39);/g,m=>({"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"})[m]);

/* ---------- keeping the rest of the app up to date ---------- */
// Rebuild the cook's recipes inside RECIPES and every lookup made from it, then fix anything
// that pointed at a recipe that was deleted or changed.
function syncMyRecipes(){
  const shownBefore=byId[planArr()[dayIdx]];
  for(let i=RECIPES.length-1;i>=0;i--){
    const r=RECIPES[i];
    if(!r.mine)continue;
    delete byId[r.id];delete SEARCH_TEXT[r.id];delete TYPE_TEXT[r.id];
    RECIPES.splice(i,1);
  }
  for(const e of myEntries){
    const version=cookableVersion(e);
    if(!version)continue;
    const r=myRecipeFrom(e.id,version);
    RECIPES.push(r);byId[r.id]=r;SEARCH_TEXT[r.id]=searchTextFor(r);TYPE_TEXT[r.id]=recipeTypeText(r);
  }
  CUISINES.splice(0,CUISINES.length,...cuisineList());
  USED_DISH_TYPES.splice(0,USED_DISH_TYPES.length,...usedDishTypes());
  addonCache.clear();
  const cleaned=cleanOverrides(overrides);
  if(Object.keys(cleaned).length!==Object.keys(overrides).length){overrides=cleaned;saveOverrides()}
  for(const id of [...favorites])if(!byId[id]){favorites.delete(id);saveFavorites()}
  if(byId[planArr()[dayIdx]]!==shownBefore)initDay(dayIdx);else renderDays();
}
function persistMine(){saveMyEntries(myEntries)}
function forgetMyRecipe(id){
  myEntries=myEntries.filter(e=>e.id!==id);
  delete settings.addons[id];delete settings.servings[id];
  for(const key of Object.keys(settings.choices))if(key.startsWith(id+"."))delete settings.choices[key];
  saveSettings();persistMine();syncMyRecipes();
}

/* ---------- starting a recipe ---------- */
function startMyRecipe(data,notice){
  const e={id:newMyId(),finished:false,data:cleanMine(data),good:null,updated:Date.now()};
  myEntries.push(e);persistMine();
  editingId=e.id;triedSave=false;mineNotice=notice||"";
  setView("mine");window.scrollTo(0,0);
}
// A built-in recipe as editor fields. Timer choices use the cook's current pick, and the options
// keep their ingredients and notes (steps an option adds become part of its note).
function dataFromRecipe(r){
  const d=blankMyRecipe();
  d.title=`${plainText(r.title)} (my version)`;
  d.desc=plainText(r.desc);
  d.ingredients=r.ingredients.map(plainText).join("\n");
  d.steps=r.steps.map((s,i)=>({name:plainText(s.name),desc:plainText(s.desc),min:String(stepMin(r,i)),timer:s.timer!==false,prep:!!s.prep}));
  Object.assign(d,{serves:r.serves,cuisine:r.mine&&r.cuisine==="My recipe"?"":plainText(r.cuisine),
    meal:[...r.meal],tags:[...r.tags],diet:[...r.diet],cost:r.cost===null||r.costEstimated?"":String(r.cost),
    calories:r.calories&&!r.caloriesEstimated?String(r.calories):""});
  const stepNames=r.steps.map(s=>s.name);
  d.options=(r.addons||[]).map(a=>{
    const [from,to]=a.replace?.[0]||[];
    const notes=[...Object.values(a.edit||{}).map(c=>c.note).filter(Boolean),...(a.steps||[]).map(s=>`${s.name}: ${s.desc}`),a.about||""].filter(Boolean);
    const firstStep=Object.keys(a.edit||{})[0]??a.steps?.[0]?.after??a.steps?.[0]?.before;
    return {label:plainText(a.label),add:[to,...(a.add||[])].filter(Boolean).map(plainText).join("\n"),
      replace:from?plainText(r.ingredients.find(l=>l.includes(from))||""):"",
      step:stepNames.indexOf(firstStep),note:plainText(notes.join(" ")),cost:a.cost?String(a.cost):"",notDiet:[...(a.notDiet||[])]};
  });
  d.onlyOne=!!r.addons?.length&&r.addons.every(a=>a.group&&a.group===r.addons[0].group);
  d.ideas=(r.byo?.ideas||[]).map(([g,t])=>g==="Your ideas"?plainText(t.replace(/<br>/g,"\n")):`${g}: ${plainText(t)}`).join("\n");
  return d;
}
function copyRecipe(id){
  const e=myEntry(id);
  if(e){startMyRecipe({...e.data,title:e.data.title+" (copy)"},"This is a copy. Change anything you like, then press Save recipe.");return}
  const r=byId[id];
  startMyRecipe(dataFromRecipe(r),`Copied from ${r.title}. Change anything you like, then press Save recipe.${r.choose?" Step times use the cooking choice you last picked.":""}`);
}
function editRecipe(id){editingId=id;triedSave=false;mineNotice="";setView("mine");window.scrollTo(0,0)}
// "Edit" and "Copy and edit" buttons on the recipe card and in All recipes.
function bindEditButtons(root){
  root.querySelectorAll("button[data-edit]").forEach(b=>b.onclick=()=>editRecipe(b.dataset.edit));
  root.querySelectorAll("button[data-copy]").forEach(b=>b.onclick=()=>copyRecipe(b.dataset.copy));
}

/* ---------- list of the cook's recipes ---------- */
function renderMine(){
  if(editingId&&!myEntry(editingId))editingId=null;
  if(editingId)renderMyEditor();else renderMyList();
}
const isEmptyDraft=e=>!e.finished&&!e.data.title.trim()&&!e.data.ingredients.trim()&&!e.data.desc.trim()&&!e.data.steps.length;
function myItemHtml(e){
  const d=e.data,ingredientCount=myLines(d.ingredients).length,stepCount=d.steps.length;
  const when=e.updated?new Date(e.updated).toLocaleDateString([],{month:"short",day:"numeric"}):"";
  const broken=e.finished&&!isCookable(d);
  return `<article class="item">
    <div class="item-top"><h3>${escapeHtml(d.title.trim()||"Untitled recipe")}</h3>${e.finished?"":`<span class="sticker">Draft</span>`}</div>
    <p class="meta">${[`${ingredientCount} ingredient${ingredientCount===1?"":"s"}`,stepCount?`${stepCount} step${stepCount===1?"":"s"}`:"no steps",when&&`edited ${when}`].filter(Boolean).join(" · ")}</p>
    ${broken?`<p class="my-error">Missing a name or ingredients. The last complete version is still used in your plan until you fix it.</p>`:""}
    <div class="controls">
      ${e.finished?`<button class="btn" data-my-edit="${e.id}">Edit</button>${byId[e.id]?`<button class="btn secondary" data-my-plan="${e.id}">Plan it</button>`:""}`
        :`<button class="btn" data-my-edit="${e.id}">Continue</button>`}
      <button class="btn secondary" data-copy="${e.id}">Copy</button>
      ${e.finished?`<button class="btn secondary" data-my-export="${e.id}">Share as file</button>`:""}
      <button class="btn secondary" data-my-delete="${e.id}">Delete</button>
    </div>
  </article>`;
}
function renderMyList(){
  myEntries=myEntries.filter(e=>!isEmptyDraft(e));persistMine();
  const drafts=myEntries.filter(e=>!e.finished),saved=myEntries.filter(e=>e.finished);
  const byNewest=list=>list.slice().sort((a,b)=>b.updated-a.updated);
  const el=$("mineView");
  el.oninput=el.onchange=null;
  el.innerHTML=`<div class="card">
    <h2 class="recipe-title">My recipes</h2>
    <p class="recipe-sub">Write down your own recipes, as short or as detailed as you like. A name and ingredients are all you need; steps, timers, options, and everything else are optional. Recipes are saved in this browser on this device. Use <strong>Export</strong> to keep a copy or move them to another device.</p>
    ${mineNotice?`<p class="swapnote" role="status">${mineNotice}</p>`:""}
    <div class="controls" style="margin-bottom:14px">
      <button class="btn" id="newMyBtn">+ New recipe</button>
      <button class="btn secondary" id="importMyBtn">Import</button>
      ${myEntries.length?`<button class="btn secondary" id="exportMyBtn">Export all</button>`:""}
      <input type="file" id="importMyFile" accept=".json,application/json" hidden>
    </div>
    ${drafts.length?`<h3 class="my-head">Unfinished drafts</h3><p class="recipe-sub">Saved for later. Press Continue to pick up where you left off.</p>${byNewest(drafts).map(myItemHtml).join("")}`:""}
    ${saved.length?`<h3 class="my-head">Saved recipes</h3><p class="recipe-sub">These are in All recipes too, where you can put them on any day.</p>${byNewest(saved).map(myItemHtml).join("")}`:""}
    ${myEntries.length?"":`<div class="empty">No recipes of your own yet. Press <strong>New recipe</strong> to write one, or press <strong>Copy and edit</strong> on any recipe in All recipes to start from it.</div>`}
  </div>`;
  mineNotice="";
  $("newMyBtn").onclick=()=>startMyRecipe(blankMyRecipe());
  $("importMyBtn").onclick=()=>$("importMyFile").click();
  $("importMyFile").onchange=e=>importMyRecipes(e.target.files[0]);
  if(myEntries.length)$("exportMyBtn").onclick=()=>exportMyRecipes(myEntries,"my-recipes.json");
  bindEditButtons(el);
  el.querySelectorAll("button[data-my-edit]").forEach(b=>b.onclick=()=>editRecipe(b.dataset.myEdit));
  el.querySelectorAll("button[data-my-plan]").forEach(b=>b.onclick=()=>{
    Object.assign(cat,{q:"",show:"mine",diet:"",meal:"",type:"",cuisine:"",max:0,maxCost:0,prep:"",pantry:""});
    setView("cat");
  });
  el.querySelectorAll("button[data-my-export]").forEach(b=>b.onclick=()=>{
    const e=myEntry(b.dataset.myExport);
    exportMyRecipes([e],(e.data.title.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"recipe")+".json");
  });
  el.querySelectorAll("button[data-my-delete]").forEach(b=>b.onclick=()=>deleteMyRecipe(b.dataset.myDelete));
}
function deleteMyRecipe(id){
  const e=myEntry(id),name=e.data.title.trim()||"this untitled recipe";
  if(!confirm(`Delete ${name}? This can't be undone.${byId[id]&&planArr().includes(id)?" Days that use it go back to their planned recipe.":""}`))return;
  forgetMyRecipe(id);
  editingId=null;mineNotice=`Deleted ${escapeHtml(name)}.`;renderMine();
}

/* ---------- export and import ---------- */
function exportMyRecipes(entries,fileName){
  const file={app:"weekly-recipes",kind:"my-recipes",version:1,recipes:entries.map(e=>({finished:e.finished,data:e.data}))};
  const url=URL.createObjectURL(new Blob([JSON.stringify(file,null,1)],{type:"application/json"}));
  const a=document.createElement("a");a.href=url;a.download=fileName;document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}
// Imported recipes always get new ids, so importing the same file twice makes copies instead of overwriting.
function importedEntries(file){
  const list=Array.isArray(file?.recipes)?file.recipes:[];
  return list.map(x=>cleanMine(x?.data)).filter(d=>d.title.trim()||d.ingredients.trim()).map((data,i)=>({
    id:newMyId(),finished:list[i]?.finished===true&&isCookable(data),data,good:null,updated:Date.now()}))
    .map(e=>({...e,good:e.finished?e.data:null}));
}
function importMyRecipes(file){
  if(!file)return;
  const fail=msg=>{mineNotice=msg;renderMine()};
  if(file.size>2_000_000)return fail("That file is too big to be a recipe export.");
  const reader=new FileReader();
  reader.onerror=()=>fail("That file couldn't be opened.");
  reader.onload=()=>{
    const text=reader.result;
    let parsed;
    try{parsed=JSON.parse(text)}catch(e){return fail("That file couldn't be read. Pick a file made with Export or Share as file.")}
    const added=importedEntries(parsed);
    if(!added.length)return fail("No recipes found in that file. Pick a file made with Export or Share as file.");
    myEntries.push(...added);persistMine();syncMyRecipes();
    fail(`Added ${added.length} recipe${added.length===1?"":"s"}.`);
  };
  reader.readAsText(file);
}

/* ---------- the editor ---------- */
const checkRow=(name,value,label,on)=>`<label class="my-check"><input type="checkbox" data-group="${name}" value="${value}" ${on?"checked":""}> ${label}</label>`;
const fieldValue=v=>escapeHtml(String(v??""));
function stepFieldsHtml(s,i,count){
  return `<fieldset class="my-step" data-step="${i}">
    <legend>Step ${i+1}</legend>
    <label class="my-field">Step name <span class="opt">(optional)</span><input type="text" data-f="name" maxlength="${MY_LIMITS.title}" value="${fieldValue(s.name)}" placeholder="e.g. Cook the rice"></label>
    <label class="my-field">What to do <span class="opt">(optional)</span><textarea data-f="desc" rows="2" maxlength="${MY_LIMITS.text}">${fieldValue(s.desc)}</textarea></label>
    <div class="my-row">
      <label class="my-field my-small">Minutes <span class="opt">(optional)</span><input type="number" data-f="min" min="0" max="${MY_LIMITS.minutes}" inputmode="numeric" value="${fieldValue(s.min)}"></label>
      <label class="my-check"><input type="checkbox" data-f="timer" ${s.timer?"checked":""}> Countdown timer</label>
      <label class="my-check"><input type="checkbox" data-f="prep" ${s.prep?"checked":""}> Prep ahead (waiting before you cook, like marinating)</label>
    </div>
    <p class="my-hint" data-hint></p>
    <div class="controls">
      <button class="btn secondary" data-step-up="${i}" ${i===0?"disabled":""}>↑ Move up</button>
      <button class="btn secondary" data-step-down="${i}" ${i===count-1?"disabled":""}>↓ Move down</button>
      <button class="btn secondary" data-step-remove="${i}">Remove step</button>
    </div>
  </fieldset>`;
}
function optionFieldsHtml(o,i,d){
  return `<fieldset class="my-step" data-option="${i}">
    <legend>Option ${i+1}</legend>
    <label class="my-field">Option name <input type="text" data-f="label" maxlength="${MY_LIMITS.title}" value="${fieldValue(o.label)}" placeholder="e.g. Add chicken, Make it spicy"></label>
    <label class="my-field">Ingredients it adds, one per line <span class="opt">(optional)</span><textarea data-f="add" rows="2">${fieldValue(o.add)}</textarea></label>
    <label class="my-field">Use it instead of <span class="opt">(optional; the first line above replaces this ingredient)</span><select data-f="replace">${replaceOptionsHtml(d,o.replace)}</select></label>
    <label class="my-field">Note <span class="opt">(optional)</span><textarea data-f="note" rows="2" placeholder="e.g. Brown the chicken for 6 min before adding the onions.">${fieldValue(o.note)}</textarea></label>
    <label class="my-field">Show the note <select data-f="step">${stepTargetOptionsHtml(d,o.step)}</select></label>
    <div class="my-row">
      <label class="my-field my-small">Extra cost per serving ($) <span class="opt">(optional)</span><input type="number" data-f="cost" min="0" step="0.05" value="${fieldValue(o.cost)}"></label>
    </div>
    <div class="my-row"><span class="my-label">Picking this makes it not:</span>${MY_DIETS.map(diet=>`<label class="my-check"><input type="checkbox" data-f="notDiet" value="${diet}" ${o.notDiet.includes(diet)?"checked":""}> ${DIET_NAMES[diet]}</label>`).join("")}</div>
    <div class="controls"><button class="btn secondary" data-option-remove="${i}">Remove option</button></div>
  </fieldset>`;
}
const replaceOptionsHtml=(d,picked)=>`<option value="">Nothing, just add it</option>`+myLines(d.ingredients)
  .map(l=>`<option value="${fieldValue(l)}" ${l===picked?"selected":""}>${fieldValue(l)}</option>`).join("");
const stepTargetOptionsHtml=(d,picked)=>`<option value="-1">Under the option name</option>`+d.steps
  .map((s,i)=>`<option value="${i}" ${i===picked?"selected":""}>On step ${i+1}${s.name.trim()?": "+fieldValue(s.name.trim()):""}</option>`).join("");

function renderMyEditor(){
  const e=myEntry(editingId),d=e.data;
  const el=$("mineView");
  el.innerHTML=`<div class="card my-editor">
    <div class="rhead"><h2 class="recipe-title">${e.finished?"Edit recipe":"New recipe"}</h2><span class="recipe-sub" id="mySaveState" role="status">Saved</span></div>
    <p class="recipe-sub">Only the name and ingredients are needed. Fill in as much or as little else as you like. Everything saves as you type, so you can leave and finish later.</p>
    ${mineNotice?`<p class="swapnote" role="status">${mineNotice}</p>`:""}
    <label class="my-field">Recipe name<input type="text" id="myTitle" maxlength="${MY_LIMITS.title}" value="${fieldValue(d.title)}" placeholder="e.g. Grandma's rice and beans"></label>
    <p class="my-error" id="myTitleErr"></p>
    <label class="my-field">Short description <span class="opt">(optional)</span><textarea id="myDesc" rows="2" maxlength="${MY_LIMITS.text}">${fieldValue(d.desc)}</textarea></label>
    <label class="my-field">Ingredients, one per line<textarea id="myIngr" rows="6" maxlength="${MY_LIMITS.list}" placeholder="2 cups rice&#10;1 onion, chopped&#10;1 can (400 g) black beans">${fieldValue(d.ingredients)}</textarea></label>
    <p class="my-hint">Put the amount first, like "2 cups rice", for better calorie and cost estimates and a better shopping list.</p>
    <p class="my-error" id="myIngrErr"></p>
    <p class="my-hint" id="mySwapHint"></p>

    <h3 class="my-head">Steps <span class="opt">(optional)</span></h3>
    <p class="recipe-sub">No steps is fine: the recipe is then just an ingredient list. Add steps for the step-by-step guide. Give a step minutes and a countdown timer for anything you need to time.</p>
    ${d.steps.map((s,i)=>stepFieldsHtml(s,i,d.steps.length)).join("")}
    <button class="btn secondary" id="myAddStep">+ Add step</button>

    <details class="ingr my-section" ${d.cuisine||d.meal.length||d.tags.length||d.diet.length||d.serves!==4?"open":""}>
      <summary>Servings, meal, cuisine, and diet <span class="opt">(optional)</span></summary>
      <div class="my-row">
        <label class="my-field my-small">Servings<input type="number" id="myServes" min="1" max="${MY_LIMITS.serves}" value="${d.serves}"></label>
        <label class="my-field">Cuisine<input type="text" id="myCuisine" list="myCuisineList" maxlength="60" value="${fieldValue(d.cuisine)}" placeholder="e.g. Mexican, Family recipe"></label>
        <datalist id="myCuisineList">${CUISINES.filter(c=>c!=="My recipe").map(c=>`<option value="${fieldValue(c)}">`).join("")}</datalist>
      </div>
      <p class="my-label">Meal</p><div class="my-checks">${Object.entries(MEALS).map(([k,l])=>checkRow("meal",k,l,d.meal.includes(k))).join("")}</div>
      <p class="my-label">Dish type</p><div class="my-checks">${Object.entries(DISH_TYPES).map(([k,l])=>checkRow("tags",k,l,d.tags.includes(k))).join("")}</div>
      <p class="my-label">Diet</p><div class="my-checks">${checkRow("diet","vegetarian","Vegetarian",d.diet.includes("vegetarian"))}${checkRow("diet","vegan","Vegan",d.diet.includes("vegan"))}${checkRow("diet","halal","Halal-friendly (no pork or alcohol)",d.diet.includes("halal"))}${checkRow("diet","glutenfree","Gluten-free",d.diet.includes("glutenfree"))}</div>
    </details>

    <details class="ingr my-section" ${d.calories||d.cost?"open":""}>
      <summary>Calories and cost <span class="opt">(optional)</span></summary>
      <p class="my-hint" id="myEstimate"></p>
      <div class="my-row">
        <label class="my-field my-small">Calories per serving<input type="number" id="myCalories" min="0" max="${MY_LIMITS.calories}" value="${fieldValue(d.calories)}"></label>
        <label class="my-field my-small">Cost per serving ($)<input type="number" id="myCost" min="0" max="${MY_LIMITS.cost}" step="0.05" value="${fieldValue(d.cost)}"></label>
      </div>
      <p class="my-hint">Leave these blank to use the estimate, or type your own number.</p>
    </details>

    <details class="ingr my-section" ${d.options.length||d.ideas?"open":""}>
      <summary>Make it your own: options <span class="opt">(optional)</span></summary>
      <p class="recipe-sub">Options are extras or swaps someone can tick before cooking, like "Add chicken" or "Make it spicy". They add ingredients, can replace one, and can show a note on a step.</p>
      ${d.options.map((o,i)=>optionFieldsHtml(o,i,d)).join("")}
      <button class="btn secondary" id="myAddOption">+ Add option</button>
      <label class="my-check" style="margin-top:10px"><input type="checkbox" id="myOnlyOne" ${d.onlyOne?"checked":""}> Only one option can be picked at a time</label>
      <label class="my-field">More ideas <span class="opt">(optional, shown under the options)</span><textarea id="myIdeas" rows="3" maxlength="${MY_LIMITS.text}" placeholder="e.g. Leftovers make great burritos.">${fieldValue(d.ideas)}</textarea></label>
    </details>

    <p class="my-error" id="myBrokenNote"></p>
    <div class="controls my-actions">
      ${e.finished?`<button class="btn" id="myDone">Done</button>`
        :`<button class="btn" id="mySave">Save recipe</button><button class="btn secondary" id="myLater">Save for later</button>`}
      <button class="btn secondary" id="myDelete">Delete recipe</button>
    </div>
  </div>`;
  mineNotice="";
  bindMyEditor(e);
  updateEditorHints(e);
}
// Read the whole form back into editor fields.
function readEditor(){
  const el=$("mineView"),v=id=>$(id).value;
  const checked=group=>[...el.querySelectorAll(`input[data-group="${group}"]:checked`)].map(c=>c.value);
  const steps=[...el.querySelectorAll("fieldset[data-step]")].map(f=>{
    const q=n=>f.querySelector(`[data-f="${n}"]`);
    return {name:q("name").value,desc:q("desc").value,min:q("min").value,timer:q("timer").checked,prep:q("prep").checked};
  });
  const options=[...el.querySelectorAll("fieldset[data-option]")].map(f=>{
    const q=n=>f.querySelector(`[data-f="${n}"]`);
    return {label:q("label").value,add:q("add").value,replace:q("replace").value,step:+q("step").value,note:q("note").value,cost:q("cost").value,
      notDiet:[...f.querySelectorAll('[data-f="notDiet"]:checked')].map(c=>c.value)};
  });
  return cleanMine({title:v("myTitle"),desc:v("myDesc"),ingredients:v("myIngr"),steps,serves:v("myServes"),cuisine:v("myCuisine"),
    meal:checked("meal"),tags:checked("tags"),diet:checked("diet"),calories:v("myCalories"),cost:v("myCost"),
    options,onlyOne:$("myOnlyOne").checked,ideas:v("myIdeas")});
}
function storeEditor(e){
  e.data=readEditor();e.updated=Date.now();
  if(e.finished&&isCookable(e.data))e.good=e.data;
  persistMine();
}
// Typing saves after a short pause; a finished recipe also updates in All recipes and the plan.
function editorChanged(e){
  const state=$("mySaveState");if(state)state.textContent="Saving…";
  clearTimeout(saveTimer);
  saveTimer=setTimeout(()=>{
    storeEditor(e);
    const s=$("mySaveState");if(s)s.textContent="Saved";
    updateEditorHints(e);
    if(e.finished){clearTimeout(syncTimer);syncTimer=setTimeout(syncMyRecipes,600)}
  },300);
}
function flushEditor(e){clearTimeout(saveTimer);storeEditor(e)}
function updateEditorHints(e){
  const d=e.data,lines=myLines(d.ingredients);
  const problems=myRecipeProblems(d);
  $("myTitleErr").textContent=triedSave?problems.title||"":"";
  $("myIngrErr").textContent=triedSave?problems.ingredients||"":"";
  $("myBrokenNote").textContent=e.finished&&!isCookable(d)?"This recipe needs a name and at least one ingredient. Until then, the last complete version stays in your plan.":"";
  const swaps=swapsFor({id:e.id,ingredients:lines});
  $("mySwapHint").textContent=swaps.length?`${swaps.length} of your Swaps can apply to these ingredients (${swaps.slice(0,3).map(s=>s.from).join(", ")}${swaps.length>3?", …":""}). Turn them on with the Swaps button.`:"";
  const est=estimateFood(lines,d.serves);
  $("myEstimate").textContent=!lines.length?"Add ingredients to see an estimate."
    :!est.counted?`Couldn't recognize these ingredients to estimate. Put the amount first, like "2 cups rice", or type your own numbers below.`
    :`From your ingredients: about ${est.calories} calories and $${est.cost.toFixed(2)} per serving (${est.counted} of ${lines.length} ingredients counted).${est.missing.length?` Not counted: ${est.missing.join("; ")}.`:""}`;
  $("myCalories").placeholder=est.calories??"";
  $("myCost").placeholder=est.cost!==null?est.cost.toFixed(2):"";
  $("mineView").querySelectorAll("fieldset[data-step]").forEach((f,i)=>{
    const s=d.steps[i];if(!s)return;
    f.querySelector("[data-hint]").textContent=s.timer&&!(+s.min>0)?"Add minutes to get a countdown for this step.":s.prep&&!(+s.min>0)?"Add minutes so prep time shows on the recipe.":"";
  });
}
// The option menus list the current ingredients and steps, so they're refreshed as those change.
function refreshOptionMenus(e){
  $("mineView").querySelectorAll("fieldset[data-option]").forEach((f,i)=>{
    const o=e.data.options[i];if(!o)return;
    f.querySelector('[data-f="replace"]').innerHTML=replaceOptionsHtml(e.data,o.replace);
    f.querySelector('[data-f="step"]').innerHTML=stepTargetOptionsHtml(e.data,o.step);
  });
}
// Adding, moving, or removing steps and options redraws the form; option notes follow their step.
function restructure(e,change){
  flushEditor(e);
  const d=JSON.parse(JSON.stringify(e.data));
  change(d);
  e.data=cleanMine(d);persistMine();
  if(e.finished)syncMyRecipes();
  renderMyEditor();
}
function moveStep(d,from,to){
  [d.steps[from],d.steps[to]]=[d.steps[to],d.steps[from]];
  for(const o of d.options)o.step=o.step===from?to:o.step===to?from:o.step;
}
function bindMyEditor(e){
  const el=$("mineView");
  el.oninput=ev=>{
    editorChanged(e);
    if(ev.target.id==="myIngr"||ev.target.dataset.f==="name"){clearTimeout(menuTimer);menuTimer=setTimeout(()=>{storeEditor(e);refreshOptionMenus(e)},400)}
  };
  el.onchange=()=>editorChanged(e);
  $("myAddStep").onclick=()=>{
    restructure(e,d=>d.steps.push(blankMyStep()));
    const fields=el.querySelectorAll("fieldset[data-step]");fields[fields.length-1].querySelector("input").focus();
  };
  $("myAddOption").onclick=()=>{
    restructure(e,d=>d.options.push(blankMyOption()));
    const fields=el.querySelectorAll("fieldset[data-option]");fields[fields.length-1].querySelector("input").focus();
  };
  el.querySelectorAll("button[data-step-up]").forEach(b=>b.onclick=()=>{const i=+b.dataset.stepUp;restructure(e,d=>moveStep(d,i,i-1))});
  el.querySelectorAll("button[data-step-down]").forEach(b=>b.onclick=()=>{const i=+b.dataset.stepDown;restructure(e,d=>moveStep(d,i,i+1))});
  el.querySelectorAll("button[data-step-remove]").forEach(b=>b.onclick=()=>{
    const i=+b.dataset.stepRemove;
    restructure(e,d=>{d.steps.splice(i,1);for(const o of d.options)o.step=o.step===i?-1:o.step>i?o.step-1:o.step});
  });
  el.querySelectorAll("button[data-option-remove]").forEach(b=>b.onclick=()=>{const i=+b.dataset.optionRemove;restructure(e,d=>d.options.splice(i,1))});
  const finish=()=>{
    flushEditor(e);triedSave=true;
    const problems=myRecipeProblems(e.data);
    if(Object.keys(problems).length){updateEditorHints(e);$(problems.title?"myTitle":"myIngr").focus();return}
    const wasFinished=e.finished;
    e.finished=true;e.good=e.data;persistMine();syncMyRecipes();
    editingId=null;
    mineNotice=`${wasFinished?"Saved your changes to":"Saved!"} <strong>${escapeHtml(e.data.title.trim())}</strong>${wasFinished?".":" is now in All recipes."} Press <strong>Plan it</strong> to put it on a day.`;
    renderMine();window.scrollTo(0,0);
  };
  if(e.finished)$("myDone").onclick=finish;
  else{
    $("mySave").onclick=finish;
    $("myLater").onclick=()=>{
      flushEditor(e);editingId=null;
      mineNotice=isEmptyDraft(e)?"":`Saved <strong>${escapeHtml(e.data.title.trim()||"your recipe")}</strong> as a draft. Press <strong>Continue</strong> to finish it later.`;
      renderMine();window.scrollTo(0,0);
    };
  }
  $("myDelete").onclick=()=>{flushEditor(e);deleteMyRecipe(e.id)};
}

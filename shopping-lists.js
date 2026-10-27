/* Saved shopping lists, and the cook's own items ("paper towels") on any list.
   A saved list is a frozen copy: its items, amounts, and check marks as they were, plus which recipes
   it was for, so the week can be planned again. Changing the plan later doesn't change it.
   Text is stored plain and escaped when shown. The screens use the shopping helpers in index.html. */
const SAVED_LISTS_KEY="weekly-recipes-saved-lists";
const LIST_LIMITS={name:80,item:120,items:400,lists:100};
const newListKey=prefix=>prefix+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const listText=(v,max)=>typeof v==="string"?v.trim().slice(0,max):"";

// The cook's own items on this week's list: [{key: "x:…", name}].
function cleanExtras(raw){
  if(!Array.isArray(raw))return [];
  return raw.filter(x=>typeof x?.key==="string"&&/^x:[a-z0-9]+$/.test(x.key)&&listText(x.name,LIST_LIMITS.item))
    .slice(0,LIST_LIMITS.items).map(x=>({key:x.key,name:listText(x.name,LIST_LIMITS.item)}));
}
function cleanSavedLists(raw){
  if(!Array.isArray(raw))return [];
  return raw.filter(l=>typeof l?.id==="string"&&/^list-[a-z0-9]+$/.test(l.id)).slice(0,LIST_LIMITS.lists).map(l=>({
    id:l.id,
    name:listText(l.name,LIST_LIMITS.name)||"Shopping list",
    created:+l.created||0,
    items:(Array.isArray(l.items)?l.items:[]).filter(i=>typeof i?.key==="string"&&listText(i.name,LIST_LIMITS.item)).slice(0,LIST_LIMITS.items)
      .map(i=>({key:i.key.slice(0,200),name:listText(i.name,LIST_LIMITS.item),amount:listText(i.amount,LIST_LIMITS.item),
        note:listText(i.note,LIST_LIMITS.item*2),section:listText(i.section,40),mine:i.mine===true,checked:i.checked===true})),
    recipes:(Array.isArray(l.recipes)?l.recipes:[]).filter(r=>Number.isInteger(r?.day)&&r.day>=0&&r.day<7&&typeof r.id==="string")
      .map(r=>({day:r.day,id:r.id,title:listText(r.title,LIST_LIMITS.item)})),
    cost:Number.isFinite(l.cost)&&l.cost>0?l.cost:null
  }));
}
// Rows grouped into store sections, in store order; sections a list doesn't know go last.
function groupRows(rows,order){
  const titles=[...order,...new Set(rows.map(r=>r.section).filter(s=>!order.includes(s)))];
  return titles.map(t=>[t||"Other",rows.filter(r=>r.section===t)]).filter(([,list])=>list.length);
}
// Plain text for pasting into a message or notes app.
function listAsText(name,rows,order){
  const lines=[name];
  for(const [title,list] of groupRows(rows,order)){
    lines.push("",title.toUpperCase());
    for(const r of list)lines.push(`${r.checked?"☑":"☐"} ${r.name}${r.amount?` — ${r.amount}`:""}`);
  }
  return lines.join("\n");
}

let savedLists=[],openListId=null,shopNotice="";
try{savedLists=cleanSavedLists(JSON.parse(localStorage.getItem(SAVED_LISTS_KEY)||"[]"))}catch(e){}
function saveSavedLists(){try{localStorage.setItem(SAVED_LISTS_KEY,JSON.stringify(savedLists))}catch(e){}}
const savedList=id=>savedLists.find(l=>l.id===id);

/* ---------- this week's list ---------- */
const extraRow=x=>({key:x.key,name:x.name,amount:"",note:"",section:shopSection(x.name),mine:true});
// This week's list as plain rows, for saving or copying.
function currentRows(){
  const need=shoppingItems().filter(i=>!shop.have.includes(i.key)).map(i=>({key:i.key,name:plainText(i.name),
    amount:plainText(amountText(i.uses)),note:plainText(shopForText(i)),section:shopSection(i.name),mine:false}));
  return [...need,...shop.extras.map(extraRow)].map(r=>({...r,checked:shop.checked.includes(r.key)}));
}
function weekLabel(){
  const monday=new Date();monday.setDate(monday.getDate()-TODAY);
  return "Week of "+monday.toLocaleDateString([],{month:"short",day:"numeric"});
}
function saveCurrentList(name){
  if(savedLists.length>=LIST_LIMITS.lists){shopNotice=`You have ${LIST_LIMITS.lists} saved lists. Delete an old one to save another.`;return}
  const plan=planArr();
  const cost=shop.days.reduce((a,d)=>{const r=withAddons(byId[plan[d]]);return a+(effectiveCost(r)??0)*r.serves},0);
  const list={id:newListKey("list-"),name:listText(name,LIST_LIMITS.name)||weekLabel(),created:Date.now(),items:currentRows(),
    recipes:[...shop.days].sort().map(d=>({day:d,id:plan[d],title:plainText(byId[plan[d]].title)})),cost:cost>0?Math.round(cost*100)/100:null};
  savedLists.unshift(list);saveSavedLists();
  shopNotice=`Saved <strong>${escapeHtml(list.name)}</strong>. It's under Saved lists below.`;
}
// One row on a list; the cook's own items can be removed.
function listRowHtml(row,checked,checkAttr,removeAttr){
  return `<div class="shop-item ${checked?"got":""}">
    <label><input type="checkbox" ${checkAttr}="${escapeHtml(row.key)}" ${checked?"checked":""}>
      <span><span class="shop-name">${escapeHtml(row.name)}</span>${row.amount?` <span class="shop-amt">— ${escapeHtml(row.amount)}</span>`:""}<span class="shop-for">${row.mine?"your item":escapeHtml(row.note)}</span></span></label>
    ${row.mine?`<button class="btn secondary" ${removeAttr}="${escapeHtml(row.key)}" aria-label="Remove ${escapeHtml(row.name)}">Remove</button>`:""}
  </div>`;
}
const addItemFormHtml=id=>`<form class="shop-add" id="${id}">
    <input type="text" maxlength="${LIST_LIMITS.item}" placeholder="Add your own item, e.g. paper towels" aria-label="Add your own item">
    <button class="btn secondary" type="submit">Add</button>
  </form>`;
// Calls add(name) with a trimmed, non-empty name, then puts the cursor back for the next item.
function bindAddItemForm(id,add){
  $(id).onsubmit=e=>{
    e.preventDefault();
    const name=listText($(id).querySelector("input").value,LIST_LIMITS.item);
    if(!name){$(id).querySelector("input").focus();return}
    add(name);renderShop();
    $(id).querySelector("input").focus();
  };
}
function savedListsHtml(){
  return `<section class="saved-lists">
    <h3 class="my-head">Saved lists</h3>
    ${savedLists.length?savedLists.map(l=>{
      const got=l.items.filter(i=>i.checked).length;
      return `<div class="shop-item"><span style="flex:1"><span class="shop-name">${escapeHtml(l.name)}</span>
        <span class="shop-for">saved ${new Date(l.created).toLocaleDateString([],{month:"short",day:"numeric"})} · ${l.items.length} items${got?` · ${got} checked`:""}</span></span>
        <button class="btn secondary" data-open-list="${l.id}">Open</button></div>`;
    }).join(""):`<p class="recipe-sub">No saved lists yet. Save this week's list to keep a copy, for a week you'd like to repeat or a second store.</p>`}
  </section>`;
}
// Copies to the clipboard, or shows the text to copy by hand where the browser won't allow it.
function copyListText(text){
  const shown=()=>{shopNotice=`Copy this text:<textarea class="copy-box" readonly rows="8">${escapeHtml(text)}</textarea>`;renderShop()};
  if(!navigator.clipboard)return shown();
  navigator.clipboard.writeText(text).then(()=>{shopNotice="Copied! Paste it into a message or notes app.";renderShop()},shown);
}
function bindSavedListsSection(el){
  el.querySelectorAll("button[data-open-list]").forEach(b=>b.onclick=()=>{openListId=b.dataset.openList;shopNotice="";renderShop();window.scrollTo(0,0)});
}
// Extra pieces of this week's list: own items, saving, copying, and the saved lists.
function bindCurrentListExtras(el){
  bindAddItemForm("addExtraForm",name=>{shop.extras.push({key:newListKey("x:"),name});saveShop()});
  el.querySelectorAll("button[data-extra-remove]").forEach(b=>b.onclick=()=>{
    const key=b.dataset.extraRemove;
    shop.extras=shop.extras.filter(x=>x.key!==key);shop.checked=shop.checked.filter(k=>k!==key);
    saveShop();renderShop();
  });
  const save=$("saveListBtn");
  if(save){
    save.onclick=()=>{saveCurrentList($("saveListName").value);renderShop()};
    $("copyListBtn").onclick=()=>copyListText(listAsText("Shopping list",currentRows(),SHOP_ORDER));
  }
  bindSavedListsSection(el);
  shopNotice="";
}

/* ---------- a saved list ---------- */
function renderSavedList(){
  const list=savedList(openListId),el=$("shopView");
  const got=list.items.filter(i=>i.checked).length;
  el.innerHTML=`<div class="card my-editor">
    <button class="link" id="backToShopBtn">← Back to this week's list</button>
    <label class="my-field">List name<input type="text" id="listNameInput" maxlength="${LIST_LIMITS.name}" value="${escapeHtml(list.name)}"></label>
    <p class="recipe-sub" style="margin-top:8px">Saved ${new Date(list.created).toLocaleDateString([],{month:"short",day:"numeric",year:"numeric"})} · ${got} of ${list.items.length} checked${list.cost?` · about $${list.cost.toFixed(2)} when saved`:""}</p>
    ${shopNotice?`<p class="swapnote" role="status">${shopNotice}</p>`:""}
    ${list.recipes.length?`<p class="recipe-sub">For: ${list.recipes.map(r=>`${DAYS[r.day]} ${escapeHtml(r.title)}`).join(" · ")}</p>
      <button class="btn secondary" id="planAgainBtn">Plan these recipes again</button>`:""}
    ${list.items.length?groupRows(list.items,SHOP_ORDER).map(([title,rows])=>`<section class="shop-section"><h3>${title}</h3>${rows.map(r=>listRowHtml(r,r.checked,"data-list-check","data-list-remove")).join("")}</section>`).join("")
      :`<div class="empty">This list is empty. Add items below.</div>`}
    ${addItemFormHtml("addListItemForm")}
    <div class="controls my-actions">
      <button class="btn secondary" id="copySavedBtn">Copy as text</button>
      ${got?`<button class="btn secondary" id="clearSavedChecksBtn">Clear checks</button>`:""}
      <button class="btn secondary" id="deleteListBtn">Delete list</button>
    </div>
  </div>`;
  shopNotice="";
  const changed=()=>{saveSavedLists();renderShop()};
  $("backToShopBtn").onclick=()=>{openListId=null;renderShop()};
  $("listNameInput").onchange=e=>{list.name=listText(e.target.value,LIST_LIMITS.name)||list.name;saveSavedLists();shopNotice="Name saved.";renderShop()};
  el.querySelectorAll("input[data-list-check]").forEach(c=>c.onchange=()=>{
    const item=list.items.find(i=>i.key===c.dataset.listCheck);if(item)item.checked=c.checked;changed();
  });
  el.querySelectorAll("button[data-list-remove]").forEach(b=>b.onclick=()=>{list.items=list.items.filter(i=>i.key!==b.dataset.listRemove);changed()});
  bindAddItemForm("addListItemForm",name=>{
    if(list.items.length<LIST_LIMITS.items)list.items.push({key:newListKey("x:"),name,amount:"",note:"",section:shopSection(name),mine:true,checked:false});
    saveSavedLists();
  });
  $("copySavedBtn").onclick=()=>copyListText(listAsText(list.name,list.items,SHOP_ORDER));
  if(got)$("clearSavedChecksBtn").onclick=()=>{list.items.forEach(i=>i.checked=false);changed()};
  $("deleteListBtn").onclick=()=>{
    if(!confirm(`Delete ${list.name}? This can't be undone.`))return;
    savedLists=savedLists.filter(l=>l.id!==list.id);saveSavedLists();
    openListId=null;shopNotice=`Deleted ${escapeHtml(list.name)}.`;renderShop();
  };
  if(list.recipes.length)$("planAgainBtn").onclick=()=>planListAgain(list);
}
// Puts a saved list's recipes back on their days. Recipes since deleted are skipped and named.
function planListAgain(list){
  const days=list.recipes.map(r=>DAYS[r.day]).join(", ");
  if(!confirm(`Put these recipes back on ${days}? This replaces what's planned on those days.`))return;
  const shownBefore=planArr()[dayIdx],missing=[];
  for(const r of list.recipes){
    if(!byId[r.id])missing.push(r.title);
    else if(basePlan()[r.day]===r.id)delete overrides[r.day];
    else overrides[r.day]=r.id;
  }
  saveOverrides();
  if(planArr()[dayIdx]!==shownBefore)initDay(dayIdx);else renderDays();
  shopNotice=`Planned! These recipes are back on ${days}.${missing.length?` Not found anymore, so skipped: ${missing.map(escapeHtml).join(", ")}.`:""}`;
  renderShop();
}

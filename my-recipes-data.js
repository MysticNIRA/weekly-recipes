/* The cook's own recipes ("My recipes"), saved in this browser.
   Each saved entry keeps the editor's fields as typed (`data`), whether the cook pressed Save recipe
   (`finished`), and the last finished version that had a name and ingredients (`good`), so editing a
   recipe that's on the plan never leaves the plan pointing at a half-written one.
   Finished recipes are turned into the same shape as the built-in ones and added to RECIPES, so search,
   the week plan, timers, swaps, and the shopping list all work with them. */
const MY_RECIPES_KEY="weekly-recipes-mine";
const MY_DIETS=["vegetarian","vegan","halal","glutenfree"];
const MY_LIMITS={title:120,text:2000,list:6000,steps:60,options:12,serves:50,minutes:2880,calories:10000,cost:100};

function blankMyRecipe(){
  return {title:"",desc:"",ingredients:"",steps:[],serves:4,cuisine:"",meal:[],tags:[],diet:[],
    calories:"",cost:"",options:[],onlyOne:false,ideas:""};
}
const blankMyStep=()=>({name:"",desc:"",min:"",timer:true,prep:false});
const blankMyOption=()=>({label:"",add:"",replace:"",step:-1,note:"",cost:"",notDiet:[]});

// Saved or imported data can be anything, so every field is checked and trimmed to a sane size.
const asText=(v,max)=>typeof v==="string"?v.slice(0,max):"";
const asList=(v,allowed)=>Array.isArray(v)?[...new Set(v.filter(x=>allowed.includes(x)))]:[];
function asNumberText(v,max){
  if(v===""||v===null||v===undefined)return "";
  const n=+v;
  return Number.isFinite(n)&&n>=0?String(Math.min(n,max)):"";
}
function cleanMyData(d,mealKeys,typeKeys){
  const x=d&&typeof d==="object"?d:{};
  const steps=Array.isArray(x.steps)?x.steps.slice(0,MY_LIMITS.steps):[];
  const options=Array.isArray(x.options)?x.options.slice(0,MY_LIMITS.options):[];
  return {
    title:asText(x.title,MY_LIMITS.title),
    desc:asText(x.desc,MY_LIMITS.text),
    ingredients:asText(x.ingredients,MY_LIMITS.list),
    steps:steps.map(s=>({name:asText(s?.name,MY_LIMITS.title),desc:asText(s?.desc,MY_LIMITS.text),
      min:asNumberText(s?.min,MY_LIMITS.minutes),timer:s?.timer!==false,prep:s?.prep===true})),
    serves:Math.min(MY_LIMITS.serves,Math.max(1,Math.round(+x.serves)||4)),
    cuisine:asText(x.cuisine,60),
    meal:asList(x.meal,mealKeys),
    tags:asList(x.tags,typeKeys),
    diet:asList(x.diet,MY_DIETS),
    calories:asNumberText(x.calories,MY_LIMITS.calories),
    cost:asNumberText(x.cost,MY_LIMITS.cost),
    options:options.map(o=>({label:asText(o?.label,MY_LIMITS.title),add:asText(o?.add,MY_LIMITS.text),
      replace:asText(o?.replace,MY_LIMITS.text),step:Number.isInteger(o?.step)&&o.step>=-1&&o.step<steps.length?o.step:-1,
      note:asText(o?.note,MY_LIMITS.text),cost:asNumberText(o?.cost,MY_LIMITS.cost),notDiet:asList(o?.notDiet,MY_DIETS)})),
    onlyOne:x.onlyOne===true,
    ideas:asText(x.ideas,MY_LIMITS.text)
  };
}
const myLines=text=>text.split("\n").map(l=>l.trim()).filter(Boolean);
// A recipe can be cooked once it has a name and at least one ingredient; everything else is optional.
function myRecipeProblems(d){
  const problems={};
  if(!d.title.trim())problems.title="Give your recipe a name.";
  if(!myLines(d.ingredients).length)problems.ingredients="Add at least one ingredient.";
  return problems;
}
const isCookable=d=>!Object.keys(myRecipeProblems(d)).length;

// Everything the cook typed is shown as text, never as HTML.
const escapeHtml=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");

function myRecipeFrom(id,d){
  const ingredientLines=myLines(d.ingredients);
  const est=estimateFood(ingredientLines,d.serves);
  const steps=d.steps.map((s,i)=>{
    const min=Math.round(+s.min)||0,st={name:escapeHtml(s.name.trim()||`Step ${i+1}`),desc:escapeHtml(s.desc.trim()),min};
    if(!(s.timer&&min>0))st.timer=false;
    if(s.prep&&min>0)st.prep=true;
    return st;
  });
  const diet=d.diet.includes("vegan")?[...new Set([...d.diet,"vegetarian"])]:[...d.diet];
  const r={id,mine:true,title:escapeHtml(d.title.trim()),cuisine:escapeHtml(d.cuisine.trim())||"My recipe",
    diet,serves:d.serves,meal:[...d.meal],tags:[...d.tags],desc:escapeHtml(d.desc.trim()),
    ingredients:ingredientLines.map(escapeHtml),pantry:ingredientLines.map(l=>escapeHtml(l.toLowerCase())),steps,
    cost:d.cost!==""?+d.cost:est.cost,costEstimated:d.cost===""&&est.cost!==null,
    calories:d.calories!==""?+d.calories:est.calories,caloriesEstimated:d.calories===""&&est.calories!==null};
  const addons=d.options.filter(o=>o.label.trim()||o.add.trim()||o.note.trim()).map((o,i)=>{
    const added=myLines(o.add).map(escapeHtml),a={id:"o"+i,label:escapeHtml(o.label.trim()||`Option ${i+1}`)};
    if(o.replace&&ingredientLines.includes(o.replace)){
      a.replace=[[escapeHtml(o.replace),added.shift()||""]];
    }
    if(added.length)a.add=added;
    const note=escapeHtml(o.note.trim());
    if(note&&o.step>=0&&steps[o.step])a.edit={[steps[o.step].name]:{note}};
    else if(note)a.about=note;
    if(o.cost!=="")a.cost=+o.cost;
    if(o.notDiet.length)a.notDiet=o.notDiet.includes("vegetarian")?[...new Set([...o.notDiet,"vegan"])]:[...o.notDiet];
    if(d.onlyOne)a.group="mine";
    return a;
  });
  const ideas=d.ideas.trim();
  if(addons.length||ideas){
    r.byo={intro:"",ideas:ideas?[["Your ideas",escapeHtml(ideas).replace(/\n/g,"<br>")]]:[]};
    if(addons.length)r.addons=addons;
  }
  return r;
}

// Saved entries: [{id, finished, data, good, updated}].
function cleanMyEntries(saved,mealKeys,typeKeys){
  if(!Array.isArray(saved))return [];
  return saved.filter(e=>e&&typeof e.id==="string"&&/^my-[a-z0-9-]{1,40}$/.test(e.id)).map(e=>{
    const data=cleanMyData(e.data,mealKeys,typeKeys);
    const good=e.good?cleanMyData(e.good,mealKeys,typeKeys):null;
    return {id:e.id,finished:e.finished===true,data,good:good&&isCookable(good)?good:null,updated:+e.updated||0};
  });
}
// The version of an entry that's cooked from: the current edits when they're complete, else the last good one.
function cookableVersion(e){
  if(!e.finished)return null;
  return isCookable(e.data)?e.data:e.good;
}
function loadMyEntries(mealKeys,typeKeys){
  try{return cleanMyEntries(JSON.parse(localStorage.getItem(MY_RECIPES_KEY))||[],mealKeys,typeKeys)}
  catch(e){return []}
}
function saveMyEntries(entries){try{localStorage.setItem(MY_RECIPES_KEY,JSON.stringify(entries))}catch(e){}}
const newMyId=()=>"my-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,7);

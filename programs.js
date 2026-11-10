/* Programs: saved weeks (a recipe for each weekday, Monday first) that repeat every week.
   One program can be in use at a time; it takes the place of the starter week, and a change for
   a single date (like a cheat meal) sits on top of it without changing it. Loaded before the
   main script; these functions only work on the objects they're given. */
const PROGRAMS_KEY="weekly-recipes-programs";
const PROGRAM_NAME_MAX=40;

// Keeps well-formed programs. A day whose recipe no longer exists falls back to the starter
// week's recipe for that day, so a program never has an empty day.
function cleanPrograms(saved,isRecipe,fallbackDays){
  const clean=[],ids=new Set();
  for(const p of Array.isArray(saved)?saved:[]){
    if(!p||typeof p!=="object"||typeof p.id!=="string"||typeof p.name!=="string"||!Array.isArray(p.days)||p.days.length!==7)continue;
    const name=p.name.trim().slice(0,PROGRAM_NAME_MAX);
    if(!name||ids.has(p.id))continue;
    ids.add(p.id);
    clean.push({id:p.id,name,days:p.days.map((id,w)=>isRecipe(id)?id:fallbackDays[w])});
  }
  return clean;
}

// An error message for a program name, or "" when it can be used.
function programNameError(name){
  const trimmed=name.trim();
  if(!trimmed)return "Give the program a name, like “Strict week”.";
  if(trimmed.length>PROGRAM_NAME_MAX)return `Keep the name to ${PROGRAM_NAME_MAX} characters or fewer.`;
  return "";
}

// Saves a week under a name. Saving again under the same name (any capitals) updates that
// program instead of making a second one with the same name.
function saveProgram(programs,name,days,newId){
  const trimmed=name.trim();
  const existing=programs.find(p=>p.name.toLowerCase()===trimmed.toLowerCase());
  if(existing){existing.days=[...days];existing.name=trimmed;return {program:existing,replaced:true}}
  const program={id:newId,name:trimmed,days:[...days]};
  programs.push(program);
  return {program,replaced:false};
}

// Starting a program: every-week changes belonged to the old week, so they go. Single-date
// changes stay (a cheat meal already planned is kept) unless they now match the program.
function startProgram(days,everyWeek,dateChanges){
  for(const w of Object.keys(everyWeek))delete everyWeek[w];
  for(const [key,id] of Object.entries(dateChanges)){
    const [y,m,d]=key.split("-").map(Number);
    if(days[(new Date(y,m-1,d).getDay()+6)%7]===id)delete dateChanges[key];
  }
}

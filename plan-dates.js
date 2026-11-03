/* Planning by date. The usual week (a recipe for each weekday) repeats forever; on top of it
   sit every-week changes (one weekday, e.g. every Tuesday) and changes for a single date.
   Loaded before the main script; these functions only work on the objects they're given. */
const DATE_CHANGES_KEY="weekly-recipes-date-changes";
const MONTHS=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
// Local calendar dates, not UTC, so a date never shifts in the evening.
const dateKey=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const addDays=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
const weekdayOf=d=>(d.getDay()+6)%7;
const monthDayText=d=>`${MONTHS[d.getMonth()]} ${d.getDate()}`;
// The Monday of the week holding a day, both counted in days from today.
const mondayOffset=(offset,todayWeekday)=>offset-((offset+todayWeekday)%7+7)%7;

// Keeps only changes for today or later whose recipe still exists.
function cleanDateChanges(saved,isRecipe,todayKey){
  const clean={};
  for(const [key,id] of Object.entries(saved&&typeof saved==="object"?saved:{}))
    if(/^\d{4}-\d{2}-\d{2}$/.test(key)&&key>=todayKey&&isRecipe(id))clean[key]=id;
  return clean;
}
// What's planned on a date: its own change first, then the every-week change, then the usual week.
function recipeOn(date,usual,everyWeek,dateChanges){
  const w=weekdayOf(date);
  return dateChanges[dateKey(date)]??everyWeek[w]??usual[w];
}
// Puts a recipe on a date, just that date or that weekday every week. A change back to what
// would be there anyway is removed instead of stored.
function planOn(date,id,forEveryWeek,usual,everyWeek,dateChanges){
  const key=dateKey(date),w=weekdayOf(date);
  if(forEveryWeek){
    delete dateChanges[key];
    if(usual[w]===id)delete everyWeek[w];else everyWeek[w]=id;
  }else if((everyWeek[w]??usual[w])===id)delete dateChanges[key];
  else dateChanges[key]=id;
}
// Turns an every-week change into a change for just this date; other weeks go back to usual.
function keepJustThisDate(date,usual,everyWeek,dateChanges){
  const w=weekdayOf(date),id=everyWeek[w];
  delete everyWeek[w];
  planOn(date,id,false,usual,everyWeek,dateChanges);
}

/* Recipe notes. One plain-text note per recipe ("less salt next time", "kids loved it"), written
   from the recipe card or from All recipes and saved in this browser as you type. The fold stays
   closed until tapped; its title reads "My note" instead of "Add a note", so a recipe with a note
   stands out without showing the note itself. */
const NOTES_KEY="weekly-recipes-notes",NOTE_LIMIT=2000;
function cleanNotes(raw){
  if(!raw||typeof raw!=="object"||Array.isArray(raw))return {};
  const notes={};
  for(const [id,text] of Object.entries(raw))
    if(/^[a-z0-9-]{1,60}$/.test(id)&&typeof text==="string"&&text.trim())notes[id]=text.slice(0,NOTE_LIMIT);
  return notes;
}
// An empty or all-spaces note removes the recipe's entry, so it goes back to "Add a note".
function setNote(notes,id,text){
  const next={...notes};
  if(text.trim())next[id]=text.slice(0,NOTE_LIMIT);else delete next[id];
  return next;
}
let recipeNotes={};
try{recipeNotes=cleanNotes(JSON.parse(localStorage.getItem(NOTES_KEY)||"null"))}catch(e){}
function saveNotes(){try{localStorage.setItem(NOTES_KEY,JSON.stringify(recipeNotes))}catch(e){}}
// Which recipes' note folds are open, so they stay open when the screen redraws.
const openNotes=new Set();

const escapeNote=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const noteSummaryText=id=>recipeNotes[id]?"📝 My note":"📝 Add a note";
// cls is the fold's look: "ingr" on the recipe card, "" in All recipes (like Ingredients and steps).
function noteBoxHtml(id,cls){
  return `<details class="note-box ${cls}" data-note-box="${id}" ${openNotes.has(id)?"open":""}>
    <summary>${noteSummaryText(id)}</summary>
    <label class="note-label" for="note-${cls||"list"}-${id}">Your thoughts for next time: what to change, what to add, how it went.</label>
    <textarea id="note-${cls||"list"}-${id}" class="note-text" data-note="${id}" rows="3" maxlength="${NOTE_LIMIT}">${escapeNote(recipeNotes[id]||"")}</textarea>
    <p class="note-status" role="status" aria-live="polite">Saved on this device as you type.</p>
  </details>`;
}
function bindNoteBoxes(root){
  root.querySelectorAll("details[data-note-box]").forEach(box=>{
    const id=box.dataset.noteBox,summary=box.querySelector("summary"),status=box.querySelector(".note-status");
    summary.onclick=()=>{if(box.open)openNotes.delete(id);else openNotes.add(id)};
    box.querySelector("textarea").oninput=e=>{
      recipeNotes=setNote(recipeNotes,id,e.target.value);saveNotes();
      summary.textContent=noteSummaryText(id);
      status.textContent=e.target.value.trim()?"Saved ✓":"Note cleared.";
    };
  });
}
// The recipe card redraws during cooking (a timer ends, a check-in), so put the cursor back.
function noteFocus(){
  const el=document.activeElement;
  return el?.dataset?.note?{id:el.id,start:el.selectionStart,end:el.selectionEnd}:null;
}
function restoreNoteFocus(saved){
  const el=saved&&document.getElementById(saved.id);
  if(el){el.focus();el.setSelectionRange(saved.start,saved.end)}
}

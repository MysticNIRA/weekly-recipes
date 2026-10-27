/* Cooking a recipe for more or fewer people. Amounts in the ingredient list are scaled, along with
   amounts written in the steps ("2½ cups of the broth"). Cooking times, temperatures, and sizes
   ("1 cm pieces", "a 23 × 33 cm dish") stay the same. */
const singular=w=>/[^aeiou]ves$/.test(w)?w.replace(/ves$/,"f"):w.length>3&&/[^s']s$/.test(w)?w.replace(/(oe|ie)?s$/,(m,v)=>v==="ie"?"y":v==="oe"?"o":""):w;
const plural=w=>/(s|sh|ch|x)$/.test(w)?w+"es":/[^aeiou]y$/.test(w)?w.slice(0,-1)+"ies":/(potato|tomato)$/.test(w)?w+"es":w+"s";

const MAX_SERVINGS=50;
const SERVE_FRACTIONS={"½":1/2,"¼":1/4,"¾":3/4,"⅓":1/3,"⅔":2/3,"⅛":1/8};
const SERVE_QTY="(?:\\d\\/\\d{1,2}|\\d+(?:\\.\\d+)?(?:\\s*[½¼¾⅓⅔⅛])?|[½¼¾⅓⅔⅛])(?![\\d/])";
// Units whose amount is measured, so it can be any fraction. Anything else is a count ("2 onions").
const SERVE_MEASURES="cups?|tbsp|tsp|tablespoons?|teaspoons?|g|kg|ml|l|L|oz|lbs?|pounds?|ounces?|quarts?|qt|pints?";
const SERVE_PIECES="cans?|tins?|jars?|packages?|packets?|packs?|blocks?|bags?|boxes|box|bottles?|sticks?|cloves?|slices?|stalks?|heads?|bunch(?:es)?|sprigs?|sheets?|ears?|fillets?|pieces?|handfuls?|pinch(?:es)?|thumbs?|links?";
// Containers keep their size in brackets: "2 cans (400 g each)" is still 400 g a can.
const SERVE_CONTAINERS=/^(cans?|tins?|jars?|packages?|packets?|packs?|blocks?|bags?|boxes|box|bottles?)$/i;

function parseServeQty(t){
  t=t.replace(/\s+/g,"");
  if(t.includes("/")){const [a,b]=t.split("/");return a/b}
  const frac=SERVE_FRACTIONS[t.slice(-1)];
  return frac?(+t.slice(0,-1)||0)+frac:+t;
}
// Rounds to amounts people can measure: grams and milliliters to 5 or 10, kilograms and liters to
// one decimal, spoons and cups to the nearest ¼ or ⅓, and counts to halves (eggs to whole ones).
function formatServeQty(q,unit,wasFraction,wholeOnly){
  const u=(unit||"").toLowerCase();
  if(u==="g"||u==="ml")return String(Math.max(5,Math.round(q/(q>=100?10:5))*(q>=100?10:5)));
  if(u==="kg"||u==="l")return String(Math.round(q*10)/10);
  const counted=!unit||new RegExp(`^(${SERVE_PIECES})$`,"i").test(unit);
  if(counted&&!wasFraction&&!/^(pinch|handful|thumb|sprig)/.test(u))
    return wholeOnly?String(Math.max(1,Math.round(q))):q<0.375?"¼":q<0.75?"½":q<1.25?"1":q<1.75?"1½":String(Math.round(q));
  if(q>=10)return String(Math.round(q));
  const whole=Math.floor(q),rest=q-whole;
  const [[frac]]=Object.entries({"":0,"¼":1/4,"⅓":1/3,"½":1/2,"⅔":2/3,"¾":3/4,"1":1})
    .sort(([,a],[,b])=>Math.abs(rest-a)-Math.abs(rest-b));
  if(frac==="1")return String(whole+1);
  return whole?`${whole}${frac}`:frac||"⅛";
}
// "⅓ tbsp" reads better as "1 tsp", and "⅛ cup" as "2 tbsp".
function smallerUnit(q,unit){
  if(/^tbsp$/i.test(unit)&&q<0.75)return [q*3,"tsp"];
  if(/^cups?$/i.test(unit)&&q<0.2)return [q*16,"tbsp"];
  return [q,unit];
}
const fitUnit=(unit,q)=>{
  if(!unit||/^(g|kg|ml|l|tbsp|tsp|oz|lb)$/i.test(unit))return unit;
  return q>1?(/s$/.test(unit)?unit:plural(unit)):singular(unit);
};
// Scales "2 tbsp", "1½–2 cups", "680 g (1½ lb)", "1 can (400 g / 15 oz)" and the noun after a bare count.
function scaleAmount(qty1,qty2,unit,bracket,factor,wholeOnly){
  const wasFraction=/[½¼¾⅓⅔⅛/.]/.test(qty1);
  let q1=parseServeQty(qty1)*factor,q2=qty2?parseServeQty(qty2)*factor:null;
  if(unit){const [q,u]=smallerUnit(q1,unit);if(u!==unit){q2=q2&&q2*q/q1;q1=q;unit=u}}
  let out=formatServeQty(q1,unit,wasFraction,wholeOnly)+(qty2?"–"+formatServeQty(q2,unit,wasFraction,wholeOnly):"");
  const shown=parseServeQty(out.split("–").pop());
  if(unit)out+=" "+fitUnit(unit,shown);
  if(bracket)out+=" "+(unit&&SERVE_CONTAINERS.test(unit)||/each/.test(bracket)?bracket:scaleBracket(bracket,factor));
  return out;
}
const scaleBracket=(text,factor)=>text.replace(new RegExp(`(${SERVE_QTY})(\\s*[–-]\\s*(${SERVE_QTY}))?\\s*(${SERVE_MEASURES})\\b`,"g"),
  (m,a,dash,b,unit)=>`${formatServeQty(parseServeQty(a)*factor,unit,true)}${b?"–"+formatServeQty(parseServeQty(b)*factor,unit,true):""} ${unit}`);
// A count with no unit changes its noun: "1 lime" → "2 limes", "2 onions" → "1 onion".
function fixNoun(rest,was,now){
  if((was>1)===(now>1))return rest;
  return rest.replace(/^(\s*(?:[a-zà-ÿ-]+\s+){0,3}?)([a-zà-ÿ]+)(?=\s*(?:,|\(|;|$| or | and | plus | to | for | in | with )|\s+[a-z]+ed\b)/i,
    (m,before,noun)=>before+(now>1?(/s$/.test(noun)?noun:plural(noun)):singular(noun)));
}
const SERVE_AMOUNT_RE=new RegExp(`(^|[,:;]\\s*(?:and\\s+)?|\\b(?:of|or|plus)\\s+)(${SERVE_QTY})(?:\\s*[–-]\\s*(${SERVE_QTY}))?(?:\\s*(${SERVE_MEASURES}|${SERVE_PIECES})\\b)?(\\s*\\([^)]*\\))?`,"gi");
function scaleIngredientLine(line,factor){
  if(factor===1)return line;
  let out="",last=0;
  for(const m of line.matchAll(SERVE_AMOUNT_RE)){
    const [whole,lead,qty1,qty2,unit,bracket]=m,end=m.index+whole.length;
    // The words after a bare count, up to the next amount: "2 onions, sliced" → " onions".
    const nextStop=line.slice(end).search(/[,;:]|\b(?:of|or|plus)\s+\d/);
    const rest=unit?"":nextStop<0?line.slice(end):line.slice(end,end+nextStop);
    const scaled=scaleAmount(qty1,qty2,unit,bracket?.trim(),factor,/^\s*(?:large |medium |small |whole )?eggs?\b/i.test(rest));
    out+=line.slice(last,m.index)+lead+scaled;
    last=end;
    if(rest){
      const was=parseServeQty(qty1),now=parseServeQty(scaled.split(/[\s–]/)[0]);
      out+=fixNoun(rest,was,now).replace(/\([^)]*\)/g,b=>/each/.test(b)?b:scaleBracket(b,factor));last+=rest.length;
    }
  }
  return out+line.slice(last);
}
// In steps, only measured amounts change ("2½ cups", "½ tsp salt"); times and sizes don't.
const STEP_AMOUNT_RE=new RegExp(`(^|[^\\d.,/×x])(${SERVE_QTY})(?:\\s*[–-]\\s*(${SERVE_QTY}))?\\s*(cups?|tbsp|tsp|g|kg|ml|L|oz|lbs?)\\b(?!\\s*(?:pan|dish|tin|piece))`,"g");
// Things the ingredient list counts without a unit: "2 eggs", "8 small tortillas" → egg, tortilla.
function countedNouns(lines){
  const nouns=new Set();
  for(const line of lines){
    const m=line.match(/^(?:\d+|[½¼¾⅓⅔⅛])\s+(?:[a-zà-ÿ-]+\s+){0,3}?([a-zà-ÿ]+)(?=\s*(?:,|\(|;|$| or | and | plus | to | for | in | with )|\s+[a-z]+ed\b)/i);
    if(m&&!new RegExp(`^(${SERVE_MEASURES}|${SERVE_PIECES})$`,"i").test(m[1]))nouns.add(singular(m[1].toLowerCase()));
  }
  return nouns;
}
// Steps that count one of those follow the ingredient list: "Scramble the 2 eggs", "Whisk 3 large eggs".
function scaleStepCounts(text,factor,nouns){
  return text.replace(/\b(\d+)((?:\s+[a-z-]+){1,3})/gi,(m,n,after)=>{
    const words=after.trim().split(/\s+/),k=words.findIndex(w=>nouns.has(singular(w.toLowerCase())));
    // Amounts with a unit ("1 tbsp milk") are scaled as measurements instead.
    if(k<0||words.slice(0,k).some(w=>new RegExp(`^(${SERVE_MEASURES}|${SERVE_PIECES})$`,"i").test(w)))return m;
    const now=formatServeQty(+n*factor,"",false,/^eggs?$/i.test(words[k]));
    words[k]=fixNoun(words[k],+n,parseServeQty(now));
    return `${now} ${words.join(" ")}`;
  });
}
function scaleStepText(text,factor,nouns=new Set()){
  if(factor===1)return text;
  return text.split(/(?<=[.!?])\s+/).map(sentence=>/\b(each|per|every|at a time)\b/i.test(sentence)?sentence:scaleStepCounts(sentence,factor,nouns).replace(STEP_AMOUNT_RE,(m,lead,a,b,unit)=>{
    let q1=parseServeQty(a)*factor,q2=b?parseServeQty(b)*factor:null;
    const [q,u]=smallerUnit(q1,unit);
    if(u!==unit){q2=q2&&q2*q/q1;q1=q;unit=u}
    return `${lead}${formatServeQty(q1,unit,true)}${b?"–"+formatServeQty(q2,unit,true):""} ${fitUnit(unit,q1)}`;
  })).join(" ");
}

function scaleRecipe(r,serves){
  const factor=serves/r.serves;
  const nouns=countedNouns(r.ingredients);
  return {...r,serves,scaledFrom:r.serves,
    ingredients:r.ingredients.map(l=>scaleIngredientLine(l,factor)),
    steps:r.steps.map(s=>({...s,desc:scaleStepText(s.desc,factor,nouns)}))};
}

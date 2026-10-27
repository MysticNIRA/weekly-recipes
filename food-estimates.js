/* Rough calories and prices for common ingredients, used to estimate a cook's own recipes.
   Each food: [name, pattern, calories per 100 g, U.S. dollars per 100 g, grams per cup, grams each].
   "Each" is one of the thing (an egg, a clove, a slice, a can); leave it 0 when counting makes no sense.
   A line is matched to the food named last before its first comma ("chicken broth" is broth,
   "rice, rinsed until the water runs clear" is rice); ties go to the food listed first here, so
   more specific names come first ("brown sugar" before "sugar", "peanut butter" before "butter").
   Bony cuts (oxtails) count only the meat that comes off the bone.
   These are estimates for planning, not nutrition labels. */
const FOODS=[
 // Fats, sweets, and things whose names contain other foods
 ["peanut butter","peanut butter",588,0.65,258,0],
 ["olive oil","olive oil",884,0.90,218,0],
 ["oil","\\boil",884,0.35,218,0],
 ["buttermilk","buttermilk",40,0.15,245,0],
 ["butter","butter|ghee",717,1.00,227,113],
 ["brown sugar","brown sugar",380,0.30,220,0],
 ["powdered sugar","powdered sugar|icing sugar",389,0.35,120,0],
 ["sugar","sugar",387,0.20,200,0],
 ["honey","honey",304,1.30,340,0],
 ["maple syrup","maple syrup",260,2.00,315,0],
 ["condensed milk","condensed milk",321,0.60,306,0],
 ["evaporated milk","evaporated milk",134,0.40,252,0],
 ["coconut milk","coconut milk|coconut cream",197,0.45,240,400],
 ["cream cheese","cream cheese",342,1.00,232,0],
 ["sour cream","sour cream",198,0.55,230,0],
 ["cream","heavy cream|whipping cream|cream",340,0.50,238,0],
 ["chocolate","chocolate chips|chocolate",500,1.20,170,0],
 ["cocoa","cocoa",228,1.50,85,0],
 ["jam","jam|jelly|preserves",250,0.80,320,0],
 ["oyster sauce","oyster sauce",51,0.80,270,0],
 ["hoisin","hoisin|sweet chili sauce|bbq sauce|barbecue sauce",220,0.70,280,0],
 ["kecap manis","kecap manis|sweet soy",300,0.80,300,0],
 ["miso","miso",199,1.20,275,0],
 ["mayonnaise","mayonnaise|mayo",680,0.60,220,0],
 ["tahini","tahini",595,1.40,240,0],
 ["hummus","hummus",166,0.90,246,0],
 ["pesto","pesto",450,2.00,240,0],
 // Sauces and seasonings
 ["broth","broth|stock",5,0.15,240,0],
 ["bouillon","bouillon",250,2.50,0,4],
 ["soy sauce","soy sauce|tamari",53,0.50,255,0],
 ["fish sauce","fish sauce",35,0.60,255,0],
 ["vinegar","vinegar",18,0.30,240,0],
 ["ketchup","ketchup",101,0.40,240,0],
 ["mustard","mustard",66,0.60,250,0],
 ["hot sauce","hot sauce|sriracha|tabasco",20,0.80,240,0],
 ["salsa","salsa",36,0.60,260,0],
 ["tomato paste","tomato paste",82,0.60,262,0],
 ["canned tomatoes","crushed tomatoes|diced tomatoes|whole tomatoes|canned tomatoes|tomato sauce|passata|marinara|pizza sauce|enchilada sauce",32,0.25,245,400],
 ["curry paste","curry paste|harissa|chili paste|gochujang",100,1.50,250,0],
 ["baking powder","baking powder|baking soda|yeast",0,1.00,200,0],
 ["vanilla","vanilla",288,10.00,208,0],
 ["cornstarch","cornstarch|corn starch",381,0.40,128,0],
 ["spices","cumin|paprika|cinnamon|turmeric|oregano|chili powder|chili flakes|garlic powder|onion powder|curry powder|garam masala|thyme|rosemary|nutmeg|allspice|coriander|cardamom|bay lea|seasoning|spice|dried herbs|italian herbs|pepper flakes|cayenne|peppercorns|annatto|saz[oó]n|togarashi|fenugreek|cloves? \\(whole\\)|whole cloves",300,3.00,100,2],
 ["salt and water","\\bsalt\\b|\\bwater\\b|\\bice\\b|black pepper|^pepper|pepper to taste",0,0,240,0],
 // Grains, breads, and pasta
 ["lasagna noodles","lasagna noodle|lasagne",371,0.40,100,20],
 ["fresh noodles","fresh[^,]*noodles",160,0.50,100,0],
 ["noodles","noodle|ramen|udon|soba",360,0.60,100,85],
 ["cooked rice","cooked[^,]*rice|leftover rice|steamed rice|rice, cooked",130,0.10,158,0],
 ["rice","rice",360,0.25,185,0],
 ["oats","oats|oatmeal",379,0.35,80,0],
 ["couscous","couscous|bulgur|freekeh",360,0.60,175,0],
 ["quinoa","quinoa",368,1.00,170,0],
 ["cornmeal","cornmeal|masa|polenta|grits",370,0.30,120,0],
 ["breadcrumbs","breadcrumbs|bread crumbs|panko",395,0.80,110,0],
 ["flour","flour",364,0.12,125,0],
 ["tostadas","tostada",480,1.20,0,12],
 ["tortillas","tortilla",300,0.80,0,45],
 ["pizza dough","pizza dough|biscuit dough|refrigerated biscuits",260,0.50,0,55],
 ["pie crust","pie crust|pastry",450,0.80,0,230],
 ["crackers","cracker|saltine",420,0.90,0,3],
 ["french fries","fries",150,0.40,100,0],
 ["rice paper","rice paper(?: wrappers?)?",330,1.20,0,9],
 ["flatbread","pita|naan|flatbread|wrap",275,0.80,0,70],
 ["buns","\\bbuns?\\b|rolls?\\b|bagel|english muffin",280,0.70,0,55],
 ["bread","bread|toast",265,0.60,30,30],
 ["pasta","pasta|spaghetti|macaroni|penne|fettuccine|linguine|lasagna|elbows|rigatoni|ditalini|orzo",371,0.40,100,20],
 // Meat, fish, eggs, and plant proteins
 ["turkey bacon","turkey bacon|beef bacon",220,1.50,0,15],
 ["bacon","bacon",460,1.80,0,12],
 ["sausage","sausage|chorizo|hot dog",300,1.30,0,75],
 ["pepperoni","pepperoni|salami",500,2.00,100,3],
 ["ground meat","ground beef|ground lamb|ground pork|minced beef",254,1.30,225,0],
 ["ground turkey or chicken","ground turkey|ground chicken",150,1.10,225,0],
 ["chicken breast","chicken breast",120,0.90,140,200],
 ["chicken thighs","chicken thigh",177,0.75,140,120],
 ["chicken wings","chicken wing|wings",200,0.80,0,30],
 ["chicken","chicken",170,0.65,140,200],
 ["turkey","turkey",135,1.20,140,28],
 ["ham","\\bham\\b",145,1.40,140,28],
 ["lamb","lamb|goat|mutton",280,2.20,140,200],
 ["pork","pork",240,0.90,140,200],
 ["oxtails","oxtail",130,1.40,0,0],
 ["beef","beef|steak|brisket|chuck|short rib|sirloin",220,2.00,140,300],
 ["salmon","salmon",208,2.20,0,170],
 ["tuna","tuna",116,1.10,0,140],
 ["shrimp","shrimp|prawn",85,2.00,145,15],
 ["clams","clams",86,1.50,160,0],
 ["fish","fish|tilapia|cod|haddock|sea bass|flounder|catfish|mackerel|sardine",100,1.50,0,150],
 ["eggs","eggs?\\b",143,0.58,243,50],
 ["tofu","tofu",110,0.55,250,400],
 ["lentils","lentil",352,0.40,192,0],
 ["chickpeas","chickpea|garbanzo",139,0.45,160,250],
 ["dried beans","dried[^,]*(beans|peas|chickpeas)",340,0.30,190,0],
 ["canned peas and beans","black-eyed peas|pigeon peas|gandules",120,0.40,170,250],
 ["green beans","green bean|long bean",31,0.60,110,0],
 ["bean sprouts","bean sprouts|sprouts",30,0.50,104,0],
 ["beans","beans",130,0.40,172,250],
 // Dairy
 ["parmesan","parmesan|pecorino",431,2.80,100,0],
 ["feta","feta|cotija|queso fresco",264,1.80,150,0],
 ["mozzarella","mozzarella",300,1.10,112,0],
 ["ricotta","ricotta",174,0.90,246,0],
 ["paneer","paneer",321,1.50,150,0],
 ["cheese","cheese|cheddar|monterey jack|gouda|gruy[eè]re|swiss|provolone|jack",403,1.30,113,21],
 ["yogurt","yogurt|yoghurt",61,0.45,245,0],
 ["milk","milk",61,0.10,245,0],
 // Vegetables, fruit, and herbs
 ["sweet potato","sweet potato|yam",86,0.30,133,180],
 ["potatoes","potato",77,0.20,150,200],
 ["green onions","green onion|scallion|spring onion",32,0.70,100,15],
 ["onion","onion|shallot|leek",40,0.25,160,150],
 ["garlic","garlic",149,1.00,136,3],
 ["ginger","ginger",80,0.80,96,15],
 ["bell pepper","bell pepper|red pepper|green pepper|capsicum",31,0.60,150,150],
 ["chiles","chile|chili|jalape|serrano|habanero|poblano",40,0.70,150,15],
 ["tomatoes","tomato",18,0.45,180,120],
 ["carrots","carrot",41,0.20,128,60],
 ["celery","celery",16,0.30,100,40],
 ["broccoli","broccoli",34,0.50,90,300],
 ["cauliflower","cauliflower",25,0.40,107,600],
 ["spinach","spinach",23,0.90,30,0],
 ["kale and greens","kale|collard|chard|greens|bok choy",40,0.90,67,250],
 ["lettuce","lettuce|romaine|salad leaves|arugula",15,0.40,47,500],
 ["cabbage","cabbage|slaw",25,0.20,89,900],
 ["cucumber","cucumber",15,0.35,120,300],
 ["zucchini","zucchini|courgette",17,0.40,124,200],
 ["eggplant","eggplant|aubergine",25,0.40,82,450],
 ["mushrooms","mushroom",22,0.80,70,18],
 ["peas","\\bpeas",81,0.40,145,0],
 ["corn","\\bcorn\\b",86,0.40,150,100],
 ["okra","okra",33,0.80,100,12],
 ["yuca","yuca|cassava",160,0.40,206,400],
 ["beets","beet",43,0.35,136,150],
 ["kimchi","kimchi",15,0.80,150,0],
 ["ackee","ackee",151,2.20,150,0],
 ["mango","mango",60,0.50,165,200],
 ["peaches","peach",50,0.50,170,150],
 ["dried apricots","dried apricot|apricot",241,1.50,130,8],
 ["oranges","orange",47,0.40,180,130],
 ["squash","squash|pumpkin",40,0.35,140,1000],
 ["avocado","avocado|guacamole",160,0.80,150,150],
 ["plantains","plantain",122,0.30,150,180],
 ["lemon or lime juice","lemon juice|lime juice",22,0.40,244,0],
 ["lemons and limes","lemon|lime",29,0.50,0,60],
 ["bananas","banana",89,0.15,150,120],
 ["apples","apple",52,0.35,125,180],
 ["berries","berr",50,1.00,145,0],
 ["raisins","raisin|dried fruit|cranberries",299,0.90,145,0],
 ["dates","dates?\\b",282,1.20,150,24],
 ["olives","olive",115,1.20,135,4],
 ["nuts","almond|walnut|cashew|peanut|pecan|pistachio|nuts|seeds",600,1.60,140,0],
 ["fresh herbs","cilantro|parsley|basil|mint|dill|herbs",25,1.50,16,50],
 ["vegetables","vegetables?|veggies",35,0.40,120,0]
].map(([name,pattern,kcal,price,cup,each])=>({name,re:new RegExp(pattern,"i"),all:new RegExp(pattern,"gi"),kcal,price,cup,each}));

// Where the last match of a food ends in some text, or -1.
function lastMatchEnd(food,text){
  let end=-1;
  for(const m of text.matchAll(food.all))end=m.index+m[0].length;
  return end;
}
// The food a part of a line is about: named last before the first comma, leaving out brackets.
// Water and salt only win when nothing else is named ("kashk thinned with water" is kashk).
function findFood(rest){
  const plain=rest.replace(/\([^)]*\)/g," ");
  for(const text of [plain.split(",")[0],plain,rest]){
    const found=FOODS.map((f,i)=>({f,i,end:lastMatchEnd(f,text)})).filter(x=>x.end>=0);
    if(!found.length)continue;
    const real=found.filter(x=>x.f.kcal||x.f.price);
    const pool=real.length?real:found;
    pool.sort((a,b)=>b.end-a.end||a.i-b.i);
    return pool[0].f;
  }
  return null;
}

const FOOD_FRACTIONS={"½":0.5,"¼":0.25,"¾":0.75,"⅓":1/3,"⅔":2/3,"⅛":0.125};
// Grams in one of each unit, given the food. Units that depend on the food use its cup or "each" weight.
function gramsPerUnit(unit,food){
  const u=unit.toLowerCase().replace(/s$/,"").replace(/\.$/,"");
  const fixed={g:1,gram:1,kg:1000,kilogram:1000,oz:28.35,ounce:28.35,lb:453.6,pound:453.6,pinch:0.3,dash:0.5,handful:30,leave:10,leaf:10};
  if(fixed[u])return fixed[u];
  const volume={cup:1,tbsp:1/16,tablespoon:1/16,tsp:1/48,teaspoon:1/48,ml:1/240,l:1000/240,liter:1000/240,litre:1000/240};
  if(volume[u])return food.cup?food.cup*volume[u]:0;
  if(u==="stick")return food.name==="butter"?113:food.each;
  if(u==="can"||u==="tin")return food.each||400;
  if(u==="bunch")return food.each||50;
  return food.each;
}
const UNIT_WORDS="kg|kilograms?|g|grams?|oz|ounces?|lbs?|pounds?|cups?|tbsp|tablespoons?|tsp|teaspoons?|ml|l|liters?|litres?|pinch(?:es)?|dash(?:es)?|handfuls?|sticks?|cans?|tins?|bunch(?:es)?|cloves?|slices?|pieces?|heads?|stalks?|fillets?|breasts?|thighs?|ears?|blocks?|packages?|packets?|packs?|leaves|leaf|large|medium|small";
const AMOUNT_RE=new RegExp(`^(\\d+\\s+\\d+\\/\\d+|\\d+\\/\\d+|\\d*[½¼¾⅓⅔⅛]|\\d+(?:\\.\\d+)?)(?:\\s*(?:-|–|to)\\s*\\d+(?:\\.\\d+)?)?\\s*(?:(${UNIT_WORDS})\\b\\.?)?\\s*`,"i");
function parseNumber(text){
  const t=text.trim();
  if(/^\d+\s+\d+\/\d+$/.test(t)){const [w,f]=t.split(/\s+/);const [a,b]=f.split("/");return +w+a/b}
  if(/^\d+\/\d+$/.test(t)){const [a,b]=t.split("/");return a/b}
  const frac=t.slice(-1);
  if(FOOD_FRACTIONS[frac])return (+t.slice(0,-1)||0)+FOOD_FRACTIONS[frac];
  return +t;
}
// One ingredient line ("2 cups rice", "1 can (400 g) chickpeas") → {food, grams}, or a reason it can't be counted.
function measureLine(line){
  const text=line.trim().replace(/^[-•*]\s*/,"").replace(/^(?:the )?juice (?:of|from)\s+/i,"");
  const lower=text.toLowerCase();
  if(/for (deep[- ]|shallow[- ])?frying/.test(lower))return {frying:true};
  const m=lower.match(AMOUNT_RE);
  const rest=m?lower.slice(m[0].length):lower;
  const food=findFood(rest)||findFood(lower);
  if(!food)return {unknown:true};
  if(food.kcal===0&&food.price===0)return {food,grams:0};
  if(!m)return /to taste|optional|pinch|garnish|to serve|for serving/.test(lower)?{food,grams:0}:{food,unknown:true};
  const qty=parseNumber(m[1]),unit=m[2]||"";
  // "1 can (400 g / 15 oz)" or "2 cups (360 g)": trust the weight in brackets.
  const bracket=lower.match(/\((?:about\s+)?(\d+(?:\.\d+)?)\s*(g|kg|ml)\b[^)]*\)/);
  if(bracket&&!/^(g|kg|grams?|kilograms?)$/.test(unit)){
    const each=/each/.test(bracket[0])||/^(cans?|tins?)$/.test(unit);
    const g=+bracket[1]*(bracket[2]==="kg"?1000:1);
    return {food,grams:each?g*qty:g};
  }
  // "8 lettuce leaves" counts leaves, not heads of lettuce.
  const leaves=!unit&&/\b(leaves|leaf)\b/.test(rest.split(",")[0]);
  const per=leaves?10:/^(large|medium|small)$/.test(unit)||!unit?food.each:gramsPerUnit(unit,food);
  if(!per)return {food,unknown:true};
  return {food,grams:qty*per};
}
// "Sauce: 3 tbsp soy sauce, 1 tbsp sugar" → ["3 tbsp soy sauce", "1 tbsp sugar"]. A comma only starts a
// new food when an amount follows it, so "1 onion, chopped" stays one food.
function foodParts(line){
  const label=line.match(/^([^:\d]*):\s*/);
  const body=label?line.slice(label[0].length):line;
  return body.split(/[,;]\s*(?=(?:and\s+|plus\s+)?(?:\d|[½¼¾⅓⅔⅛]|pinch\b|juice of))/i).map(p=>p.replace(/^(?:and|plus)\s+/i,"").trim()).filter(Boolean);
}
// Calories and cost per serving for a list of ingredient lines, plus the parts it couldn't count.
// Most frying oil stays in the pan, so fried food counts about 1 tbsp of oil soaked up per serving.
const FRYING_OIL_PER_SERVING={kcal:120,cost:0.05};
function estimateFood(lines,serves){
  const n=Math.max(1,serves||1);
  let kcal=0,cost=0,counted=0;
  const missing=[];
  for(const line of lines.flatMap(foodParts)){
    const got=measureLine(line);
    if(got.frying){kcal+=FRYING_OIL_PER_SERVING.kcal*n;cost+=FRYING_OIL_PER_SERVING.cost*n;counted++;continue}
    if(got.unknown){missing.push(line.trim());continue}
    kcal+=got.food.kcal*got.grams/100;
    cost+=got.food.price*got.grams/100;
    counted++;
  }
  return {calories:counted?Math.round(kcal/n/10)*10:null,cost:counted?Math.round(cost/n*100)/100:null,counted,missing};
}

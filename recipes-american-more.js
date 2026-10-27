/* More American recipes: soul food classics (style "Soul food") and everyday favorites.
   Soul food traditionally seasons greens and beans with ham hock; these use smoked turkey, which
   many soul food cooks use too, so the recipes stay halal-friendly. */
RECIPES.push(
 {id:"smothered-chicken",style:"Soul food",title:"Smothered Chicken with Onion Gravy",cuisine:"American",diet:["halal"],serves:4,cost:2.50,meal:["dinner"],tags:["stew","onepot"],
  desc:"A soul food Sunday dinner: seasoned chicken thighs browned, then simmered until tender in a rich, peppery onion gravy. Served over rice or mashed potatoes with greens on the side.",
  pantry:["chicken thighs","flour","onion","garlic","chicken broth","paprika","garlic powder","onion powder","butter","rice"],
  ingredients:["8 bone-in, skin-on chicken thighs (about 1.4 kg / 3 lb) (halal-certified to keep it halal)","Seasoning: 2 tsp paprika, 1 tsp garlic powder, 1 tsp onion powder, 1½ tsp salt, ½ tsp black pepper","½ cup (65 g) all-purpose flour","3 tbsp oil","2 tbsp butter","2 onions, thinly sliced","3 garlic cloves, minced","2½ cups (600 ml) chicken broth","Cooked rice or mashed potatoes, to serve"],
  steps:[
   {name:"Season and flour the chicken",desc:"Pat the chicken dry and rub it all over with the seasoning. Put the flour in a shallow dish, press each piece into it, and shake off the extra. Keep 3 tbsp of the leftover flour for the gravy.",min:6,timer:false},
   {name:"Brown the chicken",desc:"Heat the oil in a large heavy skillet with a lid over medium-high heat. Brown the chicken skin-side down until deep golden, about 5 min per side, in two batches. Move it to a plate.",min:12},
   {name:"Cook the onions",desc:"Pour off all but 2 tbsp of fat and add the butter. Cook the onions over medium heat, scraping up the brown bits, until soft and golden, then add the garlic for 1 min.",min:8},
   {name:"Make the gravy",desc:"Sprinkle the saved 3 tbsp flour over the onions and stir 1 min. Slowly whisk in the broth and bring to a simmer, stirring, until it thickens.",min:3,timer:false},
   {name:"Smother and simmer",desc:"Return the chicken, skin-side up, with any juices. Cover and simmer on low until the chicken is very tender and reads 175°F (80°C) near the bone, or the juices run clear.",min:35},
   {name:"Serve",desc:"Taste the gravy for salt and pepper. Serve the chicken over rice or mashed potatoes with plenty of gravy.",min:2,timer:false}]},

 {id:"collard-greens",style:"Soul food",title:"Collard Greens with Smoked Turkey",cuisine:"American",diet:["halal","glutenfree"],serves:6,cost:1.75,meal:["side","dinner"],tags:["onepot"],
  desc:"Tender, silky collard greens slow-simmered with smoked turkey, onion, garlic, and a splash of vinegar. The smoky broth they cook in (the \"pot likker\") is part of the treat; sop it up with cornbread.",
  pantry:["collard greens","smoked turkey","onion","garlic","chicken broth","vinegar","chili flakes","sugar"],
  ingredients:["2 large bunches collard greens (about 900 g / 2 lb)","1 smoked turkey wing or leg, about 450 g (1 lb) (halal-certified to keep it halal)","1 tbsp oil","1 onion, diced","4 garlic cloves, minced","6 cups (1.4 L) chicken broth or water (check it's gluten-free)","2 tbsp apple cider vinegar","1 tsp sugar","½ tsp chili flakes","1 tsp salt, then more to taste"],
  steps:[
   {name:"Start the smoky broth",desc:"Put the smoked turkey and broth in a large pot, bring to a boil, then cover and simmer so the broth takes on the smoky flavor. Meanwhile, wash the greens (see the next step).",min:30},
   {name:"Wash and cut the greens",desc:"Swish the leaves in a sink of cold water, lift them out, and repeat until no grit is left. Cut out the thick stems, stack the leaves, roll them up, and slice into 2 cm (¾ in) ribbons.",min:10,timer:false},
   {name:"Soften the onion",desc:"In a small pan, cook the onion in the oil over medium heat until soft, then add the garlic for 1 min. Scrape it into the pot.",min:6},
   {name:"Simmer the greens",desc:"Add the greens a few handfuls at a time, letting each wilt before adding more. Stir in the vinegar, sugar, chili flakes, and salt. Cover and simmer gently, stirring now and then, until the greens are very tender.",min:45},
   {name:"Finish",desc:"Take out the turkey, pull the meat off the bone, and stir it back in. Taste the broth and add salt or a little more vinegar. Serve with some of the pot likker.",min:5,timer:false}]},

 {id:"hoppin-john",style:"Soul food",title:"Hoppin' John",cuisine:"American",diet:["halal","glutenfree"],serves:6,cost:1.25,meal:["dinner","side"],tags:["beans","rice","onepot"],
  desc:"Black-eyed peas and rice cooked with smoked turkey, onion, celery, and peppers. Eaten on New Year's Day across the South for good luck, with collard greens and cornbread, but good any day.",
  pantry:["black-eyed peas","rice","smoked turkey","onion","celery","bell pepper","garlic","thyme","chicken broth"],
  ingredients:["2 cans (425 g / 15 oz each) black-eyed peas, drained and rinsed","1 cup (185 g) long-grain white rice, rinsed","225 g (8 oz) smoked turkey, diced (halal-certified to keep it halal)","1 tbsp oil","1 onion, diced","2 celery stalks, diced","1 green bell pepper, diced","3 garlic cloves, minced","1 tsp dried thyme","¼ tsp cayenne","2 bay leaves","2 cups (480 ml) chicken broth (check it's gluten-free)","¾ tsp salt","Sliced green onions and hot sauce, to serve"],
  steps:[
   {name:"Brown the turkey",desc:"Heat the oil in a large pot with a lid over medium heat and brown the smoked turkey.",min:4,timer:false},
   {name:"Soften the vegetables",desc:"Add the onion, celery, and pepper and cook until soft, then the garlic, thyme, and cayenne for 1 min.",min:7},
   {name:"Simmer the rice and peas",desc:"Stir in the rice, black-eyed peas, bay leaves, broth, and salt. Bring to a boil, then cover, turn the heat to low, and cook without lifting the lid until the rice is tender.",min:18},
   {name:"Rest",desc:"Take it off the heat and leave it covered so the rice finishes steaming. Fluff with a fork and take out the bay leaves.",min:5},
   {name:"Serve",desc:"Top with green onions and pass the hot sauce.",min:1,timer:false}]},

 {id:"candied-yams",style:"Soul food",title:"Candied Yams",cuisine:"American",diet:["vegetarian","halal","glutenfree"],serves:6,cost:1.00,meal:["side"],tags:["oven"],
  desc:"Sweet potatoes baked in a buttery brown sugar syrup with cinnamon, nutmeg, and vanilla until glossy and tender. A must at soul food holiday dinners. (In the U.S., the orange \"yams\" sold in stores are sweet potatoes.)",
  pantry:["sweet potatoes","butter","brown sugar","cinnamon","nutmeg","vanilla","orange juice"],
  ingredients:["1.4 kg (3 lb) sweet potatoes (about 4), peeled and cut into 1.5 cm (½ in) rounds","6 tbsp butter","¾ cup (165 g) packed brown sugar","¼ cup (60 ml) orange juice or water","1 tsp cinnamon","¼ tsp nutmeg","¼ tsp salt","1 tsp vanilla extract"],
  steps:[
   {name:"Heat the oven",desc:"Heat the oven to 375°F (190°C). Arrange the sweet potato rounds in a 23 × 33 cm (9 × 13 in) baking dish, overlapping a little.",min:10},
   {name:"Make the syrup",desc:"Melt the butter in a small pot over medium heat. Stir in the brown sugar, orange juice, cinnamon, nutmeg, and salt and simmer until the sugar dissolves. Off the heat, stir in the vanilla.",min:4,timer:false},
   {name:"Bake covered",desc:"Pour the syrup over the sweet potatoes, cover with foil, and bake.",min:30},
   {name:"Bake uncovered",desc:"Uncover, spoon the syrup over the top, and bake until a knife slides in easily and the syrup has thickened, basting once more halfway.",min:25},
   {name:"Rest",desc:"Let it sit a few minutes; the syrup thickens as it cools.",min:5}]},

 {id:"braised-oxtails",style:"Soul food",title:"Braised Oxtails and Gravy",cuisine:"American",diet:["halal"],serves:4,cost:6.00,meal:["dinner"],tags:["stew","onepot"],
  desc:"Oxtails browned and braised low and slow with onions, peppers, and thyme until the meat falls off the bone into a rich brown gravy. A soul food special-occasion dish, served over rice. Mostly hands-off, but it takes about 3 hours.",
  pantry:["oxtails","flour","onion","bell pepper","garlic","thyme","beef broth","tomato paste","rice"],
  ingredients:["1.4 kg (3 lb) oxtails, trimmed of extra fat (halal-certified to keep it halal)","Seasoning: 1½ tsp salt, 1 tsp black pepper, 1 tsp garlic powder, 1 tsp onion powder, 1 tsp paprika","¼ cup (30 g) all-purpose flour","2 tbsp oil","1 onion, diced","1 green bell pepper, diced","4 garlic cloves, minced","2 tbsp tomato paste","1 tsp dried thyme","2 bay leaves","4 cups (960 ml) beef broth","Cooked rice, to serve"],
  steps:[
   {name:"Season and brown the oxtails",desc:"Rub the oxtails with the seasoning and toss in the flour. Heat the oil in a large heavy pot with a lid over medium-high heat and brown them well on all sides, in batches, about 8 min per batch. Set aside.",min:16},
   {name:"Cook the vegetables",desc:"Lower the heat to medium. Cook the onion and pepper in the drippings until soft, then stir in the garlic, tomato paste, and thyme for 1 min.",min:7},
   {name:"Braise",desc:"Pour in the broth, scraping up the brown bits, add the bay leaves, and return the oxtails. Bring to a simmer, cover, and cook on low, turning the oxtails once or twice, until the meat pulls easily off the bone. Check that there's always liquid halfway up; add water if needed.",min:150},
   {name:"Thicken the gravy",desc:"Lift out the oxtails. Spoon off the fat from the top, then simmer the liquid uncovered, stirring, until it coats a spoon. Taste for salt. Return the oxtails and turn to coat.",min:10},
   {name:"Serve",desc:"Serve over rice with plenty of gravy.",min:2,timer:false}]},

 {id:"fried-catfish",style:"Soul food",title:"Cornmeal-Fried Catfish",cuisine:"American",diet:["halal","glutenfree"],seafood:true,serves:4,cost:3.25,meal:["dinner"],tags:["fried"],
  desc:"Catfish fillets soaked in seasoned milk and coated in cornmeal, then fried until golden and crunchy outside and flaky inside. A Friday fish-fry favorite with hot sauce, lemon, and coleslaw.",
  pantry:["catfish","cornmeal","cornstarch","milk","hot sauce","paprika","garlic powder","lemon","oil"],
  ingredients:["4 catfish fillets (about 680 g / 1½ lb), cut in half","1 cup (240 ml) milk","1 tbsp hot sauce","1 cup (150 g) fine yellow cornmeal","¼ cup (30 g) cornstarch","1½ tsp salt","1 tsp paprika","1 tsp garlic powder","½ tsp black pepper","¼ tsp cayenne","Oil, for frying","Lemon wedges and hot sauce, to serve"],
  steps:[
   {name:"Soak the fish",desc:"Mix the milk and hot sauce in a shallow dish and add the catfish. It mellows the flavor and helps the coating stick.",min:15,prep:true},
   {name:"Set up the coating and oil",desc:"Mix the cornmeal, cornstarch, salt, paprika, garlic powder, pepper, and cayenne in a shallow dish. Heat 2.5 cm (1 in) of oil in a heavy skillet to 350°F (175°C). No thermometer? A pinch of cornmeal should sizzle right away.",min:8,timer:false},
   {name:"Coat",desc:"Lift each piece out of the milk, let it drip, and press it into the cornmeal on both sides.",min:5,timer:false},
   {name:"Fry",desc:"Fry in batches without crowding, 3–4 min per side, until deep golden and the fish flakes easily with a fork (145°F / 63°C). Drain on a rack or paper towels.",min:14,timer:false},
   {name:"Serve",desc:"Serve hot with lemon wedges and hot sauce.",min:1,timer:false}]},

 {id:"peach-cobbler",style:"Soul food",title:"Peach Cobbler",cuisine:"American",diet:["vegetarian","halal"],serves:8,cost:0.90,meal:["dessert"],tags:["sweets","oven"],
  desc:"Juicy cinnamon peaches baked under a soft, buttery, cake-like topping that bubbles up golden around the fruit. A soul food dessert classic, best warm with vanilla ice cream.",
  pantry:["peaches","sugar","butter","flour","baking powder","milk","cinnamon","nutmeg","vanilla"],
  ingredients:["2 cans (425 g / 15 oz each) sliced peaches in juice, or 5 fresh peaches, sliced","½ cup (100 g) brown sugar","1 tsp cinnamon","¼ tsp nutmeg","1 tbsp lemon juice","½ cup (115 g) butter","1 cup (125 g) all-purpose flour","¾ cup (150 g) white sugar","2 tsp baking powder","¼ tsp salt","1 cup (240 ml) milk","1 tsp vanilla extract"],
  steps:[
   {name:"Heat the oven and melt the butter",desc:"Heat the oven to 350°F (175°C). Put the butter in a 23 × 33 cm (9 × 13 in) baking dish and set it in the oven while it heats, until melted.",min:10},
   {name:"Warm the peaches",desc:"Drain the canned peaches, keeping ½ cup of the juice. Simmer the peaches, juice, brown sugar, cinnamon, nutmeg, and lemon juice in a pot until the sugar dissolves.",min:5},
   {name:"Make the batter",desc:"Whisk the flour, white sugar, baking powder, and salt, then whisk in the milk and vanilla until smooth.",min:3,timer:false},
   {name:"Layer",desc:"Pour the batter over the melted butter. Don't stir. Spoon the peaches and their syrup evenly on top; the batter rises up around them as it bakes.",min:2,timer:false},
   {name:"Bake",desc:"Bake until golden brown and a toothpick in the cakey parts comes out clean.",min:45},
   {name:"Cool",desc:"Let it cool so the syrup thickens. Serve warm.",min:15}]},

 {id:"sweet-potato-pie",style:"Soul food",title:"Sweet Potato Pie",cuisine:"American",diet:["vegetarian","halal"],serves:8,cost:0.75,meal:["dessert"],tags:["sweets","oven"],
  desc:"Silky, spiced sweet potato custard in a flaky crust: the soul food holiday pie. Smoother and a little lighter than pumpkin pie, with warm cinnamon, nutmeg, and vanilla.",
  pantry:["sweet potatoes","pie crust","butter","sugar","eggs","evaporated milk","cinnamon","nutmeg","vanilla"],
  ingredients:["700 g (1½ lb) sweet potatoes (about 2 large)","1 store-bought or homemade 23 cm (9 in) pie crust, unbaked","4 tbsp butter, softened","¾ cup (150 g) sugar","2 eggs","½ cup (120 ml) evaporated milk","1 tsp vanilla extract","1 tsp cinnamon","½ tsp nutmeg","¼ tsp salt"],
  steps:[
   {name:"Cook the sweet potatoes",desc:"Peel the sweet potatoes, cut them into chunks, and boil until very soft. Drain well.",min:20},
   {name:"Heat the oven",desc:"Heat the oven to 350°F (175°C). Press the crust into a 23 cm (9 in) pie pan if it isn't in one.",min:10},
   {name:"Make the filling",desc:"Mash the hot sweet potatoes with the butter until very smooth (a mixer or blender helps). Beat in the sugar, eggs, evaporated milk, vanilla, cinnamon, nutmeg, and salt.",min:6,timer:false},
   {name:"Bake",desc:"Pour the filling into the crust and bake until the edges are set and the center jiggles just a little when you nudge the pan. If the crust browns too fast, cover the edge with foil.",min:55},
   {name:"Cool",desc:"Cool on a rack until set; it firms up as it cools. Chill any leftovers.",min:60}]},

 {id:"chicken-dumplings",title:"Chicken and Dumplings",cuisine:"American",diet:["halal"],serves:6,cost:1.75,meal:["dinner"],tags:["soup","onepot"],
  desc:"A thick, creamy chicken and vegetable stew topped with fluffy dumplings that steam right in the pot. Southern comfort food in one bowl.",
  pantry:["chicken thighs","onion","carrots","celery","garlic","flour","chicken broth","milk","butter","baking powder","thyme"],
  ingredients:["680 g (1½ lb) boneless chicken thighs (halal-certified to keep it halal)","3 tbsp butter","1 onion, diced","2 carrots, diced","2 celery stalks, diced","2 garlic cloves, minced","⅓ cup (40 g) all-purpose flour","6 cups (1.4 L) chicken broth","1 tsp dried thyme","1 tsp salt","½ tsp pepper","½ cup (120 ml) milk","Dumplings: 2 cups (250 g) all-purpose flour, 1 tbsp baking powder, 1 tsp salt, 4 tbsp cold butter, ¾ cup (180 ml) milk"],
  steps:[
   {name:"Soften the vegetables",desc:"Melt the butter in a large pot with a lid over medium heat. Cook the onion, carrots, and celery until soft, then the garlic for 1 min.",min:8},
   {name:"Thicken the broth",desc:"Sprinkle in the flour and stir 1 min, then slowly whisk in the broth. Add the thyme, salt, pepper, and the whole chicken thighs.",min:3,timer:false},
   {name:"Simmer the chicken",desc:"Bring to a boil, then simmer gently until the chicken is cooked through (165°F / 74°C).",min:20},
   {name:"Make the dumpling dough",desc:"While the chicken cooks, whisk the flour, baking powder, and salt. Rub in the butter with your fingertips until crumbly, then stir in the milk just until a soft, sticky dough forms.",min:5,timer:false},
   {name:"Shred the chicken",desc:"Lift out the chicken, shred it with two forks, and return it to the pot with the milk. Bring back to a gentle simmer.",min:4,timer:false},
   {name:"Steam the dumplings",desc:"Drop heaping spoonfuls of dough onto the simmering stew. Cover and cook without lifting the lid until the dumplings are puffed and cooked through (cut one open: no wet dough in the middle).",min:15},
   {name:"Serve",desc:"Let it sit 5 min to thicken, then ladle into bowls.",min:5}]},

 {id:"philly-cheesesteak",title:"Philly Cheesesteak",cuisine:"American",diet:["halal"],serves:4,cost:3.75,meal:["lunch","dinner"],tags:["sandwich"],
  desc:"Philadelphia's famous sandwich: thin-shaved beef seared on a hot pan with onions, smothered in melted provolone, and piled into a soft hoagie roll.",
  pantry:["beef","onion","green pepper","provolone","hoagie rolls","oil","salt","pepper"],
  ingredients:["680 g (1½ lb) ribeye or sirloin steak (halal-certified to keep it halal)","2 tbsp oil, divided","1 large onion, thinly sliced","1 green bell pepper, thinly sliced (optional)","¾ tsp salt","½ tsp pepper","8 slices provolone or American cheese","4 hoagie rolls, split"],
  steps:[
   {name:"Firm up the beef",desc:"Freeze the steak so it's firm enough to shave thin. Bought shaved steak? Press Done.",min:25,prep:true},
   {name:"Slice",desc:"Slice the beef across the grain as thin as you can.",min:5,timer:false},
   {name:"Cook the onions",desc:"Heat 1 tbsp oil in a large skillet over medium heat. Cook the onion and pepper with a pinch of salt until soft and golden. Move them to a plate.",min:10},
   {name:"Sear the beef",desc:"Turn the heat to high and add the rest of the oil. Spread the beef in the pan, season with salt and pepper, and cook, chopping it up with two spatulas, until browned with no pink left, 2–3 min.",min:3,timer:false},
   {name:"Melt the cheese",desc:"Mix the onions back in and divide into 4 piles. Lay 2 slices of cheese over each, then put an open roll face-down on top so it warms. After 1 min, slide a spatula under each pile and flip it into the roll.",min:2,timer:false}]},

 {id:"clam-chowder",title:"New England Clam Chowder",cuisine:"American",diet:["halal"],seafood:true,serves:5,cost:2.75,meal:["dinner","lunch"],tags:["soup","onepot"],
  desc:"Thick, creamy New England chowder with tender clams, potatoes, onion, and celery, scented with thyme. Bacon is traditional; this version gets its smoky depth from smoked paprika instead. Serve with oyster crackers.",
  pantry:["canned clams","clam juice","potatoes","onion","celery","butter","flour","milk","cream","thyme","smoked paprika"],
  ingredients:["3 cans (185 g / 6.5 oz each) chopped clams, with their juice","1 bottle (240 ml / 8 oz) clam juice","4 tbsp butter","1 onion, diced","2 celery stalks, diced","2 garlic cloves, minced","⅓ cup (40 g) all-purpose flour","450 g (1 lb) Yukon gold potatoes, in 1.5 cm (½ in) cubes","1 tsp dried thyme","½ tsp smoked paprika","1 bay leaf","1½ cups (360 ml) milk","½ cup (120 ml) heavy cream","½ tsp salt, then more to taste","¼ tsp pepper","Oyster crackers, to serve (optional)"],
  steps:[
   {name:"Soften the vegetables",desc:"Drain the clams, keeping all the juice. Melt the butter in a large pot over medium heat and cook the onion and celery until soft, then the garlic for 1 min.",min:7},
   {name:"Make the base",desc:"Stir in the flour for 1 min, then slowly whisk in the saved clam juice and the bottled clam juice until smooth.",min:3,timer:false},
   {name:"Simmer the potatoes",desc:"Add the potatoes, thyme, smoked paprika, and bay leaf. Simmer, stirring now and then so nothing sticks, until the potatoes are tender.",min:15},
   {name:"Finish",desc:"Stir in the milk, cream, and clams and heat gently without boiling (boiling makes clams rubbery), about 4 min. Season with salt and pepper and take out the bay leaf.",min:4,timer:false},
   {name:"Serve",desc:"Ladle into bowls and top with oyster crackers.",min:1,timer:false}]},

 {id:"chicken-caesar",title:"Chicken Caesar Salad",cuisine:"American",diet:["halal"],serves:4,cost:3.00,meal:["lunch","dinner"],tags:["salad"],
  desc:"Crisp romaine, seared garlic chicken, crunchy homemade croutons, and parmesan in a creamy, garlicky, lemony Caesar dressing. Invented in Tijuana by an Italian-American chef and now an American lunch staple. The dressing uses mayo, so there are no raw eggs.",
  pantry:["romaine","chicken breasts","bread","parmesan","mayonnaise","lemon","garlic","dijon mustard","anchovy paste","olive oil"],
  ingredients:["2 boneless chicken breasts (about 450 g / 1 lb) (halal-certified to keep it halal)","3 tbsp olive oil, divided","¾ tsp salt, divided","½ tsp pepper","½ tsp garlic powder","3 thick slices bread, in 2 cm (¾ in) cubes","2 heads romaine, chopped","Dressing: ½ cup (110 g) mayonnaise, ¼ cup (20 g) grated parmesan, 2 tbsp lemon juice, 1 tsp dijon mustard, 1 tsp anchovy paste (optional), 1 garlic clove grated, 1–2 tbsp water","¼ cup (20 g) shaved or grated parmesan, to top"],
  steps:[
   {name:"Make the croutons",desc:"Heat the oven to 400°F (200°C). Toss the bread with 2 tbsp olive oil and ¼ tsp salt on a sheet pan and bake, stirring once, until golden and crisp.",min:12},
   {name:"Make the dressing",desc:"Whisk the dressing ingredients until smooth, adding water until it's pourable. Taste; it should be bold and lemony.",min:3,timer:false},
   {name:"Cook the chicken",desc:"Pound the chicken to an even 2 cm (¾ in) thickness, season with the rest of the salt, the pepper, and garlic powder. Cook in the last 1 tbsp oil in a skillet over medium-high heat, 5–6 min per side, until 165°F (74°C) inside, or no pink in the thickest part.",min:12},
   {name:"Rest and slice",desc:"Rest the chicken on a board, then slice.",min:5},
   {name:"Toss",desc:"Toss the romaine with most of the dressing. Top with the chicken, croutons, parmesan, and the rest of the dressing.",min:3,timer:false}]},

 {id:"tuna-noodle-casserole",title:"Tuna Noodle Casserole",cuisine:"American",diet:["halal"],seafood:true,serves:6,cost:1.50,meal:["dinner"],tags:["oven","pasta"],
  desc:"A cozy, budget-friendly casserole of egg noodles, tuna, and peas in a creamy homemade sauce (no canned soup), baked under a buttery, crunchy, cheesy crumb topping.",
  pantry:["egg noodles","tuna","peas","onion","mushrooms","butter","flour","milk","chicken broth","cheddar","breadcrumbs"],
  ingredients:["340 g (12 oz) wide egg noodles","2 cans (140 g / 5 oz each) tuna, drained","1½ cups (200 g) frozen peas","3 tbsp butter, plus 1 tbsp melted for the topping","1 onion, diced","225 g (8 oz) mushrooms, sliced","¼ cup (30 g) all-purpose flour","2 cups (480 ml) milk","1 cup (240 ml) chicken or vegetable broth","1 tsp salt","½ tsp pepper","1 cup (100 g) shredded cheddar","½ cup (30 g) panko breadcrumbs"],
  steps:[
   {name:"Boil the noodles",desc:"Heat the oven to 375°F (190°C) and grease a 23 × 33 cm (9 × 13 in) dish. Cook the noodles in salted water 2 min less than the package says, then drain.",min:10},
   {name:"Cook the vegetables",desc:"Melt 3 tbsp butter in a large skillet over medium heat. Cook the onion and mushrooms until the mushrooms are browned and their liquid is gone.",min:8},
   {name:"Make the sauce",desc:"Sprinkle in the flour and stir 1 min. Slowly whisk in the milk and broth, then simmer, whisking, until thick enough to coat a spoon. Season with the salt and pepper.",min:5},
   {name:"Combine",desc:"Off the heat, stir in the noodles, tuna, peas, and half the cheese. Spread in the dish. Mix the panko with the melted butter and scatter it and the rest of the cheese on top.",min:4,timer:false},
   {name:"Bake",desc:"Bake until bubbling at the edges and golden on top.",min:22},
   {name:"Rest",desc:"Let it rest a few minutes so it holds together when served.",min:5}]},

 {id:"apple-crisp",title:"Apple Crisp",cuisine:"American",diet:["vegetarian","halal"],serves:8,cost:0.85,meal:["dessert"],tags:["sweets","oven"],
  desc:"Tender cinnamon apples baked under a crunchy, buttery oat and brown sugar topping. Easier than pie, perfect in the fall, and best warm with vanilla ice cream.",
  pantry:["apples","oats","flour","brown sugar","butter","cinnamon","lemon","vanilla"],
  ingredients:["6 apples (about 1.1 kg / 2½ lb), peeled and sliced; a tart-sweet kind like Granny Smith or Honeycrisp","2 tbsp white sugar","1 tbsp lemon juice","1½ tsp cinnamon, divided","1 tbsp all-purpose flour","Topping: ¾ cup (95 g) all-purpose flour, ¾ cup (70 g) rolled oats, ¾ cup (165 g) packed brown sugar, ¼ tsp salt, ½ cup (115 g) cold butter in cubes"],
  steps:[
   {name:"Heat the oven",desc:"Heat the oven to 350°F (175°C) and butter a 23 × 23 cm (9 × 9 in) or similar baking dish.",min:10},
   {name:"Toss the apples",desc:"Toss the apples with the white sugar, lemon juice, 1 tsp cinnamon, and 1 tbsp flour, and spread them in the dish.",min:3,timer:false},
   {name:"Make the topping",desc:"Mix the topping flour, oats, brown sugar, salt, and the rest of the cinnamon. Rub in the cold butter with your fingertips until it forms clumps. Scatter it over the apples.",min:5,timer:false},
   {name:"Bake",desc:"Bake until the topping is deep golden and the juices bubble thickly around the edges; a knife should slide easily into the apples.",min:45},
   {name:"Cool",desc:"Let it cool so the juices thicken before serving.",min:10}]},

 {id:"loco-moco",title:"Loco Moco",cuisine:"American",diet:["halal"],serves:4,cost:2.75,meal:["dinner","lunch"],tags:["rice","eggs"],
  desc:"Hawaii's favorite comfort plate: a mound of white rice topped with a juicy beef patty, a fried egg, and rich brown onion gravy. Born at a Hilo diner in the 1940s and found at every local plate-lunch spot.",
  pantry:["rice","ground beef","eggs","onion","beef broth","soy sauce","flour","butter","green onions"],
  ingredients:["1½ cups (280 g) short- or medium-grain rice, rinsed","2¼ cups (540 ml) water","680 g (1½ lb) ground beef (halal-certified to keep it halal)","1 tsp salt, divided","½ tsp pepper","½ tsp garlic powder","1 tbsp oil","1 onion, thinly sliced","2 tbsp butter","2 tbsp all-purpose flour","1½ cups (360 ml) beef broth","1 tbsp soy sauce","4 eggs","Sliced green onions, to serve"],
  steps:[
   {name:"Cook the rice",desc:"Bring the rice and water to a boil, then cover and cook on low without lifting the lid. Take it off the heat and leave it covered until serving.",min:18},
   {name:"Shape the patties",desc:"Gently mix the beef with ¾ tsp salt, the pepper, and garlic powder, and shape 4 patties about 2 cm (¾ in) thick, with a thumbprint in the middle so they stay flat.",min:4,timer:false},
   {name:"Cook the patties",desc:"Heat the oil in a large skillet over medium-high heat and cook the patties 4–5 min per side, until well browned with no pink in the middle (160°F / 71°C). Move them to a plate.",min:10},
   {name:"Make the gravy",desc:"Lower the heat to medium. In the same pan, cook the onion in the butter until soft. Stir in the flour for 1 min, then whisk in the broth and soy sauce and simmer until thick. Taste for salt.",min:7},
   {name:"Fry the eggs",desc:"In another pan, fry the eggs in a little oil until the whites are set, sunny side up or however you like them, about 3 min.",min:3,timer:false},
   {name:"Build the plates",desc:"Scoop rice onto each plate, top with a patty, a fried egg, and lots of gravy, and finish with green onions.",min:3,timer:false}]}
);

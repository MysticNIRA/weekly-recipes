/* One everyday dish each from fifteen more cuisines: Latin America and the Caribbean, Europe,
   Africa, and Asia. Like the other recipe files, meat dishes are halal-friendly (no pork or
   alcohol), and traditional pork or wine is swapped and mentioned in the description. */
RECIPES.push(
 {id:"ajiaco",title:"Ajiaco (Colombian Chicken and Potato Soup)",cuisine:"Colombian",diet:["halal","glutenfree"],serves:6,cost:2.00,meal:["dinner","lunch"],tags:["soup","onepot"],
  desc:"Bogotá's beloved soup: chicken simmered with three kinds of potato until the small yellow ones melt and thicken the broth, with corn on the cob and a dried herb called guascas. Served with cream, capers, and avocado on top.",
  pantry:["chicken","potatoes","corn","onion","garlic","cilantro","chicken broth","cream","capers","avocado"],
  ingredients:["900 g (2 lb) bone-in chicken breasts or thighs (halal-certified to keep it halal)","8 cups (2 L) chicken broth or water (check it's gluten-free)","1 onion, halved","3 garlic cloves, smashed","1 bunch cilantro, tied","450 g (1 lb) Yukon gold potatoes, thinly sliced (they fall apart and thicken the soup)","450 g (1 lb) red potatoes, in 2.5 cm (1 in) chunks","3 ears corn, each cut into 3 pieces","2 tbsp dried guascas (in Latin aisles or online; or 1 tsp dried oregano)","1½ tsp salt","To serve: heavy cream or sour cream, capers, sliced avocado"],
  steps:[
   {name:"Simmer the chicken",desc:"Put the chicken, broth, onion, garlic, and cilantro in a large pot. Bring to a boil, then simmer until the chicken is cooked through (165°F / 74°C).",min:25},
   {name:"Shred the chicken",desc:"Lift out the chicken and shred it, throwing away the skin and bones. Fish out and discard the onion, garlic, and cilantro.",min:5,timer:false},
   {name:"Cook the potatoes and corn",desc:"Add both kinds of potato, the corn, guascas, and salt. Simmer, stirring now and then, until the thin potatoes have broken down and thickened the soup and the chunks are tender.",min:30},
   {name:"Finish",desc:"Return the chicken and heat through. Taste for salt.",min:3},
   {name:"Serve",desc:"Ladle into bowls with a piece of corn each. Everyone adds a drizzle of cream, a few capers, and avocado.",min:2,timer:false}]},

 {id:"pupusas",title:"Pupusas with Curtido",cuisine:"Salvadoran",diet:["vegetarian","halal","glutenfree"],serves:4,cost:1.25,meal:["dinner","lunch"],tags:["bread"],
  desc:"El Salvador's national dish: thick corn masa cakes stuffed with cheese and refried beans and griddled until speckled and gooey. Served with curtido, a tangy pickled cabbage slaw, and a simple tomato sauce.",
  pantry:["masa harina","cheese","refried beans","cabbage","carrot","onion","vinegar","oregano","tomato sauce"],
  ingredients:["Curtido: ½ small cabbage shredded, 1 carrot grated, ½ onion thinly sliced, ½ cup (120 ml) white vinegar, ½ cup (120 ml) water, 1 tsp dried oregano, 1 tsp salt","2 cups (230 g) masa harina (the instant corn masa used for corn tortillas)","1½ cups (360 ml) warm water, plus more as needed","½ tsp salt","1 cup (100 g) shredded mozzarella or quesillo","¾ cup (180 g) refried beans","1 tbsp oil, for the griddle","1 cup (240 ml) tomato sauce, warmed with a pinch of salt, to serve"],
  steps:[
   {name:"Make the curtido",desc:"Toss the cabbage, carrot, and onion with the vinegar, water, oregano, and salt. Let it sit while you make the pupusas; it tastes better the longer it sits.",min:5,timer:false},
   {name:"Make the dough",desc:"Mix the masa harina, salt, and warm water and knead until it feels like soft play dough, smooth and not cracking. Add water a spoonful at a time if it cracks. Cover and rest 5 min.",min:10,timer:false},
   {name:"Fill",desc:"Mix the cheese and beans. With wet hands, roll a golf-ball-size piece of dough, press a deep cup into it, add a spoonful of filling, and pinch it closed. Gently pat it into a 1 cm (½ in) thick round. Make 8.",min:15,timer:false},
   {name:"Cook",desc:"Heat a lightly oiled skillet or griddle over medium heat. Cook the pupusas, in batches, 3–4 min per side, until golden spots appear and the cheese starts to bubble out.",min:16,timer:false},
   {name:"Serve",desc:"Serve hot with curtido and tomato sauce; pupusas are eaten with your hands.",min:1,timer:false}]},

 {id:"mangu",title:"Mangú with Pickled Onions and Eggs",cuisine:"Dominican",diet:["vegetarian","halal","glutenfree"],serves:4,cost:1.25,meal:["breakfast","dinner"],tags:["eggs"],
  desc:"The Dominican breakfast: green plantains boiled and mashed with butter until silky, topped with vinegary sautéed red onions. Served with fried eggs and fried cheese (\"los tres golpes\" also adds salami; this version leaves it out).",
  pantry:["green plantains","butter","red onion","vinegar","eggs","queso frito","salt"],
  ingredients:["4 green plantains","1½ tsp salt, divided","4 tbsp butter","1 cup (240 ml) cold water","2 red onions, sliced into rings","2 tbsp oil, divided","3 tbsp white or apple cider vinegar","4 eggs","225 g (8 oz) queso de freír (frying cheese) or halloumi, sliced 1 cm (½ in) thick (optional)"],
  steps:[
   {name:"Boil the plantains",desc:"Cut off the ends, slit the peels lengthwise, and peel the plantains. Cut each into 4 pieces and boil in salted water with 1 tsp salt until very soft when pierced.",min:20},
   {name:"Cook the onions",desc:"Meanwhile, cook the onions in 1 tbsp oil over medium heat until just soft, then add the vinegar and a pinch of salt and cook 1 min more.",min:6},
   {name:"Mash",desc:"Drain the plantains and mash them right away with the butter, the rest of the salt, and the cold water, a little at a time, until smooth and creamy. (The cold water is the secret to silky mangú.)",min:4,timer:false},
   {name:"Fry the cheese and eggs",desc:"In a skillet with the rest of the oil over medium heat, fry the cheese slices until golden, 2 min per side. Then fry the eggs until the whites are set, about 3 min.",min:8,timer:false},
   {name:"Serve",desc:"Top the mangú with the pickled onions, with the eggs and cheese on the side.",min:1,timer:false}]},

 {id:"poule-en-sauce",title:"Poule en Sauce (Haitian Chicken Stew)",cuisine:"Haitian",diet:["halal","glutenfree"],serves:4,cost:2.50,meal:["dinner"],tags:["stew","onepot"],
  desc:"Haitian Sunday chicken: marinated in epis, a bright green blend of peppers, garlic, and herbs that's the base of Haitian cooking, then browned and simmered in a tomato and pepper sauce. Served with rice and beans.",
  pantry:["chicken","lime","bell pepper","garlic","green onions","parsley","thyme","tomato paste","onion","chicken broth","scotch bonnet"],
  ingredients:["1.4 kg (3 lb) bone-in chicken pieces, skin removed (halal-certified to keep it halal)","2 limes, juiced","Epis: 1 green bell pepper, 1 bunch parsley, 4 green onions, 6 garlic cloves, 1 tsp dried thyme, ¼ cup (60 ml) oil, ½ tsp salt, blended smooth","1½ tsp salt","2 tbsp oil","1 onion, sliced","1 red bell pepper, sliced","2 tbsp tomato paste","1½ cups (360 ml) chicken broth (check it's gluten-free)","1 whole Scotch bonnet pepper (left whole for flavor without much heat)","Rice and beans, to serve"],
  steps:[
   {name:"Clean and marinate",desc:"Rinse the chicken with the lime juice (a Haitian habit for fresh flavor), then rub it with half the epis and the salt. Marinate 30 min, or overnight in the fridge. Keep the rest of the epis.",min:30,prep:true},
   {name:"Brown the chicken",desc:"Heat the oil in a large heavy pot over medium-high heat. Brown the chicken on all sides, in batches, about 4 min per side. Set aside.",min:12},
   {name:"Build the sauce",desc:"Cook the onion and red pepper in the same pot until soft. Stir in the rest of the epis and the tomato paste for 2 min.",min:7},
   {name:"Simmer",desc:"Add the broth, chicken, and the whole Scotch bonnet (don't let it burst). Cover and simmer, turning the chicken once, until tender and cooked through (175°F / 80°C near the bone) and the sauce is thick.",min:30},
   {name:"Serve",desc:"Take out the Scotch bonnet. Serve with rice and beans, spooning the sauce over.",min:2,timer:false}]},

 {id:"chicken-schnitzel",title:"Chicken Schnitzel with Cucumber Salad",cuisine:"German",diet:["halal"],serves:4,cost:2.50,meal:["dinner"],tags:["fried"],
  desc:"Thin chicken cutlets in a light, puffy breadcrumb crust, pan-fried until golden and served with lemon and a cool German cucumber and dill salad. (Schnitzel is traditionally pork or veal; chicken is a common German version.)",
  pantry:["chicken breasts","flour","eggs","breadcrumbs","lemon","cucumber","dill","onion","vinegar","sour cream"],
  ingredients:["2 large boneless chicken breasts (about 680 g / 1½ lb) (halal-certified to keep it halal)","1 tsp salt, divided","½ tsp pepper","½ cup (65 g) all-purpose flour","2 eggs","1½ cups (90 g) plain breadcrumbs","Oil, for frying","Cucumber salad: 2 cucumbers thinly sliced, ½ small onion very thinly sliced, ¼ cup (60 g) sour cream, 1 tbsp white vinegar, 1 tsp sugar, 2 tbsp chopped dill, ½ tsp salt","Lemon wedges, to serve"],
  steps:[
   {name:"Make the cucumber salad",desc:"Toss the cucumbers and onion with ½ tsp salt and let them sit 10 min, then squeeze out the water. Stir in the sour cream, vinegar, sugar, and dill. Chill while you cook.",min:12,timer:false},
   {name:"Pound the chicken",desc:"Slice each breast in half horizontally. Put the pieces between plastic wrap and pound with a heavy pan to an even 6 mm (¼ in) thick. Season with the rest of the salt and the pepper.",min:6,timer:false},
   {name:"Bread the chicken",desc:"Set up three shallow dishes: flour, beaten eggs, breadcrumbs. Coat each cutlet in flour, then egg, then press lightly into the crumbs. Don't press hard; a loose coating puffs up.",min:6,timer:false},
   {name:"Fry",desc:"Heat 1 cm (½ in) of oil in a large skillet to 350°F (175°C); a breadcrumb should sizzle right away. Fry 1–2 cutlets at a time, 2–3 min per side, swirling the pan so the oil washes over the top, until golden and cooked through (165°F / 74°C). Drain on paper towels.",min:12,timer:false},
   {name:"Serve",desc:"Serve right away with lemon wedges and the cucumber salad.",min:1,timer:false}]},

 {id:"irish-stew",title:"Irish Stew",cuisine:"Irish",diet:["halal","glutenfree"],serves:6,cost:3.00,meal:["dinner"],tags:["stew","onepot"],
  desc:"Ireland's simple, comforting one-pot stew of tender lamb, potatoes, carrots, and onions simmered in broth with thyme until the potatoes start to thicken it. Best with buttered bread.",
  pantry:["lamb","potatoes","carrots","onion","celery","thyme","chicken broth","parsley"],
  ingredients:["900 g (2 lb) lamb shoulder or stew meat, in 4 cm (1½ in) chunks (or beef chuck; halal-certified to keep it halal)","1½ tsp salt, divided","½ tsp pepper","2 tbsp oil","2 onions, in chunks","3 carrots, in thick slices","2 celery stalks, sliced","900 g (2 lb) potatoes, peeled and quartered","1 tsp dried thyme","2 bay leaves","5 cups (1.2 L) chicken or beef broth (check it's gluten-free)","Chopped parsley, to serve"],
  steps:[
   {name:"Brown the lamb",desc:"Season the lamb with 1 tsp salt and the pepper. Heat the oil in a large heavy pot over medium-high heat and brown the lamb well in batches, about 6 min per batch. Set aside.",min:12},
   {name:"Soften the vegetables",desc:"Cook the onions, carrots, and celery in the same pot for 5 min, scraping up the brown bits.",min:5},
   {name:"Simmer the lamb",desc:"Return the lamb, add the thyme, bay leaves, and broth, and bring to a boil. Cover and simmer gently.",min:60},
   {name:"Add the potatoes",desc:"Add the potatoes and the rest of the salt and simmer, partly covered, until the potatoes are soft and the lamb is tender. Mash a few potato pieces against the side of the pot to thicken the stew.",min:35},
   {name:"Serve",desc:"Take out the bay leaves, taste for salt, and top with parsley.",min:2,timer:false}]},

 {id:"chicken-paprikash",title:"Chicken Paprikash",cuisine:"Hungarian",diet:["halal"],serves:4,cost:2.25,meal:["dinner"],tags:["stew","onepot"],
  desc:"Hungary's famous comfort dish: chicken simmered in a sweet paprika and onion sauce, finished with sour cream until rosy and creamy. Served over egg noodles or dumplings (nokedli).",
  pantry:["chicken thighs","onion","paprika","bell pepper","tomato","chicken broth","sour cream","flour","egg noodles"],
  ingredients:["900 g (2 lb) bone-in chicken thighs, skin removed (halal-certified to keep it halal)","1 tsp salt","2 tbsp oil","2 onions, finely diced","2 tbsp sweet Hungarian paprika","1 green or yellow bell pepper, sliced","1 tomato, chopped","1 cup (240 ml) chicken broth","¾ cup (180 g) sour cream","1 tbsp all-purpose flour","340 g (12 oz) egg noodles, to serve"],
  steps:[
   {name:"Brown the chicken",desc:"Season the chicken with the salt. Heat the oil in a large heavy pot over medium-high heat and brown it, 3–4 min per side. Set aside.",min:8},
   {name:"Cook the onions",desc:"Lower the heat to medium and cook the onions until soft and golden.",min:8},
   {name:"Add the paprika",desc:"Take the pot off the heat and stir in the paprika (it burns and turns bitter on high heat). Return to the heat and add the pepper and tomato.",min:2,timer:false},
   {name:"Simmer",desc:"Add the broth and chicken, cover, and simmer until the chicken is very tender (175°F / 80°C near the bone). Meanwhile, cook the noodles as the package says.",min:30},
   {name:"Finish with sour cream",desc:"Whisk the flour into the sour cream, then whisk in a ladle of the hot sauce to warm it. Stir it into the pot and simmer gently 2 min, without boiling, until creamy. Taste for salt.",min:3,timer:false},
   {name:"Serve",desc:"Serve the chicken and sauce over the noodles.",min:1,timer:false}]},

 {id:"zupa-pomidorowa",title:"Zupa Pomidorowa (Polish Tomato Soup with Rice)",cuisine:"Polish",diet:["vegetarian","halal","glutenfree"],serves:6,cost:1.00,meal:["lunch","dinner"],tags:["soup","onepot","rice"],
  desc:"The soup every Polish grandmother makes: a light, creamy tomato soup with carrots and celery, finished with sour cream and dill and served over rice (or noodles). Often made the day after Sunday broth.",
  pantry:["tomato paste","crushed tomatoes","carrots","celery","onion","vegetable broth","sour cream","dill","rice"],
  ingredients:["1 tbsp butter","1 onion, diced","2 carrots, grated","1 celery stalk, diced","3 tbsp tomato paste","1 can (400 g / 14 oz) crushed tomatoes","8 cups (2 L) vegetable broth (check it's gluten-free)","1 bay leaf","1 tsp sugar","1 tsp salt, then more to taste","½ cup (120 g) sour cream","2 tbsp chopped dill","1 cup (185 g) long-grain rice, cooked, to serve"],
  steps:[
   {name:"Soften the vegetables",desc:"Melt the butter in a large pot over medium heat and cook the onion, carrots, and celery until soft.",min:8},
   {name:"Simmer",desc:"Stir in the tomato paste for 1 min, then add the crushed tomatoes, broth, bay leaf, sugar, and salt. Simmer until the vegetables are very tender. Cook the rice meanwhile if it isn't already.",min:20},
   {name:"Add the sour cream",desc:"Take out the bay leaf. Whisk a ladle of hot soup into the sour cream, then stir it back into the pot (so it doesn't curdle). Heat gently without boiling and stir in the dill.",min:3,timer:false},
   {name:"Serve",desc:"Put a scoop of rice in each bowl and ladle the soup over.",min:1,timer:false}]},

 {id:"koshari",title:"Koshari",cuisine:"Egyptian",diet:["vegan","vegetarian","halal"],serves:6,cost:1.00,meal:["dinner","lunch"],tags:["beans","rice","pasta"],
  desc:"Egypt's beloved street food: rice, lentils, and small pasta layered with chickpeas, topped with a tangy garlic-vinegar tomato sauce and a crown of crispy fried onions. Cheap, filling, and vegan.",
  pantry:["rice","brown lentils","macaroni","chickpeas","onion","garlic","tomato sauce","vinegar","cumin","oil"],
  ingredients:["Crispy onions: 2 onions thinly sliced, ½ cup (120 ml) oil, pinch of salt","1 cup (190 g) brown lentils, rinsed","1 cup (185 g) short-grain rice, rinsed","1 cup (100 g) small elbow macaroni","1 can (400 g / 15 oz) chickpeas, drained and warmed","1¾ tsp salt, divided","1 tsp ground cumin, divided","Sauce: 4 garlic cloves minced, 1 can (425 g / 15 oz) tomato sauce, 3 tbsp white vinegar, ½ tsp chili flakes, ½ tsp salt"],
  steps:[
   {name:"Fry the onions",desc:"Heat the oil in a skillet over medium heat and fry the onions, stirring often, until deep golden and crisp. Lift them onto paper towels and sprinkle with salt. Keep the onion oil.",min:15},
   {name:"Cook the lentils",desc:"Cover the lentils with plenty of water and simmer until tender but not mushy. Drain.",min:20},
   {name:"Cook the rice",desc:"Heat 2 tbsp of the onion oil in a pot, stir in the rice and cooked lentils, ½ tsp cumin, and 1 tsp salt, and add 2 cups water. Bring to a boil, cover, and cook on low.",min:18},
   {name:"Cook the pasta",desc:"Meanwhile, boil the macaroni in salted water until tender, about 7 min, and drain. Toss with 1 tsp onion oil.",min:8},
   {name:"Make the sauce",desc:"In a small pot, cook the garlic in 1 tbsp onion oil 30 seconds, then add the tomato sauce, vinegar, chili flakes, and salt, and simmer until slightly thick.",min:6},
   {name:"Serve",desc:"Layer rice and lentils, then pasta and chickpeas, in each bowl. Spoon over the sauce and pile on the crispy onions.",min:3,timer:false}]},

 {id:"red-red",title:"Red Red with Fried Plantains",cuisine:"Ghanaian",diet:["vegan","vegetarian","halal","glutenfree"],serves:4,cost:1.25,meal:["dinner","lunch"],tags:["beans","stew"],
  desc:"A Ghanaian favorite named for its color: black-eyed peas simmered in a red palm oil and tomato stew with onion, ginger, and chile, served with sweet fried plantains. Hearty, cheap, and vegan.",
  pantry:["black-eyed peas","palm oil","onion","tomatoes","ginger","garlic","chile","tomato paste","ripe plantains"],
  ingredients:["2 cans (425 g / 15 oz each) black-eyed peas, drained and rinsed","¼ cup (60 ml) red palm oil (or vegetable oil plus 1 tsp paprika)","1 onion, diced","3 garlic cloves, minced","1 tbsp grated ginger","1 Scotch bonnet or jalapeño, minced (seeded for less heat)","2 tbsp tomato paste","1 can (400 g / 14 oz) diced tomatoes","½ cup (120 ml) water","1 tsp salt","3 ripe plantains (mostly black skins)","Oil, for frying the plantains"],
  steps:[
   {name:"Cook the base",desc:"Heat the palm oil in a pot over medium heat. Cook the onion until soft, then the garlic, ginger, and chile for 1 min. Stir in the tomato paste for 1 min.",min:8},
   {name:"Simmer the stew",desc:"Add the tomatoes, water, and salt and simmer until thick and the oil rises to the top. Stir in the black-eyed peas and simmer until hot, mashing a few to thicken.",min:15},
   {name:"Fry the plantains",desc:"Meanwhile, peel the plantains and slice them diagonally 1 cm (½ in) thick. Fry in 1 cm (½ in) of hot oil until caramelized, 2–3 min per side. Drain on paper towels.",min:10,timer:false},
   {name:"Serve",desc:"Serve the beans with the plantains on the side.",min:1,timer:false}]},

 {id:"sukuma-wiki-ugali",title:"Sukuma Wiki with Ugali",cuisine:"Kenyan",diet:["vegan","vegetarian","halal","glutenfree"],serves:4,cost:0.75,meal:["dinner","lunch"],tags:["onepot"],
  desc:"Everyday Kenyan food: sukuma wiki (\"stretch the week\") is collard greens sautéed with onion and tomato; ugali is a firm cornmeal porridge you pinch off and use to scoop the greens. One of the cheapest, most filling meals in the app.",
  pantry:["collard greens","onion","tomatoes","garlic","white cornmeal","oil","salt"],
  ingredients:["Ugali: 4 cups (960 ml) water, 2 cups (300 g) fine white cornmeal (sold as maize meal), ½ tsp salt","1 large bunch collard greens or kale (about 450 g / 1 lb), stems removed, thinly sliced","2 tbsp oil","1 onion, diced","2 garlic cloves, minced","2 tomatoes, chopped","¾ tsp salt","¼ tsp pepper"],
  steps:[
   {name:"Start the ugali",desc:"Bring the water and salt to a boil in a heavy pot. Sprinkle in about a third of the cornmeal while stirring, until it looks like thin porridge, and cook 2 min.",min:8},
   {name:"Thicken the ugali",desc:"Add the rest of the cornmeal a little at a time, stirring and pressing hard with a sturdy wooden spoon, until very thick and pulling away from the sides. Lower the heat, cover, and let it steam, then turn it out onto a plate and shape into a mound.",min:10},
   {name:"Cook the sukuma wiki",desc:"Heat the oil in a large pan over medium heat. Cook the onion until soft, then the garlic for 1 min and the tomatoes until they break down.",min:7},
   {name:"Add the greens",desc:"Add the greens, salt, and pepper and stir-fry until just tender and still bright green.",min:5},
   {name:"Serve",desc:"Serve the greens with the ugali. Pinch off a piece of ugali, roll it into a ball, press a dent in it with your thumb, and use it to scoop the greens.",min:1,timer:false}]},

 {id:"kabuli-pulao",title:"Kabuli Pulao",cuisine:"Afghan",diet:["halal","glutenfree"],serves:6,cost:3.25,meal:["dinner"],tags:["rice","onepot"],
  desc:"Afghanistan's national dish: tender lamb buried in fragrant, spiced rice cooked in the lamb broth, topped with sweet caramelized carrots and raisins and toasted almonds. Made for guests and celebrations.",
  pantry:["lamb","basmati rice","onion","carrots","raisins","almonds","cumin","cardamom","cinnamon","sugar"],
  ingredients:["2 cups (400 g) basmati rice","900 g (2 lb) bone-in lamb shoulder or shanks, in large pieces (halal-certified to keep it halal)","¼ cup (60 ml) oil, divided","1 onion, finely diced","2 tsp salt, divided","1 tsp ground cumin","½ tsp ground cardamom","½ tsp cinnamon","½ tsp black pepper","4 cups (960 ml) water","2 carrots, cut into thin matchsticks","½ cup (75 g) raisins","1 tbsp sugar","¼ cup (30 g) slivered almonds"],
  steps:[
   {name:"Soak the rice",desc:"Rinse the rice until the water runs clear, then cover with water and soak. It cooks into long, separate grains.",min:30,prep:true},
   {name:"Brown the lamb",desc:"Heat 3 tbsp oil in a large heavy pot over medium-high heat. Cook the onion until deep golden, then add the lamb and brown on all sides.",min:12},
   {name:"Simmer the lamb",desc:"Add 1 tsp salt, the cumin, cardamom, cinnamon, pepper, and water. Cover and simmer until the lamb is very tender.",min:75},
   {name:"Caramelize the carrots",desc:"Meanwhile, cook the carrots in the last 1 tbsp oil in a skillet over medium heat until soft, then add the raisins and sugar for 2 min until glossy. Toast the almonds in a dry pan until golden. Set aside.",min:10,timer:false},
   {name:"Cook the rice",desc:"Lift out the lamb. Measure the broth and add water to make 3 cups. Return it to the pot with the drained rice and the rest of the salt and boil until the liquid sinks below the rice, about 5 min. Nestle the lamb into the rice, cover tightly (wrap the lid in a towel), and cook on very low heat.",min:25},
   {name:"Serve",desc:"Mound the rice on a platter with the lamb, and top with the carrots, raisins, and almonds.",min:3,timer:false}]},

 {id:"mee-goreng",title:"Mee Goreng Mamak",cuisine:"Malaysian",diet:["halal"],serves:3,cost:2.25,meal:["dinner","lunch"],tags:["noodles","stirfry"],
  desc:"Spicy, sweet, and smoky fried yellow noodles from Malaysia's halal mamak (Indian-Muslim) street stalls, tossed with chicken, tofu, egg, cabbage, and bean sprouts in a chile, ketchup, and sweet soy sauce, with lime to squeeze.",
  pantry:["yellow noodles","chicken","tofu","eggs","cabbage","bean sprouts","garlic","shallots","kecap manis","soy sauce","ketchup","chili paste","lime"],
  ingredients:["450 g (1 lb) fresh yellow noodles (or 225 g / 8 oz dried, cooked)","225 g (8 oz) boneless chicken, thinly sliced (halal-certified to keep it halal)","200 g (7 oz) firm tofu, cubed and patted dry","3 tbsp oil, divided","4 garlic cloves, minced","3 shallots, sliced","2 eggs","2 cups shredded cabbage","2 cups (200 g) bean sprouts","Sauce: 2 tbsp kecap manis (sweet soy sauce), 1 tbsp soy sauce, 2 tbsp ketchup, 1–2 tbsp chili paste or sambal, 2 tbsp water","Lime wedges, to serve"],
  steps:[
   {name:"Prep",desc:"Loosen the noodles (rinse fresh ones under hot water). Mix the sauce. Have everything ready by the stove; it cooks fast.",min:5,timer:false},
   {name:"Fry the tofu",desc:"Heat 1 tbsp oil in a wok over medium-high heat and fry the tofu until golden on several sides. Set aside.",min:6},
   {name:"Cook the chicken",desc:"Add 1 tbsp oil, the garlic, and shallots for 30 seconds, then the chicken, and stir-fry until no pink remains.",min:4,timer:false},
   {name:"Scramble the eggs",desc:"Push everything to the side, add the last oil, crack in the eggs, and scramble until just set.",min:2,timer:false},
   {name:"Toss the noodles",desc:"Add the cabbage, noodles, tofu, and sauce and toss over high heat until the noodles are coated and slightly charred. Add the bean sprouts for the last 30 seconds.",min:4,timer:false},
   {name:"Serve",desc:"Serve with lime wedges to squeeze over.",min:1,timer:false}]},

 {id:"sri-lankan-chicken-curry",title:"Sri Lankan Chicken Curry",cuisine:"Sri Lankan",diet:["halal","glutenfree"],serves:4,cost:2.25,meal:["dinner"],tags:["curry","onepot"],
  desc:"A deeply spiced Sri Lankan curry made with roasted curry powder, cinnamon, cardamom, and curry leaves, simmered in coconut milk until rich and red-gold. Served with rice.",
  pantry:["chicken thighs","coconut milk","onion","garlic","ginger","curry powder","cinnamon","cardamom","curry leaves","tomato","lime","rice"],
  ingredients:["900 g (2 lb) boneless chicken thighs, in large pieces (halal-certified to keep it halal)","2 tbsp Sri Lankan roasted curry powder (or regular curry powder, toasted in a dry pan 1 min)","1 tsp chili powder (less for mild)","1¼ tsp salt","3 tbsp oil","1 cinnamon stick","4 cardamom pods, cracked","1 sprig curry leaves (about 12; optional)","1 onion, finely diced","4 garlic cloves, minced","1 tbsp grated ginger","1 tomato, chopped","1 can (400 ml / 14 oz) coconut milk","Juice of ½ lime","Cooked rice, to serve"],
  steps:[
   {name:"Season the chicken",desc:"Toss the chicken with the curry powder, chili powder, and salt. Let it sit while you start the base.",min:3,timer:false},
   {name:"Toast the spices",desc:"Heat the oil in a heavy pot over medium heat. Add the cinnamon stick, cardamom, and curry leaves and stir until they sizzle and smell fragrant, 1 min. Add the onion and cook until golden.",min:9},
   {name:"Add the aromatics",desc:"Stir in the garlic, ginger, and tomato and cook until the tomato breaks down.",min:4,timer:false},
   {name:"Brown the chicken",desc:"Add the chicken and stir to coat in the spices, cooking until it's no longer pink on the outside.",min:5},
   {name:"Simmer",desc:"Pour in the coconut milk, bring to a gentle simmer, and cook uncovered, stirring now and then, until the chicken is tender and the sauce is thick.",min:25},
   {name:"Finish",desc:"Take out the cinnamon stick, stir in the lime juice, and taste for salt. Serve with rice.",min:2,timer:false}]},

 {id:"three-cup-chicken",title:"Three-Cup Chicken (San Bei Ji)",cuisine:"Taiwanese",diet:["halal"],serves:4,cost:2.50,meal:["dinner"],tags:["stirfry","rice"],
  desc:"Taiwan's sticky, savory-sweet chicken, named for its three sauce parts: sesame oil, soy sauce, and rice wine, cooked down with whole garlic, ginger, and a big handful of Thai basil. This version replaces the rice wine with broth and a splash of rice vinegar. Served with rice.",
  pantry:["chicken thighs","sesame oil","soy sauce","garlic","ginger","thai basil","brown sugar","chicken broth","rice vinegar","rice"],
  ingredients:["900 g (2 lb) boneless chicken thighs, in 4 cm (1½ in) pieces (halal-certified to keep it halal)","3 tbsp toasted sesame oil","12 garlic cloves, peeled and left whole","5 cm (2 in) ginger, thinly sliced","2 green onions, cut into 5 cm (2 in) pieces","1–2 dried red chiles (optional)","3 tbsp soy sauce","1 tbsp dark soy sauce or extra soy sauce","⅓ cup (80 ml) chicken broth","1 tsp rice vinegar","1½ tbsp brown sugar","1 large handful Thai basil (or regular basil)","Cooked rice, to serve"],
  steps:[
   {name:"Fry the aromatics",desc:"Heat the sesame oil in a large skillet or clay pot over medium heat. Fry the garlic and ginger, stirring, until golden at the edges.",min:4,timer:false},
   {name:"Brown the chicken",desc:"Turn the heat to medium-high, add the chicken, and cook until browned on most sides.",min:7},
   {name:"Braise in the sauce",desc:"Add the green onions, chiles, both soy sauces, broth, vinegar, and sugar. Bring to a boil, then simmer, stirring often, until the sauce cooks down to a sticky glaze and the chicken is cooked through (175°F / 80°C).",min:12},
   {name:"Add the basil",desc:"Turn off the heat and stir in the basil until just wilted.",min:1,timer:false},
   {name:"Serve",desc:"Serve right away over rice.",min:1,timer:false}]}
);

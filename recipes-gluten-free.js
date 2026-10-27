/* Everyday American dishes that are gluten-free as written. Gluten-free pasta and flour blends are
   called for by name, and anything that sometimes hides wheat (broth, salsa, baking powder) says to
   check its label. Corn tortilla chips coat the chicken tenders because most cornflakes contain malt. */
RECIPES.push(
 {id:"gf-pancakes",title:"Gluten-Free Fluffy Pancakes",cuisine:"American",diet:["vegetarian","halal","glutenfree"],serves:3,cost:0.90,meal:["breakfast"],tags:["pancakes"],
  desc:"Tall, tender diner-style pancakes made with a gluten-free flour blend. A short rest lets the flour soak up the milk, so they turn out fluffy instead of gritty.",
  pantry:["gluten-free flour","sugar","baking powder","baking soda","milk","lemon juice","egg","butter","vanilla"],
  ingredients:["1½ cups (210 g) 1:1 gluten-free flour blend (one with xanthan gum)","2 tbsp sugar","2 tsp baking powder (check it's gluten-free)","½ tsp baking soda","¼ tsp salt","1¼ cups (300 ml) milk","1 tbsp lemon juice or white vinegar","1 egg","3 tbsp butter, melted, plus more for the pan","1 tsp vanilla extract","Maple syrup and fruit, to serve"],
  steps:[
   {name:"Sour the milk",desc:"Stir the lemon juice into the milk and let it sit until slightly thickened. This makes homemade buttermilk.",min:5},
   {name:"Mix the batter",desc:"In a large bowl, whisk the flour blend, sugar, baking powder, baking soda, and salt. Whisk the egg, melted butter, and vanilla into the soured milk, then pour it into the dry mix and stir just until no dry flour is left.",min:4,timer:false},
   {name:"Rest the batter",desc:"Let the batter sit. Gluten-free flour needs this time to soak up the liquid; the batter will thicken and turn bubbly. Heat a large skillet over medium-low heat near the end.",min:10},
   {name:"Cook the pancakes",desc:"Butter the pan lightly. Pour ¼ cup of batter per pancake and cook until bubbles cover the top and the edges look set, 2–3 min per side. Gluten-free pancakes brown fast, so keep the heat at medium-low. Keep cooked ones warm on a plate under a towel.",min:12,timer:false}]},

 {id:"gf-spaghetti-meat-sauce",title:"Spaghetti with Meat Sauce (Gluten-Free)",cuisine:"American",diet:["halal","glutenfree"],serves:4,cost:2.50,meal:["dinner"],tags:["pasta"],
  desc:"The weeknight American classic: gluten-free spaghetti under a thick, garlicky tomato and ground beef sauce, finished with parmesan. The sauce simmers while the pasta water heats.",
  pantry:["gluten-free spaghetti","ground beef","onion","garlic","crushed tomatoes","tomato paste","oregano","basil","parmesan"],
  ingredients:["340 g (12 oz) gluten-free spaghetti","1 tbsp olive oil","450 g (1 lb) ground beef (halal-certified to keep it halal)","1 onion, diced","3 garlic cloves, minced","2 tbsp tomato paste","1 can (800 g / 28 oz) crushed tomatoes","1 tsp dried oregano","1 tsp dried basil","1 tsp salt, plus more for the pasta water","½ tsp sugar","¼ tsp chili flakes (optional)","Grated parmesan, to serve"],
  steps:[
   {name:"Brown the beef",desc:"Heat the oil in a large pot over medium-high heat. Add the beef and onion and cook, breaking up the meat, until no pink is left and the onion is soft, 7–8 min.",min:8},
   {name:"Build the sauce",desc:"Stir in the garlic and tomato paste for 1 min, then the crushed tomatoes, oregano, basil, salt, sugar, and chili flakes.",min:2,timer:false},
   {name:"Simmer the sauce",desc:"Bring to a bubble, then lower the heat and simmer, partly covered, stirring now and then, until thick. Meanwhile, bring a large pot of well-salted water to a boil.",min:20},
   {name:"Cook the pasta",desc:"Cook the spaghetti as the package says, usually 9–11 min, stirring often in the first 2 min so it doesn't stick. Taste it a minute early, since gluten-free pasta turns soft quickly. Save ½ cup of the water, then drain. Don't rinse.",min:10},
   {name:"Toss and serve",desc:"Toss the pasta with half the sauce, adding a splash of pasta water if it's dry. Top with the rest of the sauce and parmesan.",min:2,timer:false}]},

 {id:"chicken-broccoli-rice",title:"Cheesy Chicken, Broccoli, and Rice Skillet",cuisine:"American",diet:["halal","glutenfree"],serves:4,cost:2.25,meal:["dinner"],tags:["rice","onepot"],
  desc:"A one-pan casserole-style dinner: seasoned chicken and rice simmered in broth, with broccoli steamed right on top and cheddar melted through at the end. Creamy, cozy, and kid-friendly.",
  pantry:["chicken","rice","broccoli","cheddar","onion","chicken broth","milk","garlic powder","paprika"],
  ingredients:["450 g (1 lb) boneless chicken breasts or thighs, in 2 cm (¾ in) pieces (halal-certified to keep it halal)","1 tbsp oil","1 tsp salt, divided","½ tsp garlic powder","½ tsp paprika","1 onion, diced","1 cup (185 g) long-grain white rice, rinsed","2½ cups (600 ml) chicken broth (check it's gluten-free)","3 cups (about 250 g) small broccoli florets","1½ cups (150 g) shredded cheddar","¼ cup (60 ml) milk"],
  steps:[
   {name:"Brown the chicken",desc:"Toss the chicken with ½ tsp salt, the garlic powder, and paprika. Heat the oil in a large deep skillet with a lid over medium-high heat and cook the chicken, stirring once or twice, until browned, 5–6 min. It finishes cooking with the rice.",min:6},
   {name:"Soften the onion and toast the rice",desc:"Add the onion and cook 3 min, then stir in the rice for 1 min so it's coated in oil.",min:4,timer:false},
   {name:"Simmer the rice",desc:"Pour in the broth and the rest of the salt and bring to a boil. Cover, turn the heat to low, and cook without lifting the lid.",min:15},
   {name:"Steam the broccoli",desc:"Scatter the broccoli over the rice, cover again, and cook until the rice is tender and the broccoli is bright green.",min:5},
   {name:"Melt in the cheese",desc:"Turn off the heat. Stir in the milk and cheddar until creamy. Taste for salt.",min:2,timer:false}]},

 {id:"stuffed-peppers",title:"Stuffed Bell Peppers",cuisine:"American",diet:["halal","glutenfree"],serves:4,cost:2.50,meal:["dinner"],tags:["oven","rice"],
  desc:"Bell peppers filled with seasoned ground beef, rice, and tomato sauce, baked until tender and topped with melted cheese. A complete dinner in each pepper, and a good use for leftover rice.",
  pantry:["bell peppers","ground beef","onion","garlic","rice","tomato sauce","oregano","paprika","mozzarella"],
  ingredients:["4 large bell peppers","1 tbsp oil","450 g (1 lb) ground beef or turkey (halal-certified to keep it halal)","1 onion, diced","2 garlic cloves, minced","1½ cups cooked rice","1 can (425 g / 15 oz) tomato sauce, divided","1 tsp dried oregano","1 tsp paprika","1 tsp salt","½ tsp pepper","1 cup (100 g) shredded mozzarella or cheddar"],
  steps:[
   {name:"Heat the oven and prep the peppers",desc:"Heat the oven to 375°F (190°C). Cut the tops off the peppers and pull out the seeds. Trim a thin slice off any bottom that won't stand up, without making a hole. Stand them in a baking dish.",min:6,timer:false},
   {name:"Cook the filling",desc:"Heat the oil in a skillet over medium-high heat. Cook the meat and onion, breaking up the meat, until no pink is left, 7–8 min. Add the garlic for 1 min.",min:9},
   {name:"Mix and stuff",desc:"Off the heat, stir in the rice, half the tomato sauce, the oregano, paprika, salt, and pepper. Pack the filling into the peppers and spoon the rest of the sauce over the tops. Pour ¼ cup water into the dish.",min:4,timer:false},
   {name:"Bake covered",desc:"Cover the dish with foil and bake until the peppers are tender when poked with a knife.",min:35},
   {name:"Add the cheese",desc:"Uncover, top with the cheese, and bake until melted and bubbly.",min:10},
   {name:"Rest",desc:"Let the peppers cool a few minutes before serving; the filling is very hot.",min:5}]},

 {id:"chicken-tortilla-soup",title:"Chicken Tortilla Soup",cuisine:"American",diet:["halal","glutenfree"],serves:5,cost:2.00,meal:["lunch","dinner"],tags:["soup","onepot"],
  desc:"A Tex-Mex favorite: a smoky, cumin-spiced tomato and chicken soup with black beans and corn, topped with crisp baked corn tortilla strips, avocado, and lime.",
  pantry:["chicken breasts","onion","jalapeño","garlic","cumin","chili powder","diced tomatoes","chicken broth","black beans","corn","lime","corn tortillas","avocado","cilantro"],
  ingredients:["8 corn tortillas, cut into thin strips","2 tbsp oil, divided","1¼ tsp salt, divided","1 onion, diced","1 jalapeño, seeded and minced","3 garlic cloves, minced","2 tsp ground cumin","1 tsp chili powder","1 tsp dried oregano","1 can (400 g / 14.5 oz) diced tomatoes","6 cups (1.4 L) chicken broth (check it's gluten-free)","2 boneless chicken breasts, about 450 g (1 lb) (halal-certified to keep it halal)","1 can (400 g / 15 oz) black beans, drained","1 cup (150 g) corn, frozen or canned","Juice of 1 lime","Avocado, cilantro, and shredded cheese, to serve"],
  steps:[
   {name:"Bake the tortilla strips",desc:"Heat the oven to 425°F (220°C). Toss the tortilla strips with 1 tbsp oil and ¼ tsp salt, spread them on a sheet pan, and bake, stirring once, until crisp and golden. Watch the last few minutes; they burn fast.",min:10},
   {name:"Soften the vegetables",desc:"Heat the rest of the oil in a large pot over medium heat. Cook the onion and jalapeño until soft.",min:5},
   {name:"Add the garlic and spices",desc:"Stir in the garlic, cumin, chili powder, and oregano for 1 min, until fragrant.",min:1,timer:false},
   {name:"Simmer the chicken",desc:"Add the tomatoes, broth, the rest of the salt, and the whole chicken breasts. Bring to a boil, then simmer gently until the chicken is cooked through (165°F / 74°C, or no pink in the thickest part).",min:18},
   {name:"Shred the chicken",desc:"Lift the chicken onto a plate and shred it with two forks.",min:4,timer:false},
   {name:"Finish the soup",desc:"Return the chicken to the pot with the beans and corn and simmer until hot. Stir in the lime juice and taste for salt.",min:5},
   {name:"Serve",desc:"Ladle into bowls and top with the tortilla strips, avocado, cilantro, and cheese.",min:2,timer:false}]},

 {id:"loaded-potato-soup",title:"Loaded Potato Soup",cuisine:"American",diet:["vegetarian","halal","glutenfree"],serves:4,cost:1.50,meal:["lunch","dinner"],tags:["soup","onepot"],
  desc:"Thick, creamy potato soup like a loaded baked potato in a bowl, with cheddar, sour cream, and green onions on top. It's thickened by mashing some of the potatoes instead of with flour.",
  pantry:["potatoes","onion","garlic","butter","vegetable broth","milk","cheddar","sour cream","green onions"],
  ingredients:["3 tbsp butter","1 onion, diced","2 garlic cloves, minced","1.2 kg (2½ lb) russet potatoes, peeled and cut into 2 cm (¾ in) cubes","4 cups (960 ml) vegetable broth (check it's gluten-free)","1 tsp salt","½ tsp pepper","1 cup (240 ml) milk","1 cup (100 g) shredded cheddar, plus more to serve","Sour cream and sliced green onions, to serve"],
  steps:[
   {name:"Soften the onion",desc:"Melt the butter in a large pot over medium heat. Cook the onion until soft and see-through, then add the garlic for 1 min.",min:6},
   {name:"Simmer the potatoes",desc:"Add the potatoes, broth, salt, and pepper. Bring to a boil, then simmer, partly covered, until the potatoes fall apart when poked.",min:15},
   {name:"Mash to thicken",desc:"Mash about half the potatoes right in the pot with a potato masher, leaving the rest in chunks. This makes the soup thick without flour.",min:3,timer:false},
   {name:"Add the milk and cheese",desc:"Lower the heat. Stir in the milk and heat through without boiling, then stir in the cheddar until melted. Taste for salt.",min:4,timer:false},
   {name:"Serve",desc:"Top each bowl with more cheddar, a spoon of sour cream, and green onions.",min:2,timer:false}]},

 {id:"chicken-burrito-bowls",title:"Chicken Burrito Bowls",cuisine:"American",diet:["halal","glutenfree"],serves:4,cost:2.75,meal:["lunch","dinner"],tags:["bowl","rice"],
  desc:"Everything you'd want in a burrito, in a bowl: cilantro-lime rice topped with spice-rubbed chicken, black beans, corn, salsa, and avocado. Easy to set out and let everyone build their own.",
  pantry:["rice","lime","cilantro","chicken thighs","chili powder","cumin","paprika","black beans","corn","salsa","avocado","lettuce","cheese","sour cream"],
  ingredients:["1 cup (185 g) long-grain white rice, rinsed","1½ cups (360 ml) water","1¼ tsp salt, divided","Juice of 1 lime","2 tbsp chopped cilantro","680 g (1½ lb) boneless chicken thighs (halal-certified to keep it halal)","Spice rub: 1 tsp chili powder, 1 tsp ground cumin, 1 tsp paprika, ½ tsp garlic powder","1 tbsp oil","1 can (400 g / 15 oz) black beans, drained","1 cup (150 g) corn, frozen or canned","1 cup salsa (check it's gluten-free)","1 avocado, sliced","Shredded lettuce, cheese, and sour cream, to serve"],
  steps:[
   {name:"Cook the rice",desc:"Bring the water and ¼ tsp salt to a boil, stir in the rice, cover, and cook on low without lifting the lid. Then take it off the heat and leave it covered.",min:15},
   {name:"Season the chicken",desc:"Pat the chicken dry and rub it all over with the spice rub and the rest of the salt.",min:3,timer:false},
   {name:"Cook the chicken",desc:"Heat the oil in a large skillet over medium-high heat. Cook the chicken until browned and cooked through (175°F / 80°C, or the juices run clear), 5–6 min per side.",min:12},
   {name:"Rest and slice",desc:"Rest the chicken on a board, then slice it. Meanwhile, warm the beans and corn together in the same skillet.",min:5},
   {name:"Finish the rice",desc:"Fluff the rice with a fork and stir in the lime juice and cilantro.",min:1,timer:false},
   {name:"Build the bowls",desc:"Divide the rice into bowls and top with chicken, beans and corn, salsa, avocado, lettuce, cheese, and sour cream.",min:4,timer:false}]},

 {id:"gf-mac-cheese",title:"Stovetop Mac and Cheese (Gluten-Free)",cuisine:"American",diet:["vegetarian","halal","glutenfree"],serves:4,cost:1.75,meal:["dinner","side"],tags:["pasta","onepot"],
  desc:"Creamy, cheesy, and ready in under 30 minutes. Gluten-free elbows in a smooth cheddar sauce thickened with cornstarch instead of flour, so there's no roux to worry about.",
  pantry:["gluten-free pasta","cornstarch","milk","butter","cheddar","garlic powder","mustard"],
  ingredients:["340 g (12 oz) gluten-free elbow pasta","Salt, for the pasta water","1½ cups (360 ml) cold milk","1 tbsp cornstarch","2 tbsp butter","2 cups (200 g) shredded sharp cheddar","½ tsp salt","¼ tsp garlic powder","1 tsp mustard (optional)"],
  steps:[
   {name:"Boil the water",desc:"Bring a large pot of well-salted water to a boil.",min:10},
   {name:"Cook the pasta",desc:"Cook the elbows as the package says, stirring often in the first 2 min. Taste a minute early, since gluten-free pasta turns soft quickly. Drain and set aside; don't rinse.",min:9},
   {name:"Make the sauce",desc:"In the same pot, whisk the cornstarch into the cold milk until smooth, then add the butter. Cook over medium heat, whisking, until it bubbles and thickens.",min:5},
   {name:"Melt in the cheese",desc:"Take the pot off the heat and stir in the cheddar a handful at a time until smooth. Stir in the salt, garlic powder, and mustard.",min:2,timer:false},
   {name:"Combine",desc:"Stir the pasta into the sauce. If it's thick, loosen with a splash of milk. Serve right away.",min:1,timer:false}]},

 {id:"sweet-potato-hash",title:"Sweet Potato Breakfast Hash",cuisine:"American",diet:["vegetarian","halal","glutenfree"],serves:3,cost:1.75,meal:["breakfast","lunch"],tags:["eggs","onepot"],
  desc:"Crispy-edged sweet potatoes, onion, and bell pepper with smoked paprika, with eggs cooked right in the pan. A filling one-skillet breakfast.",
  pantry:["sweet potatoes","onion","bell pepper","eggs","smoked paprika","garlic powder"],
  ingredients:["2 medium sweet potatoes (about 600 g / 1⅓ lb), in 1.5 cm (½ in) cubes","2 tbsp oil","1 onion, diced","1 bell pepper, diced","1 tsp smoked paprika","½ tsp garlic powder","¾ tsp salt","¼ tsp pepper","6 eggs","Hot sauce and sliced green onions, to serve"],
  steps:[
   {name:"Steam the sweet potatoes",desc:"Heat the oil in a large skillet with a lid over medium heat. Add the sweet potatoes and 2 tbsp water, cover, and cook, stirring twice, until just tender.",min:8},
   {name:"Brown the vegetables",desc:"Uncover, add the onion and pepper, and turn the heat to medium-high. Cook, stirring only now and then, until the sweet potatoes are browned at the edges.",min:8},
   {name:"Season",desc:"Stir in the paprika, garlic powder, salt, and pepper.",min:1,timer:false},
   {name:"Cook the eggs",desc:"Make 6 wells in the hash and crack an egg into each. Turn the heat to medium-low, cover, and cook until the whites are set and the yolks are as done as you like.",min:6},
   {name:"Serve",desc:"Top with hot sauce and green onions and serve from the pan.",min:1,timer:false}]},

 {id:"pb-cookies",title:"Flourless Peanut Butter Cookies",cuisine:"American",diet:["vegetarian","halal","glutenfree"],serves:18,cost:0.20,meal:["dessert","snack"],tags:["sweets","oven"],
  desc:"Soft, chewy peanut butter cookies with the classic fork criss-cross, made with just peanut butter, sugar, and an egg. No flour, one bowl, and naturally gluten-free.",
  pantry:["peanut butter","sugar","egg","baking soda","vanilla"],
  ingredients:["1 cup (260 g) creamy peanut butter (regular, not natural-style, which spreads)","¾ cup (150 g) brown or white sugar","1 egg","½ tsp baking soda","½ tsp vanilla extract","Pinch of salt"],
  steps:[
   {name:"Heat the oven",desc:"Heat the oven to 350°F (175°C) and line a sheet pan with parchment paper.",min:10},
   {name:"Mix the dough",desc:"Stir everything together in a bowl until smooth and thick.",min:3,timer:false},
   {name:"Shape",desc:"Roll the dough into 1-tablespoon balls and set them 5 cm (2 in) apart. Press each one flat in a criss-cross with a fork.",min:6,timer:false},
   {name:"Bake",desc:"Bake until puffed and just set at the edges. They look soft but firm up as they cool.",min:10},
   {name:"Cool on the pan",desc:"Leave the cookies on the pan until firm enough to move; they break if moved hot.",min:10}]},

 {id:"gf-chicken-tenders",title:"Crispy Oven Chicken Tenders",cuisine:"American",diet:["halal","glutenfree"],serves:4,cost:2.25,meal:["dinner"],tags:["oven"],
  desc:"Crunchy, golden chicken tenders coated in crushed corn tortilla chips and parmesan and baked instead of fried. A kid favorite with honey mustard or ketchup for dipping.",
  pantry:["chicken tenders","eggs","tortilla chips","parmesan","paprika","garlic powder"],
  ingredients:["680 g (1½ lb) chicken tenders, or breasts cut into strips (halal-certified to keep it halal)","2 eggs","3 cups (90 g) corn tortilla chips, finely crushed","¼ cup (20 g) grated parmesan","1 tsp paprika","½ tsp garlic powder","¾ tsp salt","¼ tsp pepper","2 tbsp oil or cooking spray","Honey mustard or ketchup, to dip"],
  steps:[
   {name:"Heat the oven",desc:"Heat the oven to 425°F (220°C). Set a wire rack on a sheet pan and brush or spray it with oil, so the tenders crisp on both sides.",min:10},
   {name:"Set up the coating",desc:"Beat the eggs in a shallow bowl. In a second bowl, mix the crushed chips, parmesan, paprika, garlic powder, salt, and pepper.",min:4,timer:false},
   {name:"Coat the chicken",desc:"Pat the chicken dry. Dip each piece in egg, let the extra drip off, then press it into the chip mix on both sides. Lay them on the rack and brush or spray the tops with oil.",min:8,timer:false},
   {name:"Bake",desc:"Bake, flipping halfway, until golden and cooked through: 165°F (74°C) inside, or no pink when you cut the thickest one.",min:16},
   {name:"Rest",desc:"Let the tenders sit a few minutes so the coating sets.",min:3}]}
);

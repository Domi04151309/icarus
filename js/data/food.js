const data = JSON.parse("{\"healthy\":[{\"title\":\"Steak\",\"calories\":271,\"fat\":19,\"carbs\":0,\"sugar\":0,\"protein\":25,\"alcohol\":0,\"portion\":100,\"serving\":221,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Chicken Breast\",\"calories\":165,\"fat\":3,\"carbs\":0,\"sugar\":0,\"protein\":31,\"alcohol\":0,\"portion\":100,\"serving\":120,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Tuna\",\"calories\":132,\"fat\":1,\"carbs\":0,\"sugar\":0,\"protein\":28,\"alcohol\":0,\"portion\":100,\"serving\":85,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Salmon\",\"calories\":208,\"fat\":13,\"carbs\":0,\"sugar\":0,\"protein\":20,\"alcohol\":0,\"portion\":100,\"serving\":227,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Shrimp\",\"calories\":99,\"fat\":0,\"carbs\":0,\"sugar\":0,\"protein\":24,\"alcohol\":0,\"portion\":100,\"serving\":5,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Flat Iron Steak\",\"calories\":137,\"fat\":6,\"carbs\":0,\"sugar\":0,\"protein\":20,\"alcohol\":0,\"portion\":100,\"serving\":221,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Ribeye/Tomahawk Steak\",\"calories\":291,\"fat\":22,\"carbs\":0,\"sugar\":0,\"protein\":24,\"alcohol\":0,\"portion\":100,\"serving\":221,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"T-Bone Steak\",\"calories\":247,\"fat\":16,\"carbs\":0,\"sugar\":0,\"protein\":24,\"alcohol\":0,\"portion\":100,\"serving\":221,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Sirloin\",\"calories\":244,\"fat\":14,\"carbs\":0,\"sugar\":0,\"protein\":27,\"alcohol\":0,\"portion\":100,\"serving\":221,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Tenderloin\",\"calories\":324,\"fat\":25,\"carbs\":0,\"sugar\":0,\"protein\":24,\"alcohol\":0,\"portion\":100,\"serving\":221,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Strip Steak\",\"calories\":117,\"fat\":2,\"carbs\":0,\"sugar\":0,\"protein\":23,\"alcohol\":0,\"portion\":100,\"serving\":221,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Flank Steak\",\"calories\":192,\"fat\":8,\"carbs\":0,\"sugar\":0,\"protein\":28,\"alcohol\":0,\"portion\":100,\"serving\":221,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Skirt Steak\",\"calories\":220,\"fat\":12,\"carbs\":0,\"sugar\":0,\"protein\":26,\"alcohol\":0,\"portion\":100,\"serving\":221,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Lobster\",\"calories\":143,\"fat\":1,\"carbs\":3,\"sugar\":0,\"protein\":26,\"alcohol\":0,\"portion\":100,\"serving\":85,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Crab\",\"calories\":83,\"fat\":0,\"carbs\":0,\"sugar\":0,\"protein\":18,\"alcohol\":0,\"portion\":100,\"serving\":118,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Avocado\",\"calories\":160,\"fat\":15,\"carbs\":9,\"sugar\":0,\"protein\":2,\"alcohol\":0,\"portion\":100,\"serving\":201,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Salad\",\"calories\":15,\"fat\":0,\"carbs\":2,\"sugar\":0,\"protein\":1,\"alcohol\":0,\"portion\":100,\"serving\":85,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Tomato\",\"calories\":18,\"fat\":0,\"carbs\":3,\"sugar\":2,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":148,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Pumpkin\",\"calories\":26,\"fat\":0,\"carbs\":7,\"sugar\":2,\"protein\":1,\"alcohol\":0,\"portion\":100,\"serving\":245,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Sweetpotato\",\"calories\":86,\"fat\":0,\"carbs\":20,\"sugar\":4,\"protein\":1,\"alcohol\":0,\"portion\":100,\"serving\":114,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Cucumber\",\"calories\":15,\"fat\":0,\"carbs\":3,\"sugar\":1,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":201,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Potato\",\"calories\":93,\"fat\":0,\"carbs\":21,\"sugar\":1,\"protein\":2,\"alcohol\":0,\"portion\":100,\"serving\":173,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Garlic\",\"calories\":149,\"fat\":0,\"carbs\":33,\"sugar\":1,\"protein\":6,\"alcohol\":0,\"portion\":100,\"serving\":3,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Zuccini\",\"calories\":15,\"fat\":0,\"carbs\":2,\"sugar\":1,\"protein\":1,\"alcohol\":0,\"portion\":100,\"serving\":217,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Onion\",\"calories\":40,\"fat\":0,\"carbs\":9,\"sugar\":4,\"protein\":1,\"alcohol\":0,\"portion\":100,\"serving\":94,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Peas\",\"calories\":81,\"fat\":0,\"carbs\":14,\"sugar\":6,\"protein\":5,\"alcohol\":0,\"portion\":100,\"serving\":160,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Carrot\",\"calories\":41,\"fat\":0,\"carbs\":10,\"sugar\":4,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":46,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Quinoa\",\"calories\":368,\"fat\":6,\"carbs\":64,\"sugar\":0,\"protein\":14,\"alcohol\":0,\"portion\":100,\"serving\":92,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Black Beans (Dry)\",\"calories\":132,\"fat\":1,\"carbs\":30,\"sugar\":0,\"protein\":24,\"alcohol\":0,\"portion\":100,\"serving\":200,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Broccoli (raw)\",\"calories\":32,\"fat\":0,\"carbs\":6,\"sugar\":1,\"protein\":2,\"alcohol\":0,\"portion\":100,\"serving\":37,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Sweet Corn\",\"calories\":86,\"fat\":1,\"carbs\":19,\"sugar\":3,\"protein\":3,\"alcohol\":0,\"portion\":100,\"serving\":89,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Corn\",\"calories\":96,\"fat\":1,\"carbs\":21,\"sugar\":4,\"protein\":3,\"alcohol\":0,\"portion\":100,\"serving\":103,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Spinach\",\"calories\":23,\"fat\":0,\"carbs\":3,\"sugar\":0,\"protein\":3,\"alcohol\":0,\"portion\":100,\"serving\":180,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Romaine lettuce\",\"calories\":17,\"fat\":0,\"carbs\":3,\"sugar\":1,\"protein\":1,\"alcohol\":0,\"portion\":100,\"serving\":94,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Baby Carrot\",\"calories\":35,\"fat\":0,\"carbs\":8,\"sugar\":4,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":100,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Green bean\",\"calories\":31,\"fat\":0,\"carbs\":7,\"sugar\":0,\"protein\":1,\"alcohol\":0,\"portion\":100,\"serving\":125,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Bell pepper\",\"calories\":28,\"fat\":0,\"carbs\":6,\"sugar\":4,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":114,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Iceberg Lettuce\",\"calories\":14,\"fat\":0,\"carbs\":3,\"sugar\":2,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":57,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Red Onion\",\"calories\":41,\"fat\":0,\"carbs\":9,\"sugar\":4,\"protein\":1,\"alcohol\":0,\"portion\":100,\"serving\":94,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Mushroom\",\"calories\":22,\"fat\":0,\"carbs\":3,\"sugar\":2,\"protein\":3,\"alcohol\":0,\"portion\":100,\"serving\":12,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Cauliflower\",\"calories\":25,\"fat\":0,\"carbs\":5,\"sugar\":1,\"protein\":1,\"alcohol\":0,\"portion\":100,\"serving\":107,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Spring Onions\",\"calories\":32,\"fat\":0,\"carbs\":7,\"sugar\":2,\"protein\":1,\"alcohol\":0,\"portion\":100,\"serving\":15,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Asparagus\",\"calories\":20,\"fat\":0,\"carbs\":3,\"sugar\":1,\"protein\":2,\"alcohol\":0,\"portion\":100,\"serving\":75,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Cabbage\",\"calories\":25,\"fat\":0,\"carbs\":6,\"sugar\":3,\"protein\":1,\"alcohol\":0,\"portion\":100,\"serving\":150,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Olives\",\"calories\":115,\"fat\":11,\"carbs\":6,\"sugar\":0,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":3,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Jalapeno\",\"calories\":28,\"fat\":0,\"carbs\":7,\"sugar\":4,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":14,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Celery\",\"calories\":16,\"fat\":0,\"carbs\":3,\"sugar\":1,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":40,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Ginger\",\"calories\":80,\"fat\":0,\"carbs\":18,\"sugar\":1,\"protein\":1,\"alcohol\":0,\"portion\":100,\"serving\":2,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Eggplant\",\"calories\":25,\"fat\":0,\"carbs\":6,\"sugar\":3,\"protein\":1,\"alcohol\":0,\"portion\":100,\"serving\":99,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Leek\",\"calories\":61,\"fat\":0,\"carbs\":14,\"sugar\":3,\"protein\":1,\"alcohol\":0,\"portion\":100,\"serving\":124,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Artichoke\",\"calories\":47,\"fat\":0,\"carbs\":11,\"sugar\":1,\"protein\":3,\"alcohol\":0,\"portion\":100,\"serving\":120,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Cayenne pepper\",\"calories\":318,\"fat\":17,\"carbs\":57,\"sugar\":10,\"protein\":12,\"alcohol\":0,\"portion\":100,\"serving\":1,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Arugula\",\"calories\":25,\"fat\":0,\"carbs\":3,\"sugar\":2,\"protein\":2,\"alcohol\":0,\"portion\":100,\"serving\":10,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Chili pepper\",\"calories\":40,\"fat\":0,\"carbs\":9,\"sugar\":5,\"protein\":1,\"alcohol\":0,\"portion\":100,\"serving\":45,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Radish\",\"calories\":16,\"fat\":0,\"carbs\":3,\"sugar\":1,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":4,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Rhubarb\",\"calories\":21,\"fat\":0,\"carbs\":4,\"sugar\":1,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":51,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Jackfruit\",\"calories\":95,\"fat\":0,\"carbs\":23,\"sugar\":19,\"protein\":1,\"alcohol\":0,\"portion\":100,\"serving\":165,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Apple\",\"calories\":52,\"fat\":0,\"carbs\":14,\"sugar\":10,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":182,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Orange\",\"calories\":47,\"fat\":0,\"carbs\":12,\"sugar\":9,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":140,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Banana\",\"calories\":89,\"fat\":0,\"carbs\":23,\"sugar\":12,\"protein\":1,\"alcohol\":0,\"portion\":100,\"serving\":118,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Pear\",\"calories\":57,\"fat\":0,\"carbs\":15,\"sugar\":10,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":178,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Peach\",\"calories\":39,\"fat\":0,\"carbs\":10,\"sugar\":8,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":175,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Grapes\",\"calories\":67,\"fat\":0,\"carbs\":17,\"sugar\":16,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":49,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Strawberry\",\"calories\":33,\"fat\":0,\"carbs\":8,\"sugar\":4,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":90,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Pineapple\",\"calories\":50,\"fat\":0,\"carbs\":13,\"sugar\":10,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":82,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Watermelon\",\"calories\":30,\"fat\":0,\"carbs\":8,\"sugar\":6,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":286,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Mango\",\"calories\":60,\"fat\":0,\"carbs\":15,\"sugar\":14,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":336,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Raspberry\",\"calories\":53,\"fat\":0,\"carbs\":12,\"sugar\":4,\"protein\":1,\"alcohol\":0,\"portion\":100,\"serving\":12,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Cherry\",\"calories\":50,\"fat\":0,\"carbs\":12,\"sugar\":8,\"protein\":1,\"alcohol\":0,\"portion\":100,\"serving\":49,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Blueberry\",\"calories\":57,\"fat\":0,\"carbs\":14,\"sugar\":10,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":148,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Kiwi\",\"calories\":61,\"fat\":0,\"carbs\":15,\"sugar\":9,\"protein\":1,\"alcohol\":0,\"portion\":100,\"serving\":69,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Blackberry\",\"calories\":43,\"fat\":0,\"carbs\":10,\"sugar\":4,\"protein\":1,\"alcohol\":0,\"portion\":100,\"serving\":144,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Nectarine\",\"calories\":44,\"fat\":0,\"carbs\":11,\"sugar\":8,\"protein\":1,\"alcohol\":0,\"portion\":100,\"serving\":156,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Tangerine\",\"calories\":53,\"fat\":0,\"carbs\":13,\"sugar\":11,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":88,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Plum\",\"calories\":46,\"fat\":0,\"carbs\":11,\"sugar\":9,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":66,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Lemon\",\"calories\":29,\"fat\":0,\"carbs\":9,\"sugar\":2,\"protein\":1,\"alcohol\":0,\"portion\":100,\"serving\":84,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Pomegranates\",\"calories\":83,\"fat\":1,\"carbs\":19,\"sugar\":14,\"protein\":1,\"alcohol\":0,\"portion\":100,\"serving\":282,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"(Honey) Melon\",\"calories\":36,\"fat\":0,\"carbs\":9,\"sugar\":8,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":177,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Limes\",\"calories\":30,\"fat\":0,\"carbs\":11,\"sugar\":1,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":67,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Coconut\",\"calories\":354,\"fat\":33,\"carbs\":15,\"sugar\":6,\"protein\":3,\"alcohol\":0,\"portion\":100,\"serving\":85,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Apricot\",\"calories\":48,\"fat\":0,\"carbs\":11,\"sugar\":9,\"protein\":1,\"alcohol\":0,\"portion\":100,\"serving\":35,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Lychees\",\"calories\":66,\"fat\":0,\"carbs\":17,\"sugar\":15,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":190,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Blood orange\",\"calories\":49,\"fat\":0,\"carbs\":13,\"sugar\":8,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":140,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Grapefruit\",\"calories\":42,\"fat\":0,\"carbs\":11,\"sugar\":7,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":123,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Cranberries\",\"calories\":308,\"fat\":1,\"carbs\":82,\"sugar\":65,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":110,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Dragon fruit\",\"calories\":31,\"fat\":0,\"carbs\":7,\"sugar\":4,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":198,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Passion fruit\",\"calories\":97,\"fat\":0,\"carbs\":23,\"sugar\":11,\"protein\":2,\"alcohol\":0,\"portion\":100,\"serving\":236,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Papaya\",\"calories\":43,\"fat\":0,\"carbs\":11,\"sugar\":7,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":145,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Figs\",\"calories\":74,\"fat\":0,\"carbs\":19,\"sugar\":16,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":50,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Dates\",\"calories\":282,\"fat\":0,\"carbs\":75,\"sugar\":63,\"protein\":2,\"alcohol\":0,\"portion\":100,\"serving\":42,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Almond Milk\",\"calories\":15,\"fat\":1,\"carbs\":0,\"sugar\":0,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":240,\"unit\":\"ml\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Parmigiano\",\"calories\":431,\"fat\":29,\"carbs\":4,\"sugar\":0,\"protein\":38,\"alcohol\":0,\"portion\":100,\"serving\":28,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Camembert\",\"calories\":299,\"fat\":24,\"carbs\":0,\"sugar\":0,\"protein\":20,\"alcohol\":0,\"portion\":100,\"serving\":28,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Emmental cheese\",\"calories\":390,\"fat\":31,\"carbs\":1,\"sugar\":0,\"protein\":27,\"alcohol\":0,\"portion\":100,\"serving\":28,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Gorgonzola\",\"calories\":353,\"fat\":29,\"carbs\":2,\"sugar\":0,\"protein\":21,\"alcohol\":0,\"portion\":100,\"serving\":28,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Soy Milk\",\"calories\":54,\"fat\":1,\"carbs\":6,\"sugar\":4,\"protein\":3,\"alcohol\":0,\"portion\":100,\"serving\":240,\"unit\":\"ml\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Rice Milk\",\"calories\":47,\"fat\":1,\"carbs\":9,\"sugar\":5,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":240,\"unit\":\"ml\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Oat Milk\",\"calories\":54,\"fat\":0,\"carbs\":12,\"sugar\":7,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":240,\"unit\":\"ml\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Coconut Milk\",\"calories\":230,\"fat\":24,\"carbs\":6,\"sugar\":3,\"protein\":2,\"alcohol\":0,\"portion\":100,\"serving\":240,\"unit\":\"ml\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Whole Wheat Bread\",\"calories\":247,\"fat\":3,\"carbs\":41,\"sugar\":6,\"protein\":13,\"alcohol\":0,\"portion\":100,\"serving\":32,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Multigrain\",\"calories\":251,\"fat\":3,\"carbs\":46,\"sugar\":10,\"protein\":10,\"alcohol\":0,\"portion\":100,\"serving\":32,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Sourdough\",\"calories\":289,\"fat\":1,\"carbs\":56,\"sugar\":2,\"protein\":12,\"alcohol\":0,\"portion\":100,\"serving\":64,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Rice\",\"calories\":130,\"fat\":0,\"carbs\":28,\"sugar\":0,\"protein\":2,\"alcohol\":0,\"portion\":100,\"serving\":158,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Pasta\",\"calories\":131,\"fat\":1,\"carbs\":25,\"sugar\":0,\"protein\":5,\"alcohol\":0,\"portion\":100,\"serving\":140,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Spaghetti\",\"calories\":158,\"fat\":0,\"carbs\":31,\"sugar\":0,\"protein\":6,\"alcohol\":0,\"portion\":100,\"serving\":140,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Macaroni\",\"calories\":371,\"fat\":1,\"carbs\":75,\"sugar\":2,\"protein\":13,\"alcohol\":0,\"portion\":100,\"serving\":140,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Fettuccine\",\"calories\":99,\"fat\":2,\"carbs\":14,\"sugar\":1,\"protein\":6,\"alcohol\":0,\"portion\":100,\"serving\":140,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Tagliatelle\",\"calories\":288,\"fat\":2,\"carbs\":55,\"sugar\":0,\"protein\":11,\"alcohol\":0,\"portion\":100,\"serving\":140,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Fusilli\",\"calories\":158,\"fat\":0,\"carbs\":31,\"sugar\":0,\"protein\":5,\"alcohol\":0,\"portion\":100,\"serving\":140,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Farfalle\",\"calories\":158,\"fat\":0,\"carbs\":31,\"sugar\":0,\"protein\":5,\"alcohol\":0,\"portion\":100,\"serving\":140,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Penne\",\"calories\":118,\"fat\":4,\"carbs\":17,\"sugar\":1,\"protein\":6,\"alcohol\":0,\"portion\":100,\"serving\":140,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Rigatoni\",\"calories\":158,\"fat\":0,\"carbs\":31,\"sugar\":0,\"protein\":5,\"alcohol\":0,\"portion\":100,\"serving\":140,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Tortellini\",\"calories\":307,\"fat\":7,\"carbs\":47,\"sugar\":1,\"protein\":14,\"alcohol\":0,\"portion\":100,\"serving\":140,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Ravioli\",\"calories\":77,\"fat\":1,\"carbs\":14,\"sugar\":3,\"protein\":2,\"alcohol\":0,\"portion\":100,\"serving\":140,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Gnocchi\",\"calories\":201,\"fat\":1,\"carbs\":41,\"sugar\":0,\"protein\":6,\"alcohol\":0,\"portion\":100,\"serving\":140,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Walnuts\",\"calories\":654,\"fat\":65,\"carbs\":14,\"sugar\":2,\"protein\":15,\"alcohol\":0,\"portion\":100,\"serving\":28,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Cashew\",\"calories\":553,\"fat\":44,\"carbs\":30,\"sugar\":6,\"protein\":18,\"alcohol\":0,\"portion\":100,\"serving\":69,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Peanuts\",\"calories\":567,\"fat\":49,\"carbs\":16,\"sugar\":4,\"protein\":26,\"alcohol\":0,\"portion\":100,\"serving\":146,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Almonds\",\"calories\":579,\"fat\":50,\"carbs\":22,\"sugar\":4,\"protein\":21,\"alcohol\":0,\"portion\":100,\"serving\":138,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Pistachios\",\"calories\":562,\"fat\":45,\"carbs\":28,\"sugar\":10,\"protein\":20,\"alcohol\":0,\"portion\":100,\"serving\":123,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Pecans\",\"calories\":690,\"fat\":72,\"carbs\":14,\"sugar\":4,\"protein\":6,\"alcohol\":0,\"portion\":100,\"serving\":52,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Macadamia Nuts\",\"calories\":718,\"fat\":76,\"carbs\":14,\"sugar\":4,\"protein\":8,\"alcohol\":0,\"portion\":100,\"serving\":28,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Hazelnuts\",\"calories\":628,\"fat\":61,\"carbs\":17,\"sugar\":4,\"protein\":15,\"alcohol\":0,\"portion\":100,\"serving\":28,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Cooking Oil\",\"calories\":884,\"fat\":100,\"carbs\":0,\"sugar\":0,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":13,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Canola Oil\",\"calories\":884,\"fat\":100,\"carbs\":0,\"sugar\":0,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":13,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Avocado Oil\",\"calories\":884,\"fat\":100,\"carbs\":0,\"sugar\":0,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":13,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Sesame Oil\",\"calories\":884,\"fat\":100,\"carbs\":0,\"sugar\":0,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":13,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Almond Oil\",\"calories\":884,\"fat\":100,\"carbs\":0,\"sugar\":0,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":13,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Walnut Oil\",\"calories\":884,\"fat\":100,\"carbs\":0,\"sugar\":0,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":13,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Coconut Oil\",\"calories\":884,\"fat\":100,\"carbs\":0,\"sugar\":0,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":13,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Water\",\"calories\":0,\"fat\":0,\"carbs\":0,\"sugar\":0,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":333,\"unit\":\"ml\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Orange Juice\",\"calories\":45,\"fat\":0,\"carbs\":10,\"sugar\":8,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":333,\"unit\":\"ml\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Mango Juice\",\"calories\":58,\"fat\":0,\"carbs\":15,\"sugar\":14,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":333,\"unit\":\"ml\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Apple Juice\",\"calories\":46,\"fat\":0,\"carbs\":11,\"sugar\":10,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":333,\"unit\":\"ml\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Coffee(black)\",\"calories\":0,\"fat\":0,\"carbs\":0,\"sugar\":0,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":333,\"unit\":\"ml\",\"vegetarian\":true,\"vegan\":true}],\"casual\":[{\"title\":\"Catfish\",\"calories\":144,\"fat\":7,\"carbs\":0,\"sugar\":0,\"protein\":18,\"alcohol\":0,\"portion\":100,\"serving\":143,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Cooked Ham\",\"calories\":106,\"fat\":4,\"carbs\":0,\"sugar\":0,\"protein\":17,\"alcohol\":0,\"portion\":100,\"serving\":85,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Raw Ham\",\"calories\":245,\"fat\":19,\"carbs\":0,\"sugar\":0,\"protein\":17,\"alcohol\":0,\"portion\":100,\"serving\":35,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Mackerel\",\"calories\":305,\"fat\":25,\"carbs\":0,\"sugar\":0,\"protein\":19,\"alcohol\":0,\"portion\":100,\"serving\":88,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Salami\",\"calories\":336,\"fat\":26,\"carbs\":2,\"sugar\":1,\"protein\":22,\"alcohol\":0,\"portion\":100,\"serving\":9,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Bacon\",\"calories\":541,\"fat\":42,\"carbs\":1,\"sugar\":0,\"protein\":37,\"alcohol\":0,\"portion\":100,\"serving\":35,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Spare Ribs\",\"calories\":277,\"fat\":23,\"carbs\":0,\"sugar\":0,\"protein\":15,\"alcohol\":0,\"portion\":100,\"serving\":240,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Ground Beef\",\"calories\":332,\"fat\":30,\"carbs\":0,\"sugar\":0,\"protein\":14,\"alcohol\":0,\"portion\":100,\"serving\":113,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Chicken Wings\",\"calories\":352,\"fat\":26,\"carbs\":10,\"sugar\":0,\"protein\":18,\"alcohol\":0,\"portion\":100,\"serving\":270,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Sardines\",\"calories\":208,\"fat\":11,\"carbs\":0,\"sugar\":0,\"protein\":25,\"alcohol\":0,\"portion\":100,\"serving\":12,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Brisket\",\"calories\":155,\"fat\":7,\"carbs\":0,\"sugar\":0,\"protein\":21,\"alcohol\":0,\"portion\":100,\"serving\":221,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Back Ribs\",\"calories\":277,\"fat\":23,\"carbs\":0,\"sugar\":0,\"protein\":15,\"alcohol\":0,\"portion\":100,\"serving\":240,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Short Ribs\",\"calories\":471,\"fat\":42,\"carbs\":0,\"sugar\":0,\"protein\":22,\"alcohol\":0,\"portion\":100,\"serving\":240,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Cheddar\",\"calories\":402,\"fat\":33,\"carbs\":1,\"sugar\":0,\"protein\":25,\"alcohol\":0,\"portion\":100,\"serving\":28,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Light Milk\",\"calories\":42,\"fat\":0,\"carbs\":4,\"sugar\":5,\"protein\":3,\"alcohol\":0,\"portion\":100,\"serving\":240,\"unit\":\"ml\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Fresh Milk\",\"calories\":69,\"fat\":3,\"carbs\":4,\"sugar\":5,\"protein\":3,\"alcohol\":0,\"portion\":100,\"serving\":240,\"unit\":\"ml\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"UHT-Milk\",\"calories\":46,\"fat\":1,\"carbs\":4,\"sugar\":4,\"protein\":3,\"alcohol\":0,\"portion\":100,\"serving\":240,\"unit\":\"ml\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Whole Milk\",\"calories\":61,\"fat\":3,\"carbs\":4,\"sugar\":5,\"protein\":3,\"alcohol\":0,\"portion\":100,\"serving\":240,\"unit\":\"ml\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Eggs\",\"calories\":155,\"fat\":11,\"carbs\":1,\"sugar\":1,\"protein\":13,\"alcohol\":0,\"portion\":100,\"serving\":50,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Yogurt\",\"calories\":59,\"fat\":0,\"carbs\":3,\"sugar\":3,\"protein\":10,\"alcohol\":0,\"portion\":100,\"serving\":170,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Gruyère\",\"calories\":413,\"fat\":32,\"carbs\":0,\"sugar\":0,\"protein\":30,\"alcohol\":0,\"portion\":100,\"serving\":28,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Gouda\",\"calories\":356,\"fat\":27,\"carbs\":2,\"sugar\":2,\"protein\":25,\"alcohol\":0,\"portion\":100,\"serving\":28,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Mozzarella\",\"calories\":280,\"fat\":17,\"carbs\":3,\"sugar\":1,\"protein\":28,\"alcohol\":0,\"portion\":100,\"serving\":28,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Montery Jack cheese\",\"calories\":373,\"fat\":30,\"carbs\":0,\"sugar\":0,\"protein\":24,\"alcohol\":0,\"portion\":100,\"serving\":28,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Mascarpone\",\"calories\":436,\"fat\":46,\"carbs\":3,\"sugar\":2,\"protein\":4,\"alcohol\":0,\"portion\":100,\"serving\":28,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Buttermilk\",\"calories\":40,\"fat\":0,\"carbs\":4,\"sugar\":4,\"protein\":3,\"alcohol\":0,\"portion\":100,\"serving\":240,\"unit\":\"ml\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Evaporated Milk\",\"calories\":134,\"fat\":8,\"carbs\":10,\"sugar\":0,\"protein\":7,\"alcohol\":0,\"portion\":100,\"serving\":240,\"unit\":\"ml\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Goat Milk\",\"calories\":69,\"fat\":4,\"carbs\":4,\"sugar\":4,\"protein\":3,\"alcohol\":0,\"portion\":100,\"serving\":240,\"unit\":\"ml\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Rye Bread\",\"calories\":259,\"fat\":3,\"carbs\":48,\"sugar\":3,\"protein\":9,\"alcohol\":0,\"portion\":100,\"serving\":32,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Toast\",\"calories\":313,\"fat\":4,\"carbs\":56,\"sugar\":6,\"protein\":13,\"alcohol\":0,\"portion\":100,\"serving\":22,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Ciabatta\",\"calories\":271,\"fat\":3,\"carbs\":50,\"sugar\":0,\"protein\":8,\"alcohol\":0,\"portion\":100,\"serving\":31,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Brioche\",\"calories\":346,\"fat\":13,\"carbs\":46,\"sugar\":8,\"protein\":9,\"alcohol\":0,\"portion\":100,\"serving\":77,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Pita Bread\",\"calories\":275,\"fat\":1,\"carbs\":56,\"sugar\":0,\"protein\":9,\"alcohol\":0,\"portion\":100,\"serving\":60,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Butter\",\"calories\":717,\"fat\":81,\"carbs\":0,\"sugar\":0,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":4,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":false},{\"title\":\"Olive Oil\",\"calories\":884,\"fat\":100,\"carbs\":0,\"sugar\":0,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":13,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Chocolate\",\"calories\":546,\"fat\":31,\"carbs\":61,\"sugar\":48,\"protein\":4,\"alcohol\":0,\"portion\":100,\"serving\":26,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Jam\",\"calories\":280,\"fat\":0,\"carbs\":70,\"sugar\":48,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":20,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Cola\",\"calories\":38,\"fat\":0,\"carbs\":10,\"sugar\":9,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":333,\"unit\":\"ml\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Iced tea\",\"calories\":35,\"fat\":0,\"carbs\":9,\"sugar\":8,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":333,\"unit\":\"ml\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Sprite\",\"calories\":39,\"fat\":0,\"carbs\":10,\"sugar\":9,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":333,\"unit\":\"ml\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Energy Drink\",\"calories\":46,\"fat\":0,\"carbs\":12,\"sugar\":12,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":333,\"unit\":\"ml\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Protein Shake\",\"calories\":0,\"fat\":0,\"carbs\":0,\"sugar\":0,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":333,\"unit\":\"ml\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Beer\",\"calories\":43,\"fat\":0,\"carbs\":3,\"sugar\":0,\"protein\":0,\"alcohol\":5,\"portion\":100,\"serving\":356,\"unit\":\"ml\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Wine\",\"calories\":83,\"fat\":0,\"carbs\":2,\"sugar\":0,\"protein\":0,\"alcohol\":14,\"portion\":100,\"serving\":250,\"unit\":\"ml\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Whiskey\",\"calories\":250,\"fat\":0,\"carbs\":0,\"sugar\":0,\"protein\":0,\"alcohol\":40,\"portion\":100,\"serving\":42,\"unit\":\"ml\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Vodka\",\"calories\":231,\"fat\":0,\"carbs\":0,\"sugar\":0,\"protein\":0,\"alcohol\":40,\"portion\":100,\"serving\":42,\"unit\":\"ml\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Rum\",\"calories\":231,\"fat\":0,\"carbs\":0,\"sugar\":0,\"protein\":0,\"alcohol\":40,\"portion\":100,\"serving\":42,\"unit\":\"ml\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Gin\",\"calories\":263,\"fat\":0,\"carbs\":0,\"sugar\":0,\"protein\":0,\"alcohol\":40,\"portion\":100,\"serving\":42,\"unit\":\"ml\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Schnaps\",\"calories\":231,\"fat\":0,\"carbs\":0,\"sugar\":0,\"protein\":0,\"alcohol\":40,\"portion\":100,\"serving\":42,\"unit\":\"ml\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Cognac\",\"calories\":231,\"fat\":0,\"carbs\":0,\"sugar\":0,\"protein\":0,\"alcohol\":40,\"portion\":100,\"serving\":42,\"unit\":\"ml\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"BigMac\",\"calories\":0,\"fat\":0,\"carbs\":0,\"sugar\":0,\"protein\":0,\"alcohol\":0,\"portion\":0,\"serving\":0,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Fries\",\"calories\":0,\"fat\":0,\"carbs\":0,\"sugar\":0,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":0,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Sweetpotato Fries\",\"calories\":0,\"fat\":0,\"carbs\":0,\"sugar\":0,\"protein\":0,\"alcohol\":0,\"portion\":100,\"serving\":0,\"unit\":\"g\",\"vegetarian\":true,\"vegan\":true},{\"title\":\"Döner Kebab\",\"calories\":0,\"fat\":0,\"carbs\":0,\"sugar\":0,\"protein\":0,\"alcohol\":0,\"portion\":0,\"serving\":0,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Pizza\",\"calories\":0,\"fat\":0,\"carbs\":0,\"sugar\":0,\"protein\":0,\"alcohol\":0,\"portion\":0,\"serving\":0,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false},{\"title\":\"Chicken Nuggets\",\"calories\":0,\"fat\":0,\"carbs\":0,\"sugar\":0,\"protein\":0,\"alcohol\":0,\"portion\":0,\"serving\":0,\"unit\":\"g\",\"vegetarian\":false,\"vegan\":false}]}"); export default data;

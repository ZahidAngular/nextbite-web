import {
  Amphora,
  Bean,
  Beef,
  Cookie,
  type LucideIcon,
  Milk,
  Nut,
  Pizza,
  Salad,
  Sandwich,
  Soup,
  Sprout,
  Utensils,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   FINE FOOD SHOW 2026 — STAND HB27
   Poori page ka data yahan se control hota hai.

   📸 PICTURES:
   Zyada tar pack shots brand websites se le kar `public/food-show/<brand>/`
   mein rakhi gayi hain (webp, max 1200px) — koi hotlink nahi, sab local.
   Jis product ka `image` khaali ho, uske liye brand-colour placeholder
   khud render ho jata hai. Nayi tasveer add karni ho to:
     1. file ko  public/food-show/<brand>/  mein daalo
     2. us product par likho →  image: "/food-show/angel-food/cheddar-block.webp"

   Abhi tasveer ke baghair sirf 4 Angel Food pizzas hain — baqi sab products
   ke paas pack shots maujood hain. (Ginger & Honey Tofu ab Zenzo brand ke
   under hai — pack label Zenzo ka hai, is liye move kiya gaya.)
   ═══════════════════════════════════════════════════════════════ */

export const SHOW = {
  name: "Fine Food Show",
  year: "2026",
  stand: "HB27",
  headline: "Four distinct brands. One exceptional plant-based portfolio.",
  intro:
    "From pioneering dairy-free favourites and organic wholefoods to cultured coconut yoghurt and artisan fermented nut cheeses.",
} as const;

export type Temp = "CHILLED" | "FROZEN";

/** rail filter — "ALL" plus the two storage temps */
export type TempFilter = "ALL" | Temp;

export type Product = {
  name: string;
  /** pack size, e.g. "350g" or "330g / 600g" */
  size?: string;
  desc: string;
  temp: Temp;
  /** 📸 real photo path — leave undefined to show the placeholder */
  image?: string;
};

export type Category = {
  id: string;
  title: string;
  /** short line printed next to the title on the flyer */
  tagline: string;
  blurb?: string;
  icon: LucideIcon;
  products: Product[];
};

export type Contact = {
  name: string;
  email: string;
  phones: string[];
  role?: string;
};

export type Brand = {
  slug: string;
  name: string;
  /** the all-caps banner line from the flyer */
  kicker: string;
  since: string;
  origin: string;
  tagline: string;
  story: string;
  /** brand ka apna logo — public/brands/ se; na ho to icon fallback */
  logo?: string;
  /** brand accent — drives cards, chips, glows */
  color: string;
  /** second stop of the brand gradient */
  color2: string;
  icon: LucideIcon;
  categories: Category[];
  contacts: Contact[];
  sites: string[];
  note: string;
};

export const BRANDS: Brand[] = [
  /* ─────────────────────────── ANGEL FOOD ─────────────────────────── */
  {
    slug: "angel-food",
    name: "Angel Food",
    kicker: "Plant-based pioneer since 2006",
    since: "2006",
    origin: "New Zealand",
    tagline: "Your favourite foods, plant-based.",
    story:
      "Born in Aotearoa in 2006, Angel Food makes delicious plant-based alternatives to the foods people already love. From award-winning dairy-free cheeses to plant-based meat classics and convenient ready meals, Angel Food is all about familiar favourites without the compromise.",
    logo: "/brands/angel-food.webp",
    color: "#e07c0a",
    color2: "#f0a93c",
    icon: Milk,
    categories: [
      {
        id: "dairy-free-cheese",
        title: "Dairy-Free Cheese",
        tagline: "Made to melt your heart.",
        blurb:
          "Seven favourites for melting, grating, spreading, crumbling and finishing.",
        icon: Milk,
        products: [
          {
            name: "Cheddar Block",
            size: "350g",
            temp: "CHILLED",
            desc: "Classic block for sandwiches, toasties and cheese boards.",
            image: "/food-show/angel-food/cheddar-block.webp",
          },
          {
            name: "Mozzarella",
            size: "350g",
            temp: "CHILLED",
            desc: "Smooth dairy-free block designed for effortless melting.",
            image: "/food-show/angel-food/mozzarella.webp",
          },
          {
            name: "Grated Cheese",
            size: "250g",
            temp: "CHILLED",
            desc: "Quick-melting shred for commercial pizza kitchens, tacos and bakes.",
            image: "/food-show/angel-food/grated-cheese.webp",
          },
          {
            name: "Feta",
            size: "200g",
            temp: "CHILLED",
            desc: "Salty, creamy and crumbly for Mediterranean salads and savouries.",
            image: "/food-show/angel-food/feta.webp",
          },
          {
            name: "Parmesan",
            size: "100g",
            temp: "CHILLED",
            desc: "Sharp, savoury finishing alternative for pasta, risotto and bakes.",
            image: "/food-show/angel-food/parmesan.webp",
          },
          {
            name: "Sour Cream",
            size: "200g",
            temp: "CHILLED",
            desc: "Rich, tangy dollop for nachos, potatoes and curries.",
            image: "/food-show/angel-food/sour-cream.webp",
          },
          {
            name: "Cream Cheese",
            size: "200g",
            temp: "CHILLED",
            desc: "Award-winning spread for bagels, dips and cheesecakes.",
            image: "/food-show/angel-food/cream-cheese.webp",
          },
        ],
      },
      {
        id: "ready-meals",
        title: "Ready Meals",
        tagline: "Plant goodness, ready to go.",
        blurb:
          "Comforting meals for when convenience matters but flavour still comes first.",
        icon: Soup,
        products: [
          {
            name: "Tofu & Greens",
            size: "400g",
            temp: "FROZEN",
            desc: "Marinated tofu, spinach and jasmine rice with sesame ginger dressing.",
            image: "/food-show/angel-food/tofu-greens.webp",
          },
          {
            name: "Vege Lasagna",
            size: "400g",
            temp: "FROZEN",
            desc: "Lentil ragù, tofu ricotta, béchamel and pasta sheets.",
            image: "/food-show/angel-food/vege-lasagna.webp",
          },
          {
            name: "Vege Korma",
            size: "400g",
            temp: "FROZEN",
            desc: "Coconut-cashew curry with vegetables and aromatic spices.",
            image: "/food-show/angel-food/vege-korma.webp",
          },
          {
            name: "Butter Curry",
            size: "400g",
            temp: "FROZEN",
            desc: "Smooth, mildly spiced plant-based butter curry.",
            image: "/food-show/angel-food/butter-curry.webp",
          },
        ],
      },
      {
        id: "plant-based-classics",
        title: "Plant-Based Classics",
        tagline: "Familiar favourites, made from plants.",
        blurb:
          "Burgers, fishless fingers, meatballs, pulled pork-style protein, pastrami and seafood rings.",
        icon: Beef,
        products: [
          {
            name: "Fishless Fingers",
            size: "230g",
            temp: "FROZEN",
            desc: "Crispy fingers for fishless tacos, chips and tartare.",
            image: "/food-show/angel-food/fishless-fingers.webp",
          },
          {
            name: "Classic Burgers",
            size: "255g",
            temp: "FROZEN",
            desc: "Hearty plant patties ready for gourmet toppings.",
            image: "/food-show/angel-food/classic-burgers.webp",
          },
          {
            name: "Meatless Balls",
            size: "200g",
            temp: "FROZEN",
            desc: "Plant meatballs for tomato sauces and subs.",
            image: "/food-show/angel-food/meatless-balls.webp",
          },
          {
            name: "Pulled Pork-Style",
            size: "200g",
            temp: "FROZEN",
            desc: "Tender shredded alternative for bao, tacos and sliders.",
            image: "/food-show/angel-food/pulled-pork-style.webp",
          },
          {
            name: "Plant Pastrami",
            size: "180g",
            temp: "FROZEN",
            desc: "Spiced deli slices for Reuben sandwiches and platters.",
            image: "/food-show/angel-food/plant-pastrami.webp",
          },
          {
            name: "Seafood Rings",
            size: "200g",
            temp: "FROZEN",
            desc: "Crispy calamari-style rings with lemon and plant-based mayo.",
            image: "/food-show/angel-food/seafood-rings.webp",
          },
        ],
      },
      {
        id: "frozen-pizzas",
        title: "Frozen Pizzas",
        tagline: "Plant-based convenience.",
        blurb: "Ready for the oven and made for easy everyday meals.",
        icon: Pizza,
        products: [
          {
            name: "Veg Trio",
            temp: "FROZEN",
            desc: "Tomato base, Angel Food cheese, Orogel grilled zucchini, eggplant and capsicum; EVOO.",
            image: "/food-show/angel-food/veg-trio.webp",
          },
          {
            name: "Pizza Parmigiana",
            temp: "FROZEN",
            desc: "Tomato base, Angel Food cheese, Orogel eggplant, tomato sauce, EVOO and Angel Food Parmesan.",
            image: "/food-show/angel-food/pizza-parmigiana.webp",
          },
          {
            name: "Mediterranean",
            temp: "FROZEN",
            desc: "Tomato base, Angel Food cheese, Orogel Veg Trio, caponata vegetables, EVOO and oregano.",
            image: "/food-show/angel-food/mediterranean.webp",
          },
        ],
      },
    ],
    contacts: [
      {
        name: "Travis Carruthers",
        role: "Australia contact",
        email: "travis@nextbite.com.au",
        phones: ["0430 952 494"],
      },
    ],
    sites: ["angelfood.co.nz", "nextbite.com.au"],
    note: "Foodservice packs and bulk sizes available — contact to discuss custom options.",
  },

  /* ─────────────────────────── NUTTY BAY ─────────────────────────── */
  {
    slug: "nutty-bay",
    name: "Nutty Bay",
    kicker: "From nature, cultured to perfection",
    since: "—",
    origin: "Australia",
    tagline: "Plant-based food with culture.",
    story:
      "Nutty Bay transforms premium nuts into creamy, cultured plant-based foods using traditional fermentation. Rich in flavour and crafted with live cultures, the range brings together indulgent cashew cheeses, vegan butter and beautifully simple superfood nut butters.",
    logo: "/brands/nutty-bay.webp",
    color: "#b4622a",
    color2: "#dd9a55",
    icon: Nut,
    categories: [
      {
        id: "cultured-cashew-cheeses",
        title: "Cultured Cashew Cheeses",
        tagline: "Fermentation makes the difference.",
        blurb:
          "Live-cultured cashew spreads, slow-fermented for real depth of flavour.",
        icon: Amphora,
        products: [
          {
            name: "Garlic Cashew",
            size: "270g",
            temp: "CHILLED",
            desc: "Savoury cultured spread with roasted garlic.",
            image: "/food-show/nutty-bay/garlic-cashew.webp",
          },
          {
            name: "Chives & Shallots",
            size: "270g",
            temp: "CHILLED",
            desc: "Fresh cultured spread with chives and shallots.",
            image: "/food-show/nutty-bay/chives-shallots.webp",
          },
          {
            name: "Mushroom Umami",
            size: "270g",
            temp: "CHILLED",
            desc: "Earthy fermented mushroom spread.",
            image: "/food-show/nutty-bay/mushroom-umami.webp",
          },
          {
            name: "Classic Cheesy",
            size: "270g",
            temp: "CHILLED",
            desc: "Tangy cheddar-style fermented spread.",
            image: "/food-show/nutty-bay/classic-cheesy.webp",
          },
          {
            name: "Olive & Oregano",
            size: "270g",
            temp: "CHILLED",
            desc: "Mediterranean olive-and-oregano blend.",
            image: "/food-show/nutty-bay/olive-oregano.webp",
          },
        ],
      },
      {
        id: "superfood-nut-butters",
        title: "Superfood Nut Butters",
        tagline: "Nuts, elevated.",
        blurb: "Single-origin nut butters lifted with real superfood botanicals.",
        icon: Cookie,
        products: [
          {
            name: "Cashew + Maca",
            size: "250g",
            temp: "CHILLED",
            desc: "Velvety cashew butter with organic maca.",
            image: "/food-show/nutty-bay/cashew-maca.webp",
          },
          {
            name: "Almond + Lucuma",
            size: "250g",
            temp: "CHILLED",
            desc: "Smooth almond butter with lucuma.",
            image: "/food-show/nutty-bay/almond-lucuma.webp",
          },
          {
            name: "Macadamia + Vanilla",
            size: "250g",
            temp: "CHILLED",
            desc: "Macadamia, vanilla bean and flaxseed spread.",
            image: "/food-show/nutty-bay/macadamia-vanilla.webp",
          },
          {
            name: "Vegan Butter",
            size: "170g",
            temp: "CHILLED",
            desc: "Dairy-free alternative for spreading and baking.",
            image: "/food-show/nutty-bay/vegan-butter.webp",
          },
        ],
      },
    ],
    contacts: [
      {
        name: "Atif Sharjeel",
        role: "Orders & contact",
        email: "atif@nextbite.com.au",
        phones: ["+61 481 317 161"],
      },
      {
        name: "Travis Carruthers",
        role: "Australia contact",
        email: "travis@nextbite.com.au",
        phones: ["0430 952 494"],
      },
    ],
    sites: ["nuttybay.com.au", "nextbite.com.au"],
    note: "Foodservice sizes available — contact to discuss venue requirements.",
  },

  /* ───────────────────────────── TONZU ───────────────────────────── */
  {
    slug: "tonzu",
    name: "Tonzu",
    kicker: "Organic wholefoods, family made since 1979",
    since: "1979",
    origin: "New Zealand",
    tagline: "Plants. Tradition. Simplicity.",
    story:
      "Born from the Chalmers family's belief in the power of wholefoods, Tonzu has been making plant-based food in New Zealand since 1979. From traditionally crafted organic tofu and fermented tempeh to sausages, patties and marinated tofu, Tonzu brings together simple ingredients, plant protein and more than four decades of food-making experience.",
    logo: "/brands/tonzu.webp",
    color: "#3a8a1a",
    color2: "#78c04a",
    icon: Sprout,
    categories: [
      {
        id: "organic-tofu",
        title: "Organic Tofu",
        tagline: "The heart of Tonzu.",
        blurb:
          "Traditionally made certified-organic tofu for stir-fries, curries, grilling and baking.",
        icon: Bean,
        products: [
          {
            name: "Traditional Tofu",
            size: "300g",
            temp: "CHILLED",
            desc: "Handcrafted organic tofu made with Japanese stoneground activated beans.",
            image: "/food-show/tonzu/traditional-tofu.webp",
          },
          {
            name: "Tofu Double Pack",
            size: "600g",
            temp: "CHILLED",
            desc: "Budget-friendly value pack of the original organic tofu.",
            image: "/food-show/tonzu/tofu-double.webp",
          },
          {
            name: "Firm Tofu",
            size: "300g",
            temp: "CHILLED",
            desc: "Firmer take on the original tofu, made with the same traditional methods and gut-friendly nigari.",
            image: "/food-show/tonzu/tofu-firm.webp",
          },
          {
            name: "Firm Tofu Double Pack",
            size: "600g",
            temp: "CHILLED",
            desc: "Great-value double pack of the firm organic tofu.",
            image: "/food-show/tonzu/firm-double-pack.webp",
          },
          {
            name: "Teriyaki Tofu Cubes",
            size: "250g",
            temp: "CHILLED",
            desc: "Pre-cut organic tofu cubes in teriyaki marinade.",
            image: "/food-show/tonzu/teriyaki-tofu-cubes.webp",
          },
          {
            name: "Hoisin Tofu Cubes",
            size: "250g",
            temp: "CHILLED",
            desc: "Ready-marinated organic tofu cubes in hoisin sauce — a quick and easy meal in moments.",
            image: "/food-show/tonzu/hoisin-cubes.webp",
          },
          {
            name: "Sweet & Sour Tofu Cubes",
            size: "250g",
            temp: "CHILLED",
            desc: "Pre-cut cubes in a tangy sweet-and-sour marinade, ready for the pan.",
            image: "/food-show/tonzu/sweet-sour-cubes.webp",
          },
        ],
      },
      {
        id: "fermented-tempeh",
        title: "Fermented Tempeh",
        tagline: "Whole soybeans. Naturally fermented.",
        blurb:
          "A satisfying wholefood plant protein with characteristic texture and flavour.",
        icon: Salad,
        products: [
          {
            name: "Organic Tempeh",
            size: "250g",
            temp: "CHILLED",
            desc: "Traditionally fermented whole-soybean block rich in fibre and protein.",
            image: "/food-show/tonzu/organic-tempeh.webp",
          },
          {
            name: "BBQ Tempeh Strips",
            size: "250g",
            temp: "CHILLED",
            desc: "Ready-to-cook tempeh strips in a smokey barbecue marinade — straight into the pan.",
            image: "/food-show/tonzu/tempeh-strips.webp",
          },
        ],
      },
      {
        id: "sausages-patties",
        title: "Sausages & Patties",
        tagline: "Wholefood made easy.",
        blurb:
          "Convenient favourites built around Tonzu's longstanding expertise with soy and plant protein.",
        icon: Sandwich,
        products: [
          {
            name: "Italian Herb Sausages",
            size: "300g",
            temp: "CHILLED",
            desc: "Organic soybean sausages with Mediterranean herbs.",
            image: "/food-show/tonzu/italian-herb-sausages.webp",
          },
          {
            name: "Garlic & Chilli Sausages",
            size: "300g",
            temp: "CHILLED",
            desc: "Plant sausages with roasted garlic and chilli.",
            image: "/food-show/tonzu/garlic-chilli-sausages.webp",
          },
          {
            name: "Sage & Onion Sausages",
            size: "300g",
            temp: "CHILLED",
            desc: "Wholefood sausages with sweet onion and sage.",
            image: "/food-show/tonzu/sage-onion-sausages.webp",
          },
          {
            name: "Smokey Horopito",
            size: "300g",
            temp: "CHILLED",
            desc: "Smoky sausages with native NZ horopito pepper.",
            image: "/food-show/tonzu/smokey-horopito.webp",
          },
          {
            name: "Cheese & Onion Sausages",
            size: "300g",
            temp: "CHILLED",
            desc: "Chunky plant sausages packed with melting vegan cheese — the first of its kind.",
            image: "/food-show/tonzu/cheese-onion-sausage.webp",
          },
          {
            name: "Smokey BBQ Patties",
            size: "300g",
            temp: "CHILLED",
            desc: "Hearty patties with rich barbecue flavour.",
            image: "/food-show/tonzu/smokey-bbq-patties.webp",
          },
        ],
      },
    ],
    contacts: [
      {
        name: "Travis Carruthers",
        role: "Australia contact",
        email: "travis@nextbite.com.au",
        phones: ["0430 952 494"],
      },
    ],
    sites: ["chalmersorganics.co.nz", "tonzu.co.nz", "nextbite.com.au"],
    note: "Foodservice packs available — contact to discuss bulk supply for catering and retail.",
  },

  /* ───────────────────────────── ZENZO ───────────────────────────── */
  {
    slug: "zenzo",
    name: "Zenzo",
    kicker: "Simple ingredients. Naturally plant-based.",
    since: "—",
    origin: "New Zealand",
    tagline: "Pure, cultured plant goodness.",
    story:
      "Zenzo creates beautifully simple dairy-free foods in New Zealand. At the heart of the range is naturally cultured coconut yoghurt — creamy, versatile and made with live vegan cultures — complemented by plant-based tofu, dairy-free mozzarella and convenient pantry favourites.",
    logo: "/brands/zenzo.webp",
    color: "#12897c",
    color2: "#4dbfae",
    icon: Amphora,
    categories: [
      {
        id: "coconut-cream-yoghurts",
        title: "Coconut Cream Yoghurts",
        tagline: "Live vegan cultures, every tub.",
        blurb:
          "Creamy cultured coconut yoghurt in retail and foodservice-friendly sizes.",
        icon: Milk,
        products: [
          {
            name: "Natural Yoghurt",
            size: "330g / 600g",
            temp: "CHILLED",
            desc: "Rich coconut yoghurt with live vegan cultures.",
            image: "/food-show/zenzo/natural-yoghurt.webp",
          },
          {
            name: "Vanilla Bean Yoghurt",
            size: "330g / 600g",
            temp: "CHILLED",
            desc: "Smooth coconut yoghurt with vanilla bean.",
            image: "/food-show/zenzo/vanilla-bean-yoghurt.webp",
          },
        ],
      },
      {
        id: "plant-based-tofu",
        title: "Plant-Based Tofu",
        tagline: "Simple, versatile, ready for anything.",
        blurb:
          "Zenzo-branded tofu made in Aotearoa — plain firm style and ready-marinated favourites.",
        icon: Bean,
        products: [
          {
            name: "Firm Style Plain Tofu",
            size: "300g",
            temp: "CHILLED",
            desc: "Cholesterol-free plant protein for frying, baking and scrambling.",
            image: "/food-show/zenzo/zenzo-tofu.webp",
          },
          {
            name: "Ginger & Honey Tofu",
            size: "375g",
            temp: "CHILLED",
            desc: "Marinated tofu with a zesty ginger-and-honey glaze.",
            image: "/food-show/zenzo/ginger-and-honey.webp",
          },
        ],
      },
      {
        id: "dairy-free-cheese",
        title: "Dairy-Free Cheese",
        tagline: "Handcrafted cheese alternative.",
        blurb: "100% New Zealand made and owned.",
        icon: Milk,
        products: [
          {
            name: "Mozzarella",
            size: "250g",
            temp: "CHILLED",
            desc: "Handcrafted dairy-free mozzarella that melts beautifully on pizza and toasties.",
            image: "/food-show/zenzo/mozzarella.webp",
          },
        ],
      },
      {
        id: "chefs-pantry-condiments",
        title: "Chef's Pantry Condiments",
        tagline: "Egg-free. Dairy-free. Kitchen-ready.",
        blurb: "Everyday plant-based staples built for busy kitchens.",
        icon: Utensils,
        products: [
          {
            name: "Egg-Free Aioli",
            size: "250g",
            temp: "CHILLED",
            desc: "Creamy garlic mayonnaise alternative without eggs or dairy.",
            image: "/food-show/zenzo/egg-free-aioli.webp",
          },
          {
            name: "Dairy-Free Sour Cream",
            size: "250g",
            temp: "CHILLED",
            desc: "Thick, tangy plant cream for dolloping, dipping and cooking.",
            image: "/food-show/zenzo/dairy-free-sour-cream.webp",
          },
        ],
      },
    ],
    contacts: [
      {
        name: "Travis Carruthers",
        role: "Australia contact",
        email: "travis@nextbite.com.au",
        phones: ["0430 952 494"],
      },
    ],
    sites: ["zenzo.co.nz", "nextbite.com.au"],
    note: "Foodservice bulk sizes available — contact to discuss catering requirements.",
  },
];

/* ─────────────────────────── SUPPORTING DATA ─────────────────────────── */

export const WHY_PARTNER = [
  "Four complementary plant-based brands",
  "Certified-organic and naturally cultured options",
  "Retail, trade and foodservice-ready formats",
  "Foodservice bulk sizes available — contact to discuss",
];

export const STORAGE = [
  {
    temp: "FROZEN" as Temp,
    label: "Keep Frozen",
    items: "Pizzas · Ready meals · Angel Food plant-based meat classics",
  },
  {
    temp: "CHILLED" as Temp,
    label: "Keep Chilled",
    items:
      "Dairy-free cheeses · Nutty Bay cultured cheeses, nut butters and vegan butter · Tonzu tofu, tempeh, sausages and patties · Zenzo tofu, yoghurts, mozzarella and condiments",
  },
];

/* ─────────────────────────── ENQUIRY CONTACTS ───────────────────────────
   Enquiry page par shobe ke hisaab se raabta. Ek shobe mein ek se
   zyada log ho sakte hain.
   ──────────────────────────────────────────────────────────────────── */

export type EnquiryContactPerson = {
  name: string;
  phones: string[];
  email: string;
};

export type EnquiryContactGroup = {
  area: string;
  /** card ka accent — orange se green tak, tarteeb ke saath */
  accent: string;
  people: EnquiryContactPerson[];
};

export const ENQUIRY_CONTACTS: EnquiryContactGroup[] = [
  {
    area: "Acquisition & Partnerships",
    accent: "#e07c0a",
    people: [
      {
        name: "Dion Campbell",
        phones: ["+61 473 236 105"],
        email: "dion@nextbite.com.au",
      },
    ],
  },
  {
    area: "Branding | International Partnership",
    accent: "#c68410",
    people: [
      {
        name: "Atif Sharjeel",
        phones: ["+61 481 317 161", "+65 8133 1443"],
        email: "atif@nextbite.com.au",
      },
    ],
  },
  {
    area: "Smart Shelf | Stock Checker",
    accent: "#a38d16",
    people: [
      {
        name: "Shaikh Siddiqui",
        phones: ["+61 430 496 430"],
        email: "shaikh@nextbite.com.au",
      },
    ],
  },
  {
    area: "Food and Distribution",
    accent: "#71891b",
    people: [
      {
        name: "Travis Carruthers",
        phones: ["+61 430 952 494"],
        email: "travis@nextbite.com.au",
      },
    ],
  },
  {
    area: "Media Marketing & IT Services",
    accent: "#3a8a1a",
    people: [
      {
        name: "Shaikh Siddiqui",
        phones: ["+61 430 496 430"],
        email: "shaikh@nextbite.com.au",
      },
      {
        name: "Atif Sharjeel",
        phones: ["+61 481 317 161", "+65 8133 1443"],
        email: "atif@nextbite.com.au",
      },
    ],
  },
];

export const DISTRIBUTION: {
  title: string;
  subtitle: string;
  contact: Contact;
}[] = [
  {
    title: "National & International Distribution",
    subtitle: "Distribution, wholesale and foodservice enquiries",
    contact: {
      name: "Travis Carruthers",
      email: "travis@nextbite.com.au",
      phones: ["0430 952 494"],
    },
  },
  {
    title: "International Distribution & Partnership",
    subtitle: "Export, licensing and partnership opportunities",
    contact: {
      name: "Atif Sharjeel",
      email: "atif@nextbite.com.au",
      phones: ["+61 481 317 161", "+65 8133 1443"],
    },
  },
];

export const ALL_SITES = [
  "angelfood.co.nz",
  "chalmersorganics.co.nz",
  "tonzu.co.nz",
  "zenzo.co.nz",
  "nuttybay.com.au",
  "nextbite.com.au",
  "smartshelf.co.nz",
];

/* ─────────────────────────── LINKS ─────────────────────────── */

/**
 * Site ka naam wohi rehta hai jo dikhta hai, par kuch domains kahin
 * aur khulte hain.
 *
 * tonzu.co.nz abhi jawab hi nahi deta — Tonzu ka asal site
 * chalmersorganics.co.nz par hai. Is liye label "tonzu.co.nz"
 * rehne diya, magar click wahan bhejta hai jahan safha maujood hai,
 * warna har click ek mari hui link par jata.
 */
const SITE_HREFS: Record<string, string> = {
  "tonzu.co.nz": "https://chalmersorganics.co.nz/",
};

export function siteHref(site: string) {
  return SITE_HREFS[site] ?? `https://${site}`;
}

/* ─────────────────────────── DERIVED ─────────────────────────── */

export const TOTAL_PRODUCTS = BRANDS.reduce(
  (n, b) => n + b.categories.reduce((m, c) => m + c.products.length, 0),
  0
);

export const TOTAL_CATEGORIES = BRANDS.reduce(
  (n, b) => n + b.categories.length,
  0
);

export function brandProductCount(brand: Brand) {
  return brand.categories.reduce((n, c) => n + c.products.length, 0);
}

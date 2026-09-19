import {
  Amphora,
  Beef,
  Cookie,
  Droplets,
  Leaf,
  type LucideIcon,
  Milk,
  Nut,
  Package,
  Pizza,
  Snowflake,
  Soup,
  Sprout,
  Thermometer,
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
   ke paas pack shots maujood hain.
   ═══════════════════════════════════════════════════════════════ */

export const SHOW = {
  name: "Fine Food Show",
  year: "2026",
  stand: "HB27",
  headline: "Three distinct brands. One exceptional plant-based portfolio.",
  intro:
    "From pioneering dairy-free favourites and artisan fermented nut cheeses to wholefood dips, dressings and dukkah.",
} as const;

export type Temp = "CHILLED" | "FROZEN" | "AMBIENT";

/** har haalat ka rang aur icon — chip, storage strip aur slideshow sab yahin se lete hain */
export const TEMP_META: Record<Temp, { tint: string; icon: LucideIcon }> = {
  CHILLED: { tint: "#12897c", icon: Thermometer },
  FROZEN: { tint: "#38a2e0", icon: Snowflake },
  AMBIENT: { tint: "#c68410", icon: Package },
};

/** rail filter — "ALL" plus the storage temps */
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

  /* ─────────────────────── FOODS FROM THE EDGE ─────────────────────── */
  {
    slug: "foods-from-the-edge",
    name: "Foods From The Edge",
    kicker: "Wholefood flavour. Made differently.",
    since: "—",
    origin: "South Australia",
    tagline: "Dips, dressings and dukkah with character.",
    story:
      "Foods From The Edge makes boldly flavoured dips, dressings and dukkah on the edge of the Adelaide Hills in South Australia. Every recipe starts with recognisable wholefood ingredients — vegetables, legumes, nuts, seeds, herbs and spices — made by Dips 2 U and developed with NextBite Brands for retail and foodservice across Australia and New Zealand.",
    logo: "/brands/foods-from-the-edge.webp",
    color: "#5b7a3c",
    color2: "#d9a43a",
    icon: Leaf,
    categories: [
      {
        id: "wholefood-dips",
        title: "Wholefood Dips",
        tagline: "A dip, spread and condiment in one.",
        blurb:
          "Distinctive dips built on vegetables, legumes and nuts — for crackers, sandwiches, grazing boards and shared tables.",
        icon: Soup,
        products: [
          {
            name: "Poppyseed Skordalia",
            temp: "CHILLED",
            desc: "Mediterranean-style potato dip with poppyseeds, roasted almonds, garlic and olive oil.",
            image: "/food-show/foods-from-the-edge/poppyseed-skordalia.webp",
          },
          {
            name: "Hommous",
            temp: "CHILLED",
            desc: "Classic chickpea dip with tahini, lemon, garlic and spices — vegan and gluten free.",
            image: "/food-show/foods-from-the-edge/hommous.webp",
          },
          {
            name: "French Artichoke",
            temp: "CHILLED",
            desc: "Artichokes and roasted cashews with garlic, dijon, yoghurt and parmesan.",
            image: "/food-show/foods-from-the-edge/french-artichoke.webp",
          },
          {
            name: "Cheesy Beetroot",
            temp: "CHILLED",
            desc: "Earthy beetroot blended with cream cheese, garlic and spices.",
            image: "/food-show/foods-from-the-edge/cheesy-beetroot.webp",
          },
          {
            name: "Sundried Tomato & Cashew",
            temp: "CHILLED",
            desc: "Sundried tomatoes and roasted cashews with cream cheese, garlic and coriander.",
            image: "/food-show/foods-from-the-edge/sundried-tomato-cashew.webp",
          },
        ],
      },
      {
        id: "dressings",
        title: "Dressings",
        tagline: "Enough flavour to change the plate.",
        blurb:
          "Ready-to-pour dressings and sauces for salads, bowls, vegetables and wraps.",
        icon: Droplets,
        products: [
          {
            name: "Attitude",
            size: "375ml",
            temp: "AMBIENT",
            desc: "The ultimate salad dressing and sauce — sugar free and low in salt.",
            image: "/food-show/foods-from-the-edge/attitude.webp",
          },
          {
            name: "Julius",
            size: "375ml",
            temp: "AMBIENT",
            desc: "The ultimate Caesar dressing with parmesan, garlic and anchovies.",
            image: "/food-show/foods-from-the-edge/julius.webp",
          },
          {
            name: "Tart",
            size: "375ml",
            temp: "AMBIENT",
            desc: "The ultimate balsamic vinaigrette — bright, sharp and vegan.",
            image: "/food-show/foods-from-the-edge/tart.webp",
          },
        ],
      },
      {
        id: "dukkah",
        title: "Dukkah",
        tagline: "Nuts, seeds and spice.",
        blurb:
          "Dip bread into olive oil, then dukkah — or scatter over vegetables, salads and hommous.",
        icon: Sprout,
        products: [
          {
            name: "Original Dukkah",
            temp: "CHILLED",
            desc: "Roasted almonds, sesame, coconut, coriander, fennel and cumin — vegan and gluten free.",
            image: "/food-show/foods-from-the-edge/original-dukkah.webp",
          },
          {
            name: "Spicy Dukkah",
            temp: "CHILLED",
            desc: "The original nut, seed and spice blend with extra white-pepper warmth.",
            image: "/food-show/foods-from-the-edge/spicy-dukkah.webp",
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
      {
        name: "Atif Sharjeel",
        role: "Orders & contact",
        email: "atif@nextbite.com.au",
        phones: ["+61 481 317 161"],
      },
    ],
    sites: ["nextbite.com.au"],
    note: "Foodservice formats and commercial pack sizes available — contact to discuss.",
  },
];

/* ─────────────────────────── SUPPORTING DATA ─────────────────────────── */

export const WHY_PARTNER = [
  "Three complementary plant-based brands",
  "Naturally cultured options",
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
      "Dairy-free cheeses · Nutty Bay cultured cheeses, nut butters and vegan butter · Foods From The Edge dips and dukkah",
  },
  {
    temp: "AMBIENT" as Temp,
    label: "Store Ambient",
    items: "Foods From The Edge dressings — pantry stable, no refrigeration needed",
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
  /** card ka accent */
  accent: string;
  /** pehli qatar mein akela, bare naap ke saath */
  featured?: boolean;
  people: EnquiryContactPerson[];
};

export const ENQUIRY_CONTACTS: EnquiryContactGroup[] = [
  {
    area: "Food service and distribution",
    accent: "#3a8a1a",
    /* pehli qatar mein akela aur numaya */
    featured: true,
    people: [
      {
        name: "Travis Carruthers",
        phones: ["+61 430 952 494"],
        email: "travis@nextbite.com.au",
      },
    ],
  },
  {
    area: "International branding and partnership",
    accent: "#e07c0a",
    people: [
      {
        name: "Atif Sharjeel",
        phones: ["+61 481 317 161", "+65 8133 1443"],
        email: "atif@nextbite.com.au",
      },
    ],
  },
  {
    area: "Smartshelf and IT services",
    accent: "#c68410",
    people: [
      {
        name: "Shaikh Siddiqui",
        phones: ["+61 430 496 430"],
        email: "shaikh@nextbite.com.au",
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
  "nuttybay.com.au",
  "nextbite.com.au",
  "smartshelf.co.nz",
];

/* ─────────────────────────── LINKS ─────────────────────────── */

/**
 * Site ka naam wohi rehta hai jo dikhta hai, par kuch domains kahin
 * aur khulte hain — aisa domain yahan label → asal URL likho.
 */
const SITE_HREFS: Record<string, string> = {};

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

import { BRANDS, type Brand, type Category, type Product } from "./data";

/* ═══════════════════════════════════════════════════════════════
   SLIDESHOW DECK
   Data se slides khud ban jati hain — koi manual list nahi.
   Nayi product ya category add karo, deck automatically update.

   Do modes:
     overview  → ek slide par poori category (grid)
     spotlight → har product ki apni alag slide
   ═══════════════════════════════════════════════════════════════ */

/** overview mode mein ek slide par zyada se zyada itne products */
const PER_SLIDE = 8;

export type DeckMode = "overview" | "spotlight";

export type Slide =
  | { kind: "intro"; id: string }
  | { kind: "brand"; id: string; brand: Brand }
  | {
      kind: "products";
      id: string;
      brand: Brand;
      category: Category;
      products: Product[];
      /** "2 / 3" jab ek category kai slides par phaili ho */
      part?: { current: number; total: number };
    }
  | {
      kind: "product";
      id: string;
      brand: Brand;
      category: Category;
      product: Product;
      /** is brand ke andar product ka number — "3 / 21" */
      position: { current: number; total: number };
    }
  | { kind: "storage"; id: string }
  | { kind: "contact"; id: string };

function chunk<T>(list: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

export function buildDeck(mode: DeckMode = "overview"): Slide[] {
  const slides: Slide[] = [{ kind: "intro", id: "intro" }];

  for (const brand of BRANDS) {
    slides.push({ kind: "brand", id: `brand-${brand.slug}`, brand });

    if (mode === "spotlight") {
      const total = brand.categories.reduce(
        (n, c) => n + c.products.length,
        0
      );
      let current = 0;

      for (const category of brand.categories) {
        for (const product of category.products) {
          current += 1;
          slides.push({
            kind: "product",
            id: `${brand.slug}-${category.id}-${product.name}`,
            brand,
            category,
            product,
            position: { current, total },
          });
        }
      }
      continue;
    }

    for (const category of brand.categories) {
      const parts = chunk(category.products, PER_SLIDE);

      parts.forEach((products, i) => {
        slides.push({
          kind: "products",
          id: `${brand.slug}-${category.id}-${i}`,
          brand,
          category,
          products,
          part:
            parts.length > 1
              ? { current: i + 1, total: parts.length }
              : undefined,
        });
      });
    }
  }

  slides.push({ kind: "storage", id: "storage" });
  slides.push({ kind: "contact", id: "contact" });

  return slides;
}

/** har slide ka accent — progress bar aur background wash ke liye */
export function slideAccent(slide: Slide): [string, string] {
  if (
    slide.kind === "brand" ||
    slide.kind === "products" ||
    slide.kind === "product"
  ) {
    return [slide.brand.color, slide.brand.color2];
  }
  return ["#e07c0a", "#3a8a1a"];
}

/** kis brand ki slide hai — mode badalne par jagah barqarar rakhne ke liye */
export function slideBrandSlug(slide: Slide): string | null {
  if (
    slide.kind === "brand" ||
    slide.kind === "products" ||
    slide.kind === "product"
  ) {
    return slide.brand.slug;
  }
  return null;
}

/**
 * Mode badalte waqt user ko wahin rakho jahan woh tha —
 * usi brand (aur ho sake to usi product) par.
 */
export function mapIndexAcrossModes(
  from: Slide[],
  to: Slide[],
  index: number
): number {
  const current = from[index];
  if (!current) return 0;

  /* exact same slide mile to sabse behtar */
  const exact = to.findIndex((s) => s.id === current.id);
  if (exact !== -1) return exact;

  /* warna usi product ka pehla zikr */
  const productName =
    current.kind === "product"
      ? current.product.name
      : current.kind === "products"
        ? current.products[0]?.name
        : null;

  if (productName) {
    const byProduct = to.findIndex(
      (s) =>
        (s.kind === "product" && s.product.name === productName) ||
        (s.kind === "products" &&
          s.products.some((p) => p.name === productName))
    );
    if (byProduct !== -1) return byProduct;
  }

  /* warna usi brand ki pehli slide */
  const slug = slideBrandSlug(current);
  if (slug) {
    const byBrand = to.findIndex((s) => slideBrandSlug(s) === slug);
    if (byBrand !== -1) return byBrand;
  }

  /* aakhri sahara — same kind */
  const byKind = to.findIndex((s) => s.kind === current.kind);
  return byKind === -1 ? 0 : byKind;
}

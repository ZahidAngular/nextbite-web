/* Legal documents ka dhancha — har doc isi shakal mein likha jata hai */
export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] };

export type LegalSection = { id: string; title: string; blocks: LegalBlock[] };

export type LegalDoc = {
  title: string;
  updated: string;
  intro: LegalBlock[];
  sections: LegalSection[];
};

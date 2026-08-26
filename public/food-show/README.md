# Product photos — Fine Food Show 2026

Sab tasveerein **local** hain — kisi brand site se hotlink nahi ki gayin.
Har file `webp` mein convert ki gayi (max 1200px) aur brand ke folder mein
rakhi gayi hai.

```
public/brands/          angel-food · nutty-bay · tonzu · zenzo   (4 logos)
public/food-show/
  angel-food/           17 pack shots
  nutty-bay/             9 pack shots
  tonzu/                 8 pack shots
  zenzo/                 4 pack shots
```

**38 / 44 products** ki asli tasveer lagi hui hai. Paths
`components/food-show/data.ts` mein har product ke `image` field par hain.

## Abhi tasveer ke baghair (6 products)

| Brand | Products | Wajah |
|---|---|---|
| Angel Food | Veg Trio, Pizza Parmigiana, Mediterranean, Mediterranean 2 | Pizzas NZ site par nahi (Orogel collab, Australia-only) |
| Tonzu | Ginger & Honey Tofu, Herb Tofu Nuggets | chalmersorganics.co.nz par listed nahi |

In par brand-colour placeholder khud render hota hai.

## Pack shots kaise dikhti hain

Frame **square** hai aur image `object-contain` par — is liye poora pack
nazar aata hai, kata hua nahi. Tasveerein 0.83 (lamba tub) se 1.34
(chaura pack) tak ke ratios mein hain, aur `cover` un sab ko kaat deta.

Neeche **safed tile** hai kyunke 28 tasveerein transparent cut-outs hain
(retail pack shots safed par hi shoot hoti hain) aur baqi 6 apna halka
background rakhti hain jo ismein ghul jata hai. CHILLED/FROZEN chip is
tile par `onLight` mode mein chalti hai taake dono themes mein parhi jaye.

## Nayi tasveer add karni ho

1. File ko `public/food-show/<brand>/` mein daalo.
2. `components/food-show/data.ts` mein us product par likho:

```ts
{
  name: "Veg Trio",
  temp: "FROZEN",
  desc: "...",
  image: "/food-show/angel-food/veg-trio.webp",   // <- yeh line
}
```

Tips:
- Square ya us ke qareeb best — frame square hai.
- 1000–1200px chaurai kaafi hai.
- Transparent PNG behtareen; webp mein alpha bach jata hai.
- Agar cut-out ke kinaron par safed dhabbe hon (jaise Zenzo sour cream
  mein thay), unko hata dena — warna safed tile par bhi nazar aate hain.

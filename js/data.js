/* =====================================================================
   SALEEM CAPS — catalogue data & store configuration
   ---------------------------------------------------------------------
   PRICE: every cap is ₦18,000 by default. The administrator can change
   any price (and the default price) from the Admin Dashboard.
   The 19 records below map 1:1 to the 19 original product photographs.
   Replace images/caps/cap-01.svg … cap-19.svg with the original photos
   (keep the same file names) OR upload photos in the Admin Dashboard.
   ===================================================================== */

window.SALEEM_CONFIG = {
  businessName: "SALEEM CAPS",
  tagline: "QUALITY • STYLE • TRADITION",
  currency: "NGN",
  currencySymbol: "₦",
  defaultPrice: 18000,
  phone: "08138096960",
  whatsapp: "2348138096960",           // international format, no + or spaces
  whatsappDisplay: "+234 813 809 6960",
  email: "amirusaleem442@gmail.com",
  address: "Laying Makera, Kafur Local Government Area, Masari Ward.",
  addressShort: "Laying Makera, Kafur LGA, Katsina State",
  hours: "Mon – Sat · 8:00am – 7:00pm (WAT)",
  deliveryFee: 0,                       // ₦0 = free nationwide delivery (admin editable)
  adminPasswordHash: "",                // set on first run (default password below)
  adminDefaultPassword: "saleem2026",
  version: 1
};

/* The 19 original cap photographs — size distribution is fixed by the brand:
   21½ ×1 · 22 ×5 · 22½ ×7 · 23 ×4 · 23½ ×1 · 24 ×1  */
window.SALEEM_SEED_PRODUCTS = [
  {
    id: "cap-01", sku: "SC-001", name: "Sarkin Sarauta", size: "21.5",
    price: 18000, image: "images/caps/cap-01.svg", gallery: ["images/caps/cap-01.svg"],
    featured: true, isNew: false, inStock: true, stockQty: 3,
    colorway: "Emerald & Gold", description:
      "The 'Chief of Chieftaincy' — our most ceremonial kufi, embroidered in deep emerald on a hand-finished crown with a metallic gold crest. Reserved for the moments that deserve presence.",
    material: "Premium cotton damask · Metallic gold thread",
    care: "Spot clean with a soft damp cloth. Store in the dust bag provided, away from direct sunlight."
  },
  {
    id: "cap-02", sku: "SC-002", name: "Makera Heritage", size: "22",
    price: 18000, image: "images/caps/cap-02.svg", gallery: ["images/caps/cap-02.svg"],
    featured: true, isNew: false, inStock: true, stockQty: 4,
    colorway: "Obsidian & Gold", description:
      "A tribute to our home at Laying Makera. Jet-black embroidery with a restrained gold medallion — the quiet luxury of a cap that suits everything.",
    material: "Premium cotton damask · Metallic gold thread",
    care: "Spot clean with a soft damp cloth. Reshape while damp and air-dry."
  },
  {
    id: "cap-03", sku: "SC-003", name: "Kafur Royal", size: "22",
    price: 18000, image: "images/caps/cap-03.svg", gallery: ["images/caps/cap-03.svg"],
    featured: false, isNew: false, inStock: true, stockQty: 3,
    colorway: "Forest Green & Gold", description:
      "Hand-embroidered forest green with a clean gold band — the everyday royal. Pairs beautifully with white babbar riga and dark kaftan alike.",
    material: "Premium cotton damask · Metallic gold thread",
    care: "Spot clean only. Keep away from perfume and oils."
  },
  {
    id: "cap-04", sku: "SC-004", name: "Zaria Classic", size: "22",
    price: 18000, image: "images/caps/cap-04.svg", gallery: ["images/caps/cap-04.svg"],
    featured: true, isNew: false, inStock: true, stockQty: 5,
    colorway: "Ivory & Antique Gold", description:
      "Ivory-on-ivory embroidery with antique gold accents — the cap for weddings, Eid and Friday Jumu'ah. Light, breathable and effortlessly distinguished.",
    material: "Premium cotton damask · Antique gold thread",
    care: "Spot clean with a soft damp cloth. Do not machine wash."
  },
  {
    id: "cap-05", sku: "SC-005", name: "Daura Emblem", size: "22",
    price: 18000, image: "images/caps/cap-05.svg", gallery: ["images/caps/cap-05.svg"],
    featured: false, isNew: false, inStock: true, stockQty: 2,
    colorway: "Onyx & Gold", description:
      "A geometric emblem inspired by Hausa architectural pattern work, stitched in gold on deep onyx. Sharp, modern, unmistakably traditional.",
    material: "Premium cotton damask · Metallic gold thread",
    care: "Spot clean only. Store flat in the dust bag."
  },
  {
    id: "cap-06", sku: "SC-006", name: "Katsina Crest", size: "22",
    price: 18000, image: "images/caps/cap-06.svg", gallery: ["images/caps/cap-06.svg"],
    featured: false, isNew: false, inStock: true, stockQty: 4,
    colorway: "Deep Emerald & Gold", description:
      "Deep emerald with a crest medallion at the crown — subtle from a distance, extraordinary up close. One of our most requested designs.",
    material: "Premium cotton damask · Metallic gold thread",
    care: "Spot clean with a soft damp cloth. Air-dry away from heat."
  },
  {
    id: "cap-07", sku: "SC-007", name: "Sokoto Regal", size: "22.5",
    price: 18000, image: "images/caps/cap-07.svg", gallery: ["images/caps/cap-07.svg"],
    featured: true, isNew: false, inStock: true, stockQty: 6,
    colorway: "Emerald & Champagne Gold", description:
      "A regal emerald silhouette with champagne-gold banding. Our best-seller in the 22½ size — the cap that finishes the outfit.",
    material: "Premium cotton damask · Metallic gold thread",
    care: "Spot clean only. Reshape while damp and air-dry."
  },
  {
    id: "cap-08", sku: "SC-008", name: "Kano Signature", size: "22.5",
    price: 18000, image: "images/caps/cap-08.svg", gallery: ["images/caps/cap-08.svg"],
    featured: false, isNew: false, inStock: true, stockQty: 4,
    colorway: "Onyx & Gold", description:
      "City-tailored minimalism. Fine gold stitching over a matte black ground, finished with a hand-rolled band.",
    material: "Premium cotton damask · Metallic gold thread",
    care: "Spot clean with a soft damp cloth. Do not soak."
  },
  {
    id: "cap-09", sku: "SC-009", name: "Hausa Noble", size: "22.5",
    price: 18000, image: "images/caps/cap-09.svg", gallery: ["images/caps/cap-09.svg"],
    featured: false, isNew: false, inStock: true, stockQty: 3,
    colorway: "Ivory & Gold", description:
      "Classic ivory with gold filigree — the traditional choice for naming ceremonies and religious occasions.",
    material: "Premium cotton damask · Metallic gold thread",
    care: "Spot clean only. Keep away from coloured fabrics when damp."
  },
  {
    id: "cap-10", sku: "SC-010", name: "Sarki Elegance", size: "22.5",
    price: 18000, image: "images/caps/cap-10.svg", gallery: ["images/caps/cap-10.svg"],
    featured: true, isNew: false, inStock: true, stockQty: 5,
    colorway: "Deep Green & Gold", description:
      "Cut for the man who leads. A taller crown profile with dense embroidery at the band and a polished gold medallion.",
    material: "Premium cotton damask · Metallic gold thread",
    care: "Spot clean only. Store in the dust bag provided."
  },
  {
    id: "cap-11", sku: "SC-011", name: "Masari Prestige", size: "22.5",
    price: 18000, image: "images/caps/cap-11.svg", gallery: ["images/caps/cap-11.svg"],
    featured: false, isNew: false, inStock: true, stockQty: 3,
    colorway: "Black & Gold", description:
      "Named for Masari Ward, where SALEEM CAPS was born. Black ground, gold geometry, impeccable finishing.",
    material: "Premium cotton damask · Metallic gold thread",
    care: "Spot clean with a soft damp cloth. Air-dry away from heat."
  },
  {
    id: "cap-12", sku: "SC-012", name: "Arewa Grand", size: "22.5",
    price: 18000, image: "images/caps/cap-12.svg", gallery: ["images/caps/cap-12.svg"],
    featured: false, isNew: false, inStock: true, stockQty: 4,
    colorway: "Emerald & Gold", description:
      "A grand northern silhouette with generous embroidery across the crown — confident, comfortable and beautifully balanced.",
    material: "Premium cotton damask · Metallic gold thread",
    care: "Spot clean only. Do not machine wash."
  },
  {
    id: "cap-13", sku: "SC-013", name: "Danfodio Legacy", size: "22.5",
    price: 18000, image: "images/caps/cap-13.svg", gallery: ["images/caps/cap-13.svg"],
    featured: false, isNew: true, inStock: true, stockQty: 3,
    colorway: "Heritage Green & Gold", description:
      "Part of our newest release: heritage green cloth with a woven gold legacy motif at the crown. Limited to this season.",
    material: "Premium cotton damask · Metallic gold thread",
    care: "Spot clean only. Store flat in the dust bag."
  },
  {
    id: "cap-14", sku: "SC-014", name: "Galadima Gold", size: "23",
    price: 18000, image: "images/caps/cap-14.svg", gallery: ["images/caps/cap-14.svg"],
    featured: true, isNew: true, inStock: true, stockQty: 4,
    colorway: "Black & Gold", description:
      "Our gold-forward flagship. Dense metallic embroidery over black cloth, finished by hand — a statement at any event.",
    material: "Premium cotton damask · Metallic gold thread",
    care: "Spot clean only. Avoid folding the embroidered band."
  },
  {
    id: "cap-15", sku: "SC-015", name: "Alkali Ivory", size: "23",
    price: 18000, image: "images/caps/cap-15.svg", gallery: ["images/caps/cap-15.svg"],
    featured: false, isNew: true, inStock: true, stockQty: 3,
    colorway: "Ivory & Gold", description:
      "Refined ivory for daylight ceremonies. Soft, breathable and finished with a slim gold band.",
    material: "Premium cotton damask · Metallic gold thread",
    care: "Spot clean only. Store away from direct sunlight."
  },
  {
    id: "cap-16", sku: "SC-016", name: "Tafawa Noble", size: "23",
    price: 18000, image: "images/caps/cap-16.svg", gallery: ["images/caps/cap-16.svg"],
    featured: false, isNew: true, inStock: true, stockQty: 2,
    colorway: "Forest & Gold", description:
      "Forest green with a fine-gauge gold weave. Understated, elegant and endlessly wearable.",
    material: "Premium cotton damask · Metallic gold thread",
    care: "Spot clean with a soft damp cloth. Air-dry away from heat."
  },
  {
    id: "cap-17", sku: "SC-017", name: "Amir Supreme", size: "23",
    price: 18000, image: "images/caps/cap-17.svg", gallery: ["images/caps/cap-17.svg"],
    featured: true, isNew: false, inStock: true, stockQty: 3,
    colorway: "Deep Emerald & Gold", description:
      "The 23 size, perfected. A taller crown, denser embroidery and a gold medallion that catches light beautifully.",
    material: "Premium cotton damask · Metallic gold thread",
    care: "Spot clean only. Keep away from perfume and oils."
  },
  {
    id: "cap-18", sku: "SC-018", name: "Zaki Royal", size: "23.5",
    price: 18000, image: "images/caps/cap-18.svg", gallery: ["images/caps/cap-18.svg"],
    featured: true, isNew: true, inStock: true, stockQty: 2,
    colorway: "Black & Gold", description:
      "A rare size and a rare finish. One piece in this size — black cloth with a complete gold crown motif.",
    material: "Premium cotton damask · Metallic gold thread",
    care: "Spot clean only. Store flat in the dust bag."
  },
  {
    id: "cap-19", sku: "SC-019", name: "Bakandamiya", size: "24",
    price: 18000, image: "images/caps/cap-19.svg", gallery: ["images/caps/cap-19.svg"],
    featured: true, isNew: true, inStock: true, stockQty: 2,
    colorway: "Emerald & Gold", description:
      "Our largest size, made for a commanding fit. Full emerald crown with a gold band and a hand-set emblem.",
    material: "Premium cotton damask · Metallic gold thread",
    care: "Spot clean only. Reshape while damp and air-dry."
  }
];

window.SALEEM_SIZE_ORDER = ["21.5", "22", "22.5", "23", "23.5", "24"];

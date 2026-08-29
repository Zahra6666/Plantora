const plants = [
  {
    id: "monstera",
    name: "مونستيرا",
    scientificName: "Monstera Deliciosa",
    image:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",

    light: "ضوء ساطع غير مباشر",
    watering: "كل 7–10 أيام",
    soil: "تربة جيدة التصريف",

    careLevel: "medium",
    size: "large",
    location: "living-room",

    tags: [
      "tropical",
      "indoor",
      "decorative",
    ],

    matchPreferences: {
      light: "medium",
      careLevel: "medium",
      watering: "sometimes",
      size: "large",
      location: "living-room",
    },
  },

  {
    id: "snake-plant",
    name: "نبات الثعبان",
    scientificName: "Sansevieria",
    image:
      "https://images.unsplash.com/photo-1593482892290-f54927ae2c9f?auto=format&fit=crop&w=800&q=80",

    light: "منخفض إلى ساطع غير مباشر",
    watering: "كل 2–3 أسابيع",
    soil: "تربة جيدة التصريف",

    careLevel: "low",
    size: "medium",
    location: "bedroom",

    tags: [
      "easy-care",
      "indoor",
      "low-light",
    ],

    matchPreferences: {
      light: "low",
      careLevel: "low",
      watering: "rarely",
      size: "medium",
      location: "bedroom",
    },
  },

  {
    id: "aloe-vera",
    name: "الألوفيرا",
    scientificName: "Aloe Vera",
    image:
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80",

    light: "ضوء ساطع",
    watering: "كل 2–3 أسابيع",
    soil: "تربة رملية جيدة التصريف",

    careLevel: "low",
    size: "small",
    location: "bedroom",

    tags: [
      "succulent",
      "easy-care",
      "sun-loving",
    ],

    matchPreferences: {
      light: "bright",
      careLevel: "low",
      watering: "rarely",
      size: "small",
      location: "bedroom",
    },
  },

  {
    id: "pothos",
    name: "البوثوس",
    scientificName: "Epipremnum Aureum",
    image:
      "https://images.unsplash.com/photo-1616764067958-f2c6f6c2b6b4?auto=format&fit=crop&w=800&q=80",

    light: "ضوء متوسط إلى منخفض",
    watering: "كل 7–10 أيام",
    soil: "تربة جيدة التصريف",

    careLevel: "low",
    size: "medium",
    location: "office",

    tags: [
      "easy-care",
      "indoor",
      "office",
    ],

    matchPreferences: {
      light: "low",
      careLevel: "low",
      watering: "sometimes",
      size: "medium",
      location: "office",
    },
  },

  {
    id: "peace-lily",
    name: "زنبق السلام",
    scientificName: "Spathiphyllum",
    image:
      "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=800&q=80",

    light: "ضوء متوسط غير مباشر",
    watering: "كل 5–7 أيام",
    soil: "تربة رطبة جيدة التصريف",

    careLevel: "medium",
    size: "medium",
    location: "living-room",

    tags: [
      "flowering",
      "indoor",
      "tropical",
    ],

    matchPreferences: {
      light: "medium",
      careLevel: "medium",
      watering: "often",
      size: "medium",
      location: "living-room",
    },
  },

  {
    id: "zz-plant",
    name: "نبات ZZ",
    scientificName: "Zamioculcas Zamiifolia",
    image:
      "https://images.unsplash.com/photo-1632207691144-4e4c4f5f8e4b?auto=format&fit=crop&w=800&q=80",

    light: "ضوء منخفض إلى متوسط",
    watering: "كل 2–3 أسابيع",
    soil: "تربة جيدة التصريف",

    careLevel: "low",
    size: "medium",
    location: "office",

    tags: [
      "easy-care",
      "low-light",
      "office",
    ],

    matchPreferences: {
      light: "low",
      careLevel: "low",
      watering: "rarely",
      size: "medium",
      location: "office",
    },
  },
];

export default plants;
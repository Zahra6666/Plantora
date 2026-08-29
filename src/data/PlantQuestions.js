const plantQuestions = [
  {
    id: 1,
    category:"light",
    question: "كم مقدار ضوء الشمس في منزلك؟",
    description: "اختاري مستوى الإضاءة الأقرب للمكان الذي ستضعين فيه النبتة.",
    options: [
      {
        id: "bright",
        icon: "☀️",
        title: "ضوء قوي",
        description: "شمس مباشرة أو إضاءة قوية معظم اليوم",
        value: "bright",
      },
      {
        id: "medium",
        icon: "🌤️",
        title: "ضوء متوسط",
        description: "إضاءة جيدة لكن بدون شمس مباشرة طوال اليوم",
        value: "medium",
      },
      {
        id: "low",
        icon: "🌥️",
        title: "ضوء قليل",
        description: "المكان بعيد عن النوافذ أو إضاءته محدودة",
        value: "low",
      },
    ],
  },

  {
    id: 2,
    category:"careLevel",
    question: "كم مرة تستطيعين الاهتمام بالنبات؟",
    description: "اختاري مستوى العناية الذي يناسب روتينك اليومي.",
    options: [
      {
        id: "high",
        icon: "💚",
        title: "أحب العناية بالنباتات",
        description: "أستطيع متابعتها بشكل منتظم",
        value: "high",
      },
      {
        id: "medium",
        icon: "🌿",
        title: "عناية متوسطة",
        description: "أستطيع الاهتمام بها عدة مرات في الأسبوع",
        value: "medium",
      },
      {
        id: "low",
        icon: "✨",
        title: "أريد نباتًا سهلًا",
        description: "أفضل نباتًا لا يحتاج إلى اهتمام مستمر",
        value: "low",
      },
    ],
  },

  {
    id: 3,
     category:"watering",
    question: "كم مرة تتذكرين سقي النباتات؟",
    description: "هذا يساعدنا على معرفة النباتات التي تناسب روتينك.",
    options: [
      {
        id: "often",
        icon: "💧",
        title: "بشكل متكرر",
        description: "أستطيع تذكر السقي بانتظام",
        value: "often",
      },
      {
        id: "sometimes",
        icon: "🌱",
        title: "أحيانًا",
        description: "قد أنسى السقي من وقت لآخر",
        value: "sometimes",
      },
      {
        id: "rarely",
        icon: "🏜️",
        title: "نادراً",
        description: "أفضل النباتات التي تتحمل قلة الماء",
        value: "rarely",
      },
    ],
  },

  {
    id: 4,
     category:"experience",
    question: "ما مستوى خبرتك في العناية بالنباتات؟",
    description: "لا تقلقي، لا توجد إجابة صحيحة أو خاطئة.",
    options: [
      {
        id: "beginner",
        icon: "🌱",
        title: "مبتدئة",
        description: "هذه بداية رحلتي مع النباتات",
        value: "beginner",
      },
      {
        id: "intermediate",
        icon: "🪴",
        title: "متوسطة",
        description: "لدي بعض الخبرة في العناية بالنباتات",
        value: "intermediate",
      },
      {
        id: "advanced",
        icon: "🌿",
        title: "لدي خبرة جيدة",
        description: "أعرف الكثير عن النباتات والعناية بها",
        value: "advanced",
      },
    ],
  },

  {
    id: 5,
     category:"location",
    question: "أين تريدين وضع النبتة؟",
    description: "اختاري المكان الأقرب لاحتياجك.",
    options: [
      {
        id: "bedroom",
        icon: "🛏️",
        title: "غرفة النوم",
        description: "نبات صغير يضيف لمسة طبيعية للمكان",
        value: "bedroom",
      },
      {
        id: "living-room",
        icon: "🛋️",
        title: "غرفة المعيشة",
        description: "نبات يضيف حضورًا واضحًا للمساحة",
        value: "living-room",
      },
      {
        id: "office",
        icon: "💻",
        title: "المكتب",
        description: "نبات مناسب لمساحة العمل",
        value: "office",
      },
    ],
  },

  {
    id: 6,
     category:"size",
    question: "ما حجم النبات الذي تفضلينه؟",
    description: "اختاري الحجم الذي يناسب المساحة المتوفرة لديك.",
    options: [
      {
        id: "small",
        icon: "🌱",
        title: "صغير",
        description: "مناسب للمكاتب والطاولات والرفوف",
        value: "small",
      },
      {
        id: "medium",
        icon: "🪴",
        title: "متوسط",
        description: "مناسب للزوايا والمساحات المتوسطة",
        value: "medium",
      },
      {
        id: "large",
        icon: "🌴",
        title: "كبير",
        description: "أريد نباتًا يكون جزءًا واضحًا من الديكور",
        value: "large",
      },
    ],
  },
];

export default plantQuestions;
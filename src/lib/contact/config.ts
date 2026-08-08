export const CONTACT_CONFIG = {
  name: "Cristian Văduva",
  email: "cristianvaduva@duck.com",
  phoneRo: "0767110439",
  phoneRoDisplay: "0767 110 439",
  phoneRoIntl: "+40767110439",
  phoneWa: "+43 650 953 6345",
  phoneWaDisplay: "+43 650 953 6345",
  phoneWaRaw: "436509536345",
  office: "București, România",
  officeFull: "București, România",

  // Exact public URLs from cristianvaduva.com
  socialUrls: {
    whatsapp: "https://wa.me/436509536345",
    telegram: "https://t.me/CristianVaduva",
    telegramChannel: "https://t.me/capitalinvestcristianvaduva",
    linktree: "https://linktr.ee/cristianvaduvarealestate",
    instagram: "https://instagram.com/cristian_vaduva_cristianv",
    facebook: "https://www.facebook.com/CristianVaduvaCV",
    linkedin: "https://www.linkedin.com/in/cristianvăduva",
    youtube: "https://youtube.com/@CristianVaduvaCV",
  },

  links: {
    email: "mailto:cristianvaduva@duck.com",
    telRo: "tel:+40767110439",
    whatsapp: "https://wa.me/436509536345",
    whatsappWithMessage: (text: string) => `https://wa.me/436509536345?text=${encodeURIComponent(text)}`,
  },

  labels: {
    consultationCTA: "Consultanță Gratuită cu Cristian Văduva",
    whatsappCTA: "Contact pe WhatsApp",
    phoneCTA: "Apelează 0767 110 439",
  },
} as const;

export type ContactConfig = typeof CONTACT_CONFIG;

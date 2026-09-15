// API anahtari yokken demo'nun bos gorunmemesi icin basit yedek mod.
// Anahtar tanimliysa bu dosya hic calismaz.
const KALIPLAR = [
  {
    ara: /(fiyat|ne kadar|ücret|price|cost|how much|كم|سعر|preis|цена)/i,
    tr: "Net fiyat için ağız içi fotoğrafınıza bakmamız gerekiyor. Dişlerinizin ön ve yan taraftan 2 fotoğrafını gönderebilir misiniz? Hekimimiz bugün içinde size net rakamı yazacak.",
    en: "For an exact price our dentist needs to see your teeth first. Could you send 2 photos — front and side view? He will send you the exact quote today.",
  },
  {
    ara: /(implant|implantat|имплант|زراعة)/i,
    tedavi: "İmplant",
    tr: "İmplant için ilk seans yaklaşık 1 saat sürüyor, 3 ay sonra üst yapı için ikinci seansa geliyorsunuz. Kaç dişiniz eksik?",
    en: "The first implant session takes about an hour, and you come back after 3 months for the crowns. How many teeth are missing?",
  },
  {
    ara: /(randevu|appointment|termin|запись|موعد)/i,
    tr: "Tabii, bu hafta Salı 11:30, Çarşamba 14:00 ve Perşembe 16:30 müsait. Hangisi size uygun olur?",
    en: "Of course — Tuesday 11:30, Wednesday 14:00 and Thursday 16:30 are available this week. Which one works for you?",
  },
  {
    ara: /(zirkon|kaplama|veneer|smile|gülüş|هوليوود)/i,
    tedavi: "Zirkonyum / gülüş tasarımı",
    tr: "Zirkonyum kaplama 4-5 iş günü sürüyor, 2 randevuyla tamamlanıyor. Kaç dişi düşünüyorsunuz?",
    en: "Zirconia crowns take 4-5 working days across 2 appointments. How many teeth are you considering?",
  },
];

const VARSAYILAN = {
  tr: "Merhaba, hoş geldiniz. Size nasıl yardımcı olabilirim? Hangi tedaviyi düşünüyorsunuz?",
  en: "Hello and welcome. How can I help you today? Which treatment are you considering?",
};

// Sadece Ingilizceye ozgu islev kelimeleri sinyal sayilir. "implant", "price" gibi
// kelimeler Turkce cumlede de gecebildigi icin listeye alinmadi.
const INGILIZCE_KELIMELER = /\b(the|how|much|what|when|where|hello|hi|please|thanks|my|me|you|your|is|are|do|does|can|could|would|want|need|for|with|about)\b/gi;

function ingilizceMi(metin) {
  if (/[çğıöşüÇĞİÖŞÜ]/.test(metin)) return false;
  if (!/[a-z]/i.test(metin)) return false; // Arapca, Rusca vs.
  const eslesenler = new Set((metin.match(INGILIZCE_KELIMELER) || []).map((k) => k.toLowerCase()));
  return eslesenler.size >= 2;
}

export function yedekCevap(sonMesaj) {
  const dil = ingilizceMi(sonMesaj) ? "en" : "tr";
  const eslesme = KALIPLAR.find((k) => k.ara.test(sonMesaj));
  const mesaj = eslesme ? eslesme[dil] : VARSAYILAN[dil];
  return {
    mesaj,
    lead: {
      isim: "",
      dil: dil === "en" ? "İngilizce" : "Türkçe",
      tedavi: eslesme?.tedavi ?? "",
      ulke: "",
      tarih: "",
      durum: "yeni",
      ozet: "Yedek mod — gerçek cevaplar için ANTHROPIC_API_KEY tanımlayın.",
    },
    yedekMod: true,
  };
}

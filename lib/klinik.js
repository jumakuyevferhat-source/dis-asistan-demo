// Demo klinik profili. Gercek satista bu dosya her klinik icin doldurulur.
export const KLINIK = {
  ad: "Demo Diş Kliniği",
  semt: "Nişantaşı, Şişli / İstanbul",
  calismaSaatleri: "Hafta içi 09:00-19:00, Cumartesi 10:00-16:00. Pazar kapalı.",
  diller: ["Türkçe", "İngilizce", "Arapça", "Almanca", "Rusça"],
  tedaviler: [
    { ad: "İmplant", sure: "1. seans 1 saat, 3 ay sonra 2. seans", not: "Tek seansta 6 implanta kadar yapılabiliyor." },
    { ad: "Zirkonyum kaplama", sure: "4-5 iş günü, 2 randevu", not: "Ölçü alındıktan sonra provalar 3. gün." },
    { ad: "Gülüş tasarımı (Hollywood Smile)", sure: "5-7 iş günü", not: "Önce dijital tasarım gösteriliyor, hasta onaylamadan üretime geçilmiyor." },
    { ad: "Diş beyazlatma", sure: "1 seans, 45 dakika", not: "" },
    { ad: "Ortodonti / şeffaf plak", sure: "6-18 ay", not: "İlk muayene + 3B tarama gerekiyor." },
    { ad: "Kanal tedavisi", sure: "1-2 seans", not: "" },
  ],
  // Fiyat sorulunca bot ASLA rakam uydurmaz - bu klinige ozel politika:
  fiyatPolitikasi:
    "Fiyat, ağız içi fotoğraf veya panoramik röntgen görülmeden net söylenemez. Bot rakam vermez; fotoğraf ister ve hekimin aynı gün içinde net fiyat göndereceğini söyler.",
  sehirDisi:
    "Yurt dışından gelen hastalar için havalimanı transferi ve otel ayarlaması klinik tarafından yapılıyor. Tedavi planına göre 3-7 gün İstanbul'da kalmak gerekiyor.",
  iletisim: "0212 000 00 00",
};

// Demo randevu slotlari - onumuzdeki 5 is gunu
export function slotOner(bugun = new Date()) {
  const gunler = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  const saatler = ["10:00", "11:30", "14:00", "16:30"];
  const cikti = [];
  const d = new Date(bugun);
  while (cikti.length < 3) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) continue; // pazar kapali
    cikti.push({
      tarih: `${d.getDate()} ${["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"][d.getMonth()]} ${gunler[d.getDay()]}`,
      saatler: saatler.slice(0, 3),
    });
  }
  return cikti;
}

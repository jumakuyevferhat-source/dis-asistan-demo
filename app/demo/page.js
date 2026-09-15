"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const ACILIS = {
  rol: "bot",
  metin:
    "Merhaba, Demo Diş Kliniği'ne hoş geldiniz 🙂 Size nasıl yardımcı olabilirim?",
};

const ORNEKLER = [
  "İmplant fiyatı ne kadar?",
  "How much for 8 zirconia crowns?",
  "كم سعر زراعة الأسنان؟",
  "Ich komme im März nach Istanbul",
];

function saat() {
  return new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
}

export default function Demo() {
  const [mesajlar, setMesajlar] = useState([{ ...ACILIS, saat: "" }]);
  const [girdi, setGirdi] = useState("");
  const [bekliyor, setBekliyor] = useState(false);
  const [lead, setLead] = useState(null);
  const [yedekMod, setYedekMod] = useState(false);
  const akisRef = useRef(null);

  useEffect(() => {
    const el = akisRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [mesajlar, bekliyor]);

  async function gonder(metin) {
    const temiz = metin.trim();
    if (!temiz || bekliyor) return;

    const yeniGecmis = [...mesajlar, { rol: "hasta", metin: temiz, saat: saat() }];
    setMesajlar(yeniGecmis);
    setGirdi("");
    setBekliyor(true);

    try {
      const yanit = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mesajlar: yeniGecmis.map(({ rol, metin }) => ({ rol, metin })),
        }),
      });
      const veri = await yanit.json();

      if (veri.hata) {
        setMesajlar((m) => [...m, { rol: "bot", metin: veri.hata, saat: saat() }]);
      } else {
        setMesajlar((m) => [...m, { rol: "bot", metin: veri.mesaj, saat: saat() }]);
        if (veri.lead) setLead(veri.lead);
        if (veri.yedekMod) setYedekMod(true);
      }
    } catch {
      setMesajlar((m) => [
        ...m,
        { rol: "bot", metin: "Bağlantı kurulamadı, tekrar deneyin.", saat: saat() },
      ]);
    } finally {
      setBekliyor(false);
    }
  }

  const durum = lead?.durum ?? "yeni";
  const durumMetni = { yeni: "Yeni", ilgileniyor: "İlgileniyor", randevu_verildi: "Randevu verildi" };

  return (
    <div className="demo-sayfa">
      <div className="sarma">
        <div className="demo-ust">
          <h1>Canlı demo</h1>
          <Link className="geri" href="/">← Tanıtım sayfasına dön</Link>
        </div>

        <div className="uyari">
          Bu bir demo ortamıdır — gerçek bir kliniğe ait değildir ve WhatsApp üzerinden
          çalışmaz. Aşağıya Türkçe, İngilizce, Arapça, Almanca veya Rusça yazabilirsiniz;
          asistan hangi dilde yazdıysanız o dilde cevap verir.
          {yedekMod && (
            <>
              <br />
              <strong>Not:</strong> API anahtarı tanımlı olmadığı için şu an yedek modda
              çalışıyor, cevaplar sınırlı.
            </>
          )}
        </div>

        <div className="demo-duzen">
          <div>
            <div className="telefon">
              <div className="telefon-ust">
                <div className="avatar">🦷</div>
                <div>
                  <div className="ad">Demo Diş Kliniği</div>
                  <div className="durum">{bekliyor ? "yazıyor…" : "çevrimiçi"}</div>
                </div>
              </div>

              <div className="akis" ref={akisRef}>
                {mesajlar.map((m, i) => (
                  <div key={i} className={`balon ${m.rol}`}>
                    {m.metin}
                    {m.saat && <span className="saat">{m.saat}</span>}
                  </div>
                ))}
                {bekliyor && <div className="yaziyor">yazıyor…</div>}
              </div>

              <form
                className="giris"
                onSubmit={(e) => {
                  e.preventDefault();
                  gonder(girdi);
                }}
              >
                <input
                  value={girdi}
                  onChange={(e) => setGirdi(e.target.value)}
                  placeholder="Mesajınızı yazın…"
                  aria-label="Mesajınız"
                />
                <button type="submit" disabled={bekliyor || !girdi.trim()} aria-label="Gönder">
                  ➤
                </button>
              </form>
            </div>

            <div className="ornekler">
              {ORNEKLER.map((o) => (
                <button key={o} onClick={() => gonder(o)} disabled={bekliyor}>
                  {o}
                </button>
              ))}
            </div>
          </div>

          <aside className="panel">
            <h3>Hekime düşen hasta kartı</h3>
            <p className="aciklama">
              Konuşma sürerken arka planda dolan kart. Sabah bakıldığında okunan şey bu.
            </p>

            <div className="satir">
              <span className="etiket">Durum</span>
              <span className="deger">
                <span className={`durum-rozet durum-${durum}`}>{durumMetni[durum]}</span>
              </span>
            </div>
            {[
              ["İsim", lead?.isim],
              ["Dil", lead?.dil],
              ["Tedavi", lead?.tedavi],
              ["Ülke", lead?.ulke],
              ["Tarih", lead?.tarih],
            ].map(([etiket, deger]) => (
              <div className="satir" key={etiket}>
                <span className="etiket">{etiket}</span>
                <span className={`deger${deger ? "" : " bos"}`}>{deger || "—"}</span>
              </div>
            ))}

            {lead?.ozet && <div className="ozet-kutu">{lead.ozet}</div>}
          </aside>
        </div>
      </div>
    </div>
  );
}

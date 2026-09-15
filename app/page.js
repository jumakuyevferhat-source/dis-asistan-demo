import Link from "next/link";

export default function AnaSayfa() {
  return (
    <>
      <header className="hero">
        <div className="sarma">
          <span className="rozet">Diş klinikleri için • TR · EN · AR · DE · RU</span>
          <h1>Kliniğinize gece gelen mesaja sabah cevap veriyorsunuz. Hasta o zamana kadar başka kliniğe yazdı.</h1>
          <p className="girus">
            Reklamınızla gelen her WhatsApp mesajına saniyeler içinde, hastanın
            kendi dilinde cevap veren bir asistan. Tedaviyi sorar, fotoğraf ister,
            randevuya bağlar ve size hazır bir hasta kartı bırakır.
          </p>
          <div className="dugmeler">
            <Link className="dugme birincil" href="/demo">Demoyu deneyin →</Link>
            <a className="dugme ikincil" href="#nasil">Nasıl çalışıyor?</a>
          </div>
        </div>
      </header>

      <section className="bolum">
        <div className="sarma">
          <h2 className="baslik">Kliniklerin kaybettiği yer burası</h2>
          <p className="altyazi">
            Sorun hekimin ilgisizliği değil — koltukta hasta varken telefona bakılmıyor.
          </p>
          <div className="kartlar">
            <div className="kart">
              <span className="sayi">01</span>
              <h3>Mesai dışı sessizlik</h3>
              <p>
                Mesajların önemli bir kısmı akşam ve hafta sonu geliyor. Ertesi sabah
                dönüldüğünde hastanın çoğu başka bir kliniğe yazmış oluyor.
              </p>
            </div>
            <div className="kart">
              <span className="sayi">02</span>
              <h3>Yabancı hasta, yabancı dil</h3>
              <p>
                Türkiye yılda 1,5 milyondan fazla yabancı diş hastası ağırlıyor.
                İngilizce, Arapça veya Almanca gelen mesaj çoğu klinikte çeviriyle,
                saatler sonra yanıtlanıyor.
              </p>
            </div>
            <div className="kart">
              <span className="sayi">03</span>
              <h3>Gelmeyen randevular</h3>
              <p>
                Hatırlatma yapılmayan randevularda gelmeme oranı yüksek. Boşalan
                koltuk, o güne ait doğrudan gelir kaybı demek.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bolum gri" id="nasil">
        <div className="sarma">
          <h2 className="baslik">Nasıl çalışıyor</h2>
          <p className="altyazi">
            Kliniğin kendi WhatsApp numarası değişmiyor. Hasta yine aynı numaraya yazıyor.
          </p>
          <div className="kartlar">
            <div className="kart">
              <span className="sayi">ADIM 1</span>
              <h3>Hasta yazıyor</h3>
              <p>
                Instagram, Google veya reklamdan gelen hasta kliniğin WhatsApp
                numarasına mesaj atıyor — saat kaç olursa olsun.
              </p>
            </div>
            <div className="kart">
              <span className="sayi">ADIM 2</span>
              <h3>Asistan cevap veriyor</h3>
              <p>
                Hangi dilde yazıldıysa o dilde yanıt veriyor. Tedaviyi, tarihi ve
                beklentiyi öğreniyor, gerekiyorsa ağız içi fotoğraf istiyor.
                Fiyat konusunda rakam vermiyor — bu kararı hekime bırakıyor.
              </p>
            </div>
            <div className="kart">
              <span className="sayi">ADIM 3</span>
              <h3>Size hazır hasta düşüyor</h3>
              <p>
                Sabah telefonunuzu açtığınızda karşınızda konuşma dökümü değil,
                tek cümlelik özet ve randevu saati oluyor.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bolum">
        <div className="sarma">
          <h2 className="baslik">Neler yapıyor</h2>
          <p className="altyazi">Kliniğinizin çalışma şekline göre ayarlanıyor.</p>
          <ul className="ozellik">
            <li>Gelen mesaja saniyeler içinde, hastanın dilinde cevap</li>
            <li>Türkçe, İngilizce, Arapça, Almanca, Rusça</li>
            <li>Tedavi türü, tarih ve beklentiyi öğrenen ön görüşme</li>
            <li>Ağız içi fotoğraf toplama</li>
            <li>Müsait saatlerden randevu verme ve onaylama</li>
            <li>Randevudan 24 saat ve 2 saat önce hatırlatma</li>
            <li>6 aylık kontrol hatırlatmasıyla eski hastaları geri kazanma</li>
            <li>Hekim paneli: tüm konuşmalar, hasta kartları ve randevular</li>
          </ul>
        </div>
      </section>

      <section className="kapanis">
        <div className="sarma">
          <h2 className="baslik">Önce görün, sonra konuşalım</h2>
          <p>
            Demo gerçek çalışıyor — istediğiniz dilde yazın, asistanın nasıl cevap
            verdiğini kendiniz görün. Beğenirseniz kliniğinizin tedavileri, saatleri
            ve çalışma şekliyle size özel bir kurulum hazırlıyorum.
          </p>
          <div className="dugmeler" style={{ marginTop: 24 }}>
            <Link className="dugme birincil" href="/demo">Demoyu deneyin →</Link>
          </div>
          <div className="imza">
            <strong>Ferhat</strong> — Yazılım geliştirici, İstanbul
            <br />
            WhatsApp: 0531 775 59 12 · E-posta: jumakuyev.ferhat@gmail.com
          </div>
        </div>
      </section>

      <footer className="alt">
        <div className="sarma">
          Bu sayfadaki klinik bilgileri demo amaçlıdır, gerçek bir kliniğe ait değildir.
        </div>
      </footer>
    </>
  );
}

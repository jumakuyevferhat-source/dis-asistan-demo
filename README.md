# Diş Kliniği WhatsApp Asistanı — demo

Diş kliniklerine gelen hasta mesajlarına 7/24, hastanın kendi dilinde (TR/EN/AR/DE/RU)
cevap veren asistanın tanıtım sayfası ve canlı demosu.

- `/` — tanıtım sayfası
- `/demo` — WhatsApp görünümlü canlı demo + hekim paneli

## Çalıştırma

```bash
npm install
npm run dev
```

## Ortam değişkeni

`ANTHROPIC_API_KEY` tanımlıysa bot Claude ile gerçek cevap verir.
Tanımlı değilse sınırlı bir yedek modda çalışır ve demo sayfasında bunu belirtir.

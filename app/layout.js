import "./globals.css";

export const metadata = {
  title: "Diş Kliniği WhatsApp Asistanı",
  description:
    "Kliniğinize gelen hasta mesajlarına 7/24, hastanın kendi dilinde cevap veren asistan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}

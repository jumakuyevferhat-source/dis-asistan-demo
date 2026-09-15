import Anthropic from "@anthropic-ai/sdk";
import { sistemPromptu, cevabiAyir } from "../../../lib/prompt.js";
import { yedekCevap } from "../../../lib/yedekBot.js";

export const runtime = "nodejs";

export async function POST(request) {
  let govde;
  try {
    govde = await request.json();
  } catch {
    return Response.json({ hata: "Geçersiz istek." }, { status: 400 });
  }

  const mesajlar = Array.isArray(govde?.mesajlar) ? govde.mesajlar : [];
  if (mesajlar.length === 0) {
    return Response.json({ hata: "Mesaj yok." }, { status: 400 });
  }
  // Demo kotasi: cok uzun gecmisi kabul etme
  const gecmis = mesajlar.slice(-20).map((m) => ({
    role: m.rol === "bot" ? "assistant" : "user",
    content: String(m.metin ?? "").slice(0, 2000),
  }));
  const sonKullanici = [...gecmis].reverse().find((m) => m.role === "user");

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(yedekCevap(sonKullanici?.content ?? ""));
  }

  try {
    // Workspace'e bagli olmayan (org seviyesi) anahtarlar workspace id header'i ister.
    const client = new Anthropic(
      process.env.ANTHROPIC_WORKSPACE_ID
        ? { defaultHeaders: { "anthropic-workspace-id": process.env.ANTHROPIC_WORKSPACE_ID } }
        : {},
    );
    const yanit = await client.messages.create({
      model: "claude-opus-5",
      max_tokens: 1024,
      // Sohbet botu - hiz onemli, derin dusunmeye gerek yok
      output_config: { effort: "low" },
      system: sistemPromptu(),
      messages: gecmis,
    });

    if (yanit.stop_reason === "refusal") {
      return Response.json({
        mesaj: "Bu konuda yardımcı olamıyorum, hekimimiz sizi arasın mı?",
        lead: null,
      });
    }

    const hamMetin = yanit.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n");

    return Response.json(cevabiAyir(hamMetin));
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      return Response.json(yedekCevap(sonKullanici?.content ?? ""));
    }
    if (error instanceof Anthropic.RateLimitError) {
      return Response.json(
        { hata: "Şu an yoğunluk var, birazdan tekrar deneyin." },
        { status: 429 },
      );
    }
    console.error("[chat]", error);
    return Response.json({ hata: "Bir sorun oluştu." }, { status: 500 });
  }
}

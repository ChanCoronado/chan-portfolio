import Anthropic from "@anthropic-ai/sdk";
import { buildKnowledge, SYSTEM_PROMPT } from "@/lib/knowledge";

/* Ask Chan endpoint.
   Kill switch: it does nothing (and costs nothing) unless ASK_CHAN_ENABLED=true.
   The API key lives only in server environment variables. */

const MAX_TURNS = 6;
const MAX_CHARS = 500;
const MAX_OUTPUT_TOKENS = 500;

const HOURLY_PER_VISITOR = 10;
const DAILY_PER_VISITOR = 30;
const DAILY_TOTAL = Number(process.env.ASK_CHAN_DAILY_CAP ?? 200);

/* Simple in-memory limiter. Serverless instances do not share memory, so this
   is a courtesy limit; the hard cap is the spend limit set in the Anthropic Console. */
const hits = new Map<string, number[]>();
let dayKey = "";
let dayTotal = 0;

const enabled = () => process.env.ASK_CHAN_ENABLED === "true";

function limited(ip: string): boolean {
  const now = Date.now();
  const today = new Date().toISOString().slice(0, 10);
  if (today !== dayKey) {
    dayKey = today;
    dayTotal = 0;
    hits.clear();
  }
  if (dayTotal >= DAILY_TOTAL) return true;

  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 24 * 60 * 60 * 1000);
  const lastHour = recent.filter((t) => now - t < 60 * 60 * 1000).length;
  if (lastHour >= HOURLY_PER_VISITOR || recent.length >= DAILY_PER_VISITOR) return true;

  recent.push(now);
  hits.set(ip, recent);
  dayTotal += 1;
  return false;
}

type Turn = { role: "user" | "assistant"; content: string };

function parseTurns(body: unknown): Turn[] | null {
  if (!body || typeof body !== "object" || !("messages" in body)) return null;
  const raw = (body as { messages: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_TURNS) return null;

  const turns: Turn[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") return null;
    const { role, content } = item as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim();
    if (!text || text.length > MAX_CHARS) return null;
    turns.push({ role, content: text });
  }

  // Must start and end with the visitor, and alternate
  if (turns[0].role !== "user" || turns[turns.length - 1].role !== "user") return null;
  for (let i = 1; i < turns.length; i++) if (turns[i].role === turns[i - 1].role) return null;
  return turns;
}

export async function GET() {
  return Response.json({ enabled: enabled() });
}

export async function POST(request: Request) {
  if (!enabled()) {
    return Response.json({ error: "disabled" }, { status: 503 });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const turns = parseTurns(body);
  if (!turns) return Response.json({ error: "bad_request" }, { status: 400 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (limited(ip)) return Response.json({ error: "rate_limited" }, { status: 429 });

  try {
    const client = new Anthropic();
    const response = await client.messages.create({
      model: process.env.ASK_CHAN_MODEL ?? "claude-haiku-5-5",
      max_tokens: MAX_OUTPUT_TOKENS,
      system: SYSTEM_PROMPT + buildKnowledge(),
      messages: turns,
      output_config: { effort: "low" },
    });

    if (response.stop_reason === "refusal") {
      return Response.json({
        reply: "I can only answer questions about Chan's background. Please use the Contact section for anything else.",
      });
    }

    const reply = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    return Response.json({ reply: reply || "I do not have that information. Please use the Contact section." });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return Response.json({ error: "busy" }, { status: 429 });
    }
    return Response.json({ error: "failed" }, { status: 502 });
  }
}

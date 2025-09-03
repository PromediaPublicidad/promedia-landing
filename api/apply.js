// /api/apply.js  (Vercel Serverless Function - ESM)
import { Resend } from "resend";

const BRAND = "#167c88";
const FROM_DEFAULT = "Promedia <onboarding@resend.dev>";
const FROM_RAW = process.env.FROM_EMAIL || FROM_DEFAULT;
const TO_EMAIL = process.env.TO_EMAIL || "promarketing@promediapublicidad.com";

function emailHTML(p) {
  const { name, email, phone, area, portfolio, message } = p;
  const esc = (s="") => String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  return `<!doctype html><html><head><meta charset="utf-8" />
  <meta name="color-scheme" content="light only">
  <style>
    body{margin:0;background:#f6f7f9;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,"Helvetica Neue",Arial}
    .wrap{max-width:680px;margin:0 auto;padding:32px 16px}
    .card{background:#fff;border-radius:16px;box-shadow:0 10px 40px rgba(2,8,23,.08);overflow:hidden}
    .hero{background:${BRAND};color:#fff;padding:22px 24px}
    .hero h1{margin:0;font-size:20px;line-height:1.3}
    .body{padding:20px 24px}
    .row{display:flex;margin:-6px}.col{flex:1;padding:6px}
    .label{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#64748b;margin:0 0 6px}
    .value{font-size:16px;color:#0f172a;margin:0}
    .badge{display:inline-block;background:rgba(22,124,136,.08);color:${BRAND};border:1px solid rgba(22,124,136,.22);padding:6px 10px;border-radius:999px;font-weight:600}
    .msg{white-space:pre-wrap;border:1px solid #e2e8f0;border-radius:12px;padding:12px 14px;background:#fafafa;color:#0f172a}
    .foot{padding:14px 24px;border-top:1px solid #eef2f7;color:#64748b;font-size:12px}
    a{color:${BRAND};text-decoration:none}
  </style></head><body>
  <div class="wrap"><div class="card">
    <div class="hero">
      <h1>🔔 Nueva postulación – <span style="opacity:.95">${esc(name)}</span></h1>
      <div style="margin-top:6px"><span class="badge">${esc(area || "No especificado")}</span></div>
    </div>
    <div class="body">
      <div class="row">
        <div class="col"><p class="label">Nombre</p><p class="value">${esc(name)}</p></div>
        <div class="col"><p class="label">Email</p><p class="value"><a href="mailto:${esc(email)}">${esc(email)}</a></p></div>
      </div>
      <div class="row">
        <div class="col"><p class="label">Teléfono</p><p class="value"><a href="https://wa.me/${esc((phone||'').replace(/\D/g,''))}" target="_blank">${esc(phone||"—")}</a></p></div>
        <div class="col"><p class="label">Portafolio / LinkedIn</p><p class="value">${portfolio ? `<a href="${esc(portfolio)}" target="_blank">${esc(portfolio)}</a>` : "—"}</p></div>
      </div>
      <div style="margin-top:14px"><p class="label">Mensaje</p><div class="msg">${esc(message || "—")}</div></div>
    </div>
    <div class="foot">Enviado desde “Trabaja con Nosotros”. Responde para contestarle al candidato.</div>
  </div></div></body></html>`;
}

function isValidEmail(e){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e||"").trim()); }

async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  return await new Promise((resolve, reject) => {
    let data = "";
    req.on("data", c => (data += c));
    req.on("end", () => { try { resolve(JSON.parse(data || "{}")); } catch (e) { reject(e); } });
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  try {
    // Diagnóstico rápido
    if (req.method === "GET") {
      return res.status(200).json({
        ok: true,
        env: {
          RESEND_API_KEY: !!process.env.RESEND_API_KEY,
          FROM: FROM_RAW,
          TO: TO_EMAIL
        }
      });
    }

    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST","GET"]);
      return res.status(405).json({ ok:false, error:"Method Not Allowed" });
    }

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ ok:false, error:"RESEND_API_KEY no configurada" });
    }

    const body = await readJson(req);
    const { name, email, phone, area, portfolio, message, attachment } = body || {};
    if (!name || !email || !area) {
      return res.status(400).json({ ok:false, error:"Faltan name, email o area" });
    }
    const replyTo = isValidEmail(email) ? email : undefined;

    const resend = new Resend(process.env.RESEND_API_KEY);

    const attachments = [];
    if (attachment?.base64 && attachment?.filename) {
      attachments.push({
        filename: attachment.filename,
        content: Buffer.from(attachment.base64, "base64"),
      });
    }

    const html = emailHTML({ name, email, phone, area, portfolio, message });

    // 1er intento con FROM_RAW (por si ya verificaste dominio)
    let r = await resend.emails.send({
      from: FROM_RAW,
      to: [TO_EMAIL],
      subject: `Postulación: ${name} – ${area}`,
      html,
      reply_to: replyTo,
      attachments: attachments.length ? attachments : undefined,
    });

    // Si el "from" no es válido/permitido, reintenta con FROM_DEFAULT
    const fromErrorMsg = r?.error?.message || "";
    const looksLikeFromError =
      /from/i.test(fromErrorMsg) && /(valid|sender|verified|domain)/i.test(fromErrorMsg);

    if (r?.error && looksLikeFromError && FROM_RAW !== FROM_DEFAULT) {
      r = await resend.emails.send({
        from: FROM_DEFAULT,
        to: [TO_EMAIL],
        subject: `Postulación: ${name} – ${area}`,
        html,
        reply_to: replyTo,
        attachments: attachments.length ? attachments : undefined,
      });
    }

    if (r?.error) {
      return res.status(500).json({
        ok: false,
        error: r.error?.message || "Error de Resend",
        code: r.error?.name || r.error?.type,
        details: r.error
      });
    }

    return res.status(200).json({ ok:true, id: r?.data?.id });
  } catch (e) {
    console.error("apply error", e);
    return res.status(500).json({ ok:false, error: e?.message || "Server error" });
  }
}
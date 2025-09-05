// api/apply.js
import { Resend } from 'resend';
import formidable from 'formidable';
import { readFile } from 'fs/promises';

// Vercel: desactiva el body parser para poder leer multipart
export const config = {
  api: {
    bodyParser: false,
  },
};

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.FROM || 'Promedia <onboarding@resend.dev>'; // usa tu dominio verificado si ya lo tienes
const TO   = process.env.TO   || 'promarketing@promediapublicidad.com'; // cámbialo si quieres

function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: false, maxFileSize: 10 * 1024 * 1024 }); // 10MB
    form.parse(req, async (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  try {
    const { fields, files } = await parseForm(req);

    const name = (fields.name || '').toString();
    const email = (fields.email || '').toString();
    const phone = (fields.phone || '').toString();
    const area = (fields.area || '').toString();
    const portfolio = (fields.portfolio || '').toString();
    const message = (fields.message || '').toString();

    // Adjuntos (opcional)
    let attachments = [];
    const cv = files.cv;
    if (cv && cv.filepath) {
      const buf = await readFile(cv.filepath);
      attachments.push({
        filename: cv.originalFilename || 'cv.pdf',
        content: buf.toString('base64'),
      });
    }

    const html = `
      <table style="width:100%;max-width:640px;border-collapse:collapse;font-family:Inter,Arial,sans-serif;">
        <tr><td style="padding:16px 0;">
          <h2 style="margin:0 0 8px;color:#167c88;">Nueva Postulación - Promedia</h2>
          <p style="margin:0;color:#0f172a;">Detalles del candidato:</p>
        </td></tr>
        <tr><td style="padding:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
          <p style="margin:0 0 6px;"><strong>Nombre:</strong> ${name}</p>
          <p style="margin:0 0 6px;"><strong>Email:</strong> ${email}</p>
          <p style="margin:0 0 6px;"><strong>Teléfono:</strong> ${phone || '—'}</p>
          <p style="margin:0 0 6px;"><strong>Cargo:</strong> ${area}</p>
          <p style="margin:0 0 6px;"><strong>Portafolio / LinkedIn:</strong> ${portfolio || '—'}</p>
          <p style="margin:12px 0 0;"><strong>Mensaje:</strong></p>
          <p style="white-space:pre-wrap;margin:6px 0 0;">${message || '—'}</p>
        </td></tr>
        <tr><td style="padding:10px 0;color:#64748b;font-size:12px;">
          Enviado desde promediapublicidad.com
        </td></tr>
      </table>
    `;

    const resp = await resend.emails.send({
      from: FROM,
      to: [TO],
      reply_to: email || undefined,
      subject: `Postulación: ${name} — ${area}`,
      html,
      attachments: attachments.length ? attachments : undefined,
    });

    if (resp.error) {
      return res.status(500).json({ ok: false, error: 'Error de Resend', details: resp.error });
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message || 'Internal error' });
  }
}
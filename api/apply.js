// api/apply.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  try {
    const data = req.body || {};
    const {
      name, email, phone, role, portfolio,
      residesPanama, experienceYears, availability,
      modality, salary, message, consent
    } = data;

    if (!name || !email || !role || consent !== 'on') {
      return res.status(400).json({ ok: false, error: 'Campos requeridos faltantes' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // p.ej. smtp.gmail.com
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    });

    const to = process.env.SMTP_TO || 'info@promediapublicidad.com';
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;

    const html = `
      <h2>Nueva postulación – Trabaja con Nosotros</h2>
      <p><b>Nombre:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Teléfono:</b> ${phone || '-'}</p>
      <p><b>Rol:</b> ${role}</p>
      <p><b>Portafolio/LinkedIn/CV:</b> ${portfolio || '-'}</p>
      <p><b>Reside en Panamá:</b> ${residesPanama || '-'}</p>
      <p><b>Años de experiencia:</b> ${experienceYears || '-'}</p>
      <p><b>Disponibilidad:</b> ${availability || '-'}</p>
      <p><b>Modalidad preferida:</b> ${modality || '-'}</p>
      <p><b>Pretensión salarial:</b> ${salary || '-'}</p>
      <p><b>Mensaje:</b><br/>${(message || '').replace(/\n/g,'<br/>')}</p>
    `;

    await transporter.sendMail({
      to,
      from,
      subject: `Postulación: ${role} – ${name}`,
      html,
      replyTo: email
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'Mail error' });
  }
}
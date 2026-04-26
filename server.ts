import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { Resend } from 'resend';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/notify-admin", async (req, res) => {
    const { apartmentName, checkIn, checkOut, guests, customerName, customerEmail } = req.body;
    
    const resendKey = process.env.VITE_RESEND_API_KEY;
    
    if (!resendKey) {
      console.error("Missing VITE_RESEND_API_KEY");
      return res.status(500).json({ error: "Email service not configured" });
    }

    const resend = new Resend(resendKey);

    try {
      await resend.emails.send({
        from: 'Intermo <onboarding@resend.dev>',
        to: 'robin17pl@gmail.com',
        subject: `Nowa rezerwacja: ${apartmentName}`,
        html: `
          <h1>Nowe zapytanie o rezerwację</h1>
          <p><strong>Apartament:</strong> ${apartmentName}</p>
          <p><strong>Termin:</strong> ${checkIn} do ${checkOut}</p>
          <p><strong>Goście:</strong> ${guests}</p>
          <hr />
          <p><strong>Klient:</strong> ${customerName}</p>
          <p><strong>Email:</strong> ${customerEmail}</p>
        `
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Email error:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

import 'dotenv/config';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import express, { type Request, type Response, type NextFunction } from 'express';

const ROOT_DIR = process.cwd();
const PORT = Number(process.env.PORT || 3000);
const IS_PROD = process.env.NODE_ENV === 'production';

const DATA_DIR = path.resolve(ROOT_DIR, 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const TOKEN_SECRET = process.env.FORM_TOKEN_SECRET || crypto.randomBytes(32).toString('hex');

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

function sanitizeText(value: unknown, maxLength = 2000): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

function signFormToken(issuedAt: number): string {
  const hmac = crypto.createHmac('sha256', TOKEN_SECRET);
  hmac.update(String(issuedAt));
  return `${issuedAt}.${hmac.digest('hex')}`;
}

function verifyFormToken(token: string): { valid: boolean; reason?: string } {
  if (!token || typeof token !== 'string' || !token.includes('.')) {
    return { valid: false, reason: 'Missing security verification token.' };
  }
  const [rawTs, signature] = token.split('.');
  const issuedAt = Number(rawTs);
  if (!Number.isFinite(issuedAt) || !signature) {
    return { valid: false, reason: 'Malformed verification token.' };
  }
  const expected = signFormToken(issuedAt).split('.')[1];
  const sigBuf = Buffer.from(signature, 'utf8');
  const expBuf = Buffer.from(expected, 'utf8');
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return { valid: false, reason: 'Invalid verification signature.' };
  }
  const elapsed = Date.now() - issuedAt;
  if (elapsed < 1200) {
    return { valid: false, reason: 'Submission occurred too rapidly. Please review and try again.' };
  }
  if (elapsed > 4 * 60 * 60 * 1000) {
    return { valid: false, reason: 'Session expired. Please refresh and submit again.' };
  }
  return { valid: true };
}

async function persistInquiry(record: Record<string, unknown>): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  let existing: Record<string, unknown>[] = [];
  try {
    const raw = await fs.readFile(INQUIRIES_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      existing = parsed;
    }
  } catch {
    existing = [];
  }
  existing.push(record);
  await fs.writeFile(INQUIRIES_FILE, JSON.stringify(existing, null, 2), 'utf-8');
}

async function startServer() {
  const app = express();

  app.disable('x-powered-by');
  app.use(express.json({ limit: '64kb' }));

  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'nexora-digital',
      timestamp: new Date().toISOString(),
    });
  });

  app.get('/api/config', (_req: Request, res: Response) => {
    res.json({
      whatsappNumber: process.env.NEXORA_WHATSAPP_NUMBER || '0249736777',
      contactEmail: process.env.NEXORA_CONTACT_EMAIL || 'alijohnkwameanonkati@gmail.com',
      agencyLocation: process.env.NEXORA_AGENCY_LOCATION || 'Accra · Remote Worldwide',
    });
  });

  app.get('/api/inquiries/token', (_req: Request, res: Response) => {
    const issuedAt = Date.now();
    res.json({
      token: signFormToken(issuedAt),
    });
  });

  app.post('/api/inquiries', async (req: Request, res: Response) => {
    try {
      const clientIp = getClientIp(req);
      const now = Date.now();
      const rateEntry = rateLimitStore.get(clientIp);

      if (rateEntry && now < rateEntry.resetAt) {
        if (rateEntry.count >= RATE_LIMIT_MAX_REQUESTS) {
          res.status(429).json({
            error: 'Too many submissions from this connection. Please wait a few minutes or reach out via WhatsApp.',
          });
          return;
        }
        rateEntry.count += 1;
      } else {
        rateLimitStore.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
      }

      const body = req.body ?? {};

      // Honeypot spam trap
      if (typeof body.websiteConfirm === 'string' && body.websiteConfirm.trim().length > 0) {
        res.status(400).json({ error: 'Automated submission rejected.' });
        return;
      }

      // Token timing verification
      const tokenCheck = verifyFormToken(body.securityToken);
      if (!tokenCheck.valid) {
        res.status(400).json({ error: tokenCheck.reason });
        return;
      }

      // Human verification check
      const humanAnswer = sanitizeText(body.humanCheck, 16);
      if (humanAnswer !== '12') {
        res.status(400).json({ error: 'Please answer the anti-spam verification question correctly (7 + 5).' });
        return;
      }

      const fullName = sanitizeText(body.fullName, 120);
      const businessName = sanitizeText(body.businessName, 140);
      const email = sanitizeText(body.email, 160).toLowerCase();
      const phone = sanitizeText(body.phone, 40);
      const websiteType = sanitizeText(body.websiteType, 100);
      const budget = sanitizeText(body.budget, 80);
      const description = sanitizeText(body.description, 2500);
      const additionalRequirements = sanitizeText(body.additionalRequirements, 1500);

      const fieldErrors: Record<string, string> = {};

      if (fullName.length < 2) {
        fieldErrors.fullName = 'Please enter your full name.';
      }
      if (businessName.length < 2) {
        fieldErrors.businessName = 'Please enter your business or project name.';
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        fieldErrors.email = 'Please enter a valid email address.';
      }
      if (phone.length > 0 && !/^[+\d\s().-]{7,24}$/.test(phone)) {
        fieldErrors.phone = 'Please enter a valid phone number.';
      }
      if (!websiteType) {
        fieldErrors.websiteType = 'Please select the type of website required.';
      }
      if (!budget) {
        fieldErrors.budget = 'Please select an estimated budget range.';
      }
      if (description.length < 20) {
        fieldErrors.description = 'Please share at least 20 characters describing your goals and scope.';
      }

      if (Object.keys(fieldErrors).length > 0) {
        res.status(422).json({
          error: 'Please review the highlighted fields before submitting.',
          fieldErrors,
        });
        return;
      }

      const referenceId = `NX-${new Date().getFullYear()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
      const submittedAt = new Date().toISOString();

      const inquiryRecord = {
        referenceId,
        submittedAt,
        fullName,
        businessName,
        email,
        phone: phone || 'Not provided',
        websiteType,
        budget,
        description,
        additionalRequirements: additionalRequirements || 'None specified',
      };

      await persistInquiry(inquiryRecord);

      const webhookUrl = process.env.INQUIRY_WEBHOOK_URL;
      if (webhookUrl && webhookUrl.startsWith('https://')) {
        try {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              source: 'Nexora Digital Website',
              ...inquiryRecord,
            }),
          });
        } catch (webhookErr) {
          console.warn('Inquiry webhook delivery skipped:', webhookErr);
        }
      }

      res.status(201).json({
        success: true,
        referenceId,
        submittedAt,
        summary: {
          fullName,
          businessName,
          email,
          websiteType,
          budget,
        },
      });
    } catch (error) {
      console.error('Error processing project inquiry:', error);
      res.status(500).json({
        error: 'Unable to record your inquiry right now. Please try again or contact us directly via WhatsApp or email.',
      });
    }
  });

  if (!IS_PROD) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(ROOT_DIR, 'dist');
    app.use(express.static(distDir, { index: false }));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nexora Digital server running on http://0.0.0.0:${PORT} (${IS_PROD ? 'production' : 'development'})`);
  });

  server.on('error', (err) => {
    console.error('Server listen error:', err);
    process.exit(1);
  });
}

startServer().catch((err) => {
  console.error('Failed to start Nexora Digital server:', err);
  process.exit(1);
});

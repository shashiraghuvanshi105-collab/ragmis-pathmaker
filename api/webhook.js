import { Webhook } from 'standardwebhooks';
import { Resend } from 'resend';

// Disable Vercel's default parser so raw body is preserved for HMAC-SHA256 signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

// Exact Polar Product IDs mapped to their titles and downloadable files
const PRODUCT_DELIVERABLES = {
  // Complete QA & DevOps Bundle ($149)
  '329eea17-7552-4c7a-8531-e09df17c3f34': {
    title: 'Complete QA & DevOps Bundle',
    downloadUrl: 'https://ragmispathmaker.com/files/complete-qa-devops-bundle.zip',
    fileName: 'complete-qa-devops-bundle.zip',
  },
  // Test Automation Starter Kit ($108)
  '42ed076f-c007-4175-a9f7-2bf0a6d47268': {
    title: 'Test Automation Starter Kit',
    downloadUrl: 'https://ragmispathmaker.com/files/test-automation-starter-kit.zip',
    fileName: 'test-automation-starter-kit.zip',
  },
  // Testing Audit Toolkit ($100)
  '7b24f8e7-09cd-4d35-ace4-14fd9ca5aafd': {
    title: 'Testing Audit Toolkit',
    downloadUrl: 'https://ragmispathmaker.com/files/testing-audit-toolkit.zip',
    fileName: 'testing-audit-toolkit.zip',
  },
};

// Helper to buffer the raw request stream
async function getRawBody(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const rawPayload = await getRawBody(req);
  const headers = req.headers;
  const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!webhookSecret || !resendApiKey) {
    console.error('[Polar Webhook] Missing POLAR_WEBHOOK_SECRET or RESEND_API_KEY');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // 1. Verify Polar HMAC signature
  const wh = new Webhook(webhookSecret);
  let event;
  try {
    event = wh.verify(rawPayload, headers);
  } catch (err) {
    console.error('[Polar Webhook] Signature verification failed:', err.message);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  // 2. Process order.created event
  if (event.type === 'order.created') {
    const order = event.data;

    // Extract customer email
    const customerEmail = order.customer?.email || '';

    // OPTION A: Fallback to the username part of their email if name is missing
    const customerName = order.customer?.name
      ? order.customer.name.trim()
      : (customerEmail ? customerEmail.split('@')[0] : 'there');

    // Extract Product ID
    const productId = order.product_id || order.product?.id;
    const fallbackTitle = order.product?.name || 'Your Digital Product';

    // Match deliverable by exact Product ID
    const productInfo = PRODUCT_DELIVERABLES[productId] || {
      title: fallbackTitle,
      downloadUrl: 'https://ragmispathmaker.com/files/complete-qa-devops-bundle.zip',
      fileName: 'bundle.zip',
    };

    console.log(`[Polar Webhook] Delivering "${productInfo.title}" to ${customerEmail} (addressed as: ${customerName}) for Order ${order.id}`);

    const resend = new Resend(resendApiKey);

    try {
      await resend.emails.send({
        // In production with your verified domain:
        from: 'Shashi Raghuvanshi <shashiraghuvanshi977@ragmispathmaker.com>',
        to: customerEmail,
        subject: `Your Download: ${productInfo.title}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 580px; margin: 0 auto; padding: 36px 24px; color: #191919; line-height: 1.6; background-color: #f8f7f3; border-radius: 8px;">
            <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #696963; margin-bottom: 8px;">Order Confirmed</p>
            <h1 style="font-size: 24px; font-weight: 600; margin: 0 0 16px; color: #191919;">Hello ${customerName},</h1>
            <p style="font-size: 15px; color: #4e4e49; margin-bottom: 24px;">
              Thank you for purchasing <strong>${productInfo.title}</strong>! Your product is ready to download:
            </p>
            
            <div style="margin: 32px 0;">
              <a href="${productInfo.downloadUrl}" style="background-color: #191919; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 999px; font-size: 14px; font-weight: 500; display: inline-block;">
                Download ${productInfo.fileName} &rarr;
              </a>
            </div>

            <p style="font-size: 13px; color: #696963; margin-top: 32px; border-top: 1px solid #deddd6; padding-top: 20px;">
              Direct link (if the button above does not work):<br/>
              <a href="${productInfo.downloadUrl}" style="color: #2563eb; word-break: break-all;">${productInfo.downloadUrl}</a>
            </p>

            <p style="font-size: 12px; color: #999; margin-top: 20px;">
              Order ID: <code>${order.id}</code><br/>
              Need assistance? Reply directly to this email.
            </p>
          </div>
        `,
      });

      console.log(`[Polar Webhook] Delivery email sent to ${customerEmail}`);
    } catch (emailErr) {
      console.error(`[Polar Webhook] Failed sending email to ${customerEmail}:`, emailErr);
      return res.status(500).json({ error: 'Failed to dispatch email' });
    }
  }

  return res.status(200).json({ received: true });
}

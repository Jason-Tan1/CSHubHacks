const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash-latest';

// Middleware
app.use(cors());
app.use(express.json({ limit: '15mb' }));

// Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

app.post('/api/analyze', async (req, res) => {
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Missing Gemini API key on server' });
  }

  const { images, details, location } = req.body;

  if (!images?.length) {
    return res.status(400).json({ error: 'No images were provided for analysis' });
  }

  const imageParts = images
    .map((img) => {
      if (!img?.data) return null;
      const mimeType = img.mimeType || 'image/jpeg';

      return {
        inline_data: {
          mime_type: mimeType,
          data: img.data,
        },
      };
    })
    .filter(Boolean);

  if (!imageParts.length) {
    return res.status(400).json({ error: 'No valid images were provided' });
  }

  const prompt = `You are a housing safety and tenant-rights expert. Review the images and return JSON only. Do not add explanations or code fences.
Required JSON shape:
{
  "summary": "200–250 word plain-language explanation of what the image likely shows, possible hazards, health concerns, and urgency. If unclear, list possible interpretations.",
  
  "rights_summary": "Key tenant rights in the user's city/state: habitability rules, repair timelines, anti-retaliation protections, emergency repair options, landlord entry rules. Keep it simple and clear.",
  
  "applicable_laws": [
    "List main statutes or codes that commonly apply to this issue in the user's location. Briefly say why each law matters."
  ],
  
  "actions": [
    "List 5–8 practical steps for the tenant. Focus on: what to do now, how to request repairs, when to escalate, and how to protect themselves from retaliation."
  ],
  
  "landlord_message": "Short, polite message describing the issue, referencing the housing standard, and requesting a repair timeline.",
  
  "documentation": "Explain what to record: photos (angles + close-ups), timestamps, notes about when issue started or worsened, communication logs, receipts, and health symptoms if relevant.",
  
  "evidence_checklist": [
    "Wide + close-up photos",
    "Location/context shot",
    "Video if issue is active (dripping, sparking, pests)",
    "Measurements (size, spread)",
    "Timeline notes"
  ],
  
  "clinic_links": [
    {"name": "Nearest legal aid or tenant clinic", "link": "https://www.google.com/maps/search/legal+aid+clinic+<city_or_zip>"}
  ]
}

Location context: ${location || 'No location given.'}
Tenant notes: ${details || 'No additional details provided.'}
If you are unsure of exact laws, provide the best general housing safety laws for the given location. Keep lists concise.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }, ...imageParts],
            },
          ],
          generationConfig: {
            response_mime_type: 'application/json',
            temperature: 0.25,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      return res.status(502).json({ error: 'Gemini request failed', details: errorText });
    }

    const data = await response.json();
    const rawContent =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part?.text)
        .filter(Boolean)
        .join('')
        .trim() || '';

    let parsed;
    try {
      parsed = rawContent ? JSON.parse(rawContent) : null;
    } catch (err) {
      console.error('Gemini JSON parse error:', err.message);
    }

    const summary =
      parsed?.summary ||
      rawContent ||
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part?.text)
        .filter(Boolean)
        .join('\n')
        .trim() ||
      '';

    if (!summary) {
      return res.status(500).json({ error: 'Gemini did not return any analysis' });
    }

    const report = {
      summary,
      rightsSummary: parsed?.rights_summary || parsed?.rightsSummary || '',
      applicableLaws: parsed?.applicable_laws || parsed?.laws || [],
      actions: parsed?.actions || parsed?.steps || [],
      landlordMessage: parsed?.landlord_message || parsed?.landlordMessage || '',
      documentation: parsed?.documentation || '',
      evidenceChecklist: parsed?.evidence_checklist || parsed?.checklist || [],
      clinicLinks: parsed?.clinic_links || parsed?.clinics || [],
      raw: rawContent,
    };

    res.json({ summary, report });
  } catch (error) {
    console.error('Gemini analysis failed:', error);
    res.status(500).json({ error: 'Failed to analyze the image(s)', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

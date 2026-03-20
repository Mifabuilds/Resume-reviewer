// api.js — calls the local Express proxy (/api/review)
// The proxy (server.js) forwards to Anthropic so your API key never touches the browser

async function fetchResumeReview({ resumeText, jobDesc, focusAreas }) {
  const prompt = `You are an expert resume coach and recruiter with 15 years of experience.

Analyse this resume${jobDesc ? ' against the provided job description' : ''} and give structured, actionable feedback.

RESUME:
${resumeText}

${jobDesc ? `JOB DESCRIPTION:\n${jobDesc}` : ''}

FOCUS AREAS: ${focusAreas}

Respond ONLY with a valid JSON object (no markdown, no extra text):
{
  "score": <integer 0-100>,
  "verdict": "<2-sentence overall verdict>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>"],
  "sections": [
    {"title": "<section name>", "status": "good|warn|info", "feedback": "<2-3 sentence specific feedback>"},
    {"title": "<section name>", "status": "good|warn|info", "feedback": "<2-3 sentence specific feedback>"},
    {"title": "<section name>", "status": "good|warn|info", "feedback": "<2-3 sentence specific feedback>"}
  ]
}`

  const response = await fetch('/api/review', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model:      'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages:   [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: response.statusText }))
    throw new Error(err.error || 'Request failed')
  }

  const data = await response.json()
  const text = data.content[0].text.replace(/```json|```/g, '').trim()
  return JSON.parse(text)
}

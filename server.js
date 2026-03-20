require('dotenv').config()

const express = require('express')
const cors    = require('cors')
const path    = require('path')


const app  = express()
const PORT = process.env.PORT || 3000

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors())
app.use(express.json())

// Serve the frontend (index.html + css/ + js/) as static files
app.use(express.static(path.join(__dirname)))

// ── Proxy route ─────────────────────────────────────────────────────────────
// Frontend calls POST /api/review  →  this forwards to Anthropic and returns the result
app.post('/api/review', async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY

  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not set. See README.' })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method:  'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(req.body),
    })

    if (!response.ok) {
      const err = await response.text()
      return res.status(response.status).json({ error: err })
    }

    const data = await response.json()
    res.json(data)
  } catch (err) {
    console.error('Proxy error:', err)
    res.status(500).json({ error: err.message })
  }
})

// ── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  ResumeCheck running at http://localhost:${PORT}`)
})

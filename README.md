# Resume Reviewer — AI Resume Reviewer

An AI-powered resume analysis tool built with vanilla HTML, CSS, and JavaScript using the Anthropic Claude API.

## Tech Stack
- HTML5 / CSS3 / Vanilla JavaScript (ES6+)
- Anthropic Claude API (`claude-sonnet-4-20250514`)
- No build tools or frameworks required

## Project Structure
```
resume-reviewer/
├── index.html          # App shell & markup
├── css/
│   └── style.css       # All styles
└── js/
    ├── api.js          # Anthropic API call + prompt
    ├── render.js       # Builds results UI from response data
    └── main.js         # Event listeners & app flow
```

## Features
- Paste resume text + optional job description
- Select focus areas (ATS, bullet impact, skills gap, etc.)
- Animated score ring (0–100)
- Strengths vs improvements breakdown
- Per-section feedback with status tags

## Project Structure
```
resume-reviewer/
├── index.html          # App shell & markup
├── server.js           # Express proxy — keeps your API key off the browser
├── package.json
├── .env.example        # Copy to .env and add your key
├── css/
│   └── style.css
└── js/
    ├── api.js          # Calls /api/review (the local proxy)
    ├── render.js       # Builds results UI from response data
    └── main.js         # Event listeners & app flow
```

## Setup

### 1. Get an Anthropic API key
Go to [console.anthropic.com](https://console.anthropic.com) → API Keys → Create key.

### 2. Configure your key
```bash
cp .env.example .env
# Open .env and replace your_api_key_here with your real key
```

### 3. Install dependencies and run
```bash
npm install
npm start
# Open http://localhost:3000
```

That's it — the Express server serves the frontend AND proxies API calls so your key never appears in the browser.

## Deploy to Railway / Render (free)
1. Push to a GitHub repo
2. Connect to [Railway](https://railway.app) or [Render](https://render.com)
3. Set `ANTHROPIC_API_KEY` as an environment variable in the dashboard
4. Deploy — your app gets a public URL automatically

## Customisation
- Edit the prompt in `js/api.js` to change what Claude analyses
- Swap colour variables in `css/style.css` under `:root`

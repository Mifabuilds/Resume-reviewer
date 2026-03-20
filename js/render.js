// render.js — builds the results UI from API response data

function renderResults(data) {
  const scoreColor =
    data.score >= 75 ? "#2A5C45" :
    data.score >= 50 ? "#C4521A" : "#9B2335";

  const scoreLabel =
    data.score >= 75 ? "Strong Resume" :
    data.score >= 50 ? "Needs Work" : "Needs Major Work";

  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (data.score / 100) * circumference;

  const sectionCards = (data.sections || []).map(s => {
    const tagClass = s.status === "good" ? "tag-good" : s.status === "warn" ? "tag-warn" : "tag-info";
    const tagLabel = s.status === "good" ? "✓ Good" : s.status === "warn" ? "⚠ Improve" : "ℹ Note";
    const icon = s.status === "good" ? "✦" : s.status === "warn" ? "△" : "○";
    return `
      <div class="section-card">
        <h4>${icon} ${s.title} <span class="tag ${tagClass}">${tagLabel}</span></h4>
        <p>${s.feedback}</p>
      </div>`;
  }).join("");

  const resultsEl = document.getElementById("results");
  resultsEl.innerHTML = `
    <div class="score-banner">
      <div class="score-ring">
        <svg width="88" height="88" viewBox="0 0 88 88">
          <circle class="track" cx="44" cy="44" r="36"/>
          <circle class="fill" cx="44" cy="44" r="36"
            stroke="${scoreColor}"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="${circumference}"
            id="scoreArc"/>
        </svg>
        <div class="score-num" style="color:${scoreColor}">${data.score}<small>/100</small></div>
      </div>
      <div class="score-info">
        <h3>${scoreLabel}</h3>
        <p>${data.verdict}</p>
      </div>
    </div>

    <div class="feedback-grid">
      <div class="feedback-card card-strengths">
        <h4>✦ Strengths</h4>
        <ul>${(data.strengths || []).map(s => `<li>${s}</li>`).join("")}</ul>
      </div>
      <div class="feedback-card card-improve">
        <h4>△ Improvements</h4>
        <ul>${(data.improvements || []).map(s => `<li>${s}</li>`).join("")}</ul>
      </div>
    </div>

    ${sectionCards}
    <button class="reset-btn" id="resetBtn">← Analyse another resume</button>
  `;

  resultsEl.style.display = "block";

  // Animate score arc
  setTimeout(() => {
    const arc = document.getElementById("scoreArc");
    if (arc) arc.style.strokeDashoffset = offset;
  }, 100);

  document.getElementById("resetBtn").addEventListener("click", resetForm);
}

function resetForm() {
  document.getElementById("results").style.display = "none";
  document.getElementById("results").innerHTML = "";
  document.getElementById("inputCard").style.display = "block";
}

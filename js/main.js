// main.js — event listeners and app flow

document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => chip.classList.toggle("active"));
});

function getActiveChips() {
  return [...document.querySelectorAll(".chip.active")]
    .map(c => c.dataset.val)
    .join(", ") || "Overall quality";
}

document.getElementById("analyzeBtn").addEventListener("click", async () => {
  const resumeText = document.getElementById("resumeText").value.trim();
  if (!resumeText) {
    alert("Please paste your resume text first.");
    return;
  }

  const jobDesc = document.getElementById("jobDesc").value.trim();
  const focusAreas = getActiveChips();

  document.getElementById("inputCard").style.display = "none";
  document.getElementById("results").style.display = "none";
  document.getElementById("loader").classList.add("active");

  try {
    const data = await fetchResumeReview({ resumeText, jobDesc, focusAreas });
    document.getElementById("loader").classList.remove("active");
    renderResults(data);
  } catch (err) {
    document.getElementById("loader").classList.remove("active");
    document.getElementById("inputCard").style.display = "block";
    alert("Something went wrong. Check the console for details.");
    console.error(err);
  }
});

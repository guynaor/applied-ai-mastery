const sessions = [
  [1, "Junior AI Assistant", "Advanced Prompting & Model Selection"],
  [2, "AI Research Analyst", "Deep Research & Information Synthesis"],
  [3, "Data Operations Specialist", "Non-Coder Spreadsheet Engineering"],
  [4, "Technical Communicator", "Presentations & Visual Artifacts"],
  [5, "Operations Planner", "Travel Architecture & Spatial Planning"],
  [6, "Automation Engineer", "Unattended Desktop Agents & Scheduled Tasks"],
  [7, "AI Systems Engineer", "Physical Design & Parametric CAD"],
  [8, "Lead Applied AI Engineer", "Capstone: AquaNode Mini"]
];

const container = document.querySelector("[data-session-grid]");

if (container) {
  container.innerHTML = sessions.map(([number, role, title]) => `
    <article class="card">
      <span class="badge">Mission ${number}</span>
      <h3>${title}</h3>
      <p><strong>${role}</strong></p>
      <p>Course material and mission files will be linked here as each feature branch is merged.</p>
    </article>
  `).join("");
}

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();

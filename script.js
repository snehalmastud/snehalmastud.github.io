/* ============================================================
   SNEHAL MASTUD PORTFOLIO — JAVASCRIPT
   Cursor, animations, terminal typing, counters, AI chatbot
   ============================================================ */

// ---- CURSOR ----
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});
function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// ---- NAV SCROLL ----
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ---- REVEAL ON SCROLL ----
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
        // Animate skill bars when they appear
        const bar = entry.target.querySelector('.skill-fill');
        if (bar) {
          bar.style.width = bar.dataset.width + '%';
        }
      }, parseInt(delay));
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

// ---- COUNTER ANIMATION ----
const counters = document.querySelectorAll('.stat-num');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      let current = 0;
      const step = target / 40;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { el.textContent = target; clearInterval(timer); }
        else { el.textContent = Math.floor(current); }
      }, 40);
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(el => counterObs.observe(el));

// ---- TERMINAL TYPING EFFECT ----
const terminalCode = `const engineer = {
  name: "Snehal Mastud",
  role: "Full-Stack Engineer · AI Practitioner · MEAN/MERN Stack",
  location: "Mumbai, India 🇮🇳",
  experience: "5+ years",

  tech: {
    backend: ["Node.js", "Express.js"],
    frontend: ["React", "Angular", "Next.js"],
    databases: ["MongoDB", "MySQL", "Redis"],
    cloud: ["AWS", "Docker", "Kubernetes"],
  },

  domains: [
    "Fintech", "Aviation",
    "Healthcare", "E-commerce"
  ],

  status: "Open to Opportunities ✅",
  email: "smastud0@gmail.com"
};`;

let tIdx = 0;
const termEl = document.getElementById('terminal-text');
function typeTerminal() {
  if (!termEl) return;
  if (tIdx < terminalCode.length) {
    termEl.textContent += terminalCode[tIdx++];
    setTimeout(typeTerminal, tIdx < 50 ? 15 : 8);
  }
}
// Start when element is visible
const termObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { typeTerminal(); termObs.disconnect(); }
  });
}, { threshold: 0.3 });
if (termEl) termObs.observe(termEl.closest('.terminal'));

// ---- CHATBOT ----
function openChat() {
  document.getElementById('chatPanel').classList.add('active');
  document.getElementById('chatOverlay').classList.add('active');
  document.getElementById('chatBubble').style.display = 'none';
  document.getElementById('chatInput').focus();
}
function closeChat() {
  document.getElementById('chatPanel').classList.remove('active');
  document.getElementById('chatOverlay').classList.remove('active');
  document.getElementById('chatBubble').style.display = 'flex';
}
function askSuggestion(btn) {
  document.getElementById('chatInput').value = btn.textContent;
  btn.closest('.chat-suggestions').remove();
  sendMessage();
}

async function sendMessage() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';

  appendMsg(msg, 'user');
  showTyping();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `You are Snehal Mastud's personal AI portfolio assistant embedded on her portfolio website. 
Answer questions about Snehal in a helpful, professional, and friendly tone. 
Use she/her pronouns for Snehal. Keep answers concise (2-4 sentences), conversational, and relevant to portfolio/career topics.
Emoji usage: 1-2 per response maximum.

Here is everything about Snehal:

PERSONAL:
- Full name: Snehal Mastud
- Gender: Female (she/her)
- Location: Mumbai, India
- Email: smastud0@gmail.com
- LinkedIn: https://www.linkedin.com/in/snehal-m-23a64716b/
- GitHub: https://github.com/snehalmastud
- Instagram: https://www.instagram.com/snehalmastud

PROFESSIONAL SUMMARY:
- Full-Stack Engineer & AI Practitioner with 5+ years of experience
- End-to-end ownership: backend AND frontend, not just backend
- Experience across banking, aviation, healthcare, and e-commerce domains
- Certified in Agentic AI; actively uses AI tools in her engineering workflow

CURRENT JOB:
- Company: Vernost Tech Ventures Pvt. Ltd.
- Title: Software Engineer (Full-Stack)
- Duration: 2020 – Present (5+ years)
- Location: Mumbai, India

TECHNICAL SKILLS:
- Backend: Node.js, Express.js, JavaScript, JWT, REST APIs, Microservices
- Frontend: React.js, Angular, Next.js, TypeScript, HTML, CSS
- Databases: MongoDB, MySQL, Redis, SQL Server, Indexing, Caching
- Cloud & DevOps: AWS (EC2, S3, Lambda), GCP, Docker, Kubernetes, Jenkins, CI/CD, SonarQube
- AI Tools: Claude (Anthropic), GitHub Copilot, ChatGPT, Emergent, Kiro
- Other: Agile, Git, Jira, Data Modeling, Problem Solving, Team Leadership, Prompt Engineering

CERTIFICATIONS:
- Agentic AI — Coursera (Verified): https://www.coursera.org/account/accomplishments/verify/E7F2MHAH1GH0
  Covers autonomous agents, multi-step reasoning, tool use, agentic workflows

PROJECTS:
1. Axis GrabDeals - Axis Bank loyalty platform; integrated 10+ third-party APIs (Flipkart, Amazon, Puma). Stack: Angular, MySQL, Node.js, Express.js
2. Corefit - Streaming platform for live messaging and video conferencing. Stack: Angular, MySQL, Node.js, Express.js
3. Travel Platform - Backend APIs + frontend for Bluesky and MakeMyTrip; Flights, Hotels, Holiday Packages. Stack: Angular, MySQL, Node.js, EJS
4. Reporting Microservices - 8 microservices reducing API runtime by 30-70% via MySQL indexing. Stack: Angular, MySQL, Node.js, Express.js
5. My Way Miles Platform - Air miles exchange system; 15+ airline partners (Qatar Airways, Saudia, Ascenda); 67% downtime reduction. Stack: Angular, MongoDB, Node.js, Express.js
6. Club by IIFA App - Celebrity fan engagement app; leading IIFA Affiliate backend. Stack: MongoDB, Node.js

EDUCATION:
- BE – Computer Engineering, SMT. Indira Gandhi College of Engineering, Navi Mumbai, 2016–2020

SOFT SKILLS: Problem Solving & Debugging, Cross-functional Communication, Agile Team Collaboration, Leadership & Mentorship

AVAILABILITY: Open to new full-stack or AI-integrated engineering opportunities. Based in Mumbai, open to remote.

If asked about salary, say Snehal is open to discussing compensation based on the role and company.
If asked something not in this data, politely say you don't have that information and suggest contacting Snehal at smastud0@gmail.com.`,
        messages: [{ role: 'user', content: msg }]
      })
    });

    const data = await response.json();
    removeTyping();

    const text = data.content?.map(c => c.text || '').join('') || 'Sorry, I had trouble responding. Please try again!';
    appendMsg(text, 'bot');
  } catch (err) {
    removeTyping();
    appendMsg("Hmm, I'm having connectivity issues. You can reach Snehal directly at smastud0@gmail.com 📧", 'bot');
  }
}

function appendMsg(text, role) {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.textContent = text;
  div.appendChild(bubble);
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function showTyping() {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg bot'; div.id = 'typingIndicator';
  div.innerHTML = `<div class="typing-indicator">
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
  </div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

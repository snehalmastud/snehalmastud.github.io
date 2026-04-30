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
  role: "Senior Backend Engineer",
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

// ─── PARTICLE PORTRAIT — Girl at Laptop ─────────────────────────────────────
(function () {
  const canvas = document.getElementById('particleCanvas');
  const wrap   = document.getElementById('heroPortraitWrap');
  if (!canvas || !wrap) return;

  const ctx  = canvas.getContext('2d');
  const SIZE = 420;
  canvas.width = canvas.height = SIZE;

  const GAP=4, R_MIN=1.1, R_MAX=2.6, REPEL_R=100, REPEL_F=8, SPRING=0.09, DAMP=0.78;
  let particles=[], mouse={x:-9999,y:-9999}, hovering=false, introT=0;

  // ── Draw girl-at-laptop illustration into offscreen canvas ──────────────
  function drawScene() {
    const off = document.createElement('canvas');
    off.width = off.height = SIZE;
    const c = off.getContext('2d');

    /* DESK */
    c.fillStyle='#1e2a3a'; c.beginPath(); c.roundRect(30,285,360,22,6); c.fill();
    c.fillStyle='#162030'; c.fillRect(50,307,14,60); c.fillRect(356,307,14,60);

    /* LAPTOP BASE */
    c.fillStyle='#2a3a4e'; c.beginPath(); c.roundRect(105,258,210,28,[0,0,6,6]); c.fill();
    c.fillStyle='#3ecfcf'; c.globalAlpha=0.3;
    for(let kx=118;kx<305;kx+=9) for(let ky=264;ky<282;ky+=8){c.fillRect(kx,ky,5,4);}
    c.globalAlpha=1;

    /* LAPTOP SCREEN */
    c.fillStyle='#1a2535';
    c.beginPath(); c.moveTo(115,258); c.lineTo(305,258); c.lineTo(320,110); c.lineTo(100,110); c.closePath(); c.fill();
    c.strokeStyle='#2d3f55'; c.lineWidth=3; c.stroke();

    const sg=c.createLinearGradient(108,118,312,250);
    sg.addColorStop(0,'rgba(62,207,207,0.20)'); sg.addColorStop(0.5,'rgba(108,99,255,0.22)'); sg.addColorStop(1,'rgba(10,15,25,0.9)');
    c.fillStyle=sg;
    c.beginPath(); c.moveTo(110,258); c.lineTo(310,258); c.lineTo(315,118); c.lineTo(105,118); c.closePath(); c.fill();

    /* CODE LINES */
    const lines=[{x:120,w:80,col:'#3ecfcf'},{x:120,w:120,col:'#c9956a'},{x:120,w:60,col:'#8888ff'},
                 {x:120,w:95,col:'#3ecfcf'},{x:120,w:70,col:'#e8e6f0'},{x:120,w:110,col:'#c9956a'}];
    lines.forEach((l,i)=>{
      c.fillStyle=l.col; c.globalAlpha=0.78;
      c.beginPath(); c.roundRect(l.x,135+i*17,l.w,5,2); c.fill();
      if(i>0&&i<5){c.globalAlpha=0.35; c.beginPath(); c.roundRect(l.x+12,135+i*17,l.w-18,5,2); c.fill();}
    });
    c.globalAlpha=1;
    c.fillStyle='#3ecfcf'; c.fillRect(120,237,2,10);

    /* CHAIR */
    c.fillStyle='#1e2a3a'; c.beginPath(); c.roundRect(130,330,160,18,6); c.fill();
    c.fillStyle='#1a2535'; c.beginPath(); c.roundRect(145,280,130,55,[8,8,0,0]); c.fill();
    c.strokeStyle='#2d3f55'; c.lineWidth=2; c.stroke();
    c.strokeStyle='#162030'; c.lineWidth=8; c.lineCap='round';
    c.beginPath(); c.moveTo(165,348); c.lineTo(148,392); c.stroke();
    c.beginPath(); c.moveTo(255,348); c.lineTo(272,392); c.stroke();

    /* ARMS */
    c.fillStyle='#c4956a';
    // left arm reaching keyboard
    c.beginPath(); c.moveTo(160,295); c.bezierCurveTo(145,308,128,320,118,332);
    c.bezierCurveTo(124,338,136,337,142,330); c.bezierCurveTo(150,320,164,310,172,302); c.closePath(); c.fill();
    c.fillStyle='#1a2030';
    c.beginPath(); c.moveTo(160,295); c.bezierCurveTo(148,304,136,316,130,324);
    c.bezierCurveTo(136,328,144,328,148,322); c.bezierCurveTo(156,312,166,302,172,298); c.closePath(); c.fill();
    // right arm resting
    c.fillStyle='#c4956a';
    c.beginPath(); c.moveTo(260,295); c.bezierCurveTo(272,308,285,320,292,330);
    c.bezierCurveTo(287,336,277,335,273,329); c.bezierCurveTo(267,320,255,308,248,300); c.closePath(); c.fill();
    c.fillStyle='#1a2030';
    c.beginPath(); c.moveTo(260,295); c.bezierCurveTo(268,306,278,318,284,325);
    c.bezierCurveTo(280,330,272,328,268,322); c.bezierCurveTo(260,312,250,302,248,296); c.closePath(); c.fill();

    /* TORSO */
    c.fillStyle='#1a2030';
    c.beginPath(); c.moveTo(160,290); c.bezierCurveTo(155,312,148,336,155,356);
    c.lineTo(265,356); c.bezierCurveTo(272,336,265,312,260,290);
    c.bezierCurveTo(248,280,172,280,160,290); c.fill();
    // collar
    c.fillStyle='#c9956a';
    c.beginPath(); c.moveTo(196,288); c.lineTo(224,288); c.lineTo(219,301); c.lineTo(210,305); c.lineTo(201,301); c.closePath(); c.fill();

    /* NECK */
    c.fillStyle='#c4956a';
    c.beginPath(); c.moveTo(198,232); c.lineTo(222,232); c.lineTo(224,270); c.lineTo(196,270); c.closePath(); c.fill();

    /* HEAD */
    c.fillStyle='#c4956a';
    c.save(); c.translate(212,198); c.rotate(-0.06);
    c.beginPath(); c.ellipse(0,0,46,58,0,0,Math.PI*2); c.fill(); c.restore();
    c.fillStyle='#b88860'; c.beginPath(); c.ellipse(255,200,7,11,0.2,0,Math.PI*2); c.fill();

    /* HAIR */
    c.fillStyle='#18100a';
    // back long hair
    c.beginPath(); c.moveTo(168,175); c.bezierCurveTo(158,202,156,242,160,286);
    c.bezierCurveTo(174,292,186,290,188,280); c.bezierCurveTo(183,242,183,202,185,170); c.closePath(); c.fill();
    // top hair
    c.beginPath(); c.moveTo(167,170); c.bezierCurveTo(170,148,192,137,212,137);
    c.bezierCurveTo(233,137,252,148,256,168); c.bezierCurveTo(247,157,229,151,212,151);
    c.bezierCurveTo(195,151,178,159,167,170); c.fill();
    // highlight
    c.fillStyle='#2d1e0a'; c.beginPath(); c.moveTo(186,144); c.bezierCurveTo(197,139,218,139,228,147);
    c.bezierCurveTo(216,142,198,142,186,144); c.fill();

    /* GLASSES */
    c.strokeStyle='#3a2a18'; c.lineWidth=2.5; c.fillStyle='rgba(62,207,207,0.07)';
    c.beginPath(); c.roundRect(185,188,30,22,5); c.fill(); c.stroke();
    c.beginPath(); c.roundRect(220,188,30,22,5); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(215,199); c.lineTo(220,199); c.stroke();
    c.beginPath(); c.moveTo(185,199); c.lineTo(172,196); c.stroke();
    c.beginPath(); c.moveTo(250,199); c.lineTo(261,196); c.stroke();

    /* EYES — looking at screen (slightly left) */
    c.fillStyle='#e8e0d5'; c.beginPath(); c.ellipse(197,199,9,6,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(232,199,9,6,0,0,Math.PI*2); c.fill();
    c.fillStyle='#4a3820'; c.beginPath(); c.ellipse(194,199,5,5,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(229,199,5,5,0,0,Math.PI*2); c.fill();
    c.fillStyle='#0a0808'; c.beginPath(); c.ellipse(194,199,2.5,2.5,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(229,199,2.5,2.5,0,0,Math.PI*2); c.fill();
    c.fillStyle='rgba(255,255,255,0.85)'; c.beginPath(); c.ellipse(196,197,1.5,1.5,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(231,197,1.5,1.5,0,0,Math.PI*2); c.fill();

    /* EYEBROWS */
    c.strokeStyle='#18100a'; c.lineWidth=2.2; c.lineCap='round';
    c.beginPath(); c.moveTo(185,184); c.quadraticCurveTo(197,180,208,183); c.stroke();
    c.beginPath(); c.moveTo(222,183); c.quadraticCurveTo(233,179,244,182); c.stroke();

    /* NOSE & MOUTH */
    c.strokeStyle='#b07850'; c.lineWidth=1.5;
    c.beginPath(); c.moveTo(210,208); c.quadraticCurveTo(208,216,212,218); c.stroke();
    c.beginPath(); c.moveTo(203,225); c.quadraticCurveTo(212,230,221,225); c.stroke();

    /* SCREEN GLOW ON FACE */
    const fg=c.createRadialGradient(200,195,0,200,195,70);
    fg.addColorStop(0,'rgba(62,207,207,0.12)'); fg.addColorStop(1,'rgba(62,207,207,0)');
    c.fillStyle=fg; c.beginPath(); c.ellipse(210,195,70,80,0,0,Math.PI*2); c.fill();

    /* COFFEE CUP */
    c.fillStyle='#2a3a4e';
    c.beginPath(); c.moveTo(318,270); c.lineTo(338,270); c.lineTo(335,287); c.lineTo(321,287); c.closePath(); c.fill();
    c.strokeStyle='rgba(62,207,207,0.45)'; c.lineWidth=1.5; c.lineCap='round';
    [324,330,336].forEach(sx=>{c.beginPath(); c.moveTo(sx,268); c.quadraticCurveTo(sx-4,260,sx,252); c.stroke();});
    c.strokeStyle='#2a3a4e'; c.lineWidth=2.5;
    c.beginPath(); c.arc(340,278,6,-0.9,0.9); c.stroke();

    return off;
  }

  // ── Sample scene → particles ─────────────────────────────────────────────
  function buildParticles() {
    const off  = drawScene();
    const data = off.getContext('2d').getImageData(0,0,SIZE,SIZE).data;
    particles  = [];
    for (let y=0; y<SIZE; y+=GAP) {
      for (let x=0; x<SIZE; x+=GAP) {
        const i=((y*SIZE)+x)*4;
        const r=data[i],g=data[i+1],b=data[i+2],a=data[i+3];
        if (a<18) continue;
        const br=(r*.299+g*.587+b*.114)/255;
        if (br<0.03) continue;
        particles.push({
          ox:x, oy:y,
          x: SIZE/2+(Math.random()-.5)*SIZE*1.8,
          y: SIZE/2+(Math.random()-.5)*SIZE*1.8,
          vx:0, vy:0,
          radius: R_MIN+br*(R_MAX-R_MIN),
          color: `rgb(${r},${g},${b})`,
          alpha: Math.min(.6+br*.4,1),
          delay: (Math.random()*60)|0,
        });
      }
    }
  }

  // ── Animation loop ────────────────────────────────────────────────────────
  function draw() {
    ctx.clearRect(0,0,SIZE,SIZE);
    introT++;
    for (const p of particles) {
      if (introT < 150+p.delay) {
        p.x+=(p.ox-p.x)*.055; p.y+=(p.oy-p.y)*.055;
      } else {
        const dx=p.x-mouse.x, dy=p.y-mouse.y, dist=Math.sqrt(dx*dx+dy*dy);
        if (hovering && dist<REPEL_R && dist>0) {
          const f=((REPEL_R-dist)/REPEL_R)*REPEL_F, a=Math.atan2(dy,dx);
          p.vx+=Math.cos(a)*f; p.vy+=Math.sin(a)*f;
        }
        p.vx+=(p.ox-p.x)*SPRING; p.vy+=(p.oy-p.y)*SPRING;
        p.vx*=DAMP; p.vy*=DAMP; p.x+=p.vx; p.y+=p.vy;
      }
      ctx.globalAlpha=p.alpha; ctx.fillStyle=p.color;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.radius,0,Math.PI*2); ctx.fill();
    }
    ctx.globalAlpha=1;
    requestAnimationFrame(draw);
  }

  // ── Events ────────────────────────────────────────────────────────────────
  function getPos(e) {
    const r=canvas.getBoundingClientRect(), sc=SIZE/r.width, s=e.touches?e.touches[0]:e;
    return {x:(s.clientX-r.left)*sc, y:(s.clientY-r.top)*sc};
  }
  canvas.addEventListener('mousemove',  e=>{const p=getPos(e);mouse.x=p.x;mouse.y=p.y;hovering=true;});
  canvas.addEventListener('mouseleave', ()=>{mouse.x=-9999;mouse.y=-9999;hovering=false;});
  canvas.addEventListener('touchmove',  e=>{e.preventDefault();const p=getPos(e);mouse.x=p.x;mouse.y=p.y;hovering=true;},{passive:false});
  canvas.addEventListener('touchend',   ()=>{hovering=false;mouse.x=-9999;mouse.y=-9999;});

  buildParticles();
  draw();
})();

// ─── SELF-BUILT PROJECT FILTER ───────────────────────────────────────────────
function filterSB(cat, btn) {
  document.querySelectorAll('.sb-filter').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('#sbGrid .sb-card').forEach(card => {
    const c = card.dataset.cat;
    if (cat === 'all' || c === cat) {
      card.style.display = '';
      card.style.animation = 'sbFadeIn 0.4s ease forwards';
    } else {
      card.style.display = 'none';
    }
  });
}

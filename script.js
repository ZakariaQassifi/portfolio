/* ==========================================================
   ZAKARIA QASSIFI — portfolio scripts
   theme, modal, zexter chat, particles, reveal
   ========================================================== */

'use strict';

/* ---------- THEME ---------- */
(() => {
  const toggle = document.getElementById('checkbox');
  if (!toggle) return;

  const apply = (light) => {
    document.body.classList.toggle('light-mode', light);
    localStorage.setItem('theme', light ? 'light' : 'dark');
  };

  const saved = localStorage.getItem('theme');
  const initial = saved ? saved === 'light' : true;

  apply(initial);
  toggle.checked = initial;

  toggle.addEventListener('change', () => {
    apply(toggle.checked);
    window.buildThemePalette?.();
  });
})();

function isLightMode() {
  return document.body.classList.contains('light-mode');
}

/* ---------- CV MODAL ---------- */
let cvModalOpener = null;

function openCVModal(opener) {
  const modal = document.getElementById('cvModal');
  if (!modal) return;
  cvModalOpener = opener || document.activeElement;
  modal.classList.add('active');
  const close = modal.querySelector('.modal-close');
  if (close) close.focus();
}

function closeCVModal() {
  const modal = document.getElementById('cvModal');
  if (!modal) return;
  modal.classList.remove('active');
  if (cvModalOpener instanceof HTMLElement) cvModalOpener.focus();
  cvModalOpener = null;
}

(() => {
  const modal = document.getElementById('cvModal');
  if (!modal) return;
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeCVModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeCVModal();
    if (e.key === 'Tab' && modal.classList.contains('active')) {
      const focusables = modal.querySelectorAll('button, a[href]');
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
})();

/* ---------- ZEXTER CHAT ---------- */
const zexterResponses = {
  'hello': "Hey there! 👋 I'm Zexter, Zakaria's assistant. How can I help you today?",
  'hi': "Hi! Welcome to the chat. What would you like to know about Zakaria?",
  'email': 'You can reach Zakaria at zakariaqassifi10@gmail.com 📧',
  'contact': "Here's how to reach Zakaria:\n📧 Email: zakariaqassifi10@gmail.com\n📞 Phone: +212 633-008210\n🐙 GitHub: ZakariaQassifi\n💼 LinkedIn: Zakaria Qassifi",
  'phone': "Zakaria's phone number is +212 633-008210 📞",
  'github': 'Zakaria is on GitHub at github.com/ZakariaQassifi 🐙',
  'linkedin': 'Connect with Zakaria on LinkedIn: linkedin.com/in/zakaria-qassifi-87874b286/ 💼',
  'help': "I can help with:\n→ Contact information\n→ Zakaria's links\n\nTry asking about: email, phone, github, linkedin, contact.",
  'thanks': "You're welcome! Anything else I can do for you? 😊",
  'thank you': 'Happy to help! Let me know if you need anything else! 🙌',
  'default': "Thanks for reaching out! I'll make sure Zakaria gets your message. You can also email zakariaqassifi10@gmail.com or call +212 633-008210."
};

function zexterReply(message) {
  const lower = message.toLowerCase();
  for (const [key, response] of Object.entries(zexterResponses)) {
    if (key === 'default') continue;
    if (new RegExp(`\\b${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(lower)) {
      return response;
    }
  }
  return zexterResponses.default;
}

function handleZexterMessage(event) {
  event.preventDefault();
  const input = document.getElementById('zexter-input');
  const message = input.value.trim();
  if (!message) return;

  addChatMessage(message, 'user');
  input.value = '';
  input.focus();

  window.setTimeout(() => {
    addChatMessage(zexterReply(message), 'bot');
  }, 500);
}

function addChatMessage(message, kind) {
  const container = document.getElementById('zexter-chat');
  if (!container) return;

  const isUser = kind === 'user';

  const bubble = document.createElement('div');
  bubble.className = `chat-message ${isUser ? 'msg-user' : 'msg-bot'}`;

  const head = document.createElement('p');
  head.className = 'msg-head';

  const prefix = document.createElement('span');
  prefix.className = isUser ? 'term-user' : 'msg-prefix';
  prefix.textContent = isUser ? 'you@guest' : 'zexter@ai';

  const time = document.createElement('span');
  time.className = 'msg-time';
  time.textContent = `[${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}]`;

  const content = document.createElement('div');
  content.className = 'msg-content msg-text';
  content.textContent = message;

  head.append(prefix, time);
  bubble.append(head, content);
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

/* ---------- SCROLL REVEAL ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ---------- PARTICLE CANVAS ---------- */
(() => {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const NUM_PARTICLES = 60;
  const NUM_STARS = 200;
  const NUM_VERSES = 5;
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/%=<>!@#&_[]{}()|?;:πΩΣΔΦΨ".split('');

  const VERSES = [
    "Everything's gon be fin,\n i been praying all night to god",
    "Break the matrix\n ou lqa life hack",
    "la masdaq walou\n i will go again",
    "i'm not perfect\n but i'm right",
    "3endi mission, ma gha ne7bass\n til i get it done",
    "People change,\n in every way",
    "Nothing matter,\n my fate's calling",
    "manqadsh nkoun nobody else",
    "Just know it won't be over",
    "kyn zwin kyn lkhayb\n bjoujhum fin o 3arfinhum,\n lisr limn khtar binhum"
  ];

  let particles = [];
  let stars = [];
  let verses = [];
  let palette = {};
  let starPaint = () => 'rgba(255,255,255,0)';

  function buildThemePalette() {
    const verseColors = isLightMode()
      ? ['#0e9d68', '#2e7fce', '#b47c0e']
      : ['#34d399', '#60a5fa', '#e8c268'];

    palette = isLightMode()
      ? { trail: '14, 157, 104', verse: verseColors, veil: '246, 243, 236' }
      : { trail: '52, 211, 153', verse: verseColors, veil: '18, 22, 31' };

    starPaint = isLightMode()
      ? (o) => `rgba(46, 53, 64, ${o * 0.35})`
      : (o) => `rgba(227, 231, 239, ${o * 0.85})`;

    verses.forEach((v) => {
      v.color = verseColors[Math.floor(Math.random() * verseColors.length)];
    });
  }
  window.buildThemePalette = buildThemePalette;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Star {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 1.5;
      this.opacity = Math.random() * 0.5 + 0.3;
      this.speed = Math.random() * 0.02 + 0.01;
      this.dir = Math.random() > 0.5 ? 1 : -1;
    }
    update() {
      this.opacity += this.speed * this.dir;
      if (this.opacity >= 1) { this.opacity = 1; this.dir = -1; }
      if (this.opacity <= 0.1) { this.opacity = 0.1; this.dir = 1; }
    }
    draw() {
      ctx.fillStyle = starPaint(this.opacity);
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  class Verse {
    constructor() {
      this.text = VERSES[Math.floor(Math.random() * VERSES.length)];
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.opacity = 0.3;
      this.dir = Math.random() > 0.5 ? 1 : -1;
      this.size = Math.random() * 10 + 8;
      this.color = palette.verse[Math.floor(Math.random() * palette.verse.length)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x > canvas.width + 100) this.x = -100;
      if (this.x < -100) this.x = canvas.width + 100;
      if (this.y > canvas.height + 50) this.y = -50;
      if (this.y < -50) this.y = canvas.height + 50;

      this.opacity += 0.005 * this.dir;
      if (this.opacity >= 0.5) this.dir = -1;
      if (this.opacity <= 0.15) this.dir = 1;
    }
    wrap(text, maxWidth) {
      const words = text.split(' ');
      const lines = [];
      let line = '';
      for (const word of words) {
        const test = line ? `${line} ${word}` : word;
        if (ctx.measureText(test).width > maxWidth && line) {
          lines.push(line);
          line = word;
        } else {
          line = test;
        }
      }
      if (line) lines.push(line);
      return lines;
    }
    draw() {
      ctx.font = `${this.size}px 'IBM Plex Mono', monospace`;
      ctx.fillStyle = this.color;
      ctx.globalAlpha = isLightMode() ? this.opacity * 0.6 : this.opacity;
      this.wrap(this.text, 350).forEach((line, i) => {
        ctx.fillText(line, this.x, this.y + i * this.size * 1.4);
      });
      ctx.globalAlpha = 1;
    }
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 14 + 6;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.char = CHARS[Math.floor(Math.random() * CHARS.length)];
      this.counter = 0;
      this.interval = Math.floor(Math.random() * 20 + 10);
      this.trail = [];
      this.trailLength = 12;
      this.glow = Math.random() * 0.5 + 0.5;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;

      this.trail.push({ x: this.x, y: this.y });
      if (this.trail.length > this.trailLength) this.trail.shift();

      if (++this.counter >= this.interval) {
        this.char = CHARS[Math.floor(Math.random() * CHARS.length)];
        this.counter = 0;
      }
    }
    draw() {
      for (let i = 0; i < this.trail.length; i++) {
        const t = (i / this.trail.length) * this.opacity * 0.4;
        ctx.fillStyle = `rgba(${palette.trail}, ${t})`;
        ctx.font = `${this.size * (i / this.trail.length)}px 'IBM Plex Mono', monospace`;
        ctx.fillText(this.char, this.trail[i].x, this.trail[i].y);
      }

      if (!isLightMode()) {
        ctx.shadowColor = `rgba(${palette.trail}, ${this.glow})`;
        ctx.shadowBlur = 10 + this.glow * 5;
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.fillStyle = `rgba(${palette.trail}, ${this.opacity})`;
      ctx.font = `${this.size}px 'IBM Plex Mono', monospace`;
      ctx.fillText(this.char, this.x, this.y);
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
    }
  }

  function init() {
    buildThemePalette();
    particles = Array.from({ length: NUM_PARTICLES }, () => new Particle());
    stars = Array.from({ length: NUM_STARS }, () => new Star());
    verses = Array.from({ length: NUM_VERSES }, () => new Verse());
  }

  function frame() {
    const veil = palette.veil || '18, 22, 31';
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, `rgba(${veil}, 0.25)`);
    gradient.addColorStop(0.5, `rgba(${veil}, 0.2)`);
    gradient.addColorStop(1, `rgba(${veil}, 0.25)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach((s) => { s.update(); s.draw(); });
    verses.forEach((v) => { v.update(); v.draw(); });
    particles.forEach((p) => { p.update(); p.draw(); });

    if (!reduceMotion) requestAnimationFrame(frame);
  }

  init();
  frame();
})();

/* ---------- PORTRAIT DRAW-HIGHLIGHT (spotlight via CSS vars) ---------- */
(() => {
  const spotlightTargets = document.querySelectorAll('[data-spotlight]');
  if (spotlightTargets.length === 0) return;
  spotlightTargets.forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
  });
})();

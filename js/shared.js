/* ═══════════════════════════════════════════════════
   USCSS PORTFOLIO — Shared JS
   Cursor, audio, HUD, timestamp, project data
   ═══════════════════════════════════════════════════ */

/* ── Project Data ── */
const MISSIONS = {
  clients: [
    {
      id: 'C-01', name: 'The Wok', type: 'ADVERTISING',
      year: '2022', client: 'THE WOK', outcome: '+15% CUSTOMERS',
      thumb: 'assets/projects/the-wok/thumb.jpg',
      images: ['assets/projects/the-wok/full.jpg'],
      description: 'Full advertising campaign for The Wok restaurant. Designed logo, promotional materials, social media assets, and in-store signage that drove a measurable increase in foot traffic and customer engagement.',
      tools: ['Photoshop', 'Illustrator', 'InDesign']
    },
    {
      id: 'C-02', name: 'Cobra FA', type: 'BRANDING',
      year: '2021', client: 'COBRA FA', outcome: 'DEPLOYED',
      thumb: 'assets/projects/cobra-fa/thumb.jpg',
      images: ['assets/projects/cobra-fa/full.jpg'],
      description: 'Brand identity and logo design for Cobra FA. Created a bold visual identity including logo, flag design, vehicle wraps, and branded merchandise for a tactical/outdoor organization.',
      tools: ['Illustrator', 'Photoshop']
    },
    {
      id: 'C-03', name: 'Kebabz Heaven', type: 'RESTAURANT BRANDING',
      year: '2023', client: 'KEBABZ HEAVEN', outcome: 'IN USE',
      thumb: 'assets/projects/kebabz-heaven/thumb.jpg',
      images: ['assets/projects/kebabz-heaven/full.jpg'],
      description: 'Complete restaurant branding including logo, trifold menu design, and Instagram-ready marketing materials. Delivered print-ready files with bleed and test prints for production quality assurance.',
      tools: ['Illustrator', 'InDesign', 'Photoshop']
    },
    {
      id: 'C-04', name: 'Olea Group Real Estate', type: 'BRANDING',
      year: '2023', client: 'OLEA GROUP', outcome: 'IMPLEMENTED',
      thumb: 'assets/projects/olea-group/thumb.png',
      images: ['assets/projects/olea-group/full.png'],
      description: 'Brand identity for Olea Group Real Estate. Designed logo, business cards, name tags, and vehicle graphics including moving truck wraps for both the real estate and construction divisions.',
      tools: ['Illustrator', 'Photoshop']
    },
    {
      id: 'C-05', name: 'Voice for The Voiceless', type: 'NONPROFIT BRANDING',
      year: '2022', client: 'VFTV', outcome: 'LAUNCHED',
      thumb: 'assets/projects/voice-for-voiceless/thumb.jpg',
      images: ['assets/projects/voice-for-voiceless/full.jpg'],
      description: 'Brand identity and merchandise design for Voice for The Voiceless nonprofit. Created logo, branded merchandise including coffee mug mockups, and promotional materials to support the organization\'s mission.',
      tools: ['Illustrator', 'Photoshop']
    },
    {
      id: 'C-06', name: 'Daves Fleck', type: 'LOGO DESIGN',
      year: '2023', client: 'DAVES FLECK', outcome: 'DELIVERED',
      thumb: 'assets/projects/daves-fleck/thumb.png',
      images: ['assets/projects/daves-fleck/full.png'],
      description: 'Logo design and brand mark for Daves Fleck. Developed a clean, professional raindrop-inspired logo with multiple color variants and high-resolution upscaled versions for various applications.',
      tools: ['Illustrator']
    },
    {
      id: 'C-07', name: 'Riff Graphics', type: 'EVENT DESIGN',
      year: '2024', client: 'RIFF / BARNHART', outcome: 'DISTRIBUTED',
      thumb: 'assets/projects/riff-graphics/thumb.jpg',
      images: ['assets/projects/riff-graphics/full.jpg'],
      description: 'Event flyer and promotional design for Riff music events. Created eye-catching flyers, hiring announcements, and social media graphics with bold typography and vibrant color palettes.',
      tools: ['Illustrator', 'Photoshop']
    },
    {
      id: 'C-08', name: 'Expert Roofing', type: 'PRINT DESIGN',
      year: '2024', client: 'EXPERT ROOFING', outcome: 'IN CIRCULATION',
      thumb: 'assets/projects/expert-roofing/thumb.jpg',
      images: ['assets/projects/expert-roofing/full.jpg'],
      description: 'Print marketing materials for Expert Roofing. Designed storm damage awareness flyers, branded shirt concepts, and marketing collateral with CMYK print-ready specifications.',
      tools: ['Illustrator', 'Photoshop']
    }
  ],
  personal: [
    {
      id: 'P-01', name: 'American Physico', type: 'FILM / MOTION',
      year: '2023', client: 'SELF', outcome: 'COMPLETED',
      thumb: 'assets/projects/american-physico/thumb.jpg',
      images: ['assets/projects/american-physico/full.jpg'],
      description: 'Short film project combining live action with motion graphics and VHS-era video editing techniques. A satirical homage exploring consumer culture through retro fitness aesthetics.',
      tools: ['Premiere Pro', 'After Effects', 'Photoshop']
    },
    {
      id: 'P-02', name: 'Alien Romulus Poster', type: 'POSTER DESIGN',
      year: '2024', client: 'SELF', outcome: 'COMPLETED',
      thumb: 'assets/projects/alien-romulus/thumb.jpg',
      images: ['assets/projects/alien-romulus/full.jpg'],
      description: 'Fan poster design for Alien: Romulus. Created a atmospheric movie poster using photo manipulation, mood board development, and layered compositing to capture the franchise\'s signature dread.',
      tools: ['Photoshop']
    },
    {
      id: 'P-03', name: 'Gateway to Mars', type: 'MOTION / 3D',
      year: '2024', client: 'SELF', outcome: 'EXHIBITED',
      thumb: 'assets/projects/mars-poster/thumb.jpg',
      images: ['assets/projects/mars-poster/full.jpg'],
      description: 'Motion poster and print series envisioning a gateway mission to Mars. Combined After Effects animation with Photoshop compositing to create both 4K motion and static poster versions.',
      tools: ['After Effects', 'Photoshop']
    },
    {
      id: 'P-04', name: 'RAGE Energy', type: '3D / PACKAGING',
      year: '2023', client: 'SELF', outcome: 'CAPSTONE PROJECT',
      thumb: 'assets/projects/rage-energy/thumb.jpg',
      images: ['assets/projects/rage-energy/full.jpg'],
      description: 'Capstone project: complete brand identity and 3D packaging design for RAGE energy drink. Built photorealistic 3D can renders in Blender, designed package layouts, and produced a promotional commercial.',
      tools: ['Blender', 'Illustrator', 'Premiere Pro']
    },
    {
      id: 'P-05', name: 'Artist Motion Poster', type: 'MOTION / 3D',
      year: '2024', client: 'SELF', outcome: 'COMPLETED',
      thumb: 'assets/projects/artists-poster/thumb.jpg',
      images: ['assets/projects/artists-poster/full.jpg'],
      description: '3D motion poster created in Blender with After Effects compositing. Features dynamic typography, upscaled imagery, and cinematic motion design exported for both Instagram and 4K display.',
      tools: ['Blender', 'After Effects', 'Photoshop']
    }
  ]
};

/* ── Cursor (rAF for zero-lag) ── */
const cursorEl = document.getElementById('cursor');
let cursorX = 0, cursorY = 0, cursorRaf = false;
function updateCursor() {
  if (cursorEl) cursorEl.style.transform = `translate3d(${cursorX - 10}px, ${cursorY - 10}px, 0)`;
  cursorRaf = false;
}
document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  if (!cursorRaf) { cursorRaf = true; requestAnimationFrame(updateCursor); }
  const xyEl = document.getElementById('xy');
  if (xyEl) xyEl.textContent = `X:${e.clientX} Y:${e.clientY}`;
});

/* ── Audio ── */
const humEl = document.getElementById('hum');
const blipEl = document.getElementById('blip');

if (humEl) {
  humEl.volume = 0.175;
}

function startHum() {
  if (!humEl || humEl.dataset.started) return;
  humEl.dataset.started = '1';
  humEl.muted = false;
  humEl.currentTime = 0;
  humEl.play().catch(() => {});
}

window.addEventListener('pointerdown', startHum, { once: true });
window.addEventListener('keydown', startHum, { once: true });

function playBlip() {
  if (!blipEl) return;
  blipEl.currentTime = 0;
  blipEl.volume = 0.30;
  blipEl.play().catch(() => {});
}

/* ── HUD Timestamp ── */
function tickTS() {
  const tsEl = document.getElementById('ts');
  if (!tsEl) return;
  const d = new Date();
  tsEl.textContent = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}
tickTS();
setInterval(tickTS, 1000);

/* ── Mission Grid Init ── */
function initMissionGrid(channel, container) {
  // Scope to specific container to avoid barba dual-container race
  const root = container || document;
  const grid = root.querySelector('.mission-grid');
  if (!grid) return;

  const missions = MISSIONS[channel];
  if (!missions) return;

  grid.innerHTML = '';

  missions.forEach((m) => {
    const card = document.createElement('div');
    card.className = 'mission-card';
    card.dataset.id = m.id;
    card.innerHTML = `
      <div class="thumb">
        <div class="placeholder">LOADING...</div>
        <img src="${m.thumb}" alt="${m.name}" loading="lazy" onload="this.classList.add('loaded')" onerror="this.style.display='none'">
      </div>
      <div class="info">
        <div class="title">${m.name}</div>
        <div class="type-label">${m.type}</div>
        <div class="tools-label">${m.tools.join(' / ')}</div>
      </div>
    `;

    card.addEventListener('mouseenter', () => playBlip());
    card.addEventListener('click', () => openCaseFile(m));

    grid.appendChild(card);
  });
}

/* ── Dossier Pull Animation ── */
function runDossierPull(mission, onComplete) {
  const dossier = document.getElementById('dossier-pull');
  if (!dossier) { onComplete(); return; }

  const terminal = dossier.querySelector('.dossier-terminal');
  dossier.classList.add('active');
  document.body.classList.add('overlay-open');
  terminal.innerHTML = '';

  const lines = [
    { text: '> USCSS MAINFRAME v4.2.1', delay: 0 },
    { text: '> SECURE CONNECTION... OK', delay: 80 },
    { text: `> QUERY: ${mission.id} // ${mission.name.toUpperCase()}`, delay: 200 },
    { text: '> SEARCHING ARCHIVE...', delay: 350 },
    { text: `> MATCH: ${mission.type}`, delay: 500 },
    { text: '> CLEARANCE: CONFIRMED', delay: 650 },
    { text: '> PULLING ASSET CACHE...', delay: 800 },
    { text: '> STATUS: READY', delay: 950 },
    { text: '> OPENING FILE...', delay: 1050 },
  ];

  lines.forEach(({ text, delay }) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'dossier-line';
      line.textContent = text;
      terminal.appendChild(line);
      terminal.scrollTop = terminal.scrollHeight;
      playBlip();
    }, delay);
  });

  // After sequence, fade out and show case file
  setTimeout(() => {
    dossier.classList.add('fade-out');
    setTimeout(() => {
      dossier.classList.remove('active', 'fade-out');
      terminal.innerHTML = '';
      onComplete();
    }, 200);
  }, 1250);
}

/* ── Case File Overlay ── */
let _activeMission = null;
let _activeImgIdx = 0;

function _renderCaseImg(overlay) {
  const img = overlay.querySelector('.case-image img');
  const counter = overlay.querySelector('.case-img-counter');
  img.src = _activeMission.images[_activeImgIdx];
  img.alt = _activeMission.name;
  if (counter) counter.textContent = `IMAGE ${_activeImgIdx + 1} / ${_activeMission.images.length}`;
}

function caseImgNav(dir) {
  if (!_activeMission) return;
  _activeImgIdx = (_activeImgIdx + dir + _activeMission.images.length) % _activeMission.images.length;
  playBlip();
  const overlay = document.getElementById('case-file');
  if (overlay) _renderCaseImg(overlay);
}

function openCaseFile(mission) {
  const overlay = document.getElementById('case-file');
  if (!overlay) return;

  _activeMission = mission;
  _activeImgIdx = 0;

  // Gallery mode when multiple images
  if (mission.images.length > 1) {
    overlay.classList.add('has-gallery');
  } else {
    overlay.classList.remove('has-gallery');
  }

  overlay.querySelector('.case-title').textContent = `MISSION FILE: ${mission.id} // ${mission.name.toUpperCase()}`;
  _renderCaseImg(overlay);

  const details = overlay.querySelector('.case-details');
  details.innerHTML = `
    <div class="case-detail"><div class="label">DESIGNATION</div><div class="value">${mission.id}</div></div>
    <div class="case-detail"><div class="label">TYPE</div><div class="value">${mission.type}</div></div>
    <div class="case-detail"><div class="label">CLIENT</div><div class="value">${mission.client}</div></div>
    <div class="case-detail"><div class="label">YEAR</div><div class="value">${mission.year}</div></div>
    <div class="case-detail"><div class="label">TOOLS</div><div class="value">${mission.tools.join(' / ')}</div></div>
    <div class="case-detail"><div class="label">OUTCOME</div><div class="value">${mission.outcome}</div></div>
  `;

  overlay.querySelector('.case-description').textContent = mission.description;

  // Run dossier pull, then reveal case file
  runDossierPull(mission, () => {
    overlay.classList.add('open');
    history.pushState({ overlayOpen: true }, '');
    const focusable = overlay.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();
  });
}

function closeCaseFile() {
  const overlay = document.getElementById('case-file');
  if (!overlay || !overlay.classList.contains('open')) return;

  overlay.classList.remove('open');
  document.body.classList.remove('overlay-open');
}

// Close overlay on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCaseFile();
});

// Close overlay on popstate (browser back)
window.addEventListener('popstate', (e) => {
  const overlay = document.getElementById('case-file');
  if (overlay && overlay.classList.contains('open')) {
    closeCaseFile();
  }
});

/* ── Transmission Terminal ── */
function sendTransmission() {
  const name = document.getElementById('tx-name')?.value?.trim();
  const email = document.getElementById('tx-email')?.value?.trim();
  const subject = document.getElementById('tx-subject')?.value?.trim();
  const message = document.getElementById('tx-message')?.value?.trim();

  if (!name || !email || !subject || !message) {
    playBlip();
    return;
  }

  const formWrap = document.getElementById('tx-form-wrap');
  const receipt = document.getElementById('tx-receipt');
  if (!formWrap || !receipt) return;

  // Hide form
  formWrap.style.display = 'none';

  // Generate mission file number
  const txId = 'TX-' + Date.now().toString(36).toUpperCase().slice(-6);

  const lines = [
    { text: '> ENCODING TRANSMISSION...', delay: 0 },
    { text: '> SIGNAL LOCKED', delay: 150 },
    { text: '> ROUTING...', delay: 300 },
    { text: '> TRANSMISSION SENT', delay: 500 },
    { text: '', delay: 600 },
    { text: `> FILE: ${txId}`, delay: 700 },
    { text: `> SENDER: ${name.toUpperCase()}`, delay: 800 },
    { text: `> SUBJECT: ${subject.toUpperCase()}`, delay: 900 },
    { text: `> RETURN: ${email}`, delay: 1000 },
    { text: '', delay: 1100 },
    { text: '> RECEIPT LOGGED. STANDBY.', delay: 1200 },
    { text: '> END TRANSMISSION', delay: 1400 },
  ];

  receipt.innerHTML = '';
  receipt.classList.add('visible');

  lines.forEach(({ text, delay }) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'receipt-line';
      line.textContent = text;
      receipt.appendChild(line);
      receipt.scrollTop = receipt.scrollHeight;
      playBlip();
    }, delay);
  });

  // Actually send via mailto (opens email client)
  setTimeout(() => {
    const mailtoLink = `mailto:augustpirraglia@gmail.com?subject=${encodeURIComponent('[USCSS] ' + subject)}&body=${encodeURIComponent('From: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;
    window.open(mailtoLink, '_blank');
  }, 1600);
}

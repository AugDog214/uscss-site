/* ═══════════════════════════════════════════════════
   USCSS PORTFOLIO — Channel Sweep + Barba Transitions
   Canvas sweep L→R, white flash, clip-path roll-in,
   channel HUD overlay
   ═══════════════════════════════════════════════════ */

(function () {
  const sweepCanvas = document.getElementById('channel-sweep');
  const channelHud = document.getElementById('channel-hud');
  let sweepCtx = null;
  let sweepRafId = null;

  if (sweepCanvas) {
    sweepCtx = sweepCanvas.getContext('2d');
  }

  /* ── Channel numbers per namespace ── */
  const CHANNEL_MAP = {
    index: 'CH 00',
    clients: 'CH 01',
    personal: 'CH 02',
    contact: 'CH 03'
  };

  /* ── Canvas Sweep Animation ── */
  function startChannelSweep(onComplete) {
    if (!sweepCanvas || !sweepCtx) { onComplete(); return; }

    sweepCanvas.style.display = 'block';
    sweepCanvas.width = window.innerWidth;
    sweepCanvas.height = window.innerHeight;

    const ctx = sweepCtx;
    const W = sweepCanvas.width;
    const H = sweepCanvas.height;

    // Generate random horizontal bands
    const bands = [];
    const bandCount = 40 + Math.floor(Math.random() * 30);
    for (let i = 0; i < bandCount; i++) {
      bands.push({
        y: Math.random() * H,
        thickness: 2 + Math.random() * 4,
        progress: 0,
        speed: 0.04 + Math.random() * 0.03,
        opacity: 0.6 + Math.random() * 0.4
      });
    }

    let globalProgress = 0;
    const sweepDuration = 200; // ms
    const startTime = performance.now();

    function drawSweep(now) {
      const elapsed = now - startTime;
      globalProgress = Math.min(elapsed / sweepDuration, 1);

      ctx.clearRect(0, 0, W, H);

      // Draw bands sweeping L→R
      bands.forEach(band => {
        band.progress = Math.min(globalProgress / band.speed * 0.04, 1);
        const bandWidth = W * band.progress;

        ctx.fillStyle = `rgba(255, 255, 255, ${band.opacity * 0.15})`;
        ctx.fillRect(0, band.y, bandWidth, band.thickness);

        // Leading edge glow
        if (band.progress < 1) {
          const gradient = ctx.createLinearGradient(bandWidth - 20, 0, bandWidth, 0);
          gradient.addColorStop(0, 'rgba(255,255,255,0)');
          gradient.addColorStop(1, `rgba(255,255,255,${band.opacity * 0.4})`);
          ctx.fillStyle = gradient;
          ctx.fillRect(bandWidth - 20, band.y - 1, 20, band.thickness + 2);
        }
      });

      // Overall noise/static layer
      if (globalProgress < 1) {
        ctx.fillStyle = `rgba(255,255,255,${0.02 + globalProgress * 0.03})`;
        for (let i = 0; i < 100; i++) {
          const nx = Math.random() * W * globalProgress;
          const ny = Math.random() * H;
          ctx.fillRect(nx, ny, Math.random() * 3, 1);
        }
      }

      if (globalProgress < 1) {
        sweepRafId = requestAnimationFrame(drawSweep);
      } else {
        // White flash
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.fillRect(0, 0, W, H);

        setTimeout(() => {
          sweepCanvas.style.display = 'none';
          ctx.clearRect(0, 0, W, H);
          onComplete();
        }, 80);
      }
    }

    sweepRafId = requestAnimationFrame(drawSweep);
  }

  function cancelSweep() {
    if (sweepRafId) {
      cancelAnimationFrame(sweepRafId);
      sweepRafId = null;
    }
    if (sweepCanvas) {
      sweepCanvas.style.display = 'none';
    }
  }

  /* ── Channel HUD ── */
  function showChannelHud(namespace) {
    if (!channelHud) return;
    channelHud.textContent = CHANNEL_MAP[namespace] || 'CH ??';
    channelHud.classList.add('visible');
    setTimeout(() => channelHud.classList.remove('visible'), 1200);
  }

  /* ── Clip-path Roll-in ── */
  function rollInContainer(container) {
    if (!container) return;
    container.style.clipPath = 'inset(0 0 100% 0)';
    container.style.transition = 'none';
    container.offsetHeight; // force reflow
    container.style.transition = 'clip-path 400ms ease-out';
    container.style.clipPath = 'inset(0 0 0% 0)';
  }

  /* ── Page-specific init ── */
  function initNamespace(namespace, container) {
    const threeHost = document.getElementById('three-canvas-host');

    if (namespace === 'index') {
      if (threeHost) threeHost.classList.remove('hidden');
      const modeDisplay = document.getElementById('modeDisplay');
      if (modeDisplay) modeDisplay.textContent = 'CLIENTS';
    } else {
      if (threeHost) threeHost.classList.add('hidden');
    }

    // Init mission grid on channel pages
    if (namespace === 'clients') {
      initMissionGrid('clients', container);
    } else if (namespace === 'personal') {
      initMissionGrid('personal', container);
    }

    // Update active nav link
    document.querySelectorAll('.page-nav a').forEach(link => {
      const href = link.getAttribute('href');
      const isActive =
        (namespace === 'index' && href === 'index.html') ||
        (namespace === 'clients' && href === 'clients.html') ||
        (namespace === 'personal' && href === 'personal.html') ||
        (namespace === 'contact' && href === 'contact.html');
      link.classList.toggle('active', isActive);
    });

    // Update HUD mode text
    const modeDisplay = document.getElementById('modeDisplay');
    const channelNames = { clients: 'CHANNEL 01', personal: 'CHANNEL 02', contact: 'CHANNEL 03' };
    if (channelNames[namespace] && modeDisplay) {
      modeDisplay.textContent = channelNames[namespace];
    }
  }

  /* ── Barba.js Init ── */
  if (typeof barba !== 'undefined') {

    // Use global hooks for page init (more reliable than transition-level hooks)
    barba.hooks.beforeLeave((data) => {
      cancelSweep();
      closeCaseFile();
      const nextNs = data.next.namespace || 'index';
      showChannelHud(nextNs);
    });

    barba.hooks.beforeEnter((data) => {
      if (data.next.container) {
        data.next.container.style.clipPath = 'inset(0 0 100% 0)';
      }
    });

    barba.hooks.afterEnter((data) => {
      const namespace = data.next.namespace || 'index';
      rollInContainer(data.next.container);
      initNamespace(namespace, data.next.container);
      window.scrollTo(0, 0);
    });

    barba.init({
      preventRunning: true,
      transitions: [{
        name: 'channel-sweep',
        leave() {
          // Canvas sweep animation, returns promise
          return new Promise(resolve => {
            startChannelSweep(() => resolve());
          });
        }
      }]
    });

    // Init current page on first load
    const currentNamespace = document.querySelector('[data-barba="container"]')?.dataset.barbaNamespace || 'index';
    initNamespace(currentNamespace);

  } else {
    // No barba — direct page load
    const ns = document.body.dataset.namespace || 'index';
    const threeHost = document.getElementById('three-canvas-host');
    if (ns !== 'index' && threeHost) threeHost.classList.add('hidden');
    if (ns === 'clients') initMissionGrid('clients');
    if (ns === 'personal') initMissionGrid('personal');

    document.querySelectorAll('.page-nav a').forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active',
        (ns === 'index' && href === 'index.html') ||
        (ns === 'clients' && href === 'clients.html') ||
        (ns === 'personal' && href === 'personal.html') ||
        (ns === 'contact' && href === 'contact.html')
      );
    });
  }

})();

/* ═══════════════════════════════════════════════════
   USCSS PORTFOLIO — Three.js Scene (index.html only)
   ═══════════════════════════════════════════════════ */

(function () {
  const host = document.getElementById('three-canvas-host');
  if (!host) return;

  let scene, camera, renderer, textMesh, particles;
  let mouseX = 0, mouseY = 0;
  let isClients = true, t = 0;
  let asteroids = [], planets = [], foregroundPlanets = [];

  // Zoom navigation
  let currentZoom = 15;
  const minZoom = 10, maxZoom = 50, navThreshold = 45;
  let isNavigating = false;
  let animFrameId = null;

  const modeDisplay = document.getElementById('modeDisplay');
  const zoomLevelEl = document.getElementById('zoomLevel');

  function init() {
    const w = innerWidth, h = innerHeight;
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a0a, 20, 120);

    camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 200);
    camera.position.set(0, 1.2, 15);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setClearColor(0x0a0a0a, 1);
    host.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0x00ff41, 0.4));
    const key = new THREE.PointLight(0x00ff41, 2.2, 100);
    key.position.set(3, 4, 6);
    scene.add(key);
    const foreLight = new THREE.PointLight(0x00ff41, 1.5, 150);
    foreLight.position.set(0, 0, 50);
    scene.add(foreLight);

    // Back planet (main)
    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(3.2, 64, 64),
      new THREE.MeshStandardMaterial({ color: '#0b1d1a', roughness: 0.9, metalness: 0.05, emissive: '#061b14', emissiveIntensity: 0.2 })
    );
    planet.position.set(0, -1.8, -10);
    scene.add(planet);

    // Additional planets
    const planetData = [
      { size: 1.8, pos: [-18, 5, -25], color: '#1a2d2a', emissive: '#0a1f1a' },
      { size: 2.5, pos: [22, -3, -30], color: '#2d1a1a', emissive: '#1f0a0a' },
      { size: 1.2, pos: [-12, -8, -20], color: '#1a1a2d', emissive: '#0a0a1f' },
      { size: 0.8, pos: [15, 8, -18], color: '#2d2d1a', emissive: '#1f1f0a' },
      { size: 3.5, pos: [30, 2, -40], color: '#1d2a1a', emissive: '#0f1a0a', hasRing: true }
    ];

    planetData.forEach((data, i) => {
      const p = new THREE.Mesh(
        new THREE.SphereGeometry(data.size, 32, 32),
        new THREE.MeshStandardMaterial({ color: data.color, roughness: 0.85, metalness: 0.1, emissive: data.emissive, emissiveIntensity: 0.15 })
      );
      p.position.set(...data.pos);
      scene.add(p);
      planets.push({ mesh: p, speed: 0.0002 + Math.random() * 0.0003, axis: i % 2 === 0 ? 'y' : 'x' });

      if (data.hasRing) {
        const ringGeo = new THREE.RingGeometry(data.size * 1.4, data.size * 2.2, 64);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x00ff41, side: THREE.DoubleSide, transparent: true, opacity: 0.3 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2.5;
        ring.rotation.y = 0.3;
        p.add(ring);
      }
    });

    // Asteroids
    function createAsteroid() {
      const size = 0.1 + Math.random() * 0.3;
      const geo = new THREE.IcosahedronGeometry(size, 0);
      const positions = geo.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        positions.setX(i, positions.getX(i) + (Math.random() - 0.5) * size * 0.5);
        positions.setY(i, positions.getY(i) + (Math.random() - 0.5) * size * 0.5);
        positions.setZ(i, positions.getZ(i) + (Math.random() - 0.5) * size * 0.5);
      }
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({ color: '#3a3a3a', roughness: 1, metalness: 0.2, emissive: '#0a1a0a', emissiveIntensity: 0.1 });
      const asteroid = new THREE.Mesh(geo, mat);
      asteroid.position.set((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 30, -80 - Math.random() * 40);
      scene.add(asteroid);
      asteroids.push({
        mesh: asteroid,
        speed: 0.15 + Math.random() * 0.25,
        rotSpeed: { x: Math.random() * 0.05, y: Math.random() * 0.05, z: Math.random() * 0.05 }
      });
    }

    for (let i = 0; i < 15; i++) createAsteroid();

    // Foreground planets
    const foregroundData = [
      { size: 4, pos: [-10, 4, 20], color: '#1a2d2a', emissive: '#0a3f2a' },
      { size: 6, pos: [12, -3, 28], color: '#2d1a1a', emissive: '#3f1a1a', hasRing: true },
      { size: 3, pos: [-8, -5, 36], color: '#1a1a2d', emissive: '#1a1a3f' },
      { size: 5, pos: [14, 6, 44], color: '#2d2a1a', emissive: '#3f3a1a' },
    ];

    foregroundData.forEach((data) => {
      const fp = new THREE.Mesh(
        new THREE.SphereGeometry(data.size, 48, 48),
        new THREE.MeshStandardMaterial({ color: data.color, roughness: 0.7, metalness: 0.2, emissive: data.emissive, emissiveIntensity: 0.5 })
      );
      fp.position.set(...data.pos);
      fp.renderOrder = 1;
      scene.add(fp);

      const fgPlanet = { mesh: fp, originalZ: data.pos[2], rotSpeed: 0.001 + Math.random() * 0.002 };

      if (data.hasRing) {
        const ringGeo = new THREE.RingGeometry(data.size * 1.5, data.size * 2.5, 64);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x00ff41, side: THREE.DoubleSide, transparent: true, opacity: 0.4 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2.2;
        ring.rotation.y = 0.4;
        fp.add(ring);

        const innerRingGeo = new THREE.RingGeometry(data.size * 1.2, data.size * 1.45, 64);
        const innerRingMat = new THREE.MeshBasicMaterial({ color: 0x00aa30, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
        const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
        innerRing.rotation.x = Math.PI / 2.2;
        innerRing.rotation.y = 0.4;
        fp.add(innerRing);
      }

      foregroundPlanets.push(fgPlanet);
    });

    // Stars
    const starGeo = new THREE.BufferGeometry();
    const count = 900;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x00ff41, size: 0.08, opacity: 0.6, transparent: true });
    particles = new THREE.Points(starGeo, starMat);
    scene.add(particles);

    // Text plane
    textMesh = new THREE.Mesh(new THREE.PlaneGeometry(20, 5), new THREE.MeshBasicMaterial({ transparent: true }));
    scene.add(textMesh);
    drawText('CLIENTS');

    // Events
    addEventListener('resize', onResize);
    addEventListener('mousemove', onSceneMouseMove);
    addEventListener('click', onSceneClick);
    addEventListener('wheel', onSceneWheel, { passive: false });

    // Hide loading screen
    setTimeout(() => {
      const l = document.getElementById('loading');
      if (l) { l.style.opacity = '0'; setTimeout(() => l.remove(), 300); }
    }, 900);

    animate();
  }

  function drawText(text, glitch = false) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1024; canvas.height = 256;

    ctx.fillStyle = '#0a0a0a'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'bold 120px Courier New';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (glitch) {
      const off = (Math.random() * 20 - 10) | 0;
      ctx.fillStyle = '#ff0044'; ctx.fillText(text, canvas.width / 2 + off, canvas.height / 2);
      ctx.fillStyle = '#0044ff'; ctx.fillText(text, canvas.width / 2 - off, canvas.height / 2);
      ctx.fillStyle = '#00ff41';
      const chars = text.split('');
      let x = canvas.width / 2 - chars.length * 35;
      for (let i = 0; i < chars.length; i++) {
        const yoff = (Math.random() * 10 - 5) | 0;
        ctx.fillText(chars[i], x + i * 70 + Math.random() * 4, canvas.height / 2 + yoff);
      }
    } else {
      ctx.fillStyle = '#00ff41';
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    }

    for (let i = 0; i < canvas.height; i += 4) {
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fillRect(0, i, canvas.width, 2);
    }

    const tex = new THREE.CanvasTexture(canvas); tex.needsUpdate = true;
    textMesh.material.map = tex; textMesh.material.needsUpdate = true;
  }

  function onSceneMouseMove(e) {
    const w = innerWidth, h = innerHeight;
    mouseX = (e.clientX / w) * 2 - 1;
    mouseY = -(e.clientY / h) * 2 + 1;

    const wasClients = isClients;
    isClients = mouseX < 0;
    if (wasClients !== isClients) {
      const label = isClients ? 'CLIENTS' : 'PERSONAL';
      if (modeDisplay) modeDisplay.textContent = label;
      drawText(label, true);
      setTimeout(() => drawText(label, false), 80);
      playBlip();
    }
  }

  function onSceneClick() {
    startHum();
    playBlip();
    const dest = isClients ? 'clients.html' : 'personal.html';
    // If barba is active, let it handle navigation
    if (window.barba) {
      barba.go(dest);
    } else {
      setTimeout(() => { location.href = dest; }, 150);
    }
  }

  function onSceneWheel(e) {
    e.preventDefault();
    if (isNavigating) return;

    const zoomSpeed = 0.8;
    currentZoom += e.deltaY * 0.01 * zoomSpeed;
    currentZoom = Math.max(minZoom, Math.min(maxZoom, currentZoom));

    const zoomPercent = Math.round(((currentZoom - minZoom) / (maxZoom - minZoom)) * 100);
    if (zoomLevelEl) zoomLevelEl.textContent = zoomPercent + '%';

    if (currentZoom >= navThreshold && !isNavigating) {
      isNavigating = true;
      triggerZoomNavigation();
    }
  }

  function triggerZoomNavigation() {
    startHum();
    playBlip();
    const dest = isClients ? 'clients.html' : 'personal.html';

    const finalZoom = () => {
      currentZoom += 2;
      if (currentZoom < 80) {
        requestAnimationFrame(finalZoom);
      } else {
        if (window.barba) {
          barba.go(dest);
        } else {
          location.href = dest;
        }
      }
    };
    finalZoom();
  }

  function animate() {
    animFrameId = requestAnimationFrame(animate);

    camera.position.z += (currentZoom - camera.position.z) * 0.08;

    const zoomFactor = 1 - ((currentZoom - minZoom) / (maxZoom - minZoom)) * 0.7;
    scene.rotation.y += ((mouseX * 0.35 * zoomFactor) - scene.rotation.y) * 0.05;
    scene.rotation.x += ((-mouseY * 0.15 * zoomFactor) - scene.rotation.x) * 0.05;

    if (textMesh) {
      textMesh.position.x += ((mouseX * 2 * zoomFactor) - textMesh.position.x) * 0.05;
      textMesh.position.y += ((mouseY * 2 * zoomFactor) - textMesh.position.y) * 0.05;
      t += 0.02;
      const s = 1 + Math.min(Math.hypot(mouseX, mouseY) * 0.3, 0.25) + Math.sin(t) * 0.01;
      textMesh.scale.set(s, s, 1);
    }

    if (particles) {
      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0003;
    }

    planets.forEach(p => {
      if (p.axis === 'y') p.mesh.rotation.y += p.speed;
      else p.mesh.rotation.x += p.speed;
    });

    foregroundPlanets.forEach(fp => {
      fp.mesh.rotation.y += fp.rotSpeed;
    });

    asteroids.forEach(a => {
      a.mesh.position.z += a.speed;
      a.mesh.rotation.x += a.rotSpeed.x;
      a.mesh.rotation.y += a.rotSpeed.y;
      a.mesh.rotation.z += a.rotSpeed.z;
      if (a.mesh.position.z > 20) {
        a.mesh.position.set((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 30, -80 - Math.random() * 40);
        a.speed = 0.15 + Math.random() * 0.25;
      }
    });

    if (currentZoom > navThreshold - 10) {
      const fadeProgress = (currentZoom - (navThreshold - 10)) / 10;
      renderer.setClearColor(0x0a0a0a, 1 - fadeProgress * 0.3);
    } else {
      renderer.setClearColor(0x0a0a0a, 1);
    }

    renderer.render(scene, camera);
  }

  function onResize() {
    const w = innerWidth, h = innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  // Expose destroy for barba transitions (cleanup when leaving index)
  window.destroyScene = function () {
    if (animFrameId) cancelAnimationFrame(animFrameId);
    removeEventListener('resize', onResize);
    removeEventListener('mousemove', onSceneMouseMove);
    removeEventListener('click', onSceneClick);
    removeEventListener('wheel', onSceneWheel);
    if (renderer) {
      renderer.dispose();
      host.innerHTML = '';
    }
    host.classList.add('hidden');
  };

  window.initScene = function () {
    host.classList.remove('hidden');
    if (!renderer) {
      init();
    }
  };

  // Auto-init on load
  init();
})();

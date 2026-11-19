/**
 * JIIT Exam Hub - 3D Hyper-Fluid Kinetic Loader
 * Powered by Three.js WebGL & Kinetic Particle Physics
 * Inspired by futuristic 3D loading sequences (gyro rings, cosmic core, floating cards & warp transition)
 */

(function () {
  'use strict';

  // State
  let scene, camera, renderer, animationFrameId;
  let coreGroup, particleSystem, ringsGroup, floatingCardsGroup;
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let isExiting = false;
  let progress = 0;
  let progressInterval;
  let starburstVelocities = [];

  const loaderOverlay = document.getElementById("loader3dOverlay");
  const canvasContainer = document.getElementById("loader3dCanvasContainer");
  const progressBar = document.getElementById("loaderProgressBar");
  const progressText = document.getElementById("loaderPercentage");
  const statusText = document.getElementById("loaderStatusText");
  const enterBtn = document.getElementById("loaderEnterBtn");
  const skipBtn = document.getElementById("loaderSkipBtn");

  if (!loaderOverlay || !canvasContainer) return;

  const STATUS_MESSAGES = [
    { at: 5, text: "INITIALIZING JIIT NEURAL CORE..." },
    { at: 25, text: "CALIBRATING T1, T2 & T3 EXAM VECTORS..." },
    { at: 50, text: "MAPPING CSE, IT, ECE, MnC & RAI CURRICULA..." },
    { at: 75, text: "TUNING 100-TRACK STUDY SOUNDSCAPE..." },
    { at: 92, text: "FLUID DYNAMICS SYNCHRONIZED..." },
    { at: 100, text: "SYSTEM OPERATIONAL • READY FOR LAUNCH" }
  ];

  // 1. Initialize Three.js Scene
  function initThreeScene() {
    if (typeof THREE === "undefined") {
      console.warn("Three.js not loaded, falling back to 2D loader.");
      fallbackFastExit();
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c0903, 0.0018);

    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    camera.position.set(0, 0, 420);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    canvasContainer.innerHTML = "";
    canvasContainer.appendChild(renderer.domElement);

    // Dynamic Cyber Amber & Gold Lighting
    const ambientLight = new THREE.AmbientLight(0x261b07, 1.8);
    scene.add(ambientLight);

    const amberLight = new THREE.PointLight(0xf59e0b, 3.6, 600);
    amberLight.position.set(120, 150, 150);
    scene.add(amberLight);

    const goldLight = new THREE.PointLight(0xfacc15, 3.2, 600);
    goldLight.position.set(-140, -120, 180);
    scene.add(goldLight);

    const yellowLight = new THREE.PointLight(0xfef08a, 2.6, 700);
    yellowLight.position.set(0, 200, -50);
    scene.add(yellowLight);

    // Root Group
    coreGroup = new THREE.Group();
    scene.add(coreGroup);

    createCentralCrystal();
    createGyroscopicRings();
    createStarburstParticles();
    createFloating3DCards();

    // Event Listeners
    window.addEventListener("resize", onWindowResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    startProgressCounter();
    animate(0);
  }

  // 2. Central Polyhedral Core with Dual Layers
  function createCentralCrystal() {
    // Outer wireframe dodecahedron (Electric Gold)
    const outerGeo = new THREE.DodecahedronGeometry(55, 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
      emissive: 0xd97706,
      emissiveIntensity: 0.6
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    outerMesh.name = "outerCrystal";
    coreGroup.add(outerMesh);

    // Inner faceted gem (Icosahedron) with metallic reflections (Cyber Gold)
    const innerGeo = new THREE.IcosahedronGeometry(36, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      metalness: 0.85,
      roughness: 0.15,
      emissive: 0xb45309,
      emissiveIntensity: 0.5,
      flatShading: true
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    innerMesh.name = "innerCrystal";
    coreGroup.add(innerMesh);

    // Core glowing energy point
    const corePointGeo = new THREE.SphereGeometry(12, 16, 16);
    const corePointMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95
    });
    const corePoint = new THREE.Mesh(corePointGeo, corePointMat);
    coreGroup.add(corePoint);
  }

  // 3. Gyroscopic Orbital Rings (Dual Ring System in Gold Grade)
  function createGyroscopicRings() {
    ringsGroup = new THREE.Group();
    coreGroup.add(ringsGroup);

    const ringDefs = [
      { radius: 85, tube: 1.5, color: 0xf59e0b, rotSpeed: { x: 0.015, y: 0.02, z: 0.005 } },
      { radius: 110, tube: 1.2, color: 0xfacc15, rotSpeed: { x: -0.018, y: 0.012, z: 0.015 } },
      { radius: 135, tube: 0.9, color: 0xfde047, rotSpeed: { x: 0.008, y: -0.022, z: -0.012 } }
    ];

    ringDefs.forEach((def, index) => {
      const geo = new THREE.TorusGeometry(def.radius, def.tube, 16, 100);
      const mat = new THREE.MeshStandardMaterial({
        color: def.color,
        emissive: def.color,
        emissiveIntensity: 0.75,
        roughness: 0.2,
        metalness: 0.8
      });
      const ring = new THREE.Mesh(geo, mat);
      ring.userData = def.rotSpeed;
      ring.name = `gyroRing_${index}`;
      ringsGroup.add(ring);

      // Add orbiting satellites / tick beads onto rings
      const beadGeo = new THREE.SphereGeometry(3.5, 12, 12);
      const beadMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const bead = new THREE.Mesh(beadGeo, beadMat);
      bead.position.x = def.radius;
      ring.add(bead);
    });
  }

  // 4. Starburst Cosmic Particles with Pulse Waves (Amber & Gold)
  function createStarburstParticles() {
    const count = 1800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    starburstVelocities = [];

    const colorAmber = new THREE.Color(0xf59e0b);
    const colorGold = new THREE.Color(0xfacc15);
    const colorChampagne = new THREE.Color(0xfef08a);
    const colorWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < count; i++) {
      // Golden Spiral distribution on sphere / torus shells
      const radius = 130 + Math.random() * 450;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      starburstVelocities.push({
        baseRadius: radius,
        speed: 0.2 + Math.random() * 0.8,
        offset: Math.random() * Math.PI * 2,
        origX: x,
        origY: y,
        origZ: z
      });

      // Palette blending (Gold / Amber / Champagne / White)
      let c = colorAmber;
      const rand = Math.random();
      if (rand > 0.75) c = colorWhite;
      else if (rand > 0.45) c = colorGold;
      else if (rand > 0.2) c = colorChampagne;

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = 2.5 + Math.random() * 4.0;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Custom glowing particle sprite (Amber & Gold)
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.3, "rgba(250,204,21,0.9)");
    grad.addColorStop(0.7, "rgba(217,119,6,0.35)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);

    const pMaterial = new THREE.PointsMaterial({
      size: 5,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    particleSystem = new THREE.Points(geometry, pMaterial);
    scene.add(particleSystem);
  }

  // 5. Floating 3D Cards / Glass Badges orbiting in perspective
  function createFloating3DCards() {
    floatingCardsGroup = new THREE.Group();
    scene.add(floatingCardsGroup);

    const cardData = [
      { label: "T1 • 20M", sub: "Units 1 & 2", pos: [175, 75, 90], rot: [0.1, -0.3, 0.05] },
      { label: "T2 • 20M", sub: "Mid-Sem", pos: [-190, 85, 60], rot: [0.2, 0.35, -0.1] },
      { label: "T3 • 35M", sub: "Comprehensive", pos: [150, -110, 110], rot: [-0.15, -0.25, 0.08] },
      { label: "100 Lo-Fi", sub: "Study Playlist", pos: [-160, -95, 80], rot: [-0.1, 0.3, 0.05] },
      { label: "JIIT 62/128", sub: "Noida Campus", pos: [0, 155, 40], rot: [0.25, 0, 0] }
    ];

    cardData.forEach((data, index) => {
      const card = create3DGlassCard(data.label, data.sub);
      card.position.set(data.pos[0], data.pos[1], data.pos[2]);
      card.rotation.set(data.rot[0], data.rot[1], data.rot[2]);
      card.userData = {
        baseY: data.pos[1],
        baseX: data.pos[0],
        phase: index * 1.25,
        speed: 1.2 + index * 0.2
      };
      floatingCardsGroup.add(card);
    });
  }

  function create3DGlassCard(textTitle, textSub) {
    const group = new THREE.Group();

    // Canvas texture with high DPI crisp graphics
    const w = 320;
    const h = 140;
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d");

    // Rounded glassy rectangle
    ctx.fillStyle = "rgba(18, 14, 6, 0.90)";
    ctx.strokeStyle = "rgba(245, 158, 11, 0.85)";
    ctx.lineWidth = 4;
    roundRect(ctx, 4, 4, w - 8, h - 8, 22);
    ctx.fill();
    ctx.stroke();

    // Header pill
    ctx.fillStyle = "rgba(245, 158, 11, 0.25)";
    roundRect(ctx, 20, 18, 90, 24, 12);
    ctx.fill();

    ctx.fillStyle = "#fde047";
    ctx.font = "bold 13px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("JIIT HUB", 34, 35);

    // Main Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 32px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(textTitle, 20, 82);

    // Subtitle
    ctx.fillStyle = "#d4d0c5";
    ctx.font = "600 16px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(textSub, 20, 114);

    const texture = new THREE.CanvasTexture(c);
    const planeGeo = new THREE.PlaneGeometry(62, 27);
    const planeMat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.92,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(planeGeo, planeMat);
    group.add(mesh);
    return group;
  }

  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  // 6. Smooth Progress Increment Engine
  function startProgressCounter() {
    progress = 0;
    const duration = 2800; // ~2.8s smooth loading
    const start = performance.now();

    function update() {
      if (isExiting) return;
      const elapsed = performance.now() - start;
      const t = Math.min(1, elapsed / duration);

      // Cubic out easing
      const eased = 1 - Math.pow(1 - t, 3);
      progress = Math.floor(eased * 100);

      if (progressBar) progressBar.style.width = `${progress}%`;
      if (progressText) progressText.textContent = `${progress}%`;

      // Update HUD status line
      for (let i = STATUS_MESSAGES.length - 1; i >= 0; i--) {
        if (progress >= STATUS_MESSAGES[i].at) {
          if (statusText && statusText.textContent !== STATUS_MESSAGES[i].text) {
            statusText.textContent = STATUS_MESSAGES[i].text;
          }
          break;
        }
      }

      if (t < 1) {
        requestAnimationFrame(update);
      } else {
        progress = 100;
        if (progressBar) progressBar.style.width = "100%";
        if (progressText) progressText.textContent = "100%";
        if (statusText) statusText.textContent = "SYSTEM OPERATIONAL • READY FOR LAUNCH";
        onLoadingReady();
      }
    }
    requestAnimationFrame(update);
  }

  // 7. Called when 100% is reached
  function onLoadingReady() {
    if (enterBtn) {
      enterBtn.classList.add("visible");
      enterBtn.focus();
    }
    // Auto launch after slight pause if user doesn't immediately click
    setTimeout(() => {
      if (!isExiting) triggerWarpExit();
    }, 1100);
  }

  // 8. The Crazy Warp Drive Exit Animation
  function triggerWarpExit() {
    if (isExiting) return;
    isExiting = true;

    if (loaderOverlay) loaderOverlay.classList.add("warp-active");

    // Play subtle audio sound if available
    try {
      if (window.playChime) window.playChime("streak");
    } catch (e) { }

    // Camera zooms into the 3D portal with lights-speed acceleration
    const startZ = camera.position.z;
    const targetZ = -250;
    const warpDuration = 900;
    const startTime = performance.now();

    function animateWarp(now) {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / warpDuration);
      const ease = t * t * t; // cubic in acceleration

      camera.position.z = startZ + (targetZ - startZ) * ease;
      camera.fov = 60 + ease * 40;
      camera.updateProjectionMatrix();

      // Expand rings rapidly like a sonic shockwave
      if (ringsGroup) {
        ringsGroup.scale.setScalar(1 + ease * 4.5);
      }
      if (coreGroup) {
        coreGroup.rotation.y += 0.08 * (1 + ease * 5);
        coreGroup.rotation.x += 0.05 * (1 + ease * 5);
      }

      if (t < 1) {
        requestAnimationFrame(animateWarp);
      } else {
        completeExit();
      }
    }
    requestAnimationFrame(animateWarp);
  }

  function completeExit() {
    if (loaderOverlay) {
      loaderOverlay.classList.add("hidden");
      setTimeout(() => {
        loaderOverlay.style.display = "none";
        // Stop animation loop to save 100% CPU/GPU for the hub
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      }, 500);
    }
  }

  function fallbackFastExit() {
    if (loaderOverlay) {
      loaderOverlay.style.transition = "opacity 0.4s ease";
      loaderOverlay.style.opacity = "0";
      setTimeout(() => {
        loaderOverlay.style.display = "none";
      }, 400);
    }
  }

  // 9. Interactive Mouse Parallax (Fluid Mechanics)
  function onMouseMove(e) {
    mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  }

  function onTouchMove(e) {
    if (e.touches.length > 0) {
      mouse.targetX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
    }
  }

  function onWindowResize() {
    if (!camera || !renderer) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  // 10. Animation Loop (60 FPS Fluid Physics)
  function animate(timestamp) {
    animationFrameId = requestAnimationFrame(animate);

    const time = timestamp * 0.001;

    // Smooth inertia mouse lerp
    mouse.x += (mouse.targetX - mouse.x) * 0.06;
    mouse.y += (mouse.targetY - mouse.y) * 0.06;

    // Camera organic breathing + tilt
    if (!isExiting) {
      camera.position.x = mouse.x * 45;
      camera.position.y = -mouse.y * 35 + Math.sin(time * 0.8) * 8;
      camera.lookAt(0, 0, 0);
    }

    // Core Rotation
    if (coreGroup) {
      const outer = coreGroup.getObjectByName("outerCrystal");
      const inner = coreGroup.getObjectByName("innerCrystal");

      if (outer) {
        outer.rotation.x = time * 0.35 + mouse.y * 0.5;
        outer.rotation.y = time * 0.5 + mouse.x * 0.5;
      }
      if (inner) {
        inner.rotation.x = -time * 0.6;
        inner.rotation.y = -time * 0.45;
        const scale = 1 + Math.sin(time * 3) * 0.05;
        inner.scale.set(scale, scale, scale);
      }
    }

    // Gyroscopic Rings Spin
    if (ringsGroup) {
      ringsGroup.children.forEach(ring => {
        if (ring.userData) {
          ring.rotation.x += ring.userData.x;
          ring.rotation.y += ring.userData.y;
          ring.rotation.z += ring.userData.z;
        }
      });
    }

    // Floating Cards Orbit and Hover
    if (floatingCardsGroup) {
      floatingCardsGroup.children.forEach(card => {
        const u = card.userData;
        card.position.y = u.baseY + Math.sin(time * u.speed + u.phase) * 12;
        card.position.x = u.baseX + Math.cos(time * 0.7 + u.phase) * 6;
        card.rotation.z += Math.sin(time + u.phase) * 0.002;
        // Make cards gently face towards camera
        card.lookAt(camera.position.x * 0.25, camera.position.y * 0.25, camera.position.z + 100);
      });
    }

    // Starburst Particle Wave Undulation
    if (particleSystem) {
      particleSystem.rotation.y = time * 0.04;
      particleSystem.rotation.x = time * 0.02;

      const positions = particleSystem.geometry.attributes.position.array;
      for (let i = 0; i < starburstVelocities.length; i++) {
        const v = starburstVelocities[i];
        const pulse = Math.sin(time * v.speed + v.offset) * 14;
        const factor = (v.baseRadius + pulse) / v.baseRadius;
        positions[i * 3] = v.origX * factor;
        positions[i * 3 + 1] = v.origY * factor;
        positions[i * 3 + 2] = v.origZ * factor;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
  }

  // Button actions
  if (enterBtn) {
    enterBtn.addEventListener("click", triggerWarpExit);
  }

  if (skipBtn) {
    skipBtn.addEventListener("click", triggerWarpExit);
  }

  // Keyboard shortcut: Space or Enter to enter hub
  window.addEventListener("keydown", (e) => {
    if (!isExiting && (e.code === "Space" || e.code === "Enter")) {
      if (loaderOverlay && loaderOverlay.style.display !== "none") {
        triggerWarpExit();
      }
    }
  });

  // Replay Functionality for Navbar "3D Intro" button
  window.replay3DIntro = function () {
    if (!loaderOverlay) return;
    loaderOverlay.style.display = "flex";
    loaderOverlay.style.opacity = "1";
    loaderOverlay.classList.remove("warp-active", "hidden");
    isExiting = false;
    if (camera) {
      camera.position.set(0, 0, 420);
      camera.fov = 60;
      camera.updateProjectionMatrix();
    }
    if (ringsGroup) ringsGroup.scale.set(1, 1, 1);
    startProgressCounter();
    if (!animationFrameId) animate(0);
  };

  // Launch on DOM Ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThreeScene);
  } else {
    initThreeScene();
  }

})();


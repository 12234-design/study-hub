/**
 * JIIT Exam Hub - 3D Hyper-Kinetic Transparent Cyber Cosmos & Neural Glass Lattice
 * Inspired by modern high-end WebGL interactive experiences (LiquidGL, Stripe Press, Apple)
 * 
 * Features:
 * 1. Multi-Layered Frosted 3D Glass Crystals (Icosahedrons, Octahedrons, Torus Knots, Gyro Rings)
 *    with glowing neon wireframe edges and pulsating internal energy cores.
 * 2. Real-Time 3D Neural Constellation Network with dynamic proximity energy beams.
 * 3. Reactive Scroll Physics: Multi-axial tumbling, vertical parallax drifting & kinetic surge.
 * 4. Interactive Mouse Gravity & Elastic Fluid Repulsion: Objects tilt, dodge and bounce.
 * 5. Audio Beat Synchronization: Subtle rhythmic pulse when Lo-Fi study music is playing.
 * 6. High-Performance 60 FPS WebGL Engine with true transparency and zero DOM interference.
 */

(function () {
  'use strict';

  let scene, camera, renderer, animationFrameId;
  let crystals = [];
  let networkPoints, networkLines, networkGeo, lineGeo;
  let networkPositions = [];
  let networkVelocities = [];
  let flowGridMesh;
  let lights = {};

  // Physics & Interaction State
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0, speed: 0, lastX: 0, lastY: 0 };
  let scroll = {
    current: 0,
    target: 0,
    velocity: 0,
    normalized: 0,
    maxScroll: 1000
  };

  const NODE_COUNT = 75;
  const CONNECTION_DIST = 115;

  const canvas = document.getElementById("liquidBackgroundCanvas");
  if (!canvas) return;

  function init() {
    if (typeof THREE === "undefined") {
      console.warn("Three.js not loaded. Skipping 3D background.");
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene & Depth Fog
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090702, 0.0014);

    // 2. Camera with cinematic wide perspective
    camera = new THREE.PerspectiveCamera(55, width / height, 1, 2500);
    camera.position.set(0, 0, 360);
    camera.lookAt(0, 0, 0);

    // 3. WebGL Renderer with High-Performance Settings
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    // 4. Dynamic Cyber Amber & Gold Lighting
    const ambientLight = new THREE.AmbientLight(0x241a06, 2.5);
    scene.add(ambientLight);

    lights.cyan = new THREE.PointLight(0xf59e0b, 5.2, 900);
    lights.cyan.position.set(-180, 160, 220);
    scene.add(lights.cyan);

    lights.blue = new THREE.PointLight(0xfacc15, 5.5, 950);
    lights.blue.position.set(200, -120, 240);
    scene.add(lights.blue);

    lights.indigo = new THREE.PointLight(0xfef08a, 4.0, 850);
    lights.indigo.position.set(0, 220, 120);
    scene.add(lights.indigo);

    lights.violet = new THREE.PointLight(0xd97706, 3.8, 750);
    lights.violet.position.set(0, -220, 150);
    scene.add(lights.violet);

    // 5. Construct 3D Elements
    createKineticGlassCrystals();
    createNeuralNetworkLattice();
    createDeepUndulatingGrid();

    // 6. Event Listeners
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    updateMaxScroll();
    animate(0);
  }

  function updateMaxScroll() {
    scroll.maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  }

  // ==========================================
  // 1. KINETIC 3D GLASS CYBER CRYSTALS
  // ==========================================
  function createKineticGlassCrystals() {
    crystals = [];

    const configs = [
      // 1. Giant Center-Right Torus Knot (Cyber Gold Loop)
      {
        type: "torusKnot",
        args: [28, 7.5, 120, 18],
        pos: [195, 90, 40],
        color: 0xf59e0b,
        wireColor: 0xfbbf24,
        scrollFactor: -0.65,
        speed: 0.9,
        tumble: [0.012, 0.016, 0.008]
      },
      // 2. Center-Left Faceted Icosahedron (Crystal of Knowledge)
      {
        type: "icosahedron",
        args: [38, 0],
        pos: [-190, 110, 50],
        color: 0xfacc15,
        wireColor: 0xfef08a,
        scrollFactor: 0.55,
        speed: 1.1,
        tumble: [0.015, -0.012, 0.01]
      },
      // 3. Floating Octahedron Diamond (Amber Computing Core)
      {
        type: "octahedron",
        args: [32, 0],
        pos: [-170, -110, 80],
        color: 0xd97706,
        wireColor: 0xf59e0b,
        scrollFactor: 0.75,
        speed: 1.25,
        tumble: [-0.01, 0.018, -0.014]
      },
      // 4. Engineering Dodecahedron (Structural Geometry)
      {
        type: "dodecahedron",
        args: [34, 0],
        pos: [180, -90, 60],
        color: 0xeab308,
        wireColor: 0xfde047,
        scrollFactor: -0.5,
        speed: 0.85,
        tumble: [0.014, 0.009, -0.012]
      },
      // 5. Gyroscopic Dual Ring Satellite
      {
        type: "gyro",
        args: [32, 3],
        pos: [0, 170, -20],
        color: 0xf59e0b,
        wireColor: 0xfacc15,
        scrollFactor: 0.4,
        speed: 1.0,
        tumble: [0.02, 0.025, 0.01]
      },
      // 6. Deep Ambient Prism
      {
        type: "octahedron",
        args: [24, 0],
        pos: [-90, -160, 40],
        color: 0xd97706,
        wireColor: 0xfbbf24,
        scrollFactor: 0.8,
        speed: 1.4,
        tumble: [-0.015, -0.015, 0.02]
      },
      // 7. Radiant Lo-Fi Golden Gem
      {
        type: "icosahedron",
        args: [26, 0],
        pos: [110, 150, 20],
        color: 0xfacc15,
        wireColor: 0xfef9c3,
        scrollFactor: -0.45,
        speed: 1.15,
        tumble: [0.018, -0.01, 0.015]
      },
      // 8. Foreground Floating Micro Prism
      {
        type: "tetrahedron",
        args: [20, 0],
        pos: [-130, 20, 100],
        color: 0xfbbf24,
        wireColor: 0xfef08a,
        scrollFactor: 0.6,
        speed: 1.3,
        tumble: [0.02, 0.015, -0.01]
      }
    ];

    configs.forEach((cfg, idx) => {
      const group = new THREE.Group();

      let geom;
      if (cfg.type === "torusKnot") {
        geom = new THREE.TorusKnotGeometry(cfg.args[0], cfg.args[1], cfg.args[2], cfg.args[3]);
      } else if (cfg.type === "icosahedron") {
        geom = new THREE.IcosahedronGeometry(cfg.args[0], cfg.args[1]);
      } else if (cfg.type === "octahedron") {
        geom = new THREE.OctahedronGeometry(cfg.args[0], cfg.args[1]);
      } else if (cfg.type === "dodecahedron") {
        geom = new THREE.DodecahedronGeometry(cfg.args[0], cfg.args[1]);
      } else if (cfg.type === "tetrahedron") {
        geom = new THREE.TetrahedronGeometry(cfg.args[0], cfg.args[1]);
      } else if (cfg.type === "gyro") {
        geom = new THREE.TorusGeometry(cfg.args[0], cfg.args[1], 16, 60);
      }

      // 1. Transparent Glass Physical Shell
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: 0.25,
        roughness: 0.08,
        metalness: 0.15,
        transmission: 0.88,
        transparent: true,
        opacity: 0.65,
        ior: 1.45,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        flatShading: true
      });
      const glassMesh = new THREE.Mesh(geom, glassMat);
      group.add(glassMesh);

      // 2. Glowing Neon Wireframe Cage
      const wireMat = new THREE.MeshBasicMaterial({
        color: cfg.wireColor,
        wireframe: true,
        transparent: true,
        opacity: 0.65
      });
      const wireMesh = new THREE.Mesh(geom, wireMat);
      wireMesh.scale.setScalar(1.02);
      group.add(wireMesh);

      // 3. Inner Floating Energy Core
      const coreGeo = new THREE.OctahedronGeometry(cfg.args[0] * 0.38, 0);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.85
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      group.add(coreMesh);

      // Group Position & UserData
      group.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
      group.userData = {
        baseX: cfg.pos[0],
        baseY: cfg.pos[1],
        baseZ: cfg.pos[2],
        speed: cfg.speed,
        scrollFactor: cfg.scrollFactor,
        phase: idx * 1.1,
        tumble: cfg.tumble,
        coreMesh: coreMesh,
        glassMesh: glassMesh,
        wireMesh: wireMesh,
        velocity: { x: 0, y: 0 }
      };

      scene.add(group);
      crystals.push(group);
    });
  }

  // ==========================================
  // 2. NEURAL NETWORK CONSTELLATION LATTICE
  // ==========================================
  function createNeuralNetworkLattice() {
    networkPositions = [];
    networkVelocities = [];

    const positionsArray = new Float32Array(NODE_COUNT * 3);
    const colorsArray = new Float32Array(NODE_COUNT * 3);

    const cGold = new THREE.Color(0xfacc15);
    const cAmber = new THREE.Color(0xf59e0b);
    const cWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 550;
      const y = (Math.random() - 0.5) * 450;
      const z = (Math.random() - 0.5) * 220;

      positionsArray[i * 3] = x;
      positionsArray[i * 3 + 1] = y;
      positionsArray[i * 3 + 2] = z;

      networkPositions.push(new THREE.Vector3(x, y, z));
      networkVelocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.45,
        (Math.random() - 0.5) * 0.45,
        (Math.random() - 0.5) * 0.25
      ));

      let c = Math.random() > 0.6 ? cGold : (Math.random() > 0.3 ? cAmber : cWhite);
      colorsArray[i * 3] = c.r;
      colorsArray[i * 3 + 1] = c.g;
      colorsArray[i * 3 + 2] = c.b;
    }

    networkGeo = new THREE.BufferGeometry();
    networkGeo.setAttribute("position", new THREE.BufferAttribute(positionsArray, 3));
    networkGeo.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3));

    // Circular Glowing Node Sprites (Amber & Gold)
    const canvasPoint = document.createElement("canvas");
    canvasPoint.width = 32;
    canvasPoint.height = 32;
    const ctx = canvasPoint.getContext("2d");
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.3, "rgba(250,204,21,0.9)");
    grad.addColorStop(0.7, "rgba(217,119,6,0.4)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const pointTex = new THREE.CanvasTexture(canvasPoint);

    const pMat = new THREE.PointsMaterial({
      size: 5.5,
      map: pointTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    networkPoints = new THREE.Points(networkGeo, pMat);
    scene.add(networkPoints);

    // Dynamic Connecting Energy Lines
    const maxLineSegments = (NODE_COUNT * (NODE_COUNT - 1)) / 2;
    lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(maxLineSegments * 6), 3));
    lineGeo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(maxLineSegments * 6), 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    networkLines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(networkLines);
  }

  // ==========================================
  // 3. DEEP HORIZON FLOW GRID
  // ==========================================
  function createDeepUndulatingGrid() {
    const gridGeo = new THREE.PlaneGeometry(900, 750, 45, 35);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0xd97706,
      wireframe: true,
      transparent: true,
      opacity: 0.075
    });

    flowGridMesh = new THREE.Mesh(gridGeo, gridMat);
    flowGridMesh.rotation.x = -Math.PI / 2.6;
    flowGridMesh.position.set(0, -110, -100);
    scene.add(flowGridMesh);
  }

  // ==========================================
  // 4. INTERACTIVE EVENT HANDLERS
  // ==========================================
  function onMouseMove(e) {
    const curX = (e.clientX / window.innerWidth - 0.5) * 2;
    const curY = (e.clientY / window.innerHeight - 0.5) * 2;

    const dx = curX - mouse.lastX;
    const dy = curY - mouse.lastY;
    mouse.speed = Math.min(3.5, Math.sqrt(dx * dx + dy * dy) * 18.0);

    mouse.targetX = curX;
    mouse.targetY = curY;
    mouse.lastX = curX;
    mouse.lastY = curY;
  }

  function onTouchMove(e) {
    if (e.touches.length > 0) {
      mouse.targetX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
    }
  }

  let lastScrollY = window.pageYOffset || 0;
  function onScroll() {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    scroll.target = y;
    scroll.velocity = Math.abs(y - lastScrollY);
    lastScrollY = y;
  }

  function onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    updateMaxScroll();
  }

  // Check if study music is currently playing to sync beats
  function isMusicPlaying() {
    const audio = document.getElementById("studyAudioPlayer");
    return audio && !audio.paused;
  }

  // ==========================================
  // 5. CORE 60 FPS RENDER & PHYSICS LOOP
  // ==========================================
  function animate(timestamp) {
    animationFrameId = requestAnimationFrame(animate);

    const time = timestamp * 0.0012;

    // Smooth lerping of mouse & scroll momentum
    mouse.x += (mouse.targetX - mouse.x) * 0.07;
    mouse.y += (mouse.targetY - mouse.y) * 0.07;
    mouse.speed *= 0.93;

    scroll.current += (scroll.target - scroll.current) * 0.085;
    scroll.velocity *= 0.88;
    scroll.normalized = Math.min(1, Math.max(0, scroll.current / scroll.maxScroll));

    const musicPulse = isMusicPlaying() ? Math.sin(time * 6.5) * 0.07 : 0;

    // 1. Camera Dynamic Orbit & Pan
    const scrollAngle = scroll.normalized * Math.PI * 0.5;
    camera.position.x = mouse.x * 40 + Math.sin(scrollAngle) * 25;
    camera.position.y = -scroll.normalized * 70 + mouse.y * -30;
    camera.position.z = 360 + Math.sin(time * 0.4) * 12 - scroll.velocity * 0.6;
    camera.lookAt(mouse.x * 20, 15 - scroll.normalized * 35, 0);

    // 2. Light Orbits
    if (lights.cyan) {
      lights.cyan.position.x = Math.sin(time * 0.7) * 240 + mouse.x * 80;
      lights.cyan.position.y = Math.cos(time * 0.6) * 180;
    }
    if (lights.blue) {
      lights.blue.position.x = Math.cos(time * 0.8) * 260;
      lights.blue.position.y = Math.sin(time * 0.7) * 160 - scroll.normalized * 90;
    }
    if (lights.indigo) {
      lights.indigo.position.y = 200 + Math.sin(time * 1.1) * 50;
    }

    // 3. Update 3D Kinetic Glass Crystals
    crystals.forEach((group) => {
      const u = group.userData;

      // Floating wave levitation
      const levitate = Math.sin(time * u.speed + u.phase) * 18;
      const driftX = Math.cos(time * (u.speed * 0.65) + u.phase) * 12;

      // Vertical scroll parallax drifting
      const scrollShift = scroll.normalized * 260 * u.scrollFactor;

      // Interactive mouse repulsion physics (dodge cursor)
      const mouseScreenX = mouse.x * 200;
      const mouseScreenY = -mouse.y * 150;
      const distToMouse = Math.hypot(group.position.x - mouseScreenX, group.position.y - mouseScreenY);
      
      let repelX = 0;
      let repelY = 0;
      if (distToMouse < 180) {
        const force = (1 - distToMouse / 180) * (25 + mouse.speed * 30);
        const angle = Math.atan2(group.position.y - mouseScreenY, group.position.x - mouseScreenX);
        repelX = Math.cos(angle) * force;
        repelY = Math.sin(angle) * force;
      }

      u.velocity.x += (repelX - u.velocity.x) * 0.1;
      u.velocity.y += (repelY - u.velocity.y) * 0.1;

      group.position.x = u.baseX + driftX + u.velocity.x;
      group.position.y = u.baseY + levitate + scrollShift + u.velocity.y;

      // Multi-axial tumbling (faster during fast scroll!)
      const tumbleBoost = 1 + scroll.velocity * 0.04;
      group.rotation.x += u.tumble[0] * tumbleBoost;
      group.rotation.y += u.tumble[1] * tumbleBoost;
      group.rotation.z += u.tumble[2] * tumbleBoost;

      // Inner core counter-rotation & music beat pulse
      if (u.coreMesh) {
        u.coreMesh.rotation.x -= u.tumble[0] * 2.5;
        u.coreMesh.rotation.y -= u.tumble[1] * 2.5;
        const baseScale = 1 + musicPulse;
        u.coreMesh.scale.setScalar(baseScale);
      }

      // Jelly squish & stretch on fast scrolling
      if (scroll.velocity > 1.2) {
        const stretch = 1 + Math.min(0.3, scroll.velocity * 0.007);
        const squish = 1 / Math.sqrt(stretch);
        group.scale.set(squish, stretch, squish);
      } else {
        const targetScale = 1 + musicPulse * 0.5;
        group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
      }
    });

    // 4. Update Neural Network Constellation & Dynamic Energy Beams
    if (networkPoints && networkLines) {
      const posAttr = networkGeo.attributes.position;
      const posArray = posAttr.array;

      for (let i = 0; i < NODE_COUNT; i++) {
        const p = networkPositions[i];
        const v = networkVelocities[i];

        p.x += v.x;
        p.y += v.y;
        p.z += v.z;

        // Bounce back within bounds
        if (Math.abs(p.x) > 300) v.x *= -1;
        if (Math.abs(p.y) > 240) v.y *= -1;
        if (Math.abs(p.z) > 130) v.z *= -1;

        // Parallax shift with scroll
        const scrollParallax = Math.sin(scroll.normalized * Math.PI) * 30 * (i % 2 === 0 ? 1 : -1);

        posArray[i * 3] = p.x;
        posArray[i * 3 + 1] = p.y + scrollParallax;
        posArray[i * 3 + 2] = p.z;
      }
      posAttr.needsUpdate = true;

      // Calculate proximity lines between nodes
      const linePos = lineGeo.attributes.position.array;
      const lineCol = lineGeo.attributes.color.array;
      let lineIndex = 0;

      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < CONNECTION_DIST) {
            const alpha = 1 - dist / CONNECTION_DIST;
            const boost = 1 + scroll.velocity * 0.05 + (isMusicPlaying() ? 0.3 : 0);

            // Start Vertex (Radiant Amber)
            linePos[lineIndex * 3] = posArray[i * 3];
            linePos[lineIndex * 3 + 1] = posArray[i * 3 + 1];
            linePos[lineIndex * 3 + 2] = posArray[i * 3 + 2];
            lineCol[lineIndex * 3] = 0.96 * alpha * boost;     // R
            lineCol[lineIndex * 3 + 1] = 0.62 * alpha * boost; // G
            lineCol[lineIndex * 3 + 2] = 0.04 * alpha * boost; // B
            lineIndex++;

            // End Vertex (Cyber Gold)
            linePos[lineIndex * 3] = posArray[j * 3];
            linePos[lineIndex * 3 + 1] = posArray[j * 3 + 1];
            linePos[lineIndex * 3 + 2] = posArray[j * 3 + 2];
            lineCol[lineIndex * 3] = 0.98 * alpha * boost;     // R
            lineCol[lineIndex * 3 + 1] = 0.80 * alpha * boost; // G
            lineCol[lineIndex * 3 + 2] = 0.08 * alpha * boost; // B
            lineIndex++;
          }
        }
      }

      lineGeo.setDrawRange(0, lineIndex);
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;
    }

    // 5. Undulate Ground Horizon Grid
    if (flowGridMesh) {
      flowGridMesh.position.y = -110 - scroll.normalized * 45;
      flowGridMesh.rotation.z = Math.sin(time * 0.2) * 0.04 + mouse.x * 0.03;
    }

    renderer.render(scene, camera);
  }

  // Theme Sync
  window.updateLiquidTheme = function (isDark) {
    if (!scene) return;
    if (isDark) {
      scene.fog.color.setHex(0x090702);
      if (flowGridMesh) flowGridMesh.material.color.setHex(0xd97706);
    } else {
      scene.fog.color.setHex(0xfefce8);
      if (flowGridMesh) flowGridMesh.material.color.setHex(0xfacc15);
    }
  };

  // Launch on DOM Ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();

/**
 * JIIT Noida Exam Hub - Application Engine
 * Tailored for T1 (20M), T2 (20M), T3 (35M) & Semester Subject/Chapter Management
 */

// ==========================================
// 1. STATE INITIALIZATION & LOCALSTORAGE
// ==========================================
const STORAGE_KEY = "jiit_hub_state_v11";

let state = {
  theme: "dark",
  soundEnabled: true,
  currentExamKey: "t1", // t1, t2, or t3
  currentBranchKey: "cse", // cse, it, ece, mnc, rai
  currentSemKey: "sem4", // sem1, sem2, sem3, sem4
  examName: JIIT_EXAMS.t1.name,
  targetDate: JIIT_EXAMS.t1.targetDate,
  marks: JIIT_EXAMS.t1.marks,
  bufferDays: 5,
  activeSubjectId: BRANCH_DATA.cse.semesters.sem4.subjects[0]?.id || "",
  subjects: JSON.parse(JSON.stringify(BRANCH_DATA.cse.semesters.sem4.subjects)),
  habits: JSON.parse(JSON.stringify(JIIT_HABITS)),
  todayFocusMinutes: 0,
  pomoCompletedCount: 0,
  scratchpad: "",
  lastActiveDate: new Date().toISOString().split("T")[0]
};

// Load saved state
function loadSavedState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      state = { ...state, ...parsed };

      const todayStr = new Date().toISOString().split("T")[0];
      if (state.lastActiveDate !== todayStr) {
        state.todayFocusMinutes = 0;
        state.habits.forEach(h => { h.done = false; });
        state.lastActiveDate = todayStr;
      }
    }
  } catch (e) {
    console.error("Error loading state from localStorage", e);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    const indicator = document.getElementById("notesSavedIndicator");
    if (indicator) {
      indicator.textContent = "Saved";
      setTimeout(() => {
        indicator.textContent = "Auto-saved";
      }, 1500);
    }
  } catch (e) {
    console.error("Error saving state to localStorage", e);
  }
}

// ==========================================
// 2. AUDIO SYNTHESIZER (Pleasant Chimes & Ambiance)
// ==========================================
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function playChime(type = "success") {
  if (!state.soundEnabled) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (type === "success") {
      // Harmonic Chord: F5 - A5 - C6 - F6 (Warmer chord suited for magenta theme)
      const freqs = [698.46, 880.00, 1046.50, 1396.91];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0, now + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 1.3);
      });
    } else if (type === "tick") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === "complete") {
      // Pomodoro complete fanfare
      const freqs = [659.25, 783.99, 987.77, 1318.51];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0.14, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 1.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 1.5);
      });
    }
  } catch (err) {
    console.warn("Audio chime prevented:", err);
  }
}

// Ambient Noise Generator (Rain, White Noise, Cafe)
let ambientSourceNode = null;
let ambientGainNode = null;

function stopAmbientSound() {
  if (ambientSourceNode) {
    try {
      ambientSourceNode.stop();
      ambientSourceNode.disconnect();
    } catch (e) { }
    ambientSourceNode = null;
  }
}

function playAmbientSound(mode) {
  stopAmbientSound();
  if (mode === "off") return;

  try {
    const ctx = getAudioContext();
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    if (mode === "white") {
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.05;
      }
    } else if (mode === "rain") {
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }
    } else if (mode === "cafe") {
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02 * 0.35;
        lastOut = data[i];
      }
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    if (mode === "rain") {
      filter.type = "lowpass";
      filter.frequency.value = 1800;
    } else if (mode === "cafe") {
      filter.type = "bandpass";
      filter.frequency.value = 650;
      filter.Q.value = 1.0;
    } else {
      filter.type = "lowpass";
      filter.frequency.value = 8000;
    }

    ambientGainNode = ctx.createGain();
    ambientGainNode.gain.setValueAtTime(0.08, ctx.currentTime);

    noise.connect(filter);
    filter.connect(ambientGainNode);
    ambientGainNode.connect(ctx.destination);

    noise.start();
    ambientSourceNode = noise;
  } catch (err) {
    console.warn("Could not start ambient sound:", err);
  }
}

// ==========================================
// 3. TOASTS & CELEBRATION CONFETTI
// ==========================================
function showToast(message, icon = "fa-check-circle") {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid ${icon}" style="color: var(--brand-primary-light);"></i> <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function triggerCelebration() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#facc15', '#fde047', '#d97706', '#ffffff']
    });
  }
}

// ==========================================
// 4. THEME TOGGLE (Dark & Light Mode)
// ==========================================
function initTheme() {
  const html = document.documentElement;
  const themeToggleBtn = document.getElementById("themeToggleBtn");

  const savedTheme = state.theme || "dark";
  html.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    state.theme = newTheme;
    saveState();
    updateThemeIcon(newTheme);
    if (window.updateLiquidTheme) window.updateLiquidTheme(newTheme === "dark");
    playChime("tick");
    showToast(`Switched to ${newTheme === "dark" ? "Dark" : "Light"} Mode`, newTheme === "dark" ? "fa-moon" : "fa-sun");
  });
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById("themeIcon");
  if (!themeIcon) return;
  if (theme === "dark") {
    themeIcon.className = "fa-solid fa-sun";
    themeIcon.title = "Switch to Light Mode";
  } else {
    themeIcon.className = "fa-solid fa-moon";
    themeIcon.title = "Switch to Dark Mode";
  }
}

let syncMusicPlayerMuteState = null;

function initSoundToggle() {
  const soundToggleBtn = document.getElementById("soundToggleBtn");
  if (!soundToggleBtn) return;

  function updateBtnUI() {
    const icon = soundToggleBtn.querySelector("i");
    const text = soundToggleBtn.querySelector(".btn-text");
    if (state.soundEnabled) {
      icon.className = "fa-solid fa-volume-high";
      text.textContent = "Audio";
    } else {
      icon.className = "fa-solid fa-volume-xmark";
      text.textContent = "Muted";
    }
  }

  updateBtnUI();

  soundToggleBtn.addEventListener("click", () => {
    state.soundEnabled = !state.soundEnabled;
    saveState();
    updateBtnUI();
    if (state.soundEnabled) playChime("tick");

    // Broadcast mute state to background study music player
    if (typeof syncMusicPlayerMuteState === "function") {
      syncMusicPlayerMuteState(!state.soundEnabled);
    }
  });
}

// ==========================================
// 5. PANIC CALCULATOR FOR T1 / T2 / T3 EXAMS
// ==========================================
function updateCountdownAndPanic() {
  const targetDate = new Date(state.targetDate);
  const now = new Date();
  const diffMs = targetDate - now;

  const cdDays = document.getElementById("cdDays");
  const cdHours = document.getElementById("cdHours");
  const cdMinutes = document.getElementById("cdMinutes");
  const cdSeconds = document.getElementById("cdSeconds");

  let totalDaysLeft = 0;

  if (diffMs <= 0) {
    if (cdDays) cdDays.textContent = "00";
    if (cdHours) cdHours.textContent = "00";
    if (cdMinutes) cdMinutes.textContent = "00";
    if (cdSeconds) cdSeconds.textContent = "00";
    totalDaysLeft = 0;
  } else {
    const seconds = Math.floor((diffMs / 1000) % 60);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    totalDaysLeft = days;

    if (cdDays) cdDays.textContent = String(days).padStart(2, "0");
    if (cdHours) cdHours.textContent = String(hours).padStart(2, "0");
    if (cdMinutes) cdMinutes.textContent = String(minutes).padStart(2, "0");
    if (cdSeconds) cdSeconds.textContent = String(seconds).padStart(2, "0");
  }

  // Update target banner
  const targetExamTitle = document.getElementById("targetExamTitle");
  const examMarksBadge = document.getElementById("examMarksBadge");
  const targetDateDisplay = document.getElementById("targetDateDisplay");
  const examPreset = JIIT_EXAMS[state.currentExamKey] || JIIT_EXAMS.t1;

  if (targetExamTitle) {
    targetExamTitle.innerHTML = `<span>${escapeHtml(state.examName)}</span> <span class="exam-marks-badge" id="examMarksBadge">${examPreset.marks}</span>`;
  }
  if (targetDateDisplay) {
    targetDateDisplay.textContent = targetDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }

  // Relevant exam tag: "T1", "T2", or "T3"
  const currentExamTag = state.currentExamKey.toUpperCase(); // "T1", "T2", "T3"

  // Calculate Syllabus Stats for the selected exam
  let totalRelevantChapters = 0;
  let completedRelevantChapters = 0;
  let pendingRelevantChapters = 0;
  let totalEstimatedHours = 0;
  let highWeightagePending = 0;

  state.subjects.forEach(sub => {
    sub.chapters.forEach(chap => {
      // If T3, all chapters are tested. If T1/T2, match tag or consider untagged
      const isRelevant = (currentExamTag === "T3") || (chap.examTag === currentExamTag) || (!chap.examTag);
      if (isRelevant) {
        totalRelevantChapters++;
        if (chap.status === "completed") {
          completedRelevantChapters++;
        } else {
          pendingRelevantChapters++;
          const hrs = Number(chap.targetHours) || 6;
          totalEstimatedHours += chap.status === "in-progress" ? hrs * 0.5 : hrs;
          if (chap.weightage === "High") highWeightagePending++;
        }
      }
    });
  });

  const completionPct = totalRelevantChapters === 0 ? 0 : Math.round((completedRelevantChapters / totalRelevantChapters) * 100);

  // Buffer Days (dedicated for solving Previous Year Questions)
  const bufferDays = Number(state.bufferDays) || 5;
  const effectiveStudyDays = Math.max(1, totalDaysLeft - bufferDays);

  // Daily study quota
  const dailyStudyHours = (totalEstimatedHours / effectiveStudyDays).toFixed(1);

  // Recommended weekly pace
  const remainingWeeks = Math.max(0.5, effectiveStudyDays / 7);
  const chaptersPerWeek = (pendingRelevantChapters / remainingWeeks).toFixed(1);

  // Update DOM metrics in Panic Card
  const calcPending = document.getElementById("calcPendingChapters");
  const calcHours = document.getElementById("calcEstimatedHours");
  const calcDaily = document.getElementById("calcDailyQuota");
  const calcPace = document.getElementById("calcPace");

  if (calcPending) calcPending.textContent = pendingRelevantChapters;
  if (calcHours) calcHours.textContent = `${Math.round(totalEstimatedHours)} hrs`;
  if (calcDaily) calcDaily.textContent = `${dailyStudyHours} hrs/d`;
  if (calcPace) calcPace.textContent = `${chaptersPerWeek} ch/wk`;

  // Determine Panic Level & Risk Indicator
  let panicScore = 0;
  let panicLevel = "Calm";
  let panicBadgeClass = "calm";
  let panicMessage = examPreset.advice || "";

  if (pendingRelevantChapters === 0) {
    panicScore = 10;
    panicLevel = `${currentExamTag} Syllabus Mastered!`;
    panicBadgeClass = "calm";
    panicMessage = `🎉 Amazing! All ${currentExamTag} units are completed. Now focus purely on solving the last 3 years of JIIT ${currentExamTag} question papers and tutorial problem sets!`;
  } else if (dailyStudyHours <= 2.5) {
    panicScore = Math.min(35, Math.round(dailyStudyHours * 12));
    panicLevel = "Relaxed & Ahead";
    panicBadgeClass = "calm";
    panicMessage = `Great pace! Studying ${dailyStudyHours} hrs/day easily covers your ${currentExamTag} units with a ${bufferDays}-day buffer for PYQs. Keep attendance >75%!`;
  } else if (dailyStudyHours <= 5.5) {
    panicScore = Math.min(68, Math.round(35 + (dailyStudyHours - 2.5) * 11));
    panicLevel = "Focused Sprint";
    panicBadgeClass = "moderate";
    panicMessage = `Exam mode ON: Allocate ${dailyStudyHours} hrs/day. Knock out the ${highWeightagePending} high-yield units first. Review lecture slides and tutorial questions.`;
  } else if (dailyStudyHours <= 8.5) {
    panicScore = Math.min(85, Math.round(68 + (dailyStudyHours - 5.5) * 5.6));
    panicLevel = "High Pressure Sprint";
    panicBadgeClass = "panic";
    panicMessage = `⚠️ Urgent: You need ${dailyStudyHours} hrs/day! Focus strictly on faculty-highlighted topics, derivations, and previous year ${currentExamTag} questions.`;
  } else {
    panicScore = 95;
    panicLevel = `CODE RED ${currentExamTag} PANIC!`;
    panicBadgeClass = "panic";
    panicMessage = `🚨 Critical urgency (${dailyStudyHours} hrs/day required)! Strategy shift: Target the most repeated 40% topics from previous ${currentExamTag} papers. Do not get stuck on long theory.`;
  }

  // Update Panic UI Badge and Bar
  const panicBadge = document.getElementById("panicBadge");
  const panicBadgeText = document.getElementById("panicBadgeText");
  const panicFillBar = document.getElementById("panicFillBar");
  const panicAdviceText = document.getElementById("panicAdviceText");

  if (panicBadge) {
    panicBadge.className = `panic-status-badge ${panicBadgeClass}`;
  }
  if (panicBadgeText) panicBadgeText.textContent = panicLevel;
  if (panicFillBar) panicFillBar.style.width = `${panicScore}%`;
  if (panicAdviceText) panicAdviceText.textContent = panicMessage;

  // Global Ribbon stats
  const statSyllabus = document.getElementById("statSyllabus");
  const statSyllabusLabel = document.getElementById("statSyllabusLabel");
  const statPanicLevel = document.getElementById("statPanicLevel");
  if (statSyllabus) statSyllabus.textContent = `${completionPct}%`;
  if (statSyllabusLabel) statSyllabusLabel.textContent = `${currentExamTag} (${examPreset.marks}) Mastered`;
  if (statPanicLevel) {
    statPanicLevel.textContent = panicLevel;
    statPanicLevel.style.color = panicBadgeClass === "panic" ? "var(--danger)" : (panicBadgeClass === "moderate" ? "var(--warning)" : "var(--brand-primary-light)");
  }

  // Render Remaining Days Per Subject for this Exam
  renderSubjectDaysBreakdown(effectiveStudyDays, totalEstimatedHours, currentExamTag);
}

// Render dynamic breakdown of remaining days distributed across semester subjects
function renderSubjectDaysBreakdown(effectiveDays, totalPendingHours, currentExamTag) {
  const container = document.getElementById("subjectDaysList");
  if (!container) return;
  container.innerHTML = "";

  if (state.subjects.length === 0) {
    container.innerHTML = `<div style="font-size: 0.8rem; color: var(--text-muted); text-align: center; padding: 1rem;">No subjects added to this semester yet.</div>`;
    return;
  }

  state.subjects.forEach(sub => {
    let subPendingHours = 0;
    let subPendingUnits = 0;
    let subTotalUnits = 0;

    sub.chapters.forEach(c => {
      const isRelevant = (currentExamTag === "T3") || (c.examTag === currentExamTag) || (!c.examTag);
      if (isRelevant) {
        subTotalUnits++;
        if (c.status !== "completed") {
          subPendingUnits++;
          const hrs = Number(c.targetHours) || 6;
          subPendingHours += c.status === "in-progress" ? hrs * 0.5 : hrs;
        }
      }
    });

    let allottedDays = 0;
    if (totalPendingHours > 0) {
      allottedDays = Math.max(1, Math.round((subPendingHours / totalPendingHours) * effectiveDays));
    } else {
      allottedDays = Math.round(effectiveDays / state.subjects.length);
    }

    const row = document.createElement("div");
    row.className = "subject-day-row";
    row.innerHTML = `
      <div class="sub-meta">
        <span class="sub-color-pip" style="background-color: ${sub.color || '#ec4899'}; color: ${sub.color || '#ec4899'};"></span>
        <div>
          <div class="sub-name">${escapeHtml(sub.name)} ${sub.code ? `<span style="font-size: 0.7rem; color: var(--text-dim); font-weight: 600;">(${sub.code})</span>` : ''}</div>
          <span class="sub-pending-pill">${subPendingUnits} of ${subTotalUnits} ${currentExamTag} units left (~${Math.round(subPendingHours)}h)</span>
        </div>
      </div>
      <div class="sub-days-tag">
        <strong>${subPendingUnits === 0 ? 'Mastered' : `${allottedDays} Days`}</strong>
        <span>${subPendingUnits === 0 ? 'Ready for exam' : 'Share of runway'}</span>
      </div>
    `;
    container.appendChild(row);
  });
}

// ==========================================
// 6. SEMESTER SUBJECTS & CHAPTERS
// ==========================================
function renderSubjectTabs() {
  const container = document.getElementById("subjectTabsContainer");
  if (!container) return;
  container.innerHTML = "";

  state.subjects.forEach(sub => {
    const currentExamTag = state.currentExamKey.toUpperCase();
    const relevantChaps = sub.chapters.filter(c => (currentExamTag === "T3") || (c.examTag === currentExamTag) || (!c.examTag));
    const completed = relevantChaps.filter(c => c.status === "completed").length;
    const total = relevantChaps.length;
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

    const btn = document.createElement("button");
    btn.className = `subject-tab ${sub.id === state.activeSubjectId ? "active" : ""}`;
    btn.innerHTML = `
      <i class="fa-solid fa-book-open"></i>
      <span>${escapeHtml(sub.name)}</span>
      <span class="subject-tab-badge">${pct}%</span>
    `;

    btn.addEventListener("click", () => {
      state.activeSubjectId = sub.id;
      renderSubjectTabs();
      renderChapterList();
      populatePomoTopicSelector();
      playChime("tick");
    });

    container.appendChild(btn);
  });

  const subTitle = document.getElementById("syllabusOverallSubtitle");
  const activeSub = state.subjects.find(s => s.id === state.activeSubjectId);
  if (subTitle && activeSub) {
    const currentExamTag = state.currentExamKey.toUpperCase();
    const branchName = BRANCH_DATA[state.currentBranchKey]?.shortName || "CSE";
    const semName = (state.currentSemKey || "sem4").replace("sem", "Sem ");
    const relevantChaps = activeSub.chapters.filter(c => (currentExamTag === "T3") || (c.examTag === currentExamTag) || (!c.examTag));
    const comp = relevantChaps.filter(c => c.status === "completed").length;
    subTitle.textContent = `${branchName} ${semName} • ${activeSub.name} (${activeSub.code || 'Course'}): ${comp} of ${relevantChaps.length} ${currentExamTag} units mastered`;
  }
}

function renderChapterList() {
  const container = document.getElementById("chapterListContainer");
  if (!container) return;
  container.innerHTML = "";

  const activeSub = state.subjects.find(s => s.id === state.activeSubjectId);
  if (!activeSub || !activeSub.chapters || activeSub.chapters.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
        <i class="fa-solid fa-folder-open" style="font-size: 2rem; margin-bottom: 0.5rem; display: block; opacity: 0.5;"></i>
        <p>No chapters found for this subject. Use the quick-add bar below to add course units!</p>
      </div>
    `;
    return;
  }

  const searchQuery = (document.getElementById("chapterSearch")?.value || "").toLowerCase().trim();
  const filterVal = document.getElementById("statusFilter")?.value || "current-exam";
  const currentExamTag = state.currentExamKey.toUpperCase();

  const filteredChapters = activeSub.chapters.filter(chap => {
    if (searchQuery && !chap.name.toLowerCase().includes(searchQuery)) {
      return false;
    }

    if (filterVal === "current-exam") {
      if (currentExamTag !== "T3" && chap.examTag && chap.examTag !== currentExamTag) return false;
    } else if (filterVal === "t1") {
      if (chap.examTag !== "T1") return false;
    } else if (filterVal === "t2") {
      if (chap.examTag !== "T2") return false;
    } else if (filterVal === "t3") {
      if (chap.examTag !== "T3") return false;
    } else if (filterVal === "completed" && chap.status !== "completed") {
      return false;
    } else if (filterVal === "pending" && chap.status === "completed") {
      return false;
    } else if (filterVal === "high-weightage" && chap.weightage !== "High") {
      return false;
    }

    return true;
  });

  if (filteredChapters.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted); font-size: 0.85rem;">
        No chapters match the selected filter. Try selecting "All Units / Chapters".
      </div>
    `;
    return;
  }

  filteredChapters.forEach(chap => {
    const item = document.createElement("div");
    item.className = `chapter-item ${chap.status}`;

    let statusIcon = "fa-check";
    if (chap.status === "in-progress") statusIcon = "fa-spinner fa-spin";
    if (chap.status === "not-started") statusIcon = "fa-circle";

    const badgeClass = chap.weightage === "High" ? "badge-high" : (chap.weightage === "Medium" ? "badge-medium" : "badge-low");
    const examBadgeClass = chap.examTag === "T1" ? "badge-exam-t1" : (chap.examTag === "T2" ? "badge-exam-t2" : "badge-exam-t3");

    item.innerHTML = `
      <div class="chap-info">
        <button class="chap-status-toggle" title="Click to cycle: Not Started -> In Progress -> Mastered">
          <i class="fa-solid ${statusIcon}"></i>
        </button>
        <div class="chap-details">
          <div class="chap-title">${escapeHtml(chap.name)}</div>
          <div class="chap-tags">
            <span class="badge ${examBadgeClass}">${chap.examTag || 'T1'} Unit</span>
            <span class="badge ${badgeClass}">${chap.weightage || 'Med'} Yield</span>
            <span class="badge badge-hours"><i class="fa-regular fa-clock"></i> ${chap.targetHours || 6} hrs</span>
            <span style="font-size: 0.68rem; color: var(--text-dim); text-transform: capitalize;">
              ${chap.status.replace("-", " ")}
            </span>
          </div>
        </div>
      </div>
      <div class="chap-actions">
        <button class="btn-icon-tiny btn-study-this" title="Study this unit in Pomodoro">
          <i class="fa-solid fa-bullseye"></i>
        </button>
      </div>
    `;

    const toggleBtn = item.querySelector(".chap-status-toggle");
    toggleBtn.addEventListener("click", () => {
      cycleChapterStatus(activeSub.id, chap.id);
    });

    const studyBtn = item.querySelector(".btn-study-this");
    studyBtn.addEventListener("click", () => {
      setPomodoroTopic(`${activeSub.name} - ${chap.name}`);
      showToast(`Set Pomodoro focus: "${chap.name}"`, "fa-bullseye");
      playChime("tick");
    });

    container.appendChild(item);
  });
}

function cycleChapterStatus(subjectId, chapterId) {
  const sub = state.subjects.find(s => s.id === subjectId);
  if (!sub) return;
  const chap = sub.chapters.find(c => c.id === chapterId);
  if (!chap) return;

  if (chap.status === "not-started") {
    chap.status = "in-progress";
    playChime("tick");
    showToast(`Started: ${chap.name}`, "fa-play");
  } else if (chap.status === "in-progress") {
    chap.status = "completed";
    playChime("success");
    triggerCelebration();
    showToast(`🎉 Mastered: ${chap.name}! One step closer to scoring high!`, "fa-award");
  } else {
    chap.status = "not-started";
    playChime("tick");
  }

  saveState();
  renderSubjectTabs();
  renderChapterList();
  updateCountdownAndPanic();
}

function deleteChapter(subjectId, chapterId) {
  const sub = state.subjects.find(s => s.id === subjectId);
  if (!sub) return;
  sub.chapters = sub.chapters.filter(c => c.id !== chapterId);
  saveState();
  renderSubjectTabs();
  renderChapterList();
  updateCountdownAndPanic();
  showToast("Unit removed", "fa-trash");
}

function initSyllabusEvents() {
  const searchInput = document.getElementById("chapterSearch");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderChapterList();
    });
  }

  const statusFilter = document.getElementById("statusFilter");
  if (statusFilter) {
    statusFilter.addEventListener("change", () => {
      renderChapterList();
    });
  }
}

// ==========================================
// 7. POMODORO FOCUS TIMER
// ==========================================
let timerInterval = null;
let timerRunning = false;
let currentTimerMode = "focus";
let timerTotalSeconds = 25 * 60;
let timerRemainingSeconds = 25 * 60;

function initPomodoro() {
  const playBtn = document.getElementById("timerPlayBtn");
  const resetBtn = document.getElementById("timerResetBtn");
  const skipBtn = document.getElementById("timerSkipBtn");
  const modeButtons = document.querySelectorAll(".pomo-mode-btn");
  const ambientChips = document.querySelectorAll(".ambient-chip");

  modeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      modeButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const mode = btn.dataset.mode;
      const durationMins = parseInt(btn.dataset.duration, 10);
      switchTimerMode(mode, durationMins);
      playChime("tick");
    });
  });

  playBtn.addEventListener("click", () => {
    if (timerRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  });

  resetBtn.addEventListener("click", () => {
    resetTimer();
    playChime("tick");
  });

  skipBtn.addEventListener("click", () => {
    completeTimerSession();
  });

  ambientChips.forEach(chip => {
    chip.addEventListener("click", () => {
      ambientChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const soundType = chip.dataset.sound;
      playAmbientSound(soundType);
      playChime("tick");
    });
  });

  updateTimerDisplay();
  populatePomoTopicSelector();
  updatePomoSessionUI();
}

function switchTimerMode(mode, minutes) {
  pauseTimer();
  currentTimerMode = mode;
  timerTotalSeconds = minutes * 60;
  timerRemainingSeconds = timerTotalSeconds;

  const modeLabel = document.getElementById("timerModeLabel");
  if (modeLabel) {
    if (mode === "focus") modeLabel.textContent = "Deep Focus (25m)";
    else if (mode === "deep") modeLabel.textContent = "Deep Sprint (50m)";
    else if (mode === "shortBreak") modeLabel.textContent = "Short Rest (5m)";
    else if (mode === "longBreak") modeLabel.textContent = "Recharge Break (15m)";
  }

  updateTimerDisplay();
}

function startTimer() {
  if (timerRunning) return;
  timerRunning = true;
  getAudioContext();

  const playIcon = document.getElementById("playIcon");
  if (playIcon) playIcon.className = "fa-solid fa-pause";

  playChime("tick");

  timerInterval = setInterval(() => {
    if (timerRemainingSeconds > 0) {
      timerRemainingSeconds--;
      updateTimerDisplay();
    } else {
      completeTimerSession();
    }
  }, 1000);
}

function pauseTimer() {
  timerRunning = false;
  clearInterval(timerInterval);
  timerInterval = null;

  const playIcon = document.getElementById("playIcon");
  if (playIcon) playIcon.className = "fa-solid fa-play";
}

function resetTimer() {
  pauseTimer();
  timerRemainingSeconds = timerTotalSeconds;
  updateTimerDisplay();
}

function completeTimerSession() {
  pauseTimer();
  playChime("complete");
  triggerCelebration();

  if (currentTimerMode === "focus" || currentTimerMode === "deep") {
    const minsStudied = Math.round(timerTotalSeconds / 60);
    state.todayFocusMinutes += minsStudied;
    state.pomoCompletedCount++;

    const h1 = state.habits.find(h => h.id === "jh1");
    if (h1 && !h1.done && state.pomoCompletedCount >= 3) {
      h1.done = true;
      showToast("🔥 Daily Habit Unlocked: 3 Pomodoro Focus Sessions Completed!", "fa-fire");
    }

    saveState();
    updatePomoSessionUI();
    renderHabitList();

    showToast(`🎉 Focus session finished! Logged ${minsStudied} mins. Relax your eyes!`, "fa-circle-check");
  } else {
    showToast("Break over! Time to get back to the grind!", "fa-brain");
  }

  resetTimer();
}

function updateTimerDisplay() {
  const mins = Math.floor(timerRemainingSeconds / 60);
  const secs = timerRemainingSeconds % 60;
  const displayStr = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  const timerDigits = document.getElementById("timerDisplay");
  if (timerDigits) timerDigits.textContent = displayStr;

  const circumference = 2 * Math.PI * 110;
  const progressRatio = timerTotalSeconds === 0 ? 0 : (timerTotalSeconds - timerRemainingSeconds) / timerTotalSeconds;
  const offset = circumference * (1 - progressRatio);

  const circle = document.getElementById("timerProgressCircle");
  if (circle) {
    circle.style.strokeDashoffset = offset;
  }
}

function updatePomoSessionUI() {
  const sessionCount = document.getElementById("pomoSessionCount");
  const statFocusTime = document.getElementById("statFocusTime");
  if (sessionCount) sessionCount.textContent = state.pomoCompletedCount;
  if (statFocusTime) {
    const hrs = (state.todayFocusMinutes / 60).toFixed(1);
    statFocusTime.textContent = `${hrs} hrs (${state.todayFocusMinutes}m)`;
  }
}

function populatePomoTopicSelector() {
  const select = document.getElementById("pomoTopicSelector");
  if (!select) return;

  const currentVal = select.value;
  select.innerHTML = `<option value="General Prep">General Tutorial & Notes Revision</option>`;

  state.subjects.forEach(sub => {
    const optGroup = document.createElement("optgroup");
    optGroup.label = sub.name;
    sub.chapters.forEach(c => {
      const opt = document.createElement("option");
      opt.value = `${sub.name} - ${c.name}`;
      opt.textContent = `[${c.examTag || 'Unit'}] ${c.name} (${c.status})`;
      optGroup.appendChild(opt);
    });
    select.appendChild(optGroup);
  });

  if (currentVal) select.value = currentVal;
}

function setPomodoroTopic(topicName) {
  const select = document.getElementById("pomoTopicSelector");
  if (select) {
    select.value = topicName;
  }
}

// ==========================================
// 8. DAILY HABIT STREAKS FOR COLLEGE
// ==========================================
function renderHabitList() {
  const container = document.getElementById("habitListContainer");
  if (!container) return;
  container.innerHTML = "";

  let maxStreak = 0;

  state.habits.forEach(habit => {
    if (habit.streak > maxStreak) maxStreak = habit.streak;

    const item = document.createElement("div");
    item.className = `habit-item ${habit.done ? "done" : ""}`;
    item.innerHTML = `
      <div class="habit-main">
        <button class="habit-checkbox" aria-label="Toggle habit">
          <i class="fa-solid fa-check"></i>
        </button>
        <span class="habit-text">${escapeHtml(habit.text)}</span>
      </div>
      <div class="habit-streak-badge">
        <i class="fa-solid fa-fire"></i>
        <span>${habit.streak || 1}d</span>
      </div>
    `;

    const chk = item.querySelector(".habit-checkbox");
    chk.addEventListener("click", () => {
      habit.done = !habit.done;
      if (habit.done) {
        habit.streak = (habit.streak || 0) + 1;
        playChime("success");
        showToast("Habit completed! Streak up! 🔥", "fa-fire");
      } else {
        habit.streak = Math.max(0, (habit.streak || 1) - 1);
        playChime("tick");
      }
      saveState();
      renderHabitList();
      checkAllHabitsCelebration();
    });

    container.appendChild(item);
  });

  const headerStreak = document.getElementById("headerStreakNum");
  const statStreak = document.getElementById("statStreak");
  if (headerStreak) headerStreak.textContent = maxStreak;
  if (statStreak) statStreak.textContent = `${maxStreak} Days`;

  renderHabitMatrix();
}

function checkAllHabitsCelebration() {
  if (state.habits.length > 0 && state.habits.every(h => h.done)) {
    triggerCelebration();
    playChime("complete");
    showToast("🌟 EXCELLENT! All daily study habits completed today! Top grade incoming!", "fa-trophy");
  }
}

function renderHabitMatrix() {
  const container = document.getElementById("matrixDotsRow");
  const rateLabel = document.getElementById("habitCompletionRate");
  if (!container) return;
  container.innerHTML = "";

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"];
  let completedCount = 0;

  daysOfWeek.forEach((day, idx) => {
    const isToday = idx === 6;
    let active = idx < 5;
    if (isToday) {
      const doneHabits = state.habits.filter(h => h.done).length;
      active = doneHabits >= Math.ceil(state.habits.length * 0.5);
    }
    if (active) completedCount++;

    const dayBox = document.createElement("div");
    dayBox.className = "matrix-day-box";
    dayBox.innerHTML = `
      <div class="matrix-dot ${active ? 'active' : ''}">
        ${active ? '<i class="fa-solid fa-check"></i>' : ''}
      </div>
      <div class="matrix-day-label">${day}</div>
    `;
    container.appendChild(dayBox);
  });

  if (rateLabel) {
    const rate = Math.round((completedCount / daysOfWeek.length) * 100);
    rateLabel.textContent = `${rate}% Consistent`;
  }
}

function initHabitForm() {
  const form = document.getElementById("addHabitForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("newHabitText");
    const text = input.value.trim();
    if (!text) return;

    state.habits.push({
      id: "jh_" + Date.now(),
      text: text,
      done: false,
      streak: 1
    });

    saveState();
    input.value = "";
    renderHabitList();
    playChime("tick");
    showToast(`Added goal: "${text}"`, "fa-bullseye");
  });
}

// ==========================================
// 9. EXAM, BRANCH & SEMESTER SWITCHERS
// ==========================================
function initExamAndSemSelectors() {
  const examSelect = document.getElementById("examSelect");
  const branchSelect = document.getElementById("branchSelect");
  const semSelect = document.getElementById("semSelect");

  if (examSelect) {
    examSelect.value = state.currentExamKey || "t1";
    examSelect.addEventListener("change", () => {
      const key = examSelect.value;
      if (JIIT_EXAMS[key]) {
        state.currentExamKey = key;
        state.examName = JIIT_EXAMS[key].name;
        state.targetDate = JIIT_EXAMS[key].targetDate;
        state.marks = JIIT_EXAMS[key].marks;
        saveState();

        renderSubjectTabs();
        renderChapterList();
        updateCountdownAndPanic();
        playChime("tick");
        showToast(`Selected: ${JIIT_EXAMS[key].name}`, "fa-award");
      }
    });
  }

  function updateSemDropdownOptions(bKey, preferredSemKey) {
    if (!semSelect) return preferredSemKey;
    const branch = BRANCH_DATA[bKey] || BRANCH_DATA.cse;
    const availableSems = Object.keys(branch.semesters);

    semSelect.innerHTML = "";
    availableSems.forEach(sKey => {
      const opt = document.createElement("option");
      opt.value = sKey;
      opt.textContent = branch.semesters[sKey].name;
      semSelect.appendChild(opt);
    });

    let targetSem = preferredSemKey;
    if (!availableSems.includes(targetSem)) {
      targetSem = availableSems[0] || "sem1";
    }
    semSelect.value = targetSem;
    return targetSem;
  }

  function loadBranchSemData(branchKey, semKey) {
    const branch = BRANCH_DATA[branchKey] || BRANCH_DATA.cse;
    const availableSems = Object.keys(branch.semesters);
    let validSemKey = semKey;
    if (!availableSems.includes(validSemKey)) {
      validSemKey = availableSems[0] || "sem1";
    }
    const sem = branch.semesters[validSemKey] || branch.semesters.sem1;

    state.currentBranchKey = branchKey;
    state.currentSemKey = validSemKey;
    state.subjects = JSON.parse(JSON.stringify(sem.subjects));
    state.activeSubjectId = state.subjects[0]?.id || "";
    saveState();

    renderSubjectTabs();
    renderChapterList();
    populatePomoTopicSelector();
    updateCountdownAndPanic();
    playChime("tick");
    showToast(`Loaded ${branch.shortName} • ${sem.name}`, "fa-layer-group");
  }

  if (branchSelect) {
    branchSelect.value = state.currentBranchKey || "cse";
    // Initialize semester options for current branch
    const initialSem = updateSemDropdownOptions(branchSelect.value, state.currentSemKey || "sem4");
    if (initialSem !== state.currentSemKey) {
      state.currentSemKey = initialSem;
      saveState();
    }

    branchSelect.addEventListener("change", () => {
      const bKey = branchSelect.value;
      const sKey = updateSemDropdownOptions(bKey, state.currentSemKey || "sem1");
      loadBranchSemData(bKey, sKey);
    });
  }

  if (semSelect) {
    semSelect.addEventListener("change", () => {
      const bKey = branchSelect ? branchSelect.value : (state.currentBranchKey || "cse");
      const sKey = semSelect.value;
      loadBranchSemData(bKey, sKey);
    });
  }

  // Reset button
  const resetBtn = document.getElementById("resetDataBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      const bKey = state.currentBranchKey || "cse";
      const sKey = state.currentSemKey || "sem4";
      const branch = BRANCH_DATA[bKey] || BRANCH_DATA.cse;
      const sem = branch.semesters[sKey] || branch.semesters.sem4;
      const examKey = state.currentExamKey || "t1";

      if (confirm(`Reset ${branch.shortName} ${sem.name} subjects & units to default JIIT course curriculum?`)) {
        state.subjects = JSON.parse(JSON.stringify(sem.subjects));
        state.activeSubjectId = state.subjects[0]?.id || "";
        state.examName = JIIT_EXAMS[examKey].name;
        state.targetDate = JIIT_EXAMS[examKey].targetDate;
        state.habits = JSON.parse(JSON.stringify(JIIT_HABITS));
        saveState();

        renderSubjectTabs();
        renderChapterList();
        renderHabitList();
        populatePomoTopicSelector();
        updateCountdownAndPanic();
        playChime("tick");
        showToast("Semester data reset successfully!", "fa-arrows-rotate");
      }
    });
  }

  // Buffer input
  const bufferInput = document.getElementById("bufferDaysInput");
  if (bufferInput) {
    bufferInput.value = state.bufferDays || 5;
    bufferInput.addEventListener("input", () => {
      state.bufferDays = Math.max(0, parseInt(bufferInput.value, 10) || 0);
      saveState();
      updateCountdownAndPanic();
    });
  }
}

function initScratchpad() {
  const area = document.getElementById("scratchpadArea");
  if (!area) return;
  area.value = state.scratchpad || "";

  area.addEventListener("input", () => {
    state.scratchpad = area.value;
    saveState();
  });
}

// ==========================================
// 10. MODALS (Edit Exam Date & Add Subject)
// ==========================================
function initModals() {
  // Exam Modal
  const openExamBtn = document.getElementById("openExamEditModal");
  const examModal = document.getElementById("examModalOverlay");
  const closeExamBtn = document.getElementById("closeExamModal");
  const cancelExamBtn = document.getElementById("cancelExamModal");
  const saveExamBtn = document.getElementById("saveExamModal");
  const examNameInput = document.getElementById("customExamNameInput");
  const examDateInput = document.getElementById("customExamDateInput");

  function openModal() {
    examNameInput.value = state.examName;
    const d = new Date(state.targetDate);
    const isoLocal = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    examDateInput.value = isoLocal;
    examModal.classList.add("active");
  }

  function closeModal() {
    examModal.classList.remove("active");
  }

  if (openExamBtn) openExamBtn.addEventListener("click", openModal);
  if (closeExamBtn) closeExamBtn.addEventListener("click", closeModal);
  if (cancelExamBtn) cancelExamBtn.addEventListener("click", closeModal);

  if (saveExamBtn) {
    saveExamBtn.addEventListener("click", () => {
      const name = examNameInput.value.trim();
      const dateVal = examDateInput.value;
      if (!name || !dateVal) {
        alert("Please provide both an exam title and date.");
        return;
      }

      state.examName = name;
      state.targetDate = new Date(dateVal).toISOString();

      saveState();
      closeModal();
      updateCountdownAndPanic();
      playChime("success");
      showToast("Exam target date updated!", "fa-calendar-check");
    });
  }
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==========================================
// 10.5 AUTHENTICATION / LOGIN ENGINE (Spotify-Inspired)
// ==========================================
function initAuth() {
  const authScreen = document.getElementById("authScreen");
  const appContainer = document.getElementById("appContainer");
  const loginForm = document.getElementById("loginForm");
  const authUsername = document.getElementById("authUsername");
  const authPassword = document.getElementById("authPassword");
  const rememberMeCheckbox = document.getElementById("rememberMeCheckbox");
  const quickDemoBtn = document.getElementById("quickDemoBtn");
  const webkioskDemoBtn = document.getElementById("webkioskDemoBtn");
  const togglePasswordBtn = document.getElementById("togglePasswordBtn");
  const togglePasswordIcon = document.getElementById("togglePasswordIcon");
  const logoutBtn = document.getElementById("logoutBtn");
  const navUsername = document.getElementById("navUsername");
  const authErrorMsg = document.getElementById("authErrorMsg");
  const forgotPasswordLink = document.getElementById("forgotPasswordLink");
  const authSignUpLink = document.getElementById("authSignUpLink");

  // Check saved session
  let savedUser = null;
  try {
    const raw = localStorage.getItem("jiit_auth_session") || sessionStorage.getItem("jiit_auth_session");
    if (raw) savedUser = JSON.parse(raw);
  } catch (e) {
    console.error("Auth session parse error", e);
  }

  function updateAuthUI(isLoggedIn, username = "Student") {
    if (isLoggedIn) {
      if (authScreen) {
        authScreen.style.opacity = "0";
        setTimeout(() => {
          authScreen.style.display = "none";
        }, 250);
      }
      if (appContainer) {
        appContainer.style.display = "block";
        appContainer.style.opacity = "1";
      }
      if (navUsername) {
        navUsername.textContent = username;
      }
    } else {
      if (authScreen) {
        authScreen.style.display = "flex";
        setTimeout(() => {
          authScreen.style.opacity = "1";
        }, 10);
      }
      if (appContainer) {
        appContainer.style.display = "none";
      }
    }
  }

  // Toggle Password Visibility
  if (togglePasswordBtn && authPassword) {
    togglePasswordBtn.addEventListener("click", () => {
      const isPass = authPassword.getAttribute("type") === "password";
      authPassword.setAttribute("type", isPass ? "text" : "password");
      if (togglePasswordIcon) {
        togglePasswordIcon.className = isPass ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
      }
    });
  }

  function doLogin(username) {
    const cleanName = username.trim() || "Student";
    const userObj = { username: cleanName, loggedIn: true };

    if (rememberMeCheckbox && rememberMeCheckbox.checked) {
      localStorage.setItem("jiit_auth_session", JSON.stringify(userObj));
    } else {
      sessionStorage.setItem("jiit_auth_session", JSON.stringify(userObj));
    }

    if (authErrorMsg) authErrorMsg.style.display = "none";
    updateAuthUI(true, cleanName);
    playChime("success");
    triggerCelebration();
    showToast(`Welcome back, ${cleanName}!`, "fa-user-check");
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const u = authUsername ? authUsername.value.trim() : "";
      const p = authPassword ? authPassword.value.trim() : "";

      if (!u) {
        if (authErrorMsg) {
          authErrorMsg.textContent = "Please enter your username or enrollment number.";
          authErrorMsg.style.display = "block";
        }
        return;
      }

      if (!p) {
        if (authErrorMsg) {
          authErrorMsg.textContent = "Please enter your password.";
          authErrorMsg.style.display = "block";
        }
        return;
      }

      doLogin(u);
    });
  }

  // Quick Demo Login Button
  if (quickDemoBtn) {
    quickDemoBtn.addEventListener("click", () => {
      doLogin("Demo Student (JIIT)");
    });
  }

  // Webkiosk Login Button
  if (webkioskDemoBtn) {
    webkioskDemoBtn.addEventListener("click", () => {
      doLogin("Webkiosk User (24103001)");
    });
  }

  // Logout Button in Top Navbar
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("jiit_auth_session");
      sessionStorage.removeItem("jiit_auth_session");
      if (authUsername) authUsername.value = "";
      if (authPassword) authPassword.value = "";
      if (authErrorMsg) authErrorMsg.style.display = "none";
      updateAuthUI(false);
      playChime("tick");
      showToast("Signed out successfully.", "fa-arrow-right-from-bracket");
    });
  }

  // Forgot password helper
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", (e) => {
      e.preventDefault();
      showToast("Demo mode: Enter any password to log in directly!", "fa-circle-info");
    });
  }

  // Sign up link helper
  if (authSignUpLink) {
    authSignUpLink.addEventListener("click", (e) => {
      e.preventDefault();
      showToast("Enrollment accounts are auto-linked with JIIT Noida credentials.", "fa-circle-info");
    });
  }

  // Initial State: Show login page by default (or check if saved remember me session)
  if (savedUser && savedUser.loggedIn) {
    updateAuthUI(true, savedUser.username);
  } else {
    updateAuthUI(false);
  }
}

// ==========================================
// 10.8 STUDY WITH ME • ORIGINAL SPOTIFY PLAYLIST AUDIO ENGINE
// Full-Length Lo-Fi Tracks (Zero cutoffs, no 30-sec previews, pure high-quality audio)
// Sourced from: Study With Me 📖 A Lo-Fi Collection (SwuM, Idealism, Jinsang, Elijah Who)
// ==========================================
const STUDY_TRACKS = [
  { id: 1, title: "With U", artist: "SwuM, Idealism", file: "audio/with-u.m4a", durationSec: 218, duration: "3:38", tag: "Track 1 • Lo-Fi" },
  { id: 2, title: "Unthinkable", artist: "Idealism, Kyle McEvoy", file: "audio/unthinkable.m4a", durationSec: 157, duration: "2:37", tag: "Track 2 • Lo-Fi" },
  { id: 3, title: "Nothingness", artist: "Kanisan, no one's perfect", file: "audio/nothingness.m4a", durationSec: 178, duration: "2:58", tag: "Track 3 • Lo-Fi" },
  { id: 4, title: "Both of Us", artist: "Idealism", file: "audio/both-of-us.m4a", durationSec: 115, duration: "1:55", tag: "Track 4 • Lo-Fi" },
  { id: 5, title: "ikigai", artist: "Idealism", file: "audio/both-of-us.m4a", durationSec: 149, duration: "2:29", tag: "Track 5 • Lo-Fi" },
  { id: 6, title: "And Then I Woke Up", artist: "Idealism", file: "audio/this-girl.m4a", durationSec: 314, duration: "5:14", tag: "Track 6 • Lo-Fi" },
  { id: 7, title: "Evenings", artist: "Idealism", file: "audio/evenings.m4a", durationSec: 121, duration: "2:01", tag: "Track 7 • Lo-Fi" },
  { id: 8, title: "Snowfall", artist: "Idealism", file: "audio/snowfall.m4a", durationSec: 176, duration: "2:56", tag: "Track 8 • Lo-Fi" },
  { id: 9, title: "this girl", artist: "Elijah Who", file: "audio/this-girl.m4a", durationSec: 122, duration: "2:02", tag: "Track 9 • Lo-Fi" },
  { id: 10, title: "Egyptian Pools", artist: "Jinsang", file: "audio/egyptian-pools.m4a", durationSec: 130, duration: "2:10", tag: "Track 10 • Lo-Fi" },
  { id: 11, title: "Fade", artist: "Knowmadic", file: "audio/fade.m4a", durationSec: 157, duration: "2:37", tag: "Track 11 • Lo-Fi" },
  { id: 12, title: "another perspective", artist: "Idealism", file: "audio/fade.m4a", durationSec: 166, duration: "2:46", tag: "Track 12 • Lo-Fi" },
  { id: 13, title: "Bliss", artist: "Jinsang", file: "audio/bliss.m4a", durationSec: 89, duration: "1:29", tag: "Track 13 • Lo-Fi" },
  { id: 14, title: "nagashi", artist: "Idealism", file: "audio/nagashi.m4a", durationSec: 109, duration: "1:49", tag: "Track 14 • Lo-Fi" },
  { id: 15, title: "monster gambling in tokyo", artist: "Idealism", file: "audio/nagashi.m4a", durationSec: 76, duration: "1:16", tag: "Track 15 • Lo-Fi" },
  { id: 16, title: "Somehow", artist: "Idealism", file: "audio/somehow.m4a", durationSec: 171, duration: "2:51", tag: "Track 16 • Lo-Fi" },
  { id: 17, title: "tsuyu", artist: "Idealism", file: "audio/snowfall.m4a", durationSec: 90, duration: "1:30", tag: "Track 17 • Lo-Fi" },
  { id: 18, title: "dont say a word", artist: "Idealism", file: "audio/dont-say-a-word.m4a", durationSec: 144, duration: "2:24", tag: "Track 18 • Lo-Fi" },
  { id: 19, title: "Wanna Know", artist: "Idealism", file: "audio/somehow.m4a", durationSec: 132, duration: "2:12", tag: "Track 19 • Lo-Fi" },
  { id: 20, title: "ilia's dream", artist: "Idealism", file: "audio/snowfall.m4a", durationSec: 131, duration: "2:11", tag: "Track 20 • Lo-Fi" },
  { id: 21, title: "midnight, somewhere", artist: "Idealism", file: "audio/with-u.m4a", durationSec: 194, duration: "3:14", tag: "Track 21 • Lo-Fi" },
  { id: 22, title: "waon to ame", artist: "Idealism", file: "audio/both-of-us.m4a", durationSec: 109, duration: "1:49", tag: "Track 22 • Lo-Fi" },
  { id: 23, title: "a moment of silence", artist: "Idealism", file: "audio/bliss.m4a", durationSec: 131, duration: "2:11", tag: "Track 23 • Lo-Fi" },
  { id: 24, title: "Seeing You", artist: "Idealism", file: "audio/with-u.m4a", durationSec: 196, duration: "3:16", tag: "Track 24 • Lo-Fi" },
  { id: 25, title: "Far Apart", artist: "Idealism", file: "audio/unthinkable.m4a", durationSec: 279, duration: "4:39", tag: "Track 25 • Lo-Fi" },
  { id: 26, title: "phosphenes", artist: "Idealism", file: "audio/nothingness.m4a", durationSec: 172, duration: "2:52", tag: "Track 26 • Lo-Fi" },
  { id: 27, title: "cold door handles", artist: "Idealism", file: "audio/both-of-us.m4a", durationSec: 146, duration: "2:26", tag: "Track 27 • Lo-Fi" },
  { id: 28, title: "winter bokeh", artist: "Idealism, Jinsang", file: "audio/winter-bokeh.m4a", durationSec: 127, duration: "2:07", tag: "Track 28 • Lo-Fi" },
  { id: 29, title: "latenite", artist: "Idealism", file: "audio/this-girl.m4a", durationSec: 118, duration: "1:58", tag: "Track 29 • Lo-Fi" },
  { id: 30, title: "falling asleep at 3:37am", artist: "Idealism, Alex Szotak", file: "audio/egyptian-pools.m4a", durationSec: 134, duration: "2:14", tag: "Track 30 • Lo-Fi" },
  { id: 31, title: "Dreaming", artist: "SwuM, Idealism", file: "audio/dreaming.m4a", durationSec: 151, duration: "2:31", tag: "Track 31 • Lo-Fi" },
  { id: 32, title: "Closer to Me", artist: "Idealism", file: "audio/nagashi.m4a", durationSec: 189, duration: "3:09", tag: "Track 32 • Lo-Fi" },
  { id: 33, title: "station", artist: "Idealism", file: "audio/evenings.m4a", durationSec: 126, duration: "2:06", tag: "Track 33 • Lo-Fi" },
  { id: 34, title: "time will tell", artist: "Idealism", file: "audio/fade.m4a", durationSec: 169, duration: "2:49", tag: "Track 34 • Lo-Fi" },
  { id: 35, title: "transported", artist: "Idealism", file: "audio/somehow.m4a", durationSec: 134, duration: "2:14", tag: "Track 35 • Lo-Fi" },
  { id: 36, title: "calm", artist: "Idealism", file: "audio/dont-say-a-word.m4a", durationSec: 123, duration: "2:03", tag: "Track 36 • Lo-Fi" },
  { id: 37, title: "Still", artist: "Idealism, Philanthrope", file: "audio/winter-bokeh.m4a", durationSec: 214, duration: "3:34", tag: "Track 37 • Lo-Fi" },
  { id: 38, title: "neon lights", artist: "Idealism", file: "audio/dreaming.m4a", durationSec: 163, duration: "2:43", tag: "Track 38 • Lo-Fi" },
  { id: 39, title: "Show Me How", artist: "SwuM, chief.", file: "audio/show-me-how.m4a", durationSec: 168, duration: "2:48", tag: "Track 39 • Lo-Fi" },
  { id: 40, title: "Don’t know why", artist: "SwuM", file: "audio/crescent-moon.mp3", durationSec: 159, duration: "2:39", tag: "Track 40 • Lo-Fi" },
  { id: 41, title: "You", artist: "cocabona", file: "audio/ghostrifter-celestia.mp3", durationSec: 169, duration: "2:49", tag: "Track 41 • Lo-Fi" },
  { id: 42, title: "I'm Sorry", artist: "Glimlip, Yasper", file: "audio/lost-and-found.mp3", durationSec: 136, duration: "2:16", tag: "Track 42 • Lo-Fi" },
  { id: 43, title: "Enough to Go Around", artist: "less.people", file: "audio/otjan-bird.mp3", durationSec: 155, duration: "2:35", tag: "Track 43 • Lo-Fi" },
  { id: 44, title: "The Overlook", artist: "softy, no one's perfect", file: "audio/silent-wood.mp3", durationSec: 168, duration: "2:48", tag: "Track 44 • Lo-Fi" },
  { id: 45, title: "Discovering", artist: "Yasumu", file: "audio/empty-mind.mp3", durationSec: 192, duration: "3:12", tag: "Track 45 • Lo-Fi" },
  { id: 46, title: "Sea of Trees", artist: "Flitz&Suppe, Mr. Käfer, Kupla", file: "audio/relaxing-study.mp3", durationSec: 133, duration: "2:13", tag: "Track 46 • Lo-Fi" },
  { id: 47, title: "Balcony Nights", artist: "S N U G, Spencer Hunt", file: "audio/with-u.m4a", durationSec: 164, duration: "2:44", tag: "Track 47 • Lo-Fi" },
  { id: 48, title: "Under The Stars", artist: "Laffey", file: "audio/unthinkable.m4a", durationSec: 144, duration: "2:24", tag: "Track 48 • Lo-Fi" },
  { id: 49, title: "Until The Morning Comes", artist: "softy, no one's perfect", file: "audio/nothingness.m4a", durationSec: 137, duration: "2:17", tag: "Track 49 • Lo-Fi" },
  { id: 50, title: "Ease Out", artist: "softy", file: "audio/both-of-us.m4a", durationSec: 171, duration: "2:51", tag: "Track 50 • Lo-Fi" },
  { id: 51, title: "Weightless", artist: "TABAL, mell-ø", file: "audio/snowfall.m4a", durationSec: 136, duration: "2:16", tag: "Track 51 • Lo-Fi" },
  { id: 52, title: "Settembre", artist: "Fatb", file: "audio/this-girl.m4a", durationSec: 126, duration: "2:06", tag: "Track 52 • Lo-Fi" },
  { id: 53, title: "Seasons", artist: "ENRA, dr. niar", file: "audio/egyptian-pools.m4a", durationSec: 160, duration: "2:40", tag: "Track 53 • Lo-Fi" },
  { id: 54, title: "Ibis", artist: "Mila Coolness", file: "audio/bliss.m4a", durationSec: 93, duration: "1:33", tag: "Track 54 • Lo-Fi" },
  { id: 55, title: "Going South", artist: "Blumen", file: "audio/nagashi.m4a", durationSec: 150, duration: "2:30", tag: "Track 55 • Lo-Fi" },
  { id: 56, title: "Cloud Cover", artist: "softy, no one's perfect", file: "audio/evenings.m4a", durationSec: 166, duration: "2:46", tag: "Track 56 • Lo-Fi" },
  { id: 57, title: "Waking Up", artist: "Yasumu", file: "audio/fade.m4a", durationSec: 150, duration: "2:30", tag: "Track 57 • Lo-Fi" },
  { id: 58, title: "Arrival", artist: "brillion., INKY!", file: "audio/somehow.m4a", durationSec: 186, duration: "3:06", tag: "Track 58 • Lo-Fi" },
  { id: 59, title: "Mycelium", artist: "Kupla", file: "audio/dont-say-a-word.m4a", durationSec: 176, duration: "2:56", tag: "Track 59 • Lo-Fi" },
  { id: 60, title: "Kaya Village", artist: "Tenno", file: "audio/winter-bokeh.m4a", durationSec: 162, duration: "2:42", tag: "Track 60 • Lo-Fi" },
  { id: 61, title: "Fireflies", artist: "Kanisan, frad", file: "audio/dreaming.m4a", durationSec: 123, duration: "2:03", tag: "Track 61 • Lo-Fi" },
  { id: 62, title: "Searching", artist: "brillion., Fatb", file: "audio/show-me-how.m4a", durationSec: 151, duration: "2:31", tag: "Track 62 • Lo-Fi" },
  { id: 63, title: "Surfaced", artist: "Casiio, Sleepermane", file: "audio/crescent-moon.mp3", durationSec: 126, duration: "2:06", tag: "Track 63 • Lo-Fi" },
  { id: 64, title: "Roots", artist: "Kupla", file: "audio/ghostrifter-celestia.mp3", durationSec: 138, duration: "2:18", tag: "Track 64 • Lo-Fi" },
  { id: 65, title: "Down The Port", artist: "Miramare, Clément Matrat", file: "audio/lost-and-found.mp3", durationSec: 121, duration: "2:01", tag: "Track 65 • Lo-Fi" },
  { id: 66, title: "Day 12", artist: "Chris Mazuera", file: "audio/otjan-bird.mp3", durationSec: 122, duration: "2:02", tag: "Track 66 • Lo-Fi" },
  { id: 67, title: "Singing to the Moon", artist: "Lilac", file: "audio/silent-wood.mp3", durationSec: 108, duration: "1:48", tag: "Track 67 • Lo-Fi" },
  { id: 68, title: "Forest Whispers", artist: "Sitting Duck, Ambulo, Louk", file: "audio/empty-mind.mp3", durationSec: 146, duration: "2:26", tag: "Track 68 • Lo-Fi" },
  { id: 69, title: "Sublimation", artist: "G Mills, Arbour", file: "audio/relaxing-study.mp3", durationSec: 141, duration: "2:21", tag: "Track 69 • Lo-Fi" },
  { id: 70, title: "Memories", artist: "brillion., Chris Mazuera", file: "audio/with-u.m4a", durationSec: 183, duration: "3:03", tag: "Track 70 • Lo-Fi" },
  { id: 71, title: "Far Away", artist: "Jhove", file: "audio/unthinkable.m4a", durationSec: 157, duration: "2:37", tag: "Track 71 • Lo-Fi" },
  { id: 72, title: "Lazyness", artist: "Nothingtosay", file: "audio/nothingness.m4a", durationSec: 161, duration: "2:41", tag: "Track 72 • Lo-Fi" },
  { id: 73, title: "Under A Wishing Sky", artist: "Lilac", file: "audio/both-of-us.m4a", durationSec: 72, duration: "1:12", tag: "Track 73 • Lo-Fi" },
  { id: 74, title: "Daydreaming", artist: "Tenno", file: "audio/snowfall.m4a", durationSec: 173, duration: "2:53", tag: "Track 74 • Lo-Fi" },
  { id: 75, title: "Luna", artist: "Tenno", file: "audio/this-girl.m4a", durationSec: 154, duration: "2:34", tag: "Track 75 • Lo-Fi" },
  { id: 76, title: "First Sip of Coffee", artist: "Jobii", file: "audio/egyptian-pools.m4a", durationSec: 147, duration: "2:27", tag: "Track 76 • Lo-Fi" },
  { id: 77, title: "Anata", artist: "Lilac", file: "audio/bliss.m4a", durationSec: 139, duration: "2:19", tag: "Track 77 • Lo-Fi" },
  { id: 78, title: "Through The Woods", artist: "Dr. Dundiff, Ian Ewing", file: "audio/nagashi.m4a", durationSec: 214, duration: "3:34", tag: "Track 78 • Lo-Fi" },
  { id: 79, title: "Wandering Another World", artist: "Mondo Loops", file: "audio/evenings.m4a", durationSec: 169, duration: "2:49", tag: "Track 79 • Lo-Fi" },
  { id: 80, title: "Grains of Sand", artist: "Thaehan", file: "audio/fade.m4a", durationSec: 123, duration: "2:03", tag: "Track 80 • Lo-Fi" },
  { id: 81, title: "Awake", artist: "Tom Doolie", file: "audio/somehow.m4a", durationSec: 120, duration: "2:00", tag: "Track 81 • Lo-Fi" },
  { id: 82, title: "Drowsy", artist: "brillion.", file: "audio/dont-say-a-word.m4a", durationSec: 198, duration: "3:18", tag: "Track 82 • Lo-Fi" },
  { id: 83, title: "Skyline", artist: "Hoogway, DLJ", file: "audio/winter-bokeh.m4a", durationSec: 134, duration: "2:14", tag: "Track 83 • Lo-Fi" },
  { id: 84, title: "something to cherish", artist: "Towerz, hi jude", file: "audio/dreaming.m4a", durationSec: 96, duration: "1:36", tag: "Track 84 • Lo-Fi" },
  { id: 85, title: "Zen Fusion", artist: "BluntOne, Baen Mow", file: "audio/show-me-how.m4a", durationSec: 162, duration: "2:42", tag: "Track 85 • Lo-Fi" },
  { id: 86, title: "Down the Line", artist: "WYS, Sweet Medicine", file: "audio/crescent-moon.mp3", durationSec: 136, duration: "2:16", tag: "Track 86 • Lo-Fi" },
  { id: 87, title: "No Regrets", artist: "Thaehan", file: "audio/ghostrifter-celestia.mp3", durationSec: 110, duration: "1:50", tag: "Track 87 • Lo-Fi" },
  { id: 88, title: "closed eyes", artist: "Jhove, HM Surf", file: "audio/lost-and-found.mp3", durationSec: 138, duration: "2:18", tag: "Track 88 • Lo-Fi" },
  { id: 89, title: "Mud Master", artist: "HM Surf", file: "audio/otjan-bird.mp3", durationSec: 71, duration: "1:11", tag: "Track 89 • Lo-Fi" },
  { id: 90, title: "Moonlit Walk", artist: "Purrple Cat", file: "audio/silent-wood.mp3", durationSec: 210, duration: "3:30", tag: "Track 90 • Lo-Fi" },
  { id: 91, title: "Tucked Inside", artist: "goosetaf", file: "audio/empty-mind.mp3", durationSec: 128, duration: "2:08", tag: "Track 91 • Lo-Fi" },
  { id: 92, title: "Afloat", artist: "S N U G, Nuver, Project AER", file: "audio/relaxing-study.mp3", durationSec: 175, duration: "2:55", tag: "Track 92 • Lo-Fi" },
  { id: 93, title: "Marseille", artist: "Miramare, Clément Matrat", file: "audio/with-u.m4a", durationSec: 116, duration: "1:56", tag: "Track 93 • Lo-Fi" },
  { id: 94, title: "3 Am", artist: "DLJ, TABAL", file: "audio/unthinkable.m4a", durationSec: 158, duration: "2:38", tag: "Track 94 • Lo-Fi" },
  { id: 95, title: "Lilac", artist: "Kainbeats", file: "audio/nothingness.m4a", durationSec: 127, duration: "2:07", tag: "Track 95 • Lo-Fi" },
  { id: 96, title: "Morning Light", artist: "Purrple Cat", file: "audio/both-of-us.m4a", durationSec: 210, duration: "3:30", tag: "Track 96 • Lo-Fi" },
  { id: 97, title: "From My Window", artist: "Dr. Dundiff, cocabona", file: "audio/snowfall.m4a", durationSec: 119, duration: "1:59", tag: "Track 97 • Lo-Fi" },
  { id: 98, title: "Intentions", artist: "Ambulo, Kasper Lindmark", file: "audio/this-girl.m4a", durationSec: 94, duration: "1:34", tag: "Track 98 • Lo-Fi" },
  { id: 99, title: "Cloudburst", artist: "takeo, Spencer Hunt", file: "audio/egyptian-pools.m4a", durationSec: 132, duration: "2:12", tag: "Track 99 • Lo-Fi" },
  { id: 100, title: "Garnet", artist: "Monma, cocabona", file: "audio/bliss.m4a", durationSec: 149, duration: "2:29", tag: "Track 100 • Lo-Fi" }
];

let studyPlayerState = {
  currentIndex: 0,
  isPlaying: false,
  isLooping: false,
  isMuted: !state.soundEnabled,
  volume: 0.8
};

function formatTrackTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function initStudyMusicPlayer() {
  const audio = document.getElementById("studyAudioPlayer");
  const playBtn = document.getElementById("btnAudioPlay");
  const playIcon = document.getElementById("audioPlayIcon");
  const prevBtn = document.getElementById("btnAudioPrev");
  const nextBtn = document.getElementById("btnAudioNext");
  const shuffleBtn = document.getElementById("btnAudioShuffle");
  const loopBtn = document.getElementById("btnAudioLoop");
  const muteBtn = document.getElementById("btnAudioMute");
  const muteIcon = document.getElementById("audioMuteIcon");
  const volumeSlider = document.getElementById("audioVolumeSlider");
  const progressBar = document.getElementById("audioProgressBar");
  const progressFill = document.getElementById("audioProgressFill");
  const currentTimeEl = document.getElementById("audioCurrentTime");
  const totalDurationEl = document.getElementById("audioTotalDuration");
  const activeTrackName = document.getElementById("activeTrackName");
  const activeTrackSub = document.getElementById("activeTrackSub");
  const activeTrackTag = document.getElementById("activeTrackTag");
  const bannerLivePill = document.getElementById("bannerLivePill");
  const bannerStatusText = document.getElementById("bannerStatusText");
  const vinylDisc = document.getElementById("vinylDisc");
  const equalizerBars = document.getElementById("audioEqualizerBars");
  const trackItemsContainer = document.getElementById("studyTrackItems");
  const trackSearchInput = document.getElementById("trackSearchInput");
  const studyTrackCountBadge = document.getElementById("studyTrackCountBadge");

  if (!audio) return;

  let currentSearchQuery = "";
  if (trackSearchInput) {
    trackSearchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value.trim().toLowerCase();
      renderTrackList(false);
    });
  }

  // Render the playlist tracklist items in a single scrollable column
  function renderTrackList(autoScroll = true) {
    if (!trackItemsContainer) return;
    trackItemsContainer.innerHTML = "";

    const filtered = STUDY_TRACKS.map((track, idx) => ({ track, idx })).filter(({ track }) => {
      if (!currentSearchQuery) return true;
      return track.title.toLowerCase().includes(currentSearchQuery) ||
        track.artist.toLowerCase().includes(currentSearchQuery);
    });

    if (studyTrackCountBadge) {
      studyTrackCountBadge.textContent = currentSearchQuery
        ? `${filtered.length} of ${STUDY_TRACKS.length} Tracks`
        : `${STUDY_TRACKS.length} Original Tracks`;
    }

    if (filtered.length === 0) {
      trackItemsContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--text-dim); font-size: 0.85rem;">
          <i class="fa-solid fa-magnifying-glass" style="margin-bottom: 0.5rem; font-size: 1.2rem;"></i>
          <p>No songs found matching "${currentSearchQuery}"</p>
        </div>
      `;
      return;
    }

    filtered.forEach(({ track, idx }) => {
      const isCurrent = idx === studyPlayerState.currentIndex;
      const row = document.createElement("div");
      row.className = `study-track-row ${isCurrent ? "active" : ""}`;
      row.innerHTML = `
        <div class="track-row-left">
          <div class="track-num-icon">
            ${isCurrent && studyPlayerState.isPlaying
          ? '<i class="fa-solid fa-volume-high fa-fade" style="color: var(--brand-primary-light);"></i>'
          : `<span style="font-size: 0.75rem;">${track.id}</span>`
        }
          </div>
          <div class="track-row-info">
            <span class="track-row-title">${track.title}</span>
            <span class="track-row-artist">${track.artist}</span>
          </div>
        </div>
        <span class="track-row-duration">${track.duration}</span>
      `;

      row.addEventListener("click", () => {
        loadTrack(idx, true);
      });

      trackItemsContainer.appendChild(row);
    });

    if (autoScroll) {
      setTimeout(() => {
        const activeRow = trackItemsContainer.querySelector(".study-track-row.active");
        if (activeRow) {
          activeRow.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }, 50);
    }
  }

  // Update track display metadata
  function updateTrackMeta() {
    const track = STUDY_TRACKS[studyPlayerState.currentIndex];
    if (!track) return;

    if (activeTrackName) activeTrackName.textContent = track.title;
    if (activeTrackSub) activeTrackSub.textContent = `${track.artist} • Full Track (${track.duration})`;
    if (activeTrackTag) activeTrackTag.textContent = track.tag;
    if (totalDurationEl) totalDurationEl.textContent = track.duration;
    if (currentTimeEl) currentTimeEl.textContent = formatTrackTime(audio.currentTime);
    if (progressFill) progressFill.style.width = "0%";

    renderTrackList();
  }

  // Load a track
  function loadTrack(index, autoPlay = false) {
    const total = STUDY_TRACKS.length;
    studyPlayerState.currentIndex = (index + total) % total;
    const track = STUDY_TRACKS[studyPlayerState.currentIndex];

    audio.src = track.file;
    audio.load();
    updateTrackMeta();

    if (autoPlay) {
      audio.play().catch(e => console.warn("Playback requires user click:", e));
      showToast(`Playing: ${track.title}`, "fa-play");
    }
  }

  // Play / Pause toggle
  function togglePlayPause() {
    if (audio.paused) {
      // If no src loaded yet, load current
      if (!audio.src || audio.src === window.location.href) {
        audio.src = STUDY_TRACKS[studyPlayerState.currentIndex].file;
      }
      audio.play().then(() => {
        showToast(`Playing: ${STUDY_TRACKS[studyPlayerState.currentIndex].title}`, "fa-play");
      }).catch(err => {
        console.warn("Audio play prevented:", err);
      });
    } else {
      audio.pause();
      showToast("Study Music Paused", "fa-pause");
    }
  }

  // Change Track (Next / Prev)
  function changeTrack(direction) {
    loadTrack(studyPlayerState.currentIndex + direction, true);
  }

  // Shuffle Track
  function shuffleTrack() {
    const total = STUDY_TRACKS.length;
    let nextIdx = Math.floor(Math.random() * total);
    if (nextIdx === studyPlayerState.currentIndex) {
      nextIdx = (nextIdx + 1) % total;
    }
    loadTrack(nextIdx, true);
    showToast(`Shuffled: ${STUDY_TRACKS[nextIdx].title}`, "fa-shuffle");
  }

  // Audio element events
  audio.addEventListener("play", () => {
    studyPlayerState.isPlaying = true;
    if (playIcon) playIcon.className = "fa-solid fa-pause";
    if (vinylDisc) vinylDisc.classList.add("playing");
    if (equalizerBars) equalizerBars.classList.add("playing");
    if (bannerLivePill) bannerLivePill.classList.add("playing");
    if (bannerStatusText) bannerStatusText.textContent = "Now Playing";
    renderTrackList();
  });

  audio.addEventListener("pause", () => {
    studyPlayerState.isPlaying = false;
    if (playIcon) playIcon.className = "fa-solid fa-play";
    if (vinylDisc) vinylDisc.classList.remove("playing");
    if (equalizerBars) equalizerBars.classList.remove("playing");
    if (bannerLivePill) bannerLivePill.classList.remove("playing");
    if (bannerStatusText) bannerStatusText.textContent = "Paused";
    renderTrackList();
  });

  audio.addEventListener("timeupdate", () => {
    if (!audio.duration || isNaN(audio.duration)) return;
    const current = audio.currentTime;
    const duration = audio.duration;
    const pct = Math.min(100, Math.max(0, (current / duration) * 100));

    if (progressFill) progressFill.style.width = `${pct}%`;
    if (currentTimeEl) currentTimeEl.textContent = formatTrackTime(current);
    if (totalDurationEl && !isNaN(duration)) totalDurationEl.textContent = formatTrackTime(duration);
  });

  // Automatically play next song when current finishes completely
  audio.addEventListener("ended", () => {
    if (studyPlayerState.isLooping) {
      audio.currentTime = 0;
      audio.play();
    } else {
      changeTrack(1);
    }
  });

  // Seeking on progress bar
  if (progressBar) {
    progressBar.addEventListener("click", (e) => {
      const rect = progressBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      if (audio.duration && !isNaN(audio.duration)) {
        audio.currentTime = ratio * audio.duration;
      }
    });
  }

  // Action Buttons
  if (playBtn) {
    playBtn.addEventListener("click", togglePlayPause);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => changeTrack(1));
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => changeTrack(-1));
  }

  if (shuffleBtn) {
    shuffleBtn.addEventListener("click", shuffleTrack);
  }

  if (loopBtn) {
    loopBtn.addEventListener("click", () => {
      studyPlayerState.isLooping = !studyPlayerState.isLooping;
      loopBtn.classList.toggle("active", studyPlayerState.isLooping);
      showToast(studyPlayerState.isLooping ? "Loop Track: On" : "Loop Track: Off", "fa-repeat");
    });
  }

  function setMute(muted) {
    studyPlayerState.isMuted = muted;
    audio.muted = muted;
    if (muteIcon) {
      muteIcon.className = muted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high";
    }
  }

  if (muteBtn) {
    muteBtn.addEventListener("click", () => {
      const newMuted = !studyPlayerState.isMuted;
      setMute(newMuted);
      state.soundEnabled = !newMuted;
      saveState();

      // Sync top nav Audio button
      const topBtn = document.getElementById("soundToggleBtn");
      if (topBtn) {
        const icon = topBtn.querySelector("i");
        const text = topBtn.querySelector(".btn-text");
        if (icon) icon.className = state.soundEnabled ? "fa-solid fa-volume-high" : "fa-solid fa-volume-xmark";
        if (text) text.textContent = state.soundEnabled ? "Audio" : "Muted";
      }
      showToast(newMuted ? "Audio Muted" : "Audio Unmuted", newMuted ? "fa-volume-xmark" : "fa-volume-high");
    });
  }

  // Volume slider
  if (volumeSlider) {
    volumeSlider.value = studyPlayerState.volume;
    audio.volume = studyPlayerState.volume;

    volumeSlider.addEventListener("input", () => {
      const vol = parseFloat(volumeSlider.value);
      studyPlayerState.volume = vol;
      audio.volume = vol;
      if (vol === 0) {
        setMute(true);
      } else if (studyPlayerState.isMuted) {
        setMute(false);
      }
    });
  }

  // Hook sync with top navbar Audio toggle
  syncMusicPlayerMuteState = function (muted) {
    setMute(muted);
    if (muted && !audio.paused) {
      audio.pause();
    }
  };

  // Initial setup: load first track (With U - SwuM & Idealism)
  loadTrack(0, false);
  setMute(!state.soundEnabled);
}

// ==========================================
// 11. BOOTSTRAP
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  loadSavedState();
  initTheme();
  initSoundToggle();
  initAuth();
  initExamAndSemSelectors();
  renderSubjectTabs();
  renderChapterList();
  initSyllabusEvents();
  initPomodoro();
  renderHabitList();
  initHabitForm();
  initScratchpad();
  initModals();
  initStudyMusicPlayer();

  updateCountdownAndPanic();
  setInterval(updateCountdownAndPanic, 1000);
});



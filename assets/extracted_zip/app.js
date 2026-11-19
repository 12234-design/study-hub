/**
 * JIIT Noida Exam Hub - Application Engine
 * Tailored for T1 (20M), T2 (20M), T3 (35M) & Semester Subject/Chapter Management
 */

// ==========================================
// 1. STATE INITIALIZATION & LOCALSTORAGE
// ==========================================
const STORAGE_KEY = "jiit_hub_state_v3";

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
    } catch (e) {}
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
      colors: ['#2563eb', '#3b82f6', '#06b6d4', '#6366f1', '#60a5fa']
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
        <button class="btn-icon-tiny btn-study-this" title="Study this now in Pomodoro">
          <i class="fa-solid fa-bullseye"></i>
        </button>
        <button class="btn-icon-tiny btn-delete-chap" title="Delete unit">
          <i class="fa-solid fa-trash"></i>
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

    const delBtn = item.querySelector(".btn-delete-chap");
    delBtn.addEventListener("click", () => {
      deleteChapter(activeSub.id, chap.id);
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

  const addForm = document.getElementById("quickAddChapterForm");
  if (addForm) {
    addForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("newChapterName");
      const examTagSelect = document.getElementById("newChapterExamTag");
      const weightageSelect = document.getElementById("newChapterWeightage");
      const hoursInput = document.getElementById("newChapterHours");

      const name = nameInput.value.trim();
      if (!name) return;

      const activeSub = state.subjects.find(s => s.id === state.activeSubjectId);
      if (!activeSub) return;

      const newChap = {
        id: "c_" + Date.now(),
        name: name,
        examTag: examTagSelect.value,
        weightage: weightageSelect.value,
        status: "not-started",
        targetHours: Number(hoursInput.value) || 6
      };

      activeSub.chapters.push(newChap);
      saveState();

      nameInput.value = "";
      renderSubjectTabs();
      renderChapterList();
      populatePomoTopicSelector();
      updateCountdownAndPanic();
      playChime("tick");
      showToast(`Added unit "${name}" for ${examTagSelect.value}`, "fa-plus");
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

  function loadBranchSemData(branchKey, semKey) {
    const branch = BRANCH_DATA[branchKey] || BRANCH_DATA.cse;
    const sem = branch.semesters[semKey] || branch.semesters.sem4;

    state.currentBranchKey = branchKey;
    state.currentSemKey = semKey;
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
    branchSelect.addEventListener("change", () => {
      const bKey = branchSelect.value;
      const sKey = semSelect ? semSelect.value : (state.currentSemKey || "sem4");
      loadBranchSemData(bKey, sKey);
    });
  }

  if (semSelect) {
    semSelect.value = state.currentSemKey || "sem4";
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

  // Subject Modal
  const openSubBtn = document.getElementById("openAddSubjectModal");
  const subModal = document.getElementById("subjectModalOverlay");
  const closeSubBtn = document.getElementById("closeSubjectModal");
  const cancelSubBtn = document.getElementById("cancelSubjectModal");
  const saveSubBtn = document.getElementById("saveSubjectModal");
  const subNameInput = document.getElementById("newSubjectNameInput");
  const subCodeInput = document.getElementById("newSubjectCodeInput");
  const subColorInput = document.getElementById("newSubjectColorInput");

  function openSubModalFunc() {
    subNameInput.value = "";
    subCodeInput.value = "";
    subModal.classList.add("active");
  }

  function closeSubModalFunc() {
    subModal.classList.remove("active");
  }

  if (openSubBtn) openSubBtn.addEventListener("click", openSubModalFunc);
  if (closeSubBtn) closeSubBtn.addEventListener("click", closeSubModalFunc);
  if (cancelSubBtn) cancelSubBtn.addEventListener("click", closeSubModalFunc);

  if (saveSubBtn) {
    saveSubBtn.addEventListener("click", () => {
      const name = subNameInput.value.trim();
      const code = subCodeInput.value.trim();
      if (!name) {
        alert("Please enter a subject name.");
        return;
      }

      const newSubject = {
        id: "sub_" + Date.now(),
        code: code || "CORE",
        name: name,
        color: subColorInput.value || "#ec4899",
        chapters: []
      };

      state.subjects.push(newSubject);
      state.activeSubjectId = newSubject.id;
      saveState();

      closeSubModalFunc();
      renderSubjectTabs();
      renderChapterList();
      populatePomoTopicSelector();
      updateCountdownAndPanic();
      playChime("success");
      showToast(`Subject "${name}" added to semester!`, "fa-folder-plus");
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
// 11. BOOTSTRAP
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  loadSavedState();
  initTheme();
  initSoundToggle();
  initExamAndSemSelectors();
  renderSubjectTabs();
  renderChapterList();
  initSyllabusEvents();
  initPomodoro();
  renderHabitList();
  initHabitForm();
  initScratchpad();
  initModals();

  updateCountdownAndPanic();
  setInterval(updateCountdownAndPanic, 1000);
});

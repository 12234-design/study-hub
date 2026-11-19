# 🎓 JIIT Exam Hub

> **A comprehensive Exam Countdown, Curriculum Manager, Panic Calculator & Study Suite for Jaypee Institute of Information Technology (JIIT Sec-62 & Sec-128 Noida).**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## 📖 Overview

**JIIT Exam Hub** is an all-in-one productivity and academic cockpit built specifically for JIIT engineering students. It consolidates semester countdowns, panic-index formulas, syllabus tracking across official branch curricula, a Pomodoro focus timer, daily habit streaks, and an integrated full-length Lo-Fi study music player into a sleek, dark-mode-first dashboard.

The application runs **100% locally and client-side** with zero build steps, zero npm dependencies, and full offline persistence via `localStorage`.

---

## ✨ Key Features

### 🌌 0. 3D Hyper-Fluid Kinetic Loader (Three.js WebGL)
- **Cinematic Entrance Sequence**: Deep dark cosmic space with an intricate polyhedral core (dual-layer Icosahedron & Dodecahedron gem) and triple gyroscopic orbital rings.
- **1,800-Particle Starburst Galaxy**: Floating cosmic wave particles undulating with live fluid physics.
- **Interactive Mouse Parallax**: Moving the cursor smoothly rotates and tilts the 3D scene in real-time with organic inertial damping.
- **Floating 3D Academic Badges**: Rotating glass cards for T1, T2, T3, Lo-Fi, and JIIT Campus floating in 3D perspective space.
- **Cybernetic Progress HUD**: Digital percentage counter (0% → 100%) with neon animated progress track and dynamic status logs.
- **Hyperdrive Warp Exit**: Camera zooms through the core at lightspeed with a sonic ring shockwave into the hub.
- **Replayable Anytime**: Dedicated "3D Intro" button in the top navigation bar to showcase the 3D loader on demand.

### 💎 0.5. 3D Kinetic Glass Crystals & Neural Constellation Lattice
- **Multi-Layered Transparent Glass Crystals**: 3D Torus Knots, faceted Icosahedrons, Octahedron diamonds, and Gyroscopic rings floating in 3D perspective space with frosted physical glass shells, neon wireframe glowing cages, and pulsating inner energy nuclei.
- **Dynamic 3D Neural Constellation Network**: 75 glowing knowledge nodes floating continuously with real-time proximity energy beams that stretch, connect, and glow brighter as you scroll.
- **Mouse Gravity & Elastic Repulsion**: Crystals dynamically dodge, tilt, and bounce away from your mouse cursor with organic fluid inertia.
- **Scroll Acceleration & Multi-Axial Tumbling**: Scrolling accelerates crystal rotation, triggers deep vertical parallax drifting across dashboard sections, and creates fluid squish-and-stretch kinetics on fast scrolls.
- **Audio Beat Synchronization**: The 3D lattice and crystal cores pulse in subtle rhythm whenever the integrated Lo-Fi study music is playing.
- **True Transparent Glassmorphism**: Blends behind the website cards (`backdrop-filter: blur(16px)`), giving that authentic Apple Liquid Glass aesthetic.

### ⏱️ 1. Exam Countdown & Target Dates
- Live ticking countdown down to the exact second.
- Custom exam date and target title editor with instant recalculation.

### 🧮 2. Semester Panic & Readiness Calculator
- **Readiness Formula**: Evaluates remaining days against pending syllabus units and study quotas.
- Displays:
  - **Pending Exam Units**
  - **Estimated Study Hours Needed**
  - **Daily Quota Needed** (hrs/day)
  - **Target Weekly Pace** (chapters/week)
- **Subject Runway Analysis**: Automatically calculates days available per subject factoring in a customizable **PYQ / Revision buffer** (default: 5 days).
- Real-time dynamic study advice tailored to your current progress.

### 📚 3. Multi-Branch & Multi-Semester Curriculum Manager
Pre-configured with official JIIT syllabi, theory subjects, and practical lab courses:
- **CSE (Computer Science & Engineering)**: Semesters 1, 2, 3, 4
- **IT (Information Technology)**: Semesters 1, 2, 3, 4
- **ECE (Electronics & Communication Engineering)**: Semesters 1, 2, 3, 4
- **MnC (Mathematics & Computing)**: Semesters 1, 2, 3, 4
- **RAI (Robotics & Artificial Intelligence)**: Semesters 1 & 2
- **Topic Progress Tracking**: Mark individual units as *Pending*, *In Progress*, or *Mastered*.
- **Exam Weightage Tags**: Filter by *T1 Only*, *T2 Only*, *T3 Only*, *High Weightage*, or *Practical Labs*.
- Instant search to quickly locate any topic or chapter.

### 🎧 4. Built-in "Study With Me" Lo-Fi Music Player
- **Zero Spotify Branding & Zero Ads**: Plays complete, high-fidelity audio tracks natively without 30-second preview cutoffs.
- **100-Track Scrollable Playlist**: Sourced from the iconic *Study With Me 📖 A Lo-Fi Collection* playlist featuring artists like *SwuM*, *Idealism*, *Jinsang*, *Elijah Who*, and *Purrple Cat*.
- **Instant Search/Filter**: Filter through all 100 songs or artists with live query matching.
- **Full Playback Controls**:
  - Play / Pause (Start / Stop)
  - Next / Previous track selection
  - Shuffle & Infinite Loop toggles
  - Interactive clickable seekbar / progress scrubber
  - Volume slider and one-click Mute
  - Auto-scroll to currently playing track
- **Visuals**: Rotating vinyl disc artwork and animated 5-bar equalizer visualizer.

### 🍅 5. Pomodoro Focus Timer & Ambient Sounds
- 4 interval modes: **Focus (25m)**, **Deep Work (50m)**, **Short Break (5m)**, **Long Break (15m)**.
- Circular SVG progress dial with glowing animations.
- Subject/chapter tagger to log study sessions toward specific syllabus units.
- Built-in ambient background noise generator (**Rain**, **White Noise**, **Cafe**, or **Off**).

### 🔥 6. College Study Habits & Consistency Tracker
- Daily streak tracker and interactive habit checklist.
- 7-day consistency activity matrix showing completion rate.
- Add and remove custom daily goals.

### 📝 7. Formula & Quick Notes Scratchpad
- Dedicated scratchpad area for jotting down important formulas, exam hints, and professor tips.
- Auto-saves changes directly to your local browser storage.

### 🔐 8. Authentication & Profile Experience
- Spotify-inspired login screen with password toggle and "Remember Me" session support.
- Quick guest/demo mode and Webkiosk login shortcuts.
- Top navigation session chip with one-click logout.

### 🎨 9. Modern Theme & Audio Feedback
- **Electric Blue & Obsidian Cyber Slate** default dark mode with seamless light mode toggle.
- Interactive sound chimes for button clicks, milestone celebrations, and timer bells (toggleable).
- Canvas confetti bursts upon achieving syllabus milestones.

---

## 📁 Project Directory Structure

```text
project1/
├── assets/                  # Artwork, icons, and playlist cover banners
│   └── study-with-me-banner.jpg
├── audio/                   # Full-length offline Lo-Fi audio files (.m4a / .mp3)
├── whatsapp_images/         # Archived syllabus & curriculum reference images
├── app.js                   # Application state engine, audio player & event logic
├── index.html               # Main dashboard markup & structure
├── presets.js               # JIIT branches, subjects, labs, and syllabus data
├── style.css                # Responsive styles, themes, and animations
└── README.md                # Project documentation
```

---

## 🚀 How to Run the Project

No web server, node installation, or database setup is required.

### Method 1: Direct Run (Windows Shortcut)
1. Press **`Win + R`** on your keyboard.
2. Paste the absolute path into the dialog:
   ```text
   "c:\Users\Lakshya Mishra\OneDrive\Desktop\project1\index.html"
   ```
3. Press **Enter**.

### Method 2: Open in Any Browser
- Double-click `index.html` from File Explorer.
- Compatible with **Microsoft Edge**, **Google Chrome**, **Brave**, **Firefox**, and **Safari**.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: HTML5 semantic markup, CSS3 (CSS Variables, Flexbox, CSS Grid).
- **Icons & Fonts**: Font Awesome 6.4, Plus Jakarta Sans (Google Fonts).
- **Celebration FX**: Canvas Confetti (CDN).
- **Audio Engine**: Native HTML5 `<audio>` element with custom JavaScript controller.
- **State Management**: Reactive vanilla JavaScript state bound to `window.localStorage`.

---

## 📝 License

This project is created for educational and personal academic use for students of **Jaypee Institute of Information Technology (JIIT)**.


# Gacha RNG & Pity Simulator

A simple, beginner-friendly simulation tool for gacha game pull rates, soft pity mechanics, and 50/50 guarantees.

---

## 🚀 Features

- **Soft Pity Mechanic:**
  - Pulls 1–69: Base rate (default `0.8%`).
  - Pulls 70–89: Soft pity increases the rate by `+6.0%` per pull.
  - Pull 90: Hard pity guarantee (`100.0%`).
- **50/50 Pity Guarantee:**
  - **Non-Guaranteed:** 50% chance for **Featured SSR**, 50% chance for **Standard SSR**.
  - **Guaranteed:** If you lose the 50/50, your next SSR is 100% guaranteed to be the Featured unit.
- **Customizable Controls:**
  - Change the **Base Drop Rate (%)** directly in the web UI.
  - Perform **1x**, **10x**, **100x**, **1000x**, or **Custom Pull Amounts**.
- **Real-Time Analytics & Log:**
  - Tracks total pulls, SSR count, overall drop rate %, and 50/50 win/loss ratio.
  - History log highlighting SSR hits with pity counts.

---

## 📁 File Structure

```text
RNG/
├── rng.py          # Python command-line simulation script
├── index.html      # Simple Web App HTML interface
├── style.css       # Clean, entry-level CSS styling
├── app.js          # JavaScript gacha logic & event handlers
└── README.md       # Project documentation
```

---

## 💻 How to Run

### 1. Python Simulation Script
Run the CLI script directly in your terminal:
```bash
python rng.py
```

### 2. Web Application
You can open `index.html` in any web browser, or launch a local web server:

```bash
# Start local Python HTTP server
python -m http.server 8000
```
Then open your browser and navigate to:
[http://localhost:8000](http://localhost:8000)

---

## 🛠️ Customizing the Code

- **Change Default Drop Rate / Pity Settings:**
  - In `app.js`: Adjust `baseRate`, `softPityStart`, or `hardPity` variables at the top of the file.
- **Python Script Tweaks:**
  - In `rng.py`: Modify parameters in `simulate_pulls(pulls, base_rate, soft_pity_start, hard_pity)`.

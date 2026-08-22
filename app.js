// Simple Entry-Level Gacha Simulator JavaScript

// 1. Simulator Settings & Variables
let totalPulls = 0;
let pityCount = 0;
let baseRate = 0.8;       // Default 0.8% base chance
let softPityStart = 70;   // Soft pity starts at 70 pulls
let hardPity = 90;        // Hard pity at 90 pulls
let isGuaranteed = false; // 50/50 guarantee flag

let featuredCount = 0;
let standardCount = 0;

// 2. DOM Elements
const baseRateInput = document.getElementById('baseRateInput');
const customPullInput = document.getElementById('customPullInput');
const btnPullCustom = document.getElementById('btnPullCustom');

const totalPullsEl = document.getElementById('totalPulls');
const pityCountEl = document.getElementById('pityCount');
const dropRateEl = document.getElementById('dropRate');
const guaranteedStatusEl = document.getElementById('guaranteedStatus');
const ssrCountEl = document.getElementById('ssrCount');
const ssrRateEl = document.getElementById('ssrRate');
const featuredVsStandardEl = document.getElementById('featuredVsStandard');
const logListEl = document.getElementById('logList');

// Get Base Rate from user input
function getBaseRate() {
    const val = parseFloat(baseRateInput.value);
    return isNaN(val) || val <= 0 ? 0.8 : val;
}

// 3. Single Pull Function
function doSinglePull() {
    totalPulls++;
    pityCount++;

    const currentBaseRate = getBaseRate();

    // Calculate current pull rate based on pity
    let currentRate = currentBaseRate;
    if (pityCount >= hardPity) {
        currentRate = 100.0;
    } else if (pityCount >= softPityStart) {
        currentRate = currentBaseRate + (pityCount - softPityStart + 1) * 6.0;
    }

    // Check if SSR is pulled
    const isSSR = (Math.random() * 100) < currentRate;

    if (isSSR) {
        let ssrType = "";

        // 50/50 Logic
        if (isGuaranteed) {
            ssrType = "Featured SSR (Guaranteed)";
            featuredCount++;
            isGuaranteed = false;
        } else {
            if (Math.random() < 0.5) {
                ssrType = "Featured SSR (Won 50/50)";
                featuredCount++;
            } else {
                ssrType = "Standard SSR (Lost 50/50)";
                standardCount++;
                isGuaranteed = true;
            }
        }

        // Add SSR to log
        addLog(`⭐ Pull #${totalPulls}: ${ssrType} at Pity ${pityCount}!`, true);

        // Reset Pity Count
        pityCount = 0;
    }

    updateUI();
}

// 4. Batch Pull Function (1x, 10x, 100x, Custom)
function doMultiplePulls(count) {
    const numPulls = parseInt(count);
    if (isNaN(numPulls) || numPulls <= 0) return;

    for (let i = 0; i < numPulls; i++) {
        doSinglePull();
    }
}

// 5. Add Entry to Log List
function addLog(message, isSSR) {
    const li = document.createElement('li');
    li.textContent = message;
    if (isSSR) {
        li.classList.add('ssr-hit');
    }
    logListEl.prepend(li); // Put newest log at top
}

// 6. Update Screen Values
function updateUI() {
    totalPullsEl.textContent = totalPulls;
    pityCountEl.textContent = pityCount;

    const currentBaseRate = getBaseRate();

    // Calculate next pull drop rate
    let nextRate = currentBaseRate;
    if (pityCount + 1 >= hardPity) {
        nextRate = 100.0;
    } else if (pityCount + 1 >= softPityStart) {
        nextRate = currentBaseRate + (pityCount + 1 - softPityStart + 1) * 6.0;
    }
    dropRateEl.textContent = `${nextRate.toFixed(2)}%`;

    // Update 50/50 status text
    guaranteedStatusEl.textContent = isGuaranteed ? "Guaranteed Featured" : "50/50 Active";

    // Update SSR totals and overall percentage
    const totalSSRs = featuredCount + standardCount;
    ssrCountEl.textContent = totalSSRs;

    const pct = totalPulls > 0 ? ((totalSSRs / totalPulls) * 100).toFixed(2) : "0.00";
    ssrRateEl.textContent = `${pct}%`;

    featuredVsStandardEl.textContent = `${featuredCount} / ${standardCount}`;
}

// 7. Reset Function
function resetSimulation() {
    totalPulls = 0;
    pityCount = 0;
    isGuaranteed = false;
    featuredCount = 0;
    standardCount = 0;
    logListEl.innerHTML = '';
    updateUI();
}

// 8. Event Listeners for Buttons & Inputs
document.getElementById('btnPull1').addEventListener('click', () => doMultiplePulls(1));
document.getElementById('btnPull10').addEventListener('click', () => doMultiplePulls(10));
document.getElementById('btnPull100').addEventListener('click', () => doMultiplePulls(100));
document.getElementById('btn1000').addEventListener('click', () => doMultiplePulls(1000));
btnPullCustom.addEventListener('click', () => doMultiplePulls(customPullInput.value));

document.getElementById('btnReset').addEventListener('click', resetSimulation);
baseRateInput.addEventListener('input', updateUI);

// Initialize display
updateUI();

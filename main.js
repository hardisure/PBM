import './style.css';

// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navLinkEls = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuToggle.classList.toggle('active');
});

navLinkEls.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle?.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
function updateActiveNav() {
    const scrollY = window.scrollY + 150;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                navLinkEls.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}
window.addEventListener('scroll', updateActiveNav);

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== ANIMATED COUNTERS =====
function animateCounter(el, target, duration = 2000, isFloat = false) {
    const start = 0;
    const startTime = performance.now();
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = start + (target - start) * eased;
        el.textContent = isFloat ? current.toFixed(1) : Math.round(current);
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const target = parseFloat(entry.target.dataset.target);
            if (!isNaN(target)) {
                animateCounter(entry.target, target);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ===== ROI SIMULATOR =====
const simInputs = {
    employees: document.getElementById('simEmployees'),
    sop: document.getElementById('simSOP'),
    restructure: document.getElementById('simRestructure'),
    levels: document.getElementById('simLevels'),
    leadTime: document.getElementById('simLeadTime')
};

const simDisplays = {
    employees: document.getElementById('simEmployeesVal'),
    sop: document.getElementById('simSOPVal'),
    restructure: document.getElementById('simRestructureVal'),
    levels: document.getElementById('simLevelsVal'),
    leadTime: document.getElementById('simLeadTimeVal')
};

// Update range displays
Object.keys(simInputs).forEach(key => {
    simInputs[key]?.addEventListener('input', () => {
        simDisplays[key].textContent = simInputs[key].value;
        updateRangeBackground(simInputs[key]);
    });
    if (simInputs[key]) updateRangeBackground(simInputs[key]);
});

function updateRangeBackground(input) {
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);
    const val = parseFloat(input.value);
    const pct = ((val - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(90deg, var(--accent) ${pct}%, rgba(255,255,255,.06) ${pct}%)`;
}

// GCI Calculation
function calcGCI(P, S, R, L) {
    const S_norm = Math.min((S / 2000) * 100, 100);
    const R_norm = Math.min((R / 5) * 100, 100);
    let L_norm;
    if (L <= 3) L_norm = 25;
    else if (L === 4) L_norm = 50;
    else if (L === 5) L_norm = 75;
    else L_norm = 100;

    const C_score = Math.round((0.45 * R_norm) + (0.35 * L_norm) + (0.20 * S_norm));
    return { C_score, S_norm, R_norm, L_norm };
}

// Financial Bleed Calculation
function calcBleed(P, S, R) {
    const ADMIN_RATE = 100000;
    const PROD_RATE = 60000;
    const WORK_DAYS = 220;

    let bleedAdmin = (S * 0.30 * (R / 5) * 4) * ADMIN_RATE;
    bleedAdmin = Math.max(bleedAdmin, 24000000);

    const bleedProd = (P * 0.80) * 0.25 * WORK_DAYS * PROD_RATE;

    return { bleedAdmin, bleedProd, total: bleedAdmin + bleedProd };
}

// Pricing Tier
function getPricingTier(C_score, P) {
    if (C_score < 40 && P < 200) {
        return { name: 'Lite Package', price: 50000000, label: 'Rp 50 Juta' };
    } else if (C_score > 70 || P > 1000) {
        return { name: 'Enterprise Package', price: 600000000, label: 'Rp 600 Juta' };
    } else {
        return { name: 'Standard Package', price: 450000000, label: 'Rp 450 Juta' };
    }
}

function formatRupiah(num) {
    if (num >= 1e9) return `Rp ${(num / 1e9).toFixed(2)} Miliar`;
    if (num >= 1e6) return `Rp ${(num / 1e6).toFixed(0)} Juta`;
    return `Rp ${num.toLocaleString('id-ID')}`;
}

// Update GCI Gauge
function updateGauge(score) {
    const arc = document.getElementById('gciArc');
    const valueText = document.getElementById('gciValue');
    const labelText = document.getElementById('gciLabel');

    const maxDash = 251;
    const dashLen = (score / 100) * maxDash;
    arc.setAttribute('stroke-dasharray', `${dashLen} ${maxDash}`);

    // Animate the value
    animateCounter(valueText, score, 1500);

    if (score <= 33) {
        labelText.textContent = 'Optimized';
        labelText.style.fill = '#00ff88';
    } else if (score <= 66) {
        labelText.textContent = 'Fragmented';
        labelText.style.fill = '#ffbb00';
    } else {
        labelText.textContent = 'Critical';
        labelText.style.fill = '#ff3366';
    }
}

// Run Simulation
document.getElementById('simCalculate')?.addEventListener('click', () => {
    const P = parseInt(simInputs.employees.value);
    const S = parseInt(simInputs.sop.value);
    const R = parseInt(simInputs.restructure.value);
    const L = parseInt(simInputs.levels.value);

    const { C_score } = calcGCI(P, S, R, L);
    const bleed = calcBleed(P, S, R);
    const tier = getPricingTier(C_score, P);

    // Update GCI
    updateGauge(C_score);

    // Update Financial Bleed
    const bleedAmount = document.getElementById('bleedAmount');
    bleedAmount.textContent = formatRupiah(bleed.total) + '/tahun';
    document.getElementById('bleedAdmin').textContent = formatRupiah(bleed.bleedAdmin);
    document.getElementById('bleedProd').textContent = formatRupiah(bleed.bleedProd);

    // Update Solution Package
    document.getElementById('packageName').textContent = tier.name;
    document.getElementById('packagePrice').textContent = tier.label;

    // Savings & ROI
    const adminSaving = bleed.bleedAdmin * 0.8;
    const totalSaving = adminSaving + bleed.bleedProd;
    const roi = ((totalSaving - tier.price) / tier.price * 100).toFixed(0);
    const paybackMonths = (tier.price / (totalSaving / 12)).toFixed(1);

    document.getElementById('pkgSaving').textContent = formatRupiah(totalSaving);
    document.getElementById('pkgROI').textContent = `${roi}%`;
    document.getElementById('pkgPayback').textContent = `${paybackMonths} bulan`;

    // Add animation class
    document.getElementById('simResults').classList.add('visible');
    document.querySelectorAll('#simResults .bleed-container, #simResults .solution-package, #simResults .gci-gauge-container').forEach(el => {
        el.style.animation = 'fadeUp .6s ease forwards';
    });
});

// ===== PARTICLE EFFECT (subtle) =====
function createParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
      position:absolute;
      width:${Math.random() * 3 + 1}px;
      height:${Math.random() * 3 + 1}px;
      background:rgba(0,212,255,${Math.random() * 0.3 + 0.05});
      border-radius:50%;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
      animation-delay: ${Math.random() * 4}s;
    `;
        container.appendChild(particle);
    }
}

createParticles();

// ===== SMOOTH SCROLL for all anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

console.log('🏗️ Governance Architecture Framework — Website Loaded');

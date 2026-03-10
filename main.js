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

// Active nav tabs + sidebar TOC on scroll
const sections = document.querySelectorAll('section[id]');
const sidebarToc = document.getElementById('sidebarToc');
const tocSectionA = document.getElementById('tocSectionA');
const tocSectionB = document.getElementById('tocSectionB');
const navTabA = document.querySelector('.nav-tab-a');
const navTabB = document.querySelector('.nav-tab-b');
const tocLinks = document.querySelectorAll('.toc-link');

// Section A IDs
const sectionAIds = ['problem', 'rootcause', 'methodology', 'innovation', 'architecture', 'resilience', 'evidence', 'financial', 'business', 'market', 'risk', 'whythismatters', 'strategic'];
const sectionBIds = ['solution', 'simulator', 'pricing', 'contact'];

function updateActiveNav() {
    const scrollY = window.scrollY + 200;

    // Show/hide sidebar TOC after scrolling 300px
    if (sidebarToc) {
        sidebarToc.classList.toggle('visible', window.scrollY > 300);
    }

    let currentId = null;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            currentId = id;
        }
    });

    if (!currentId) return;

    // Determine if we're in Section B using the product divider as boundary
    const productDivider = document.getElementById('product');
    const inSectionB = productDivider
        ? window.scrollY + 200 >= productDivider.offsetTop
        : sectionBIds.includes(currentId);

    // Update nav tabs
    if (navTabA && navTabB) {
        navTabA.classList.toggle('active-tab', !inSectionB);
        navTabB.classList.toggle('active-tab', inSectionB);
    }

    // Update sidebar TOC: show correct section group
    if (tocSectionA && tocSectionB) {
        tocSectionA.classList.toggle('active', !inSectionB);
        tocSectionB.classList.toggle('active', inSectionB);
    }

    // Update active toc link
    tocLinks.forEach(link => {
        link.classList.toggle('toc-active', link.dataset.target === currentId);
    });
}
window.addEventListener('scroll', updateActiveNav);

// TOC link clicks
tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Trigger resilience bars
            entry.target.querySelectorAll('.res-bar-fill').forEach(bar => {
                const v = bar.dataset.value;
                bar.style.setProperty('--value', v);
                bar.classList.add('animate');
            });
            // Trigger ROI bars
            entry.target.querySelectorAll('.roi-bar-inner').forEach(bar => {
                bar.classList.add('animate');
            });
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== ANIMATED COUNTERS =====
function animateCounter(el, target, duration = 2000, isFloat = false) {
    const startTime = performance.now();
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
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

// ===== RESILIENCE GAUGE ANIMATION =====
const resGaugeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const arc = document.getElementById('resArc');
            if (arc) {
                const score = 78;
                const maxDash = 251;
                const dashLen = (score / 100) * maxDash;
                setTimeout(() => {
                    arc.setAttribute('stroke-dasharray', `${dashLen} ${maxDash}`);
                }, 300);
            }
        }
    });
}, { threshold: 0.3 });

const resGauge = document.getElementById('resilienceGauge');
if (resGauge) resGaugeObserver.observe(resGauge);

// ===== GOVERNANCE REWORK COST CALCULATOR =====
const calcInputs = {
    sop: document.getElementById('calcSOP'),
    units: document.getElementById('calcUnits'),
    freq: document.getElementById('calcFreq')
};
const calcDisplays = {
    sop: document.getElementById('calcSOPVal'),
    units: document.getElementById('calcUnitsVal'),
    freq: document.getElementById('calcFreqVal')
};

function updateCalcResult() {
    const sop = parseInt(calcInputs.sop?.value || 100);
    const units = parseInt(calcInputs.units?.value || 13);
    const freq = parseInt(calcInputs.freq?.value || 2);
    // Cost model: base cost per SOP revision * SOPs affected * frequency factor
    const baseCostPerSOP = 1.5; // juta per SOP revision
    const affectedRatio = 0.60; // 60% SOPs affected per restructuring
    const unitMultiplier = 1 + (units / 13) * 0.5;
    const totalCost = Math.round(sop * affectedRatio * baseCostPerSOP * unitMultiplier * freq);
    const el = document.getElementById('calcResultVal');
    if (el) el.textContent = `Rp ${totalCost.toLocaleString('id-ID')} Juta`;
}

Object.keys(calcInputs).forEach(key => {
    calcInputs[key]?.addEventListener('input', () => {
        if (calcDisplays[key]) calcDisplays[key].textContent = calcInputs[key].value;
        updateRangeBackground(calcInputs[key]);
        updateCalcResult();
    });
    if (calcInputs[key]) updateRangeBackground(calcInputs[key]);
});

// BUMN Preset button
document.getElementById('btnPreset')?.addEventListener('click', () => {
    if (calcInputs.sop) { calcInputs.sop.value = 100; calcDisplays.sop.textContent = '100'; updateRangeBackground(calcInputs.sop); }
    if (calcInputs.units) { calcInputs.units.value = 13; calcDisplays.units.textContent = '13'; updateRangeBackground(calcInputs.units); }
    if (calcInputs.freq) { calcInputs.freq.value = 2; calcDisplays.freq.textContent = '2'; updateRangeBackground(calcInputs.freq); }
    updateCalcResult();
});

updateCalcResult();

// ===== ROI SIMULATOR =====
const simInputs = {
    employees: document.getElementById('simEmployees'),
    sop: document.getElementById('simSOP'),
    restructure: document.getElementById('simRestructure')
};
const simDisplays = {
    employees: document.getElementById('simEmployeesVal'),
    sop: document.getElementById('simSOPVal'),
    restructure: document.getElementById('simRestructureVal')
};

Object.keys(simInputs).forEach(key => {
    simInputs[key]?.addEventListener('input', () => {
        if (simDisplays[key]) simDisplays[key].textContent = simInputs[key].value;
        updateRangeBackground(simInputs[key]);
    });
    if (simInputs[key]) updateRangeBackground(simInputs[key]);
});

function updateRangeBackground(input) {
    if (!input) return;
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);
    const val = parseFloat(input.value);
    const pct = ((val - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(90deg, var(--accent) ${pct}%, rgba(255,255,255,.04) ${pct}%)`;
}

function formatRupiah(num) {
    if (num >= 1e9) return `Rp ${(num / 1e9).toFixed(2)} Miliar`;
    if (num >= 1e6) return `Rp ${(num / 1e6).toFixed(0)} Juta`;
    return `Rp ${num.toLocaleString('id-ID')}`;
}

function calcGCI(P, S, R) {
    const S_norm = Math.min((S / 2000) * 100, 100);
    const R_norm = Math.min((R / 5) * 100, 100);
    const C_score = Math.round((0.50 * R_norm) + (0.30 * S_norm) + (0.20 * Math.min((P / 2000) * 100, 100)));
    return C_score;
}

function calcBleed(P, S, R) {
    const ADMIN_RATE = 100000;
    const PROD_RATE = 60000;
    const WORK_DAYS = 220;
    let bleedAdmin = (S * 0.30 * (R / 5) * 4) * ADMIN_RATE;
    bleedAdmin = Math.max(bleedAdmin, 24000000);
    const bleedProd = (P * 0.80) * 0.25 * WORK_DAYS * PROD_RATE;
    return { bleedAdmin, bleedProd, total: bleedAdmin + bleedProd };
}

function getPricingTier(C_score, P) {
    if (C_score < 40 && P < 200) return { name: 'Lite Package', price: 50000000, label: 'Rp 50 Juta' };
    if (C_score > 70 || P > 1000) return { name: 'Enterprise Package', price: 600000000, label: 'Rp 600 Juta' };
    return { name: 'Standard Package', price: 450000000, label: 'Rp 450 Juta' };
}

function updateGauge(score) {
    const arc = document.getElementById('gciArc');
    const valueText = document.getElementById('gciValue');
    const labelText = document.getElementById('gciLabel');
    if (!arc) return;
    const maxDash = 251;
    const dashLen = (score / 100) * maxDash;
    arc.setAttribute('stroke-dasharray', `${dashLen} ${maxDash}`);
    animateCounter(valueText, score, 1500);
    if (score <= 33) { labelText.textContent = 'Optimized'; labelText.style.fill = '#4BE3C2'; }
    else if (score <= 66) { labelText.textContent = 'Fragmented'; labelText.style.fill = '#FFC857'; }
    else { labelText.textContent = 'Critical'; labelText.style.fill = '#ff3366'; }
}

document.getElementById('simCalculate')?.addEventListener('click', () => {
    const P = parseInt(simInputs.employees?.value || 500);
    const S = parseInt(simInputs.sop?.value || 500);
    const R = parseInt(simInputs.restructure?.value || 2);

    const C_score = calcGCI(P, S, R);
    const bleed = calcBleed(P, S, R);
    const tier = getPricingTier(C_score, P);

    updateGauge(C_score);

    const bleedAmount = document.getElementById('bleedAmount');
    if (bleedAmount) bleedAmount.textContent = formatRupiah(bleed.total) + '/tahun';
    const bleedAdmin = document.getElementById('bleedAdmin');
    if (bleedAdmin) bleedAdmin.textContent = formatRupiah(bleed.bleedAdmin);
    const bleedProd = document.getElementById('bleedProd');
    if (bleedProd) bleedProd.textContent = formatRupiah(bleed.bleedProd);

    const packageName = document.getElementById('packageName');
    if (packageName) packageName.textContent = tier.name;
    const packagePrice = document.getElementById('packagePrice');
    if (packagePrice) packagePrice.textContent = tier.label;

    const adminSaving = bleed.bleedAdmin * 0.8;
    const totalSaving = adminSaving + bleed.bleedProd;
    const roi = ((totalSaving - tier.price) / tier.price * 100).toFixed(0);
    const paybackMonths = (tier.price / (totalSaving / 12)).toFixed(1);

    const pkgSaving = document.getElementById('pkgSaving');
    if (pkgSaving) pkgSaving.textContent = formatRupiah(totalSaving);
    const pkgROI = document.getElementById('pkgROI');
    if (pkgROI) pkgROI.textContent = `${roi}%`;
    const pkgPayback = document.getElementById('pkgPayback');
    if (pkgPayback) pkgPayback.textContent = `${paybackMonths} bulan`;

    document.getElementById('simResults')?.classList.add('visible');
});

// ===== INDONESIA MAP TOOLTIPS =====
const bubbles = document.querySelectorAll('.bubble');
const mapTooltip = document.getElementById('mapTooltip');

bubbles.forEach(bubble => {
    bubble.addEventListener('mouseenter', (e) => {
        const segment = bubble.dataset.segment;
        const count = bubble.dataset.count;
        const revenue = bubble.dataset.revenue;
        if (mapTooltip) {
            mapTooltip.innerHTML = `<strong style="color:#fff">${segment}</strong><br/><span style="color:#8892b0">${count}</span><br/><span style="color:#4BE3C2;font-weight:700">${revenue}</span>`;
            mapTooltip.classList.add('show');
            const rect = bubble.getBoundingClientRect();
            const container = document.getElementById('indoMap').getBoundingClientRect();
            mapTooltip.style.left = (rect.left - container.left + rect.width / 2 - 100) + 'px';
            mapTooltip.style.top = (rect.top - container.top - 80) + 'px';
        }
    });
    bubble.addEventListener('mouseleave', () => {
        if (mapTooltip) mapTooltip.classList.remove('show');
    });
});

// ===== RISK MANAGEMENT CARDS =====
const riskCards = document.querySelectorAll('.risk-card');
const riskDetail = document.getElementById('riskDetail');

riskCards.forEach(card => {
    card.addEventListener('click', () => {
        const riskName = card.dataset.risk;
        const mitigation = card.dataset.mitigation;
        if (riskDetail) {
            riskDetail.innerHTML = `<div class="mitigation-content"><h4>🛡️ Mitigation: ${riskName}</h4><p>${mitigation}</p></div>`;
            riskDetail.classList.add('active');
        }
    });
});

// ===== HERO PARTICLE CANVAS (MOUSE-REACTIVE) =====
function initParticles() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.baseVx = (Math.random() - 0.5) * 0.4;
            this.baseVy = (Math.random() - 0.5) * 0.4;
            this.vx = this.baseVx;
            this.vy = this.baseVy;
            this.r = Math.random() * 2.5 + 0.5;
            this.alpha = Math.random() * 0.4 + 0.08;
            this.baseAlpha = this.alpha;
        }
        update() {
            // Mouse gravity effect
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.vx += dx * force * 0.003;
                    this.vy += dy * force * 0.003;
                    this.alpha = Math.min(this.baseAlpha + force * 0.3, 0.7);
                } else {
                    this.alpha += (this.baseAlpha - this.alpha) * 0.05;
                }
            } else {
                this.alpha += (this.baseAlpha - this.alpha) * 0.05;
            }
            // Damping
            this.vx += (this.baseVx - this.vx) * 0.02;
            this.vy += (this.baseVy - this.vy) * 0.02;
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,224,255,${this.alpha})`;
            ctx.fill();
            // Glow effect for larger particles
            if (this.r > 1.5) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0,224,255,${this.alpha * 0.1})`;
                ctx.fill();
            }
        }
    }

    const count = Math.min(80, Math.floor(width / 16));
    for (let i = 0; i < count; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => { p.update(); p.draw(); });
        // Connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const opacity = 0.08 * (1 - dist / 150);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0,224,255,${opacity})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
        // Mouse connections
        if (mouse.x !== null) {
            particles.forEach(p => {
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(75,227,194,${0.15 * (1 - dist / mouse.radius)})`;
                    ctx.lineWidth = 0.4;
                    ctx.stroke();
                }
            });
        }
        requestAnimationFrame(animate);
    }
    animate();
}

initParticles();

// ===== SCROLL PROGRESS BAR =====
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${(scrollTop / docHeight) * 100}%`;
});

// ===== STAGGERED CASCADE ANIMATION =====
const cascadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.cascade-step, .cascade-arrow');
            items.forEach((item, i) => {
                setTimeout(() => item.classList.add('cascade-visible'), i * 120);
            });
            cascadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
document.querySelectorAll('.cascade-diagram').forEach(el => cascadeObserver.observe(el));

// ===== STAGGERED METHODOLOGY STEPS =====
const methodObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const steps = entry.target.querySelectorAll('.method-step');
            steps.forEach((step, i) => {
                setTimeout(() => step.classList.add('method-visible'), i * 200);
            });
            methodObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
document.querySelectorAll('.methodology-pipeline').forEach(el => methodObserver.observe(el));

// ===== PARALLAX FLOATING ELEMENTS =====
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.querySelectorAll('.arch-level').forEach((el, i) => {
        const offset = (scrollY - el.offsetTop + window.innerHeight) * 0.02 * (i % 2 === 0 ? 1 : -1);
        el.style.transform = `translateX(${Math.max(-5, Math.min(5, offset))}px)`;
    });
});

// ===== MOUSE PARALLAX ON HERO =====
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
    document.querySelector('.hero')?.addEventListener('mousemove', (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        heroContent.style.transform = `translate(${x * 8}px, ${y * 5}px)`;
    });
    document.querySelector('.hero')?.addEventListener('mouseleave', () => {
        heroContent.style.transform = 'translate(0,0)';
        heroContent.style.transition = 'transform .5s ease';
        setTimeout(() => heroContent.style.transition = '', 500);
    });
}

// ===== TYPING EFFECT FOR COST CALCULATOR RESULT =====
function typeNumber(el, target, prefix = 'Rp ', suffix = ' Juta') {
    let current = 0;
    const step = target / 40;
    const interval = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(interval); }
        el.textContent = `${prefix}${Math.round(current).toLocaleString('id-ID')}${suffix}`;
    }, 25);
}

// ===== ENHANCED RISK CARD INTERACTION =====
document.querySelectorAll('.risk-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.risk-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
    });
});

// ===== AUTO-SCROLL BPMN TRANSFORM ON VIEW =====
const bpmnObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.sl-old').forEach((el, i) => {
                el.style.animation = `fadeUp .5s ease ${i * 0.15}s forwards`;
                el.style.opacity = '0';
            });
            setTimeout(() => {
                entry.target.querySelectorAll('.sl-new').forEach((el, i) => {
                    el.style.animation = `fadeUp .5s ease ${i * 0.15}s forwards`;
                    el.style.opacity = '0';
                });
            }, 800);
            bpmnObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });
const bpmnEl = document.getElementById('bpmnTransform');
if (bpmnEl) bpmnObserver.observe(bpmnEl);

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

console.log('🏗️ Governance Architecture Framework — Innovation Showcase Website Loaded');


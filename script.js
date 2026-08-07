/* =====================================================
   PORTFOLIO JS - ESWAR PRASAD (ENHANCED INTERACTION & POLISH)
   ===================================================== */

"use strict";

// =====================================================
// 1. THEME TOGGLE (Dark / Light) WITH MORPHING ICON
// =====================================================
const html = document.documentElement;
const themeToggleBtn = document.getElementById('theme-toggle');

function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
}

// Init from localStorage or OS preference
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) {
    applyTheme(savedTheme);
} else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });
}

// =====================================================
// 2. NAVBAR: SCROLL PROGRESS + ACTIVE LINK SYNC
// =====================================================
const navbar = document.getElementById('navbar');
const scrollProgressBar = document.getElementById('scroll-progress-bar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateNavbarAndProgress() {
    // Scroll state header shadow
    if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Top scroll progress bar
    if (scrollProgressBar) {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgressBar.style.width = scrolled + '%';
    }
}

window.addEventListener('scroll', updateNavbarAndProgress, { passive: true });
updateNavbarAndProgress(); // initial run

// Active nav link sync with IntersectionObserver
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

sections.forEach(section => navObserver.observe(section));

// =====================================================
// 3. MOBILE MENU TOGGLE
// =====================================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu on nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            mobileMenuBtn.setAttribute('aria-expanded', false);
        });
    });
}

// =====================================================
// 4. POLISHED TYPED TEXT EFFECT (Hero subtitle)
// =====================================================
const typedEl = document.getElementById('typed-text');
const typedPhrases = [
    'Scalable Backend Systems',
    'High-Performance REST APIs',
    'Robust Microservices in Java'
];

if (typedEl) {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 90;

    function typeEffect() {
        const currentPhrase = typedPhrases[phraseIndex];

        if (isDeleting) {
            typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 45;
        } else {
            typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 90;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingDelay = 2200; // Pause at full phrase
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % typedPhrases.length;
            typingDelay = 400;
        }

        setTimeout(typeEffect, typingDelay);
    }

    setTimeout(typeEffect, 600);
}

// =====================================================
// 5. HERO PARALLAX (Mouse movement on Orb & Code Card)
// =====================================================
const heroSection = document.getElementById('home');
const glowOrb = document.querySelector('.glow-orb');
const rings = document.querySelectorAll('.rotating-ring');
const gridOverlay = document.querySelector('.grid-overlay');
const heroCard = document.querySelector('.visual-card-glass');

if (heroSection && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const moveX = (clientX / innerWidth - 0.5) * 30;
        const moveY = (clientY / innerHeight - 0.5) * 30;

        if (glowOrb) {
            glowOrb.style.transform = `translate(${moveX * 1.5}px, ${moveY * 1.5}px)`;
        }
        if (gridOverlay) {
            gridOverlay.style.transform = `translate(${moveX * 0.4}px, ${moveY * 0.4}px)`;
        }
        if (heroCard) {
            const rotateX = -(clientY / innerHeight - 0.5) * 12;
            const rotateY = (clientX / innerWidth - 0.5) * 12;
            heroCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        }
    });

    heroSection.addEventListener('mouseleave', () => {
        if (glowOrb) glowOrb.style.transform = '';
        if (gridOverlay) gridOverlay.style.transform = '';
        if (heroCard) heroCard.style.transform = '';
    });
}

// =====================================================
// 6. SCROLL REVEAL (Staggered Animations)
// =====================================================
const revealElements = document.querySelectorAll('.scroll-reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// =====================================================
// 7. SKILL PROGRESS BARS ANIMATION
// =====================================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.skill-progress');
            bars.forEach(bar => {
                const targetWidth = bar.style.width || bar.dataset.targetWidth;
                bar.style.width = '0';
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        bar.style.width = targetWidth;
                    });
                });
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-category-card').forEach(card => {
    card.querySelectorAll('.skill-progress').forEach(bar => {
        if (bar.style.width) {
            bar.dataset.targetWidth = bar.style.width;
        }
    });
    skillObserver.observe(card);
});

// =====================================================
// 8. PROJECT CARDS & BUTTON TILT EFFECTS
// =====================================================
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.project-card, .stat-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
            card.style.transform = `translateY(-8px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// =====================================================
// 9. CONTACT FORM HANDLING (FormSubmit API + Mail Fallback)
// =====================================================
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('form-submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameVal = document.getElementById('form-name').value.trim();
        const emailVal = document.getElementById('form-email').value.trim();
        const subjectVal = document.getElementById('form-subject').value.trim();
        const messageVal = document.getElementById('form-message').value.trim();

        if (!nameVal || !emailVal || !subjectVal || !messageVal) {
            showFormStatus('Please fill in all fields.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailVal)) {
            showFormStatus('Please enter a valid email address.', 'error');
            return;
        }

        const fullMessage = `Name: ${nameVal}\nEmail: ${emailVal}\nSubject: ${subjectVal}\n\n${messageVal}`;

        // Disable button & indicate loading
        submitBtn.disabled = true;
        const btnText = submitBtn.querySelector('span');
        if (btnText) btnText.textContent = 'Sending...';

        try {
            const response = await fetch("https://formsubmit.co/ajax/48c2242a475cdd2279f8222f86852249", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: nameVal,
                    email: emailVal,
                    _replyto: emailVal,
                    _subject: `Portfolio Message from ${nameVal}: ${subjectVal}`,
                    message: messageVal,
                    _captcha: "false",
                    _template: "table"
                })
            });

            const data = await response.json();
            submitBtn.disabled = false;
            if (btnText) btnText.textContent = 'Send Message';

            if (response.ok && data.success !== "false") {
                contactForm.reset();
                showFormStatus('Message sent successfully! Check your inbox.', 'success');
            } else {
                openMailClient(fullMessage, subjectVal);
            }
        } catch (err) {
            console.error('FormSubmit API error:', err);
            submitBtn.disabled = false;
            if (btnText) btnText.textContent = 'Send Message';
            openMailClient(fullMessage, subjectVal);
        }
    });
}

function openMailClient(fullMessage, subjectVal) {
    try {
        const mailTo = 'eswarrawsr2006@gmail.com';
        const mailUrl = `mailto:${mailTo}?subject=${encodeURIComponent(subjectVal)}&body=${encodeURIComponent(fullMessage)}`;
        window.location.href = mailUrl;
        showFormStatus('Opening default email application...', 'info');
        if (contactForm) contactForm.reset();
    } catch (err) {
        console.warn('Could not open mail client.', err);
        showFormStatus('Could not open mail client. Please email directly to eswarrawsr2006@gmail.com', 'error');
    }
}

function showFormStatus(message, type) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type;
    setTimeout(() => {
        formStatus.className = 'form-status';
    }, 6000);
}

// =====================================================
// 10. RESUME DOWNLOAD HANDLER
// =====================================================
const resumeLink = document.getElementById('resume-download');
if (resumeLink) {
    resumeLink.addEventListener('click', async (e) => {
        const href = resumeLink.getAttribute('href');
        try {
            const resp = await fetch(href, { method: 'HEAD' });
            if (!resp.ok) {
                e.preventDefault();
                alert('Resume PDF not found.');
            }
        } catch (err) {
            console.warn('Resume check error:', err);
        }
    });
}

console.log('%c Eswar S | Portfolio Enhanced Design v2.0', 'color: #6366f1; font-size: 16px; font-weight: bold;');
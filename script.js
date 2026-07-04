/* =====================================================
   PORTFOLIO JS - ESWAR PRASAD
   ===================================================== */

"use strict";

// =====================================================
// 1. THEME TOGGLE (Dark / Light)
// =====================================================
// -----------------------------------------------------
// EmailJS configuration (client-side). Replace these
// with values from your EmailJS dashboard if you want
// automatic email sending without a server.
// -----------------------------------------------------
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

// Initialize EmailJS if library is loaded and public key is set
if (window.emailjs && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

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

themeToggleBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
});

// =====================================================
// 2. NAVBAR: scroll style + active nav link
// =====================================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateNavbar() {
    if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active link syncing with IntersectionObserver below
}

window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar(); // initial call

// Active nav link on scroll (IntersectionObserver per section)
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

sections.forEach(section => navObserver.observe(section));

// =====================================================
// 3. MOBILE MENU TOGGLE
// =====================================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

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

// =====================================================
// 4. TYPED TEXT EFFECT (Hero subtitle)
// =====================================================
const typedEl = document.getElementById('typed-text');
const typedPhrases = [
    'Scalable Backend Systems',
    'High-Performance APIs',
    
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeEffect() {
    const currentPhrase = typedPhrases[phraseIndex];

    if (isDeleting) {
        typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end of phrase
        typingDelay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % typedPhrases.length;
        typingDelay = 400;
    }

    setTimeout(typeEffect, typingDelay);
}

// Start typing after a short delay
setTimeout(typeEffect, 800);

// =====================================================
// 5. SCROLL REVEAL (fade-in on scroll)
// =====================================================
const revealElements = document.querySelectorAll('.scroll-reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// =====================================================
// 6. SKILL PROGRESS BARS ANIMATION
// =====================================================
const skillProgressBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.skill-progress');
            bars.forEach(bar => {
                const targetWidth = bar.style.width;
                bar.style.width = '0';
                // Use requestAnimationFrame for smooth animation
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
    // Reset all bars to 0 so they animate in
    card.querySelectorAll('.skill-progress').forEach(bar => {
        const originalWidth = bar.style.width;
        bar.dataset.targetWidth = originalWidth;
        bar.style.width = '0';
    });
    skillObserver.observe(card);
});

// =====================================================
// 7. CONTACT FORM HANDLING
// =====================================================
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('form-submit-btn');

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

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
        showFormStatus('Please enter a valid email address.', 'error');
        return;
    }

    // If EmailJS is configured, send automatically using EmailJS
    const fullMessage = `Name: ${nameVal}\nEmail: ${emailVal}\nSubject: ${subjectVal}\n\n${messageVal}`;

    if (EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' && window.emailjs) {
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Sending...';
        const templateParams = {
            from_name: nameVal,
            from_email: emailVal,
            subject: subjectVal,
            message: messageVal,
        };
        try {
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = 'Send Message';
            contactForm.reset();
            showFormStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
        } catch (err) {
            console.error('EmailJS send error:', err);
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = 'Send Message';
            showFormStatus('Failed to send via EmailJS. Opening mail client as fallback.', 'error');
            // fallback to mailto + WhatsApp
            openWhatsAppAndMail(fullMessage, subjectVal);
        }
    } else {
        // EmailJS not configured — fallback to opening mail client and WhatsApp web
        openWhatsAppAndMail(fullMessage, subjectVal);
    }
});

function openWhatsAppAndMail(fullMessage, subjectVal) {
    try {
        const rawPhone = '8122706535';
        const whatsappNumber = rawPhone.replace(/[^0-9]/g, '').length === 10 ? `91${rawPhone}` : rawPhone;
        const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;
        window.open(waUrl, '_blank');

        const mailTo = 'eswarrawsr2006@gmail.com';
        const mailUrl = `mailto:${mailTo}?subject=${encodeURIComponent(subjectVal)}&body=${encodeURIComponent(fullMessage)}`;
        window.open(mailUrl, '_blank');
    } catch (err) {
        console.warn('Could not open external apps for WhatsApp or email.', err);
    }
}

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type;
    setTimeout(() => {
        formStatus.className = 'form-status';
    }, 5000);
}

// =====================================================
// 8. SMOOTH SCROLL POLYFILL FOR OLDER BROWSERS
// =====================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// =====================================================
// 9. PROJECT CARDS — subtle tilt effect on hover
// =====================================================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        card.style.transform = `translateY(-8px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s ease';
        setTimeout(() => { card.style.transition = ''; }, 500);
    });
});

console.log('%c Eswar Prasad | Portfolio v1.0', 'color: #6366f1; font-size: 18px; font-weight: bold;');
console.log('%c Built with HTML, CSS & Vanilla JS', 'color: #a78bfa; font-size: 12px;');

// =====================================================
// 10. RESUME DOWNLOAD: verify file exists, graceful fallback
// =====================================================
const resumeLink = document.getElementById('resume-download');
if (resumeLink) {
    resumeLink.addEventListener('click', async (e) => {
        const href = resumeLink.getAttribute('href');
        // Attempt a HEAD request to ensure the file exists (most servers support it)
        try {
            const resp = await fetch(href, { method: 'HEAD' });
            if (!resp.ok) {
                e.preventDefault();
                alert('Resume not found. Please add assets/resume.pdf to the project.');
            }
            // If ok, the anchor's `download` attribute will handle the download
        } catch (err) {
            // Network or CORS issue — show helpful message and prevent navigation
            e.preventDefault();
            console.warn('Error checking resume file:', err);
            alert('Unable to download resume. If you are developing locally, place your resume at assets/resume.pdf or serve the project with a local server.');
        }
    });
}
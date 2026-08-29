/* =====================================================
   PORTFOLIO 3D FUTURISTIC TECH SCRIPT
   Developer: Eswar S | Java Full Stack Developer
   ===================================================== */

"use strict";

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initGSAPAnimations();
    initTypedText();
    initCard3DTilt();
    initStatCounters();
    initNavbarAndScroll();
    initMobileMenu();
    initContactForm();
});

/* =====================================================
   1. TSPARTICLES BACKGROUND NETWORK ENGINE
   ===================================================== */
function initParticles() {
    if (typeof tsParticles === 'undefined') return;

    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 35 : 75;

    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        fullScreen: { enable: false },
        particles: {
            number: {
                value: particleCount,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ["#38bdf8", "#22d3ee", "#818cf8"]
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.6,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.2,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 140,
                color: "#38bdf8",
                opacity: 0.22,
                width: 1.2
            },
            move: {
                enable: true,
                speed: 1.2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "window",
            events: {
                onhover: {
                    enable: !isMobile,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 180,
                    line_linked: {
                        opacity: 0.6
                    }
                },
                push: {
                    particles_nb: 3
                }
            }
        },
        retina_detect: true
    });
}

/* =====================================================
   2. GSAP SCROLLTRIGGER REVEAL ANIMATIONS
   ===================================================== */
function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Hero content stagger entrance on initial load
    gsap.from('.hero-content > *', {
        duration: 1,
        y: 40,
        opacity: 0,
        stagger: 0.15,
        ease: 'power3.out'
    });

    gsap.from('.hero-card-3d', {
        duration: 1.2,
        scale: 0.85,
        opacity: 0,
        rotationX: 20,
        rotationY: -20,
        ease: 'power3.out',
        delay: 0.3
    });

    // Section Titles
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%'
            },
            y: 35,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // Glass Cards & Grid items (3D Rotate + Fade entrance)
    const cardSelectors = '.glass-card, .skill-tile, .project-card, .timeline-item, .info-pill';
    gsap.utils.toArray(cardSelectors).forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 88%'
            },
            y: 45,
            rotationX: 10,
            opacity: 0,
            duration: 0.85,
            ease: 'power2.out'
        });
    });

    // Skills progress bars animation on scroll
    gsap.utils.toArray('.skill-progress').forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        
        ScrollTrigger.create({
            trigger: bar,
            start: 'top 90%',
            onEnter: () => {
                gsap.to(bar, {
                    width: targetWidth,
                    duration: 1.2,
                    ease: 'power2.out'
                });
            }
        });
    });
}

/* =====================================================
   3. TYPED TEXT EFFECT (HERO SUBTITLE)
   ===================================================== */
function initTypedText() {
    const typedEl = document.getElementById('typed-text');
    if (!typedEl) return;

    const phrases = [
        'Full Stack Developer',
        'Backend Systems Engineer',
        'Spring Boot Specialist',
        'REST API Architect'
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeDelay = 80;

    function type() {
        const current = phrases[phraseIdx];

        if (isDeleting) {
            typedEl.textContent = current.substring(0, charIdx - 1);
            charIdx--;
            typeDelay = 40;
        } else {
            typedEl.textContent = current.substring(0, charIdx + 1);
            charIdx++;
            typeDelay = 90;
        }

        if (!isDeleting && charIdx === current.length) {
            typeDelay = 2200; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            typeDelay = 400;
        }

        setTimeout(type, typeDelay);
    }

    setTimeout(type, 600);
}

/* =====================================================
   4. 3D MOUSE PARALLAX TILT EFFECT FOR CARDS
   ===================================================== */
function initCard3DTilt() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth <= 768) return;

    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
}

/* =====================================================
   5. STAT COUNTERS SCROLL ANIMATION
   ===================================================== */
function initStatCounters() {
    const statElements = document.querySelectorAll('.stat-number');
    if (!statElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'), 10);
                let current = 0;
                const increment = Math.max(1, Math.ceil(target / 40));
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        entry.target.textContent = target;
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = current;
                    }
                }, 30);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statElements.forEach(el => observer.observe(el));
}

/* =====================================================
   6. NAVBAR SCROLL PROGRESS & ACTIVE LINK OBSERVER
   ===================================================== */
function initNavbarAndScroll() {
    const navbar = document.getElementById('navbar');
    const progressBar = document.getElementById('scroll-progress-bar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function onScroll() {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Progress bar width
        if (progressBar && height > 0) {
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        }

        // Navbar blur background toggle
        if (winScroll > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Active Section Link Sync
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: '-40% 0px -40% 0px' });

    sections.forEach(sec => sectionObserver.observe(sec));
}

/* =====================================================
   7. MOBILE HAMBURGER MENU
   ===================================================== */
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!mobileBtn || !navMenu) return;

    mobileBtn.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        mobileBtn.classList.toggle('open', isOpen);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            mobileBtn.classList.remove('open');
        });
    });
}

/* =====================================================
   8. CONTACT FORM SUBMISSION (FormSubmit API + Mailto Fallback)
   ===================================================== */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('form-submit-btn');

    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameVal = document.getElementById('form-name').value.trim();
        const emailVal = document.getElementById('form-email').value.trim();
        const subjectVal = document.getElementById('form-subject').value.trim();
        const messageVal = document.getElementById('form-message').value.trim();

        if (!nameVal || !emailVal || !subjectVal || !messageVal) {
            showFormStatus('Please complete all required fields.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailVal)) {
            showFormStatus('Please enter a valid email address.', 'error');
            return;
        }

        // Disable button while sending
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
                    _captcha: "false"
                })
            });

            const data = await response.json();
            submitBtn.disabled = false;
            if (btnText) btnText.textContent = 'Send Message';

            if (response.ok && data.success !== "false") {
                contactForm.reset();
                showFormStatus('Message sent successfully! Thank you.', 'success');
            } else {
                fallbackMailto(nameVal, emailVal, subjectVal, messageVal);
            }
        } catch (err) {
            console.error('Contact Form error:', err);
            submitBtn.disabled = false;
            if (btnText) btnText.textContent = 'Send Message';
            fallbackMailto(nameVal, emailVal, subjectVal, messageVal);
        }
    });

    function fallbackMailto(name, email, subject, message) {
        const mailTo = 'eswarrawsr2006@gmail.com';
        const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
        const mailUrl = `mailto:${mailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailUrl;
        showFormStatus('Opening default mail client...', 'success');
        contactForm.reset();
    }

    function showFormStatus(message, type) {
        if (!formStatus) return;
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type;
        setTimeout(() => {
            formStatus.className = 'form-status';
        }, 6000);
    }
}
// ============================================
// MrSpace - Premium Space Theme JavaScript
// ============================================

// Initialize GSAP and plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ============================================
// Initialize on DOM Ready
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    initNavigation();
    initMobileMenu();
    initHeroAnimations();
    initScrollAnimations();
    initFormHandlers();
    initUIEffects();
}

// ============================================
// Navigation
// ============================================

function initNavigation() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                gsap.to(window, {
                    duration: 1,
                    scrollTo: { y: target, offsetY: 80 },
                    ease: "power2.inOut"
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.1)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.8)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
}

function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
        });
    }
}

// ============================================
// Hero Animations (Immediate - No Scroll)
// ============================================

function initHeroAnimations() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Timeline for hero entrance
    const tl = gsap.timeline({ delay: 0.2 });

    tl.from('.hero-title .line', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
    })
    .from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.5")
    .from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.4")
    .from('.hero-stats .stat-item', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out"
    }, "-=0.3");

    // Floating astronaut
    const astronaut = document.querySelector('.astronaut-float');
    if (astronaut) {
        gsap.to(astronaut, {
            y: -20,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    // Rotating planets
    gsap.to('.planet-1', { rotation: 360, duration: 20, repeat: -1, ease: "none" });
    gsap.to('.planet-2', { rotation: -360, duration: 15, repeat: -1, ease: "none" });

    // Counter animation
    initCounters();
}

function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (counters.length === 0) return;

    let animated = false;

    ScrollTrigger.create({
        trigger: '.hero-stats',
        start: 'top 90%',
        onEnter: () => {
            if (animated) return;
            animated = true;

            counters.forEach(counter => {
                const target = parseInt(counter.dataset.target);
                gsap.to(counter, {
                    textContent: target,
                    duration: 2,
                    snap: { textContent: 1 },
                    ease: "power1.out"
                });
            });
        }
    });
}

// ============================================
// Scroll Animations - Main Function
// ============================================

function initScrollAnimations() {
    // Set initial states for all animated elements
    setInitialStates();

    // Create scroll-triggered animations
    animateMissionSection();
    animateTechnologySection();
    animateSolutionsSection();
    animateLeadSection();
    animateContactPage();
    animateFAQ();
}

function setInitialStates() {
    // Mission section
    gsap.set('.mission .section-tag, .mission .section-title, .mission .section-subtitle', {
        opacity: 0,
        y: 40
    });
    gsap.set('.mission-card', {
        opacity: 0,
        y: 60
    });

    // Technology section
    gsap.set('.technology .section-tag, .technology .section-title', {
        opacity: 0,
        y: 40
    });
    gsap.set('.tech-ring', {
        opacity: 0,
        scale: 0
    });
    gsap.set('.tech-core', {
        opacity: 0,
        scale: 0
    });
    gsap.set('.tech-item', {
        opacity: 0,
        x: -50
    });

    // Solutions section
    gsap.set('.solutions .section-tag, .solutions .section-title', {
        opacity: 0,
        y: 40
    });
    gsap.set('.solution-card', {
        opacity: 0,
        y: 60
    });

    // Lead section
    gsap.set('.lead-info', {
        opacity: 0,
        x: -50
    });
    gsap.set('.lead-form-container', {
        opacity: 0,
        x: 50
    });

    // Contact page
    if (document.querySelector('.contact-page')) {
        gsap.set('.contact-method', {
            opacity: 0,
            y: 40
        });
        gsap.set('.contact-form-section', {
            opacity: 0,
            y: 40
        });
        gsap.set('.faq-item', {
            opacity: 0,
            y: 30
        });
    }
}

// ============================================
// Section Animations
// ============================================

function animateMissionSection() {
    const section = document.querySelector('.mission');
    if (!section) return;

    // Header animation
    ScrollTrigger.create({
        trigger: '.mission',
        start: 'top 80%',
        onEnter: () => {
            gsap.to('.mission .section-tag', {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out"
            });
            gsap.to('.mission .section-title', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.1,
                ease: "power3.out"
            });
            gsap.to('.mission .section-subtitle', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.2,
                ease: "power3.out"
            });
        },
        once: true
    });

    // Cards animation
    ScrollTrigger.create({
        trigger: '.mission-grid',
        start: 'top 85%',
        onEnter: () => {
            gsap.to('.mission-card', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
            });
        },
        once: true
    });
}

function animateTechnologySection() {
    const section = document.querySelector('.technology');
    if (!section) return;

    // Header
    ScrollTrigger.create({
        trigger: '.technology',
        start: 'top 80%',
        onEnter: () => {
            gsap.to('.technology .section-tag', {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out"
            });
            gsap.to('.technology .section-title', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.1,
                ease: "power3.out"
            });
        },
        once: true
    });

    // Tech visual (rings and core)
    ScrollTrigger.create({
        trigger: '.tech-showcase',
        start: 'top 80%',
        onEnter: () => {
            gsap.to('.tech-ring', {
                opacity: 1,
                scale: 1,
                duration: 1.2,
                stagger: 0.15,
                ease: "elastic.out(1, 0.5)"
            });
            gsap.to('.tech-core', {
                opacity: 1,
                scale: 1,
                duration: 1,
                delay: 0.3,
                ease: "back.out(1.7)"
            });
        },
        once: true
    });

    // Tech items
    ScrollTrigger.create({
        trigger: '.tech-list',
        start: 'top 85%',
        onEnter: () => {
            gsap.to('.tech-item', {
                opacity: 1,
                x: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: "power3.out"
            });
        },
        once: true
    });
}

function animateSolutionsSection() {
    const section = document.querySelector('.solutions');
    if (!section) return;

    // Header
    ScrollTrigger.create({
        trigger: '.solutions',
        start: 'top 80%',
        onEnter: () => {
            gsap.to('.solutions .section-tag', {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out"
            });
            gsap.to('.solutions .section-title', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.1,
                ease: "power3.out"
            });
        },
        once: true
    });

    // Cards
    ScrollTrigger.create({
        trigger: '.solutions-grid',
        start: 'top 85%',
        onEnter: () => {
            gsap.to('.solution-card', {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.08,
                ease: "power3.out"
            });
        },
        once: true
    });

    // Hover effects
    document.querySelectorAll('.solution-card').forEach(card => {
        const icon = card.querySelector('.solution-icon');
        if (!icon) return;

        card.addEventListener('mouseenter', () => {
            gsap.to(icon, { scale: 1.2, rotation: 10, duration: 0.3, ease: "back.out(2)" });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" });
        });
    });
}

function animateLeadSection() {
    const section = document.querySelector('.lead-section');
    if (!section) return;

    ScrollTrigger.create({
        trigger: '.lead-section',
        start: 'top 80%',
        onEnter: () => {
            gsap.to('.lead-info', {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power3.out"
            });
            gsap.to('.lead-form-container', {
                opacity: 1,
                x: 0,
                duration: 0.8,
                delay: 0.15,
                ease: "power3.out"
            });
        },
        once: true
    });
}

function animateContactPage() {
    if (!document.querySelector('.contact-page')) return;

    // Hero animation (immediate)
    gsap.from('.contact-hero h1', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
    });
    gsap.from('.contact-hero p', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out"
    });

    // Contact methods
    ScrollTrigger.create({
        trigger: '.contact-methods',
        start: 'top 85%',
        onEnter: () => {
            gsap.to('.contact-method', {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out"
            });
        },
        once: true
    });

    // Form section
    ScrollTrigger.create({
        trigger: '.contact-form-section',
        start: 'top 85%',
        onEnter: () => {
            gsap.to('.contact-form-section', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        },
        once: true
    });

    // FAQ items
    ScrollTrigger.create({
        trigger: '.faq-section',
        start: 'top 85%',
        onEnter: () => {
            gsap.to('.faq-item', {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: "power3.out"
            });
        },
        once: true
    });
}

function animateFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (!question || !answer) return;

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const ans = faq.querySelector('.faq-answer');
                if (ans) gsap.to(ans, { height: 0, duration: 0.3, ease: "power2.inOut" });
            });

            // Open clicked if not active
            if (!isActive) {
                item.classList.add('active');
                gsap.set(answer, { height: 'auto' });
                const h = answer.offsetHeight;
                gsap.fromTo(answer, { height: 0 }, { height: h, duration: 0.3, ease: "power2.inOut" });
            }
        });
    });
}

// ============================================
// Form Handlers
// ============================================

function initFormHandlers() {
    // Form input focus effects
    document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
        input.addEventListener('focus', function() {
            const label = this.parentElement.querySelector('label');
            if (label) gsap.to(label, { color: '#8b5cf6', duration: 0.3 });
        });

        input.addEventListener('blur', function() {
            const label = this.parentElement.querySelector('label');
            if (label && !this.value) gsap.to(label, { color: '#6b7280', duration: 0.3 });
        });
    });

    // Form submissions
    const leadForm = document.getElementById('leadForm');
    const contactForm = document.getElementById('contactForm');

    if (leadForm) leadForm.addEventListener('submit', handleSubmit);
    if (contactForm) contactForm.addEventListener('submit', handleSubmit);
}

function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    // Log data
    const formData = new FormData(form);
    console.log('Form submitted:', Object.fromEntries(formData));

    // Create success message
    const success = document.createElement('div');
    success.className = 'form-success';
    success.style.display = 'none';
    success.innerHTML = `
        <div class="success-icon">✓</div>
        <h3>Mensagem Enviada!</h3>
        <p>Entraremos em contato em breve.</p>
    `;

    // Animate transition
    gsap.to(form, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        onComplete: () => {
            form.style.display = 'none';
            form.parentElement.appendChild(success);
            success.style.display = 'block';
            gsap.from(success, { opacity: 0, scale: 0.9, duration: 0.5, ease: "back.out(1.7)" });
        }
    });

    form.reset();
}

// ============================================
// UI Effects
// ============================================

function initUIEffects() {
    // Scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #8b5cf6, #a78bfa);
        width: 0%;
        z-index: 9999;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / scrollHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });

    // Button ripple effect
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255,255,255,0.3);
                left: ${e.clientX - rect.left - size/2}px;
                top: ${e.clientY - rect.top - size/2}px;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            gsap.to(ripple, {
                scale: 2,
                opacity: 0,
                duration: 0.6,
                onComplete: () => ripple.remove()
            });
        });
    });

    // Parallax stars
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        document.querySelectorAll('.stars, .stars2, .stars3').forEach((layer, i) => {
            layer.style.transform = `translateY(${scrolled * (i + 1) * 0.15}px)`;
        });
    });

    // Console
    console.log('%c🚀 MrSpace', 'font-size: 24px; font-weight: bold; color: #8b5cf6;');
}

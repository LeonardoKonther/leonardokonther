// ==========================================
// LOADING SCREEN
// ==========================================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 500);
    }
});

// ==========================================
// MENU MOBILE
// ==========================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const nav = document.getElementById('nav');

if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    const navLinks = document.querySelectorAll('#nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// ==========================================
// HEADER BACKGROUND ON SCROLL
// ==========================================
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.8)';
        }
    });
}

// ==========================================
// ACTIVE NAV LINK ON SCROLL
// ==========================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('#nav a');
const navLinksArray = Array.from(navLinks);

if (sections.length > 0 && navLinksArray.length > 0) {
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ==========================================
// SCROLL INDICATOR
// ==========================================
const scrollIndicator = document.querySelector('.scroll-down');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const purposeSection = document.getElementById('purpose');
        if (purposeSection) {
            purposeSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Suporte para teclado
    scrollIndicator.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const purposeSection = document.getElementById('purpose');
            if (purposeSection) {
                purposeSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// ==========================================
// TYPING EFFECT
// ==========================================
const typedTextSpan = document.querySelector('.typed-text');
if (typedTextSpan) {
    const textArray = ['Direção criativa', 'Branding com pé no chão', 'Marcas com propósito'];    
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            typedTextSpan.innerHTML = '&nbsp;';
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Start typing effect
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            typedTextSpan.innerHTML = '&nbsp;';
            setTimeout(type, newTextDelay + 250);
        });
    } else {
        typedTextSpan.innerHTML = '&nbsp;';
        setTimeout(type, newTextDelay + 250);
    }
}

// ==========================================
// MODAIS
// ==========================================
const modalButtons = document.querySelectorAll('[data-modal]');
modalButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

const closeButtons = document.querySelectorAll('.modal-close');
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

const modalOverlays = document.querySelectorAll('.modal-overlay');
modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
        const modal = overlay.closest('.modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

const modalContactButtons = document.querySelectorAll('.btn-modal');
modalContactButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ==========================================
// ANIMAÇÕES PROFISSIONAIS
// ==========================================

// Observer Options
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// 1. STAGGER ANIMATION - Cards aparecem em sequência
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            staggerObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar aos cards de serviço
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.setProperty('--animation-order', index);
    staggerObserver.observe(card);
});

// Aplicar aos cards de projeto
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.setProperty('--animation-order', index);
    staggerObserver.observe(card);
});

// 2. ANIMAÇÃO DA SEÇÃO PURPOSE
const purposeSection = document.querySelector('.purpose');
if (purposeSection) {
    const purposeContent = document.querySelector('.purpose-content');
    
    if (purposeContent) {
        purposeContent.style.opacity = '0';
        purposeContent.style.transform = 'translateY(40px)';
        
        const purposeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = 'opacity 1s ease, transform 1s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    purposeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px'
        });
        
        purposeObserver.observe(purposeContent);
    }
}

// 3. ANIMAÇÃO DO CARD ÚNICO "COMO TRABALHAMOS"
const howSingleCard = document.querySelector('.how-single-card');
if (howSingleCard) {
    howSingleCard.style.opacity = '0';
    howSingleCard.style.transform = 'translateY(30px)';
    
    const howObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                howObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    howObserver.observe(howSingleCard);
}

// 4. PARALLAX NO HERO (apenas desktop)
const isDesktop = window.innerWidth > 968;

if (isDesktop) {
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    
                    if (scrolled < window.innerHeight) {
                        heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
}

// 5. RIPPLE EFFECT nos botões
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }

    button.appendChild(ripple);
}

const rippleButtons = document.querySelectorAll('.btn, .btn-service, .btn-modal');
rippleButtons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// 6. FADE IN nas seções ao scroll
const fadeElements = document.querySelectorAll('.about, .services, .projects, .contact-new');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-view');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => fadeObserver.observe(el));

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
    // Mostrar/ocultar botão baseado no scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Scroll suave ao clicar
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// SMOOTH SCROLL PARA LINKS INTERNOS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Não aplicar em links que abrem modais
        if (this.hasAttribute('data-modal')) {
            return;
        }
        
        // Não aplicar no botão de voltar ao topo (já tem handler próprio)
        if (this.closest('#back-to-top')) {
            return;
        }
        
        if (href !== '#' && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==========================================
// PERFORMANCE: INTERSECTION OBSERVER CLEANUP
// ==========================================
window.addEventListener('beforeunload', () => {
    if (staggerObserver) staggerObserver.disconnect();
    if (fadeObserver) fadeObserver.disconnect();
});

// ==========================================
// MOBILE: PREVENT ZOOM ON DOUBLE TAP (iOS)
// ==========================================
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// ==========================================
// ACCESSIBILITY: FOCUS VISIBLE
// ==========================================
// Adiciona classe quando usuário usa teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// ==========================================
// CONSOLE MESSAGE (Easter Egg)
// ==========================================
console.log('%c👋 Olá, curioso(a)!', 'font-size: 20px; font-weight: bold; color: #1a1a1a;');
console.log('%cSe você está vendo isso, provavelmente entende de código. Vamos conversar! 🚀', 'font-size: 14px; color: #666;');
console.log('%cContato: leonardo@konther.com', 'font-size: 14px; color: #1a1a1a; font-weight: bold;');
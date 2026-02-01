// Menu burger mobile
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Fermer le menu quand on clique sur un lien
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Fermer le menu si on clique en dehors
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target) && navMenu.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth scroll pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ne pas bloquer le comportement par défaut pour #
        if (href === '#') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation au scroll avec stagger effect
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer tous les éléments qui doivent s'animer
document.addEventListener('DOMContentLoaded', () => {
    // Animation pour les cartes de service
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Animation pour les projets
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s`;
        observer.observe(el);
    });
    
    // Animation pour les stats du hero
    const stats = document.querySelectorAll('.stat');
    stats.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'scale(0.8)';
        el.style.transition = `opacity 0.5s ease ${0.5 + index * 0.1}s, transform 0.5s ease ${0.5 + index * 0.1}s`;
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'scale(1)';
        }, 100);
    });
    
    // Animation pour les info-items du contact
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Animation automatique des bulles de chat
    const animateChatBubbles = () => {
        const chatBubbles = document.querySelectorAll('.chat-bubble');
        chatBubbles.forEach((bubble, index) => {
            setTimeout(() => {
                bubble.style.opacity = '0';
                bubble.style.transform = bubble.classList.contains('received') ? 'translateX(-20px)' : 'translateX(20px)';
                
                setTimeout(() => {
                    bubble.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    bubble.style.opacity = '1';
                    bubble.style.transform = 'translateX(0)';
                }, 50);
            }, index * 1500);
        });
        
        // Répéter l'animation toutes les 12 secondes
        setTimeout(animateChatBubbles, chatBubbles.length * 1500 + 3000);
    };
    
    // Observer pour démarrer l'animation quand la section est visible
    const demoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                setTimeout(animateChatBubbles, 1000);
            }
        });
    }, { threshold: 0.3 });
    
    const phoneScreen = document.querySelector('.phone-screen');
    if (phoneScreen) {
        demoObserver.observe(phoneScreen);
    }
});

// Navbar background au scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        navbar.style.backgroundColor = 'var(--bg-white)';
    }
});

// Animation pour les chiffres qui comptent
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// Observer pour déclencher l'animation des compteurs
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const resultNumbers = entry.target.querySelectorAll('.result-number');
            resultNumbers.forEach(num => {
                const text = num.textContent;
                if (text.includes('%')) {
                    const value = parseInt(text);
                    num.textContent = '0%';
                    let current = 0;
                    const timer = setInterval(() => {
                        current += 1;
                        num.textContent = current + '%';
                        if (current >= value) clearInterval(timer);
                    }, 20);
                }
            });
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-results').forEach(el => {
        statsObserver.observe(el);
    });
});


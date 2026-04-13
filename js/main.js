document.addEventListener('DOMContentLoaded', () => {
    // Initial GSAP setup
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animations
    // Floating Status Badge Fade In (only if exists)
    const statusBadge = document.querySelector('.status-badge');
    if (statusBadge) {
        gsap.to(statusBadge, {
            opacity: 1,
            duration: 1,
            delay: 1
        });
    }

    // Hero Animations (only if on index.html)
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        gsap.from('.hero-img', { scale: 1.1, duration: 2, ease: 'power2.out' });
        gsap.from('.hero-tag', { y: 20, opacity: 0, duration: 0.8, delay: 0.3 });
        gsap.from(heroTitle, { y: 30, opacity: 0, duration: 0.8, delay: 0.5 });
        gsap.from('.hero p', { y: 20, opacity: 0, duration: 0.8, delay: 0.7 });
        gsap.from('.hero-btns', { y: 20, opacity: 0, duration: 0.8, delay: 0.9, stagger: 0.1 });
    }

    // Section Headers Animation
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 95%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // Service Cards Staggered Animation
    const cards = document.querySelectorAll('.service-card');
    if (cards.length > 0) {
        gsap.from(cards, {
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 98%',
                toggleActions: 'play none none none'
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            clearProps: 'opacity,transform' // Mantém os estilos inline originais (como cores customizadas)
        });
    }

    // Refresh ScrollTrigger after all content is loaded
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });

    // Mobile Menu Logic
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('nav');
    const body = document.body;

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            body.classList.toggle('no-scroll');
            
            // Toggle Icon
            const icon = menuToggle.querySelector('span');
            if (nav.classList.contains('nav-active')) {
                icon.textContent = 'close';
                gsap.from(nav.querySelectorAll('li'), {
                    x: -20,
                    opacity: 0,
                    duration: 0.4,
                    stagger: 0.05,
                    ease: 'power2.out'
                });
            } else {
                icon.textContent = 'menu';
            }
        });

        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-active');
                body.classList.remove('no-scroll');
                menuToggle.querySelector('span').textContent = 'menu';
            });
        });
    }

    // Header Color Change on Scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'white';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.9)';
            header.style.boxShadow = 'none';
        }
    });
});

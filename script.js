document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initParticlesEngine();
    initTypingSimulation();
    initScrollFramework();
    initSkillObserver();
    initCounterEngine();
    initMouseGlow();
    initRippleTriggers();
    
    AOS.init({
        duration: 900,
        once: true,
        offset: 50
    });
});

function initPreloader() {
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
            }, 400);
        });
    }
}

function initParticlesEngine() {
    if (document.getElementById('particles-js') && typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00d2ff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.2, "random": true },
                "size": { "value": 2, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#0066ff", "opacity": 0.1, "width": 1 },
                "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
            },
            "interactivity": {
                "detect_on": "window",
                "events": { "onhover": { "enable": true, "mode": "bubble" }, "resize": true },
                "modes": { "bubble": { "distance": 200, "size": 3, "duration": 2, "opacity": 0.4 } }
            },
            "retina_detect": true
        });
    }
}

function initTypingSimulation() {
    if (document.getElementById('typed-text') && typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: ['Full Stack Developer', 'Web Developer', 'CSE Student', 'Programmer'],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            loop: true
        });
    }
}

function initScrollFramework() {
    const header = document.querySelector('.navbar');
    const backToTop = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                if (hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                window.scrollTo({ top: targetSection.offsetTop - 75, behavior: 'smooth' });
            }
        });
    });

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');

        if (scrollPosition > 600) backToTop.classList.add('show');
        else backToTop.classList.remove('show');

        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + section.offsetHeight) {
                currentSectionId = '#' + section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentSectionId) link.classList.add('active');
            else link.classList.remove('active');
        });
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function initSkillObserver() {
    const progressBars = document.querySelectorAll('.progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('data-width');
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    progressBars.forEach(bar => skillObserver.observe(bar));
}

function initCounterEngine() {
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'), 10);
                let current = 0;
                const increment = target / 30;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        setTimeout(updateCounter, 30);
                    } else {
                        counter.innerText = target + "+";
                    }
                };
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.3 });
    counters.forEach(counter => counterObserver.observe(counter));
}

function initMouseGlow() {
    const glow = document.getElementById('cursor-glow');
    if (glow && window.innerWidth > 1024) {
        window.addEventListener('mousemove', (e) => {
            glow.style.left = `${e.clientX}px`;
            glow.style.top = `${e.clientY}px`;
        });
    } else if (glow) {
        glow.style.display = 'none';
    }
}

function initRippleTriggers() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('disabled-demo')) return;
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            this.appendChild(ripple);
            setTimeout(() => { ripple.remove(); }, 600);
        });
    });

    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for reaching out! Your message has been sent.');
            form.reset();
        });
    }
}
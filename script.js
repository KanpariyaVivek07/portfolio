document.addEventListener('DOMContentLoaded', () => {

    // AOS Init
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80
    });

    // Preloader
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('preloader').classList.add('hidden');
        }, 1800);
    });

    // Nav scroll
    const nav = document.getElementById('nav');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
        backToTop.classList.toggle('visible', window.scrollY > 400);
    });

    // Mobile menu
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active nav
    const sections = document.querySelectorAll('.section, .hero');
    const navItems = navLinks.querySelectorAll('a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) current = section.getAttribute('id');
        });
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) item.classList.add('active');
        });
    });

    // Typewriter
    const typewriterEl = document.getElementById('typewriter');
    const texts = [
        'Full Stack Developer',
        'M.Sc. CS & IT Student',
        'Web Developer',
        'React Developer',
        'Problem Solver'
    ];
    let textIdx = 0, charIdx = 0, isDeleting = false;

    function type() {
        const text = texts[textIdx];
        typewriterEl.textContent = isDeleting
            ? text.substring(0, charIdx - 1)
            : text.substring(0, charIdx + 1);
        charIdx += isDeleting ? -1 : 1;

        let speed = isDeleting ? 50 : 100;
        if (!isDeleting && charIdx === text.length) { speed = 2000; isDeleting = true; }
        else if (isDeleting && charIdx === 0) { isDeleting = false; textIdx = (textIdx + 1) % texts.length; speed = 500; }

        setTimeout(type, speed);
    }
    type();

    // Skill bars
    const skillFills = document.querySelectorAll('.skill-fill');
    const skillsObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.dataset.width + '%';
                skillsObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    skillFills.forEach(el => skillsObs.observe(el));

    // Stat counter
    const statNums = document.querySelectorAll('.stat-num');
    const statsObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = +el.dataset.count;
                const increment = target / 30;
                let count = 0;
                const update = () => {
                    count += increment;
                    if (count < target) { el.textContent = Math.ceil(count); requestAnimationFrame(update); }
                    else el.textContent = target;
                };
                update();
                statsObs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    statNums.forEach(el => statsObs.observe(el));

    // Contact form
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('button');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<span>Sent!</span> <i class="fas fa-check"></i>';
            btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
            toast.classList.add('show');

            setTimeout(() => {
                btn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
                btn.style.background = '';
                btn.disabled = false;
                form.reset();
                toast.classList.remove('show');
            }, 2500);
        }, 1200);
    });

    // Background particles
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (mouse.x !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    this.x -= dx * 0.005;
                    this.y -= dy * 0.005;
                }
            }

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticles() {
        const count = Math.min(60, Math.floor(canvas.width * canvas.height / 20000));
        particles = [];
        for (let i = 0; i < count; i++) particles.push(new Particle());
    }
    initParticles();

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 160) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - dist / 160)})`;
                    ctx.lineWidth = 0.8;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // 3D tilt on cards
    document.querySelectorAll('.glass-3d').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            const scale = 1.03;
            const translateZ = 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`;
            card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 40px rgba(99, 102, 241, 0.2)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });

    // Magnetic effect on buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.03)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // Parallax on hero
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');

    document.addEventListener('mousemove', e => {
        if (window.innerWidth > 900) {
            const moveX = (e.clientX - window.innerWidth / 2) / 50;
            const moveY = (e.clientY - window.innerHeight / 2) / 50;
            if (heroContent) {
                heroContent.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
            }
            if (heroVisual) {
                heroVisual.style.transform = `translate(${-moveX * 0.8}px, ${-moveY * 0.8}px)`;
            }
        }
    });

    // Smooth reveal on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-3d, .hero-content, .footer').forEach(el => {
        el.classList.add('reveal-on-scroll');
        revealObserver.observe(el);
    });

    // Tilt effect on skill icons
    document.querySelectorAll('.skill-icon-wrap').forEach(icon => {
        icon.addEventListener('mousemove', e => {
            const rect = icon.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            icon.style.transform = `rotateY(${x * 0.3}deg) rotateX(${-y * 0.3}deg) scale(1.15)`;
        });
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = '';
        });
    });

    // Smooth hover on social icons
    document.querySelectorAll('.social-3d, .footer-socials a, .about-socials a, .contact-socials a').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateY(-5px) scale(1.15) rotateZ(5deg)';
        });
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = '';
        });
    });

    // Smooth scroll with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dynamic gradient on cursor
    let gradientAngle = 0;
    const updateGradient = () => {
        gradientAngle += 0.5;
        document.documentElement.style.setProperty('--cursor-gradient', `linear-gradient(${gradientAngle}deg, #6366f1, #ec4899)`);
        requestAnimationFrame(updateGradient);
    };
    updateGradient();

});

document.addEventListener('DOMContentLoaded', () => {

    // Loader
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('loader').classList.add('hidden');
        }, 1200);
    });

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    // Mobile Nav
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        backToTop.classList.toggle('visible', window.scrollY > 400);
    });

    // Active nav link
    const sections = document.querySelectorAll('.section');
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

    // Typing Effect
    const typingEl = document.getElementById('typingText');
    const texts = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
    let textIdx = 0, charIdx = 0, isDeleting = false;

    function type() {
        const text = texts[textIdx];
        typingEl.textContent = isDeleting ? text.substring(0, charIdx - 1) : text.substring(0, charIdx + 1);
        charIdx += isDeleting ? -1 : 1;

        let speed = isDeleting ? 40 : 100;
        if (!isDeleting && charIdx === text.length) { speed = 2000; isDeleting = true; }
        else if (isDeleting && charIdx === 0) { isDeleting = false; textIdx = (textIdx + 1) % texts.length; speed = 500; }

        setTimeout(type, speed);
    }
    type();

    // Stats counter
    const statNums = document.querySelectorAll('.stat-num');
    const statsObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = +el.dataset.target;
                const increment = target / 40;
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

    // Filter projects
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const showMoreBtn = document.getElementById('showMoreBtn');
    let showingAll = false;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                const match = filter === 'all' || card.dataset.category === filter;
                if (match && !card.classList.contains('hidden')) {
                    card.style.display = '';
                } else if (!match) {
                    card.style.display = 'none';
                }
            });

            // If "all" and not showing all, hide extras
            if (filter === 'all' && !showingAll) {
                projectCards.forEach((card, i) => {
                    if (i >= 6) { card.style.display = 'none'; card.classList.add('hidden'); }
                });
            }
        });
    });

    // Show more
    showMoreBtn.addEventListener('click', () => {
        showingAll = !showingAll;
        projectCards.forEach(card => {
            if (showingAll) {
                card.classList.remove('hidden');
                card.style.display = '';
            } else {
                // Reset filter to show first 6
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        });

        // Show first 6 if not showing all
        if (!showingAll) {
            projectCards.forEach((card, i) => {
                if (i < 6) { card.classList.remove('hidden'); card.style.display = ''; }
            });
            filterBtns.forEach(b => b.classList.remove('active'));
            filterBtns[0].classList.add('active');
        }

        showMoreBtn.innerHTML = showingAll
            ? 'Show Less <i class="fas fa-chevron-up"></i>'
            : 'Show More <i class="fas fa-chevron-down"></i>';
    });

    // Reveal on scroll
    const reveals = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .contact-grid > *');
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });
    reveals.forEach(el => { el.classList.add('reveal'); revealObs.observe(el); });

    // Contact form
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('button');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = 'Sent! <i class="fas fa-check"></i>';
            btn.style.background = 'linear-gradient(135deg, #10b981, #38bdf8)';
            toast.classList.add('show');

            setTimeout(() => {
                btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
                btn.style.background = '';
                btn.disabled = false;
                form.reset();
                toast.classList.remove('show');
            }, 2500);
        }, 1200);
    });

    // Hero Canvas - Particles
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.color = Math.random() > 0.5 ? 'rgba(124,106,239,' : 'rgba(244,114,182,';
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color + '0.6)';
            ctx.fill();
        }
    }

    function initParticles() {
        const count = Math.min(80, Math.floor(canvas.width * canvas.height / 15000));
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
                if (dist < 140) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(124,106,239,${0.15 * (1 - dist / 140)})`;
                    ctx.lineWidth = 0.5;
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

    // Avatar eye follow mouse
    document.addEventListener('mousemove', e => {
        document.querySelectorAll('.avatar-svg circle[cx]').forEach(eye => {
            const rect = eye.getBoundingClientRect();
            if (rect.width === 0) return;
        });
    });

});

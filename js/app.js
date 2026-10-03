document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Custom Cursor ---
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    const interactables = document.querySelectorAll('a, button, .magnetic, .project-card, .modal-close');

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    // Check if device supports hover (not touch)
    if (window.matchMedia("(hover: hover)").matches) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Cursor strictly follows mouse
            gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0, ease: "none" });
        });

        // Smooth follow for the follower circle
        gsap.ticker.add(() => {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            gsap.set(follower, { x: followerX, y: followerY });
        });

        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    // --- 2. Magnetic Buttons ---
    const magnetics = document.querySelectorAll('.magnetic');
    
    magnetics.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.2, // Reduced strength for more premium feel
                y: y * 0.2,
                duration: 0.6,
                ease: "power3.out" // Smoother ease instead of bouncy
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "power3.out" // No elastic bounce, just smooth return
            });
        });
    });

    // --- 3. Hero Canvas Grid (Interactive) ---
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let dots = [];
    const spacing = 45;
    let canvasMouseX = -1000;
    let canvasMouseY = -1000;

    function initCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        dots = [];
        
        for (let x = 0; x < width; x += spacing) {
            for (let y = 0; y < height; y += spacing) {
                dots.push({
                    x: x,
                    y: y,
                    baseX: x,
                    baseY: y
                });
            }
        }
    }

    window.addEventListener('resize', initCanvas);
    initCanvas();

    window.addEventListener('mousemove', (e) => {
        canvasMouseX = e.clientX;
        canvasMouseY = e.clientY;
    });

    function drawGrid() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        
        for (let i = 0; i < dots.length; i++) {
            let dot = dots[i];
            
            // Calculate distance from mouse
            let dx = canvasMouseX - dot.baseX;
            let dy = canvasMouseY - dot.baseY;
            let dist = Math.sqrt(dx * dx + dy * dy);
            
            let targetX = dot.baseX;
            let targetY = dot.baseY;
            let size = 1.2;
            let opacity = 0.08;

            // Magnetic effect pushing dots away slightly
            if (dist < 180) {
                let force = (180 - dist) / 180;
                targetX = dot.baseX - (dx * force * 0.06);
                targetY = dot.baseY - (dy * force * 0.06);
                
                // Highlight color near mouse
                ctx.fillStyle = `rgba(0, 217, 255, ${opacity + force * 0.3})`;
                size = 1.2 + (force * 1.2);
            } else {
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            }

            // Lerp position (slower lerp for smoother organic feel)
            dot.x += (targetX - dot.x) * 0.05;
            dot.y += (targetY - dot.y) * 0.05;

            ctx.beginPath();
            ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        requestAnimationFrame(drawGrid);
    }
    drawGrid();

    // --- 4. GSAP Animations ---
    gsap.registerPlugin(ScrollTrigger);

    // Hero Loader Animation
    const tlHero = gsap.timeline();
    
    tlHero.to(".hero-avatar", { opacity: 1, duration: 1.5, ease: "power3.out" }, 0.2)
          .fromTo(".rh-path", 
              { strokeDasharray: 400, strokeDashoffset: 400 },
              { strokeDashoffset: 0, duration: 2.5, ease: "expo.inOut" }, 0.2)
          .to(".hero-title .stagger-text", { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "expo.out" }, 0.7)
          .to(".hero-subtitle.stagger-text", { opacity: 1, y: 0, duration: 1.2, ease: "expo.out" }, 1.1)
          .to(".hero-cta", { opacity: 1, y: 0, duration: 1.2, ease: "expo.out" }, 1.3)
          .to(".scroll-indicator", { opacity: 1, duration: 1.5 }, 1.8);

    // Scroll Reveals
    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach((el) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%", // Trigger when top of element hits 85% of viewport
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "expo.out"
        });
    });

    // Animated Counters
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        
        ScrollTrigger.create({
            trigger: counter,
            start: "top 90%",
            onEnter: () => {
                gsap.to(counter, {
                    innerHTML: target,
                    duration: 2,
                    snap: { innerHTML: 1 },
                    ease: "power2.out"
                });
            },
            once: true
        });
    });

    // Skill Bars Animation
    const skillBars = document.querySelectorAll('.progress-bar');
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        
        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar.parentElement,
                start: "top 85%",
            },
            width: targetWidth,
            duration: 1.5,
            ease: "power3.out"
        });
    });

    // Timeline Progress Animation
    const timelineLine = document.querySelector('.timeline-progress');
    if(timelineLine) {
        gsap.to(timelineLine, {
            scrollTrigger: {
                trigger: ".timeline-container",
                start: "top 60%",
                end: "bottom 70%",
                scrub: 1 // Link to scroll position
            },
            height: "100%",
            ease: "none"
        });
    }

    // --- 5. Navbar state on scroll ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 6. Mobile Menu ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    mobileBtn.addEventListener('click', () => {
        mobileBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            mobileBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
});

// --- 7. Modal Functions (Global Scope for inline onclick) ---
function openModal(id) {
    const modal = document.getElementById(id);
    if(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Close on ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            closeModal(activeModal.id);
        }
    }
});

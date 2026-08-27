document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Background Particle System Canvas ---
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = Array.from({ length: 45 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.5 + 0.2
    }));

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(32, 179, 136, ${p.alpha})`;
            ctx.fill();
        });

        requestAnimationFrame(animateParticles);
    }
    animateParticles();


    // --- 2. Responsive Mobile Navbar ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });


    // --- 3. Scroll Reveal Observer ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));


    // --- 4. Project Category Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    // --- 5. YouTube Modal Handler with Specific Embed URLs ---
    const videoModal = document.getElementById('videoModal');
    const iframeWrapper = document.getElementById('iframeWrapper');
    const modalClose = document.getElementById('modalClose');
    const openVideoBtns = document.querySelectorAll('.open-video');

    // Mapping exact embed URLs provided with official YouTube share tokens (`?si=...`)
    const videoEmbedUrls = {
        'Nw7v31gbgWg': 'https://www.youtube.com/embed/Nw7v31gbgWg?si=LaWKjC94mihCStUL&autoplay=1',
        'MfmbqvdWRjQ': 'https://www.youtube.com/embed/MfmbqvdWRjQ?si=IYA96XKTpDWSGmJV&autoplay=1',
        'MEn995NNSSM': 'https://www.youtube.com/embed/MEn995NNSSM?si=W28QQRgqQzj87C4y&autoplay=1'
    };

    openVideoBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const videoId = btn.getAttribute('data-video-id');

            // Reset container state
            iframeWrapper.innerHTML = '';

            const embedSrc = videoEmbedUrls[videoId] || `https://www.youtube.com/embed/${videoId}?autoplay=1`;

            // Build iframe matching YouTube share standards to resolve Error 153
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', embedSrc);
            iframe.setAttribute('title', 'YouTube video player');
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
            iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
            iframe.setAttribute('allowfullscreen', 'true');

            iframeWrapper.appendChild(iframe);
            videoModal.classList.add('active');
        });
    });

    function closeModal() {
        videoModal.classList.remove('active');
        iframeWrapper.innerHTML = ''; // Safely destroy iframe instance
    }

    modalClose.addEventListener('click', closeModal);

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeModal();
        }
    });
});

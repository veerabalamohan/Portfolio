(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Hero typewriter: types the heading out like a keyboard ---------- */
    const title = document.getElementById('hero-title');
    if (title) {
        const text = title.dataset.text || title.textContent.trim();

        if (reduceMotion) {
            title.textContent = text;
        } else {
            title.setAttribute('aria-label', text);
            title.innerHTML = '<span class="typed" aria-hidden="true"></span>' +
                              '<span class="caret" aria-hidden="true"></span>' +
                              '<span class="pending" aria-hidden="true"></span>';
            const typed = title.querySelector('.typed');
            const pending = title.querySelector('.pending');
            pending.textContent = text;

            // Typing rhythm: a slightly uneven keystroke speed, with small
            // pauses after punctuation and between words, like a person typing.
            const START_DELAY = 700;
            const stamps = [];            // time (ms from start) at which each character appears
            let t = 0;
            for (let i = 0; i < text.length; i++) {
                t += 45 + Math.random() * 45;
                const prev = text[i - 1];
                if (prev === '!' || prev === ',') t += 260;
                else if (prev === '.') t += 140;
                else if (prev === ' ') t += 30;
                stamps.push(t);
            }
            const totalTime = t;
            const startTime = performance.now() + START_DELAY;
            let finished = false;

            const finish = () => {
                if (finished) return;
                finished = true;
                typed.textContent = text;
                pending.textContent = '';
            };

            // Progress follows the clock, so a throttled or background tab
            // catches up instead of stalling part-way.
            let shown = 0;
            const tick = () => {
                if (finished) return;
                if (document.hidden) return finish();
                const elapsed = performance.now() - startTime;
                let n = shown;
                while (n < text.length && stamps[n] <= elapsed) n++;
                if (n !== shown) {
                    shown = n;
                    typed.textContent = text.slice(0, n);
                    pending.textContent = text.slice(n);
                }
                if (shown >= text.length) return finish();
                setTimeout(tick, 30);
            };

            setTimeout(tick, START_DELAY);
            document.addEventListener('visibilitychange', () => { if (document.hidden) finish(); });
            // Safety net: whatever happens, the full text ends up on screen.
            setTimeout(finish, START_DELAY + totalTime + 1500);
        }
    }

    /* ---------- Scroll reveal with staggered siblings ---------- */
    const revealEls = [...document.querySelectorAll('.reveal')];
    const siblingCount = new Map();
    revealEls.forEach(el => {
        const index = siblingCount.get(el.parentElement) || 0;
        siblingCount.set(el.parentElement, index + 1);
        el.style.setProperty('--delay', `${Math.min(index, 5) * 0.09}s`);
    });

    if ('IntersectionObserver' in window && !reduceMotion) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
        revealEls.forEach(el => observer.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('is-visible'));
    }

    /* ---------- Card spotlight follows the cursor ---------- */
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('pointermove', e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
            card.style.setProperty('--my', `${e.clientY - rect.top}px`);
        });
    });

    /* ---------- Scroll progress, header state, active nav, back to top ---------- */
    const header = document.querySelector('.site-header');
    const backToTop = document.getElementById('back-to-top');
    const navLinks = [...document.querySelectorAll('.nav-link')];
    const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
    let ticking = false;

    function update() {
        const y = window.scrollY;
        const max = root.scrollHeight - window.innerHeight;
        root.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : 0);

        header.classList.toggle('scrolled', y > 10);
        backToTop.classList.toggle('show', y > 500);

        let current = -1;
        sections.forEach((section, i) => {
            if (section && section.getBoundingClientRect().top <= 140) current = i;
        });
        if (max > 0 && y >= max - 4) current = sections.length - 1;
        navLinks.forEach((link, i) => link.classList.toggle('active', i === current));

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
})();
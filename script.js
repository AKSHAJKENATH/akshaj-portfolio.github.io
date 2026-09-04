document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Theme Toggle Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    
    // Check local storage for theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    });


    // --- 2. Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // --- 3. Intersection Observer for Fade Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // If it's the stats section, trigger counter animation
                if (entry.target.querySelector('.stat-number')) {
                    startCounters(entry.target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        fadeObserver.observe(el);
    });


    // --- 4. Number Counting Animation ---
    let countersStarted = false;
    function startCounters(container) {
        if (countersStarted) return;
        countersStarted = true;
        
        const counters = container.querySelectorAll('.stat-number');
        const speed = 200; // The lower the slower
        
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target + (target > 5 ? '+' : '');
                }
            };
            updateCount();
        });
    }

    // --- 5. Basic Contact Form Validation ---
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real app, send data to backend here.
            alert('Thank you! Your message has been sent.');
            form.reset();
        });
    }

});

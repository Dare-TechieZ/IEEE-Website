document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Splash Screen Logic
    setTimeout(() => {
        const splashScreen = document.getElementById('splash-screen');
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 500); 
    }, 2000);

    // 2. Stats Counter Animation (Intersection Observer)
    const counters = document.querySelectorAll('.stat-item h3');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        });
    };

    // Trigger animation when stats section is in view
    let statsSection = document.querySelector('.stats');
    if (statsSection) {
        let observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting){
                animateCounters();
                observer.disconnect(); // Run only once
            }
        });
        observer.observe(statsSection);
    }

    // 3. Form Submission Handling (Preserved from original)
    const handleForm = (id, message) => {
        const form = document.getElementById(id);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert(message);
                form.reset();
            });
        }
    };

    handleForm('recruitmentForm', 'Application Submitted Successfully! Welcome to the process.');
    handleForm('feedbackForm', 'Thank you for your feedback!');
    handleForm('loginForm', 'Login Successful! Welcome back Member.');

    // 4. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
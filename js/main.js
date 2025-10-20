// --- MODULE: UIController for all visual/navigation interactions ---
const UIController = (function() {
    const header = document.querySelector('.main-header');
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');

    const initHeaderScroll = () => {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            // Add or remove a class (currently not used in CSS but good for future styling)
            if (scrollTop > 80) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    };

    const initMobileMenu = () => {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });

        // Close menu on link click (improves mobile UX)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
            });
        });
    };

    return {
        init: () => {
            // Initialize AOS library with professional settings
            AOS.init({
                duration: 1000,
                once: true,
                offset: 50
            });
            initHeaderScroll();
            initMobileMenu();
        }
    };
})();

// --- MODULE: FormController for all data/form handling ---
const FormController = (function() {
    const contactForm = document.querySelector('.contact-form');

    const handleSubmit = (e) => {
        e.preventDefault();
        const button = contactForm.querySelector('button[type="submit"]');
        const originalText = button.textContent;

        button.textContent = 'Processing...';
        button.disabled = true;

        // Simulate API call delay (Replace with actual fetch() in production)
        setTimeout(() => {
            console.log('Form data sent successfully.');
            alert('Thank you! Your project brief has been received. We will be in touch shortly to discuss your digital future.');
            contactForm.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    };

    return {
        init: () => {
            if (contactForm) {
                contactForm.addEventListener('submit', handleSubmit);
            }
        }
    };
})();

// --- APP INITIALIZER: Entry point for the entire application ---
document.addEventListener('DOMContentLoaded', () => {
    UIController.init();
    FormController.init();
});
document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header on Scroll
    const header = document.getElementById('main-header');
    const heroSection = document.getElementById('hero');
    const headerHeight = header.offsetHeight; // Get initial header height

    // Use Intersection Observer for a more robust sticky header
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If hero section is visible (or fully visible based on threshold), remove scrolled class
                header.classList.remove('scrolled');
            } else {
                // If hero section is no longer visible, add scrolled class
                header.classList.add('scrolled');
            }
        });
    }, {
        rootMargin: `-${headerHeight}px 0px 0px 0px`, // Trigger when hero top passes header
        threshold: 0 // As soon as any part of hero leaves the top
    });

    if (heroSection) {
        heroObserver.observe(heroSection);
    }


    // 2. Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav .nav-list');
    const navLinks = document.querySelectorAll('.main-nav a'); // Get all navigation links

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        // Prevent body scroll when mobile menu is open
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // 3. Portfolio Filtering
    const filterButtons = document.querySelectorAll('.portfolio-filters .filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and add to clicked one
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.dataset.filter;

            portfolioItems.forEach(item => {
                // Apply a transition to the items
                item.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
                if (filterValue === 'all' || item.dataset.category === filterValue) {
                    item.style.display = 'block';
                    // Re-trigger animation by toggling a class
                    item.classList.remove('hidden-filtered');
                    item.classList.add('visible-filtered');
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    item.classList.remove('visible-filtered');
                    item.classList.add('hidden-filtered');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300); // Hide after fade out
                }
            });
        });
    });
    // Add these classes to your CSS for filtering animations:
    /*
    .portfolio-item.hidden-filtered {
        opacity: 0;
        transform: translateY(20px);
        pointer-events: none;
    }
    .portfolio-item.visible-filtered {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
    }
    */


    // 4. Back to Top Button
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px down
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 5. Form Submission (Basic Client-Side Example - for real forms, use backend)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Simple validation example
            if (!data.name || !data.email || !data.message || !data['project-type']) {
                alert('Please fill in all required fields.');
                return;
            }

            // In a real application, you would send this data to a backend server.
            // This is a placeholder for demonstration purposes.
            console.log('Form Data:', data);

            // Simulate an API call
            try {
                // const response = await fetch('/api/contact', { // Replace with your actual API endpoint
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify(data)
                // });

                // if (response.ok) {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset(); // Clear form on success
                // } else {
                //     alert('There was an error sending your message. Please try again.');
                //     console.error('Server response error:', await response.text());
                // }
            } catch (error) {
                console.error('Network or submission error:', error);
                alert('There was an error sending your message. Please check your internet connection and try again.');
            }
        });
    }

    // 6. Intersection Observer for Scroll Animations (Fade-in sections)
    const sections = document.querySelectorAll('.section-padding'); // Select all sections with padding
    const options = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // When 10% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden');
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's animated
            }
        });
    }, options);

    sections.forEach(section => {
        // Ensure hero section doesn't get this animation as it has its own
        if (section.id !== 'hero') {
            section.classList.add('hidden'); // Add initial hidden state for CSS
            sectionObserver.observe(section);
        }
    });

    // 7. Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        // Check for saved dark mode preference on load
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }

        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }

    // 8. Testimonial Carousel (Basic Manual Swipe/Scroll)
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    if (testimonialCarousel) {
        let isDown = false;
        let startX;
        let scrollLeft;

        testimonialCarousel.addEventListener('mousedown', (e) => {
            isDown = true;
            testimonialCarousel.classList.add('active-scroll');
            startX = e.pageX - testimonialCarousel.offsetLeft;
            scrollLeft = testimonialCarousel.scrollLeft;
        });
        testimonialCarousel.addEventListener('mouseleave', () => {
            isDown = false;
            testimonialCarousel.classList.remove('active-scroll');
        });
        testimonialCarousel.addEventListener('mouseup', () => {
            isDown = false;
            testimonialCarousel.classList.remove('active-scroll');
        });
        testimonialCarousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialCarousel.offsetLeft;
            const walk = (x - startX) * 2; //scroll-fast
            testimonialCarousel.scrollLeft = scrollLeft - walk;
        });

        // Add touch events for mobile
        testimonialCarousel.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - testimonialCarousel.offsetLeft;
            scrollLeft = testimonialCarousel.scrollLeft;
        });
        testimonialCarousel.addEventListener('touchend', () => {
            isDown = false;
        });
        testimonialCarousel.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - testimonialCarousel.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialCarousel.scrollLeft = scrollLeft - walk;
        });
    }
});
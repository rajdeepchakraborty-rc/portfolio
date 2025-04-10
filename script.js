document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Mobile Navigation
    // ======================
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    burger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        });
    });

    // ======================
    // Theme Toggle Functionality
    // ======================
    const themeToggle = document.getElementById('theme-toggle');
    const moonIcon = themeToggle.querySelector('.fa-moon');
    const sunIcon = themeToggle.querySelector('.fa-sun');

    // Set initial theme based on localStorage or default to dark
    function setInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
            localStorage.setItem('theme', 'dark');
        }
    }
    setInitialTheme();

    // Toggle between dark and light themes
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
            localStorage.setItem('theme', 'dark');
        }
    }

    themeToggle.addEventListener('click', toggleTheme);

    // ======================
    // Sticky Header on Scroll
    // ======================
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ======================
    // Smooth Scrolling
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ======================
    // Animate Skill Bars
    // ======================
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            if (isElementInViewport(bar)) {
                bar.style.width = level + '%';
            }
        });
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Run once on page load

    // ======================
    // Project Filtering
    // ======================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ======================
    // Contact Form Handling
    // ======================
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            formMessage.textContent = 'Your message has been sent successfully!';
            formMessage.classList.add('success');
            formMessage.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
                formMessage.classList.remove('success');
            }, 5000);
        });
    }

    // ======================
    // Download CV Button
    // ======================
    const downloadBtn = document.getElementById('download-cv');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a temporary link
            const link = document.createElement('a');
            link.href = 'assets/documents/your_cv.pdf';
            link.download = 'YourName_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Fallback if download doesn't start
            setTimeout(() => {
                if (!document.querySelector('a[download="YourName_CV.pdf"]')) {
                    alert('CV download started! If it doesn\'t begin automatically, check your downloads folder.');
                }
            }, 1000);
        });
    }

    // ======================
    // Back to Top Button
    // ======================
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ======================
    // Animation on Scroll
    // ======================
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-container, .skills-container, .projects-container, .contact-container');
        
        elements.forEach(element => {
            if (isElementInViewport(element)) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.about-container, .skills-container, .projects-container, .contact-container');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. FLOATING HEADER SCROLL LOGIC
    // ==========================================================================
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================================================
    // 2. MOBILE MENU / HAMBURGER MENU
    // ==========================================================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ==========================================================================
    // 3. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================================================
    // 4. INTERACTIVE MENU FILTER
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active class on buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedCategory = btn.getAttribute('data-filter');

            menuCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (selectedCategory === 'all' || selectedCategory === cardCategory) {
                    // Smoothly reveal
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    // Smoothly fade out
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400); // Wait for transition to finish
                }
            });
        });
    });

    // ==========================================================================
    // 5. ZEN LEAF GENERATOR (BACKGROUND PARTICLES)
    // ==========================================================================
    const createLeaves = () => {
        const leafContainer = document.querySelector('.leaf-container');
        if (!leafContainer) return;

        const leafCount = 15;
        for (let i = 0; i < leafCount; i++) {
            const leaf = document.createElement('div');
            leaf.classList.add('leaf');
            
            // Randomize position, delay, and speed
            leaf.style.left = `${Math.random() * 100}%`;
            leaf.style.top = `${Math.random() * -20}%`;
            leaf.style.animationDelay = `${Math.random() * 15}s`;
            leaf.style.animationDuration = `${10 + Math.random() * 10}s`;
            
            // Random size variation
            const sizeRatio = 0.6 + Math.random() * 0.8;
            leaf.style.width = `${15 * sizeRatio}px`;
            leaf.style.height = `${25 * sizeRatio}px`;

            leafContainer.appendChild(leaf);
        }
    };

    createLeaves();

    // ==========================================================================
    // 6. BOOKING FORM & SUCCESS MODAL
    // ==========================================================================
    const bookingForm = document.getElementById('bookingForm');
    const modalOverlay = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalDetailName = document.getElementById('modalDetailName');
    const modalDetailDate = document.getElementById('modalDetailDate');
    const modalDetailTime = document.getElementById('modalDetailTime');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple client side retrieval
            const name = document.getElementById('bName').value;
            const date = document.getElementById('bDate').value;
            const time = document.getElementById('bTime').value;

            // Format date beautifully
            const formattedDate = new Date(date).toLocaleDateString('vi-VN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Set modal content details
            modalDetailName.textContent = name;
            modalDetailDate.textContent = formattedDate;
            modalDetailTime.textContent = time;

            // Trigger visual modal reveal
            modalOverlay.classList.add('active');
            
            // Reset form fields
            bookingForm.reset();
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });

        // Close on clicking overlay backdrop
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }
});

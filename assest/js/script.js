     // JavaScript to hide the preloader after the page is fully loaded
        window.addEventListener('load', function() {
            const preloader = document.getElementById('preloader');
            const content = document.querySelector('.whole');
            
            // Add class to start fade-out transition
            preloader.classList.add('preloader-hidden');
            
            // After transition, truly hide it to prevent interaction
            // and make sure it's removed from layout flow
            preloader.addEventListener('transitionend', function() {
                preloader.style.display = 'none';
            });

            // Show the main content
            if (content) {
                content.style.display = 'block';
            }
        });





    const menubar = document.querySelector('#menu');
    const navbar = document.querySelector('.navbar');
    menubar.onclick=()=>{
        menubar.classList.toggle('fa-xmark');
        navbar.classList.toggle('active')
    }



    document.addEventListener('DOMContentLoaded', function() {
        const skillProgressCircles = document.querySelectorAll('.progress-circle');
        // Read animation duration from CSS custom property
        const rootStyles = getComputedStyle(document.documentElement);
        const animationDurationMs = parseFloat(rootStyles.getPropertyValue('--animation-duration').replace('s', '')) * 1000;

        const observerOptions = {
            root: null, // relative to the viewport
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the element is visible
        };

        const animateCircle = (circleElement) => {
            const targetPercentage = parseInt(circleElement.getAttribute('data-skill-progress'));
            const percentageTextElement = circleElement.querySelector('.progress-text');
            let currentPercentage = 0;
            let startTime = null;

            function animationStep(timestamp) {
                if (!startTime) startTime = timestamp;
                const elapsedTime = timestamp - startTime;
                const progressRatio = Math.min(elapsedTime / animationDurationMs, 1);
                
                currentPercentage = Math.floor(progressRatio * targetPercentage);
                const currentAngle = progressRatio * targetPercentage * 3.6; // 3.6 degrees per percentage point

                circleElement.style.setProperty('--current-progress-angle', currentAngle + 'deg');
                if (percentageTextElement) {
                    percentageTextElement.textContent = currentPercentage + '%';
                }

                if (progressRatio < 1) {
                    requestAnimationFrame(animationStep);
                } else {
                    // Ensure final values are precise
                    circleElement.style.setProperty('--current-progress-angle', (targetPercentage * 3.6) + 'deg');
                    if (percentageTextElement) {
                        percentageTextElement.textContent = targetPercentage + '%';
                    }
                }
            }
            requestAnimationFrame(animationStep);
            circleElement.classList.add('is-animated'); // Mark as animated
        };

        const intersectionCallback = (entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const circle = entry.target;
                    // Check if it hasn't been animated yet
                    if (!circle.classList.contains('is-animated')) {
                         animateCircle(circle);
                    }
                    // Optional: unobserve after animation to save resources
                    // observerInstance.unobserve(circle); 
                }
            });
        };

        const skillObserver = new IntersectionObserver(intersectionCallback, observerOptions);

        skillProgressCircles.forEach(circle => {
            // Initialize with 0% angle
            circle.style.setProperty('--current-progress-angle', '0deg');
            skillObserver.observe(circle);
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectItems = document.querySelectorAll('.project-item');

        // Function to apply staggered animation delay
        const applyStaggeredAnimation = (itemsToShow) => {
            let visibleItemIndex = 0;
            itemsToShow.forEach(item => {
                // Reset animation for re-triggering if needed, but simple delay is fine for first show
                item.style.animation = 'none'; // Reset animation
                item.offsetHeight; /* trigger reflow */
                item.style.animation = '';
                
                item.style.animationDelay = `${visibleItemIndex * 0.1}s`;
                visibleItemIndex++;
            });
        };
        
        // Initial animation application
        const initialVisibleItems = Array.from(projectItems).filter(item => !item.classList.contains('hide'));
        applyStaggeredAnimation(initialVisibleItems);


        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Active button state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');
                const itemsToShow = [];

                projectItems.forEach(item => {
                    const itemCategories = item.getAttribute('data-category').split(' ');
                    item.classList.add('hide'); // Hide all items first
                    item.style.opacity = 0; // Prepare for animation
                    item.style.transform = 'translateY(20px)';

                    if (filterValue === 'all' || itemCategories.includes(filterValue)) {
                        item.classList.remove('hide');
                        itemsToShow.push(item);
                    }
                });
                
                // Apply animation to newly shown items
                applyStaggeredAnimation(itemsToShow);
            });
        });
    });





    document.addEventListener('DOMContentLoaded', () => {

            const filterButtons = document.querySelectorAll('.filter-btn');
            // Select items based on the class used in HTML/CSS
            const galleryItems = document.querySelectorAll('.gallery-item');

            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const filter = button.getAttribute('data-filter');

                    // Update active button state (Same logic)
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    // Filter gallery items (Same logic)
                    galleryItems.forEach(item => {
                        const itemCategory = item.getAttribute('data-category');

                        if (filter === 'all' || itemCategory === filter) {
                            item.classList.remove('hide');
                        } else {
                            item.classList.add('hide');
                        }
                    });
                });
            });
        });



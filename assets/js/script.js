// Smooth scrolling navigation
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }

    // Update active nav item
    updateActiveNavItem(event.target);
}

// Update active navigation item
function updateActiveNavItem(clickedItem) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    clickedItem.classList.add('active');
}

// Scroll spy functionality
function initScrollSpy() {
    const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'blog'];
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 200;

        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    // Find corresponding nav item and make it active
                    const navItems = document.querySelectorAll('.nav-item');
                    navItems.forEach(item => {
                        item.classList.remove('active');
                    });
                    
                    // Find the nav item that corresponds to current section
                    const correspondingNavItem = document.querySelector(`[onclick="scrollToSection('${sectionId}')"]`);
                    if (correspondingNavItem) {
                        correspondingNavItem.classList.add('active');
                    }
                }
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollSpy();
    
    // Add click event to "Do Not Click" element for fun interaction
    const doNotClick = document.querySelector('.do-not-click');
    if (doNotClick) {
        doNotClick.addEventListener('click', function() {
            // Add a fun shake animation
            this.style.animation = 'shake 0.5s ease-in-out';
            
            // Reset animation after it completes
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
            
            // You can add more fun interactions here:
            alert('I told you not to click! 🙈');
            // Or change colors temporarily
            // Or play a sound
            // Or show a popup message
            
            console.log('I told you not to click! 😄');
        });
    }
});

// Add shake animation via CSS (we'll add this to the CSS)
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);
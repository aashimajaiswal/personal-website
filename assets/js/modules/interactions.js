// Interactive Elements

// Add shake animation via CSS
function addShakeAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize "Do Not Click" interaction
function initDoNotClickInteraction() {
    const doNotClick = document.querySelector('.do-not-click');
    if (doNotClick) {
        doNotClick.addEventListener('click', function() {
            // Add a fun shake animation
            this.style.animation = 'shake 0.5s ease-in-out';

            // Reset animation after it completes
            setTimeout(() => {
                this.style.animation = '';
            }, 500);

            // Fun interaction
            alert('I told you not to click! 🙈');
            console.log('I told you not to click! 😄');
        });
    }
}

// Initialize all interactions
function initInteractions() {
    addShakeAnimation();
    initDoNotClickInteraction();
}

// Make functions globally available
window.initInteractions = initInteractions;
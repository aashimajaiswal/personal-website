// Main JavaScript Entry Point

// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation and scroll functionality
    if (window.initNavigation) {
        window.initNavigation();
    }

    // Initialize interactive elements
    if (window.initInteractions) {
        window.initInteractions();
    }

    console.log('🚀 Personal website initialized successfully!');
});
// Home Section Navigation
document.addEventListener('DOMContentLoaded', function() {
    const exploreBtn = document.querySelector('.explore-btn');
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            // Navigate to About Me section when button is clicked
            const aboutSection = document.querySelector('[data-section="about"]');
            if (aboutSection) {
                aboutSection.click();
            }
        });
    }
});
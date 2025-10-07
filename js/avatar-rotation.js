// Avatar display with weighted probability (changes only on page reload)
document.addEventListener('DOMContentLoaded', function() {
    const avatarDisplay = document.getElementById('avatarDisplay');
    const avatarImg = avatarDisplay.querySelector('.avatar-img');
    
    // Array of available avatars with weighted probabilities
    const avatars = [
        'assets/avatar/avatar (1).png', // 91% probability
        'assets/avatar/avatar (2).png', // 4% probability
        'assets/avatar/avatar (3).png', // 2.5% probability
        'assets/avatar/avatar (4).png'  // 2.5% probability
    ];
    
    // Weighted random selection function
    function getWeightedRandomAvatar() {
        const random = Math.random() * 100; // Get random number 0-100
        
        if (random < 91) {
            return 0; // Avatar 1 - 91% chance
        } else if (random < 95) {
            return 1; // Avatar 2 - 4% chance (91 + 4 = 95)
        } else if (random < 97.5) {
            return 2; // Avatar 3 - 2.5% chance (95 + 2.5 = 97.5)
        } else {
            return 3; // Avatar 4 - 2.5% chance (97.5 + 2.5 = 100)
        }
    }
    
    // Select avatar based on weighted probability (only on page load)
    const selectedIndex = getWeightedRandomAvatar();
    avatarImg.src = avatars[selectedIndex];
    
    // Dynamic rating increase on hover (WWE drama effect)
    let ratingInterval;
    let baseRating = 87;
    let currentRating = baseRating;
    let isHovering = false;
    
    avatarDisplay.addEventListener('mouseenter', function() {
        isHovering = true;
        const overallElement = document.getElementById('overallRating');
        
        if (overallElement && !ratingInterval) {
            let targetRating = baseRating + 6; // Increase from 87 to 93
            currentRating = baseRating;
            
            ratingInterval = setInterval(() => {
                if (currentRating < targetRating) {
                    currentRating++;
                    overallElement.textContent = `OVERALL ${currentRating}`;
                } else {
                    clearInterval(ratingInterval);
                    ratingInterval = null;
                }
            }, 80); // Smooth counting animation
        }
    });
    
    // Reset rating when hover ends
    avatarDisplay.addEventListener('mouseleave', function() {
        isHovering = false;
        const overallElement = document.getElementById('overallRating');
        
        // Reset rating
        if (ratingInterval) {
            clearInterval(ratingInterval);
            ratingInterval = null;
        }
        
        if (overallElement) {
            currentRating = baseRating;
            overallElement.textContent = `OVERALL ${baseRating}`;
        }
    });
});
// Avatar rotation functionality
document.addEventListener('DOMContentLoaded', function() {
    const avatarDisplay = document.getElementById('avatarDisplay');
    const avatarImg = avatarDisplay.querySelector('.avatar-img');
    const aboutSection = document.getElementById('about');
    
    // Array of available avatars
    const avatars = [
        'assets/avatar/avatar.jpg',
        'assets/avatar/avatar1.png', 
        'assets/avatar/avatar2.png',
        'assets/avatar/ay_no_bg.png'
    ];
    
    let currentAvatarIndex = 0;
    let isInAboutSection = false;
    let changeAvatarTimeout = null;
    
    // Function to change avatar
    function changeAvatar() {
        // Only change if not in about section
        if (isInAboutSection) return;
        
        // Add fade out effect
        avatarImg.style.opacity = '0.3';
        
        setTimeout(() => {
            // Change to next avatar
            currentAvatarIndex = (currentAvatarIndex + 1) % avatars.length;
            avatarImg.src = avatars[currentAvatarIndex];
            
            // Fade back in
            avatarImg.style.opacity = '1';
        }, 300);
    }
    
    // Function to start auto rotation
    function startAvatarRotation() {
        if (!isInAboutSection) {
            changeAvatarTimeout = setInterval(changeAvatar, 8000); // Change every 8 seconds when not in about section
        }
    }
    
    // Function to stop auto rotation
    function stopAvatarRotation() {
        if (changeAvatarTimeout) {
            clearInterval(changeAvatarTimeout);
            changeAvatarTimeout = null;
        }
    }
    
    // Observer to detect when user is in about section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target === aboutSection) {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    // User is in about section
                    isInAboutSection = true;
                    stopAvatarRotation();
                } else {
                    // User left about section
                    isInAboutSection = false;
                    // Change avatar immediately when leaving
                    setTimeout(changeAvatar, 500);
                    // Start auto rotation again
                    startAvatarRotation();
                }
            }
        });
    }, {
        threshold: [0.3, 0.7] // Trigger when 30% or 70% visible
    });
    
    // Start observing the about section
    observer.observe(aboutSection);
    
    // Random initial avatar on page load
    const randomIndex = Math.floor(Math.random() * avatars.length);
    avatarImg.src = avatars[randomIndex];
    currentAvatarIndex = randomIndex;
    
    // Add click event to manually change avatar
    avatarDisplay.addEventListener('click', function() {
        changeAvatar();
        // Reset auto rotation
        stopAvatarRotation();
        setTimeout(startAvatarRotation, 1000);
    });
    
    // Enhanced hover effect for 3D glass rotation
    avatarDisplay.addEventListener('mouseenter', function() {
        this.style.transform = 'rotateY(25deg) rotateX(10deg) scale(1.1) translateZ(50px)';
        this.style.boxShadow = `
            0 15px 50px rgba(0, 0, 0, 0.2),
            0 30px 60px rgba(255, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.4)
        `;
        this.style.backdropFilter = 'blur(15px)';
    });
    
    avatarDisplay.addEventListener('mouseleave', function() {
        this.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1) translateZ(0px)';
        this.style.boxShadow = `
            0 8px 32px rgba(0, 0, 0, 0.1),
            0 20px 40px rgba(255, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.3)
        `;
        this.style.backdropFilter = 'blur(10px)';
    });
    
    // Start initial rotation
    startAvatarRotation();
});
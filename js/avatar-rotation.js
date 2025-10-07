// Avatar rotation functionality
document.addEventListener('DOMContentLoaded', function() {
    const avatarDisplay = document.getElementById('avatarDisplay');
    const avatarImg = avatarDisplay.querySelector('.avatar-img');
    
    // Array of available avatars
    const avatars = [
        'assets/avatar/avatar (1).png',
        'assets/avatar/avatar (2).png', 
        'assets/avatar/avatar (3).png',
        'assets/avatar/avatar (4).png'
    ];
    
    let currentAvatarIndex = 0;
    
    // Function to change avatar
    function changeAvatar() {
        // Add fade out effect
        avatarImg.style.opacity = '0';
        
        setTimeout(() => {
            // Change to next avatar
            currentAvatarIndex = (currentAvatarIndex + 1) % avatars.length;
            avatarImg.src = avatars[currentAvatarIndex];
            
            // Fade back in
            avatarImg.style.opacity = '1';
        }, 300);
    }
    
    // Change avatar every 3 seconds
    setInterval(changeAvatar, 3000);
    
    // Random initial avatar on page load
    const randomIndex = Math.floor(Math.random() * avatars.length);
    avatarImg.src = avatars[randomIndex];
    currentAvatarIndex = randomIndex;
    
    // Add click event to manually change avatar
    avatarDisplay.addEventListener('click', changeAvatar);
    
    // Add hover effect for extra interactivity
    avatarDisplay.addEventListener('mouseenter', function() {
        this.style.transform = 'translate3d(0px, 0px, 100px) scale(1.1) rotateY(10deg)';
    });
    
    avatarDisplay.addEventListener('mouseleave', function() {
        this.style.transform = 'translate3d(0px, 0px, 80px) scale(1) rotateY(0deg)';
    });
});
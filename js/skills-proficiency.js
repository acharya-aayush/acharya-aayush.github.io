// WWE-Style Skill Proficiency Animation
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card-container');
    
    cards.forEach(card => {
        const proficiencyFill = card.querySelector('.proficiency-fill');
        
        if (proficiencyFill) {
            const proficiency = proficiencyFill.getAttribute('data-proficiency');
            proficiencyFill.style.setProperty('--proficiency-width', proficiency + '%');
            
            // Add hover listener to animate the bar
            card.addEventListener('mouseenter', function() {
                proficiencyFill.style.width = proficiency + '%';
            });
            
            // Optional: Reset on mouse leave (comment out if you want it to stay filled)
            // card.addEventListener('mouseleave', function() {
            //     proficiencyFill.style.width = '0%';
            // });
        }
    });
});

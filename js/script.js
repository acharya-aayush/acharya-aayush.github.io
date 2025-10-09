// WWE 2K19 Portfolio JavaScript
class PortfolioApp {
    constructor() {
        this.currentSection = 'home';
        this.isTransitioning = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeAnimations();
        this.addGlitchEffects();
        this.addSoundEffects();
    }

    bindEvents() {
        // Menu navigation
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (!this.isTransitioning) {
                    const section = item.getAttribute('data-section');
                    this.navigateToSection(section, item);
                }
            });

            // Add hover sound effect - simplified
            item.addEventListener('mouseenter', () => {
                // Simple hover effect, no sound
            });

            item.addEventListener('mouseleave', () => {
                // Simple hover effect removal
            });
        });

        // Navigation for elements with data-section attributes
        const sectionElements = document.querySelectorAll('[data-section]');
        sectionElements.forEach(element => {
            element.addEventListener('click', (e) => {
                if (!this.isTransitioning) {
                    const targetSection = element.getAttribute('data-section');
                    // Find the corresponding menu item to trigger proper navigation
                    const menuItem = document.querySelector(`.menu-item[data-section="${targetSection}"]`);
                    if (menuItem) {
                        this.navigateToSection(targetSection, menuItem);
                    }
                }
            });
        });

        // Form submission
        const form = document.querySelector('.form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission();
            });
        }

        // Skill items interaction - simplified
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('click', () => {
                // Simple click effect
            });
        });

        // Project cards interaction - simplified
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                // Simple click effect
            });
        });

        // Smooth scrolling for content area
        this.addSmoothScrolling();
    }

    navigateToSection(sectionId, menuItem) {
        if (sectionId === this.currentSection) return;

        this.isTransitioning = true;

        // Update menu active state
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        menuItem.classList.add('active');

        // Smooth animated section switching
        const currentSectionEl = document.querySelector('.content-section.active');
        const newSectionEl = document.getElementById(sectionId);

        if (currentSectionEl) {
            // Fade out current section
            currentSectionEl.style.opacity = '0';
            currentSectionEl.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                currentSectionEl.classList.remove('active');
                currentSectionEl.style.opacity = '';
                currentSectionEl.style.transform = '';
                
                // Fade in new section
                newSectionEl.classList.add('active');
                newSectionEl.style.opacity = '0';
                newSectionEl.style.transform = 'translateY(20px)';
                
                // Force reflow
                newSectionEl.offsetHeight;
                
                // Animate in
                newSectionEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                newSectionEl.style.opacity = '1';
                newSectionEl.style.transform = 'translateY(0)';
                
                setTimeout(() => {
                    newSectionEl.style.transition = '';
                    newSectionEl.style.opacity = '';
                    newSectionEl.style.transform = '';
                    this.isTransitioning = false;
                }, 400);
                
            }, 200);
        } else {
            // First load - direct show
            newSectionEl.classList.add('active');
            this.isTransitioning = false;
        }
        this.currentSection = sectionId;
        
        // Only trigger animations once when section first loads
        if (!newSectionEl.dataset.animated) {
            this.triggerSectionAnimations(sectionId);
            newSectionEl.dataset.animated = 'true';
        }
    }

    triggerSectionAnimations(sectionId) {
        switch (sectionId) {
            case 'home':
                this.animateHeroSection();
                break;
            case 'about':
                this.animateStatsCounter();
                break;
            case 'skills':
                this.animateSkillCategories();
                break;
            case 'projects':
                this.animateProjectCards();
                break;
            case 'experience':
                this.animateTimeline();
                break;
            case 'contact':
                this.animateContactForm();
                break;
        }
    }

    animateHeroSection() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroDescription = document.querySelectorAll('.hero-description p');
        const characterPlaceholder = document.querySelector('.character-placeholder');

        if (heroTitle) {
            heroTitle.style.animation = 'none';
            setTimeout(() => {
                heroTitle.style.animation = 'heroGlow 3s ease-in-out infinite';
            }, 100);
        }

        if (characterPlaceholder) {
            characterPlaceholder.style.transform = 'scale(0.8) rotateY(180deg)';
            setTimeout(() => {
                characterPlaceholder.style.transition = 'transform 0.8s ease-out';
                characterPlaceholder.style.transform = 'scale(1) rotateY(0deg)';
            }, 200);
        }
    }

    animateStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach((stat, index) => {
            const finalValue = stat.textContent;
            const isPercentage = finalValue.includes('%');
            const numericValue = parseInt(finalValue);
            
            stat.textContent = '0' + (isPercentage ? '%' : '');
            
            setTimeout(() => {
                this.countUp(stat, 0, numericValue, 2000, isPercentage);
            }, index * 300);
        });
    }

    countUp(element, start, end, duration, isPercentage = false) {
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current + (isPercentage ? '%' : '+');
            
            if (current === end) {
                clearInterval(timer);
                element.textContent = end + (isPercentage ? '%' : '+');
            }
        }, stepTime);
    }

    animateSkillCategories() {
        const categories = document.querySelectorAll('.skill-category');
        categories.forEach((category, index) => {
            category.style.opacity = '0';
            category.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                category.style.transition = 'all 0.6s ease-out';
                category.style.opacity = '1';
                category.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    animateProjectCards() {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) rotateX(15deg)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.8s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) rotateX(0)';
            }, index * 300);
        });
    }

    animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            const year = item.querySelector('.timeline-year');
            const content = item.querySelector('.timeline-content');
            
            year.style.opacity = '0';
            year.style.transform = 'scale(0)';
            content.style.opacity = '0';
            content.style.transform = 'translateX(' + (index % 2 === 0 ? '-50px' : '50px') + ')';
            
            setTimeout(() => {
                year.style.transition = 'all 0.6s ease-out';
                content.style.transition = 'all 0.6s ease-out';
                year.style.opacity = '1';
                year.style.transform = 'scale(1)';
                content.style.opacity = '1';
                content.style.transform = 'translateX(0)';
            }, index * 400);
        });
    }

    animateContactForm() {
        const formElements = document.querySelectorAll('.form-input, .form-textarea, .form-submit');
        const contactItems = document.querySelectorAll('.contact-item');
        
        contactItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease-out';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 200);
        });

        formElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateX(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateX(0)';
            }, index * 150 + 500);
        });
    }

    animateSkillItem(item) {
        item.style.transform = 'scale(1.1) rotateZ(5deg)';
        item.style.boxShadow = '0 0 25px rgba(255, 0, 0, 0.6)';
        
        setTimeout(() => {
            item.style.transform = 'scale(1) rotateZ(0deg)';
            item.style.boxShadow = '0 0 15px rgba(255, 0, 0, 0.3)';
        }, 200);
    }

    animateProjectCard(card) {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        
        setTimeout(() => {
            card.style.transform = 'translateY(-5px) scale(1)';
        }, 300);
    }

    addMenuHoverEffect(item) {
        const menuText = item.querySelector('.menu-text');
        menuText.style.textShadow = '0 0 20px rgba(255, 0, 0, 1), 2px 2px 4px rgba(0, 0, 0, 0.8)';
    }

    removeMenuHoverEffect(item) {
        const menuText = item.querySelector('.menu-text');
        menuText.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.8)';
    }

    handleFormSubmission() {
        const submitBtn = document.querySelector('.form-submit');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'SENDING...';
        submitBtn.style.background = 'linear-gradient(135deg, #ffaa00 0%, #ff6600 100%)';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = 'MESSAGE SENT!';
            submitBtn.style.background = 'linear-gradient(135deg, #00ff00 0%, #00cc00 100%)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)';
                submitBtn.disabled = false;
                
                // Reset form
                document.querySelector('.form').reset();
            }, 2000);
        }, 1500);
    }

    addGlitchEffects() {
        // Add random glitch effects to certain elements
        setInterval(() => {
            if (Math.random() < 0.05) { // 5% chance every interval
                this.triggerGlitchEffect();
            }
        }, 2000);
    }

    triggerGlitchEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && this.currentSection === 'home') {
            heroTitle.style.textShadow = `
                2px 0 #ff0000,
                -2px 0 #00ffff,
                0 0 20px rgba(255, 0, 0, 0.8)
            `;
            
            setTimeout(() => {
                heroTitle.style.textShadow = '0 0 20px rgba(255, 0, 0, 0.5), 2px 2px 4px rgba(0, 0, 0, 0.8)';
            }, 150);
        }
    }

    addSoundEffects() {
        // Create audio context for sound effects (optional)
        this.audioContext = null;
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Audio context not supported');
        }
    }

    playHoverSound() {
        if (this.audioContext) {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.1);
        }
    }

    playClickSound() {
        if (this.audioContext) {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = 1200;
            oscillator.type = 'square';
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.2);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.2);
        }
    }

    addSmoothScrolling() {
        const contentArea = document.querySelector('.content-area');
        if (contentArea) {
            contentArea.style.scrollBehavior = 'smooth';
        }
    }

    initializeAnimations() {
        // Initialize CSS animations for elements in view
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                } else {
                    entry.target.style.animationPlayState = 'paused';
                }
            });
        }, observerOptions);

        // Observe animated elements
        const animatedElements = document.querySelectorAll('.character-silhouette, .character-effects, .particle');
        animatedElements.forEach(el => observer.observe(el));
    }
}

// Initialize the portfolio app
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    
    // Add loading screen effect
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    const particles = document.querySelectorAll('.particle');
    if (document.hidden) {
        particles.forEach(particle => {
            particle.style.animationPlayState = 'paused';
        });
    } else {
        particles.forEach(particle => {
            particle.style.animationPlayState = 'running';
        });
    }
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    const menuItems = document.querySelectorAll('.menu-item');
    const activeIndex = Array.from(menuItems).findIndex(item => item.classList.contains('active'));
    
    if (e.key === 'ArrowDown' && activeIndex < menuItems.length - 1) {
        e.preventDefault();
        menuItems[activeIndex + 1].click();
    } else if (e.key === 'ArrowUp' && activeIndex > 0) {
        e.preventDefault();
        menuItems[activeIndex - 1].click();
    }
});

// Add mouse parallax effect for hero section
document.addEventListener('mousemove', (e) => {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && window.innerWidth > 768) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const rotateX = (mouseY - 0.5) * 10;
        const rotateY = (mouseX - 0.5) * 10;
        
        heroImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
});
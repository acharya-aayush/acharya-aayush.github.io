// Particle System for WWE 2K19 Effect
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.container = document.getElementById('particles-container');
        this.maxParticles = 50;
        this.init();
    }

    init() {
        this.createParticles();
        this.animate();
    }

    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 1;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 6 + 4;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }

    animate() {
        setInterval(() => {
            this.particles.forEach((particle, index) => {
                if (Math.random() < 0.01) {
                    particle.style.left = Math.random() * window.innerWidth + 'px';
                    particle.style.top = Math.random() * window.innerHeight + 'px';
                }
            });
        }, 100);
    }

    resize() {
        this.particles.forEach(particle => {
            if (parseInt(particle.style.left) > window.innerWidth) {
                particle.style.left = Math.random() * window.innerWidth + 'px';
            }
            if (parseInt(particle.style.top) > window.innerHeight) {
                particle.style.top = Math.random() * window.innerHeight + 'px';
            }
        });
    }
}

// Initialize particle system
const particleSystem = new ParticleSystem();

// Handle window resize
window.addEventListener('resize', () => {
    particleSystem.resize();
});
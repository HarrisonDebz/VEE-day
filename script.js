// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set Valentine's Day date (February 14th of current year)
    const today = new Date();
    const currentYear = today.getFullYear();
    let valentineDate = new Date(currentYear, 1, 14); // February is month 1 (0-indexed)
    
    // If Valentine's Day has passed this year, set for next year
    if (today > valentineDate) {
        valentineDate = new Date(currentYear + 1, 1, 14);
    }
    
    window.valentineDate = valentineDate;
    
    // Create floating hearts
    createHearts();
    
    // Start countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Set initial active section
    showSection('landing');
    
    // Add scroll event listener for section transitions
    let isScrolling = false;
    window.addEventListener('wheel', function(e) {
        if (isScrolling) return;
        
        isScrolling = true;
        const sections = ['landing', 'message', 'memories', 'gallery', 'countdown'];
        const currentIndex = sections.indexOf(getCurrentSection());
        
        if (e.deltaY > 0 && currentIndex < sections.length - 1) {
            // Scroll down
            navigateTo(sections[currentIndex + 1]);
        } else if (e.deltaY < 0 && currentIndex > 0) {
            // Scroll up
            navigateTo(sections[currentIndex - 1]);
        }
        
        setTimeout(() => { isScrolling = false; }, 800);
    });
    
    // Add touch events for mobile
    let touchStartY = 0;
    window.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });
    
    window.addEventListener('touchend', function(e) {
        if (isScrolling) return;
        
        const touchEndY = e.changedTouches[0].clientY;
        const sections = ['landing', 'message', 'memories', 'gallery', 'countdown'];
        const currentIndex = sections.indexOf(getCurrentSection());
        
        if (touchStartY - touchEndY > 50 && currentIndex < sections.length - 1) {
            // Swipe up
            isScrolling = true;
            navigateTo(sections[currentIndex + 1]);
            setTimeout(() => { isScrolling = false; }, 800);
        } else if (touchEndY - touchStartY > 50 && currentIndex > 0) {
            // Swipe down
            isScrolling = true;
            navigateTo(sections[currentIndex - 1]);
            setTimeout(() => { isScrolling = false; }, 800);
        }
    });
});

// Navigation function
function navigateTo(sectionId) {
    showSection(sectionId);
    updateNavigationDots(sectionId);
    
    // Scroll to section
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
}

function getCurrentSection() {
    const activeSection = document.querySelector('.section.active');
    return activeSection ? activeSection.id : 'landing';
}

function updateNavigationDots(sectionId) {
    const sections = ['landing', 'message', 'memories', 'gallery', 'countdown'];
    const dots = document.querySelectorAll('.dot');
    
    dots.forEach((dot, index) => {
        if (sections[index] === sectionId) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Create floating hearts
function createHearts() {
    const heartsContainer = document.querySelector('.hearts-background');
    if (!heartsContainer) return;
    
    // Create 15 hearts
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Random position
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = Math.random() * 20 + 10;
        const duration = Math.random() * 10 + 5;
        
        heart.style.left = `${left}%`;
        heart.style.top = `${top}%`;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        
        heartsContainer.appendChild(heart);
    }
}

// Countdown timer
function updateCountdown() {
    if (!window.valentineDate) return;
    
    const now = new Date().getTime();
    const distance = window.valentineDate.getTime() - now;
    
    if (distance < 0) {
        // Valentine's Day has arrived!
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Music control
function toggleMusic() {
    const audio = document.getElementById('loveSong');
    const button = document.getElementById('musicBtn');
    
    if (audio.paused) {
        audio.play();
        button.innerHTML = '<i class="fas fa-pause"></i><span>Pause Music</span>';
    } else {
        audio.pause();
        button.innerHTML = '<i class="fas fa-music"></i><span>Play Love Song</span>';
    }
}

// Add click effect on buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('nav-btn') || e.target.closest('.nav-btn')) {
        const btn = e.target.classList.contains('nav-btn') ? e.target : e.target.closest('.nav-btn');
        
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        btn.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
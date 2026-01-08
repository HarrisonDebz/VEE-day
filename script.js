const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const successMessage = document.getElementById('success-message');
const askText = document.querySelector('.ask-text');

// 1. Logic for the "Yes" button
yesBtn.addEventListener('click', () => {
    // Hide buttons and ask text
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    askText.style.display = 'none';

    // Show success message
    successMessage.classList.remove('hidden');

    // Trigger confetti hearts
    createHearts();
});

// 2. Logic for the "No" button (It runs away!)
noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
});

// 3. Floating hearts function
function createHearts() {
    const interval = setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 2 + 3 + 's';
        
        document.body.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 300);

    // Stop creating hearts after 10 seconds
    setTimeout(() => {
        clearInterval(interval);
    }, 10000);
}
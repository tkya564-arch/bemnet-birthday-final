// Reasons database
const reasons = [
    { 
        text: "You have this soft way of making ordinary days feel warmer. Even your voice and everything perfect new algebashm", 
        emoji: "🌷",
        gif: "gif1.gif"
    },
    { 
        text: "Two years with you ml Idon't know seatu endet endemihed altegb alkush eko😭", 
        emoji: "💗",
        gif: "gif2.gif"
    },
    { 
        text: "May 1, you turn 21, but to me u are always my bb hehe.And it is the day the world was given someone I now cannot imagine my life withoutmy baby boo", 
        emoji: "✨",
        gif: "gif1.gif"
    },
    { 
        text: "I love how being with you feels like home. Not because everything is always perfect, but because with you, even the simple moments feel worth remembering fr fr.", 
        emoji: "🏡",
        gif: "gif2.gif"
    },
    { 
        text: "Bem<3, I hope this new year of your life brings you better comfort, happiness, and love that you have brought into mine my sunshine.", 
        emoji: "💕",
        gif: "gif1.gif"
    }
];

// State management
let currentReasonIndex = 0;
let isTransitioning = false;
let storyReady = false;

const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');

// Create reason card with gif
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const text = document.createElement('div');
    text.className = 'reason-text';
    text.textContent = `${reason.emoji} ${reason.text}`;
    
    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Cute love gif">`;
    
    card.appendChild(text);
    card.appendChild(gifOverlay);
    
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning || storyReady) return;

    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);
        
        reasonCounter.textContent = `Little love note ${currentReasonIndex + 1} of ${reasons.length}`;
        currentReasonIndex++;

        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "Enter our memories 💫";
                    shuffleButton.classList.add('story-mode');
                    storyReady = true;

                    gsap.to('.teddy-hug', {
                        scale: 1,
                        duration: 0.8,
                        ease: "elastic.out"
                    });

                    gsap.to('.ending-text', {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: 0.2
                    });
                }
            });
        }

        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
}

// Main button click
shuffleButton.addEventListener('click', () => {
    if (storyReady) {
        gsap.to('body', {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                window.location.href = 'last.html';
            }
        });
        return;
    }

    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });

    displayNewReason();
});

// Floating elements function
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐', '💕'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Custom cursor
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});

// Create initial floating elements
setInterval(createFloatingElement, 2000);
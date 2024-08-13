const ninja = document.getElementById('ninja');
const block = document.querySelector('.block');
const scoreElement = document.getElementById('score');

let score = 0;
let isJumping = false;
let ninjaPosition = 20; // Positioned above the grass
let blockPosition = window.innerWidth;
let blockSpeed = 2; // Increased block speed to make the game more challenging

function jump() {
    if (!isJumping) {
        isJumping = true;
        let jumpHeight = 0;
        const jumpInterval = setInterval(() => {
            if (jumpHeight >= 200) { // Further increased jump height
                clearInterval(jumpInterval);
                const fallInterval = setInterval(() => {
                    if (jumpHeight <= 0) {
                        clearInterval(fallInterval);
                        isJumping = false;
                    } else {
                        jumpHeight -= 20; // Fall speed
                        ninja.style.bottom = (ninjaPosition + jumpHeight) + 'px';
                    }
                }, 20);
            } else {
                jumpHeight += 20; // Rise speed
                ninja.style.bottom = (ninjaPosition + jumpHeight) + 'px';
            }
        }, 20);
    }
}

function moveBlock() {
    blockPosition -= blockSpeed;
    block.style.right = (window.innerWidth - blockPosition) + 'px';

    // Check for collision with accurate detection
    const ninjaRect = ninja.getBoundingClientRect();
    const blockRect = block.getBoundingClientRect();

    if (
        blockRect.left < ninjaRect.right &&
        blockRect.right > ninjaRect.left &&
        blockRect.top < ninjaRect.bottom &&
        blockRect.bottom > ninjaRect.top
    ) {
        endGame();
    }

    // Reset block position if it goes off-screen
    if (blockPosition < -50) {
        blockPosition = window.innerWidth;
        score++;
        scoreElement.textContent = 'Score: ' + score;
        blockSpeed += 0.5; // Increase block speed slightly with each dodge to increase difficulty
    }
}

function endGame() {
    alert('Game Over! Your final score is: ' + score);
    resetGame();
}

function resetGame() {
    score = 0;
    scoreElement.textContent = 'Score: 0';
    blockPosition = window.innerWidth;
    blockSpeed = 6; // Reset the block speed to the initial value
    ninja.style.bottom = ninjaPosition + 'px';
}

function updateGame() {
    moveBlock();
    requestAnimationFrame(updateGame);
}

document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
        jump();
    }
});

updateGame();

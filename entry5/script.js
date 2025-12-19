// BACKGROUND MUSIC (Solfeggio MP3)

// I grab the audio element for the background music
const bgMusic = document.getElementById("bg-music");

// I start the volume at 0 so I can fade it in smoothly
bgMusic.volume = 0;

// I use this flag to track if music has started playing
// This prevents the music from restarting on every interaction
let musicStarted = false;


// FADE IN AUDIO FUNCTION
// I created this function to smoothly increase the volume over time
// This creates a gentle audio entrance instead of sudden sound
function fadeInAudio(audio, targetVolume, duration) {
    // I calculate how much to increase volume every 50 milliseconds
    const step = targetVolume / (duration / 50);
    
    // I use setInterval to gradually increase the volume
    const fadeInterval = setInterval(() => {
        // I check if the volume is still below the target
        if (audio.volume < targetVolume) {
            // I increase the volume by one step, but don't exceed target
            audio.volume = Math.min(audio.volume + step, targetVolume);
        } else {
            // I stop the interval once target volume is reached
            clearInterval(fadeInterval);
        }
    }, 50);
}


// START MUSIC FUNCTION
// I created this function to start music only after user interaction
// Browsers require user interaction before playing audio
function startMusic() {
    // I check if music hasn't started yet to prevent restarting
    if (!musicStarted) {
        // I play the music and catch any errors silently
        bgMusic.play().catch(() => {});
        // I fade in the audio to 35% volume over 2 seconds
        fadeInAudio(bgMusic, 0.35, 2000);
        // I set the flag so music won't restart
        musicStarted = true;
    }
}

// I add event listeners for different user interactions to start music
// This covers mouse, click, and touch interactions
window.addEventListener("mousemove", startMusic);
window.addEventListener("click", startMusic);
window.addEventListener("touchstart", startMusic);


// PARTICLE FIELD + FLOATING STATEMENTS

// CANVAS SETUP
// I grab the canvas element and get its 2D drawing context
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// I set canvas dimensions accounting for device pixel ratio for sharp rendering
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;

// I set the CSS dimensions to match the window size
canvas.style.width = `${window.innerWidth}px`;
canvas.style.height = `${window.innerHeight}px`;


// STATEMENTS ARRAY
// I created an array of encouraging statements to display randomly
const statements = [
    "LET'S GET LOST TOGETHER.",
    "ALL IS GOOD MATE."
];


// COLORS ARRAY
// I created an array of pastel colors for the floating text
const colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#98D8C8',
    '#F7DC6F',
    '#BB8FCE',
    '#85C1E2',
    '#F8B88B',
    '#ABEBC6',
    '#FAD7A0',
    '#D7BDE2'
];


// HOVER TEXT VARIABLES
// I grab the hover text element for displaying statements
const hoverText = document.getElementById('hover-text');

// I track the last time a statement was shown
let lastStatementTime = 0;

// I set a delay of 3 seconds between statement changes
const statementDelay = 3000;

// I track the current statement to avoid showing the same one twice
let currentStatement = "";


// GET RANDOM COLOR FUNCTION
// I created this function to pick a random color from the array
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}


// PARTICLE CLASS
// I created this class to define individual particle behavior
// Each particle has a position, velocity, and responds to mouse movement
class Paricle {
    constructor(x, y, effect){
        // I store the original position so particles return to it
        this.originX = x;
        this.originY = y;
        
        // I store a reference to the parent effect
        this.effect = effect;
        
        // I set the current position
        this.x = Math.floor(x);
        this.y = Math.floor(y);
        
        // I get the canvas context for drawing
        this.ctx = this.effect.ctx;
        this.ctx.fillStyle = 'white';
        
        // I initialize velocity for movement
        this.vx = 0;
        this.vy = 0;
        
        // I set ease for smooth return to origin
        this.ease = 0.2;
        
        // I set friction to slow down particles over time
        this.friction = 0.95;
        
        // I initialize variables for mouse interaction calculations
        this.dx = 0;
        this.dy = 0;
        this.distance = 0;
        this.force = 0;
        this.angle = 0;
        
        // I set a random size for visual variety
        this.size = Math.floor(Math.random() * 5);
        
        // I draw the particle immediately
        this.draw();
    }
    
    // DRAW METHOD
    // I draw the particle as a small rectangle
    draw(){
        this.ctx.beginPath();
        this.ctx.fillRect(this.x, this.y, this.size, this.size)
    }
    
    // UPDATE METHOD
    // I update the particle position based on mouse interaction
    update(){
        // I calculate distance from mouse to particle
        this.dx = this.effect.mouse.x - this.x;
        this.dy = this.effect.mouse.y - this.y;
        this.distance = this.dx * this.dx + this.dy * this.dy;
        
        // I calculate the repulsion force from the mouse
        this.force = -this.effect.mouse.radius / this.distance * 8;
        
        // I check if particle is within mouse radius
        if(this.distance < this.effect.mouse.radius){
            // I calculate the angle to push the particle away
            this.angle = Math.atan2(this.dy, this.dx);
            // I apply force in the opposite direction of the mouse
            this.vx += this.force * Math.cos(this.angle);
            this.vy += this.force * Math.sin(this.angle);
        }
        
        // I update position with velocity, friction, and ease back to origin
        this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
        this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
        
        // I redraw the particle at its new position
        this.draw()
    }
}


// EFFECT CLASS
// I created this class to manage the entire particle system
class Effect {
    constructor(width, height, context){
        // I store canvas dimensions
        this.width = width;
        this.height = height;
        this.ctx = context;
        
        // I create an array to hold all particles
        this.particlesArray = [];
        
        // I set the number of particles to create
        this.numberOfParticles = 6000;
        
        // I set up mouse tracking with a radius of influence
        this.mouse = {
            radius: 5000,
            x: 0,
            y: 0
        };

        // MOUSE MOVE EVENT
        // I track mouse position and update floating text
        window.addEventListener('mousemove', e => {
            // I update mouse position accounting for pixel ratio
            this.mouse.x = e.clientX * window.devicePixelRatio;
            this.mouse.y = e.pageY * window.devicePixelRatio;

            // I check if enough time has passed to show a new statement
            const currentTime = Date.now();
            if (currentTime - lastStatementTime > statementDelay) {
                // I fade out the current text
                hoverText.classList.add('fade-out');

                // I wait for fade out before changing text
                setTimeout(() => {
                    // I pick a random statement that's different from current
                    let randomStatement;
                    do {
                        randomStatement = statements[Math.floor(Math.random() * statements.length)];
                    } while (randomStatement === currentStatement);

                    // I update the current statement
                    currentStatement = randomStatement;
                    
                    // I set the new text content
                    hoverText.textContent = randomStatement;
                    
                    // I position the text near the mouse
                    hoverText.style.left = `${e.clientX + 20}px`;
                    hoverText.style.top = `${e.clientY + 20}px`;
                    
                    // I set a random color for the text
                    hoverText.style.color = getRandomColor();

                    // I fade in the new text
                    hoverText.classList.remove('fade-out');
                    hoverText.classList.add('visible');
                }, 500);

                // I update the last statement time
                lastStatementTime = currentTime;
            } else {
                // I just update position without changing text
                hoverText.style.left = `${e.clientX + 20}px`;
                hoverText.style.top = `${e.clientY + 20}px`;
                hoverText.classList.add('visible');
            }
        });

        // MOUSE LEAVE EVENT
        // I hide the text when mouse leaves the window
        window.addEventListener('mouseleave', () => {
            hoverText.classList.remove('visible');
            hoverText.classList.add('fade-out');
        });

        // RESIZE EVENT
        // I update canvas and recreate particles when window resizes
        window.addEventListener('resize', () => {
            // I update canvas dimensions
            canvas.width = window.innerWidth * window.devicePixelRatio;
            canvas.height = window.innerHeight * window.devicePixelRatio;
            this.width = canvas.width;
            this.height = canvas.height;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            
            // I clear and recreate all particles
            this.particlesArray = [];
            this.init();
        });

        // I initialize the particle system
        this.init();
    }

    // INIT METHOD
    // I create all the particles with random positions
    init(){
        for(let i = 0; i < this.numberOfParticles; i++){
            // I generate random x and y coordinates
            const x = Math.random() * this.width;
            const y = Math.random() * this.height;
            // I create a new particle and add it to the array
            this.particlesArray.push(new Paricle(x, y, this));
        }
    }

    // UPDATE METHOD
    // I clear the canvas and update all particles each frame
    update(){
        // I clear the entire canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        // I update each particle
        for(let i = 0; i < this.particlesArray.length; i++){
            this.particlesArray[i].update();
        }
    }
}


// CREATE EFFECT INSTANCE
// I create a new effect with the canvas dimensions
let effect = new Effect(canvas.width, canvas.height, ctx);


// ANIMATION LOOP
// I created this function to continuously update the particle field
function animate(){
    // I update all particles
    effect.update();
    // I request the next animation frame for smooth animation
    requestAnimationFrame(animate);
}

// I start the animation loop
animate();

// I grab the container that holds all the refresh symbols
const refreshContainer = document.getElementById('refresh-container');

// I grab the mirror/camera view container
const mirrorContainer = document.getElementById('mirror-container');

// I grab the marquee border that shows when camera is denied
const marqueeBorder = document.getElementById('marquee-border');

// I grab all the button elements for the photobooth feature
const captureBtn = document.getElementById('capture-btn');
const saveBtn = document.getElementById('save-btn');
const printBtn = document.getElementById('print-btn');

// I grab the flash effect element
const flash = document.getElementById('flash');

// I grab the hidden canvas used for capturing photos
const captureCanvas = document.getElementById('capture-canvas');

// I set up the canvas context so we can draw on it
const ctx = captureCanvas.getContext('2d');

// I store the captured image data so we can save/print it later
let capturedImageData = null;


// REFRESH SYMBOL SETTINGS

// I set the color that symbols turn when you hover over them
const solidColor = '#FFFFFF';

// I define what character we use for the grid pattern
const asciiPattern = ['⟳'];

// I store all the refresh symbol elements in an array so we can loop through them
let refreshSymbols = [];


// GENERATE REFRESH SYMBOLS FUNCTION

// I created this function to generate a grid of refresh symbols across the entire screen
function generateRefreshSymbols() {
    // I calculate how many columns fit based on screen width
    const cols = Math.floor(window.innerWidth / 32);
    
    // I calculate how many rows fit based on screen height
    const rows = Math.floor(window.innerHeight / 38);
    
    // I reset the array before generating new symbols
    refreshSymbols = [];
    
    // I loop through each row
    for (let row = 0; row < rows; row++) {
        // I loop through each column within that row
        for (let col = 0; col < cols; col++) {
            // I create a new div element for each symbol
            const refreshSymbol = document.createElement('div');
            
            // I give it the refresh-symbol class for styling
            refreshSymbol.className = 'refresh-symbol';
            
            // I figure out which character to use from our pattern array
            const patternIndex = (row * cols + col) % asciiPattern.length;
            
            // I set the actual symbol character inside the div
            refreshSymbol.textContent = asciiPattern[patternIndex];
            
            // I calculate the x position based on column number
            const x = col * 32 + 10;
            
            // I calculate the y position based on row number
            const y = row * 38 + 10;
            
            // I position the symbol on the screen
            refreshSymbol.style.left = `${x}px`;
            refreshSymbol.style.top = `${y}px`;
            
            // I store the position in data attributes so we can access them later for the brush effect
            refreshSymbol.dataset.x = x;
            refreshSymbol.dataset.y = y;
            
            // I make the symbol clickable and trigger the camera when clicked
            refreshSymbol.addEventListener('click', handleRefreshClick);
            
            // I add the symbol to the container on the page
            refreshContainer.appendChild(refreshSymbol);
            
            // I add the symbol to our array so we can reference it later
            refreshSymbols.push(refreshSymbol);
        }
    }
}


// BRUSH EFFECT VARIABLES

// I track the mouse x position
let mouseX = 0;

// I track the mouse y position
let mouseY = 0;

// I set how big the brush radius is (how many symbols light up near the mouse)
const brushRadius = 80;


// MOUSE MOVE EVENT - BRUSH EFFECT

// I listen for mouse movement anywhere on the page
document.addEventListener('mousemove', (e) => {
    // I update the mouse position variables
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // I loop through every refresh symbol and check if it's near the mouse
    refreshSymbols.forEach(symbol => {
        // I get the symbol's x position from the data attribute
        const symbolX = parseInt(symbol.dataset.x);
        
        // I get the symbol's y position from the data attribute
        const symbolY = parseInt(symbol.dataset.y);
        
        // I calculate the distance between the mouse and this symbol using pythagorean theorem
        const distance = Math.sqrt(Math.pow(mouseX - symbolX, 2) + Math.pow(mouseY - symbolY, 2));
        
        // I check if the symbol is within the brush radius
        if (distance < brushRadius) {
            // I make the symbol visible by adding the visible class
            symbol.classList.add('visible');
            
            // I change the symbol color to white
            symbol.style.color = solidColor;
        }
    });
});


// FADE EFFECT - INTERVAL

// I run this code every 500 milliseconds to fade symbols back to grey
setInterval(() => {
    // I loop through every refresh symbol
    refreshSymbols.forEach(symbol => {
        // I get the symbol's position
        const symbolX = parseInt(symbol.dataset.x);
        const symbolY = parseInt(symbol.dataset.y);
        
        // I calculate how far this symbol is from the current mouse position
        const distance = Math.sqrt(Math.pow(mouseX - symbolX, 2) + Math.pow(mouseY - symbolY, 2));
        
        // I check if the symbol is far enough from the mouse to fade it
        if (distance > brushRadius + 50) {
            // I fade the symbol back to dark grey
            symbol.style.color = '#333333';
        }
    });
}, 500);


// CLICK HANDLER - ACTIVATE MIRROR

// I created this function to handle when a refresh symbol is clicked
function handleRefreshClick() {
    // I call the function that activates the camera/mirror
    activateMirror();
}


// ACTIVATE MIRROR FUNCTION

// I created this async function to request camera access and show the mirror view
async function activateMirror() {
    try {
        // I ask the browser for permission to use the front-facing camera
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: "user" },
            audio: false 
        });
        
        // I hide the refresh symbol grid
        refreshContainer.style.display = 'none';
        
        // I show the mirror container with camera feeds
        mirrorContainer.style.display = 'block';
        
        // I connect the camera stream to all 6 video elements
        for (let i = 1; i <= 6; i++) {
            document.getElementById(`mirror-video-${i}`).srcObject = stream;
        }
        
    } catch (error) {
        // I handle when the user denies camera access
        // I hide the refresh symbols
        refreshContainer.style.display = 'none';
        
        // I show the marquee border fallback instead
        marqueeBorder.style.display = 'block';
    }
}


// CAPTURE BUTTON - CLICK EVENT

// I listen for clicks on the capture button
captureBtn.addEventListener('click', () => {
    // I trigger the flash effect by adding the active class
    flash.classList.add('active');
    
    // I remove the flash effect after 500ms
    setTimeout(() => {
        flash.classList.remove('active');
    }, 500);

    // I call the function that actually captures the photo
    captureMirrorView();
});


// CAPTURE MIRROR VIEW FUNCTION

// I created this function to capture what's showing in the camera grid and save it as an image
function captureMirrorView() {
    // I grab the mirror content and grid elements
    const mirrorContent = document.querySelector('.mirror-content');
    const gridElement = document.querySelector('.mirror-grid');
    
    // I get the size of the grid so we know how big to make the canvas
    const rect = gridElement.getBoundingClientRect();
    captureCanvas.width = rect.width;
    captureCanvas.height = rect.height;
    
    // I fill the canvas with a black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, captureCanvas.width, captureCanvas.height);
    
    // I grab all the video elements
    const videos = document.querySelectorAll('.mirror-frame');
    
    // I set up the grid layout calculations
    const cols = 3;
    const gap = rect.width * 0.02;
    const frameWidth = (rect.width - (gap * 2)) / cols;
    const frameHeight = frameWidth * (videos[0].videoHeight / videos[0].videoWidth);
    
    // I loop through each video and draw it on the canvas
    videos.forEach((video, index) => {
        // I calculate where this frame should be positioned
        const col = index % cols;
        const row = Math.floor(index / cols);
        const x = col * (frameWidth + gap);
        const y = row * (frameHeight + gap);
        
        // I save the canvas state before applying filters
        ctx.save();
        
        // I apply the grayscale filter
        ctx.filter = 'grayscale(100%)';
        
        // I draw the video frame onto the canvas
        ctx.drawImage(video, x, y, frameWidth, frameHeight);
        
        // I draw the red border around each frame
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, frameWidth, frameHeight);
        
        // I restore the canvas state
        ctx.restore();
    });
    
    // I convert the canvas to an image and store it
    capturedImageData = captureCanvas.toDataURL('image/png');
    
    // I show the save and print buttons now that we have a photo
    saveBtn.style.display = 'inline-block';
    printBtn.style.display = 'inline-block';
    
    // I change the capture button text
    captureBtn.textContent = 'Capture Again';
}


// SAVE BUTTON - CLICK EVENT

// I listen for clicks on the save button
saveBtn.addEventListener('click', () => {
    // I check if we actually have a captured image
    if (capturedImageData) {
        // I create a temporary link element for downloading
        const link = document.createElement('a');
        
        // I set the filename with a timestamp
        link.download = `stuck-${Date.now()}.png`;
        
        // I set the image data as the download source
        link.href = capturedImageData;
        
        // I trigger the download
        link.click();
    }
});


// PRINT BUTTON - CLICK EVENT

// I listen for clicks on the print button
printBtn.addEventListener('click', () => {
    // I check if we actually have a captured image
    if (capturedImageData) {
        // I open a new window for printing
        const printWindow = window.open('', '_blank');
        
        // I write the HTML for the print page
        printWindow.document.write(`
            <html>
            <head>
                <title>Print Photo</title>
                <style>
                    body {
                        margin: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        background: black;
                    }
                    img {
                        max-width: 100%;
                        height: auto;
                    }
                    @media print {
                        body {
                            background: white;
                        }
                    }
                </style>
            </head>
            <body>
                <img src="${capturedImageData}" onload="window.print(); window.close();" />
            </body>
            </html>
        `);
        
        // I close the document so it renders properly
        printWindow.document.close();
    }
});


// INITIALIZE - RUN ON PAGE LOAD

// I generate all the refresh symbols when the page first loads
generateRefreshSymbols();


// WINDOW RESIZE
window.addEventListener('resize', () => {
    // I clear all the existing symbols
    refreshContainer.innerHTML = '';
    
    // I regenerate the grid with the new window size
    generateRefreshSymbols();
});
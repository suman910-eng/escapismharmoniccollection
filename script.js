// NUMBER OF ENTRIES
const numberOfImages = 7;

// ENTRY TITLES FOR TOOLTIPS
const entryTitles = [
    "r/escapism",
    "Again?",
    "What Is Escapism?",
    "Bored?",
    "Look Up!",
    "Click Me!",
    "Wandering Thoughts"
];

// I store buffer positions for potential future use
let bufferPositions = [];


// RANDOM NUMBER FUNCTION
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// COLLISION DETECTION FUNCTION
// I check if two rectangles overlap to prevent buffers from covering text
function rectsOverlap(a, b) {
    return !(
        a.left > b.left + b.width  ||
        a.left + a.width < b.left  ||
        a.top > b.top + b.height   ||
        a.top + a.height < b.top
    );
}


// MAIN FUNCTION - GENERATE BUFFER ICONS
function displayRandomImages() {
    const body = document.body;
    const textContainer = document.querySelector('.container');

    // I ensure text stays visible in bottom-left
    textContainer.style.opacity = '1';
    textContainer.style.position = 'fixed';
    textContainer.style.zIndex = '20';

    // I get the text block rectangle to avoid placing buffers over it
    const textRect = textContainer.getBoundingClientRect();
    const reservedRect = {
        top: textRect.top,
        left: textRect.left,
        width: textRect.width,
        height: textRect.height
    };

    // I create a tooltip element that follows the cursor
    const tooltip = document.createElement('div');
    tooltip.style.position = 'fixed';
    tooltip.style.backgroundColor = 'rgba(80, 80, 80, 0.95)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '8px 12px';
    tooltip.style.fontSize = '12px';
    tooltip.style.fontFamily = 'Helvetica Neue, sans-serif';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.opacity = '0';
    tooltip.style.zIndex = '1000';
    body.appendChild(tooltip);

    const count = Math.min(numberOfImages, entryTitles.length);

    // I loop through each entry and create a buffer icon
    for (let i = 0; i < count; i++) {
        // I create an anchor link to the entry page
        const anchor = document.createElement('a');
        anchor.href = 'entry' + (i + 1) + '/index.html';

        // I create the buffer image
        const image = document.createElement('img');
        image.src = 'buffer.png';
        image.style.width = '32px';
        image.style.height = '32px';

        // I find a random position that doesn't overlap the text
        let top, left;
        let attempts = 0;
        let placed = false;

        while (!placed && attempts < 200) {
            top = getRandomNumber(50, window.innerHeight - 50);
            left = getRandomNumber(50, window.innerWidth - 50);

            const candidateRect = {
                top: top,
                left: left,
                width: 32,
                height: 32
            };

            // I skip positions that overlap the text block
            if (rectsOverlap(candidateRect, reservedRect)) {
                attempts++;
                continue;
            }
            placed = true;
        }

        // I position the buffer icon
        anchor.style.position = 'absolute';
        anchor.style.top = top + 'px';
        anchor.style.left = left + 'px';
        anchor.style.zIndex = '10'; 

        bufferPositions.push({
            top: top,
            left: left,
            width: 32,
            height: 32
        });

        // I store the entry title for the tooltip
        anchor.dataset.entry = entryTitles[i];

        // TOOLTIP EVENTS
        anchor.addEventListener('mouseenter', function () {
            tooltip.textContent = this.dataset.entry;
            tooltip.style.opacity = '1';
        });

        anchor.addEventListener('mousemove', function (e) {
            tooltip.style.left = (e.clientX + 15) + 'px';
            tooltip.style.top = (e.clientY + 15) + 'px';
        });

        anchor.addEventListener('mouseleave', function () {
            tooltip.style.opacity = '0';
        });

        anchor.appendChild(image);
        body.appendChild(anchor);
    }
}

// I run the function once the page loads
window.addEventListener('load', displayRandomImages);


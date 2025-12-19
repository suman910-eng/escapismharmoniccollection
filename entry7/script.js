// TIMER - tracks time spent on page

// I use getElementById to grab the timer display element
var timeSpentDiv = document.getElementById("timer");

// I select all paragraph elements inside the text container
var paragraphs = document.querySelectorAll('.text p');

// I store the time when the page first loads
// getTime() gives me milliseconds since 1970, which I can use to calculate elapsed time
var startTime = new Date().getTime();

// FONT SIZE VARIABLES
// I want each paragraph to get progressively larger as you scroll down
// This creates a visual effect of thoughts getting "louder" or more intense
var baseFontSize = 4.75;
var fontSizeIncrement = 1;

// LOOP THROUGH PARAGRAPHS TO SET FONT SIZES
// I use forEach to go through each paragraph and set its font size
// The index parameter tells me which paragraph I'm on (0, 1, 2, etc.)
paragraphs.forEach(function(paragraph, index) {
    // I calculate the font size by adding the increment multiplied by the index
    // So paragraph 0 = 4.75vw, paragraph 1 = 5.75vw, paragraph 2 = 6.75vw, etc.
    var fontSize = (baseFontSize + index * fontSizeIncrement);
    paragraph.style.fontSize = fontSize + 'vw';
});

// TIMER UPDATE LOOP
// I use setInterval to run this code every 1000 milliseconds (1 second)
// This keeps the timer display updated in real time
setInterval(function() {
    // I get the current time in milliseconds
    var currentTime = new Date().getTime();
    
    // I calculate how many seconds have passed since the page loaded
    // I subtract startTime from currentTime and divide by 1000 to convert to seconds
    var timeSpent = Math.floor((currentTime - startTime) / 1000);

    // I convert total seconds into hours, minutes, and seconds format
    // padStart(2, '0') adds a leading zero if needed (so 5 becomes 05)
    var hours = String(Math.floor(timeSpent / 3600)).padStart(2, '0');
    var minutes = String(Math.floor((timeSpent % 3600) / 60)).padStart(2, '0');
    var seconds = String(timeSpent % 60).padStart(2, '0');

    // I update the timer display with the formatted time
    timeSpentDiv.textContent = hours + ":" + minutes + ":" + seconds;
}, 1000);


// POPUP REMINDERS - hydration, stretching, etc.

// I grab all the elements I need to show/hide during popup
var timer = document.querySelector('.timer');
var text = document.querySelector('.text');
var popupElement = document.getElementById('popup');
var toggle = document.getElementById('toggleButton');

// COUNTDOWN DURATION
// I set 30 seconds between each reminder popup
// This encourages users to take breaks from reading
var countdownDuration = 30;

// POSSIBLE REMINDER TEXTS
// I created an array of different wellness reminders
// The popup will randomly pick one each time it appears
var possibleTexts = [
    "Hold on. Have you been blinking? Let's take a few seconds.",
    "Are you staying hydrated? You should drink some water right now.",
    "You've been sitting here for quite a while. Let's get up and stretch.",
    "Close your eyes, take a deep breath, and do nothing for a little bit."
];

// FUNCTION TO GET RANDOM TEXT
// I use Math.random() to pick a random index from the array
// Math.floor() rounds down so I get a whole number index
function getRandomText() {
    var randomIndex = Math.floor(Math.random() * possibleTexts.length);
    return possibleTexts[randomIndex];
}

// FUNCTION TO SHOW POPUP
// This function displays the reminder and dims the background content
function showPopup() {
    // I set the popup text to a random reminder
    popupElement.textContent = getRandomText();

    // I soften the background content by reducing opacity
    // This draws attention to the popup message
    timer.style.opacity = '0';
    text.style.opacity = '0.1';
    toggle.style.opacity = '0';

    // I make the popup visible
    popupElement.style.display = 'block';

    // HIDE POPUP AFTER 5 SECONDS
    // I use setTimeout to wait 5 seconds before hiding the popup
    setTimeout(function () {
        // I hide the popup
        popupElement.style.display = 'none';
        
        // I restore the background content opacity
        timer.style.opacity = '1';
        text.style.opacity = '1';
        toggle.style.opacity = '1';

        // I schedule the next popup after another 30 seconds
        setTimeout(showPopup, countdownDuration * 1000);
    }, 5000);
}

// FIRST REMINDER
// I start the first popup after 30 seconds of being on the page
setTimeout(showPopup, countdownDuration * 1000);


// ELLIPSIS TOGGLE - show/hide "..." text

// I wait for the DOM to fully load before running this code
// This ensures all HTML elements exist before I try to select them
document.addEventListener('DOMContentLoaded', function() {
    // I grab the toggle button and all paragraphs
    var toggleButton = document.getElementById('toggleButton');
    var paragraphsForEllipsis = document.querySelectorAll('.text p');

    // WRAP ELLIPSES IN SPANS
    // I loop through each paragraph and find all "..." sequences
    // I use replace() with a regex pattern to wrap them in span tags
    // This lets me style and toggle them later
    paragraphsForEllipsis.forEach(function(paragraph) {
        // The regex /\.\.\.+/g matches three or more dots
        // I replace them with a span that has the class "ellipsis"
        paragraph.innerHTML = paragraph.innerHTML.replace(/\.\.\.+/g, '<span class="ellipsis">...</span>');
    });

    // I select all the newly created ellipsis spans
    var ellipsisSpans = document.querySelectorAll('.ellipsis');

    // TOGGLE BUTTON CLICK EVENT
    // When the button is clicked, I toggle the visibility of all ellipses
    toggleButton.addEventListener('click', function() {
        // I loop through each ellipsis span and toggle the 'noellipsis' class
        // This class hides the ellipsis in CSS
        ellipsisSpans.forEach(function(span) {
            span.classList.toggle('noellipsis');
        });

        // I also toggle the 'active' class on the button
        // This changes the button appearance to show its current state
        toggleButton.classList.toggle('active');
    });
});
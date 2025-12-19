// ERROR SOUND
// I grab the audio element so I can play the error sound on each click
var audio = document.getElementById('errorSound');


// SHOW ERROR FUNCTION
// I created this function to handle what happens when any button is clicked
// It plays the error sound, shows an alert, and reveals the next button
function showError(nextBtn) {
  // I play the error sound
  audio.play();
  // I show an error alert to frustrate the user
  alert("ERROR. TRY AGAIN.");
  // I reveal the next button by changing its display from none to block
  document.querySelector(nextBtn).style.display = 'block';
}


// BUTTON EVENT LISTENERS
// I add click event listeners to each button
// Each button calls showError and passes the next button's class

// Button 1 click reveals button 2
document.querySelector('.btn1').addEventListener('click', function() { showError('.btn2'); });

// Button 2 click reveals button 3
document.querySelector('.btn2').addEventListener('click', function() { showError('.btn3'); });

// Button 3 click reveals button 4
document.querySelector('.btn3').addEventListener('click', function() { showError('.btn4'); });

// Button 4 click reveals button 5
document.querySelector('.btn4').addEventListener('click', function() { showError('.btn5'); });

// Button 5 click reveals button 6
document.querySelector('.btn5').addEventListener('click', function() { showError('.btn6'); });

// Button 6 click reveals button 7
document.querySelector('.btn6').addEventListener('click', function() { showError('.btn7'); });

// Button 7 click reveals button 8
document.querySelector('.btn7').addEventListener('click', function() { showError('.btn8'); });

// Button 8 click reveals button 9
document.querySelector('.btn8').addEventListener('click', function() { showError('.btn9'); });

// Button 9 click reveals button 10
document.querySelector('.btn9').addEventListener('click', function() { showError('.btn10'); });

// Button 10 click reveals button 11
document.querySelector('.btn10').addEventListener('click', function() { showError('.btn11'); });

// Button 11 click reveals button 12
document.querySelector('.btn11').addEventListener('click', function() { showError('.btn12'); });

// Button 12 click reveals button 13
document.querySelector('.btn12').addEventListener('click', function() { showError('.btn13'); });

// Button 13 click reveals button 14
document.querySelector('.btn13').addEventListener('click', function() { showError('.btn14'); });

// Button 14 click reveals button 15
document.querySelector('.btn14').addEventListener('click', function() { showError('.btn15'); });

// BUTTON 15 - FINAL BUTTON
// I handle the last button differently, it just plays the sound and hides everything
document.querySelector('.btn15').addEventListener('click', function() { 
  // I play the error sound one last time
  audio.play();
  // I hide the entire buttons container to end the experience
  document.querySelector('.buttons').style.display = 'none';
});
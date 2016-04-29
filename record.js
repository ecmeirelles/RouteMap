var canvas = document.getElementById("mapCanvas");
var context = canvas.getContext("2d");
var requestID;
			
var mouseX, mouseY;
var marks = [{}];

/* http://paulirish.com/2011/requestanimationframe-for-smart-animating/
   http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
   requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
   MIT license */

// Enable requestAnimationFrame in Safari
(function () {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }
  if(!window.requestAnimationFrame)
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      },
      timeToCall);
      lastTime = currTime + timeToCall;
      return id;
  };
  if(!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
  };
}());

// Handle the start recording action			
function startRecording() {
	// Empty the array
	marks = [{}];
	// Clear the table
	clearTable();
	// Enable the mouse animation in the canvas
	animateCanvas();
	
	canvas.onmousemove = setMousePosition;
	canvas.onclick = pinMousePosition;						
}
			
function drawMarks() {
	// Clear the canvas
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	for(var i = 0; i < marks.length; i++) {
		// Draw the red circle
		context.beginPath();
		context.arc(marks[i].pinX, marks[i].pinY, 10, 0, 2 * Math.PI);
		context.fillStyle = "#FF0000";
		context.fill();
		
		// If there is more than one mark
		if(i > 0) {
			// Draw the line between the circles
			context.beginPath();
			context.moveTo(marks[i-1].pinX, marks[i-1].pinY);
			context.lineTo(marks[i].pinX, marks[i].pinY);
			context.stroke();	
		}
	}
}

// Animate the mouse position within the canvas
function animateCanvas() {
	// Redraw the canvas
	drawMarks(marks);
	
	// Draw the red circle
	context.beginPath();
	context.arc(mouseX, mouseY, 10, 0, 2 * Math.PI);
	context.fillStyle = "#FF0000";
	context.fill();
	context.closePath();
	
	// Request animation
	requestID = requestAnimationFrame(animateCanvas);
}

// Set the mouse position			
function setMousePosition(e) {
	var coords = getMouseCoords(e);
							
	mouseX = coords[0];
	mouseY = coords[1];
}

// Pin the mouse position
function pinMousePosition(e) {
	showForm(e);
	
	var coords = getMouseCoords(e);
	// Add the coordinates to the array
	marks.push({pinX:coords[0], pinY:coords[1]});
}
var i = 0;
var temp = [{}];

// Handle the play back action
function playMap() {
	// Empty the array
	temp = [{}];
	
	// Disable the button
	disableButtons();
	// Play back
	playAction();
}	

function playAction(){
	// Disable the mouse animation
	cancelAnimationFrame(requestID);
	requestID = undefined;
	
	if(i < marks.length) {
		// Add the object to the temporary array
		temp.push({pinX:marks[i].pinX, pinY:marks[i].pinY, label:marks[i].label});
		// Clear the canvas
		context.clearRect(0, 0, canvas.width, canvas.height);
	
		for(var j = 0; j < temp.length; j++) {
			// Draw the red circle
			context.beginPath();
			context.arc(temp[j].pinX, temp[j].pinY, 10, 0, 2 * Math.PI);
			context.fillStyle = "#FF0000";
			context.fill();
			
			// If there is more than one mark
			if(j > 0) {
				// Draw the line between the circles
				context.beginPath();
				context.lineWidth = "1";
				context.moveTo(temp[j-1].pinX, temp[j-1].pinY);
				context.lineTo(temp[j].pinX, temp[j].pinY);
				context.stroke();	
			}
			
			// Draw the label
			drawLabel(i + 1);
		}
	}
	
	// The last redrawing in order to clean the appearance of the last label
	else {
		// Clear the canvas
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		for(var j = 0; j < temp.length; j++) {
			// Draw the red circle
			context.beginPath();
			context.arc(temp[j].pinX, temp[j].pinY, 10, 0, 2 * Math.PI);
			context.fillStyle = "#FF0000";
			context.fill();
			context.closePath();
			
			// If there is more than one mark
			if(j > 0) {
				// Draw the line between the circles
				context.beginPath();
				context.lineWidth = "1";
				context.moveTo(temp[j-1].pinX, temp[j-1].pinY);
				context.lineTo(temp[j].pinX, temp[j].pinY);
				context.stroke();	
			}
		}
	}
	
	// Increment the iterator
	i++;
	
	// While there are objects in the array
	if (i <= marks.length) {
		// Set a time of 1.5 seconds between each redrawing
		setTimeout(playAction, 1500);
	}
	
	// After drawing all the markers
	else {
		// animateCanvas();
		// Restart the iterator
		i = 0;
		// Enable the buttons
		enableButtons();
	}
}

// Enable the buttons
function enableButtons() {
	document.getElementById('startButton').disabled = false;
	document.getElementById('playButton').disabled = false;
	
	// Loop within the table
	for(var k = 1; k < table.rows.length; k++) {
		var row = table.children[0].children[k];
		var cells = row.children;
		// Up button
		cells[0].children[0].disabled = false;
		// Down button
		cells[0].children[1].disabled = false;
		// Delete button
		cells[2].children[0].disabled = false;
	}
}

// Disable the buttons
function disableButtons() {
	document.getElementById('startButton').disabled = true;
	document.getElementById('playButton').disabled = true;
	
	// Loop within the table
	for(var k = 1; k < table.rows.length; k++) {
		var row = table.children[0].children[k];
		var cells = row.children;
		// Up button
		cells[0].children[0].disabled = true;
		// Down button
		cells[0].children[1].disabled = true;
		// Delete button
		cells[2].children[0].disabled = true;
	}
}

// Draw the label
function drawLabel(iterator) {
	var value = temp[iterator].label;
	context.font = "20px Courier New";
	
	// Show the label just if there is a label
	if(value != "" && value != undefined) {
		var rectWidth = context.measureText(value).width + 40;
		var rectHeight = 40;
		
		// Mark is in the right side
		if(temp[iterator].pinX > canvas.width/2) {
			// Mark is in the bottom
			if(temp[iterator].pinY > canvas.height/2) {
				context.fillStyle = "#FFFFFF";
				context.fillRect(temp[iterator].pinX - (rectWidth + 10), temp[iterator].pinY - (rectHeight + 20), rectWidth, rectHeight);
				context.lineWidth = "5";
				context.strokeStyle = "#000000";
				context.strokeRect(temp[iterator].pinX - (rectWidth + 10), temp[iterator].pinY - (rectHeight + 20), rectWidth, rectHeight);
				
				context.fillStyle = "#000000";
				context.fillText(temp[iterator].label, temp[iterator].pinX - (rectWidth - 10), temp[iterator].pinY - (rectHeight - 5));
			}
			
			// Mark is in the top
			else {
				context.fillStyle = "#FFFFFF";
				context.fillRect(temp[iterator].pinX - (rectWidth + 10), temp[iterator].pinY + 20, rectWidth, rectHeight);
				context.lineWidth = "5";
				context.strokeStyle = "#000000";
				context.strokeRect(temp[iterator].pinX - (rectWidth + 10), temp[iterator].pinY + 20, rectWidth, rectHeight);
				
				context.fillStyle = "#000000";
				context.fillText(temp[iterator].label, temp[iterator].pinX - (rectWidth - 10), temp[iterator].pinY + 45);
			}
		}
		
		// Mark is in the left side
		else {
			// Mark is in the bottom
			if(temp[iterator].pinY > canvas.height/2) {
				context.fillStyle = "#FFFFFF";
				
				context.fillRect(temp[iterator].pinX + 20, temp[iterator].pinY - (rectHeight + 20), rectWidth, rectHeight);
				context.lineWidth = "5";
				context.strokeStyle = "#000000";
				context.strokeRect(temp[iterator].pinX + 20, temp[iterator].pinY - (rectHeight + 20), rectWidth, rectHeight);
				
				context.fillStyle = "#000000";
				context.fillText(temp[iterator].label, temp[iterator].pinX + 40, temp[iterator].pinY - (rectHeight - 5));
			}
			
			// Mark is in the top
			else {
				context.fillStyle = "#FFFFFF";
				context.fillRect(temp[iterator].pinX + 20, temp[iterator].pinY + 20, rectWidth, rectHeight);
				context.lineWidth = "5";
				context.strokeStyle = "#000000";
				context.strokeRect(temp[iterator].pinX + 20, temp[iterator].pinY + 20, rectWidth, rectHeight);
				
				context.fillStyle = "#000000";
				context.fillText(temp[iterator].label, temp[iterator].pinX + 40, temp[iterator].pinY + 45);
			}
		}
	}
}
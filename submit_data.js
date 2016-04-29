// Show the form area
function showForm(event) {
	// Get the position where the canvas is located
	var position = document.getElementById('mapCanvas').getBoundingClientRect();
	
	// Enable the popUpArea
	document.getElementById('popUpArea').style.display = 'block';
	document.getElementById('popUpArea').style.top = position.top + 'px';
	document.getElementById('popUpArea').style.left = position.left + 'px';
	// Set focus to the TextField		 
	document.getElementById('textField').focus();
	// Prevent loosing focus
	event.preventDefault();
}

// Save the information and hide the form area		
function saveAndHideForm(event) {
	// Set the typed information to the attribute "label" in the array
	marks[marks.length - 1].label = document.getElementById('textField').value;
	// Add a new row to the table with information get from the array
	addNewMarkRow(marks);
	
	// Disable the popUpArea
	document.getElementById('popUpArea').style.display = 'none';
	document.getElementById('textField').value = "";
}

// Handle keyboard events		
function handleKeyBoard(event) {
	var source = event.srcElement || event.target;
	
	// If the event came from the form
	if(event.keyCode == 13 && source.id == "textField") {
	   // Act like the button was pressed
		document.getElementById('submitButton').onclick;
	}
	
	// If the event came from the table
	else if(source.id == "tableLabel") {
	   var index  = getLabelIndex(source);
	   // Update the selected object in the array with the new label
	   marks[index].label = source.value;
	}
}
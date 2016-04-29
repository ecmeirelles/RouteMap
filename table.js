var table = document.getElementById("marksTable");

// Add a new row to the table
function addNewMarkRow(tableArray) {
	// Add a row in the last position
	var row = table.insertRow(-1);
	// Add 3 cells into it	
	var moveRow = row.insertCell(0);
	var labelRow = row.insertCell(1);
	var deleteRow = row.insertCell(2);
	
	// Create the up button
	var upButton = document.createElement("button");
	upButton.appendChild(document.createTextNode("Up"));
	upButton.onclick = upArrayNode;
	// Create the down button
	var downButton = document.createElement("button");
	downButton.appendChild(document.createTextNode("Down"));
	downButton.onclick = downArrayNode;
	// Add both buttons into the first cell
	moveRow.appendChild(upButton);
	moveRow.appendChild(downButton);
	
	// Create the input (TextField)
	var labelTextField = document.createElement("input");
	labelTextField.id = "tableLabel";
	labelTextField.type = "text";
	labelTextField.value = document.getElementById('textField').value;
	labelTextField.onkeyup = handleKeyBoard;
	// Create the coordinates label
	var coords = " X: " + tableArray[tableArray.length - 1].pinX + ", Y: " + tableArray[tableArray.length - 1].pinY;
	// Add everything into the second cell
	labelRow.innerHTML = "Label: "; 
	labelRow.appendChild(labelTextField);
	labelRow.appendChild(document.createTextNode(coords));
	
	// Create the delete button
	var deleteButton = document.createElement("button");
	deleteButton.appendChild(document.createTextNode("Delete"));
	deleteButton.onclick = deleteArrayNode;
	// Add it into the third cell
	deleteRow.appendChild(deleteButton);
}

// Clear the table, except for the first line (heading)
function clearTable(){
	for (var i = table.rows.length - 1; i > 0; i--) {
		table.deleteRow(i);
	}
}

// Get the index where the label is located
function getLabelIndex(source) {
	var labelValue = source.value;
	var rows = table.childNodes[1];
	
	// Start looping in the second row (the first one is the heading)	
	for(var i = 1; i < table.rows.length; i++) {
		var cells = rows.children[i];
		var labelCell = cells.childNodes[1];
		
		// If the new value of the TextField is equal to the value of the TextField
		if(labelCell.childNodes[1].value == labelValue) {
			// Then it is the selected one
			// So, return the position of that TextField in the table
			return i;
		}
	}
}

// Get the index where the delete button is located
function getDeleteButtonIndex(source) {
	var rows = table.childNodes[1];
	
	// Start looping in the second row (the first one is the heading)
	for(var i = 1; i < table.rows.length; i++) {
		var cells = rows.children[i];
		var deleteCell = cells.childNodes[2];
		
		// If the delete button is equal to the selected element
		if(deleteCell.childNodes[0] == source) {
			// Then it is the selected one
			// So, return the position of that button in the table
			return i;
		}
	}
}

// Get the index where the up/down button is located
function getUpDownButtonIndex(source) {
	var rows = table.childNodes[1];
	
	for(var i = 1; i < table.rows.length; i++) {
		var cells = rows.children[i];
		var upDownCell = cells.childNodes[0];
		
		// If the up/down button is equal to the selected element
		if(upDownCell.childNodes[0] == source || upDownCell.childNodes[1] == source) {
			// Then it is the selected one
			// So, return the position of that button in the table
			return i;
		}
	}
}

// Move the row up and update the array
function upArrayNode(event) {
	var source = event.srcElement || event.target;	
	var index = getUpDownButtonIndex(source);
	
	// If it is not in the first position
	if(index != 1) {
		// Swap the objects within the array
		var updatedMark = marks[index - 1];
		marks[index - 1] = marks[index];
		marks[index] = updatedMark;
		// Move the row up
		var mover = table.childNodes[1].children[index];
		table.childNodes[1].insertBefore(mover, mover.previousSibling);
		// Redraw the canvas
		drawMarks();
	}
}

// Move the row down and update the array
function downArrayNode(event) {
	var source = event.srcElement || event.target;	
	var index = getUpDownButtonIndex(source);
	
	// If it is not the last position
	if(index != (table.rows.length - 1)) {
		// Swap the objects within the array
		var updatedMark = marks[index + 1];
		marks[index + 1] = marks[index];
		marks[index] = updatedMark;
		// Move the row down
		var mover = table.childNodes[1].children[index];
		table.childNodes[1].insertBefore(mover.nextSibling, mover);
		// Redraw the canvas
		drawMarks();
	}
}

// Delete the row and update the array
function deleteArrayNode(event) {
	var source = event.srcElement || event.target;	
	var index = getDeleteButtonIndex(source);
	
	for(var i = 0; i < marks.length; i++){
		// If the position in the array is equal to the position of the button
		if(i == index) {
			// Delete the selected object and update the array
			marks.splice(index, 1);
			// Delete the row in the table
			table.deleteRow(index);
			// Redraw the canvas
			drawMarks();
		}
	}
}
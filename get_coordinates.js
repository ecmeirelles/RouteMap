// From quirksmode.org

// Returns added offset of all containing elements
function findPos(obj) {
	var curleft = curtop = 0;

	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);

		return [curleft,curtop];
	}
}

// Return the coordinates of the mouse relative to the canvas
function getMouseCoords(event) {
	if (!event) var event = window.event;

	var posx = 0;
	var posy = 0;
	
	if (event.pageX || event.pageY) 	{
		posx = event.pageX;
		posy = event.pageY;
	}
	
	else if (event.clientX || event.clientY) 	{
		posx = event.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		posy = event.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}

	// Get the offsets of the object that triggered the eventhandler
	var totaloffset = findPos(event.target);
	
 	var totalXoffset = totaloffset[0];
 	var totalYoffset = totaloffset[1];

 	var canvasX = posx- totalXoffset;
 	var canvasY = posy- totalYoffset;

 	// Return coordinates in an array
	return [canvasX, canvasY];
}
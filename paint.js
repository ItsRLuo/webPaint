var canvas, context, startX, endX, startY, endY;
var mouseIsDown = 0;
var shape = "triangle";
var s1,s2,s3,s4;
var w;
var h;
var offsetX;
var offsetY;
var width;
var height;
var outline_color = "black";
var fill;
var outline_width = 1;
var shapeList = [];
var newShape;
var isDrawingNow;
var background_color = "red";
var highlightedShape;
var position = [];
var s1,s2;
var copyedShape;

function Click(){
	for (var i = shapeList.length - 1; i >= 0; i--) {
		if (shapeList[i].hitTest()) {
			shapeList[i].highlighted = true;
			highlightedShape = shapeList[i];
			front(i);
			redraw();
			break;
		}
	}

	redraw();
	position = []
	
}

function front(i){
	shapeList.splice(i,1);
	shapeList.push(highlightedShape);
}

function moveTri(){
	highlightedShape.topCorner[0] = highlightedShape.topCorner[0] - (startX-endX);
	highlightedShape.leftCorner[0]= highlightedShape.leftCorner[0] - (startX-endX);
	highlightedShape.rightCorner[0]= highlightedShape.rightCorner[0] - (startX-endX);
	highlightedShape.topCorner[1] = highlightedShape.topCorner[1] - (startY-endY);
	highlightedShape.leftCorner[1]= highlightedShape.leftCorner[1] - (startY-endY);
	highlightedShape.rightCorner[1]= highlightedShape.rightCorner[1] - (startY-endY);
	startX = endX;
	startY= endY;
}
function moveLi(){
	highlightedShape.x = highlightedShape.x - (startX-endX);
	highlightedShape.y= highlightedShape.y - (startY-endY);
	highlightedShape.endX = highlightedShape.endX - (startX-endX);
	highlightedShape.endY= highlightedShape.endY - (startY-endY);
	startX = endX;
	startY= endY;
}

function moveRec(){
	highlightedShape.offsetX = highlightedShape.offsetX - (startX-endX);
	highlightedShape.offsetY= highlightedShape.offsetY - (startY-endY);
	startX = endX;
	startY= endY;
}

function copy(){
	if (highlightedShape){
		if (Rectangle == highlightedShape.constructor){
			copyedShape = new highlightedShape.constructor(highlightedShape.startX,highlightedShape.startY,highlightedShape.endX,highlightedShape.endY, outline_color, outline_width, background_color);
		}
		if (Line == highlightedShape.constructor){
			copyedShape = new highlightedShape.constructor(highlightedShape.x,highlightedShape.y,highlightedShape.dirx,highlightedShape.diry, outline_color, outline_width);
		}
		if (Triangle == highlightedShape.constructor){
			copyedShape = new highlightedShape.constructor(highlightedShape.startX,highlightedShape.startY,highlightedShape.endX,highlightedShape.endY, outline_color, outline_width, background_color);
		}
	}
}


function paste(){
	if (highlightedShape){		
		copy();
		shapeList.push(copyedShape);
		redraw();
		shape = "mouse";
	}
}

function erase(){
	if (shapeList.indexOf(highlightedShape) == -1){
		return
	}
	shapeList.splice(shapeList.indexOf(highlightedShape),1);
	highlightedShape = null;
	redraw();
}

//resizing
function resizeAdd(){
	if (highlightedShape.constructor == Triangle){
		sizeTri("b");
	}
	if (highlightedShape.constructor == Line){
		sizeLi("b");
	}
	if (highlightedShape.constructor == Rectangle){
		sizeRec("b");
	}
}
function resizeMinus(){
	if (highlightedShape.constructor == Triangle){
		sizeTri("s");
	}
	if (highlightedShape.constructor == Line){
		sizeLi("s");
	}
	if (highlightedShape.constructor == Rectangle){
		sizeRec("s");
	}
}
//size wrong
function sizeTri(option){
	if (option == "b"){	
		highlightedShape.leftCorner[0]= highlightedShape.leftCorner[0] -25;
		highlightedShape.rightCorner[0]= highlightedShape.rightCorner[0] +25;
		highlightedShape.leftCorner[1]= highlightedShape.leftCorner[1] +25;
		highlightedShape.rightCorner[1]= highlightedShape.rightCorner[1] +25;
	}
	if (option == "s"){	
		if (highlightedShape.leftCorner[1] -25 > 0 && highlightedShape.rightCorner[1] -25 >0){
			
			highlightedShape.leftCorner[0]= highlightedShape.leftCorner[0] +25;
			highlightedShape.rightCorner[0]= highlightedShape.rightCorner[0] -25;
			highlightedShape.leftCorner[1]= highlightedShape.leftCorner[1] -25;
			highlightedShape.rightCorner[1]= highlightedShape.rightCorner[1] -25;
		}
	}	
	redraw();
}
//not done
function sizeLi(){
	highlightedShape.dirx = highlightedShape.dirx + 25;
	redraw();
}

function sizeRec(){
	highlightedShape.width = highlightedShape.width + (25);
	highlightedShape.height= highlightedShape.height + (25);
	redraw();
}

	
// RECTANGLE ===========================================================

function Rectangle(startX, startY, endX, endY, outline_color, outline_width, background_color) {
	
	// width, height, x, y, outline_color, borderwidth, background_color
    w = endX - startX;
   	h = endY - startY;
    this.offsetX = (w < 0) ? w : 0;
    this.offsetY = (h < 0) ? h : 0;
    this.offsetX = this.offsetX + startX;
    this.offsetY = this.offsetY + startY;
    
    this.highlighted = false;


    this.width = Math.abs(w);
    this.height = Math.abs(h);
    shape = "rec";
	
	this.outline_color = outline_color;
	this.outline_width = outline_width;
	this.background_color = background_color;
	
	this.startX = startX;
	this.startY = startY;
	this.endX = endX;
	this.endY = endY;
}

Rectangle.prototype.draw = function() {
		context.beginPath();
    context.rect(this.offsetX, this.offsetY, this.width,this.height );
    context.fillStyle = this.background_color;
    context.fill();
	
	// Border colour
	
	if (this.highlighted) {
		  context.lineWidth = Math.max(this.outline_width, 10);
    	context.strokeStyle = "#00FF00";	
    	context.stroke();
	}
	
	else if (this.outline_width > 0) {
		context.strokeStyle = this.outline_color;
		context.lineWidth = this.outline_width;
		context.stroke();
	}

};

Rectangle.prototype.hitTest = function() {
	return startX >= this.offsetX && startX <= this.offsetX + this.width && startY >= this.offsetY && startY <= this.offsetY + this.height;
}

// TRIANGLE ===========================================================

function Triangle(startX, startY, endX, endY, outline_color, outline_width, background_color) {
	this.highlighted = false;
	this.startX = startX;
	this.startY = startY;
	this.endX = endX;
	this.endY = endY;
	// Drag from lower-left corner
	if (startX < endX && startY > endY) {
		this.topCorner = [Math.floor((endX + startX) / 2), endY];
		this.leftCorner = [startX, startY];
		this.rightCorner = [endX, startY];
	}

	// Draw from upper-left corner
	else if (startX < endX && startY < endY) {
		this.topCorner = [Math.floor((endX + startX) / 2), startY];
		this.leftCorner = [startX, endY];
		this.rightCorner = [endX, endY];
	}
	
	// Draw from lower-right corner
	else if (startX > endX && startY > endY) {
		this.topCorner = [Math.floor((startX + endX) / 2), endY];
		this.leftCorner = [endX, startY];
		this.rightCorner = [startX, startY];
	}
	
	// Draw from upper-right corner
	else if (startX > endX && startY < endY) {
		this.topCorner = [Math.floor((startX + endX) / 2), startY];
		this.leftCorner = [endX, endY];
		this.rightCorner = [startX, endY];
	}

	this.outline_color = outline_color;
	this.outline_width = outline_width;
	this.background_color = background_color;

}

Triangle.prototype.draw = function() {

	// Get the fill color and border color;
	context.fillStyle = this.background_color;

	context.beginPath();
	context.moveTo(this.topCorner[0], this.topCorner[1]);
	context.lineTo(this.leftCorner[0], this.leftCorner[1]);
	context.lineTo(this.rightCorner[0], this.rightCorner[1]);
	context.lineTo(this.topCorner[0], this.topCorner[1]);
	context.closePath();
	
	if (this.highlighted) {
		  context.lineWidth = Math.max(this.outline_width, 10);
    	context.strokeStyle = "#00FF00";	
    	context.stroke();
	}
	
	if (this.outline_width > 0) {
		context.strokeStyle = this.outline_color;
		context.lineWidth = this.outline_width;
		context.stroke();
	}
	
	context.fill();
	
};
var alpha,beta,gamma;
Triangle.prototype.hitTest = function() {
	var p1x = this.topCorner[0]; 
	var p1y = this.topCorner[1];
	var p2x = this.leftCorner[0];
	var p2y = this.leftCorner[1];
	var p3x = this.rightCorner[0];
	var p3y = this.rightCorner[1];
	var px = position[0];
	var py = position[1];
	p2x = p2x - p1x;
	p2y = p2y - p1y;
	px = px - p1x;
	py = py - p1y;
	p3x = p3x - p1x;
	p3y = p3y - p1y;
	var scalar = p2x*p3y - p3x*p2y;
	alpha = px*(p2y-p3y) + py*(p3x - p2x) + p2x*p3y - p3x*p2y;
	beta = px*p3y - py*p3x;
	gamma = py*p2x- px*p2y;
	alpha = alpha / scalar;
	beta = beta / scalar;
	gamma = gamma/ scalar;
	return gamma >0 && alpha > 0 && beta > 0;	
}


// LINE ===========================================================

function Line(x, y, dirx, diry, outline_color, borderwidth) {
	
	// x, y, dirx, diry, outline_color, borderwidth
	var x, y, dirx, diry, outline_color, borderwidth;
	
	this.x = x;
	this.y = y;
	this.dirx = dirx;
	this.diry = diry;
	this.outline_color = outline_color;
	this.outline_width = outline_width;
	//get a reference to the canvas
	
	this.startX = startX;
	this.startY = startY;
	this.endX = endX;
	this.endY = endY;
	this.highlighted = false;
}

Line.prototype.draw = function() {
	
	context.lineWidth = this.outline_width;
	context.beginPath();
	context.moveTo(this.x, this.y);
	context.lineTo(this.dirx + this.x, this.diry + this.y);
	context.strokeStyle = this.outline_color;	
	context.stroke();
	if (this.highlighted) {
		  context.lineWidth = Math.max(this.outline_width, 10);
    	context.strokeStyle = "#00FF00";	
    	context.stroke();
	}
}

Line.prototype.hitTest = function(){
	ax = this.x;
	ay = this.y;
	bx = this.x + this.dirx;
	by = this.y + this.diry;
	cx = position[0];
	cy = position[1];
	ab = Math.sqrt(Math.pow(ax-bx,2) + Math.pow(ay-by,2));
  ac = Math.sqrt(Math.pow(ax-cx,2) + Math.pow(ay-cy,2));
  bc = Math.sqrt(Math.pow(bx-cx,2) + Math.pow(by-cy,2));
  return (Math.floor(ac+bc) == Math.floor(ab));
}

// HELPER FUNCTIONS =========================================================

function clearscr() {
	context.clearRect(0,0, canvas.width, canvas.height);
	shapeList = [];
	startX = 0;
	startY = 0;
	endX = 0;
	endY = 0;
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function redraw() {
	context.clearRect(0, 0, canvas.width, canvas.height);	
	for (var i = 0; i < shapeList.length; i++) {
		shapeList[i].draw();
	}
	
	//-------Backwards
	//for (var i = shapeList.length - 1; i >= 0; i--){
	//	shapeList[i][4].draw();
	//}

}

// MOUSE LISTENER EVENTS

function mouseUp(eve) {

    if (mouseIsDown == 1) {
        mouseIsDown = 0;
        var pos = getMousePos(canvas, eve);
        endX = pos.x;
        endY = pos.y;
    }
	
	if (newShape) {
		if (isDrawingNow == 1){
			newShape.draw();
			shapeList.push(newShape); 
			isDrawingNow = 0;
		}
	}
	isDrawingNow = 0;
}

function mouseDown(eve) {
    s1 = startX;
    var pos = getMousePos(canvas, eve);
    startX = endX = pos.x;
    startY = endY = pos.y;

	mouseIsDown = 1;
	if (shape != "mouse"){
		isDrawingNow = 1;
		
	}
	
  if (highlightedShape) {
		highlightedShape.highlighted = false;	
		highlightedShape = null;
		redraw();
	}
	if (shape == "mouse") {
		position.push(startX, startY, endX, endY);
		Click();
	}
	
	
}

function mouseXY(eve) {

	if (mouseIsDown == 1) {
		var pos = getMousePos(canvas, eve);
		endX = pos.x;
		endY = pos.y;
		redraw();
				//something wrong
		if (shape == ""){
			shapeList = [];
			startX = 0;
			startY = 0;
			endX = 0;
			endY = 0;
		}
		// Draws(shape);
		if (shape == "mouse"){
			if (highlightedShape){
				if (highlightedShape.constructor == Triangle){
				moveTri();
				}
				if (highlightedShape.constructor == Line){
				moveLi();
				}
				if (highlightedShape.constructor == Rectangle){
				moveRec();
				}
			}
		}
		if (isDrawingNow == 1 && startX != endX && startY != endY) {
			if (shape == "line" ){
				if (outline_width > 0) {
					newShape = new Line(startX, startY, endX - startX, endY - startY, outline_color, outline_width);
					newShape.draw();
				} else {
					alert("Can't draw a width-less line!");
					
					mouseI
				}
			}
			
			else if (shape == "triangle") {
				newShape = new Triangle(startX, startY, endX, endY, outline_color, outline_width, background_color);
				newShape.draw();
			}
			
			else if (shape == "rec"){
				newShape = new Rectangle(startX, startY, endX, endY, outline_color, outline_width, background_color);
				newShape.draw();
			}
		}
	}
  

	


}

// ----------------------------- INITIALIZE -----------------------------

window.onload = init;

function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
	canvas.width = 862;
	canvas.height = 400;
    canvas.addEventListener("mousedown", mouseDown, false);
    canvas.addEventListener("mousemove", mouseXY, false);
    canvas.addEventListener("mouseup", mouseUp, false);
	
	// Currently active option.
	$("#triangleButton").css("background-color", "red");

	// Set button links.
	$("#lineButton").click(function() { 
		shape = "line"; 
		$("#tools button").css("background-color", "green");
		$("#lineButton").css("background-color", "red");
	});
	
	$("#triangleButton").click(function() { 
		shape = "triangle"; 
		$("#tools button").css("background-color", "green");
		$("#triangleButton").css("background-color", "red");
	});
	
	$("#rectangleButton").click(function() { 
		shape = "rec"; 
		$("#tools button").css("background-color", "green");
		$("#rectangleButton").css("background-color", "red");
	});
	
	$("#mouseButton").click(function() {
		shape = "mouse"; 
		$("#tools button").css("background-color", "green");
		$("#mouseButton").css("background-color", "red");
	});
	
	$("#clearButton").click(clearscr);
	
	$("#outlineWidthInput").change(function() {
		var newVal = parseInt($(this).val());
		if (isInt(newVal)) {
			outline_width = newVal;
			$(this).val(newVal);
			
			if (highlightedShape) {
				highlightedShape.outline_width = outline_width;
				redraw();
			}
			
		} else {
			alert("NOT AN INTEGER!");
			$(this).val(outline_width);
		}
	});
	
	$("#fillColorMenu").change(function() {
		background_color = $(this).val();
		if (highlightedShape && highlightedShape.type != "line") {
			highlightedShape.background_color = background_color;
			redraw();
		}
	});
	
	$("#outlineColorMenu").change(function() {
		outline_color = $(this).val();
		if (highlightedShape) {
			highlightedShape.outline_color = outline_color;
			redraw();
		}
	});
	
	$("#copyButton").click(copy);
	$("#pasteButton").click(paste);
	$("#eraseButton").click(erase);
	
	$("#resizeAddButton").click(resizeAdd);
	$("#resizeMinusButton").click(resizeMinus);
}

function isInt(n) {
	return typeof n === 'number' && n % 1 == 0;
}

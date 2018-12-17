// Implementing the Circle Class
var Circle = function (center, radius, fix = 1) {
	
	// Inherit from RigidBase Class
	RigidShape.call(this, center);
	
	this.mType = "Circle";
	this.mRadius = radius;
	this.mBoundRadius = radius;
	//this.mFix = fix;
	//The start point of line in the circumference of circle
	//This.line remains verticallyTop at zero rotation
	this.mStartPoint = new Vec2(center.x, center.y - radius);

};

//Ensuring proper Inheritance from RigidShape class
var prototype = Object.create(RigidShape.prototype);
prototype.constructor = Circle;
Circle.prototype = prototype;

//Implementing the Drawing method
Circle.prototype.draw = function (context) {

	context.beginPath();

	//draw a circle
	context.arc(this.mCenter.x, this.mCenter.y, 
		this.mRadius, 0, Math.PI * 2, true);

	//draw a line from start point to the center
	context.moveTo(this.mStartPoint.x, this.mStartPoint.y);
	context.lineTo(this.mCenter.x, this.mCenter.y);
	
	context.closePath();
	context.stroke();
};

//Moves the Objects in the <s>(Vec2) direction by its magnitude 
Circle.prototype.move = function (s) {
	this.mStartPoint = this.mStartPoint.add(s);
	this.mCenter = this.mCenter.add(s);
	return this;
};

// Rotates the circle anti clockwise in <angle> radians
Circle.prototype.rotate = function (angle) {
	this.mAngle += angle;
	this.mStartPoint = this.mStartPoint.rotate(this.mCenter, angle); 
	return this;
};
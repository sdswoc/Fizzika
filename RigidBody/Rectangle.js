//Implementing the Rectangle Class
var Rectangle = function (center, width, height) {
	
	//Inherit from RigidShape class
	RigidShape.call(this, center);
	
	this.mType = "Rectangle";
	this.mWidth = width;
	this.mHeight = height;
	this.mVertex = [];
	this.mFaceNormal = [];

	//Computing the vertex position 
	//TopLeft
	this.mVertex[0] = new Vec2( center.x - this.mWidth / 2,
		center.y - this.mHeight / 2 );
	//TopRight
	this.mVertex[1] = new Vec2( center.x + this.mWidth / 2,
		center.y - this.mHeight / 2 );
	//BottomRight
	this.mVertex[2] = new Vec2( center.x + this.mWidth / 2,
		center.y + this.mHeight / 2 );
	//BottomLeft
	this.mVertex[3] = new Vec2( center.x - this.mWidth / 2,
		center.y + this.mHeight / 2 );
	
	//Computing the Face Normals
	// Top , Right , Bottom , Left
	this.mFaceNormal[0] = this.mVertex[1].subtract(this.mVertex[2]);
	this.mFaceNormal[0] = this.mFaceNormal[0].normalize();
	this.mFaceNormal[1] = this.mVertex[2].subtract(this.mVertex[3]);
	this.mFaceNormal[1] = this.mFaceNormal[1].normalize();
	this.mFaceNormal[2] = this.mVertex[3].subtract(this.mVertex[0]);
	this.mFaceNormal[2] = this.mFaceNormal[2].normalize();
	this.mFaceNormal[3] = this.mVertex[0].subtract(this.mVertex[1]);
	this.mFaceNormal[3] = this.mFaceNormal[3].normalize();
};

//Ensuring that Rectangle class inherits properly
//from the RigidShape
var prototype = Object.create(RigidShape.prototype);
prototype.constructor = Rectangle;
Rectangle.prototype = prototype;

//Implementing the drawing method
Rectangle.prototype.draw = function (context) {
	context.save();
	context.translate(this.mVertex[0].x, this.mVertex[0].y);
	context.rotate(this.mAngle);
	context.strokeRect(0, 0, this.mWidth, this.mHeight);
	context.restore();
};
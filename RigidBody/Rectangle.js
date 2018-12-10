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
	this.mVertex[0] = new Vec2( center.x - this.width / 2,
		center.y - this.height / 2 );
	//TopRight
	this.mVertex[0] = new Vec2( center.x + this.width / 2,
		center.y - this.height / 2 );
	//BottomRight
	this.mVertex[0] = new Vec2( center.x + this.width / 2,
		center.y + this.height / 2 );
	//BottomLeft
	this.mVertex[0] = new Vec2( center.x - this.width / 2,
		center.y + this.height / 2 );
	
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
prototype.contructor = Rectangle;
Rectangle.prototype = prototype;

Rectangle.prototype.draw = function (context) {
	context.save();
	context.translate(this.mVertex[0].x, this.mVertex[0].y);
	context.rotate(this.mAngle);
	context.strokeRect(0, 0, this.mWidth, this.mHeight);
	context.restore();
};
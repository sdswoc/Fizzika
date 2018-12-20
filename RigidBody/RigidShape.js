
// The Rigid Shape Class
function RigidShape(center) {
	this.mCenter = center;
	this.mAngle = 0;
	this.mBoundRadius = 0;
	gEngine.Core.mAllObjects.push(this);
}

//Update the parameters
RigidShape.prototype.update = function (){
	// if(this.mCenter.y < gEngine.Core.mHeight && this.mFix != 0)
	// 	this.move((new Vec2(0, 1)));
};
RigidShape.prototype.boundTest = function(otherShape){
	let vFrom1to2 = otherShape.mCenter.subtract(this.mCenter);
	let rSum = this.mBoundRadius + otherShape.mBoundRadius;
	let dist = vFrom1to2.length();
	//Bounding Circles donot overlap
	if(dist > rSum){
		return false;
	}
	return true;
};

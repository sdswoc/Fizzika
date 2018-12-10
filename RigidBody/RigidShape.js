function RigidShape(center) {
	this.mCenter = center;
	this.mAngle = 0;
	gEngine.Core.mAllObjects.push(this);
}
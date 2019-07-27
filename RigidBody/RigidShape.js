
// The Rigid Shape Class
function RigidShape(center, mass = 1, friction = 0.8, restitution = 0.5) {
	this.mCenter = center;
	this.mInertia = 0;
	this.mInvMass = mass;
	this.mFriction = friction;
	this.mRestitution = restitution;

	this.mVelocity = new Vec2(0, 0);

	if(this.mInvMass != 0) {
		this.mInvMass = 1 / this.mInvMass;
		this.mAcceleration = gEngine.Core.mGravity;
	}
	else{
		//Represents a fixed Object
		this.mAcceleration = new Vec2(0, 0);
	}

	this.mAngle = 0;
	this.mAngularVelocity = 0;
	this.mAngularAcceleration = 0;

	this.mBoundRadius = 0;

	gEngine.Core.mAllObjects.push(this);
}

//Update the parameters
RigidShape.prototype.update = function (){
	if(gEngine.Core.mMovement){
		let dt = gEngine.Core.mUpdateIntervalInSeconds;
		//v +=  a * dt
		this.mVelocity = this.mVelocity.add(this.mAcceleration.scale(dt));
		//s += v * dt
		this.move(this.mVelocity.scale(dt));

		this.mAngularVelocity += this.mAngularAcceleration * dt;
		this.rotate(this.mAngularVelocity * dt);
	}

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
RigidShape.prototype.updateMass = function (delta) {
	let mass;
	if(this.mInvMass != 0) mass = 1 / this.mInvMass;
	else mass = 0;

	mass += delta;
	if (mass <= 0) {
		this.mInvMass = 0;
		this.mVelocity = new Vec2(0, 0);
		this.mAcceleration = new Vec2(0, 0);
		this.mAngularVelocity = 0;
		this.mAngularAcceleration = 0;
	}else{
		this.mInvMass =  1 / mass;
		this.mAcceleration = gEngine.Core.mGravity;
	}
	this.updateInertia();
};
RigidShape.prototype.updateInertia = function () {

};

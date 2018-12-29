//The Global Engine Object
var gEngine = gEngine || {};

gEngine.Physics = ( function (){
	var mPositionalCorrectionFlag = true;
	var mRelaxationCount = 15;
	var mPosCorrectionRate = 0.8;
	var collision =  function () {

		let allObjects = gEngine.Core.mAllObjects;
		let collisionInfo = new CollisionInfo();

		//Test each Pair of Objects for Collision
		for(let k = 0; k < mRelaxationCount; k++){
			for(let i = 0; i < allObjects.length; i++){
				for(let j = i + 1; j < allObjects.length; j++){
					if(allObjects[i].boundTest(allObjects[j])){

						// //Draw the colliding Objects in Green
						 let context = gEngine.Core.mContext;
						// context.strokeStyle = "green";
						// allObjects[i].draw(context);
						// allObjects[j].draw(context);

						//Narrow Phase Collsion Detection
						if(allObjects[i].collisionTest(allObjects[j], collisionInfo)){
							let vFromitoj = allObjects[j].mCenter.subtract(allObjects[i].mCenter);

							//Normal always points towards the other object
							if(collisionInfo.getNormal().dot(vFromitoj) < 0){
								collisionInfo.changeDir();
							}
							//draw Collsion Information
							//drawCollisionInfo(collisionInfo,context);
							//Resolve Collision
							resolveCollision(allObjects[i], allObjects[j], collisionInfo);
						}
					}
				}
			}
		}
	};
	var drawCollisionInfo = function ( collisionInfo, context) {
		context.beginPath();
		context.moveTo(collisionInfo.mStart.x, collisionInfo.mStart.y);
		context.lineTo(collisionInfo.mEnd.x, collisionInfo.mEnd.y);
		context.closePath();
		context.strokeStyle = "orange";
		context.stroke();
	};

	var positionalCorrection = function ( s1, s2, collisionInfo) {
		let s1InvMass = s1.mInvMass;
		let s2InvMass = s2.mInvMass;

		let num = collisionInfo.getDepth()/ (s1InvMass + s2InvMass) * mPosCorrectionRate;
		let correctionAmount = collisionInfo.getNormal().scale(num);

		s1.move(correctionAmount.scale(-s1InvMass));
		s2.move(correctionAmount.scale(s2InvMass));
	};
	var resolveCollision = function (s1, s2, collisionInfo) {
		if((s1.mInvMass == 0) && (s2.mInvMass ==0))return;
		//Correct Positions
		if(gEngine.Physics.mPositionalCorrectionFlag)
			positionalCorrection(s1, s2, collisionInfo);

		let n = collisionInfo.getNormal();

		// //start = start * m1/(m1 + m2)
		// let start = collisionInfo.mStart.scale(s2.mInvMass/(s1.mInvMass + s2.mInvMass));
		// let end = collisionInfo.mEnd.scale(s1.mInvMass/(s1.mInvMass + s2.mInvMass));
		// let p = start.add(end);
		// // r is the vector from center of shape to collision points
		// let r1 = p.subtract(s1.mCenter);
		// let r2 = p.subtract(s2.mCenter);
		//
		//
		let v1 = s1.mVelocity;
		let v2 = s2.mVelocity;
		let relativeVelocity = v2.subtract(v1);

		let rVelocityInNormal = relativeVelocity.dot(n);

		//if objects moving apart then ignore
		if(rVelocityInNormal > 0) return;

		let newRestitution = Math.min(s1.mRestitution, s2.mRestitution);
		let newFriction = Math.min(s1.mFriction, s2.mFriction);

		//Impulse Calculation
		let jN = -(1 + newRestitution) * rVelocityInNormal;
		jN = jN / (s1.mInvMass + s2.mInvMass);

		//Impulse is from s1 to s2
		let impulse = n.scale(jN);
		//delV = Impulse / m
		s1.mVelocity = s1.mVelocity.subtract(impulse.scale(s1.mInvMass));
		s2.mVelocity = s2.mVelocity.add(impulse.scale(s2.mInvMass));

		//Tangential Component V - (V.N)n = (V.T)t
		let tangent = relativeVelocity.subtract(n.scale(relativeVelocity.dot(n)));
		//V.T should be less than zero
		tangent = tangent.normalize().scale(-1);

		//Tangential Impulse
		let jT = -(1 + newRestitution) * relativeVelocity.dot(tangent) * newFriction;
		jT = jT / (s1.mInvMass + s2.mInvMass);
	 	// Tangential impulse should be less than normal
		if(jT > jN) jT = jN;
		//Impulse is from s1 to s2 opposite to relative Velocity
		impulse = tangent.scale(jT);

		s1.mVelocity = s1.mVelocity.subtract(impulse.scale(s1.mInvMass));
		s2.mVelocity = s2.mVelocity.add(impulse.scale(s2.mInvMass));
	};
	var mPublic = {
		collision : collision,
		mPositionalCorrectionFlag : mPositionalCorrectionFlag
	};
	return mPublic;
}());

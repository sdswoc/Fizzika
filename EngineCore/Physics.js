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
							drawCollisionInfo(collisionInfo,context);
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
	};
	var mPublic = {
		collision : collision,
		mPositionalCorrectionFlag : mPositionalCorrectionFlag
	};
	return mPublic;
}());

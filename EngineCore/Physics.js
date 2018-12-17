//The Global Engine Object
var gEngine = gEngine || {};

gEngine.Physics = ( function (){

	var collision =  function () {

		let allObjects = gEngine.Core.mAllObjects;
		let collisionInfo = new CollisionInfo();

		//Test each Pair of Objects for Collision
		for(let i = 5; i < allObjects.length; i++){
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

	var mPublic = {
		collision : collision,
	};
	return mPublic;
}());

//The Global Engine Object
var gEngine = gEngine || {};

gEngine.Physics = ( function (){

	var collision =  function () {

		let allObjects = gEngine.Core.mAllObjects;
		//Test each Pair of Objects for Collision
		for(let i = 5; i < allObjects.length; i++){
			for(let j = i + 1; j < allObjects.length; j++){
				if(allObjects[i].boundTest(allObjects[j])){
					//Draw the colliding Objects in Green
					let context = gEngine.Core.mContext;
					context.strokeStyle = "green";
					allObjects[i].draw(context);
					allObjects[j].draw(context);
				}
			}
		}
	};


	var mPublic = {
		collision : collision,
	};
	return mPublic;
}());
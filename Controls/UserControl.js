// Represents the index of currently selected object
var gObjectNum = 0; 

const Keys = {
	//Select
	LEFT : 37,
	UP : 38,
	RIGHT : 39,
	DOWN : 40,
	//Move
	W : 87,
	A : 65,
	S : 83,
	D : 68,
	//Spawn
	F : 70,
	G : 71,
	//Rotate
	Q : 81,
	E : 69,
	//Toggle Gravity
	H : 72,
	//Reset Scene
	R : 82,
}
//Keyboard Control
function userControl(event){
	var keycode;
	//IE event
	if(window.event){
		keycode = event.keyCode;
	}
	// Netscape/Firefox/Opera
	else if(event.which){
		keycode = event.which;
	}

	//Parameters of the Canvas
	var width = gEngine.Core.mWidth;
	var height = gEngine.Core.mHeight;
	var context = gEngine.Core.mContext;

	const mDisplacement = 10;
	const mAngle = 0.1;
	//Move
	if(keycode  == Keys.W){
		gEngine.Core.mAllObjects[gObjectNum].move(new Vec2(0, -mDisplacement));
	}
	if(keycode  == Keys.S){
		gEngine.Core.mAllObjects[gObjectNum].move(new Vec2(0, mDisplacement));
	}
	if(keycode  == Keys.A){
		gEngine.Core.mAllObjects[gObjectNum].move(new Vec2(-mDisplacement, 0));
	}
	if(keycode  == Keys.D){
		gEngine.Core.mAllObjects[gObjectNum].move(new Vec2(mDisplacement, 0));
	}

	//Rotate
	if (keycode === Keys.Q) { 
		gEngine.Core.mAllObjects[gObjectNum].rotate(-mAngle);
	}
	if (keycode === Keys.E) { 
		gEngine.Core.mAllObjects[gObjectNum].rotate(mAngle);
	}

	//Toggle Gravity
	if (keycode === Keys.H) { 
		if(gEngine.Core.mAllObjects[gObjectNum].mFix === 0)
		gEngine.Core.mAllObjects[gObjectNum].mFix = 1;
		else gEngine.Core.mAllObjects[gObjectNum].mFix = 0;
	}
	//Reset the Scene
	if (keycode == Keys.R) {
		gEngine.Core.mAllObjects.splice(5, gEngine.Core.mAllObjects.length);
		gObjectNum = 0;
	}
	//Spawn Rectangle
	if(keycode == Keys.F){ 
		let pos = gEngine.Core.mAllObjects[gObjectNum].mCenter;
		var r1 = new Rectangle(pos, 
				Math.random() * 30 + 10,
				Math.random() * 30 + 10);
	}
	//Spawn Circle
	if(keycode == Keys.G){ 
		let pos = gEngine.Core.mAllObjects[gObjectNum].mCenter;
		var r1 = new Circle(pos, Math.random() * 10 + 20);
	}
	//Numeric Keys 0 - 9	
	if(keycode >=48 && keycode <=57){
		if(keycode - 48 < gEngine.Core.mAllObjects.length)
			gObjectNum = keycode - 48;
	}
	//up arrow
	if(keycode == Keys.UP) { 
		if(gObjectNum > 0)
			gObjectNum--;
	}
	 //down arrow
	if(keycode == Keys.DOWN){
		if(gObjectNum < gEngine.Core.mAllObjects.length - 1)
			gObjectNum++;
	}

}	
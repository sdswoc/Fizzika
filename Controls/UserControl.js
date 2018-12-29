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

	//Excite all Objects
	if (keycode === Keys.H) {
		var i;
		for (i = 0; i < gEngine.Core.mAllObjects.length; i++) {
			if (gEngine.Core.mAllObjects[i].mInvMass !== 0)
				gEngine.Core.mAllObjects[i].mVelocity = new Vec2(Math.random() * 500 - 250, Math.random() * 500 - 250);
			}
	}
	//Reset the Scene
	if (keycode == Keys.R) {
		gEngine.Core.mAllObjects.splice(8, gEngine.Core.mAllObjects.length);
		gObjectNum = 0;
	}
	//Spawn Rectangle
	if(keycode == Keys.F){
		let pos = gEngine.Core.mAllObjects[gObjectNum].mCenter;
		//let pos = new Vec2(100,100);
		var r1 = new Rectangle(pos,
				Math.random() * 30 + 10,
				Math.random() * 30 + 10,
				Math.random() * 30, Math.random(), Math.random());
		r1.mVelocity = new Vec2(Math.random() * 300 - 150, Math.random() * 300 - 15);
	}
	//Spawn Circle
	if(keycode == Keys.G){
		let pos = gEngine.Core.mAllObjects[gObjectNum].mCenter;
	//let pos = new Vec2(100,100);
		var r1 = new Circle(pos, Math.random() * 10 + 20,
							Math.random() * 30, Math.random(), Math.random());
		r1.mVelocity = new Vec2(Math.random() * 300 - 150, Math.random() * 300 - 150);
	}
	if (keycode == 73) //I
		gEngine.Core.mAllObjects[gObjectNum].mVelocity.y -= 1;
	if (keycode == 75) //k
		gEngine.Core.mAllObjects[gObjectNum].mVelocity.y += 1;
	if (keycode == 74) //j
		gEngine.Core.mAllObjects[gObjectNum].mVelocity.x -= 1;
	if (keycode == 76) //l
		gEngine.Core.mAllObjects[gObjectNum].mVelocity.x += 1;
	if (keycode == 85) //U
		gEngine.Core.mAllObjects[gObjectNum].mAngularVelocity -= 0.1;
	if (keycode == 79) //O
		gEngine.Core.mAllObjects[gObjectNum].mAngularVelocity += 0.1;
	if (keycode == 90) //Z
		gEngine.Core.mAllObjects[gObjectNum].updateMass(-1);
	if (keycode == 88) //X
		gEngine.Core.mAllObjects[gObjectNum].updateMass(1);
	if (keycode == 67) //C
		gEngine.Core.mAllObjects[gObjectNum].mFriction -= 0.01;
	if (keycode == 86) //V
		gEngine.Core.mAllObjects[gObjectNum].mFriction += 0.01;
	if (keycode == 66) //B
		gEngine.Core.mAllObjects[gObjectNum].mRestitution -= 0.01;
	if (keycode == 78) //N
		gEngine.Core.mAllObjects[gObjectNum].mRestitution += 0.01;
	if (keycode === 77) {
    //M
    gEngine.Physics.mPositionalCorrectionFlag = !gEngine.Physics.mPositionalCorrectionFlag;
  }
	if (keycode == 188){ //’
		gEngine.Core.mMovement = !gEngine.Core.mMovement;
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

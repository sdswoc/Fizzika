//g followed by variable name represents global variable
//m followed by variable name represents instance variable

//Represents the global Engine Object
var gEngine = gEngine || {};

//Core method of the Engine
//returns an objects containing important paramters
gEngine.Core = (function (){

	//Canvas parameters
	var mCanvas, mContext, mWidth = 800, mHeight = 490;
	mCanvas = document.getElementById("canvas");
	mContext = mCanvas.getContext("2d");
	mCanvas.width = mWidth;
	mCanvas.height = mHeight;

	//Parameters for Game loop
	var mCurrentTime, mElapsedTime, mPreviousTime = Date.now(),
	mLagTime = 0;
	var kFPS = 60; // Frames Per Second
	var kFrameTime = 1 / kFPS;
	var mUpdateIntervalInSeconds = kFrameTime;
	var kMPF = 1000 * kFrameTime; //Milliseconds per frame


	//Stores all the Objects in the scene
	var mAllObjects = [];

	var mGravity = new Vec2(0, 10);
	var mMovement = false;

	//Draws all the objects in the scene
	var draw = function () {
		mContext.clearRect(0, 0, mWidth, mHeight);
		var i;
		for(i = 0; i < mAllObjects.length; i++){
			mContext.strokeStyle = 'blue';
			if( i == gObjectNum)
				mContext.strokeStyle = 'red';
			mAllObjects[i].draw(mContext);
		}
	};

	var update = function () {
		var i;
		for( i = 0; i < mAllObjects.length; i++){
			mAllObjects[i].update(mContext);
		}
	};

	//Displays parameters of the selected object in the Scene
	var updateUIEcho = function () {
		document.getElementById("uiEchoString").innerHTML =

			 "<p><b>FPS:</b>" + Math.round(1000 / mElapsedTime) +
			"<p><b>All Objects:</b>" + mAllObjects.length +
			"<p><b>Selected Object:</b>:</p>" +
			"<ul style=\"margin:-10px\">" +
			"<li>Id: " + gObjectNum + "</li>" +
			"<li>Center: " + mAllObjects[gObjectNum].mCenter.x.toPrecision(3) +
			"," + mAllObjects[gObjectNum].mCenter.y.toPrecision(3) + "</li>" +
			"<li>Angle: " + mAllObjects[gObjectNum].mAngle.toPrecision(3) + "</li>" +
			"<li>Velocity: " + mAllObjects[gObjectNum].mVelocity.x.toPrecision(3) +
			"," + mAllObjects[gObjectNum].mVelocity.y.toPrecision(3) + "</li>" +
			"<li>AngluarVelocity: " + mAllObjects[gObjectNum].mAngularVelocity.
			toPrecision(3) + "</li>" +
			"<li>Mass: " + 1 / mAllObjects[gObjectNum].mInvMass.toPrecision(3) +
			"</li>" +
			"<li>Inertia: " +  mAllObjects[gObjectNum].mInertia.toPrecision(3) +
			"</li>" +
			"<li>Friction: " + mAllObjects[gObjectNum].mFriction.toPrecision(3) +
			"</li>" +
			"<li>Restitution: " + mAllObjects[gObjectNum].mRestitution.
			toPrecision(3) + "</li>" +
			"<li>Movement: " + gEngine.Core.mMovement + "</li>" +
			"</ul> <hr>" +
			"<p><b>Control</b>: of selected object</p>" +
			"<ul style=\"margin:-10px\">" +
			"<li><b>Num</b> or <b>Up/Down Arrow</b>: Select Object</li>" +
			"<li><b>WASD</b> + <b>QE</b>: Position [Move + Rotate]</li>" +
			"<li><b>IJKL</b> + <b>UO</b>: Velocities [Linear + Angular]</li>" +
			"<li><b>Z/X</b>: Mass [Decrease/Increase]</li>" +
			"<li><b>C/V</b>: Frictrion [Decrease/Increase]</li>" +
			"<li><b>B/N</b>: Restitution [Decrease/Increase]</li>" +
			"<li><b>M</b>: Positional Correction [On/Off]</li>" +
			"<li><b>,</b>: Movement [On/Off]</li>" +
			"</ul> <hr>" +
			"<b>F/G</b>: Spawn [Rectangle/Circle] at selected object" +
			"<p><b>H</b>: Excite all objects</p>" +
			"<p><b>R</b>: Reset System</p>" +
			"<hr>";
	};

	//The Game Loop
	var runGameLoop = function () {
		requestAnimationFrame(function () {
			runGameLoop();
		});
		//Computing the Elapsed time from the previous loop
		mCurrentTime = Date.now();
		mElapsedTime = mCurrentTime - mPreviousTime;
		mPreviousTime = mCurrentTime;
		mLagTime += mElapsedTime;

		draw();
		updateUIEcho();

		//Update the game appropriate number of times
		//Update only every Milliseconds per frame
		//if lag greater than update frames, update until caught up
		//ensures that the update remains consistent if even the frame drops
		while(mLagTime >= kMPF){
			mLagTime -= kMPF;
			gEngine.Physics.collision();
			update();
		}

	};
	//Initialises the Game Loop
	var initializeEngineCore = function () {
		runGameLoop();
	};

	//Object containing imporatnt variables and methods
	var mPublic = {
		initializeEngineCore : initializeEngineCore,
		mAllObjects : mAllObjects,
		mWidth : mWidth,
		mHeight : mHeight,
		mContext : mContext,
		mGravity : mGravity,
		mUpdateIntervalInSeconds : mUpdateIntervalInSeconds,
		mMovement : mMovement
	};


	return mPublic;

}());

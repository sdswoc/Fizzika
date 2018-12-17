//g followed by variable name represents global variable
//m followed by variable name represents instance variable

//Represents the global Engine Object
var gEngine = gEngine || {};

//Core method of the Engine
//returns an objects containing important paramters
gEngine.Core = (function (){

	//Canvas parameters
	var mCanvas, mContext, mWidth = 800, mHeight = 450;
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
			"<p> <b> Selected Object: </b> </p>" +
				"<ul style = \"margin : 10px\" >" +
				"<li> Id: " + gObjectNum + "</li>" +
				"<li> Center: " + mAllObjects[gObjectNum].mCenter.x.toPrecision(3)
				+ "," +
				mAllObjects[gObjectNum].mCenter.y.toPrecision(3) + "</li>" +
				"<li>Angle: " + mAllObjects[gObjectNum].mAngle.toPrecision(3) + "</li>" +
				"</ul> <hr>" +
				"<p><b> Control </b> : of Selected object </p>" +
				"<ul style = \"margin: 10px\">" +
				"<li><b>Num</b> or <b>Up/Down Arrow</b>: SelectedObject</li>" +
				"<li><b>WASD</b> + <b>QE</b>: Position [Move + Rotate]</li>" +
				"</ul> <hr>" +
				"<b>F/G</b>: Spawn [Rectangle/Circle] at selected object" +
				"<p><b>H</b>: Toggle Gravity of the selected Object</p>" +
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

		//Update the game appropriate number of times
		//Update only every Milliseconds per frame
		//if lag greater than update frames, update until caught up
		//ensures that the update remains consistent if even the frame drops
		while(mLagTime >= kMPF){
			mLagTime -= kMPF;
			gEngine.Physics.collision();
			update();
		}
		updateUIEcho();
		draw();
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
		mContext : mContext
	};


	return mPublic;

}());
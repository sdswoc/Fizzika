var gEngine = gEngine || {};
gEngine.Core = (function (){

	var mCanvas, mContext, mWidth = 800, mHeight = 459;
	mCanvas = document.getElementById("canvas");
	mContext = mCanvas.getContext("2d");
	mCanvas.width = mWidth;
	mCanvas.height = mHeight;
	
	var mAllObjects = [];

	var mPublic = {
		mAllObjects : mAllObjects,	
		mWidth : mWidth,
		mHeight : mHeight,
		mContext : mContext
	};


	return mPublic;
}());
var runGameLoop = function () {
	requestAnimationFrame(function () {
		runGameLoop();
	})
	updateUIEcho();
	draw();
};

var updateUIEcho = function () {
	document.getElementById("uiEchoString").innerHTML = 
		"<p> <b> Selected Object: </b> </p>" +
			"<ul style = \"margin : 10px\" >" +
			"<li> Id: " + gObjectNum + "</li>" +
			"<li> Center: " + 

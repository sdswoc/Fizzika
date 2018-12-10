// Represents the index of currently selected object
var gObjectNum = 0; 

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

	var width = gEngine.Core.mWidth;
	var height = gEngine.Core.mHeight;
	var context = gEngine.Core.mContext;

	//F key
	if(keycode == 70){ 
		var r1 = new Rectangle(
			new Vec2(Math.random() * width * 0.8, 
			Math.random() * height * 0.8),
			Math.random() * 30 + 10,
			Math.random() * 30 + 10);
	}
	//G key
	if(keycode == 71){ 
		var r1 = new Circle(
			new Vec2(Math.random() * width * 0.8, 
			Math.random() * height * 0.8),
			Math.random() * 10 + 20);
	}
	//Numeric Keys 0 - 9	
	if(keycode >=48 && keycode <=57){
		if(keycode - 48 < gEngine.Core.mAllObjects.length)
			gObjectNum = keycode - 48;
	}
	//up arrow
	if(keycode == 38) { 
		if(gObjectNum > 0)
			gObjectNum--;
	}
	 //down arrow
	if(keycode == 40){
		if(gObjectNum < gEngine.Core.mAllObjects.length - 1)
			gObjectNum++;
	}

}	
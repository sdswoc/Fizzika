//Representing the initial Scene
function MyGame() {

	var width = gEngine.Core.mWidth;
	var height = gEngine.Core.mHeight;
	//Creating Bounding Box
	var up = new Rectangle( new Vec2(width / 2, 0), width , 3, 0);
	var down = new Rectangle( new Vec2(width / 2, height), width , 3, 0);
	var left = new Rectangle( new Vec2(0, height / 2), 3 , height, 0);
	var up = new Rectangle( new Vec2(width, height / 2), 3 , height, 0);

	// var r1 = new Rectangle(new Vec2(500, 200), 400, 20, 0, 0.3, 0);
	// r1.rotate(2.8);
	// var r2 = new Rectangle(new Vec2(200, 400), 400, 20, 0, 1, 0.5);
	// var r3 = new Rectangle(new Vec2(100, 200), 200, 20, 0);
	// var r4 = new Rectangle(new Vec2(10, 360), 20, 100, 0, 0, 1);

	let ball = new Circle( new Vec2(50, 300),20, 100);
	for (var i = 1; i < 10; i++) {
		let r1 = new Rectangle(
		new Vec2(gEngine.Core.mWidth - (200),
			i * gEngine.Core.mHeight / 30 + 200),
		 	50, Math.random() * 30 + 10,
			30, 0.5, 0.5);
		r1.mVelocity = new Vec2(0, 50);
	}
	ball.mVelocity = new Vec2(Math.random()*200 + 100,Math.random()*40 - 20);

	// 	r1 = new Circle(
	// 	new Vec2(Math.random() * gEngine.Core.mWidth,
	// 	Math.random() * gEngine.Core.mHeight / 2),
	// 	Math.random() * 20 + 10, Math.random() * 30,
	// 	Math.random(), Math.random());
	// 	r1.mVelocity = new Vec2(Math.random() * 60 - 30,
	// 	Math.random() * 60 - 30);
	// }

}

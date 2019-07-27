// Defines a Class for representing Collision Information

function CollisionInfo() {
  this.mDepth = 0;
  this.mNormal = new Vec2(0, 0);
  this.mStart = new Vec2(0, 0);
  this.mEnd = new Vec2(0, 0);
}
//Used to set the normal direction of collision
CollisionInfo.prototype.setNormal = function (s) {
  this.mNormal = s;
};
// Returns the length of penetration of two objects
CollisionInfo.prototype.getDepth = function () {
  return this.mDepth;
};
// Returns the normal colliding vector
CollisionInfo.prototype.getNormal = function () {
  return this.mNormal;
};
//Sets the depth, normal and start point of the collision
CollisionInfo.prototype.setInfo = function (d, n, s) {
  this.mDepth =  d;
  this.mNormal = n;
  this.mStart = s;
  this.mEnd = s.add(n.scale(d));
};
//Reverse the normal direction
CollisionInfo.prototype.changeDir = function () {
  this.mNormal = this.mNormal.scale(-1);
  var n = this.mStart;
  this.mStart = this.mEnd;
  this.mEnd = n;
};

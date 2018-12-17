  // Contains details regarding collision circles with other objects

  Circle.prototype.collisionTest = function ( otherShape, collisionInfo ) {
    let status = false;
    if(otherShape.mType == "Circle"){
      status = this.collidedCircCirc(this, otherShape, collisionInfo);
    }
    else {
      status = false;
    }
    return status;
  };
  Circle.prototype.collidedCircCirc = function (c1, c2,collisionInfo) {
    let vFrom1to2 = c2.mCenter.subtract(c1.mCenter);
    let rSum = c1.mRadius + c2.mRadius;
    let dist = vFrom1to2.length();
    //not overlapping
    if (dist > rSum) {
      return false;
    }
    //overlapping but not same center
    if(dist != 0){
      let normalFrom2to1 = vFrom1to2.scale(-1).normalize();
      let radiusC2 = normalFrom2to1.scale(c2.mRadius);
      collisionInfo.setInfo(rSum - dist, vFrom1to2.normalize(),
                            c2.mCenter.add(radiusC2));
    }
    //Same Center
    else{
        if(c1.mRadius > c2.mRadius){
          collisionInfo.setInfo(rSum, new Vec2(0, -1),
                                c1.mCenter.add(new Vec2(0, c1.mRadius)));
        }
        else {
          collisionInfo.setInfo(rSum, new Vec2(0, -1),
                                c2.mCenter.add(new Vec2(0, c2.mRadius)));

        }
    }
  return true;
  };

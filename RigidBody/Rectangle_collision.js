Rectangle.prototype.collisionTest = function (otherShape, collisionInfo) {
  let status = false;
  if(otherShape.mType == "Circle")
    status = this.collidedRectCirc(otherShape, collisionInfo);
  else {
    status = this.collidedRectRect(this, otherShape, collisionInfo);
  }
  return status;
};
var SupportStruct = function () {
    this.mSupportPoint = null;
    this.mSupportPointDist = 0;
};
var tmpSupport = new SupportStruct();
Rectangle.prototype.findSupportPoint = function ( dir, ptOnEdge) {
  //The longest projected length
  let vToEdge;
  let projection;
  tmpSupport.mSupportPointDist = -1;
  tmpSupport.mSupportPoint = null;
  //check each vector of the other object
  for(let i = 0; i < this.mVertex.length; i++){
    vToEdge = this.mVertex[i].subtract(ptOnEdge);
    projection = vToEdge.dot(dir);
    //find the longest distance
    //dir is negative of face normal so its must be positive
    if((projection > 0) && (projection > tmpSupport.mSupportPointDist)){
      tmpSupport.mSupportPoint = this.mVertex[i];
      tmpSupport.mSupportPointDist = projection;
    }
  }
};


Rectangle.prototype.findAxisLeastPenetration = function (otherRect, collisionInfo) {
  let n, supportPoint, bestDistance = 999999, bestIndex = null;
  let hasSupport = true, i = 0;
  while( (hasSupport ) && (i < this.mFaceNormal.length)) {
    //Retrive the face normal
    n = this.mFaceNormal[i];
    let dir = n.scale(-1);
    let ptOnEdge = this.mVertex[i];

    //find the support on otherObject
    //the point has longest distance from the edge
    otherRect.findSupportPoint( dir, ptOnEdge );
    hasSupport = (tmpSupport.mSupportPoint !== null);
    //get the shortest support point
    if((hasSupport) && (tmpSupport.mSupportPointDist < bestDistance)){
      bestDistance = tmpSupport.mSupportPointDist;
      bestIndex = i;
      supportPoint = tmpSupport.mSupportPoint;
    }
    i++;
  }
  if(hasSupport){
    //all four directions have supportPoint
  let bestVec = this.mFaceNormal[bestIndex].scale(bestDistance);
  collisionInfo.setInfo(bestDistance, this.mFaceNormal[bestIndex], supportPoint.add(bestVec));
  }
  return hasSupport;
};

Rectangle.prototype.collidedRectRect = function (r1, r2, collisionInfo) {
  var collisionInfoR1 = new CollisionInfo();
  var collisionInfoR2 = new CollisionInfo();
  let status1 = false, status2 = false;
  //find axis of find axis of seperation
  status1 = r1.findAxisLeastPenetration(r2, collisionInfoR1);
  if(status1){
    status2 = r2.findAxisLeastPenetration(r1, collisionInfoR2);
    if(status2){
      //choose the shorter normal
      if (collisionInfoR1.getDepth() < collisionInfoR2.getDepth()) {
        let depthVec = collisionInfoR1.getNormal().scale(collisionInfoR1.getDepth());
        collisionInfo.setInfo(collisionInfoR1.getDepth(),
                              collisionInfoR1.getNormal(),
                              collisionInfoR1.mStart.subtract(depthVec));
      } else {
        collisionInfo.setInfo(collisionInfoR2.getDepth(),
                              collisionInfoR2.getNormal().scale(-1),
                              collisionInfoR2.mStart);
      }
    }
  }
  return status1 && status2;
};


Rectangle.prototype.collidedRectCirc = function (otherCirc, collisionInfo){
  let inside = true;
  let bestDistance = -99999;
  let nearestEdge = 0;
  let v;
  //Compute the nearest edge
  for( let i = 0; i < 4; i++){
    var circ2Pos = otherCirc.mCenter;
    v = circ2Pos.subtract(this.mVertex[i]);
    projection = v.dot(this.mFaceNormal[i]);
    //if the center is outside the rectangle
    if(projection > 0){
      bestDistance = projection;
      nearestEdge = i;
      inside = false;
      break;
    }
    if(projection > bestDistance){
      bestDistance = projection;
      nearestEdge = i;
    }
  }
  if(!inside){
    // vertex from left vertex to center of the Circle
    var v1 = circ2Pos.subtract(this.mVertex[nearestEdge]);
    // direction of the edge
    var v2 = this.mVertex[(nearestEdge + 1) % 4].subtract(this.mVertex[nearestEdge]);

    var dot = v1.dot(v2);
    if(dot < 0){
      let dis = v1.length();
      if(dis > otherCirc.mRadius)  return false;

      let normal = v1.normalize();
      let radiusVec = normal.scale(-otherCirc.mRadius);
      collisionInfo.setInfo(otherCirc.mRadius - dis, normal, circ2Pos.add(radiusVec));
    }
    else{
      let v1 = circ2Pos.subtract(this.mVertex[(nearestEdge + 1) % 4]);
      v2 = v2.scale(-1);
      var dot = v1.dot(v2);
      if(dot < 0) {
        let dis = v1.length();
        if(dis > otherCirc.mRadius)  return false;

        let normal = v1.normalize();
        let radiusVec = normal.scale(-otherCirc.mRadius);
        collisionInfo.setInfo(otherCirc.mRadius - dis, normal, circ2Pos.add(radiusVec));
      }else{
        if(bestDistance < otherCirc.mRadius){
          let radiusVec = this.mFaceNormal[nearestEdge].scale(otherCirc.mRadius);
          collisionInfo.setInfo(otherCirc.mRadius - bestDistance,
                                this.mFaceNormal[nearestEdge],
                                circ2Pos.subtract(radiusVec));
        }
        else{
          return false;
        }
      }
    }
  }else{
    //center of circle inside the rectangle
    let radiusVec =  this.mFaceNormal[nearestEdge].scale(otherCirc.mRadius);
    collisionInfo.setInfo(otherCirc.mRadius - bestDistance,
                          this.mFaceNormal[nearestEdge],
                        circ2Pos.subtract(radiusVec));
  }
  return true;
};

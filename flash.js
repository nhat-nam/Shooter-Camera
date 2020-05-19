class Flash{
  constructor(x,y,radius,alpha,subtraction){
    this.x = x;
    this.y = y;
    this.alpha = alpha
    this.subtraction = subtraction;
    this.radius = radius
    this.delete = false
  }
  update(delta){
    if(this.alpha>0){
      this.alpha -= this.subtraction
    }else{
      this.delete = true;
    }
  }
  render(ctx){
    ctx.save()
    ctx.fillStyle = "rgba(255,0,0,"+this.alpha+")"
    var pos = game.camera.toWorldCoordinates(this.x,this.y)
    ctx.beginPath();
		ctx.arc(pos.x,pos.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }
}

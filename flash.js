class Flash{
  constructor(x,y,radius,alpha,subtraction){
    this.x = x;
    this.y = y;
    this.alpha = alpha
    this.fillStyle = "rgba(255,0,0,"+this.alpha+")";
    this.subtraction = subtraction;
    this.radius = radius
    this.delete = false
  }
  getFillStyle(){
    this.fillStyle = this.fillStyle.replace(/,0?\.?[0-9]+\)$/, "," + this.alpha+")" );

    return this.fillStyle;
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
    ctx.fillStyle = this.getFillStyle();
    var pos = game.camera.toWorldCoordinates(this.x,this.y)
    ctx.beginPath();
		ctx.arc(this.x,this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }
}
class MuzzleFlash extends Flash{
  constructor(x,y,radius,alpha,time){
    super(x,y,radius,alpha)
    this.fillStyle="rgba(246,150,26,"+this.alpha+")";
    this.ticks = time;
    this.delete = false
  }

  update(delta){
    if(this.ticks>0){
      this.ticks--;
    }else{
      this.delete = true;
    }
  }
}

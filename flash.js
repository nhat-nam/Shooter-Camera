class Flash{
  constructor(){
    this.alpha = 0
    this.subtraction = 0;
    this.active = false
  }
  flash(alpha,subtraction){
    this.alpha = alpha
    this.subtraction = subtraction
    this.active = true
  }
  update(delta){
    if(this.alpha>0){
      this.alpha -= this.subtraction
    }else{
      this.active = false;
    }
  }
  render(ctx){
    ctx.save()
    ctx.fillStyle = "rgba(255,0,0,"+this.alpha+")"
    var pos = game.camera.toWorldCoordinates(0,0)
    ctx.fillRect(pos.x,pos.y,500,500)
    ctx.restore();
  }
}

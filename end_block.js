class EndBlock{
  constructor(final_score,x,y){
    this.x = x
    this.y = y
    this.score = final_score
    this.texts = []
    this.shake = true;
  }

  update(delta){
    for(var i=0;i<this.texts.length;i++){
      this.texts[i].update(delta);
    }
  }
  render(ctx){
    ctx.save()
    ctx.fillStyle = "red"
    if(this.shake){
      var dx = Math.random()*16-8;
      var dy = Math.random()*16-8;
      ctx.translate(dx, dy);
    }
    this.drawObjects();
    if(this.shake){
      ctx.translate(-dx,-dy)
    }
    ctx.restore()
  }
  drawObjects(){
    ctx.fillRect(this.x,this.y,500,500)
    for(var i=0;i<this.texts.length;i++){
      this.texts[i].render(ctx);
    }
  }
}
